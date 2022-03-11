import { NFT } from '../Components/NFT';
import { useState } from 'react';

function Solution(uri: string, rows: number, columns: number) {
    const [nft, setNFT] = useState<NFT[] | undefined>()
    const [imageSize, setImageSize] = useState<{ width: number, height: number }>()

    const img = new Image();
    img.src = uri;
    img.onload = () => {
        setImageSize({ width: img.width, height: img.height })
        setNFT(
            Array.from(Array(rows * columns).keys())
                .map(position => ({
                    correctPosition: position,
                    tileHeight: img.height / rows,
                    tileWidth: img.width / columns,
                    tileOffsetX: (position % columns) * (img.width / columns),
                    tileOffsetY: Math.floor(position / columns) * (img.height / rows),
                    solved: true
                }))
        )
    }

    return nft;
}

export default Solution;