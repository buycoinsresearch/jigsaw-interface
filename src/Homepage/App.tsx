import React, { useContext, useState } from 'react';
import logo from '../jigsaws.png';
import jigsaw from '../jigsaw.png';
import './App.css';
import Header from './Header';

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
      <div className="about">
        <h2>About Jigsaw</h2>
        <div>
          <p>This project introduces an NFT Minting primitive called Jigsaw.</p>
          <p>
            As the name suggests, Jigsaw is based off the popular <i>
               tiling puzzle that requires the assembly of often oddly shaped interlocking and mosaiced pieces, each of which typically has a portion of a picture; when assembled, they produce a complete picture
            </i>.
            <a href="https://en.wikipedia.org/wiki/Jigsaw_puzzle">
              [1]
            </a>
          </p>
          <p>
            When you create a Jigsaw, the NFT is created as a Jigsaw puzzle and collectors can only mint the NFT after solving the puzzle.
          </p>
          <p>
            Creators can determine the complexity of their puzzle by specifying the number of rows and columns they want the image divided into.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
