import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Comment extends Component {
  render() {
    const { comments, id }= this.props
    const time= comments[id].timestamp
    const date= new Date(time)
    return (
      <div>
      <header>
        <Link to={`/editcomment/${id}`}>
          <button>
            Edit comment
          </button>
        </Link>
      </header>
        <h3>
          Author: { comments[id].author}
        </h3>
        <p>
        Date: {`${date}`}
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
