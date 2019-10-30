import React, { Component } from 'react'
import Post from './Post'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'


const Container= styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-top: 5px;
  margin-bottom: 5px;
  background: rgb(2, 150, 156);
  max-height: 33%;
  border: solid 2px white;
  border-radius: 15px;
  box-shadow: 3px 3px #023133;

`
const LinkDiv= styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  margin-left: 10px;
`
const ButtonContainer= styled.div`
  display: flex;
  width: 100%;
  margin: 5px;
  justify-content: space-around;
`

const Button= styled.button`
  border: none;
  padding: 0;
  background: 0;
  color: white;
`

const Header= styled.h1`
  color: white;
  width: 15%;
  text-align: center;
  font-size: 18px;
  background: rgb(2, 150, 156);
  margin-top: 10px;
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
        <LinkDiv>
          <Button onClick={ this.toggle }>
          { byScore ? 'Filter by Time' : 'Filter by Score' }
          </Button>
        </LinkDiv>
        <ButtonContainer>
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
