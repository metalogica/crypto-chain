//  default export   { secondary exports }
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

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
      <div className='App'>
        <img className='logo' src={logo}></img>
        <br/>
        <div>Welcome to the Blockchain...</div>
        <br/>
          <div>
            <Link to='/blocks'>Blocks</Link>
            <Link to='/conduct-transaction'>Conduct A Transaction</Link>
          </div>
        <br/>
        <div className='WalletInfo'>
          <div>Address: {address}</div>
          <div>Balance: {balance}</div>
        </div>
      </div>
    );
  }
}

export default App;
