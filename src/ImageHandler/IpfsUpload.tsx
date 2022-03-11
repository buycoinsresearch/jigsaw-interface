import axios from 'axios';
import FormData from 'form-data';


const pinataKey = process.env.REACT_APP_PINATA_KEY;
const pinataSecret = process.env.REACT_APP_PINATA_SECRET;

async function IpfsUpload(file: File) {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const image = 'https://lh3.googleusercontent.com/rwE_XDf7xz4QWX-AxlXpFKW5OsxmVLGwVFWz3VlRARR_aSf0Ly4SpA9xrINpse4u6ySi7fRw-0PNkEGOo52y-2P_F0-oyx2AgU-LmA=w600'

    const formData = new FormData();
    formData.append('nft', file);
    // const metadata = JSON.stringify({
    //     name: 'testname',
    //     keyvalues: {
    //         exampleKey: 'exampleValue'
    //     }
    // });
    // formData.append('pinataMetadata', metadata);

    return await axios.post(url, formData, {
        maxBodyLength: Infinity,
        headers: {
            'Content-Type': `multipart/form-data`,
            pinata_api_key: pinataKey!,
            pinata_secret_api_key: pinataSecret!,
        }
    })
    .then(response => {
        return response.data;
    }
    )
    .catch(error => {
        console.log(error);
    }
    );
}

export default IpfsUpload;