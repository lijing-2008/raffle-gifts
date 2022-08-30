import { connect, Contract, transactions, WalletConnection } from 'near-api-js'
import { getConfig } from './config'

const nearConfig = getConfig()
export const ONE_NEAR = '100000000000000000000000'
export const TWO_NEAR = '200000000000000000000000'
export const FIVE_NEAR = '500000000000000000000000'
// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  window.near = await connect(nearConfig)

  // Initializing Wallet based Accout. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(window.near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: [
        'is_admin',
        'nft_total_supply',
        'nft_token',
        'nft_tokens',
        'nft_supply_for_owner',
        'nft_tokens_for_owner',
        'nft_raffle_tokens_by_level',
      ],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: ['nft_mint', 'nft_transfer'],
    }
  )
}
export function signOutNearWallet() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function signInWithNearWallet() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

export async function isAdmin() {
  let response = await window.contract.is_admin({
    account_id: window.walletConnection.getAccountId(),
  })
  return response
}
export async function getTotalSupply() {
  let response = await window.contract.nft_total_supply()
  return response
}
export async function getNFTTokensFromContract(fromIndex, limit) {
  let response = await window.contract.nft_tokens({
    from_index: fromIndex,
    limit,
  })
  return response
}

export async function getNFTTokenByIdFromContract(tokenId) {
  let response = await window.contract.nft_token({
    token_id: tokenId,
  })
  return response
}

export async function getNFTTokenByLevelFromContract(
  fromIndex,
  limit,
  tokenLevel
) {
  let response = await window.contract.nft_raffle_tokens_by_level({
    from_index: fromIndex,
    limit,
    level: tokenLevel,
  })
  return response
}

export async function getNFTTokenByOwnerFromContract(
  accountId,
  fromIndex,
  limit
) {
  let response = await window.contract.nft_tokens_for_owner({
    account_id: accountId,
    from_index: fromIndex,
    limit,
  })
  return response
}

export async function raffleNFT(deposit) {
  await window.contract.nft_transfer(
    {},
    '300000000000000', // attached GAS (optional)
    deposit // attached deposit in yoctoNEAR (optional)
  )
}

export async function mintNft(metadata, tokenLevel) {
  await window.contract.nft_mint(
    {
      metadata,
      token_level: tokenLevel,
    },
    '300000000000000', // attached GAS (optional)
    ONE_NEAR // attached deposit in yoctoNEAR (optional)
  )
}
