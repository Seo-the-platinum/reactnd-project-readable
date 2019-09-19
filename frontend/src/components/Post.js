import React, { Component } from 'react'
import { connect } from 'react-redux'

class Post extends Component {
  render() {

    const { posts, data }= this.props
    console.log(posts, data)
      return (
      <div>
        <p>
          { data.title}
        </p>
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
