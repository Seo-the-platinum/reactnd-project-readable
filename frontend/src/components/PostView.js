import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import { Link } from 'react-router-dom'

class PostView extends Component {
  render() {
    const { posts, pid, index, comments }= this.props

    const postComments= Object.keys(comments).filter(c=> {
      return (
        comments[c].parentId === pid
      )
    })
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
      </header>
      <h3> Author: {posts[index].author}</h3>
      <h3> Date: { posts[index].timestamp}</h3>
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
