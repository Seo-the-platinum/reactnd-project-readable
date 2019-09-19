import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostView extends Component {
  render() {
    const { posts, pid, index }= this.props

    console.log(index)
    return (
      <div >
      <header>
        {posts[index].title}
      </header>
      <p>{posts[index].body}</p>
      </div>
    )
  }
}

function mapStateToProps({ posts }, props) {
  const { pid }= props.match.params
  const { index }= props.location.state
  return {
    index,
    pid,
    posts,
  }
}
export default connect(mapStateToProps)(PostView)
