const express = require('express');
const backApp = express();
const path = require('path');

backApp.get('*.js', (req, res, next) => {
  console.log(req.url);
  req.url = `${req.url}.gz`;
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});
backApp.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'electron', 'index.html'));
});
backApp.use('/', express.static(path.join(__dirname, '/electron')));
backApp.listen(8000);
