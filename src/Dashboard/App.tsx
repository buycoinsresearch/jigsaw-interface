import React, { useContext, useState } from 'react';
import { create } from 'ipfs-http-client';
import logo from '../jigsaws.png';
import pad from '../Pad.png';
import './App.css';
import 'react-bootstrap';
import IpfsUpload from '../ImageHandler/IpfsUpload';

function App() {

  const [file, setFile] = useState<File>();
  const [nftURL, setNftURL] = useState<string>();
  
  const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  
  const handleFileChange = (e: any) => {
    const fileData: File = e.target.files[0];
    setFile(fileData);
    
    const URL = window.URL || window.webkitURL;
    const image = document.getElementById('nft') as HTMLImageElement;
    image.src = URL.createObjectURL(fileData);
    console.log(fileData)
  }

  const fileUpload = async () => {
    if(file != null) {
      // const CUD = await IpfsUpload(file);
      const CID = await client.add(file);
      setNftURL(`https://ipfs.io/ipfs/${CID.cid.toString()}`);
      console.log(nftURL);
    }
  }

  return (
    <div className="App">
      <header className="App-header container">
        <span>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className='App-name'>JIGSAW</h1>
        </span>
      </header>
      <div className="App-hero container">
        <div className="App-hero-text">
          <h1>JIGSAW PUZZLE</h1>
        </div>
        <img src={pad} className="App-hero-image" alt="hero" />
      </div>
      <div className='mint'>
        <input type="file" accept='image/png, image/jpg, image/jpeg' onChange={handleFileChange} /><br />
        <img className="nft-image" id='nft' alt="nft" /><br />
        <button onClick={fileUpload}>Mint</button>
      </div>
      
    </div>
  );
}

export default App;
