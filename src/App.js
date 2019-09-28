import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SLP Miner</h1>
        <img src={logo} className="App-logo" alt="logo" />

        <form>
          <label class="label">
            Name
            <input type="text" name="name" />
          </label>
          <label class="label">
            Symbol
            <input type="text" name="symbol" />
          </label>
          <label class="label">
            Total Token Quantity
            <input type="text" name="initialTokenQuantity" />
          </label>
          <label class="label">
            Amount of tokens to mint each interval
            <input type="text" name="intervalTokenAmount" />
          </label>
          <label class="label">
            Minting Time Interval
            <input type="text" name="interval" />
          </label>
          <label class="label">
            Decimals
            <input type="text" name="decimals" />
          </label>
          <label class="label">
            Document URL
            <input type="text" name="documentURL" />
          </label>
          <label class="label">
            Document Hash
            <input type="text" name="documentHash" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
