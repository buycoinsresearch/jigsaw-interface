import { JigsawPuzzle, play } from './jigsaw-puzzle'
import './jigsaw-puzzle.css'
import { useContext, useEffect, useState } from 'react';
import { NFT } from '../Components/NFT';
import { Buffer } from 'buffer';
import abi from '../JigsawABI.json';
import { ethers, Signer } from 'ethers';
import { create } from 'ipfs-http-client'

const contractAddress = '0xB30d25a037AefD6C90B4F6f8a3333bbb832F9385';
const contract = new ethers.Contract(contractAddress, abi, ethers.getDefaultProvider());
const infuraProvider = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`;
const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function Play() {
    const [nft, setNFT] = useState<NFT[] | undefined>()
    const [gameImage, setGameImage] = useState({
        src: '',
        name: '',
        description: '',
    })
    const [imageSize, setImageSize] = useState<{ width: number, height: number }>()
    var cid: string = "";

    async function getNFT() {
      const location = window.location.href;
      const metadataCid = location.split('/').pop();
      const metadataUrl = "https://ipfs.io/ipfs/QmawffoMaNvsHy6N3UgcvELbzyG3WjAYE2MhKYzPawVQjA/1.json";
      const metadata = await (await fetch(metadataUrl)).json();
      const imageUrl = metadata["image"]
      
      setGameImage({
        src: imageUrl,
        name: metadata["name"],
        description: metadata["description"],
      })
      return imageUrl;
    }


    useEffect(() => {
      cid = gameImage.src;
      console.log(gameImage.src)
    }, [gameImage])

    function toHexString(byteArray: Uint8Array) {
        return Array.from(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    }

    async function Claim(tokenId: number) {
        const image = new Image();
        image.src = `${cid}`;
        
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
        <div>
           <button onClick={getNFT}>Play</button>
          <div id="gamepage">
          <div className="game">
            <div className="game-board">
              <JigsawPuzzle
                  imageSrc={gameImage.src}
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
          </div>
        </div>
    );
}


export default Play;