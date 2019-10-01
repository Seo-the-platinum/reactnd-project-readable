import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPost } from '../actions/posts'
import { Redirect } from 'react-router-dom'

class AddorCreate extends Component {
  state= {
    p: {
      id: '',
      title:'',
      body:'',
      timestamp: null,
      author:'',
      category:'',
    },
    redirect: false,
  }

  handleChangeTitle=(e)=> {
    const text= e.target.value
    this.setState((currState)=> ({
      p: {
      ...currState.p,
      title: text,
    }
    }))
  }

  handleChangeBody=(e)=> {
    const text= e.target.value
    this.setState((currState)=> ({
      p: {
      ...currState.p,
      body: text,
    }
    }))
  }

  handleChangeAuthor=(e)=> {
    const text= e.target.value
    this.setState((currState)=> ({
      p: {
      ...currState.p,
      author: text,
    }
    }))
  }

  generateId=(num)=> {
    let string= ''
    const char_list= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for(let i=0; i < num; i++ ) {
      string += char_list.charAt(Math.floor(Math.random() * char_list.length))
    }
    return this.setState((currState)=>({
      p: {
      ...currState.p,
      id: string,
    }
    }))
  }

  generateTimeStamp=()=> {
    this.setState((currState)=> ({
      p: {
      ...currState.p,
      timestamp: Date.now()
    }
    }))
  }

 setCategory=()=> {
   this.setState((currState)=> ({
     p: {
     ...currState.p,
     category: this.props.pathname,
   }
   }))
 }

  handleSubmit=(e)=> {
    e.preventDefault()
    Promise.all([this.generateId(20), this.generateTimeStamp(),this.setCategory()])
    .then(()=> { const post= this.state.p
      this.props.dispatch(handleAddPost({post}))
    })
    .then(()=> {
      this.setState(currState=> ({
        currState,
        redirect: true,
      }))
    })

  }

  render() {
    const { pathname }= this.props
    const { redirect }= this.state
    const { title, body, author }= this.state.p

    if (redirect) {
      return <Redirect to='/'/>
    }
    return (
      <div>
        <header>
        Add post to { pathname } category
        </header>
        <form onSubmit={ (e)=> this.handleSubmit(e) }>
          <label>
          Post title
          <input
            type='text'
            placeholder='Post title'
            value={ title }
            onChange={ (e)=>this.handleChangeTitle(e) }
          />
          </label>
          <label>
            Post body
            <input
              type='text'
              placeholder='body...'
              value={ body }
              onChange={ (e)=> this.handleChangeBody(e) }
            />
          </label>
          <label>
            Author
            <input
              type='text'
              placeholder='Author'
              value={ author }
              onChange={ (e)=> this.handleChangeAuthor(e) }
            />
          </label>
          <label>
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
  const { pathname }= props.match.params
  return {
    posts,
    pathname
  }
}

export default connect(mapStateToProps)(AddorCreate)
