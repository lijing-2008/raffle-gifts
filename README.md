<div align="center">
  <h1 align="center">Raffle Gifts</h1>
  <a href="https://blog.rust-lang.org/2022/07/19/Rust-1.62.1.html"><img alt="Rust Version" src="https://img.shields.io/badge/rust-1.62%2B-blue" /></a>  
    <a href="https://react.docschina.org/versions"><img alt="Rust Version" src="https://img.shields.io/badge/react-v18.2.0-ff69b4" /></a>
    <a href="https://cn.vitejs.dev/"><img alt="Rust Version" src="https://img.shields.io/badge/vite-v3.0.7-brightgreen" /></a>
  <img alt="Github stars" src="https://img.shields.io/github/stars/lijing-2008/raffle-gifts?color=56BEB8" />
  <img alt="Github forks" src="https://img.shields.io/github/forks/lijing-2008/raffle-gifts?color=56BEB8" />
  </div>

<h4 align="center"> 
	🚧 🚀 Under construction... 🚀 🚧
</h4>

<hr>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#tada-usage">Usage</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/lijing-2008" target="_blank">Author</a>
</p>

## :dart: About

Welcome to Raffle Gifts, it is a NFT game inspired by Asphalt 8, and developed on NEAR Blockchain. The game offers two user roles. As an Administrator, you can mint NFTs into the prize pool. As a normal user, you can draw NFTs with spending some NEARs.

## :sparkles: Features

:heavy_check_mark: **Role:** Admin & normal user

:heavy_check_mark: Smart Contract built with NEAR + RUST

:heavy_check_mark: Frontend built with React + Vite + unocss + Antd

:heavy_check_mark: NFTs provide 4 levels: **N** & **R** & **SR** & **SSR**

:heavy_check_mark: Raffle spending provide 3 levels: 0.1 Ⓝ / 0.2 Ⓝ / 0.5 Ⓝ

:heavy_check_mark: Odds of winning

| NEAR Cost |  N  |  R  | SR  | SSR |
| :-------: | :-: | :-: | :-: | :-: |
|   0.1 Ⓝ   | 40% | 30% | 25% | 5%  |
|   0.2 Ⓝ   | 25% | 35% | 30% | 10% |
|   0.5 Ⓝ   | 10% | 40% | 35% | 15% |

## :rocket: Technologies

- [NEAR](https://docs.near.org/)
- [Rust](https://www.rust-lang.org/zh-CN/)
- [React](https://pt-br.reactjs.org/)
- [Vite](https://cn.vitejs.dev/)
- [Unocss](https://github.com/unocss/unocss)
- [Antd](https://ant.design/index-cn)

## :white_check_mark: Requirements

Before starting :checkered_flag:, you need do some preparations.

- [NEAR Wallet Account](https://wallet.testnet.near.org)
- [Rust Toolchain](https://docs.near.org/develop/prerequisites)
- [Node](https://nodejs.org/en/)
- [Web3.storage](https://web3.storage/)

## :checkered_flag: Starting

### Deploy Smart Contract

```bash
# Compile WASM file
cd nft-contract
./build.sh

# Deploy
export NFT_CONTRACT_ID=Your_Account_id
near deploy --wasmFile res/main.wasm --accountId $NFT_CONTRACT_ID --nodeUrl https://public-rpc.blockpi.io/http/near-testnet
```

### Start Frontend UI

```bash
cd react-vite
npm install
npm run dev
```

## :tada: Usage

At first, you need to connect to your NEAR wallet just by click the Connect Wallets button.

![login.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h5olzdi35dj217r0u0ach.jpg)

### 🌴 Mint NFTs

You need to login with administrator account id

![mintNFT.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h5qvoeo90vj21440u0q7i.jpg)

Select your NFT image from local directory, its media url will input automatically. Then input other necessary info. At last, click the Mint button to redirect to connect your wallet and confirm your transaction.
if you haven't set your web3.storage token, you need to set it at first, when you select a pic there is a modal offer you for setting.

![setWebToken.png](https://img1.imgtp.com/2022/09/01/lPlmMHzu.png)

### ☘️ Raffle NFTs

You need to login with regular user account id

![raffleNFT.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h5qvot2p5yj218a0u0dl8.jpg)

Make your choise how much would you spend to raffle NFTs, the most recently raffle NFT will show on your right side, and all your NTFs will show.

### ✌️ Transfer NFTs

You can transfer your NFT to anyone else, but the owner must be yourself.

![transferNFT.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h5pq1u6j7qj21470u0dls.jpg)

when your cursor hover the NFT you will get a tooltip, which show you some details, and offer the ability to transfer your NFT, you just need to input the account name who you want to transfer to.

### 🌈 Account Management

You can view your Account Balance Details when hover the avatar, and you can logout by click the logout button. If you are the contract owner, you will see a button named "Manage admins", click it to manage Administrators, you can add and delete administrator for now.

![userManage.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h5qvqknuyxj225p0u0jwy.jpg)

Account details contain below:

- total
- available
- stateStaked
- staked
- total NFTs (owned by your account)

## :memo: License

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.

Made with :heart: by <a href="https://github.com/lijing-2008" target="_blank">Crazy Coder LJ</a>

## 🥷🏻 Just enjoy yourself

You can deploy the contract in your account, and play with it!
