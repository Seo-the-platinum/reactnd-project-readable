import React, { Component } from 'react'

class AddorCreate extends Component {
  render() {
    return (
      <div>
        <header>
        Add Post
        </header>
        <form>
          <label>
           Choose your category
            <select>
              <option value='react'>React</option>
              <option value='redux'>Redux</option>
              <option value='udacity'>udacity</option>
            </select>
          </label>
          <label>
          Post title
          <input
            type='text'
            placeholder='Post title'
          />
          </label>
          <label>
            Post body
            <input
              type='text'
              placeholder='body...'
            />
          </label>
          <label>
            <input
              type='submit'
              value='submit'
            />
          </label>
        </form>
      </div>
    )
  }
}

export default AddorCreate
