import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const PostTitle= styled.h4`
  color: white;
`

class Post extends Component {
  render() {

    const { data }= this.props
      return (
      <div>
        <PostTitle>
          { data.title}
        </PostTitle>
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
