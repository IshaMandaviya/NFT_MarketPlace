require("@nomiclabs/hardhat-waffle");


require("@nomiclabs/hardhat-etherscan");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 
 require("dotenv").config();
 require("@nomiclabs/hardhat-ethers");
 const API_URL = "https://eth-ropsten.alchemyapi.io/v2/cMw5dxqeUCmZjtsd4Y1aUltDbvPSEMCk";
 const PRIVATE_KEY  = "49fba673d36b89273b4546e10c682100aae89ff4af89b505876c8cb23e8d5a11";
 console.log(API_URL);
 module.exports = {
   solidity: "0.8.7",
   defaultNetwork: "ropsten",
   networks: {
     hardhat: {},
     ropsten: {
       url: API_URL,
       accounts: [`0x${PRIVATE_KEY}`],
     },
   },
 };