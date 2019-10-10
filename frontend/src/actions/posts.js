export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST= 'EDIT_POST'

const postsModule= require('../api-server/posts')
const { add, edit }= postsModule

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

function addPost(post) {
  return {
    type: ADD_POST,
    post,
  }
}

function editPost(post) {
  return{
    type: EDIT_POST,
    post,
  }
}

export function handleAddPost({post}) {
  return dispatch => {
    return add(undefined,post)
    .then(post=> {
    dispatch(addPost(post))
    })
  }
}

export function handleEditPost({post}) {
  return dispatch => {
    return edit(undefined, post.id, post)
    .then(post=> {
      dispatch(editPost(post))
    })
  }
}
