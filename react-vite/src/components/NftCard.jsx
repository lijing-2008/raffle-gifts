import React from 'react'
import { Input, Popover } from 'antd'
import * as _dayjs from 'dayjs'
import { useState } from 'react'
import { transferNFT } from '../near-api'
const dayjs = _dayjs
const getTime = (unixTime) => {
  return dayjs(unixTime).format('YYYY-MM-DD HH:mm:ss')
}
export default function NftCard(props) {
  const [name, setName] = useState('')
  const { item } = props

  const onTransfer = () => {
    transferNFT(item.token_id, `${name}.testnet`)
  }
  const onChange = (e) => {
    setName(e.target.value)
  }
  const content = item ? (
    <div className="flex flex-col items-center">
      <p className="italic font-bold text-xm text-white">Description</p>
      <p className="font-semibold text-xm">{item.metadata.description}</p>
      <p className="italic font-bold text-xm text-white">Issued at</p>
      <p className="font-semibold text-xm">
        {getTime(item.metadata.issued_at)}
      </p>
      {item.owner_id === window.accountId ? (
        <>
          <p className="italic font-bold text-xm text-white">Transfer NFT</p>
          <Input
            addonBefore="Transfer to"
            addonAfter=".testnet"
            placeholder="Account name"
            value={name}
            onChange={onChange}
          />
          <button
            className="transition duration-700 ease-in-out m-4 w-50 h-10 rounded-full border-0 shadow-xl bg-purple-400 cursor-pointer text-xl italic font-bold hover:bg-red-600 hover:scale-110"
            onClick={onTransfer}
          >
            transfer!
          </button>
        </>
      ) : (
        ''
      )}
    </div>
  ) : (
    ''
  )
  return (
    <>
      <Popover
        placement="rightTop"
        content={content}
        title="Details"
        color="gray"
      >
        <div className="transition duration-700 ease-in-out flex flex-col w-240px h-356px rounded-xl border-1 border-white bg-blue-gray-600 hover:scale-110 cursor-pointer">
          <div className="flex flex-col">
            <div className="text-center">
              <div className="pt-1">
                <p className="text-white text-xl font-bold truncate m-0">
                  {item.metadata.title}
                </p>
                <p className="text-white truncate my-0 mx-3">{item.owner_id}</p>
              </div>
            </div>
          </div>
          <div>
            <img
              src={item.metadata.media}
              className="object-contain w-full h-full mx-auto z-10"
            />
          </div>
          <div className="flex justify-between items-center h-full m-2">
            <div className="text-red font-semibold italic">
              Level: {item.level}
            </div>
            <div className="underline text-blue-300 cursor-pointer">
              #{item.token_id}
            </div>
          </div>
        </div>
      </Popover>
    </>
  )
}
