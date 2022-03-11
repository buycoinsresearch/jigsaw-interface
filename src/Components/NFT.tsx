import { createContext } from 'react';

export interface NFT {
    tileOffsetX: number
    tileOffsetY: number,
    tileWidth: number,
    tileHeight: number,
    correctPosition: number,
    solved: boolean
  }

const NFTContext = createContext([] as NFT[] | undefined);

export default NFTContext