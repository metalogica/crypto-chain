import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

  render() {
    console.log('conduct tx state', this.state)

    return (
      <div>
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
      </div>
    )
  }
}

export default ConductTransaction;
