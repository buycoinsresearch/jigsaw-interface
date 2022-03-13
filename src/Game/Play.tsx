import { JigsawPuzzle, play } from './jigsaw-puzzle'
import './jigsaw-puzzle.css'
import { useContext, useEffect, useState } from 'react';
import { NFT } from '../Components/NFT';
import { Buffer } from 'buffer';
import abi from '.././JigsawABI.json';
import { ethers, Signer } from 'ethers';
import App from '../Dashboard/App';

const contractAddress = '0x60556c2845F3c7a606Eb94c2d56211d6bf3c43c1';
const contract = new ethers.Contract(contractAddress, abi, ethers.getDefaultProvider());
const infuraProvider = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`;

function Game() {
    const [nft, setNFT] = useState<NFT[] | undefined>()
    const [imageSize, setImageSize] = useState<{ width: number, height: number }>()

    async function Claim(solution: NFT[], tokenId: number) {
        const image = new Image();
        image.src = "https://ipfs.io/ipfs/QmQFSK25rGFLkV4wFdzdyipXfm6rH2SyLuuvuDGFHqTirL";
        
        const rows = 3;
        const columns = 3;
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
        var sortedSolution: NFT[];
        
        // useEffect(() => {
            if (nft !== undefined) {
                sortedSolution = nft!.sort((a,b) => {
                    if (a.correctPosition < b.correctPosition) {
                        return -1
                    } else if (a.correctPosition > b.correctPosition) {
                        return 1
                    }
                    return 0
                })
            }
        // }, [nft])

        const stringSolution = JSON.stringify(sortedSolution!);
        console.log(stringSolution);
        const buffer = ethers.utils.formatBytes32String(stringSolution);
        console.log(buffer)
        const abiCoder = new ethers.utils.Interface(abi);
        const encodedData = abiCoder.encodeFunctionData("completePuzzle", [tokenId, buffer]);
        
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

    return (
        <div className="game">
            <div className="game-board">
            <JigsawPuzzle
                imageSrc='https://ipfs.io/ipfs/QmTkVSywTTgrrK7TeMk8Fb4fYzHXJgEvksGZa5HGeDuLgo'
                rows={3}
                columns={3}
                onSolved={() => {
                
                    console.log(play)

                }
                    }
                />
            </div>
            <div className="claim">
                <button onClick={() => Claim(play!, 11)}>Claim</button>
            </div>
        </div>
    );
}


export default Game;