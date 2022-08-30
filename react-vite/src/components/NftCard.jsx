import React from 'react'

export default function NftCard(props) {
  const { item } = props
  return (
    <div className="flex flex-col w-240px h-356px rounded-xl border-1 border-white bg-blue-gray-600">
      <div className="flex flex-col">
        <div className="text-center">
          <div className="pt-1">
            <p className="text-white text-xl font-bold truncate m-0">
              {item.metadata.title}
            </p>
            <p className="text-white truncate my-0 mx-3">
              {item.metadata.description}
            </p>
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
        <div className="text-red font-semibold italic">Level: {item.level}</div>
        <div className="underline text-blue-300 cursor-pointer">
          See Details
        </div>
      </div>
    </div>
  )
}
