// Serves Presidency-only files from /private after checking the sign-in token.
const fs = require('fs');
const path = require('path');
const L = require('./_lib');

const TYPES = { '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.json': 'application/json; charset=utf-8' };

module.exports = async (req, res) => {
  const user = L.userFrom(req);
  if (!user || user.role !== 'presidency') {
    res.status(403).send('This file is only for the UNSC Presidency. Sign in with the Presidency code first.');
    return;
  }
  const name = path.basename(String(req.query.file || ''));
  const full = path.join(process.cwd(), 'private', name);
  if (!name || !fs.existsSync(full)) { res.status(404).send('File not found.'); return; }
  res.setHeader('Content-Type', TYPES[path.extname(name).toLowerCase()] || 'application/octet-stream');
  res.setHeader('Content-Disposition', 'inline; filename="' + name + '"');
  res.setHeader('Cache-Control', 'private, no-store');
  res.status(200).send(fs.readFileSync(full));
};
