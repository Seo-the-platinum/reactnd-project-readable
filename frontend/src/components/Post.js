import React, { Component } from 'react'
import Comment from './Comment'

class Post extends Component {
  render() {
    return (
      <div>
        <header>
          <p>Post</p>
        </header>
        <Comment />
      </div>
    )
  }
}

export default Post
