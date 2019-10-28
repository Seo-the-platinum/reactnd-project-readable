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
const StyledLink= styled(Link)`
  color: white;
  margin: 10px;
  padding: none;
  text-decoration: none;
`

const Button= styled.button`
  border: none;
  padding: 0;
  background: 0;
  color: white;
  font-size: 18px;
  margin: 5px;
`

const H3= styled.h3`
  color: white;
`

const P= styled.p`
  border: solid 2px white;
  box-shadow: 3px 3px #023133;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  width: 50%;
  color: white;
  flex:1;
  padding: 5px;
`
class Comment extends Component {

  state={
    redirect: false,
  }

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
    .then(()=> {
      this.setState(currState => ({
        redirect: true,
      }))
    })
  }
  render() {
    const { comments, id }= this.props
    const time= comments[id].timestamp
    const date= new Date(time)
  if (this.state.redirect) {
    return <Redirect to='/'/>
  }
    return (
      <Container>
      <header>
        <StyledLink to={`/editcomment/${id}`}>
            Edit comment
        </StyledLink>
        <Button onClick={ this.handleDelete }>
          Delete comment
        </Button>
        <Button
          value='upVote'
          onClick={(e)=> this.handleVote(e) }>
          +
        </Button>
        <Button
          value='downVote'
          onClick={(e)=> this.handleVote(e) }>
          -
        </Button>
      </header>
        <H3>
          Author: { comments[id].author}
        </H3>
        <P>
        Date: {`${date}`}
        </P>
        <P>
          { comments[id].body }
        </P>
        <P>
          { `Vote Score: ${comments[id].voteScore}` }
        </P>
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
