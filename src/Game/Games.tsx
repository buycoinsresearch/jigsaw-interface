import './Games.css';
import abi from '../JigsawABI.json'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const contractAddress = "0xB30d25a037AefD6C90B4F6f8a3333bbb832F9385"
export default function Game() {

    function validGames() {

    }
    
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