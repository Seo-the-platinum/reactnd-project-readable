import React, { Component } from 'react'
import Post from './Post'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Category extends Component {

  render() {

    const { name, posts }= this.props
    console.log(name)
    const postIndexes= Object.keys(posts).filter((p)=> {
      console.log(posts[p].category)
      return (
        posts[p].category === name
      )
    })

    return (
      <div>
        <header>
          { name }
        </header>
        <div>
          { postIndexes.map((index)=> {
             return <Post data={posts[index]} />
          })}
        </div>
        <button onClick={this.handleClick}>
        View Category
        </button>
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
