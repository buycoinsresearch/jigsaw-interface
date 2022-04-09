import { InjectedConnector } from '@web3-react/injected-connector'

// Other possible connectors
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
// import { LedgerConnector } from '@web3-react/ledger-connector';
// import { BscConnector } from '@binance-chain/bsc-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 1337],
});

export const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    appName: "Web3-react Demo",
    supportedChainIds: [1, 3, 4, 5, 42],
   });
   
export const WalletConnect = new WalletConnectConnector({
    rpc: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
   
   }); 