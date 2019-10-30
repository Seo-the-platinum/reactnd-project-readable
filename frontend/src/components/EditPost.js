import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleEditPost } from '../actions/posts'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

const Container= styled.div`
  display: flex;
  flex-direction: column;
`

const Form= styled.form`
  display: flex;
  flex-direction: column;
  border: solid 1px white;
  border-radius: 15px;
  align-items: center;
`

const Label= styled.label`
  display: flex;
  padding: 5px;
  color: white;
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
      <Container>
        <Form onSubmit={(e)=> this.handleSubmit(e)}>
          <Label>
            Body:
            <Textarea
              value={ body }
              onChange={ (e)=> this.handleChange(e) }/>
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

function mapStateToProps({ posts }, props) {
  const { pid }= props.match.params
  return {
    posts,
    pid,
  }
}
export default connect(mapStateToProps)(EditPost)
