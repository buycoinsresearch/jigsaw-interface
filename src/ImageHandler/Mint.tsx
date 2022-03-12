import { NFT } from '../Components/NFT';
import { sha256 } from 'ethers/lib/utils';
import { Buffer } from 'buffer';
import abi from '.././JigsawABI.json';
import { ethers } from 'ethers';
import { useTransaction } from 'wagmi'

const contractAddress = '0x60556c2845F3c7a606Eb94c2d56211d6bf3c43c1';
const contract = new ethers.Contract(contractAddress, abi, ethers.getDefaultProvider());
console.log(contract);

async function Mint(solution: NFT[], uri: string) {
    const stringSolution = JSON.stringify(solution)
    console.log(stringSolution);
    const buffer = Buffer.from(stringSolution);

    const hash = sha256(buffer);
    console.log(buffer, hash);

    const abiCoder = new ethers.utils.AbiCoder();
    const encodedData = abiCoder.encode(['bytes32[]', 'string[]'], [[hash], [uri]]);

    const [{ data, error, loading }, sendTransaction] = useTransaction({
        request: {
          to: contractAddress,
          data: encodedData,
        },
      })
    
      if (loading) return <div>Check Wallet</div>
      if (!data)
        return (
          <button disabled={loading} onClick={async () => await sendTransaction()}>
            Send Transaction
          </button>
        )
    
      return (
        <div>
          {data && <div>Transaction: {JSON.stringify(data)}</div>}
          {error && <div>Error sending transaction</div>}
        </div>
      )
}

export default Mint;