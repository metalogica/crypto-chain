import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Block from './block';

class Blocks extends Component {
  state = { blocks: [] }

  componentDidMount() {
    fetch(`${document.location.origin}/api/blocks`)
      .then(response => response.json())
      .then(json => this.setState({ blocks: json }))
  }

  render() {
    console.log('block state', this.state);
    return(
      <div>
        <h3>Blocks</h3>
        <Link to='/'>Home</Link>
        {
          this.state.blocks.map(block => {
            return(
              <Block key={block.hash} block={block} />
            );
          })
        }
      </div>
    )
  }
}

export default Blocks;
