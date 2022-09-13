import React from 'react'
import { signInWithNearWallet } from '../near-api'
export default function SignIn() {
  return (
    <div className="min-h-screen pt-60  bg-[url(./src/assets/bg.png)] bg-no-repeat bg-cover">
      <div className="max-w-600px flex relative m-auto">
        <div className="z-0 bg-white opacity-20 w-full h-600px rounded-xl border-2 border-black shadow-dark-300"></div>
        <div className="absolute top-100px left-100px w-400px text-center font-semibold text-3xl text-gray-100">
          Welcome To Raffle Gifts !
        </div>
        <div className="absolute w-250px h-300px top-200px left-175px bg-[url(./src/assets/sign.png)] bg-contain bg-no-repeat"></div>
        <div className="absolute top-500px left-200px z-20 w-200px">
          <button
            className="transition duration-700 ease-in-out w-200px h-10 rounded-full border-0 shadow-xl bg-purple-400 cursor-pointer text-xl italic font-bold hover:bg-purple-600 hover:scale-110"
            onClick={signInWithNearWallet}
          >
            Connect Wallets
          </button>
        </div>
      </div>
    </div>
  )
}
