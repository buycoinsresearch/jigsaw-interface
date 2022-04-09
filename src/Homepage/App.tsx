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
        <h2>Create</h2>
        <span className="buttons">
        <button><a href={window.location.href + 'create'}>Create NFT</a></button>
        <button><a href={window.location.href + 'games'}>View NFTs</a></button>
        </span>
      </div>
    </div>
  );
}

export default App;
