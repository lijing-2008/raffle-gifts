import React, { useState, useEffect } from 'react'
import Admin from './components/Admin'
import Balance from './components/User'
import Banner from './components/Banner'
import ChoiseGroup from './components/ChoiseGroup'
import ListShow from './components/ListShow'
import NftCard from './components/NftCard'
import SignIn from './components/SignIn'
import MintNFT from './components/MintNFT'
import {
  getAccountBalance,
  getAllAdmins,
  getNFTTokenByLevelFromContract,
  getNFTTokenByOwnerFromContract,
  getNFTTokenSupplyByOwner,
  getRaffleTokensTotalByLevel,
  getTotalSupply,
  isAdmin,
  signOutNearWallet,
} from './near-api'
import User from './components/User'
import RaffleNFT from './components/RaffleNFT'
const raffleData = {
  level: '?',
  metadata: {
    title: 'check me',
    description: 'make your choise',
    media: '',
    media_hash: '',
    copies: 1,
    issued_at: Date.now(),
    expires_at: 0,
    starts_at: 0,
    updated_at: Date.now(),
    extra: '',
    reference: '',
    reference_hash: '',
  },
}
function App() {
  const [balance, setBalance] = useState({
    available: '',
    staked: '',
    stateStaked: '',
    total: '',
  })
  const [listLevelN, setListLevelN] = useState([])
  const [listLevelR, setListLevelR] = useState([])
  const [listLevelSR, setListLevelSR] = useState([])
  const [listLevelSSR, setListLevelSSR] = useState([])
  const [listForOwnerFromBlockchain, setListForOwnerFromBlockchain] = useState([
    raffleData,
  ])
  const [totalByOwner, setTotalByOwner] = useState(0)

  const [total, setTotal] = useState(0)
  const [nTotal, setNTotal] = useState(0)
  const [rTotal, setRTotal] = useState(0)
  const [srTotal, setSRTotal] = useState(0)
  const [ssrTotal, setSSRTotal] = useState(0)

  const [enableMint, setEnableMint] = useState(0)
  const [adminCollection, setAdminCollection] = useState([])
  useEffect(() => {
    getNFTTokenSupplyByOwner().then(setTotalByOwner).catch(console.log)
    getNFTTokenByOwnerFromContract(window.accountId, '0', 40)
      .then(setListForOwnerFromBlockchain)
      .catch(console.log)
    getAllAdmins().then(setAdminCollection).catch(console.log)
  }, [])
  useEffect(() => {
    getAccountBalance().then(setBalance).catch(console.log)
    getTotalSupply().then(setTotal).catch(console.log)
    getRaffleTokensTotalByLevel('N').then(setNTotal).catch(console.log)
    getRaffleTokensTotalByLevel('R').then(setRTotal).catch(console.log)
    getRaffleTokensTotalByLevel('SR').then(setSRTotal).catch(console.log)
    getRaffleTokensTotalByLevel('SSR').then(setSSRTotal).catch(console.log)
    getNFTTokenByLevelFromContract('0', 40, 'N')
      .then(setListLevelN)
      .catch(console.log)
    getNFTTokenByLevelFromContract('0', 40, 'R')
      .then(setListLevelR)
      .catch(console.log)
    getNFTTokenByLevelFromContract('0', 40, 'SR')
      .then(setListLevelSR)
      .catch(console.log)
    getNFTTokenByLevelFromContract('0', 40, 'SSR')
      .then(setListLevelSSR)
      .catch(console.log)
  }, [])
  useEffect(() => {
    isAdmin().then(setEnableMint).catch(console.log)
  }, [])
  const onTest = () => {
    isAdmin().then(setEnableMint).catch(console.log)
    // getAllAdmins().then(console.log).catch(console.log)
  }

  if (!window.walletConnection.isSignedIn()) {
    // Sign-in flow will reload the page later
    return <SignIn />
  }

  return (
    <div className="min-h-screen relative bg-[url(./src/assets/bg.png)] bg-no-repeat bg-cover">
      <Banner accountId={window.accountId} />
      <User
        balance={balance}
        listNFT={listForOwnerFromBlockchain}
        totalNFTByOwner={totalByOwner}
        admins={adminCollection}
      />

      <div className="max-w-6xl m-auto mt-50px">
        {/* <button onClick={onTest}>test function</button> */}
        <div className="mt-15">
          {enableMint === 1 ? (
            <MintNFT
              total={total}
              nTotal={nTotal}
              rTotal={rTotal}
              srTotal={srTotal}
              ssrTotal={ssrTotal}
            />
          ) : (
            <RaffleNFT
              listForOwnerFromBlockchain={listForOwnerFromBlockchain}
            />
          )}
        </div>
        <div className=" px-4 pb-2">
          <ListShow
            listTitle="我的NFT"
            listData={listForOwnerFromBlockchain}
            total={totalByOwner}
          />
          <ListShow
            listTitle="NFT藏品一览(SSR)"
            listData={listLevelSSR}
            total={ssrTotal}
          />
          <ListShow
            listTitle="NFT藏品一览(SR)"
            listData={listLevelSR}
            total={srTotal}
          />
          <ListShow
            listTitle="NFT藏品一览(R)"
            listData={listLevelR}
            total={rTotal}
          />
          <ListShow
            listTitle="NFT藏品一览(N)"
            listData={listLevelN}
            total={nTotal}
          />
        </div>
      </div>
    </div>
  )
}

export default App
