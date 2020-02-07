// Import node modules
import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import Blocks from './components/Blocks';
import ConductTransaction from './components/ConductTransaction';
import './index.css';

// Import compnents
import App from './components/App';

render(
  <Router history={history}>
    <Switch>
      <Route exact path='/'component={App} />
      <Route path='/blocks'component={Blocks} />
      <Route path='/conduct-transaction'component={ConductTransaction} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
