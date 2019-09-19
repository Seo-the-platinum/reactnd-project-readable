import React, { Component } from 'react'
import Category from './Category'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Home extends Component {

  render() {
    const { categories } = this.props
    return (
      <div>
      <Link to={'/add'}>
      <button>
        Add Post
      </button>
      </Link>
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
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories,
  }
}
export default connect(mapStateToProps)(Home)
