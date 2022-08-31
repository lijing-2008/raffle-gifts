import { Popover, Avatar, Image, Badge } from 'antd'
import React from 'react'
import { utils } from 'near-api-js'

export default function Balance(props) {
  const { balance, listNFT, totalNFTByOwner } = props
  const avatarSrc =
    listNFT.length > 0
      ? listNFT[0].metadata.media
      : 'https://joeschmoe.io/api/v1/random'

  const content = (
    <div className="flex flex-col ">
      <div>
        <i className="italic font-bold text-xm text-white">total: </i>
        <i className="font-semibold text-xm">
          {utils.format.formatNearAmount(balance.total)}Ⓝ
        </i>
      </div>
      <div>
        <i className="italic font-bold text-xm text-white">available: </i>
        <i className="font-semibold text-xm">
          {utils.format.formatNearAmount(balance.available)}Ⓝ
        </i>
      </div>
      <div>
        <i className="italic font-bold text-xm text-white">stateStaked: </i>
        <i className="font-semibold text-xm">
          {utils.format.formatNearAmount(balance.stateStaked)}Ⓝ
        </i>
      </div>
      <div>
        <i className="italic font-bold text-xm text-white">staked: </i>
        <i className="font-semibold text-xm">
          {utils.format.formatNearAmount(balance.staked)}Ⓝ
        </i>
      </div>
      <div>
        <i className="italic font-bold text-xm text-white">totalNFTs: </i>
        <i className="font-semibold text-xm">{totalNFTByOwner}</i>
      </div>
    </div>
  )
  return (
    <div className="fixed top-100px right-5">
      <Popover
        placement="rightTop"
        content={content}
        title="Account Balance Information"
        color="gray"
      >
        <Badge count={totalNFTByOwner}>
          <Avatar
            className="transition duration-700 ease-in-out hover:scale-110"
            size={50}
            src={<Image src={avatarSrc} style={{ width: 50 }} />}
            alt="details"
          />
        </Badge>
      </Popover>
    </div>
  )
}
