import { JigsawPuzzle, play } from './jigsaw-puzzle'
import './jigsaw-puzzle.css'
import { useContext, useEffect, useState } from 'react';
import { NFT } from '../Components/NFT';
import { Buffer } from 'buffer';
import abi from '../JigsawABI.json';
import { ethers, Signer } from 'ethers';
import { create } from 'ipfs-http-client'
import Header from '../Homepage/Header';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const contractAddress = "0xcE85907b8962D1b908747f7A100fA947934812a2"
const infuraUrl = `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`
const provider = new ethers.providers.JsonRpcProvider(infuraUrl)
const contract = new ethers.Contract(contractAddress, abi, provider);
const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
});

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
    const [loading, setLoading] = useState(false);
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
      // const claimButton = document.getElementsByClassName('claim-button')[0] as HTMLButtonElement;
      // claimButton.disabled = true;
      if (nft !== undefined) {
        submitSolution();
      }
    }, [nft])

    function toHexString(byteArray: Uint8Array) {
        return Array.from(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    }

    async function sendWalletTransaction(encodedData: string) {
      const session = window.localStorage.getItem('walletconnect');
      const parsedSession = JSON.parse(session!);
      const address = parsedSession.accounts[0];
      const tx = {
          from: address,
          to: contractAddress,
          data: encodedData,
      }
      setLoading(true);
      //Send transaction
      await connector
          .sendTransaction(tx)
          .then((result) => {
              console.log(result);
              alert("Transaction sent!");
              setLoading(false);
              window.location.reload();
          })
          .catch((error) => {
              console.error(error);
              alert("Transaction rejected. Please try again.");
              setLoading(false);
          })
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
        
        if (window.localStorage.getItem("address") === "") {
          await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          .then((address) => {
            window.localStorage.setItem('address', address[0])
            setLoading(true);
          })
        }
        
        await window.ethereum.request({
          method: 'eth_sendTransaction' as any,
          params: [{
            from: window.localStorage.getItem('address'),
            to: contractAddress,
            data: encodedData,
          }] as any,
        })
        .then((response) => {
          alert("Transaction sent!");
          console.log(response);
          setLoading(false);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          alert("Transaction rejected. Please try again.");
        })
      
      } else {
        if (!connector.connected) {
            await connector.createSession()
            .then((address) => {
              sendWalletTransaction(encodedData);
            })
            .catch((err) => {
              alert("Failed to connect wallet")
              setLoading(false);
            })
        } else {
          sendWalletTransaction(encodedData);
        }
    }
    }

    return (
        <div>
          <Header />
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
            <button className="claim-button" disabled={loading}>
              {loading && <FontAwesomeIcon icon={faSpinner} />}
              Claim NFT
              </button>
          {loading && <h5>Open your wallet to confirm the transaction</h5>}
          </div>
        </div>
    );
}


export default Play;