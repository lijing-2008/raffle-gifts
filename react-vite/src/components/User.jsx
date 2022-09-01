import {
  Popover,
  Avatar,
  Image,
  Badge,
  Drawer,
  Tag,
  Input,
  message,
  Button,
  Table,
} from 'antd'
import React from 'react'
import { utils } from 'near-api-js'
import { addAdmin, removeAdmin, signOutNearWallet } from '../near-api'
import { useState } from 'react'
const { Search } = Input

export default function User(props) {
  const { balance, listNFT, totalNFTByOwner, admins } = props
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }
  const avatarSrc =
    listNFT.length > 0
      ? listNFT[0].metadata.media
      : 'https://joeschmoe.io/api/v1/random'

  const onRemoveAdmin = async (item) => {
    console.log(item.accountId)
    await removeAdmin(item.accountId)
  }
  const onAddAdmin = (admin) => {
    addAdmin(admin)
      .then(message.loading(`add admin ${admin}`))
      .catch(message.error)
  }
  const dataSource = admins
    .filter((item) => item !== 'raffle.testnet')
    .map((item, index) => {
      return {
        key: index,
        accountId: item,
      }
    })
  const columns = [
    {
      title: 'Account ID',
      dataIndex: 'accountId',
      key: 'accountId',
      render: (_, { accountId }) => {
        return <Tag color="purple">{accountId}</Tag>
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="danger" onClick={() => onRemoveAdmin(record)}>
          Delete
        </Button>
      ),
    },
  ]
  const content = (
    <div className="flex flex-col ">
      <BalanceItem title="total" value={balance.total} />
      <BalanceItem title="availabel" value={balance.available} />
      <BalanceItem title="stateStaked" value={balance.stateStaked} />
      <BalanceItem title="staked" value={balance.staked} />
      <div>
        <i className="italic font-bold text-xm text-white">totalNFTs: </i>
        <i className="font-semibold text-xm">{totalNFTByOwner}</i>
      </div>
      <div className="flex m-auto mt-2 gap-x-3">
        <button
          className="transition duration-700 ease-in-out w-20 h-8 rounded-xl border-0 shadow-xl bg-pink-300 cursor-pointer text-l italic font-semibold hover:bg-pink-600 hover:scale-110"
          onClick={signOutNearWallet}
        >
          Logout
        </button>
        {window.accountId === 'raffle.testnet' ? (
          <button
            className="transition duration-700 ease-in-out w-40 h-8 rounded-xl border-0 shadow-xl bg-pink-300 cursor-pointer text-l italic font-semibold hover:bg-pink-600 hover:scale-110"
            onClick={showDrawer}
          >
            Manage admins
          </button>
        ) : (
          ''
        )}
        <Drawer
          title="Manage Administrator"
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <Tag color="#f50">
            Super Administrator(contract owner) : raffle.test
          </Tag>
          <Search
            className="my-4"
            placeholder="example.testnet"
            allowClear
            enterButton="Add"
            size="large"
            onSearch={onAddAdmin}
          />
          <Table columns={columns} dataSource={dataSource} />
        </Drawer>
      </div>
    </div>
  )
  return (
    <div className="fixed top-12px left-20 z-20">
      <Popover
        placement="bottom"
        content={content}
        title="Account Balance Information"
        color="gray"
      >
        <Badge count={totalNFTByOwner}>
          <Avatar
            className="transition duration-700 ease-in-out hover:scale-110 bg-gray-300"
            size={50}
            src={<Image src={avatarSrc} style={{ width: 50 }} />}
            alt="details"
          />
        </Badge>
      </Popover>
    </div>
  )
}

function BalanceItem(props) {
  const { title, value } = props
  return (
    <div>
      <i className="italic font-bold text-xm text-white">{title}: </i>
      <i className="font-semibold text-xm">
        {utils.format.formatNearAmount(value)}Ⓝ
      </i>
    </div>
  )
}
