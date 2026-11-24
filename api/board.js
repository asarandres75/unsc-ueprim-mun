// Public notes board on Home: everyone signed in can read and post, and attach a PDF or Word file.
const L = require('./_lib');

const MAX_FILE = 4 * 1024 * 1024; // Vercel functions accept bodies up to about 4.5 MB
const OK_TYPES = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

async function rawBody(req) {
  if (Buffer.isBuffer(req.body)) return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return Buffer.concat(chunks);
}

module.exports = async (req, res) => {
  const user = L.userFrom(req);
  if (!user) return L.send(res, 401, { error: 'Please sign in again.' });
  if (!L.hasStorage()) return L.send(res, 503, { error: 'storage-not-configured' });
  const action = String((req.query && req.query.action) || '');
  const who = user.role === 'presidency' ? user.name + ' (Presidency)' : user.name;

  try {
    if (req.method === 'GET') {
      return L.send(res, 200, { value: await L.getJSON('board', []) });
    }

    if (req.method === 'POST' && action === 'upload') {
      if (!process.env.BLOB_READ_WRITE_TOKEN) return L.send(res, 503, { error: 'File uploads are not switched on yet.' });
      const name = String(req.query.name || 'file').replace(/[^\w.\- ()áéíóúñÁÉÍÓÚÑ]/g, '_').slice(0, 120);
      const ext = (name.split('.').pop() || '').toLowerCase();
      if (!OK_TYPES[ext]) return L.send(res, 400, { error: 'Only PDF and Word files (.pdf, .doc, .docx) can be attached.' });
      const buf = await rawBody(req);
      if (!buf.length) return L.send(res, 400, { error: 'The file is empty.' });
      if (buf.length > MAX_FILE) return L.send(res, 413, { error: 'That file is larger than 4 MB. Try compressing the PDF first.' });
      const { put } = require('@vercel/blob');
      const blob = await put('board/' + name, buf, { access: 'public', contentType: OK_TYPES[ext], addRandomSuffix: true });
      return L.send(res, 200, { file: { url: blob.url, name, size: buf.length, ext } });
    }

    if (req.method === 'POST') {
      let b = req.body;
      if (!b || typeof b !== 'object' || Buffer.isBuffer(b)) {
        try { b = JSON.parse((Buffer.isBuffer(b) ? b : await rawBody(req)).toString('utf8') || '{}'); } catch { b = {}; }
      }
      const title = String(b.title || '').trim().slice(0, 140);
      const text = String(b.text || '').trim().slice(0, 8000);
      const file = b.file && typeof b.file.url === 'string' && b.file.url.includes('.blob.vercel-storage.com/') ? b.file : null;
      if (!title && !text && !file) return L.send(res, 400, { error: 'Write something or attach a file first.' });
      const list = await L.getJSON('board', []);
      list.unshift({ id: uid(), title, text, file, by: who, authorId: user.id, role: user.role, at: Date.now() });
      await L.setJSON('board', list.slice(0, 300));
      return L.send(res, 200, { ok: true });
    }

    if (req.method === 'DELETE') {
      const id = String(req.query.id || '');
      const list = await L.getJSON('board', []);
      const item = list.find((x) => x.id === id);
      if (!item) return L.send(res, 404, { error: 'That note no longer exists.' });
      if (user.role !== 'presidency' && item.authorId !== user.id) return L.send(res, 403, { error: 'You can only delete your own notes.' });
      if (item.file && process.env.BLOB_READ_WRITE_TOKEN) {
        try { await require('@vercel/blob').del(item.file.url); } catch {}
      }
      await L.setJSON('board', list.filter((x) => x.id !== id));
      return L.send(res, 200, { ok: true });
    }

    return L.send(res, 400, { error: 'Unknown request.' });
  } catch (e) {
    return L.send(res, 500, { error: 'The server could not do that right now: ' + e.message });
  }
};

