import React from 'react'

export default function Banner(props) {
  const { accountId } = props
  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex flex-between h-65px bg-pink-600">
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
    </div>
  )
}
