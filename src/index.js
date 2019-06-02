/*global document*/
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from './components/imgContext';
import Home from './pages';
import FaceImage from './pages/image';
import FaceCamera from './pages/camera';

class App extends React.Component {
  render () {
    return (
      <Router>
        <Provider>
          <Route exact path="/" component={Home} />
          <Route exact path="/image" component={FaceImage} />
          <Route exact path="/camera" component={FaceCamera} />
        </Provider>
      </Router>
    );
  }
}

(() => {
  ReactDOM.render(React.createElement(App), document.getElementById('container'));
})();
