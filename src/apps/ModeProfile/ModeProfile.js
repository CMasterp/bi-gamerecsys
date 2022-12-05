import React from "react";

import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  ThemeProvider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  DialogTitle,
  TextField

} from "@material-ui/core";
import { Provider } from "react-redux";
import { createTheme } from '@material-ui/core/styles'
import BackgroundImage from '../../img/backmode3.png';
import GenerateButton from '../../img/generatebutton.png';
import GenerateButtonHover from '../../img/generatebuttonhover.png';
import AddIcon from '@mui/icons-material/Add';
import configureStore from "../../store";
import { steamGames } from "./ArrayOfGames";
import Axios from 'axios';

const store = configureStore();

function generateRecommendations(userGames) {
  const path = 'https://gamerecsys.koreacentral.cloudapp.azure.com:8443/api/getResultProfileMode';

  console.log("FETCH");

  return Axios.post(path, null, { params: {
    userGames
  }})
  .then(response => response)
  .catch(err => console.warn(err));

}

function getGameImg(item) {
  const array1 = item.split("https://store.steampowered.com/app/");

  console.log(array1);
  return "https://cdn.cloudflare.steamstatic.com/steam/apps/" + (array1[1]).split("/")[0] + "/header.jpg";
}

const ModeProfile = () => {

  const [open, setOpen] = React.useState(false);
  const [nbrMins, setNbrMins] = React.useState(0);
  const [newItem, setNewItem] = React.useState({});
  const [itemClicked, setItemClicked] = React.useState({});
  const [userGames, setUserGames] = React.useState([]);

  const [isHovering, setIsHovering] = React.useState(false);
  const [generateRec, setGenerateRec] = React.useState(false);
  const [itemRecommended, setItemRecommended] = React.useState([]);

  const onGenerate = () => {
    setGenerateRec(true);
    generateRecommendations(userGames.toString()).then((response) => {
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (newItem) => {
    const array1 = newItem.url.split("https://cdn.cloudflare.steamstatic.com/steam/apps/");

    setUserGames([{nbrMins: nbrMins , name: newItem.name, appid: (array1[0]).split("/")[0] , gameInfos: newItem }, ...userGames])
    setNbrMins(0);
    setNewItem({});
    setOpen(false);
    console.log(userGames);
  };

  const handleNbrMinsChange = (event) => {
    setNbrMins(event.target.value);
  };

  const handleClickAddCard = () => {
    setOpen(true);
  };

  const handleAddNewItem = (event) => {
    setNewItem(event.target.value);
    console.log(newItem);
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

  if (!generateRec)
    return (
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", height: "100vh", color: "#f5f5f5", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Box style={{ marginTop: "15vh", height: "85vh", width: "100%", flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Grid container rowSpacing={1} style={{ height: '85vh', overflowY: 'scroll' }}>
                <Box style={{ height: "100%", width: "95%" }}>
                <Grid container xs={6} md={12} spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={2} sm={4} md={4} key={"addcard"}>
                    <Button color="secondary" variant="outlined" startIcon={<AddIcon />} onClick={handleClickAddCard}>
                      Add a Game
                    </Button>
                  </Grid>
                  {userGames.map((item) => (
                    <Grid item xs={2} sm={4} md={4} key={item.gameInfos.name}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image={item.gameInfos.url}
                            alt="game img"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {item.gameInfos.name} || {item.nbrMins} mins played
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom style={{ fontStyle: 'italic' }} >
                              {item.gameInfos.genre}
                            </Typography>
                            <Typography variant="body2" color="initial">
                              {item.gameInfos.desc_snippet}
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
                    {"Add A New Game"}
                  </DialogTitle>
                  <DialogContent>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <TextField id="standard-basic" label="Number of Minutes Played" variant="standard" value={nbrMins} onChange={handleNbrMinsChange}/>
                      <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={newItem}
                        onChange={handleAddNewItem}
                        label="New Game"
                      >
                        {steamGames.map((item) => (
                          <MenuItem key={item.name} value={item}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => { handleAdd(newItem); } }>Add</Button>
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
                  <Grid item xs={2} sm={4} md={4} key={"addcard"}>
                    <Button color="secondary" variant="outlined" startIcon={<AddIcon />} onClick={handleClickAddCard}>
                      Add a Game
                    </Button>
                  </Grid>
                  {userGames.map((item) => (
                    <Grid item xs={2} sm={4} md={4} key={item.gameInfos.name}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image={item.gameInfos.url}
                            alt="game img"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {item.gameInfos.name} || {item.nbrMins} mins played
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom style={{ fontStyle: 'italic' }} >
                              {item.gameInfos.genre}
                            </Typography>
                            <Typography variant="body2" color="initial">
                              {item.gameInfos.desc_snippet}
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
                    {"Add A New Game"}
                  </DialogTitle>
                  <DialogContent>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <TextField id="standard-basic" label="Number of Minutes Played" variant="standard" value={nbrMins} onChange={handleNbrMinsChange}/>
                      <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={newItem}
                        onChange={handleAddNewItem}
                        label="New Game"
                      >
                        {steamGames.map((item) => (
                          <MenuItem key={item.name} value={item}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => { handleAdd(newItem); } }>Add</Button>
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
};

export default ModeProfile;