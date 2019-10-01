export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'

const postsModule= require('../api-server/posts')
const { add }= postsModule

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

export function handleAddPost({post}) {
  return dispatch => {
    return add(undefined,post)
    .then(post=> {
    dispatch(addPost(post))
    })
  }
}
