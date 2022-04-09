import React, { useEffect, useState } from 'react';
import logo from '../jigsaws.png';
import jigsaw from '../jigsaw.png';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

function Header() {
    const [address, setAddress] = useState('');
    const [home, setHome] = useState('');

    async function connect() {
        const provider = await detectEthereumProvider();
        if (provider) {
            const accounts = await (window.ethereum)!.request({
                method: 'eth_requestAccounts',
            })
            setAddress(accounts[0]);
            window.localStorage.setItem('address', accounts[0]);
        }
    }

    useEffect(() => {
        if (window.localStorage.getItem('address')) {
            console.log("yes")
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
        <a href={home}><img src={logo} className="App-logo" alt="logo" /></a>
        <button id="connect-wallet" onClick={connect}>Connect wallet</button>
        </div>
    )
}

export default Header;