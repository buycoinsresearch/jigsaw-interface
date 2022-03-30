import './Games.css';
import abi from '../JigsawABI.json'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

const contractAddress = "0xB30d25a037AefD6C90B4F6f8a3333bbb832F9385"
const infuraUrl = `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`
const provider = new ethers.providers.JsonRpcProvider(infuraUrl)
const contract = new ethers.Contract(contractAddress, abi, provider);


export default function Game() {

    const [valid, setValid] = useState<{src: string, name: string, description: string}[]>([]);
    const [invalid, setInvalid] = useState<{src: string, name: string, description: string}[]>([]);

    // const validCarousel = document.getElementsByTagName('Carousel')[0] as HTMLElement;
    // const invalidCarousel = document.getElementsByTagName('Carousel')[1] as HTMLElement;

    async function getNFT(metadataUrl: string) {
        const metadata = await (await fetch(metadataUrl)).json();
        const imageUrl = metadata["image"]
        const name = metadata["name"]
        const description = metadata["description"]

        return {
            src: imageUrl,
            name: name,
            description: description,
        }
    }

    async function validGames() {
        const uris = await contract.getUris(1, 6, false)
        console.log(uris)
        for (let i = 0; i < uris.length; i++) {
            const metadataUrl = uris[i]
            const nft = await getNFT(metadataUrl)
            setValid(prevState => [...prevState!, nft])
        }
    }

    async function invalidGames() {
        const uris = await contract.getUris(1, 6, true)
        for (let i = 0; i < uris.length; i++) {
            const metadataUrl = uris[i]
            const nft = await getNFT(metadataUrl)
            setInvalid(prevState => [...prevState!, nft])
        }
    }

    useEffect(() => {
        validGames()
        invalidGames()
    })

    useEffect(() => {
        var newCarousel = ""
        if (valid!.length > 0) {
            for (let i = 0; i < valid!.length; i++) {
                newCarousel += `
                <div className='game'>
                    <img src="${valid![i].src}" alt="" />
                    <h3>${valid![i].name}</h3>
                    <p>${valid![i].description}</p>
                    <button>Test</button>
                </div>
                `
            }
        }
        // validCarousel.innerHTML = newCarousel

    }, [valid])

    useEffect(() => {
        var newCarousel = ""
        for (let i = 0; i < invalid!.length; i++) {
            newCarousel += `
            <div className='game'>
                <img src="${invalid![i].src}" alt="" />
                <h3>${invalid![i].name}</h3>
                <p>${invalid![i].description}</p>
                <button>Test</button>
            </div>
            `
        }
        // invalidCarousel.innerHTML = newCarousel
    }, [invalid])

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
            <div className="games">
                <h2>Active Games</h2>
                <Carousel responsive={responsive} >
                    <div className='game'>
                        <img src="https://ipfs.io/ipfs/QmUXJ31goEDcUJJHpg7xSAJuzpmHbQd2h8eqKCGT8Wyiou" alt=""/>
                        <h3>Jigsaw</h3>
                        <p>Lorem ipsum colon durag sitle lipo</p>
                        <button>Test</button>
                    </div>
                    <div className='game'>
                        <img src="https://ipfs.io/ipfs/QmUXJ31goEDcUJJHpg7xSAJuzpmHbQd2h8eqKCGT8Wyiou" alt=""/>
                        <h3>Jigsaw</h3>
                        <p>Lorem ipsum colon durag sitle lipo</p>
                        <button>Test</button>
                    </div>
                    <div className='game'>
                        <img src="https://ipfs.io/ipfs/QmUXJ31goEDcUJJHpg7xSAJuzpmHbQd2h8eqKCGT8Wyiou" alt=""/>
                        <h3>Jigsaw</h3>
                        <p>Lorem ipsum colon durag sitle lipo</p>
                        <button>Test</button>
                    </div>
                    <div className='game'>
                        <img src="https://ipfs.io/ipfs/QmUXJ31goEDcUJJHpg7xSAJuzpmHbQd2h8eqKCGT8Wyiou" alt=""/>
                        <h3>Jigsaw</h3>
                        <p>Lorem ipsum colon durag sitle lipo</p>
                        <button>Test</button>
                    </div>
                    <div>
                        <button className='games-button'><a href='#'>See more</a></button>
                    </div>
                </Carousel>
            </div>
            <div className="games">
                <h2>Inactive Games</h2>
                <Carousel responsive={responsive} >
                    <div className='game'>
                        <img src="https://ipfs.io/ipfs/QmUXJ31goEDcUJJHpg7xSAJuzpmHbQd2h8eqKCGT8Wyiou" alt=""/>
                        <h3>Jigsaw</h3>
                        <p>Lorem ipsum colon durag sitle lipo</p>
                        <button>Test</button>
                    </div>
                    <div className='game'>
                        <img src="https://ipfs.io/ipfs/QmUXJ31goEDcUJJHpg7xSAJuzpmHbQd2h8eqKCGT8Wyiou" alt=""/>
                        <h3>Jigsaw</h3>
                        <p>Lorem ipsum colon durag sitle lipo</p>
                        <button>Test</button>
                    </div>
                    <div className='game'>
                        <img src="https://ipfs.io/ipfs/QmUXJ31goEDcUJJHpg7xSAJuzpmHbQd2h8eqKCGT8Wyiou" alt=""/>
                        <h3>Jigsaw</h3>
                        <p>Lorem ipsum colon durag sitle lipo</p>
                        <button>Test</button>
                    </div>
                    <div className='game'>
                        <img src="https://ipfs.io/ipfs/QmUXJ31goEDcUJJHpg7xSAJuzpmHbQd2h8eqKCGT8Wyiou" alt=""/>
                        <h3>Jigsaw</h3>
                        <p>Lorem ipsum colon durag sitle lipo</p>
                        <button>Test</button>
                    </div>
                    <div>
                        <button className='games-button'><a href='#'>See more</a></button>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}