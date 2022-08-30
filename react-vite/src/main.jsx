import React from 'react'
import { createRoot } from 'react-dom/client'
import './common/style/index.css'
import App from './App'
import 'antd/dist/antd.css'
import 'uno.css'
import { initContract } from './near-api'
const reactRoot = createRoot(document.querySelector('#root'))
import { Buffer } from 'buffer'
globalThis.Buffer = Buffer

window.nearInitPromise = initContract()
  .then(() => {
    reactRoot.render(<App />)
  })
  .catch((e) => {
    reactRoot.render(
      <div style={{ color: 'red' }}>
        Error: <code>{e.message}</code>
      </div>
    )
  })
