import React, { Component } from 'react'
import Comment from './Comment'
import { connect } from 'react-redux'

class Post extends Component {

  render() {

    const { posts, data }= this.props

    return (
      <div>
        <header>
          { posts[data].title}
        </header>
        <Comment />
      </div>
    )
  }
}

function mapStateToProps({ posts }, props) {
  return {
    posts,
  }
}
export default connect(mapStateToProps)(Post)
