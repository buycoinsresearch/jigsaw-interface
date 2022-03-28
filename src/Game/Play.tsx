import { JigsawPuzzle, play } from './jigsaw-puzzle'
import './jigsaw-puzzle.css'
import { useContext, useEffect, useState } from 'react';
import { NFT } from '../Components/NFT';
import { Buffer } from 'buffer';
import abi from '../JigsawABI.json';
import { ethers, Signer } from 'ethers';
import App from '../Dashboard/App';

const contractAddress = '0xB30d25a037AefD6C90B4F6f8a3333bbb832F9385';
const contract = new ethers.Contract(contractAddress, abi, ethers.getDefaultProvider());
const infuraProvider = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`;

function Play() {
    const [nft, setNFT] = useState<NFT[] | undefined>()
    const [imageSize, setImageSize] = useState<{ width: number, height: number }>()
    const location = window.location.href;
    const cid = location.split('/').pop();

    useEffect(() => {

    }, [nft])

    function toHexString(byteArray: Uint8Array) {
        return Array.from(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    }

    async function Claim(tokenId: number) {
        const image = new Image();
        image.src = `https://ipfs.io/ipfs/${cid}`;
        
        const rows = 3;
        const columns = 3;
        image.onload = () => {
          console.log(image.width, image.height);
            setImageSize({ width: image.width, height: image.height })
            setNFT(
                Array.from(Array(rows * columns).keys())
                    .map(position => ({
                        correctPosition: position,
                        tileHeight: image.height / rows,
                        tileWidth: image.width / columns,
                        tileOffsetX: (position % columns) * (image.width / columns),
                        tileOffsetY: Math.floor(position / columns) * (image.height / rows),
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

      const stringSolution = JSON.stringify(sortedSolution!);
      console.log(stringSolution);
      const buffer = Buffer.from(stringSolution);
      const hexString = "0x" + toHexString(buffer) 

      const abiCoder = new ethers.utils.Interface(abi);
      const encodedData = abiCoder.encodeFunctionData("completePuzzle", [tokenId, hexString]);
      console.log(buffer, hexString, encodedData);
      
      if (window.ethereum) {
        
        const address: string = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        //   console.log(encodedData);
  
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

    return (
        <div className="game">
            <div className="game-board">
              <JigsawPuzzle
                  imageSrc={`https://ipfs.io/ipfs/${cid}`}
                  rows={3}
                  columns={3}
                  onSolved={() => {
                  
                      const elem = document.createElement('button');
                      elem.innerHTML = 'Claim';
                      elem.onclick = () => {
                          Claim(1);
                      }
                      document.body.appendChild(elem);
                    }
                  }
                  />
            </div>
        </div>
    );
}


export default Play;