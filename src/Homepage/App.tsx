import React, { useContext, useState } from 'react';
import logo from '../jigsaws.png';
import jigsaw from '../jigsaw.png';
import './App.css';
import Header from './Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PieceOne from '../Piece.png'

function App() {

  return (
    <div className="App">
      <Header />
      <div className="hero">
        <h2>Create a Proof-of-Work NFT Puzzle game with Jigsaw</h2>
         <h3>Create a puzzle to earn a Jigsaw token.</h3>
          <h3>Solve jigsaw puzzles to win an NFT.</h3>
        <span className="buttons">
        <button><a href={window.location.href + 'create'}>Create Puzzle</a></button>
        <button><a href={window.location.href + 'games'}>Solve Puzzles</a></button>
        </span>
      </div>
    </div>
  );
}

export default App;
