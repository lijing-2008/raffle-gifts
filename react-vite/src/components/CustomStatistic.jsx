import React from 'react'
import { Statistic } from 'antd'

export default function CustomStatistic(props) {
  const { title, value } = props
  return (
    <>
      <Statistic
        title={<i className="text-red font-semibold">{title}</i>}
        value={value}
        formatter={(value) => <i className="text-purple text-3xl">{value}</i>}
      />
    </>
  )
}
