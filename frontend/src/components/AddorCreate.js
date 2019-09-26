import React, { Component } from 'react'
import { connect } from 'react-redux'

class AddorCreate extends Component {
  state= {
      id: '',
      title:'',
      body:'',
      timestamp: null,
      author:'',
      category:'',
  }

  handleChangeTitle=(e)=> {
    const text= e.target.value
    this.setState((currState)=> ({
      title: text,
    }))
  }

  handleChangeBody=(e)=> {
    const text= e.target.value
    this.setState((currState)=> ({
      body: text,
    }))
  }

  handleChangeAuthor=(e)=> {
    const text= e.target.value
    this.setState((currState)=> ({
      author: text,
    }))
  }

  generateId=(num)=> {
    let string= ''
    const char_list= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for(let i=0; i < num; i++ ) {
      string += char_list.charAt(Math.floor(Math.random() * char_list.length))
    }
    return this.setState((currState)=>({
      ...currState,
      id: string,
    }))
  }

  generateTimeStamp=()=> {
    this.setState((currState)=> ({
      ...currState,
      timestamp: Date.now()
    }))
  }

 setCategory=()=> {
   this.setState((currState)=> ({
     ...currState,
     category: this.props.pathname,
   }))
 }

  handleSubmit=(e)=> {
    Promise.all([this.generateId(20), this.generateTimeStamp(),this.setCategory()])
    .then(()=> {const post= this.state
      console.log(post)
    })
    e.preventDefault()

  }

  render() {
    const { pathname }= this.props
    const { title, body, author }= this.state

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
