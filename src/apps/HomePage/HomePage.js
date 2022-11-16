import React, { useState } from "react";
import configureStore from "../../store";

import {
  Box,
  Avatar,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core";
import { Provider } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BackgroundImage from '../../img/backgroundimg.png';
import PlayButton from '../../img/playbutton.png';
import PlayButtonHover from '../../img/playbuttonhover.png';

const store = configureStore();

const HomePage = () => {

  const onPlay = () => { window.location.pathname = `/menu`; };

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

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
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={onPlay} >
          {!isHovering && ( <div> <img src={PlayButton} alt="play icon" height={105} width={104} /> </div> )}
          {isHovering && ( <div> <img src={PlayButtonHover} alt="play icon hover" height={105} width={104} /> </div> )}
        </div>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default HomePage;
