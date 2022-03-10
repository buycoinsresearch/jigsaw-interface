import axios from 'axios';
import React, { useState } from 'react';


const pinataKey = process.env.REACT_APP_PINATA_KEY;
const pinataSecret = process.env.REACT_APP_PINATA_SECRET;

function IpfsUpload(files: string[]) {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    const formData = new FormData();
    files.forEach(async (file: string, index: number) => {
        formData.append('file', file);
        const metadata = JSON.stringify({
            name: `tile${index}`,
            
        });
        formData.append('pinataMetadata', metadata);
        
    })
}

export default IpfsUpload;