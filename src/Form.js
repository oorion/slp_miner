import React from 'react';
import createToken from './createToken';

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
    createToken(this.state).then((genesisTxId) => {
      this.setState({
        genesisTxId: genesisTxId
      })
    }).catch((error) => {
      debugger
      this.setState({
        tokenCreationError: error
      })
    })

    event.preventDefault();
  }

  render() {
    if (this.state.genesisTxId) {
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
