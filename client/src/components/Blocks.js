import React, { Component } from 'react';

class Blocks extends Component {
  state = { blocks: [] }

  componentDidMount() {
    fetch('http://localhost:3000/api/blocks')
      .then(response => response.json())
      .then(json => this.setState({ blocks: json }))
  }

  render() {
    console.log('block state', this.state);
    return(
      <div>
        <h3>Blocks</h3>
      </div>
    )
  }
}

export default Blocks;
