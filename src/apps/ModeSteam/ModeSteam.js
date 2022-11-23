import React from "react";

import {
  Box,
  Typography,
  Button,
  OutlinedInput,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  ThemeProvider,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import Alert from '@mui/material/Alert';
import { Provider } from "react-redux";
import { createTheme } from '@material-ui/core/styles'
import configureStore from "../../store";
import BackgroundImage from '../../img/backmode1.png';
import GenerateButton from '../../img/generatebutton.png';
import GenerateButtonHover from '../../img/generatebuttonhover.png';
import { RecommendBySteam } from './RecommendBySteam.js'

const store = configureStore();

function auth(credentials) {
  const path = 'https://bigamerecsys.koreacentral.cloudapp.azure.com:8443/api/getInfosOnUser';
  const options = {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  };

  console.log("FETCH");

  return fetch(path, options)
    .then(response => response.json())
    .then(responseData => responseData)
    .catch(error => console.warn(`CANNOT POST API ${error}`));
}

const ModeSteam = () => {
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

  const [isHovering, setIsHovering] = React.useState(false);
  const [generateRec, setGenerateRec] = React.useState(false);

  const onGenerate = () => { setGenerateRec(true); };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
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
    if (!generateRec)
      return (
        <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Box style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", height: "100vh", color: "#f5f5f5", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box style={{ marginTop: "15vh", height: "85vh", width: "100%", flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Grid container rowSpacing={1}>
                <Grid item xs={6}>
                  <Box style={{ height: "100%", width: "95%", overflowY: 'scroll' }}>
                    <Grid container xs={6} md={12} spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {Array.from(Array(6)).map((_, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                          <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="140"
                                image={""}
                                alt="game img"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                  Test
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom style={{ fontStyle: 'italic' }} >
                                Test
                                </Typography>
                                <Typography variant="body2" color="initial">
                                Test
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
              </Grid>
              <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={onGenerate} >
                    {!isHovering && ( <div> <img src={GenerateButton} alt="generatebutton" style={{ height: "22%" }} /> </div> )}
                    {isHovering && ( <div> <img src={GenerateButtonHover} alt="generatebutton hover" style={{ height: "22%" }} /> </div> )}
                  </div>
              </Grid>
            </Grid>
            </Box>
          </Box>
        </ThemeProvider>
      </Provider>
      );
    else {
      return (
        <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Box style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", height: "100vh", color: "#f5f5f5", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box style={{ marginTop: "15vh", height: "85vh", width: "100%", flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Grid container rowSpacing={1}>
                <Grid item xs={6}>
                  <Box style={{ height: "100%", width: "95%", overflowY: 'scroll' }}>
                    <Grid container xs={6} md={12} spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {Array.from(Array(6)).map((_, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                          <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="140"
                                image={""}
                                alt="game img"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                  Test
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom style={{ fontStyle: 'italic' }} >
                                Test
                                </Typography>
                                <Typography variant="body2" color="initial">
                                Test
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
              </Grid>
              <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <Grid item xs={12}>
                      <Grid container justifyContent="center" spacing={2}>
                        {[0, 1, 2].map((value) => (
                          <Grid key={value} item>
                            <Paper
                              sx={{
                                height: 140,
                                width: 100,
                                backgroundColor: (theme) =>
                                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                      </Grid>
                    </Grid>
              </Grid>
            </Grid>
            </Box>
          </Box>
        </ThemeProvider>
      </Provider>
      );
    }
  }
};

export default ModeSteam;