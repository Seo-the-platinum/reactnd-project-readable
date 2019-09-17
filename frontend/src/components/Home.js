import React, { Component } from 'react'
//import Category from './Category'
import { connect } from 'react-redux'

class Home extends Component {
  render() {
  console.log(this.props.categories)
    return (
      <div>
      <button>
        filter btn
      </button>

      </div>
    )
  }
}

function mapStateToProps({ categories}) {
  return {
    categories,
  }
}
export default connect(mapStateToProps)(Home)
