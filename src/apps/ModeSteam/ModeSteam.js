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
import Axios from 'axios';

const store = configureStore();

function auth(credentials) {
  const path = 'https://gamerecsys.koreacentral.cloudapp.azure.com:8443/api/getInfosOnUser';

  console.log("FETCH");

  return Axios.post(path, null, { params: {
    credentials
  }})
  .then(response => response)
  .catch(err => console.warn(err));
}

function generateRecommendations(steamID) {
  const path = 'https://gamerecsys.koreacentral.cloudapp.azure.com:8443/api/getResultSteamMode';

  console.log("FETCH");

  return Axios.post(path, null, { params: {
    steamID
  }})
  .then(response => response)
  .catch(err => console.warn(err));

}

function getGameImg(item) {
  const array1 = item.split("https://store.steampowered.com/app/");

  console.log(array1);
  return "https://cdn.cloudflare.steamstatic.com/steam/apps/" + (array1[1]).split("/")[0] + "/header.jpg";
}

const ModeSteam = () => {
  const [username, setUsername] = React.useState('');
  const [userArray, setUserArray] = React.useState([]);
  const [connected, setConnected] = React.useState(false);
  const [itemRecommended, setItemRecommended] = React.useState([]);

  const handleInputChange = (name, value) => {
    console.log(value);
    if (name === 'username') {
      setUsername(value);
    }  };

  const handleSubmit = (event) => {
    event.persist();
    console.log(username);
    if (username) {
      auth(username
      ).then((response) => {
        console.log(response);
        if (response.statusText === "OK") {
          setConnected(true);
          console.log(response.data.response);
          setUserArray(response.data.response.games);
          console.log(userArray);
        }
      });
    }
  };

  const [isHovering, setIsHovering] = React.useState(false);
  const [generateRec, setGenerateRec] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [itemClicked, setItemClicked] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onGenerate = () => {
    setGenerateRec(true);
    generateRecommendations(username).then((response) => {
      console.log(response);
      if (response.statusText === "OK") {
        const result = response.data.split(/\r?\n/).filter(element => element);
        result.shift();
        console.log(result);
        setItemRecommended(result);
      }
    });
  };

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
              <Grid container rowSpacing={1} style={{ height: '85vh', overflowY: 'scroll' }}>
                  <Box style={{ height: "100%", width: "95%" }}>
                    <Grid container xs={6} md={12} spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {userArray.map((item) => (
                        <Grid item xs={2} sm={4} md={4} key={item.appid}>
                          <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea onClick={() => { setItemClicked(item); handleClickOpen(); }} >
                              <CardMedia
                                component="img"
                                height="140"
                                image={"https://cdn.cloudflare.steamstatic.com/steam/apps/" + item.appid + "/header.jpg"}
                                alt="game img"
                                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                                </Typography>
                                <Typography variant="body2" color="initial">
                                {item.playtime_forever} min played
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                      {itemClicked.name}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <img src={"https://cdn.cloudflare.steamstatic.com/steam/apps/" + itemClicked.appid + "/header.jpg"} alt="game img" height={150} />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                  </Dialog>
              </Grid>
            </Box>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "0vh", height: "12vh", width: "100%" }}>
              <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={onGenerate} >
                {!isHovering && ( <div> <img src={GenerateButton} alt="generatebutton" style={{ height: "80%" }} /> </div> )}
                {isHovering && ( <div> <img src={GenerateButtonHover} alt="generatebutton hover" style={{ height: "80%" }} /> </div> )}
              </div>
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
              <Grid container rowSpacing={1} style={{ height: '85vh', overflowY: 'scroll' }}>
                  <Box style={{ height: "100%", width: "95%" }}>
                    <Grid container xs={6} md={12} spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {userArray.map((item) => (
                        <Grid item xs={2} sm={4} md={4} key={item.appid}>
                          <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea onClick={() => { setItemClicked(item); handleClickOpen(); }} >
                              <CardMedia
                                component="img"
                                height="140"
                                image={"https://cdn.cloudflare.steamstatic.com/steam/apps/" + item.appid + "/header.jpg"}
                                alt="game img"
                                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                                </Typography>
                                <Typography variant="body2" color="initial">
                                {item.playtime_forever} min played
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                      {itemClicked.name}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <img src={"https://cdn.cloudflare.steamstatic.com/steam/apps/" + itemClicked.appid + "/header.jpg"} alt="game img" height={150} />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                  </Dialog>
              </Grid>
            </Box>
            <Box style={{ marginTop: "15vh", height: "85vh", width: "100%", flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Grid container xs={6} md={12} spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {itemRecommended.map((item) => (
                    <Grid item xs={2} sm={4} md={4} key={item}>
                      <img src={getGameImg(item)} alt={item} height={100} />
                    </Grid>
                  ))}
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