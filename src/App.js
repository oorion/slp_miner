import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SLP Miner</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <Form></Form>
      </header>
    </div>
  );
}

export default App;
