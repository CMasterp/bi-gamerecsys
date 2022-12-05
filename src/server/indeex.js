const fetch = require("node-fetch");
const fs = require("fs");
const express = require("express");
const http = require("http");
const https = require("https");
const { spawn } = require("child_process");

var app = express();

function getInfos(credential, func) {
    //const url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='+credential+'&steamid=76561197960434622&format=json';
    const url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=C43A6789C9607462F9F6BC3601E50B00&include_played_free_games=1&include_appinfo=1&format=json&steamid="+credential

    return fetch(url)
        .then(response => response.json())
        .then(responseData => func(responseData))
        .catch(error => console.warn(`CANNOT GET API ${error}`));
}

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/api/getInfosOnUser', (req, res) => {
    console.log('[gamerecsys@server ~]$ getInfosOnUser');
    console.log(req.query);
    getInfos(req.query.credentials, result => res.send(result));
});

app.post('/api/getResultProfileMode', (req, res) => {
  console.log('[gamerecsys@server ~]$ getResultProfileMode');
//  console.log(req.query);
  console.log(JSON.stringify(req.query));
  var dataToSend;
  const python = spawn('python3', ['collaborativeFilterRecommendmode3.py', req.query.userGames]);
  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend = data.toString();
  });
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  res.send(dataToSend);
  });
})

app.post('/api/getResultSteamMode', (req, res) => {
  console.log('[gamerecsys@server ~]$ getResultSteamMode');
  console.log(req.query);
  var dataToSend;
  const python = spawn('python3', ['collaborativeFilterRecommend.py', req.query.steamID]);
  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend = data.toString();
  });
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  res.send(dataToSend);
  });
})

app.post('/api/getItemRecommended', (req, res) => {
  console.log('[gamerecsys@server ~]$ getItemRecommended');
  console.log(req.query);
  var dataToSend;
  const python = spawn('python3', ['getItemToItem.py', req.query.item]);
  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend = data.toString();
  });
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  res.send(dataToSend);
  });
})

var httpServer = http.createServer(app);
httpServer.listen(8080, function () {
  console.log('App listening at http://0.0.0.0:8080');
});

var httpsConfig = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('fullchain.pem')
};
var httpsServer = https.createServer(httpsConfig, app);
httpsServer.listen(8443, function () {
  console.log('App listening at https://0.0.0.0:8443');
});