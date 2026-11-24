const L = require('./_lib');
const ROSTER = require('../public/js/roster.json');

// Shared documents and who may read/write them.
const ADMIN_KEYS = ['sanctions', 'internal', 'evaluations', 'attendance'];
const MAX_BYTES = 400 * 1024;

module.exports = async (req, res) => {
  const user = L.userFrom(req);
  if (!user) return L.send(res, 401, { error: 'Please sign in again.' });
  if (!L.hasStorage()) return L.send(res, 503, { error: 'storage-not-configured' });

  const key = String((req.query && req.query.key) || '');
  const isAdmin = user.role === 'presidency';

  try {
    if (key === 'notes') {
      const k = 'notes:' + user.id;
      if (req.method === 'GET') return L.send(res, 200, { value: await L.getJSON(k, []) });
      if (req.method === 'PUT') {
        const b = await L.readBody(req);
        if (!Array.isArray(b.value)) return L.send(res, 400, { error: 'Notes must be a list.' });
        if (JSON.stringify(b.value).length > MAX_BYTES) return L.send(res, 413, { error: 'Your notes are too long to save in one go. Try splitting a very long note.' });
        await L.setJSON(k, b.value);
        return L.send(res, 200, { ok: true });
      }
    }

    if (key === 'notice') {
      if (req.method === 'GET') return L.send(res, 200, { value: await L.getJSON('notice', null) });
      if (req.method === 'PUT' && isAdmin) {
        const b = await L.readBody(req);
        await L.setJSON('notice', { ...b.value, updatedBy: user.name, updatedAt: Date.now() });
        return L.send(res, 200, { ok: true });
      }
    }

    if (key === 'events') {
      if (req.method === 'GET') return L.send(res, 200, { value: await L.getJSON('events', null) });
      if (req.method === 'PUT' && isAdmin) {
        const b = await L.readBody(req);
        if (!Array.isArray(b.value)) return L.send(res, 400, { error: 'Events must be a list.' });
        await L.setJSON('events', b.value);
        return L.send(res, 200, { ok: true });
      }
    }

    if (key === 'mysanctions' && req.method === 'GET') {
      const all = await L.getJSON('sanctions', []);
      return L.send(res, 200, { value: all.filter((s) => s.country === user.id) });
    }

    if (ADMIN_KEYS.includes(key)) {
      if (!isAdmin) return L.send(res, 403, { error: 'This part is for the Presidency only.' });
      if (req.method === 'GET') return L.send(res, 200, { value: await L.getJSON(key, key === 'internal' ? [] : []) });
      if (req.method === 'PUT') {
        const b = await L.readBody(req);
        if (JSON.stringify(b.value || null).length > MAX_BYTES) return L.send(res, 413, { error: 'Too much data in one save.' });
        await L.setJSON(key, b.value);
        return L.send(res, 200, { ok: true });
      }
    }

    if (key === 'pins' && req.method === 'GET' && isAdmin) {
      const out = {};
      for (const c of ROSTER) out[c.id] = Boolean(await L.getJSON('pin:' + c.id, null));
      return L.send(res, 200, { value: out });
    }

    if (key === 'setpin' && req.method === 'POST' && isAdmin) {
      const b = await L.readBody(req);
      const id = String(b.country || '');
      const pin = String(b.pin || '').trim();
      if (!ROSTER.some((c) => c.id === id)) return L.send(res, 400, { error: 'Unknown delegation.' });
      if (pin.length < 4) return L.send(res, 400, { error: 'A PIN needs at least 4 characters.' });
      await L.setJSON('pin:' + id, { hash: L.hashPin(pin, id), created: Date.now() });
      return L.send(res, 200, { ok: true });
    }

    return L.send(res, 400, { error: 'Unknown request.' });
  } catch (e) {
    return L.send(res, 500, { error: 'The server could not save right now: ' + e.message });
  }
};
