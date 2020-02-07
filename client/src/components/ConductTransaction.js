import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from '../history';

class ConductTransaction extends Component {
  state = {
    recipient: '',
    amount: 0
  }

  updateRecipient = event => {
    this.setState({ recipient: event.target.value });
  }

  updateAmount = event => {
    this.setState({ amount: Number(event.target.value) });
  }

  conductTransaction = () => {
    const { recipient, amount } = this.state;

    fetch(`${document.location.origin}/api/transact`, {
      method: 'POST',
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, amount })
    }).then(response => response.json())
      .then(json => {
        //    console.error   data
        alert(json.message || json.type);
        // redirect to tx pool page
        history.push('/transaction-pool')
      });
  }

  render() {
    return (
      <div className='ConductTransaction'>
        <div><Link to='/'>Home</Link></div>
        <br/>
        <h1>Conduct A Transaction</h1>
        <FormGroup>
          <FormControl
            input='text'
            placeholder='recipient'
            value={this.state.recipient}
            onChange={this.updateRecipient}
          >
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl
            input='text'
            placeholder='amount'
            value={this.state.amount}
            onChange={this.updateAmount}
          >
          </FormControl>
        </FormGroup>
        <Button
          bsStyle='danger'
          onClick={this.conductTransaction}
        >
          Submit
        </Button>
      </div>
    )
  }
}

export default ConductTransaction;
