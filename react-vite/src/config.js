import { keyStores } from 'near-api-js'
const CONTRACT_NAME = 'raffle.testnet'
export function getConfig() {
  return {
    networkId: 'testnet',
    nodeUrl: 'https://public-rpc.blockpi.io/http/near-testnet',
    contractName: CONTRACT_NAME,
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://near-contract-helper.onrender.com',
    // deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() },
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  }
}
