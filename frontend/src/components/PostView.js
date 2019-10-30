import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import { Link, Redirect } from 'react-router-dom'
import { handleDeletePost, handleVotePost } from '../actions/posts'
import { handleParentDeleted } from '../actions/comments'
import styled from 'styled-components'

const Container= styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid white 1px;
  border-radius: 15px;
`

const Header= styled.header`
  display: flex;
  justify-contetn: center;
  flex-direction: column;
`
const Button= styled.button`
  border: none;
  padding: 0;
  background: 0;
  color: white;
  font-size: 18px;
  margin: 5px;
`
const StyledLink= styled(Link)`
  background: rgb(2, 150, 156);
  color: white;
  margin: 1px;
  text-decoration: none;
`
const LinkSection= styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`
const PostTitle= styled.h2`
  color: white;
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
const Comments= styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Body= styled.div`
  display: flex;
  justify-content: space-around;
  width: 60%;
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
    .then(()=> {
      this.setState(currState=> ({
        currState,
        redirect: true,
      }))
    })
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
        <PostTitle>
          {posts[index].title}
        </PostTitle>
      <Header>
        <H3> Author: {posts[index].author}</H3>
        <H3> Date: { `${date}` }</H3>
        <H3>
        Score: {posts[index].voteScore}
        </H3>
      </Header>
      <LinkSection>
        <StyledLink to={{
           pathname: `/addcomment/${ pid }`,
           state: {index: index},
         }}
          >
          Add Comment
        </StyledLink>
        <StyledLink to={`/edit/${ pid }`}>
          Edit Post
        </StyledLink>
        <Button onClick={(e)=> this.handleDelete(e)}>
          Delete
        </Button>
      </LinkSection>
      <Body>
        <P>{posts[index].body}</P>
        <Button
          value='upVote'
          onClick={ (e)=> this.handleVote(e) }>
          +
        </Button>
        <Button
          value='downVote'
          onClick={ (e)=> this.handleVote(e) }>
          -
        </Button>
      </Body>
      <Comments>
        { postComments.map(comment=> {
          return <Comment
            key={ comments[comment].id }
            id={ comments[comment].id}
        />
        })}
      </Comments>
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
