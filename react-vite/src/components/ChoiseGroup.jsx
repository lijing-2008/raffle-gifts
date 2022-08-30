import React from 'react'
import { FIVE_NEAR, ONE_NEAR, raffleNFT, TWO_NEAR } from '../near-api'

export default function ChoiseGroup() {
  return (
    <div className="flex flex-col items-center gap-y-10">
      <div className="text-green font-bold text-2xl">Make your choise!</div>
      <button
        className="transition duration-700 ease-in-out w-50 h-10 rounded-2xl border-0 shadow-xl
     bg-purple-400 cursor-pointer text-xl italic font-bold hover:bg-purple-600 hover:scale-110"
        onClick={() => raffleNFT(ONE_NEAR)}
      >
        Mint 0.1Ⓝ
      </button>
      <button
        className="transition duration-700 ease-in-out w-50 h-10 rounded-2xl border-0 shadow-xl
     bg-pink-400 cursor-pointer text-xl italic font-bold hover:bg-pink-600 hover:scale-110"
        onClick={() => raffleNFT(TWO_NEAR)}
      >
        Mint 0.2Ⓝ
      </button>
      <button
        className="transition duration-700 ease-in-out w-50 h-10 rounded-2xl border-0 shadow-xl
     bg-red-400 cursor-pointer text-xl italic font-bold hover:bg-red-600 hover:scale-110"
        onClick={() => raffleNFT(FIVE_NEAR)}
      >
        Mint 0.5Ⓝ
      </button>
    </div>
  )
}
