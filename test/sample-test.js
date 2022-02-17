// const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });
describe("NFTMarket", function() {
    it("Should create and execute market sales", async function() {
      const [deployer] = await ethers.getSigners();
  
    const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy();
    console.log("Token address:", token.address);

    const MyNfts = await ethers.getContractFactory("MyNfts");
    const mynfts = await MyNfts.deploy();
    console.log("NFT address",mynfts.address);
	const nftContractAddress=mynfts.address;

    const NFT_Market_Place = await ethers.getContractFactory("NFT_Market_Place");
    const nft_Market_Place = await NFT_Market_Place.deploy();
    console.log("NFT MarketPlace address",nft_Market_Place.address);
	

    await mynfts.createToken("https://gateway.pinata.cloud/ipfs/QmUpW9WoFj4VyYRNkBVACXJSQmUq1eeZW9PCU8LLJn3btM")
    await mynfts.createToken("https://gateway.pinata.cloud/ipfs/QmUpW9WoFj4VyYRNkBVACXJSQmUq1eeZW9PCU8LLJn3btM")
	const nftPrice=2000;
	let listingPrice=await nft_Market_Place.calculateListingPrice(nftPrice);
	listingPrice=listingPrice.toString()
	const royalty=250 // 10000 = 1 
	await nft_Market_Place.createMarketItem(nftContractAddress, 1, nftPrice, royalty, { value: listingPrice })
    await nft_Market_Place.createMarketItem(nftContractAddress, 2, nftPrice, royalty, { value: listingPrice })
	const [_, buyerAddress] = await ethers.getSigners()

    await nft_Market_Place.connect(buyerAddress).createMarketSale(nftContractAddress, 1, royalty,{ value: auctionPrice})
      
    })
  })
