// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// ✅ Paywall contract for Mintellect, compatible with CARV SVM
// Checks NFT ownership and stores anti-plagiarism/originality metadata
contract Paywall {
    IERC721 public nftContract;
    mapping(uint256 => uint256) public originalityScoreOf; // e.g., 0-100 or a hash
    mapping(uint256 => bytes32) public plagiarismHashOf; // Optional: hash of content for anti-plagiarism

    event AccessGranted(address indexed user, uint256 indexed tokenId);
    event OriginalitySet(uint256 indexed tokenId, uint256 score, bytes32 plagiarismHash);

    constructor(address _nftContract) {
        nftContract = IERC721(_nftContract);
    }

    /// @notice Check if a user owns a specific NFT (for paywall access)
    function hasAccess(address user, uint256 tokenId) public view returns (bool) {
        return nftContract.ownerOf(tokenId) == user;
    }

    /// @notice Set originality and plagiarism hash for a token (can be called by NFT owner)
    function setOriginality(
        uint256 tokenId,
        uint256 score,
        bytes32 plagiarismHash
    ) public {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not NFT owner");
        originalityScoreOf[tokenId] = score;
        plagiarismHashOf[tokenId] = plagiarismHash;
        emit OriginalitySet(tokenId, score, plagiarismHash);
    }

    /// @notice Grant access if user owns the NFT (example usage)
    function accessContent(uint256 tokenId) public {
        require(hasAccess(msg.sender, tokenId), "No access: not NFT owner");
        emit AccessGranted(msg.sender, tokenId);
    }
} 