import React from 'react';
import createToken from './createToken';
import mintToken from './mintToken';
import getMintTransactions from './getMintTransactions';

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.form = this.form.bind(this)
    this.tokenLinks = this.tokenLinks.bind(this)
    this.bitcoinExplorerUrl = this.bitcoinExplorerUrl.bind(this)
    this.simpleLedgerExplorerUrl = this.simpleLedgerExplorerUrl.bind(this)
    this.parseMintingTransactions = this.parseMintingTransactions.bind(this)
    this.tokenLinksAndMintTransactions = this.tokenLinksAndMintTransactions.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    createToken(this.state).then((data) => {
      this.setState({
        genesisTxId: data.genesisTxId,
        slpAddress: data.slpAddress
      })
    }).catch((error) => {
      console.log(error)
      this.setState({
        tokenCreationError: error
      })
    })

    event.preventDefault();
  }

  parseMintingTransactions(data) {
    return data.map((tx) => {
      return {
        txid: tx.txid,
        amount: tx.tokenDetails.detail.outputs[0].amount
      }
    })
  }

  tokenLinksAndMintTransactions() {
    const history = this.state.mintTransactions.map((tx) => {
      return <li key={tx.txid}>txid: {tx.txid}  amount: {tx.amount}</li>
    })
    return (
      [
        <div>{this.state.name} Token successfully created!</div>,
        <a href={this.simpleLedgerExplorerUrl()}>{this.simpleLedgerExplorerUrl()}</a>,
        <div>History</div>,
        <ul>{history}</ul>
      ]
    )
  }

  render() {
    if (this.state.genesisTxId && this.state.mintTransactions) {
      const intervalTokenAmount = this.state.intervalTokenAmount
      const interval = this.state.interval
      const secondsInterval = interval && interval.match(/(\d+)s/)[1] * 1000
      if (secondsInterval) {
        setInterval(function () {
          mintToken(this.state.genesisTxId, intervalTokenAmount).then(() => {
            getMintTransactions(
              this.state.genesisTxId,
              this.state.slpAddress
            ).then((data) => {
              const parsedMintingTransactions = this.parseMintingTransactions(data)
              this.setState({
                mintTransactions: parsedMintingTransactions
              })
            }).catch((error) => {
              console.log(error)
              this.setState({
                tokenHistoryError: error
              })
            })
          })

        }.bind(this), secondsInterval);
      }
      return this.tokenLinksAndMintTransactions()
    } else if (this.state.genesisTxId) {
      console.log('genesisTxId', this.state.genesisTxId)
      console.log('slpAddress', this.state.slpAddress)
      getMintTransactions(
        this.state.genesisTxId,
        this.state.slpAddress
      ).then((data) => {
        const parsedMintingTransactions = this.parseMintingTransactions(data)
        console.log('parsedMintingTransactions', parsedMintingTransactions)
        this.setState({
          mintTransactions: parsedMintingTransactions
        })
      }).catch((error) => {
        console.log(error)
        this.setState({
          tokenHistoryError: error
        })
      })

      return this.tokenLinks()
    } else {
      return this.form()
    }
  }

  tokenLinks() {
    return (
      [
        <div>{this.state.name} Token successfully created!</div>,
        <a href={this.simpleLedgerExplorerUrl()}>{this.simpleLedgerExplorerUrl()}</a>
      ]
    )
  }

  bitcoinExplorerUrl() {
    return `https://explorer.bitcoin.com/bch/tx/${this.state.genesisTxId}`
  }

  simpleLedgerExplorerUrl() {
    return `https://simpleledger.info/#tx/${this.state.genesisTxId}`
  }

  form() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="label">
          Token Name
          <input
            type="text"
            name="name"
            onChange={this.handleInputChange}
          />
        </label>
        <label className="label">
          Symbol
          <input
            type="text"
            name="symbol"
            onChange={this.handleInputChange}
          />
        </label>
        <label className="label">
          Total Token Quantity
          <input
            type="text"
            name="initialTokenQty"
            onChange={this.handleInputChange}
          />
        </label>
        <label className="label">
          Amount of tokens to mint each interval
          <input
            type="text"
            name="intervalTokenAmount"
            onChange={this.handleInputChange}
          />
        </label>
        <label className="label">
          Minting Time Interval
          <input
            type="text"
            name="interval"
            onChange={this.handleInputChange}
          />
        </label>
        <label className="label">
          Decimals
          <input
            type="text"
            name="decimals"
            onChange={this.handleInputChange}
          />
        </label>
        <label className="label">
          Document URL
          <input
            type="text"
            name="documentUri"
            onChange={this.handleInputChange}
          />
        </label>
        <label className="label">
          Document Hash
          <input
            type="text"
            name="documentHash"
            onChange={this.handleInputChange}
          />
        </label>
        <input
          type="submit"
          value="Submit"

        />
      </form>
    )
  }
}

export default Form;
