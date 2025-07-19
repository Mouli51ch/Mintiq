// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  // Deploy MintellectNFT
  const MintellectNFT = await hre.ethers.getContractFactory("MintellectNFT");
  const mintellectNFT = await MintellectNFT.deploy();
  await mintellectNFT.waitForDeployment();
  const nftAddress = await mintellectNFT.getAddress();
  console.log("MintellectNFT deployed to:", nftAddress);

  // Deploy Paywall, passing the NFT contract address
  const Paywall = await hre.ethers.getContractFactory("Paywall");
  const paywall = await Paywall.deploy(nftAddress);
  await paywall.waitForDeployment();
  const paywallAddress = await paywall.getAddress();
  console.log("Paywall deployed to:", paywallAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 