import React from 'react'
import NftCard from './NftCard'

export default function ListShow(props) {
  const { listTitle, listData } = props
  return (
    <div className="my-4 w-full divide-y-2 divide-gray-400">
      {/* title */}
      <div className="flex w-full items-center justify-between gap-2">
        <h1 className="text-gray-200 font-semibold text-2xl capitalize">
          {listTitle}
        </h1>
        <div className="text-gray-400 cursor-pointer font-semibold flex items-center">
          <span>More</span>
          <span>++</span>
        </div>
      </div>

      {/* nft list */}
      <div className="flex flex-wrap select-none h-full gap-x-5 gap-y-5 pt-10 px-10 justify-center">
        {listData.map((item, index) => {
          return <NftCard item={item} key={index} />
        })}
      </div>
    </div>
  )
}
