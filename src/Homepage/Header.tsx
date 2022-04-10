import React, { useEffect, useState } from 'react';
import logo from '../jigsaws.png';
import detectEthereumProvider from '@metamask/detect-provider';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
global.Buffer = global.Buffer || require('buffer').Buffer;

function Header() {
    const [address, setAddress] = useState('');
    const [home, setHome] = useState('');
    const [chainId, setChainId] = useState<number>(0);
    // Create a connector
    const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org", // Required
        qrcodeModal: QRCodeModal,
    });

    async function connect() {
        const provider = await detectEthereumProvider();
        if (provider) {
            const accounts = await (window.ethereum)!.request({
                method: 'eth_requestAccounts',
            })
            setAddress(accounts[0]);
            window.localStorage.setItem('address', accounts[0]);
        } else { 
            // Check if connection is already established
            if (!connector.connected) {
                // create new session
                await connector.createSession();
            }

            const session = window.localStorage.getItem('walletconnect');
            const parsedSession = JSON.parse(session!);
            setAddress(parsedSession.accounts[0]);
            setChainId(parsedSession.chainId);  
            window.localStorage.setItem('address', parsedSession.accounts[0]);
        }
    }

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
        if (error) {
        throw error;
        }
    
        // Get provided accounts and chainId
        const { accounts, chainId } = payload.params[0];
        setAddress(accounts[0]);
        setChainId(chainId);
    });
    
    connector.on("session_update", (error, payload) => {
        if (error) {
        throw error;
        }
    
        // Get updated accounts and chainId
        const { accounts, chainId } = payload.params[0];
        setAddress(accounts[0]);
        setChainId(chainId);
    });
    
    connector.on("disconnect", (error, payload) => {
        if (error) {
        throw error;
        }
    
        // Delete connector
    });

    useEffect(() => {
        if (window.localStorage.getItem('address')) {
            setAddress(window.localStorage.getItem('address')!);
        }
        if (address !== "") {
            const connect = document.getElementById("connect-wallet") as HTMLButtonElement;
            const slicedAddress = address.slice(0, 6) + "..." + address.slice(-4);
            connect.innerHTML =  slicedAddress;
        }
        if (chainId !== 4 && chainId !== 0) {
            alert('Please connect to Rinkeby testnet')
            console.log(chainId);
        }
        const home = window.location.href.split("/");
        setHome("http://" + home[2]);
    }, [address])

    useEffect(() => {
        if (chainId !== 4 && chainId !== 0) {
            alert('Please connect to Rinkeby testnet')
            console.log(chainId);
        }
    }, [chainId])

    async function disconnect() {
        setAddress("");
        window.localStorage.setItem('address', "");
        if (connector.connected) {
            window.localStorage.setItem('walletconnect', "");
        } 
        alert("wallet disconnected")
        window.location.reload();
    }

    return (
        <div className="App-header">
        <a href={home}><img src={logo} className="App-logo" alt="logo" /></a>
        <button id="connect-wallet" onClick={connect}>Connect wallet</button>
        {address !== "" && 
        <button id="connect-wallet" onClick={disconnect}>&times;</button>}
        </div>
    )
}

export default Header;