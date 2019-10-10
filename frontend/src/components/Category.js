import React, { Component } from 'react'
import Post from './Post'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Category extends Component {
  state= {
    byScore:true,

  }

  toggle=()=> {
    if( this.state.byScore) {
    this.setState(currState=> ({
      currState,
      byScore: false,
    }))
  } else {
    this.setState(currState=> ({
      currState,
      byScore: true,
    }))
  }
  }


  render() {

    const { name, posts }= this.props
    const { byScore }= this.state

    const postIndexes= Object.keys(posts).filter((p)=> {
      return (
        posts[p].category === name
      )
    })

  

    return (
      <div>
        <header>
          { name }
        </header>
        <button onClick={ this.toggle }>
        { byScore ? 'Filter by Time' : 'Filter by Score' }
        </button>

        <div>
          { byScore ?
            postIndexes.sort(function(a,b) {
              return posts[b].voteScore -posts[a].voteScore
            }).map((index)=> {
              const postId= posts[index].id
                return <Post key={ postId } data={ posts[index] } />
            })  :
            postIndexes.sort(function(a,b) {
              return posts[b].timestamp -posts[a].timestamp
            }).map((index)=> {
                const postId= posts[index].id
                return <Post key={ postId } data={ posts[index]} />
            })}
        </div>
        <Link to={`/categoryview/${this.props.path}`}>
          <button>
            View Category
          </button>
        </Link>
        <Link to={`/add/${ name }`}>
        <button>
          Add Post
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
