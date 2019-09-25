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
  render() {
    const { pathname }= this.props
    const { title, body }= this.state
    return (
      <div>
        <header>
        Add post to { pathname } category
        </header>
        <form>
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
