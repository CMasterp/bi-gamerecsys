var
  fs = require('fs'),
  express = require('express'),
  app = express(),
  http = require('http'),
  https = require('https');

function getInfos(credential) {
    //const url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='+credential+'&steamid=76561197960434622&format=json';
    const url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=1EB4D210F733D638D3F0BD06F3020ECA&include_played_free_games=1&include_appinfo=1&format=json&steamid="+credential
    const options = {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        },
        mode: 'no-cors'
    };

    return fetch(url)
        .then(response => response.json())
        .then(responseData => responseData)
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
    console.log('[bigamerecsys@server ~]$ getInfosOnUser');
    getInfos(req.body.credential, result => res.send(result));
});

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