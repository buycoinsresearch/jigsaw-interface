import { JigsawPuzzle, play } from './jigsaw-puzzle'
import './jigsaw-puzzle.css'
import { useContext, useEffect, useState } from 'react';
import { NFT } from '../Components/NFT';
import { Buffer } from 'buffer';
import abi from '../JigsawABI.json';
import { ethers, Signer } from 'ethers';
import { create } from 'ipfs-http-client'

const contractAddress = "0xcE85907b8962D1b908747f7A100fA947934812a2"
const infuraUrl = `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`
const provider = new ethers.providers.JsonRpcProvider(infuraUrl)
const contract = new ethers.Contract(contractAddress, abi, provider);
const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function Play() {
    const [nft, setNFT] = useState<NFT[] | undefined>()
    const [gameImage, setGameImage] = useState({
        tokenId: 0,
        src: '',
        name: '',
        description: '',
        row: 0,
        column: 0,
    })
    const [imageSize, setImageSize] = useState<{ width: number, height: number }>()
    var cid: string = "";

    async function getNFT() {
      const location = window.location.href;
      const tokenId = location.split('/').pop();
      const metadataUrl = await contract.getTokenDetails(tokenId);
      const metadata = await (await fetch(metadataUrl)).json();
      const imageUrl = metadata["image"]
      
      setGameImage({
        tokenId: parseInt(tokenId!),
        src: imageUrl,
        name: metadata["name"],
        description: metadata["description"],
        row: metadata["attributes"][0].rows,
        column: metadata["attributes"][0].columns,
      })
      const playButton = document.getElementById('play-button') as HTMLButtonElement;
      playButton.disabled = true;
      return imageUrl;
    }


    useEffect(() => {
      cid = gameImage.src;
    }, [gameImage])

    useEffect(() => {
      const claimButton = document.getElementsByClassName('claim-button')[0] as HTMLButtonElement;
      claimButton.disabled = true;
      if (nft !== undefined) {
        submitSolution();
      }
    }, [nft])

    function toHexString(byteArray: Uint8Array) {
        return Array.from(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    }

    async function Claim() {
        const image = new Image();
        image.src = `${cid}`;
        
        const rows = gameImage.row;
        const columns = gameImage.column;
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
    }

    async function submitSolution() {
      const tokenId = gameImage.tokenId
      const sortedSolution: NFT[] = nft!.sort((a,b) => {
        if (a.correctPosition < b.correctPosition) {
            return -1
        } else if (a.correctPosition > b.correctPosition) {
            return 1
        }
        return 0
      })
      
      const stringSolution = sortedSolution.toString()
      const buffer = Buffer.from(stringSolution);
      const hexString = "0x" + toHexString(buffer) 

      const abiCoder = new ethers.utils.Interface(abi);
      const encodedData = abiCoder.encodeFunctionData("completePuzzle", [tokenId, hexString]);
      // console.log(hexString, encodedData, buffer);
      
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
           <div className="play">
            <button onClick={getNFT} id="play-button">Click to Play</button>
           </div>
          <div id="gamepage">
            <div className="game">
              <div className="game-board">
                <JigsawPuzzle
                    imageSrc={gameImage.src}
                    rows={gameImage.row}
                    columns={gameImage.column}
                    onSolved={() => {
                        const claim = document.getElementsByClassName('claim')[0] as HTMLDivElement;
                        const claimButton = document.getElementsByClassName('claim-button')[0] as HTMLButtonElement;
                        claimButton.disabled = false;
                        claim.onclick = () => {
                            Claim();
                        }
                      }
                    }
                    />
             </div>
           </div>
          </div>
          <div className="claim">
            <button className="claim-button">Claim</button>
          </div>
        </div>
    );
}


export default Play;