import React from 'react'
import { Popover } from 'antd'
import * as dayjs from 'dayjs'
const getTime = (unixTime) => {
  return dayjs(unixTime).format('YYYY-MM-DD HH:mm:ss')
}
export default function NftCard(props) {
  const { item } = props
  const content = (
    <div>
      <p className="italic font-bold text-xm text-white">Description</p>
      <p className="font-semibold text-xm">{item.metadata.description}</p>
      <p className="italic font-bold text-xm text-white">Issued at</p>
      <p className="font-semibold text-xm">
        {getTime(item.metadata.issued_at)}
      </p>
      
    </div>
  )
  return (
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
      <Popover
        placement="rightTop"
        content={content}
        title="Details"
        color="gray"
      >
        <div>
          <img
            src={item.metadata.media}
            className="object-contain w-full h-full mx-auto z-10"
          />
        </div>
      </Popover>
      <div className="flex justify-between items-center h-full m-2">
        <div className="text-red font-semibold italic">Level: {item.level}</div>
        <div className="underline text-blue-300 cursor-pointer">
          See Details
        </div>
      </div>
    </div>
  )
}
