// Import node modules
import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import Blocks from './components/blocks';
import './index.css';

// Import compnents
import App from './components/App';

render(
  <Router history={history}>
    <Switch>
      <Route path='/'component={App} />
      <Route path='/blocks'component={Blocks} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
