// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// ✅ Refactored for CARV SVM compatibility: On-chain author & originality metadata
contract MintiqNFT is ERC721URIStorage {
    uint256 public tokenCounter;
    mapping(uint256 => address) public authorOf;
    mapping(uint256 => uint256) public originalityScoreOf; // e.g., 0-100 or a hash

    constructor() ERC721("MintiqNFT", "MINT") {
        tokenCounter = 0;
    }

    /// @notice Mint a new NFT with author and originality metadata
    /// @param to Recipient address
    /// @param tokenURI Metadata URI
    /// @param author Author address
    /// @param originalityScore Originality score or hash
    function mintNFT(
        address to,
        string memory tokenURI,
        address author,
        uint256 originalityScore
    ) public returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        authorOf[newTokenId] = author;
        originalityScoreOf[newTokenId] = originalityScore;
        tokenCounter += 1;
        return newTokenId;
    }
} 