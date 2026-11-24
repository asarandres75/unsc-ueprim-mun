// Local preview without the Vercel CLI: node scripts/dev-server.js
// Serves /public, runs the /api functions, and (with MOCK_KV=1) fakes the Redis database in memory.
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const PORT = process.env.PORT || 3000;
const mem = new Map();
if (process.env.MOCK_KV === '1') {
  process.env.KV_REST_API_URL = `http://localhost:${PORT}/__kv`;
  process.env.KV_REST_API_TOKEN = 'dev';
}
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.pdf': 'application/pdf', '.docx': 'application/octet-stream' };

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const parts = [];
  for await (const c of req) parts.push(c);
  const rawBuf = Buffer.concat(parts); const raw = rawBuf.toString('utf8');
  if (url.pathname === '/__kv') {
    const [cmd, key, val] = JSON.parse(raw);
    let result = null;
    if (cmd === 'GET') result = mem.has(key) ? mem.get(key) : null;
    if (cmd === 'SET') { mem.set(key, val); result = 'OK'; }
    if (cmd === 'DEL') { result = mem.delete(key) ? 1 : 0; }
    res.setHeader('Content-Type', 'application/json'); return res.end(JSON.stringify({ result }));
  }
  if (url.pathname.startsWith('/api/')) {
    const file = path.join(root, 'api', path.basename(url.pathname) + '.js');
    if (!fs.existsSync(file)) { res.statusCode = 404; return res.end('no fn'); }
    delete require.cache[file];
    req.query = Object.fromEntries(url.searchParams);
    if ((req.headers['content-type'] || '').includes('octet-stream')) req.body = rawBuf;
    else { try { req.body = raw ? JSON.parse(raw) : {}; } catch { req.body = raw; } }
    res.status = (c) => { res.statusCode = c; return res; };
    res.json = (o) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(o)); };
    res.send = (b) => res.end(b);
    return require(file)(req, res);
  }
  let p = path.join(root, 'public', decodeURIComponent(url.pathname));
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  if (!fs.existsSync(p)) { res.statusCode = 404; return res.end('Not found'); }
  res.setHeader('Content-Type', TYPES[path.extname(p)] || 'application/octet-stream');
  fs.createReadStream(p).pipe(res);
}).listen(PORT, () => console.log('UNSC site on http://localhost:' + PORT));
