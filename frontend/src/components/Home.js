import React, { Component } from 'react'
import Category from './Category'

class Home extends Component {
  render() {
    return (
      <div>
      <button>
        filter btn
      </button>
        <Category />
      </div>
    )
  }
}

export default Home
