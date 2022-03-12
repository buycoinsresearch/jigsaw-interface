import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Dashboard/App';
import Game from './Game/Play';
import reportWebVitals from './reportWebVitals';
import { Connector } from './Wallet/Connector';
import { Provider } from 'wagmi';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Connector />
      {/* <Game /> */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
