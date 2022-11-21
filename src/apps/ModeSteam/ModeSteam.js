import React from "react";

import {
  Box,
  Typography,
  Button,
  OutlinedInput,
  ThemeProvider
} from "@material-ui/core";
import Alert from '@mui/material/Alert';
import { Provider } from "react-redux";
import { createTheme } from '@material-ui/core/styles'
import configureStore from "../../store";
import BackgroundImage from '../../img/backmode1.png';

const store = configureStore();

function auth(credential) {
  const url = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=1EB4D210F733D638D3F0BD06F3020ECA&steamid='+credential+'&include_appinfo=1&include_played_free_games=1&format=json';
  const options = {
    method: 'GET',
    withCredentials: true,
    crossorigin: true,
    mode: 'no-cors',
  }

  return fetch(url, {
    method: 'GET',
    withCredentials: true,
    crossorigin: true,
    mode: 'no-cors'
  }).then(res => res.json())
  .then(out =>
    console.log('Checkout this JSON! ', out))
  .catch(err => { throw err });
}

const ModeEvaluation = () => {
  const [username, setUsername] = React.useState('');
  const [connected, setConnected] = React.useState(false);
  const [displayAlert, setDisplayAlert] = React.useState(false);
  const [isBUError, setIsBUError] = React.useState(false);

  const handleInputChange = (name, value) => {
    console.log(value);
    if (name === 'username') {
      setUsername(value);
    }  };

  const handleSubmit = (event) => {
    event.persist();
    console.log(username);
    if (username) {
      auth(
        username
      ).then((response) => {
        console.log(response);
        // setDisplayAlert(response.val);
        // if (response.userInformations.businessunit.localeCompare('BadBU') === 0) { setIsBUError(true); }
        // if (response.val === 2) { console.log('Authenticated but contact ADMINISTRATOR!'); } else if (response.val === 1) { console.log('Authenticated — SUCCESS!'); } else if (response.val === 0) { console.log(`Failed to authenticate — ERROR!${(isBUError === true) ? " You don't have right MTN Business Unit to access to this app !" : ''}`); }
        // if (response.val === 1) { window.location.href = `https://obcc.mtn.bj:8443/:${displayAlert}`; }
      });
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: `"Roboto", "Open Sans", "Helvetica", "Arial", sans-serif`,
    },
    palette: {
      primary: {
        main: "#ec407a",
      },
      secondary: {
        main: "#ff80ab",
      },
    },
  });

  if (connected === false) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Box style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", height: "100vh", color: "#f5f5f5", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box style={{ height: '70%', width: '100%', borderRadius: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }} width="100%">
                <Typography color="initial" style={{ fontWeight: 600, fontSize: 32, textAlign: 'center' }}>
                  Login With Your Steam Account
                </Typography>
              </Box>
              <Box sx={{ marginTop: '5%', marginLeft: '5%', width: '90%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }} width="100%">
                  {displayAlert === 2 ? <Alert severity="info">Authenticated but contact ADMINISTRATOR!</Alert> : <></> }
                  {displayAlert === 1 ? <Alert severity="success">Authenticated — SUCCESS!</Alert> : <></> }
                  {displayAlert === 0 ? (
                    <Alert severity="error">
                      Failed to authenticate — ERROR!
                      {(isBUError === true) ? " You don't have right MTN Business Unit to access to this app !" : ''}
                    </Alert>
                  ) : <></> }
                </Box>
                <Typography variant="subtitle1" color="initial">
                  Steam ID *
                </Typography>
                <OutlinedInput
                  autoFocus
                  required
                  margin="dense"
                  id="__username"
                  name="username"
                  value={username}
                  fullWidth
                  placeholder="username"
                  style={{ backgroundColor: 'white' }}
                  onChange={event => handleInputChange('username', event.target.value)}
                />
                <Button
                  onClick={(e) => { handleSubmit(e); }}
                  style={{
                    marginTop: 30, width: '100%', outline: 'none', backgroundColor: '#919191', color: 'initial'
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </Provider>
    );
  } else {
  }
};

export default ModeEvaluation;