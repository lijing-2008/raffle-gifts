import React from 'react'
import { useState } from 'react'
import NftCard from './NftCard'
import { Result, Tag } from 'antd'
import {
  BarChartOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  SmileOutlined,
} from '@ant-design/icons'

export default function ListShow(props) {
  const [collapse, setCollapse] = useState(true)
  const { listTitle, listData, total } = props

  const onChange = () => {
    setCollapse(!collapse)
  }
  const data = collapse ? listData.slice(0, 4) : listData
  const collapseInfo = collapse ? (
    <div className="text-xm font-semibold italic text-pink">
      展开全部
      <CaretDownOutlined />
    </div>
  ) : (
    <div className="text-xm font-semibold italic">
      收起全部
      <CaretUpOutlined />
    </div>
  )

  return (
    <div className="my-4 w-full divide-y-2 divide-gray-400">
      {/* title */}
      <div className="flex w-full items-center justify-between gap-2">
        <div className="text-gray-200 my-2 px-2 font-semibold text-2xl capitalize">
          {listTitle}
          <Tag icon={<BarChartOutlined />} color="#87d068">
            {total}
          </Tag>
        </div>
        {listData.length > 4 ? (
          <div className="text-gray-400 cursor-pointer font-semibold flex items-center">
            <div onClick={onChange}>{collapseInfo}</div>
          </div>
        ) : (
          ''
        )}
      </div>

      {/* nft list */}
      {data.length > 0 ? (
        <div className="flex flex-wrap select-none h-full gap-x-5 gap-y-5 pt-10 px-10 justify-center">
          {data.map((item, index) => {
            return <NftCard item={item} key={index} />
          })}
        </div>
      ) : (
        <Result
          icon={<SmileOutlined />}
          title={<h3 className="text-gray">Sorry, there is Nothing left.</h3>}
          status="warning"
        />
      )}
    </div>
  )
}
