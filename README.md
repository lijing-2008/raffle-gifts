<div align="center">
  raffle-gifts is a Raffle Game(inspired by Asphalt 8) on NEAR Blockchain.
  <br/>
    <a href="https://react.docschina.org/versions"><img alt="Rust Version" src="https://img.shields.io/badge/react-v18.2.0-ff69b4" /></a>
    <a href="https://cn.vitejs.dev/"><img alt="Rust Version" src="https://img.shields.io/badge/vite-v3.0.7-brightgreen" /></a>
    <a href="https://blog.rust-lang.org/2022/07/19/Rust-1.62.1.html"><img alt="Rust Version" src="https://img.shields.io/badge/rust-1.62%2B-blue" /></a>  
  </div>

## 🍻 Features

- Frontend built with React + Vite + unocss + Antd
- Smart contract built with NEAR + Rust
- Provides two permissions for the user, administrators can mint NFTs, the owner is an administrator by default. Other users can raffle NFTs by costing some NEAR(0.1 Ⓝ, 0.2 Ⓝ, 0.5 Ⓝ)

- NFTs provide 4 levels
  - N
  - R
  - SR
  - SSR
- Odds of winning

| NEAR Cost |  N  |  R  | SR  | SSR |
| :-------: | :-: | :-: | :-: | :-: |
|   0.1 Ⓝ   | 40% | 30% | 25% | 5%  |
|   0.2 Ⓝ   | 25% | 35% | 30% | 10% |
|   0.5 Ⓝ   | 10% | 40% | 35% | 15% |

## 🧸 Installation

### Build Smart Contract

```bash
cd nft-contract
./build.sh
```

### Depoly Smart Contract

```bash
export NFT_CONTRACT_ID=Your_Account_id
near deploy --wasmFile res/main.wasm --accountId $NFT_CONTRACT_ID --nodeUrl https://public-rpc.blockpi.io/http/near-testnet
```

### Gui install

```bash
cd react-vite
npm install
npm run dev
```

## 🎡 Usage

At first, you need to connect to your NEAR wallet just by click the Connect Wallets button.

![login.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h5olzdi35dj217r0u0ach.jpg)

### 🌴 Mint NFTs

You need to login with administrator account id

![admin.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h5om0mkar9j21530u0q6r.jpg)

Select your NFT image from local directory, its media url will input automatically. Then input other necessary info. At last, click the Mint button to redirect to connect your wallet and confirm your transaction.

### ☘️ Raffle NFTs

You need to login with regular user account id

![regularuser.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h5oma38xknj21bp0u0gqf.jpg)

Make your choise how much would you spend to raffle NFTs, the most recently raffle NFT will show on your right side, and all your NTFs will show.

### ✌️ Transfer NFTs

You can transfer your NFT to anyone else, but the owner must be yourself.

![transferNFT.png](https://img1.imgtp.com/2022/08/30/rglaOclV.png)

when your cursor hover the NFT you will get a tooltip, which show you some details, and offer the ability to transfer your NFT, you just need to input the account name who you want to transfer to.

## 🥷🏻 Just enjoy yourself

You can deploy the contract in your account, and play with it!
