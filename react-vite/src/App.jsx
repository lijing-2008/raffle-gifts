import React, { useState, useEffect } from 'react'
import Banner from './components/Banner'
import ChoiseGroup from './components/ChoiseGroup'
import ListShow from './components/ListShow'
import NftCard from './components/NftCard'
import SignIn from './components/SignIn'
import UploadNFT from './components/UploadNFT'
// import NftCard from './NftCard'
import {
  getNFTTokenByLevelFromContract,
  getNFTTokenByOwnerFromContract,
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
  const [listLevelN, setListLevelN] = useState([])
  const [listLevelR, setListLevelR] = useState([])
  const [listLevelSR, setListLevelSR] = useState([])
  const [listLevelSSR, setListLevelSSR] = useState([])
  const [listForOwnerFromBlockchain, setListForOwnerFromBlockchain] = useState([
    raffleData,
  ])
  const [enableMint, setEnableMint] = useState(false)
  useEffect(() => {
    getNFTTokenByOwnerFromContract(window.accountId, '0', 20)
      .then(setListForOwnerFromBlockchain)
      .catch(alert)
  }, [])
  useEffect(() => {
    getNFTTokenByLevelFromContract('0', 4, 'N').then(setListLevelN).catch(alert)
    getNFTTokenByLevelFromContract('0', 4, 'R').then(setListLevelR).catch(alert)
    getNFTTokenByLevelFromContract('0', 4, 'SR')
      .then(setListLevelSR)
      .catch(alert)
    getNFTTokenByLevelFromContract('2', 6, 'SSR')
      .then(setListLevelSSR)
      .catch(alert)
  }, [])
  useEffect(() => {
    isAdmin().then(setEnableMint).catch(alert)
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

      <Banner accountId={window.accountId} onHandleLogout={signOutNearWallet} />
      {/* <button onClick={onTest}>test function</button> */}

      <div className="max-w-6xl m-auto ">
        <div className="mt-5">{enableMint ? <UploadNFT /> : ''}</div>
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
            />
          )}

          <ListShow listTitle="NFT藏品一览(SSR)" listData={listLevelSSR} />
          <ListShow listTitle="NFT藏品一览(SR)" listData={listLevelSR} />
          <ListShow listTitle="NFT藏品一览(R)" listData={listLevelR} />
          <ListShow listTitle="NFT藏品一览(N)" listData={listLevelN} />
        </div>
      </div>
    </div>
  )
}

export default App
