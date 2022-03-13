import React, { useState, useEffect } from 'react';
import './Mint.css';
import 'react-bootstrap';
import IpfsUpload from '../ImageHandler/IpfsUpload';
import { NFT } from '../Components/NFT';
import { sha256 } from 'ethers/lib/utils';
import { Buffer } from 'buffer';
import abi from '.././JigsawABI.json';
import { ethers, Signer } from 'ethers';
import { create } from 'ipfs-http-client';

const contractAddress = '0x60adBd2EFb2E65034df80882e1146e82f519A5A2';
const contract = new ethers.Contract(contractAddress, abi, ethers.getDefaultProvider());
console.log(contract);
const infuraProvider = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`;

function Create() {
    const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    const [file, setFile] = useState<File>();
    const [nftURL, setNftURL] = useState<string>();
    const [nft, setNFT] = useState<NFT[] | undefined>()
    const [imageSize, setImageSize] = useState<{ width: number, height: number }>()
    const [dimension, setDimension] = useState<{ row: number, column: number}>()

    function toHexString(byteArray: Uint8Array) {
        return Array.from(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
      }

    async function MintF(solution: NFT[], uri: string) {
        const stringSolution = JSON.stringify(solution)
        const buffer = Buffer.from(stringSolution);
        // const hexString = toHexString(buffer);
        const hash = sha256(buffer);

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
        const image = new Image();
        image.src = "https://ipfs.io/ipfs/QmPqfWBWF2YduKpta3kUSkfC6Bk7cidBJoVuhWprRsNCjo";
        image.onload = () => {
            setImageSize({ width: image.width, height: image.height })
            setNFT(
                Array.from(Array(rows * columns).keys())
                    .map(position => ({
                        correctPosition: position,
                        tileHeight: 1000 / rows,
                        tileWidth: 1000 / columns,
                        tileOffsetX: (position % columns) * (1000 / columns),
                        tileOffsetY: Math.floor(position / columns) * (1000 / rows),
                        solved: true
                    }))
            )
                }
            const sortedSolution: NFT[] = nft!.sort((a,b) => {
            if (a.correctPosition < b.correctPosition) {
                return -1
            } else if (a.correctPosition > b.correctPosition) {
                return 1
            }
            return 0
        })
        // }
        if (nft) {
            console.log(nft);
        }

        return sortedSolution;
    }
    
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
                "attributes": [
                    {
                    "rows": dimension!.row,
                    "columns": dimension!.column,
                    }
                ]
            })

            setNftURL(url);
            console.log(url)
            
            const solution = Solution(url!, dimension!.row, dimension!.column)!

            const metadataCID = await client.add(metadata);
            const metedataURL = `https://ipfs.io/ipfs/${metadataCID.cid.toString()}`
            MintF(solution!, metedataURL);
        }
    }

    const updateDimension = () => {
        const row = document.getElementById('row') as HTMLInputElement;
        const column = document.getElementById('column') as HTMLInputElement;
        setDimension({
            row: parseInt(row.value),
            column: parseInt(column.value)
        })
    }
    
    return (
    <div className="App">
        <header className="App-header container">
            
        </header>
        <div className="App-hero container">
    
        </div>
        <div className='mint'>
            <input type="file" accept='image/png, image/jpg, image/jpeg' onChange={handleFileChange} /><br />
            <input type="number" placeholder="rows" id='row' onChange={updateDimension} /><br />
            <input type="number" placeholder="columns" id='column' onChange={updateDimension} /><br />
            <img className="nft-image" id='nft' /><br />
            <input type="submit" value='MINT' onClick={fileUpload} />
        </div>
    
    </div>
    );
}
<Create />
export default Create;