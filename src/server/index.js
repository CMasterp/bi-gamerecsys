/* eslint-disable consistent-return */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable no-lonely-if */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const cors = require('cors');
const { readFileSync } = require('fs');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(express.static('dist'));
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:8081'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: 'ubzcybc28427GV2YDV91G7',
    secret: 'PONIA01739HET368',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 1200,
    },
  })
);

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

app.get('/api/getInfosOnUser', (req, res) => {
  console.log('[bigamerecsys@server ~]$ getInfosOnUser');
  getInfos(req.body.credential, result => res.send(result));
});

app.listen(process.env.PORT || 8081, () => console.log(`Listening on port ${process.env.PORT || 8081}!`));