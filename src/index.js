/*global document*/
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages';

class App extends React.Component {
  render () {
    return (
      <Router>
        <div><Route exact path="/" component={Home} /></div>
      </Router>
    );
  }
}

(() => {
  ReactDOM.render(React.createElement(App), document.getElementById('container'));
})();
