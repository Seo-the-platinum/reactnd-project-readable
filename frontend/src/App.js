import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
//import CategoryView from './components/CategoryView'
//import PostView from './components/PostView'
//import AddorCreate from './components/AddorCreate'
import handleInitialData from './actions/shared'
import { connect } from 'react-redux'

class App extends Component {

 state= {
   loading: true,
 }
  componentDidMount() {
    this.props.dispatch(handleInitialData())
    .then(()=> {
      this.setState((currState)=> ({
        loading: false,
      }))
    })
  }

  render() {

    return (
      
        <div>
          {this.state.loading === false ? <Home /> : null}
        </div>

    )
  }
}


export default connect()(App);
