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
