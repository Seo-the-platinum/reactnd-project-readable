import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import { Link, Redirect } from 'react-router-dom'
import { handleDeletePost, handleVotePost } from '../actions/posts'
import { handleParentDeleted } from '../actions/comments'
import styled, { css } from 'styled-components'

const Container= styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(2, 150, 156);
`
class PostView extends Component {

  state={
    redirect: false,
  }

  handleDelete=(e)=> {
    e.preventDefault()
    const { dispatch, pid, posts }= this.props
    const post= posts[pid]

    dispatch(handleDeletePost(pid))
    dispatch(handleParentDeleted({post}))
    .then(()=> {
      this.setState(currState=> ({
        currState,
        redirect: true,
      }))
    })
  }

  handleVote=(e)=> {
    const option= e.target.value
    const { dispatch, posts, pid }= this.props
    const post= posts[pid]
    dispatch(handleVotePost({post}, option))
  }
  render() {
    const { posts, pid, index, comments }= this.props
    const time= posts[index].timestamp
    const date= new Date(time)
    const postComments= Object.keys(comments).filter(c=> {
      return (
        comments[c].parentId === pid && comments[c].deleted === false
      )
    })

    if(this.state.redirect) {
      return <Redirect to='/'/>
    }
    return (
      <Container>
      <header>
        <h2>
        {posts[index].title}
        </h2>
        <h3>
        Score: {posts[index].voteScore}
        </h3>
        <Link to={{
           pathname: `/addcomment/${ pid }`,
           state: {index: index},
         }}
          >
        <button>
          Add Comment
        </button>
        </Link>
        <Link to={`/edit/${ pid }`}>
          <button>
            Edit Post
          </button>
        </Link>
        <button onClick={(e)=> this.handleDelete(e)}>
          Delete
        </button>
        <button
          value='upVote'
          onClick={ (e)=> this.handleVote(e) }>
          +
        </button>
        <button
          value='downVote'
          onClick={ (e)=> this.handleVote(e) }>
          -
        </button>
      </header>
      <h3> Author: {posts[index].author}</h3>
      <h3> Date: { `${date}` }</h3>
      <p>{posts[index].body}</p>
      <div>
        { postComments.map(comment=> {
          return <Comment
            key={ comments[comment].id }
            id={ comments[comment].id}
        />
        })}
      </div>
      </Container>
    )
  }
}

function mapStateToProps({ posts, comments }, props) {
  const { pid }= props.match.params
  const { index }= props.location.state
  return {
    index,
    pid,
    posts,
    comments,
  }
}
export default connect(mapStateToProps)(PostView)
