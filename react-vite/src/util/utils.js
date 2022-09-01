/**
 * Return an IPFS gateway URL for the given CID and path
 * @param {string} cid
 * @param {string} path
 * @returns {string}
 */
export function makeGatewayURL(cid, path) {
  return `https://${cid}.ipfs.dweb.link/${encodeURIComponent(path)}`
}

/**
 * Make a File object with the given filename, containing the given object (serialized to JSON).
 * @param {string} filename filename for the returned File object
 * @param {object} obj a JSON-serializable object
 * @returns {File}
 */
export function jsonFile(filename, obj) {
  return new File([JSON.stringify(obj)], filename)
}

/**
 * Get the Web3 storage token.
 *
 * @return {string}
 */
export function getSavedWebToken() {
  return localStorage.getItem('web3storage-token')
}

/**
 * saves token to local storage
 *
 * @export
 * @param {string} token
 */
export function saveWebToken(token) {
  localStorage.setItem('web3storage-token', token)
}
/**
 * Removes any saved token from local storage
 */
export function deleteSavedToken() {
  localStorage.removeItem('w3storage-token')
}
