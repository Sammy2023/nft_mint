const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BySammy", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Decoys = await ethers.getContractFactory("BySammyContract");
    const decoys = await Decoys.deploy();
    await decoys.deployed();

    const recipient = '0xcd3B766CCDd6AE721141F452C550Ca635964ce71';
    const metadataURI = 'cid/test.png';

    let balance = await decoys.balanceOf(recipient);
    expect(balance).to.equal(0);
    
    const newlyMintedToken = await decoys.payToMint(recipient, metadataURI,
      { value: ethers.utils.parseEther('0.05')});
    await newlyMintedToken.wait();
    
     balance = await decoys.balanceOf(recipient)
    expect(balance).to.equal(1);

    expect(await decoys.isContentOwned(metadataURI)).to.equal(true);
  });
});
