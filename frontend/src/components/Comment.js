import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { handleDeleteComment, handleCommentVote } from '../actions/comments'
import styled, { css } from 'styled-components'

const Container= styled.div`
  align-items: center;
  border: solid 2px white;
  border-radius: 15px;
  box-shadow: 3px 3px #023133;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`
class Comment extends Component {

  handleDelete=()=> {
    const { dispatch, comments, id }= this.props
    const comment= comments[id]
    dispatch(handleDeleteComment({comment}))
  }

  handleVote=(e)=> {
    const option= e.target.value
    const { dispatch, comments, id }= this.props
    const comment= comments[id]
    dispatch(handleCommentVote({comment}, option))
  }
  render() {
    const { comments, id }= this.props
    const time= comments[id].timestamp
    const date= new Date(time)

    return (
      <Container>
      <header>
        <Link to={`/editcomment/${id}`}>
          <button>
            Edit comment
          </button>
        </Link>
        <button onClick={ this.handleDelete }>
          Delete comment
        </button>
        <button
          value='upVote'
          onClick={(e)=> this.handleVote(e) }>
          +
        </button>
        <button
          value='downVote'
          onClick={(e)=> this.handleVote(e) }>
          -
        </button>
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
      </Container>
    )
  }
}

function mapStateToProps({ comments }, props) {
  return {
    comments,
  }
}
export default connect(mapStateToProps)(Comment)
