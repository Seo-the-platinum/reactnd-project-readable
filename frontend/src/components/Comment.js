import React, { Component } from 'react'
import { connect } from 'react-redux'

class Comment extends Component {
  render() {
    const { comments, id }= this.props
    return (
      <div>
        <h3>
          Author: { comments[id].author}
        </h3>
        <p>
        Date: { comments[id].timestamp}
        </p>
        <p>
          { comments[id].body }
        </p>
      </div>
    )
  }
}

function mapStateToProps({ comments }, props) {
  return {
    comments,
  }
}
export default connect(mapStateToProps)(Comment)
