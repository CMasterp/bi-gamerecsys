import React from "react";

import {
  ThemeProvider
} from "@material-ui/core";
import { Provider } from "react-redux";
import { createTheme } from '@material-ui/core/styles'
import configureStore from "../../store";

const store = configureStore();

const ModeProfile = () => {

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
      </ThemeProvider>
    </Provider>
  );
};

export default ModeProfile;
