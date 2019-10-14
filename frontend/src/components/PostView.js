import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import { Link, Redirect } from 'react-router-dom'
import { handleDeletePost } from '../actions/posts'


class PostView extends Component {

  state={
    redirect: false,
  }

  handleDelete=(e)=> {
    e.preventDefault()
    const { dispatch, pid }= this.props
    dispatch(handleDeletePost(pid))
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
        comments[c].parentId === pid
      )
    })

    if(this.state.redirect) {
      return <Redirect to='/'/>
    }
    return (
      <div >
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
      </div>
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
