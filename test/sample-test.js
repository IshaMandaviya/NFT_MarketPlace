const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    const [deployer, buyer] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy();
    console.log("Token address:", token.address);
    tokenAdress = token.address;

    const MyNfts = await ethers.getContractFactory("MyNfts");
    const mynfts = await MyNfts.deploy();
    console.log("NFT address", mynfts.address);
    const nftContractAddress = mynfts.address;

    const NFT_Market_Place = await ethers.getContractFactory("NFT_Market_Place");
    const nft_Market_Place = await NFT_Market_Place.deploy();
    console.log("NFT MarketPlace address", nft_Market_Place.address);
    nftMarketPlaceAddress = nft_Market_Place.address;

    //create NFT
    await mynfts.createToken("https://gateway.pinata.cloud/ipfs/QmUpW9WoFj4VyYRNkBVACXJSQmUq1eeZW9PCU8LLJn3btM")
    await mynfts.createToken("https://gateway.pinata.cloud/ipfs/QmUpW9WoFj4VyYRNkBVACXJSQmUq1eeZW9PCU8LLJn3btM")

    // put NFT In marketPlace
    const nftPrice = 20000000;
    const royalty = 250 // 10000 = 1 
    await nft_Market_Place.createMarketItem(nftContractAddress, 1, nftPrice, royalty)
    await nft_Market_Place.createMarketItem(nftContractAddress, 2, nftPrice, royalty)

    // Approve nftmarketplace for contract to transfer
    await mynfts.approve(nftMarketPlaceAddress, 1)
    await mynfts.approve(nftMarketPlaceAddress, 2)


    // Transfer some MYT token to buyer account so it can purchase nft
    console.log(buyer.address)
    BuyerAddreass = buyer.address
    await token.transfer(buyer.address, 100000000000000)
    await token.connect(buyer).approve(nftMarketPlaceAddress, 10000000000000)



    // buy NFT from marketplace
    await nft_Market_Place.connect(buyer).Sale(nftContractAddress, tokenAdress, 1)

    //put NFT for Sale
    const SalePrice = 200000000
    await nft_Market_Place.connect(buyer).putTokenForSale(1, SalePrice)

    // Approve nftmarketplace for contract to transfer
    await mynfts.connect(buyer).approve(nftMarketPlaceAddress, 1)




  }).timeout(300000);
})
