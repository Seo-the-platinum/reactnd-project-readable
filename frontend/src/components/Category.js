import React, { Component } from 'react'
import Post from './Post'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Category extends Component {


  render() {

    const { name, posts }= this.props

    const postIndexes= Object.keys(posts).filter((p)=> {
      console.log(posts[p].category)
      return (
        posts[p].category === name
      )
    })

    const indexesByScore= postIndexes.sort(function(a,b) {
      return a.voteScore -b.voteScore
    })

    const indexesByTime= postIndexes.sort(function(a,b) {
      return a.timestamp -b.timestamp
    })

    return (
      <div>
        <header>
          { name }
        </header>
        <button>
          Filter Posts
        </button>
        <div>
          { postIndexes.map((index)=> {
            const postId= posts[index].id
             return <Post key={postId} data={posts[index]} />
          })}
        </div>
        <Link to={`/categoryview/${this.props.path}`}>
          <button>
            View Category
          </button>
        </Link>
      </div>
    )
  }
}

function mapStateToProps({ posts }, props) {
  return {
    posts,
  }
}
export default connect(mapStateToProps)(Category)
