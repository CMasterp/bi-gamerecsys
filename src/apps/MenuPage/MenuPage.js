/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import {
  Box,
  ThemeProvider
} from "@material-ui/core";
import { Provider } from "react-redux";
import { createTheme } from '@material-ui/core/styles'
import BackgroundImage from '../../img/back.png';
import ChooseMode from '../../img/choosemode.png';
import ChooseCursor4 from '../../img/5.png';
import ChooseCursor3 from '../../img/6.png';
import ChooseCursor2 from '../../img/7.png';
import ChooseCursor1 from '../../img/8.png';
import configureStore from "../../store";

const store = configureStore();

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

const MenuPage = () => {
  const modeHover = React.useRef(1);
  const [modeHoverr, setModeHoverr] = React.useState(1);

  function increment(x) { if (x === 4) { return 1; } else { return x + 1 ; } }
  function decrement(x) { if (x === 1) { return 4; } else { return x - 1 ; } }

  const actionXMap = {
     ArrowLeft: decrement,
     ArrowRight: increment
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      window.location.pathname = `/mode${modeHover.current}`;
    }
    const actionX = actionXMap[e.key];
    actionX && (modeHover.current = actionX(modeHover.current));
    setModeHoverr(modeHover.current);
    console.log(modeHover.current);
  }

  React.useLayoutEffect(()=>{
    document.addEventListener("keydown", handleKeyPress);
  },[])

  if (modeHoverr === 1) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Box onKeyPress={handleKeyPress} style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", height: "100vh", color: "#f5f5f5", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{ backgroundImage: `url(${ChooseMode})`, backgroundSize: "cover" }}>
              <img style={{ width: "100%", height: "100%" }} src={ChooseCursor1} alt="choosecursor" />
            </div>
          </Box>
        </ThemeProvider>
      </Provider>
    );
  }

  if (modeHoverr === 2) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Box onKeyPress={handleKeyPress} style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", height: "100vh", color: "#f5f5f5", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{ backgroundImage: `url(${ChooseMode})`, backgroundSize: "cover" }}>
              <img style={{ width: "100%", height: "100%" }} src={ChooseCursor2} alt="choosecursor" />
            </div>
          </Box>
        </ThemeProvider>
      </Provider>
    );
  }

  if (modeHoverr === 3) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Box onKeyPress={handleKeyPress} style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", height: "100vh", color: "#f5f5f5", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{ backgroundImage: `url(${ChooseMode})`, backgroundSize: "cover" }}>
              <img style={{ width: "100%", height: "100%" }} src={ChooseCursor3} alt="choosecursor" />
            </div>
          </Box>
        </ThemeProvider>
      </Provider>
    );
  }

  if (modeHoverr === 4) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Box onKeyPress={handleKeyPress} style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", height: "100vh", color: "#f5f5f5", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{ backgroundImage: `url(${ChooseMode})`, backgroundSize: "cover" }}>
              <img style={{ width: "100%", height: "100%" }} src={ChooseCursor4} alt="choosecursor" />
            </div>
          </Box>
        </ThemeProvider>
      </Provider>
    );
  }
};

export default MenuPage;