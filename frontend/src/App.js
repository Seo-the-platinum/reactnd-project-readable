import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import CategoryView from './components/CategoryView'
import PostView from './components/PostView'
import AddorCreate from './components/AddorCreate'
import AddComment from './components/AddComment'
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
      <Router>
        <div>
          <Route path='/' exact component={ Home } />
          <Route path='/categoryview/:path' component={ CategoryView } />
          <Route path='/postview/:pid' component={ PostView } />
          <Route path='/add/:pathname' component={ AddorCreate } />
          <Route path='/addcomment/:pid' component={ AddComment } />
        </div>
      </Router>
    )
  }
}


export default connect()(App);
