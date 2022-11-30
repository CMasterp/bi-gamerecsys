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
  DialogTitle

} from "@material-ui/core";
import { Provider } from "react-redux";
import { createTheme } from '@material-ui/core/styles'
import BackgroundImage from '../../img/backmode2.png';
import configureStore from "../../store";
import { steamGames } from "./ArrayOfGames";
import Axios from 'axios';

const store = configureStore();

function getItemRecommended(item) {
  const path = 'https://bigamerecsys.koreacentral.cloudapp.azure.com:8443/api/getItemRecommended';

  console.log("FETCH");

  return Axios.post(path, null, { params: {
    item
  }})
  .then(response => response)
  .catch(err => console.warn(err));
}

function getGameImg(item) {
  const array1 = item.split("https://store.steampowered.com/app/");

  return "https://cdn.cloudflare.steamstatic.com/steam/apps/" + array1[1].split("/")[0] + "/header.jpg";
}

const ModeItemToItem = () => {

  const [open, setOpen] = React.useState(false);
  const [itemClicked, setItemClicked] = React.useState({});
  const [itemRecommended, setItemRecommended] = React.useState([]);

  const handleClickOpen = (item) => {
    setItemClicked(item);
    console.log(itemClicked.name);
    getItemRecommended(item.name).then((response) => {
        console.log(response);
        if (response.statusText === "OK") {
          const result = response.data.split(/\r?\n/).filter(element => element);
          console.log(result);
          setItemRecommended(result)
          setOpen(true);
        }
      });
  };

  const handleClose = () => {
    setOpen(false);
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

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", height: "100vh", color: "#f5f5f5", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Box style={{ marginTop: "15vh", height: "85vh", width: "100%", flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Box style={{ height: "100%", width: "95%", overflowY: 'scroll' }}>
              <Grid container xs={6} md={12} spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                {steamGames.map((item) => (
                  <Grid item xs={2} sm={4} md={4} key={item.name}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea onClick={() => { handleClickOpen(item); }} >
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.url}
                          alt="game img"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                          </Typography>
                          <Typography variant="caption" display="block" gutterBottom style={{ fontStyle: 'italic' }} >
                            {item.genre}
                          </Typography>
                          <Typography variant="body2" color="initial">
                            {item.desc_snippet}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  {"Item Recommended"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    If you like the game {itemClicked.name}, our algorithm recommends you to try these games by order. You may well enjoy it.
                  </DialogContentText>
                  <Grid container xs={6} md={12} spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {itemRecommended.map((item) => (
                    <Grid item xs={2} sm={4} md={4} key={item}>
                      <img src={getGameImg(item)} alt={item} height={50} width={50} />
                    </Grid>
                  ))}
                </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default ModeItemToItem;
