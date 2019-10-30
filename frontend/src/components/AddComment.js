import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddComment } from '../actions/comments'
import styled, { css } from 'styled-components'

const Container= styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
const Textarea= styled.textarea`
  display: flex;
  margin: 5px;
`
const Input= styled.input`
  color: white;
  display: flex;
  margin: 5px;
  padding: 0;
  background: none;
  border: none;
`
const Header= styled.h2`
  color: white;
`
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
  getParentId=()=> {
    this.setState(currState=> ({
      comment: {
        ...currState.comment,
        parentId: this.props.pid
      }
    }))
  }

  handleSubmit=(e)=> {
    e.preventDefault()

    Promise.all([this.generateId(20), this.generateTimeStamp(), this.getParentId()])
    .then(()=> { const comment= this.state.comment
      this.props.dispatch(handleAddComment({comment}))
    })
    .then(()=> {
      this.setState(currState=> ({
        currState,
        redirect: true,
      }))
    })
  }



  render() {
    const { posts, pid }= this.props
    const { body, author }= this.state.comment
    const { redirect }= this.state

    if (redirect) {
      return <Redirect to='/'/>
    }
    return (
      <Container>
      <Header>{ posts[pid].title }</Header>
        <Form  onSubmit={ (e)=>this.handleSubmit(e) }>
          <Label>
          Comment Body
            <Textarea
              type='text'
              placeholder='comment'
              value={ body }
              onChange={(e)=> this.handleChange(e) }
              />
          </Label>
          <Label>
            Comment author
            <Textarea
              type='text'
              placeholder='comment'
              value={ author }
              onChange={(e)=> this.handleChangeAuthor(e)}
            />
          </Label>
          <Label>
            <Input
              type='submit'
              value='Submit'
            />
          </Label>
        </Form>
      </Container>
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
