import { ethers } from 'ethers'; 
import WalletBalance from './WalletBalance'; 
import {useEffect, useState} from 'react';
import BySammyContract from '../artifacts/contracts/MyNFT.sol/BySammyContract.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function Home(){
    return (
        <div>
            <WalletBalance/>
        </div>
    );
}

export default Home;