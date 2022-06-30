import { ethers } from 'ethers'; 
import WalletBalance from './WalletBalance'; 
import {useEffect, useState} from 'react';
import BySammyContract from '../artifacts/contracts/MyNFT.sol/BySammyContract.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const provider = new ethers.providers.Web3Provider(window.ethereum);

//use the web3 provider to get the signer to execute
// the transactions
const signer = provider.getSigner();

//get the smart contract
// use ethers to instantiate the contract using the address the abi (middleman) 
const contract = new ethers.Contract(contractAddress, BySammyContract.abi, signer);

function Home(){
    const [totalMinted, setTotalMinted] = useState(0);
    // an empty array - only runs on the first render
    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        const count = await contract.count();
        console.log(parseInt(count));
        setTotalMinted(parseInt(count));
    };

    return (
        <div>
            <WalletBalance/>
            <h1>BySammy Guys NFT Collection</h1>
            {/* creates a useless Array sized of totalMinted
            filled zero just to render NFT Images
             */}
            {Array(totalMinted + 1)
            .fill(0)
            .map((_, i) => (
                <div key={i}>
                    <NFTImage tokenId={i} getCount={getCount} />
                </div>
            ))}
        </div>
    );
}

function NFTImage({tokenId, getCount}){
    const contentId = "Qmc83QCq8GfWHdp53nkHSNRBcH1C5VM6WHNdyuMpf4Ljnd";
    const metadataURI = `${contentId}/${tokenId}.json`;
    const imageURI = `img/${tokenId}.png`;

    const [isMinted, setIsMinted] = useState(false);

    useEffect(() => {
        getMintedStatus();
    }, [isMinted]);
    const getMintedStatus = async () => {
        const result = await contract.isContentOwned(metadataURI);
        console.log(result);
        setIsMinted(result);
    }

    const mintToken = async () => {
        const connection = contract.connect(signer);
        const addr = connection.address;
        const result = await contract.payToMint(addr, metadataURI, {
            value: ethers.utils.parseEther('0.05'),
        });

        await result.wait();
        getMintedStatus();
        getCount();
    }

    async function getURI(){
        const uri = await contract.tokenURI(tokenId);
        alert(uri);
    }

    return (
        <div>
            <img src={isMinted ? imageURI : 'img/placeholder.png'} alt=""></img>
                <h5>ID #{tokenId}</h5>
                {!isMinted ? (
                    <button onClick={mintToken}>
                        Mint
                    </button>
                ) : (
                    <button onClick={getURI}>
                        Taken! Show URI
                    </button>
                )}
        </div>
    )
}

export default Home;