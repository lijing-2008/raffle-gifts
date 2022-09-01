import React from 'react'
import ChoiseGroup from './ChoiseGroup'
import NftCard from './NftCard'

export default function RaffleNFT({ listForOwnerFromBlockchain }) {
  return (
    <div className="max-w-3xl flex relative m-auto">
      <div className="z-0 mt-5 bg-white opacity-20 w-full h-400px rounded-xl border-2 border-black shadow-dark-300"></div>
      <div className="absolute top-15 left-15 z-5 w-300px">
        <ChoiseGroup />
      </div>
      <div className="absolute top-6 right-20 z-5">
        <div className="pl-6 text-blue italic font-semibold">
          the most recently raffle gift
        </div>
        {listForOwnerFromBlockchain.length > 0 ? (
          <NftCard
            item={
              listForOwnerFromBlockchain[listForOwnerFromBlockchain.length - 1]
            }
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
