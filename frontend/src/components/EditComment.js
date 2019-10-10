import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleEditComment } from '../actions/comments'

class EditComment extends Component {
  state={
    comment:{},
    redirect: false,
  }

  componentDidMount() {
    const { comments, cid }= this.props
    this.setState(currState=> ({
      currState,
      comment: comments[cid]
    }))
  }
  render() {
    return (
      <div></div>
    )
  }
}

function mapStateToProps({ comments }, props) {
  const { cid }= props.match.params
  return {
    comments,
    cid,
  }
}
export default connect(mapStateToProps)(EditComment)
