// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
  res.json({
    ipaddress:req.headers["host"], 
    language:req.headers["accept-language"],
    software:req.headers["user-agent"]
  });
});

const options = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH)
}

const PORT = process.env.PORT || 443
const listener = https.createServer(options, app).listen(PORT, console.log(`Node.js listening on port  ${PORT}`))