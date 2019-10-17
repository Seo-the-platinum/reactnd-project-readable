import React, { Component } from 'react'
import Post from './Post'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'


const Container= styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-bottom: 5px;
  background: rgb(2, 150, 156);
  max-height: 33%;

`

const ButtonContainer= styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 5px;
`

const Button= styled.button`
  border: none;
  padding: 0;
  background: 0;
  color: white;
`

const Header= styled.div`
  color: white;
  width: 15%;
  text-align: center;
  font-size: 18px;
  background: rgb(2, 150, 156);
  margin-top: 5px;
`
const StyledLink= styled(Link)`
  background: rgb(2, 150, 156);
  color: white;
  margin: 1px;
  text-decoration: none;
`
class Category extends Component {
  state= {
    byScore:true,

  }

  toggle=()=> {
    if( this.state.byScore) {
    this.setState(currState=> ({
      currState,
      byScore: false,
    }))
  } else {
    this.setState(currState=> ({
      currState,
      byScore: true,
    }))
  }
  }

  capitaliseCategory=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  render() {

    const { name, posts }= this.props
    const { byScore }= this.state

    const postIndexes= Object.keys(posts).filter((p)=> {
      return (
        posts[p].category === name && posts[p].deleted !== true
      )
    })

    return (
      <Container>
        <Header>
          { this.capitaliseCategory(name) }
        </Header>
        <ButtonContainer>
          <Button onClick={ this.toggle }>
          { byScore ? 'Filter by Time' : 'Filter by Score' }
          </Button>
          <StyledLink to={`/categoryview/${this.props.path}`}>
              View Category
          </StyledLink>
          <StyledLink to={`/add/${ name }`}>
            Add Post
          </StyledLink>
        </ButtonContainer>
        <div>
          { byScore ?
            postIndexes.sort(function(a,b) {
              return posts[b].voteScore -posts[a].voteScore
            }).map((index)=> {
              const postId= posts[index].id
                return <Post key={ postId } data={ posts[index] } />
            })  :
            postIndexes.sort(function(a,b) {
              return posts[b].timestamp -posts[a].timestamp
            }).map((index)=> {
                const postId= posts[index].id
                return <Post key={ postId } data={ posts[index]} />
            })}
        </div>

      </Container>
    )
  }
}

function mapStateToProps({ posts }, props) {
  return {
    posts,
  }
}
export default connect(mapStateToProps)(Category)
