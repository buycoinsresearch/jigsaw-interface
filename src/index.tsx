import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Jigsaw from './route';
import { ethers } from 'ethers';

const POLLING_INTERVAL = 12000;

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  return library;
};

ReactDOM.render(
  <React.StrictMode>
    {/* <Web3ReactProvider getLibrary={getLibrary}> */}
    {/* <WalletConnectProvider
      redirectUrl={window.location.href}
      storageOptions= {{
        // asyncStorage: AsyncStorage,
      }}> */}
      <Jigsaw />
      {/* </WalletConnectProvider> */}
    {/* </Web3ReactProvider> */}
      
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
