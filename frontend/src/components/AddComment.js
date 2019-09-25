import React, { Component } from 'react'
import { connect } from 'react-redux'


class AddComment extends Component {
  render() {
    const { posts, pid, index }= this.props
    return (
      <div>{ posts[index].title }</div>
    )
  }
}

function mapStateToProps({ comments, posts }, props) {
  const { pid }= props.match.params
  const { index }= props.location.state
  return {
    index,
    pid,
    comments,
    posts,
  }
}

export default connect(mapStateToProps)(AddComment)
