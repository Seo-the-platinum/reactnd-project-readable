import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleEditComment } from '../actions/comments'
import styled from 'styled-components'

const Container= styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
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
      <Container>
        <Form onSubmit={(e)=> this.handleSubmit(e)}>
          <Label>
            Body
            <Textarea
              value={ body }
              onChange={ (e)=> this.handleChange(e)}
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

function mapStateToProps({ comments }, props) {
  const { id }= props.match.params
  return {
    comments,
    id,
  }
}
export default connect(mapStateToProps)(EditComment)
