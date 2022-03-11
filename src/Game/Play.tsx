import { JigsawPuzzle, play } from './jigsaw-puzzle'
import './jigsaw-puzzle.css'
import { useContext } from 'react';

function Game() {
    
    return (
        <div className="game">
            <div className="game-board">
            <JigsawPuzzle
                imageSrc='https://lh3.googleusercontent.com/rwE_XDf7xz4QWX-AxlXpFKW5OsxmVLGwVFWz3VlRARR_aSf0Ly4SpA9xrINpse4u6ySi7fRw-0PNkEGOo52y-2P_F0-oyx2AgU-LmA=w600'
                rows={3}
                columns={3}
                onSolved={() => {
                    console.log(play)
                }
                    }
                />
            </div>
        </div>
    );
}

export default Game;