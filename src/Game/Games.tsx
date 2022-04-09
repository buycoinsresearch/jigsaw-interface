import './Games.css';
import abi from '../JigsawABI.json'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Header from '../Homepage/Header';

const contractAddress = "0xcE85907b8962D1b908747f7A100fA947934812a2"
const infuraUrl = `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`
const provider = new ethers.providers.JsonRpcProvider(infuraUrl)
const contract = new ethers.Contract(contractAddress, abi, provider);

export default function Game() {
    const [valid, setValid] = useState<{src: string, name: string, description: string, tokenId: number}[]>([]);
    const [invalid, setInvalid] = useState<{src: string, name: string, description: string}[]>([]);
    const [validUriIndex, setValidUriIndex] = useState(0);
    const [invalidUriIndex, setInvalidUriIndex] = useState(0);

    async function getNFT(metadataUrl: string, tokenId: number) {
        const metadata = await (await fetch(metadataUrl)).json();
        const imageUrl = metadata["image"]
        const name = metadata["name"]
        const description = metadata["description"]

        return {
            src: imageUrl,
            name: name,
            description: description,
            tokenId: tokenId
        }
    }

    async function getGames() {
        var validIndex: number = 0;
        var invalidIndex: number = 0;
        var total = await contract.total();
        while (validIndex < 5 && invalidIndex < 5 && total > 0) {
            const tokenStatus = await contract.getTokenStatus(total);
            const metadataUrl = await contract.getTokenDetails(total);
            const nft = await getNFT(metadataUrl, total);
            if (tokenStatus == false && validIndex < 5) {
                setValid(valid => [...valid, nft]);
                validIndex++;
                if (validIndex == 5) {
                    setValidUriIndex(total);
                }
            } else if (tokenStatus == true && invalidIndex < 5) {
                setInvalid(invalid => [...invalid, nft]);
                invalidIndex++;
                if (invalidIndex == 5) {
                    setInvalidUriIndex(total);
                }
            }
            total--;
        }
    }

    async function playGame(index: number) {
        const currentPage = window.location.href;
        const newPage = currentPage + "/" + valid[index].tokenId;
        window.location.href = newPage;
    }

    useEffect(() => {
        getGames()
    }, [])

    useEffect(() => {
    }, [valid, invalid])

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
          
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
      
    return (
        <div className="container">
            <Header />
            <div className="games">
                <h2>Active Puzzles</h2>
                <Carousel responsive={responsive} >
                    {valid!.map((game, index) => (
                        <div className="game" key={index}>
                            <img src={game.src} alt="" />
                            <h3>{(game.name).slice(0, 15)}</h3>
                            <p>{(game.description).slice(0, 120)}</p>
                            <button onClick={() => {playGame(index)}}>Play</button>
                        </div>
                    ))}   
                </Carousel>
                {/* <div>
                    <button className='games-button'><a href='#'>See more</a></button>
                </div>  */}
            </div>
            <div className="games">
                <h2>Solved Puzzles</h2>
                <Carousel responsive={responsive} >
                    {invalid!.map((game, index) => (
                        <div className="game" key={index}>
                            <img src={game.src} alt="" />
                            <h3>{game.name}</h3>
                            <p>{game.description}</p>
                        </div>
                    ))}
                    {/* <div>
                        <button className='games-button'><a href='#'>See more</a></button>
                    </div> */}
                </Carousel>
            </div>
        </div>
    )
}