import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPost } from '../actions/posts'
import { Redirect } from 'react-router-dom'
import styled, { css } from 'styled-components'

const Container= styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid white 1px;
  border-radius: 15px;
`

const Header= styled.h2`
  color: white;
  display: flex;
  justify-content: center;
`

const Form= styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: solid 1px white;
  border-radius: 15px;
  padding: 20px;
`
const Label= styled.label`
  color: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
`
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
      <Container>
        <Header>
        Add post to { pathname } category
        </Header>
        <Form onSubmit={ (e)=> this.handleSubmit(e) }>
          <Label>
          Post title
          <input
            type='text'
            placeholder='Post title'
            value={ title }
            onChange={ (e)=>this.handleChangeTitle(e) }
          />
          </Label>
          <Label>
            Post body
            <textarea
              type='text'
              placeholder='body...'
              value={ body }
              onChange={ (e)=> this.handleChangeBody(e) }
            />
          </Label>
          <Label>
            Author
            <input
              type='text'
              placeholder='Author'
              value={ author }
              onChange={ (e)=> this.handleChangeAuthor(e) }
            />
          </Label>
          <Label>
            <input
              type='submit'
              value='submit'
            />
          </Label>
        </Form>
      </Container>
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
