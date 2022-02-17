require("dotenv").config();
const API_URL = "https://eth-ropsten.alchemyapi.io/v2/cMw5dxqeUCmZjtsd4Y1aUltDbvPSEMCk";
console.log(API_URL);
const PUBLIC_KEY = "0xC92f3367Ca2cE9feab064ecFD9F99Bd7Aaca0865";
const PRIVATE_KEY = "49fba673d36b89273b4546e10c682100aae89ff4af89b505876c8cb23e8d5a11";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const NFTcontract = require("../artifacts/contracts/MyNfts.sol/MyNfts.json");
const MarketPlacecontract = require("../artifacts/contracts/NFT_Market_Place.sol/NFT_Market_Place.json");

// console.log(JSON.stringify(contract.abi));
const MyNftAddress="0xA93545292684df234c08ca1789D344dE7359A7af";
const nftContract= new web3.eth.Contract(NFTcontract.abi,MyNftAddress);
const MarketPlaceAddress="0x7869f67F0E41A1BB6f38AF03BCe9D756C46a19F5";
const MarketPlaceContract= new web3.eth.Contract(MarketPlacecontract.abi,MarketPlaceAddress);
// const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
const nonce =  web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
const tokenURI="https://gateway.pinata.cloud/ipfs/QmUpW9WoFj4VyYRNkBVACXJSQmUq1eeZW9PCU8LLJn3btM";
  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: MyNftAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.createToken( tokenURI).encodeABI(),
  };

 let resultPromise=web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
 resultPromise
 .then((signedTx) => {
   web3.eth.sendSignedTransaction(
     signedTx.rawTransaction,
     function (err, hash) {
       if (!err) {
         console.log("The hash of your transaction is1: ",hash);
       } 
     }
   );
 })
  const tx2 = {
    from: PUBLIC_KEY,
    to: MyNftAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.approve( MarketPlaceAddress,1).encodeABI(),
  };

   let resultPromise2=web3.eth.accounts.signTransaction(tx2, PRIVATE_KEY);
   resultPromise2
       .then((signedTx) => {
         web3.eth.sendSignedTransaction(
           signedTx.rawTransaction,
           function (err, hash) {
             if (!err) {
               console.log(
                 "The hash of your transaction is: ",
                 hash,
                 "\nCheck Alchemy's Mempool to view the status of your transaction!"
               );
             } else {
               console.log(
                 "Something went wrong when submitting your transaction:",
                 err
               );
             }
           }
         );
       })
       .catch((err) => {
         console.log(" Promise failed:", err);
       });
    const Price=2000;
    const Royalty=250;
   const tx3 = {
    from: PUBLIC_KEY,
    to: MarketPlaceAddress,
    nonce: nonce,
    gas: 500000,
    // value: 50,
    data: MarketPlaceContract.methods.createMarketItem(MyNftAddress ,1,Price,Royalty).encodeABI(),
  };

let resultPromise3=web3.eth.accounts.signTransaction(tx3, PRIVATE_KEY);
resultPromise3
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log("The hash of your transaction is3: ",hash);
          } 
        }
      );
    })

    resultPromise=web3.eth.accounts.signTransaction(tx2, PRIVATE_KEY);
    
   const tx4 = {
    from: PUBLIC_KEY,
    to: MarketPlaceAddress,
    nonce: nonce,
    gas: 500000,
    value: 2000,
    data: MarketPlaceContract.methods.purchaseNFT(MyNftAddress ,1).encodeABI(),
  };

let resultPromise5=web3.eth.accounts.signTransaction(tx4, PRIVATE_KEY);
resultPromise5
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log("The hash of your transaction is5: ",hash);
          } 
        }
      );
    })
    
    // Token address: 0xA93545292684df234c08ca1789D344dE7359A7af
    // NFT address 0x48A4751638b384082e189D163AC7EE16D1Ccd063
    // NFT MarketPlace address 0x7869f67F0E41A1BB6f38AF03BCe9D756C46a19F5