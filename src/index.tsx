import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Jigsaw from './route';

ReactDOM.render(
  <React.StrictMode>
      {/* <meta name="twitter:card" content="Create a Proof-of-Work NFT Puzzle game with Jigsaw" /> */}
      <meta name="twitter:site" content="Jigsaw" />
      <meta name="og:title" content="Jigsaw" />
      <meta name="og:description" content="Create a Proof-of-Work NFT Puzzle game with Jigsaw" />
      <meta name="og:image" content="../public/jigsaws.png" />
      <Jigsaw />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
