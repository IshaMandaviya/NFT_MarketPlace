// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "hardhat/console.sol";

contract NFT_Market_Place is ReentrancyGuard {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;
    address private tokenAddress;

    address payable owner;
    uint256 listingPrice = 250;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable nftcreater;
        address payable owner;
        uint256 priceInToken;
        uint256 royalty;
        bool isFirstSale;
        bool isForsale;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool isForSale
    );

    function putTokenForSale(uint256 tokenId, uint256 _Price) public {
        require(
            msg.sender == idToMarketItem[tokenId].owner,
            "You can not sale this item because u are not owner"
        );

        require(
            idToMarketItem[tokenId].isForsale != true,
            "Already Token is in sale"
        );
        console.log("mesage sender", msg.sender);
        idToMarketItem[tokenId].priceInToken = _Price;
        idToMarketItem[tokenId].isForsale = true;
    }

    function calculateListingPrice(uint256 _value)
        public
        view
        returns (uint256)
    {
        uint256 _Price;
        _Price = (_value * listingPrice) / 10000;
        return (_Price);
    }

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 _royalty
    ) public nonReentrant {
        require(
            IERC721(nftContract).ownerOf(tokenId) == msg.sender,
            "You can create Market Item, You are not Owner"
        );

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            _royalty,
            true,
            true
        );

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            true
        );
    }

    function royaltiesInfo(uint256 tokenId, uint256 value)
        public
        view
        returns (uint256 royaltyAmount)
    {
        uint256 royalties = idToMarketItem[tokenId].royalty;
        // receiver = royalties.recipient;
        royaltyAmount = (value * royalties) / 10000;
    }

   function Sale(
        address nftContract,
        address _tokenContract,
        uint256 itemId
    ) public nonReentrant {
        uint256 price = idToMarketItem[itemId].priceInToken;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        require(
            IERC20(_tokenContract).balanceOf(msg.sender) >= price,
            "You don't Have Token To purchase Nft"
        );
        uint256 _listingPrice = calculateListingPrice(price);
        console.log(_listingPrice);
        IERC20(_tokenContract).transferFrom(msg.sender, owner, _listingPrice);

        if (idToMarketItem[itemId].isFirstSale == true) {
            IERC721(nftContract).transferFrom(
                idToMarketItem[itemId].nftcreater,
                msg.sender,
                tokenId
            );
            IERC20(_tokenContract).transferFrom(
                msg.sender,
                idToMarketItem[itemId].nftcreater,
                price.sub(_listingPrice)
            );
            console.log("Purchaser: ", msg.sender);
        } else {
            uint256 royaltyAmount;
            royaltyAmount = royaltiesInfo(itemId, price.sub(_listingPrice));
            IERC20(_tokenContract).transferFrom(
                msg.sender,
                idToMarketItem[itemId].nftcreater,
                royaltyAmount
            );
            IERC20(_tokenContract).transferFrom(
                msg.sender,
                idToMarketItem[itemId].owner,
                idToMarketItem[itemId].priceInToken.sub(royaltyAmount)
            );
            IERC721(nftContract).transferFrom(
                idToMarketItem[itemId].owner,
                msg.sender,
                tokenId
            );
           
        }

        idToMarketItem[itemId].owner = payable(msg.sender);
        _itemsSold.increment();
        idToMarketItem[itemId].isForsale = false;
        idToMarketItem[itemId].isFirstSale = false;
    }
}
