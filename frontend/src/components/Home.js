import React, { Component } from 'react'
import Category from './Category'
import { connect } from 'react-redux';
import styled, { css } from 'styled-components'

const Container= styled.div`
  background: rgb(2, 150, 156);
  display: flex;
  flex-direction: column;
  align-items: center;
`

class Home extends Component {

  render() {
    const { categories } = this.props
    return (
      <Container>
      { Object.keys(categories).map((category)=> {
        return(
          <Category
            key={categories[category].name}
            name={categories[category].name}
            path={categories[category].path}
          />
        )
      })
     }
      </Container>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories,
  }
}
export default connect(mapStateToProps)(Home)
