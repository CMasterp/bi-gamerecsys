import React, { useState } from "react";
import configureStore from "../../store";

import {
  Box,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core";
import { Provider } from "react-redux";
import BackgroundImage from '../../img/back.png';
import ChooseMode from '../../img/choosemode.png';

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
        <Box style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", height: "100vh", color: "#f5f5f5", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div>
            <img style={{ width: "100%", height: "100%" }} src={ChooseMode} alt="choosemode" />
          </div>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default MenuPage;
