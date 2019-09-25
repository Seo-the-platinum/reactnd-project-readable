import React, { Component } from 'react'
import Category from './Category'
import { connect } from 'react-redux';

class Home extends Component {

  render() {
    const { categories } = this.props
    return (
      <div>

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
