import React, { useState } from "react";
import configureStore from "../../store";

import {
  Box,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core";
import { Provider } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BackgroundImage from '../../img/backgroundimg.png';

const store = configureStore();

const MenuPage = () => {

  const theme = createMuiTheme({
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
        <Box style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", height: "100vh", color: "#f5f5f5", display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
          <IconButton aria-label="play icon" size="large" color="secondary">
            <PlayCircleOutlineIcon />
          </IconButton>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default MenuPage;
