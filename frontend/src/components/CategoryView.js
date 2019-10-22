import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const Container= styled.div`
  background: rgb(2, 150, 156);
  display: flex;
  flex-direction: column;
  align-items: center;

`
const Header= styled.h1`
  color: white;
`

const Button= styled.button`
  border: none;
  padding: 0;
  background: 0;
  color: white;
`
const PostContainer= styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
class CategoryView extends Component {

  capitaliseCategory=(path)=> {
    return path.charAt(0).toUpperCase() + path.slice(1)
  }
  render() {
    const { path, posts }= this.props

    const postIndexes= Object.keys(posts).filter((p)=> {
      return (
        posts[p].category === path && posts[p].deleted !== true
      )
    })

    return (
      <Container>
        <Header>
          { this.capitaliseCategory(path) }
        </Header>
        <Button>
          Filter Posts
        </Button>
        <div>
          { postIndexes.map((index)=> {
            const postId= posts[index].id
             return (
               <PostContainer key={postId}>
                <Post key={postId} data={posts[index]}/>
                <Link to={{
                  pathname: `/postview/${posts[index].id}`,
                  state: { index: index}}
                  }>
                <Button>View Post</Button>
                </Link>
               </PostContainer>
             )
           })}
        </div>
      </Container>
    )
  }
}
function mapStateToProps({ categories, posts }, props) {
  const { path }= props.match.params
  console.log(path)
  return {
    path,
    categories,
    posts,
  }
}
export default connect(mapStateToProps)(CategoryView)
