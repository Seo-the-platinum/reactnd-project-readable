import React, { Component } from 'react'
import Post from './Post'
import { Link } from 'react-router-dom'
class Category extends Component {

  render() {
    return (
      <div>
        <header>
          Category
        </header>
        <div>
          <Post />
        </div>
        <button onClick={this.handleClick}>
        View Category
        </button>
      </div>
    )
  }
}

export default Category
