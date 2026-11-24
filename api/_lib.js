// Shared helpers for the UNSC site API (Vercel serverless functions).
const crypto = require('crypto');

const PRESIDENCY_CODE = process.env.PRESIDENCY_CODE || 'UNSCsecuritycouncil0987';
// Fixed secret (not tied to the code) so changing the code keeps delegate PINs and sessions working.
const SECRET = process.env.SESSION_SECRET || 'unsc-ueprim-PresidenciaUNSC2026-DelegadosUNSC2026';

// Upstash Redis over REST. Vercel's Upstash/KV integration sets one of these pairs.
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
const hasStorage = () => Boolean(KV_URL && KV_TOKEN);

async function kv(command) {
  if (!hasStorage()) throw new Error('storage-not-configured');
  const r = await fetch(KV_URL, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + KV_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}
async function getJSON(key, fallback) {
  const v = await kv(['GET', 'unsc:' + key]);
  if (v == null) return fallback;
  try { return JSON.parse(v); } catch { return fallback; }
}
async function setJSON(key, value) {
  return kv(['SET', 'unsc:' + key, JSON.stringify(value)]);
}
async function del(key) { return kv(['DEL', 'unsc:' + key]); }

const b64 = (s) => Buffer.from(s).toString('base64url');
function sign(payload) {
  const body = b64(JSON.stringify(payload));
  const sig = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  return body + '.' + sig;
}
function verify(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  const expect = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  if (sig.length !== expect.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expect))) return null;
  try {
    const p = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (p.exp && Date.now() > p.exp) return null;
    return p;
  } catch { return null; }
}
function userFrom(req) {
  const h = req.headers.authorization || '';
  const t = h.startsWith('Bearer ') ? h.slice(7) : (req.query && req.query.t);
  return verify(t);
}
function hashPin(pin, salt) {
  return crypto.createHash('sha256').update(salt + ':' + pin + ':' + SECRET).digest('hex');
}
function safeEqual(a, b) {
  const A = Buffer.from(String(a)); const B = Buffer.from(String(b));
  return A.length === B.length && crypto.timingSafeEqual(A, B);
}
async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return {}; } }
  return {};
}
function send(res, status, data) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).json(data);
}

module.exports = {
  PRESIDENCY_CODE, hasStorage, getJSON, setJSON, del,
  sign, verify, userFrom, hashPin, safeEqual, readBody, send,
};
