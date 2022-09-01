import { useEffect, useState } from 'react'
import { Web3Storage } from 'web3.storage'
import { Form, Input, Select, message, Modal, Divider } from 'antd'
import {
  makeGatewayURL,
  jsonFile,
  getSavedWebToken,
  saveWebToken,
} from '../util/utils'
import { mintNft } from '../near-api'
import CustomStatistic from './CustomStatistic'
const { Option } = Select
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

const defaultMetadata = {
  title: 'default title',
  description: 'an special NFT',
  media: '',
  media_hash: '',
  copies: 1,
  issued_at: Date.now(),
  expires_at: 0,
  starts_at: 0,
  updated_at: Date.now(),
  extra: '',
  reference: '',
  reference_hash: '',
}
export default function UploadNFT(props) {
  const [fileUrl, updateFileUrl] = useState('')
  const [cid, setCid] = useState('')
  const [nftTitle, setNftTitle] = useState('')
  const { total, nTotal, rTotal, srTotal, ssrTotal } = props
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [webToken, setWebToken] = useState('')

  const [form] = Form.useForm()

  const handleOk = () => {
    saveWebToken(webToken)
    message.success('setting web3 storage token successfully!')
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    message.warn('you didnot setting the web3 storage token')
    setIsModalVisible(false)
  }
  const onWebTokenChanged = (e) => {
    setWebToken(e.target.value)
  }

  //upload image function
  async function onChange(e) {
    let token = getSavedWebToken()
    if (!token) {
      setIsModalVisible(true)
    } else {
      const client = new Web3Storage({
        token,
      })
      const file = e.target.files[0]

      const metadataFile = jsonFile('metadata.json', {
        path: file.name,
        caption: 'test description',
      })

      const rootCid = await client.put([file, metadataFile], {
        name: 'nft-raffle',
        maxRetries: 3,
        onRootCidReady: (rootCid) => {
          setCid(rootCid)
        },
        onStoredChunk: (bytes) => {
          message.success(
            `upload file ${
              file.name
            } successfully,  sent ${bytes.toLocaleString()} bytes to web3.storage`,
            6
          )
        },
      })

      const url = makeGatewayURL(rootCid, 'metadata.json')
      const res = await fetch(url)
      const metadata = await res.json()
      const gatewayURL = makeGatewayURL(rootCid, metadata.path)
      updateFileUrl(gatewayURL)
    }
  }
  useEffect(() => {
    form.setFieldValue('mediaUrl', fileUrl)
  }, [fileUrl])
  useEffect(() => {
    let temp = form.getFieldValue('title')
    setNftTitle(temp)
  })

  const onMint = async () => {
    const metadata = {
      title: form.getFieldValue('title'),
      description: form.getFieldValue('description'),
      media: form.getFieldValue('mediaUrl'),
      media_hash: '',
      copies: 1,
      issued_at: Date.now(),
      expires_at: 0,
      starts_at: 0,
      updated_at: Date.now(),
      extra: '',
      reference: '',
      reference_hash: '',
    }
    const tokenLevel = form.getFieldValue('level')
    await mintNft(metadata, tokenLevel)
  }

  const onReset = () => {
    form.resetFields()
  }

  const onFill = () => {
    form.setFieldsValue({
      title: 'title',
      level: 'SSR',
      description: 'this is a description',
    })
  }
  return (
    <>
      <div className="max-w-2xl flex relative m-auto">
        <div className="z-0 mt-3 bg-white opacity-20 w-full h-460px rounded-xl border-2 border-black shadow-dark-300"></div>

        <div className="absolute flex flex-between justify-center gap-x-10 w-400px h-50px top-20px left-150px italic">
          <CustomStatistic title="Total Mint" value={total} />
          <CustomStatistic
            title="Total Transfered"
            value={total - nTotal - rTotal - srTotal - ssrTotal}
          />
          <CustomStatistic title="Total SSR" value={ssrTotal} />
        </div>
        <div className="absolute z-5 top-60px w-4/5 left-70px">
          <Divider className="bg-gray-400" />
        </div>
        <div className="absolute flex justify-betweens w-full h-350px top-100px ">
          <div className="ml-8">
            <div className=" w-240px h-240px bg-gray bg-[url(./src/assets/default.png)]">
              {fileUrl && <img src={fileUrl} width="240px" height="240px" />}
            </div>
            <div className=" w-240px h-100px mt-4 pl-8">
              <input type="file" onChange={onChange} />
            </div>
            <Modal
              title="Please input your Web3.storage Token before upload!"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input.TextArea value={webToken} onChange={onWebTokenChanged} />
            </Modal>
          </div>
          <div className="ml-4">
            <div className="z-10 w-350px h-400px ">
              <Form {...layout} s form={form} name="control-hooks">
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="level"
                  label="Level"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Select level" allowClear>
                    <Option value="SSR">SSR</Option>
                    <Option value="SR">SR</Option>
                    <Option value="R">R</Option>
                    <Option value="N">N</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Discription"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="mediaUrl"
                  label="mediaUrl"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <button
                    className="transition duration-700 ease-in-out w-100px ml-2 mr-4 bg-pink-400 border-0 rounded-xl shadow-black hover:bg-red-400 hover:scale-110 cursor-pointer"
                    onClick={onReset}
                  >
                    Reset
                  </button>
                  <button
                    className="transition duration-700 ease-in-out w-100px bg-blue-400 border-0 rounded-xl shadow-black hover:bg-blue-600 hover:scale-110 cursor-pointer"
                    type="dashed"
                    onClick={onFill}
                  >
                    Fill default
                  </button>
                  <br />
                  <button
                    className="transition duration-700 ease-in-out m-4 w-50 h-10 rounded-full border-0 shadow-xl bg-purple-400 cursor-pointer text-xl italic font-bold hover:bg-red-600 hover:scale-110"
                    onClick={onMint}
                  >
                    Mint
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
