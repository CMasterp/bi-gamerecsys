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

const store = configureStore();

const RecommendBySteam = () => {

  const [open, setOpen] = React.useState(false);
  const [itemClicked, setItemClicked] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
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
              <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  {"Item Recommended"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    If you like the game {itemClicked.name}, our algorithm recommends you to try the game ___ . You may well enjoy it.
                  </DialogContentText>
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

export default RecommendBySteam;