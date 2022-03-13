import React, { useContext, useState } from 'react';
import logo from '../jigsaws.png';
import pad from '../Pad.png';
import './App.css';
import 'react-bootstrap';


function App() {

  return (
    <div className="App">
      <header className="App-header container">
        <span>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className='App-name'>JIGSAW</h1>
        </span>
      </header>
      <div className="App-hero container">
        <div className="App-hero-text">
          <h1>JIGSAW PUZZLE</h1>
        </div>
        <img src={pad} className="App-hero-image" alt="hero" />
      </div>
      
    </div>
  );
}

export default App;
