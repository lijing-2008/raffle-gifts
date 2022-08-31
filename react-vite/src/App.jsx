import React, { useState, useEffect } from 'react'
import Balance from './components/Balance'
import Banner from './components/Banner'
import ChoiseGroup from './components/ChoiseGroup'
import ListShow from './components/ListShow'
import NftCard from './components/NftCard'
import SignIn from './components/SignIn'
import UploadNFT from './components/UploadNFT'
import {
  getAccountBalance,
  getNFTTokenByLevelFromContract,
  getNFTTokenByOwnerFromContract,
  getNFTTokenSupplyByOwner,
  getRaffleTokensTotalByLevel,
  getTotalSupply,
  isAdmin,
  signOutNearWallet,
} from './near-api'
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

  const [enableMint, setEnableMint] = useState(false)
  useEffect(() => {
    getNFTTokenSupplyByOwner().then(setTotalByOwner).catch(console.log)
    getNFTTokenByOwnerFromContract(window.accountId, '0', 40)
      .then(setListForOwnerFromBlockchain)
      .catch(console.log)
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
    console.log(
      listForOwnerFromBlockchain[listForOwnerFromBlockchain.length - 1]
    )
  }

  if (!window.walletConnection.isSignedIn()) {
    // Sign-in flow will reload the page later
    return <SignIn />
  }

  return (
    <div className="min-h-screen relative bg-[url(./src/assets/bg.png)] bg-no-repeat bg-cover">
      {/* <div className="fixed inset-0 z-0 opacity-50 bg-[url(./src/assets/bg.png)] bg-no-repeat bg-cover"></div> */}

      <Banner
        accountId={window.accountId}
        onHandleLogout={signOutNearWallet}
        avatar={listForOwnerFromBlockchain}
      />
      <Balance
        balance={balance}
        listNFT={listForOwnerFromBlockchain}
        totalNFTByOwner={totalByOwner}
      />
      {/* <button onClick={onTest}>test function</button> */}

      <div className="max-w-6xl m-auto mt-50px">
        <div className="mt-5">
          {enableMint ? <UploadNFT total={total} /> : ''}
        </div>
        {enableMint ? (
          ''
        ) : (
          <div className="max-w-3xl flex relative m-auto">
            <div className="z-0 bg-white opacity-20 w-full h-400px rounded-xl border-2 border-black shadow-dark-300"></div>
            <div className="absolute top-10 left-15 z-20 w-300px">
              <ChoiseGroup />
            </div>
            <div className="absolute top-5px right-20 z-20">
              <div className="pl-6 text-blue italic font-semibold">
                the most recently raffle gift
              </div>
              <NftCard
                item={
                  listForOwnerFromBlockchain[
                    listForOwnerFromBlockchain.length - 1
                  ]
                }
              />
            </div>
          </div>
        )}
        <div className=" px-4 pb-2">
          {enableMint ? (
            ''
          ) : (
            <ListShow
              listTitle="我的NFT"
              listData={listForOwnerFromBlockchain}
              total={totalByOwner}
            />
          )}

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
