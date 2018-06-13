'use strict';

import React from 'react';

class Home extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className="react-app-container">
        <h2>Hello World</h2>
      </div>
    );
  }
}

Home.displayName = 'Home';

export default Home;
