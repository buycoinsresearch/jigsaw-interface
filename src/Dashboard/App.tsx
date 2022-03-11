import React, { useContext, useState } from 'react';
import { create } from 'ipfs-http-client';
import logo from './logo.svg';
import './App.css';
import Split from '../ImageHandler/Split';

function App() {

  const [file, setFile] = useState<File>();
  
  // const pinata = Pinata(pinataKey, pinataSecret);
  const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  
  const handleFileChange = (e: any) => {
    const fileData: File = e.target.files[0];
    const height = e.target.offsetHeight;
    const width = e.target.offsetWidth;
    console.log(height, width);
    const URL = window.URL || window.webkitURL;
    const image = document.getElementsByTagName('img')[0];
    
    setFile(fileData);
    image.src = URL.createObjectURL(fileData);
    console.log("width", image.width)
    
  }

  const fileUpload = async () => {
    if(file != null) {
      const fileStream = await client.add(file);
      const image = document.getElementsByTagName('img')[0];
      const imagePieces = Split(3, 3, file, image);
      for (var i=0; i<imagePieces.length; i++) {
        console.log("got here")
        const imagePart = document.createElement('img');
        imagePart.src = imagePieces[i];
        document.body.appendChild(imagePart);
      }
      console.log(fileStream);
    }
  }

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} />
      <button onClick={fileUpload}>Upload image</button>
      <img className="nft-image" alt="nft" max-width={100} />
      
    </div>
  );
}

export default App;
