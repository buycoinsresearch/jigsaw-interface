import React, { useEffect, useState } from 'react';
import logo from '../jigsaws.png';
import { ethers, providers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

function Header() {
    const [address, setAddress] = useState('');
    const [home, setHome] = useState('');
    const [injected, setInjected] = useState(true)

    async function connect() {
        const provider = await detectEthereumProvider();
        if (provider) {
            const accounts = await (window.ethereum)!.request({
                method: 'eth_requestAccounts',
            })
            setAddress(accounts[0]);
            window.localStorage.setItem('address', accounts[0]);
        } else {
            // Create a connector
            const connector = new WalletConnect({
                bridge: "https://bridge.walletconnect.org", // Required
                qrcodeModal: QRCodeModal,
            });
            
            // Check if connection is already established
            if (!connector.connected) {
                // create new session
                connector.createSession();
            }
        }
    }

    useEffect(() => {
        if (window.localStorage.getItem('address')) {
            setAddress(window.localStorage.getItem('address')!);
        }
        if (address !== "") {
            const connect = document.getElementById("connect-wallet") as HTMLButtonElement;
            const slicedAddress = address.slice(0, 6) + "..." + address.slice(-4);
            connect.innerHTML =  slicedAddress;
        }
        
        const home = window.location.href.split("/");
        setHome("http://" + home[2]);
    }, [address])

    return (
        <div className="App-header">
            {/* {account 
                ? <button onClick={() => deactivate()}>Disconnect</button> 
                : <button onClick={() => {
                    activate(WalletConnect, undefined, true)
                    .then((resp) => console.log(resp))
                    .catch((err) => console.log(err))
                }}>Connect</button>
            } */}
        <a href={home}><img src={logo} className="App-logo" alt="logo" /></a>
        <button id="connect-wallet" onClick={connect}>Connect wallet</button>
        </div>
    )
}

export default Header;