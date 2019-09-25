import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { Link } from 'react-router-dom'

class CategoryView extends Component {
  render() {
    const { path, posts }= this.props


    const postIndexes= Object.keys(posts).filter((p)=> {
      console.log(posts[p].category)
      return (
        posts[p].category === path
      )
    })

    return (
      <div>
        <header>
          { path }
        </header>
        <button>
          Filter Posts
        </button>
        <div>
          { postIndexes.map((index)=> {
            const postId= posts[index].id
             return (
               <div key={postId}>
                <Post key={postId} data={posts[index]}/>
                <Link to={{
                  pathname: `/postview/${posts[index].id}`,
                  state: { index: index}}
                  }>
                <button>View Post</button>
                </Link>
               </div>
             )
           })}
        </div>
      </div>
    )
  }
}
function mapStateToProps({ categories, posts }, props) {
  const { path }= props.match.params
  console.log(path)
  return {
    path,
    categories,
    posts,
  }
}
export default connect(mapStateToProps)(CategoryView)
