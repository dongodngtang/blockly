const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const backApp = express();
const listenAWSAPI = require('./amazon');
const path = require('path');
backApp.use(bodyParser.json({ limit: '10mb' }));
backApp.use(express.static(__dirname));

backApp.all('*', cors());
backApp.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});
listenAWSAPI(backApp);
const port = 9991;
backApp.listen(port, () => {
  console.log(`listening ${port}`);
});