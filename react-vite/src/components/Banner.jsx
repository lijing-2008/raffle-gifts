import React from 'react'

export default function Banner(props) {
  const { accountId, onHandleLogout } = props
  const onClick = () => {
    window.open('')
  }
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex flex-between h-50px bg-pink-600">
      <div className="flex flex-1 justify-center items-center text-gray-300">
        <div className="text-xl flex">
          Welcome
          <a
            className="px-4 font-semibold text-white underline italic"
            href="https://wallet.testnet.near.org"
            target="_blank"
          >
            {accountId}
          </a>{' '}
          ! Challenge your luck !
        </div>
      </div>
      <div className="w-60 pr-10 flex justify-end items-center">
        <button
          className="transition duration-700 ease-in-out w-50 h-10 rounded-full border-0 shadow-xl bg-purple-400 cursor-pointer text-xl italic font-bold hover:bg-purple-600 hover:scale-110"
          onClick={onHandleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
