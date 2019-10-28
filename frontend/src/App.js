import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import CategoryView from './components/CategoryView'
import PostView from './components/PostView'
import AddorCreate from './components/AddorCreate'
import AddComment from './components/AddComment'
import EditPost from './components/EditPost'
import EditComment from './components/EditComment'
import handleInitialData from './actions/shared'
import { connect } from 'react-redux'
import styled, { css, createGlobalStyle } from 'styled-components'
import NavBar from './components/NavBar'

const GlobalStyle= createGlobalStyle`
  html, body {
    height: 100%;
    background: rgb(2, 150, 156);
  }
`

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
          <Route path='/' component={ NavBar } />
          <Route exact path='/' component={ Home } />
          <Route path='/categoryview/:path' component={ CategoryView } />
          <Route path='/postview/:pid' component={ PostView } />
          <Route path='/add/:pathname' component={ AddorCreate } />
          <Route path='/addcomment/:pid' component={ AddComment } />
          <Route path='/edit/:pid' component={ EditPost }/>
          <Route path='/editcomment/:id' component={ EditComment } />
          </div>
      </Router>
    )
  }
}


export default connect()(App);
