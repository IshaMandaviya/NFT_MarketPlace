async function main() {
    const [deployer] = await ethers.getSigners();
  
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy();
    console.log("Token address:", token.address);

    const MyNfts = await ethers.getContractFactory("MyNfts");
    const mynfts = await MyNfts.deploy();
    console.log("NFT address",mynfts.address);

    const NFT_Market_Place = await ethers.getContractFactory("NFT_Market_Place");
    const nft_Market_Place = await NFT_Market_Place.deploy();
    console.log("NFT MarketPlace address",nft_Market_Place.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });