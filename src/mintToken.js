import SLPSDK from 'slp-sdk';
import walletInfo from './walletInfo';

const NETWORK = `mainnet`

// Used for debugging and investigating JS objects.
const util = require("util")
util.inspect.defaultOptions = { depth: 1 }

// Instantiate SLP based on the network.
let SLP
if (NETWORK === `mainnet`)
  SLP = new SLPSDK({ restURL: `https://rest.bitcoin.com/v2/` })
else SLP = new SLPSDK({ restURL: `https://trest.bitcoin.com/v2/` })

export default async function mintToken(tokenId, tokenQuantity) {
  try {
    const mnemonic = walletInfo.mnemonic

    // root seed buffer
    const rootSeed = SLP.Mnemonic.toSeed(mnemonic)
    // master HDNode
    let masterHDNode
    if (NETWORK === `mainnet`) masterHDNode = SLP.HDNode.fromSeed(rootSeed)
    else masterHDNode = SLP.HDNode.fromSeed(rootSeed, "testnet") // Testnet

    // HDNode of BIP44 account
    const account = SLP.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

    const change = SLP.HDNode.derivePath(account, "0/0")

    // get the cash address
    const cashAddress = SLP.HDNode.toCashAddress(change)
    const slpAddress = SLP.Address.toSLPAddress(cashAddress)

    const fundingAddress = slpAddress
    const fundingWif = SLP.HDNode.toWIF(change) // <-- compressed WIF format
    const tokenReceiverAddress = slpAddress
    const batonReceiverAddress = slpAddress
    const bchChangeReceiverAddress = cashAddress

    // Exit if user did not update the tokenId.
    if (!tokenId || tokenId === "") {
      console.log(
        `tokenId value is empty. Update the code with the tokenId of your token.`
      )
      return
    }

    // Create a config object for minting
    const mintConfig = {
      fundingAddress,
      fundingWif,
      tokenReceiverAddress,
      batonReceiverAddress,
      bchChangeReceiverAddress,
      tokenId: tokenId,
      additionalTokenQty: tokenQuantity
    }

    // Generate, sign, and broadcast a hex-encoded transaction for creating
    // the new token.
    const mintTxId = await SLP.TokenType1.mint(mintConfig)

    console.log(`mintTxId: ${util.inspect(mintTxId)}`)

    console.log(`\nView this transaction on the block explorer:`)
    if (NETWORK === `mainnet`)
      console.log(`https://explorer.bitcoin.com/bch/tx/${mintTxId}`)
    else console.log(`https://explorer.bitcoin.com/tbch/tx/${mintTxId}`)
  } catch (err) {
    console.error(`Error in mintToken: `, err)
    console.log(`Error message: ${err.message}`)
    throw err
  }
}
