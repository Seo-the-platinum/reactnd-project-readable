import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleEditComment } from '../actions/comments'

class EditComment extends Component {
  state={
    comment:{},
    redirect: false,
  }

  componentDidMount() {
    const { comments, id }= this.props
    this.setState(currState=> ({
      currState,
      comment: comments[id]
    }))
  }

  handleChange=(e)=> {
   const text= e.target.value

   this.setState(currState => ({
     comment: {
     ...currState.comment,
     body: text,
     }
   }))
  }

  handleSubmit= (e)=> {
    e.preventDefault()
    const { dispatch }= this.props
    const { comment }= this.state

    dispatch(handleEditComment({ comment }))
    .then(()=> {
      this.setState(currState=> ({
        redirect: true,
      }))
    })
  }

  render() {
    const { body }= this.state.comment

    if(this.state.redirect) {
      return <Redirect to='/'/>
    }
    return (
      <div>
        <form onSubmit={(e)=> this.handleSubmit(e)}>
          <label>
            Body
            <textarea
              value={ body }
              onChange={ (e)=> this.handleChange(e)}
            />
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

function mapStateToProps({ comments }, props) {
  const { id }= props.match.params
  return {
    comments,
    id,
  }
}
export default connect(mapStateToProps)(EditComment)
