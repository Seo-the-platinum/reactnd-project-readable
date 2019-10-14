import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleEditPost } from '../actions/posts'
import { Redirect } from 'react-router-dom'

class EditPost extends Component {
  state={
    post:{},
    redirect: false,
  }

  handleChange=(e)=> {
    const text= e.target.value
    this.setState(currState=> ({
      post: {
        ...currState.post,
        body:text,
      }
    }))
  }

  handleSubmit=(e)=> {
    e.preventDefault()
    const { posts, pid, dispatch }= this.props
    const { post }= this.state
    console.log(posts[pid].body )

    dispatch(handleEditPost({post}))
    .then(()=> {
      this.setState(currState=> ({
        redirect: true,
      }))
    })
  }


  componentDidMount() {
    const { pid, posts }= this.props
    this.setState(currState=> ({
      currState,
      post: posts[pid]
    }))
  }

  render() {
    const { body }= this.state.post
    if (this.state.redirect) {
      return <Redirect to='/'/>
    }
    return (
      <div>
        <form onSubmit={(e)=> this.handleSubmit(e)}>
          <label>
            Body:
            <textarea
              value={ body }
              onChange={ (e)=> this.handleChange(e) }/>
            </label>
            <label>
              Submit
              <input
                type='submit'
                value='submit'
              />
            </label>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ posts }, props) {
  const { pid }= props.match.params
  return {
    posts,
    pid,
  }
}
export default connect(mapStateToProps)(EditPost)
