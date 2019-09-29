import SLPSDK from 'slp-sdk';

const NETWORK = `mainnet`

// const SLPSDK = require("../../lib/SLP")

// Used for debugging and investigating JS objects.
const util = require("util")
util.inspect.defaultOptions = { depth: 1 }

// Instantiate SLP based on the network.
let SLP
if (NETWORK === `mainnet`)
  SLP = new SLPSDK({ restURL: `https://rest.bitcoin.com/v2/` })
else SLP = new SLPSDK({ restURL: `https://trest.bitcoin.com/v2/` })

export default async function getMintTransactions(tokenId, simpleLedgerAddress) {
  return await SLP.Utils.transactions(tokenId, simpleLedgerAddress)
}
