import React, { Component } from 'react';
import { Provider } from 'react-redux'
import Home from './components/Home'
class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    )
  }
}

export default App;
