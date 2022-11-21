import React from 'react';
import {
  BrowserRouter, Route, Routes} from 'react-router-dom';

import HomePage from "./apps/HomePage/index";
import MenuPage from "./apps/MenuPage/index";
import ModeSteam from "./apps/ModeSteam/index";
import ModeItemToItem from "./apps/ModeItemToItem/index";
import ModeProfile from "./apps/ModeProfile/index";
import ModeEvaluation from "./apps/ModeEvaluation/index";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <HomePage />} />
        <Route exact path="/menu" element={ <MenuPage /> } />
        <Route exact path="/mode1" element={ <ModeSteam /> } />
        <Route exact path="/mode2" element={ <ModeItemToItem /> } />
        <Route exact path="/mode3" element={ <ModeProfile /> } />
        <Route exact path="/mode4" element={ <ModeEvaluation /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;