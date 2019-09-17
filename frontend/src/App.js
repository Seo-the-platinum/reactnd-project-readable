import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
//import CategoryView from './components/CategoryView'
//import PostView from './components/PostView'
//import AddorCreate from './components/AddorCreate'
import handleInitialData from './actions/shared'
import { connect } from 'react-redux'

class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {

    return (

        <div>
          <Home />

        </div>

    )
  }
}

export default connect()(App);
