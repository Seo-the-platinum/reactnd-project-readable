import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css} from 'styled-components'

const Container= styled.div`
  background: rgb(15, 212, 136);
  height: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 15px;
`


class NavBar extends Component {
  render(){
    return(
      <Container>
        <NavLink to='/'
          style={{
            textDecoration: 'none',
            color: 'white',
            }}>
            Home
        </NavLink>
      </Container>
    )
  }
}

export default NavBar
