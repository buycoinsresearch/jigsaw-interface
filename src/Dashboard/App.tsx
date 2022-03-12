import React, { useContext, useState } from 'react';
import { create } from 'ipfs-http-client';
import logo from '../jigsaws.png';
import pad from '../Pad.png';
import './App.css';
import 'react-bootstrap';
import IpfsUpload from '../ImageHandler/IpfsUpload';
import { NFT } from '../Components/NFT';
import { sha256 } from 'ethers/lib/utils';
import { Buffer } from 'buffer';
import abi from '.././JigsawABI.json';
import { ethers, Signer } from 'ethers';
import { useTransaction } from 'wagmi'
import detectEthereumProvider from '@metamask/detect-provider';

const contractAddress = '0x60556c2845F3c7a606Eb94c2d56211d6bf3c43c1';
const contract = new ethers.Contract(contractAddress, abi, ethers.getDefaultProvider());
console.log(contract);
const infuraProvider = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`;


function App() {

  const [file, setFile] = useState<File>();
  const [nftURL, setNftURL] = useState<string>();
  const [nft, setNFT] = useState<NFT[] | undefined>()
  const [imageSize, setImageSize] = useState<{ width: number, height: number }>()
  const [{ data, error, loading }, sendTransaction] = useTransaction({
    request: {
      to: contractAddress,
      data: "",
    },
  })


  async function Mint(solution: NFT[], uri: string) {
    const stringSolution = JSON.stringify(solution)
    console.log(stringSolution);
    const buffer = Buffer.from(stringSolution);

    const hash = sha256(buffer);
    console.log(buffer, hash);

    const abiCoder = new ethers.utils.Interface(abi);
    const encodedData = abiCoder.encodeFunctionData("createNFTs", [[hash], [uri]]);
    
    if (window.ethereum) {
     
      const address: string = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      console.log(encodedData);

      await window.ethereum.request({
        method: 'eth_sendTransaction' as any,
        params: [{
          from: address[0],
          to: contractAddress,
          data: encodedData,
        }] as any,
      })
    
    }
}


  function Solution(uri: string, rows: number, columns: number) {
    const img = new Image();
    img.src = uri;
    // img.onload = () => {
        setImageSize({ width: img.width, height: img.height })
        setNFT(
            Array.from(Array(rows * columns).keys())
                .map(position => ({
                    correctPosition: position,
                    tileHeight: img.height / rows,
                    tileWidth: img.width / columns,
                    tileOffsetX: (position % columns) * (img.width / columns),
                    tileOffsetY: Math.floor(position / columns) * (img.height / rows),
                    solved: true
                }))
        )
        console.log(nft)
    // }

    return nft;
}
  
  const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  
  const handleFileChange = (e: any) => {
    const fileData: File = e.target.files[0];
    setFile(fileData);
    
    const URL = window.URL || window.webkitURL;
    const image = document.getElementById('nft') as HTMLImageElement;
    image.src = URL.createObjectURL(fileData);
    
  }

  const fileUpload = async () => {
    if(file != null) {
      // const CUD = await IpfsUpload(file);
      const CID = await client.add(file);
      const url = `https://ipfs.io/ipfs/${CID.cid.toString()}`
      const metadata = JSON.stringify({
          "name": file.name,
          "description": "Jigsaw puzzle",
          "image": url,
          "attributes": []
      })

      setNftURL(url);
      
      const solution = Solution(url!, 3, 3)!

      const metadataCID = await client.add(metadata);
      const metedataURL = `https://ipfs.io/ipfs/${metadataCID.cid.toString()}`
      Mint(solution!, metedataURL);
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
