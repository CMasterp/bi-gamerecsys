import React from 'react';
import {
  BrowserRouter, Route, Routes, Redirect
} from 'react-router-dom';

import HomePage from "./apps/HomePage/index";
import MenuPage from "./apps/MenuPage/index";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <HomePage />} />
        <Route exact path="/menu" element={ <MenuPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;