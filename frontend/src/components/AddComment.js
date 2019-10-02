import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class AddComment extends Component {
  state= {
    comment:{
      body: '',
      id: '',
      parentId:'',
      author:'',
      timestamp: null,
    },
    redirect: false,
  }
  handleChange=(e)=> {
    const text= e.target.value
    this.setState(currState=> ({
      comment: {
        ...currState.comment,
        body: text
      }
    }))
  }

  handleChangeAuthor=(e)=> {
    const text= e.target.value
    this.setState(currState=> ({
      comment: {
        ...currState.comment,
        author: text,
      }
    }))
  }

  generateId=(num)=> {
    const char_list= 'ABCDEFHGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let string=''
    for( let i= 0; i < num; i++) {
      string += char_list.charAt(Math.floor(Math.random()* char_list.length))
   }
   return this.setState(currState => ({
     comment: {
       ...currState.comment,
       id: string,
     }
   }))
  }
  generateTimeStamp=()=> {
    this.setState(currState => ({
      comment: {
        ...currState.comment,
        timestamp: Date.now()
      }
    }))
  }



  render() {
    const { posts, pid }= this.props
    const { body, author }= this.state.comment
    console.log(pid)
    return (
      <div>
      { posts[pid].title }
        <form>
          <label>
          Comment Body
            <input
              type='text'
              placeholder='comment'
              value={ body }
              onChange={(e)=> this.handleChange(e) }
              />
          </label>
          <label>
            Comment author
            <input
              type='text'
              placeholder='comment'
              value={ author }
              onChange={(e)=> this.handleChangeAuthor(e)}
            />
          </label>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ comments, posts }, props) {
  const { pid }= props.match.params
  return {
    pid,
    comments,
    posts,
  }
}

export default connect(mapStateToProps)(AddComment)
