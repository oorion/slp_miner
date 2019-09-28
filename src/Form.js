import React from 'react';
import createToken from './createToken';

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <form >
        <label class="label">
          Token Name
          <input
            type="text"
            name="name"
            onChange={this.handleInputChange}
          />
        </label>
        <label class="label">
          Symbol
          <input
            type="text"
            name="symbol"
            onChange={this.handleInputChange}
          />
        </label>
        <label class="label">
          Total Token Quantity
          <input
            type="text"
            name="initialTokenQuantity"
            onChange={this.handleInputChange}
          />
        </label>
        <label class="label">
          Amount of tokens to mint each interval
          <input
            type="text"
            name="intervalTokenAmount"
            onChange={this.handleInputChange}
          />
        </label>
        <label class="label">
          Minting Time Interval
          <input
            type="text"
            name="interval"
            onChange={this.handleInputChange}
          />
        </label>
        <label class="label">
          Decimals
          <input
            type="text"
            name="decimals"
            onChange={this.handleInputChange}
          />
        </label>
        <label class="label">
          Document URL
          <input
            type="text"
            name="documentURL"
            onChange={this.handleInputChange}
          />
        </label>
        <label class="label">
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
