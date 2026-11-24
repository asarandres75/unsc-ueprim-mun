const L = require('./_lib');

const COUNTRIES = require('../public/js/roster.json');
const DAIS = ['President', 'Vice-President', 'Secretary'];
const DAY = 24 * 60 * 60 * 1000;

module.exports = async (req, res) => {
  if (req.method !== 'POST') return L.send(res, 405, { error: 'Use POST' });
  const b = await L.readBody(req);
  const storage = L.hasStorage();

  if (b.role === 'presidency') {
    if (!L.safeEqual((b.code || '').trim(), L.PRESIDENCY_CODE)) {
      return L.send(res, 401, { error: 'That Presidency code is not right.' });
    }
    const member = DAIS.includes(b.member) ? b.member : 'Presidency';
    const user = { role: 'presidency', id: 'dais-' + member.toLowerCase().replace(/[^a-z]/g, ''), name: member, exp: Date.now() + 14 * DAY };
    return L.send(res, 200, { token: L.sign(user), user, storage });
  }

  if (b.role === 'delegate') {
    const c = COUNTRIES.find((x) => x.id === b.country);
    if (!c) return L.send(res, 400, { error: 'Choose your delegation first.' });
    const pin = String(b.pin || '').trim();
    if (pin.length < 4) return L.send(res, 400, { error: 'Your personal PIN needs at least 4 characters.' });

    let firstTime = false;
    if (storage) {
      const rec = await L.getJSON('pin:' + c.id, null);
      if (!rec) {
        await L.setJSON('pin:' + c.id, { hash: L.hashPin(pin, c.id), created: Date.now() });
        firstTime = true;
      } else if (rec.hash !== L.hashPin(pin, c.id)) {
        return L.send(res, 401, { error: 'That PIN does not match the one set for ' + c.short + '. If you forgot it, ask the Presidency to reset it.' });
      }
    }
    const user = { role: 'delegate', id: c.id, name: c.name, short: c.short, exp: Date.now() + 30 * DAY };
    return L.send(res, 200, { token: L.sign(user), user, storage, firstTime });
  }

  return L.send(res, 400, { error: 'Pick Delegate or Presidency.' });
};
