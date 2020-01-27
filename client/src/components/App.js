//  default export   { secondary exports }
import React, { Component } from 'react';
import Blocks from './Blocks';

class App extends Component {
  state = {
    walletInfo: {}
  };

  componentDidMount() {
    fetch('http://0.0.0.0:3000/api/wallet-info')
      .then(response => response.json())
      .then(json => this.setState({ walletInfo: json }))
  }

  render() {
    const { address, balance } = this.state.walletInfo;

    return(
      <div>
        Welcome to the Blockchain...
        <div>Address: {address}</div>
        <div>Balance: {balance}</div>
        <br />
        <Blocks/>
      </div>
    );
  }
}

export default App;
