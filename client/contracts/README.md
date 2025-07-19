# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

## Deploying MintellectNFT to BNB Smart Chain

1. Create a `.env` file in this directory with:

```
PRIVATE_KEY=your_bnb_wallet_private_key
```

2. Compile the contract:

```
npx hardhat compile
```

3. Deploy to BNB testnet:

```
npx hardhat run --network bnb_testnet scripts/deploy.js
```

4. Deploy to BNB mainnet:

```
npx hardhat run --network bnb_mainnet scripts/deploy.js
```

5. View your contract on the block explorer:

- BNB Testnet: https://testnet.bscscan.com
- BNB Mainnet: https://bscscan.com

---
