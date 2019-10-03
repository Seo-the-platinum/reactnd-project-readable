export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'

const commentModule= require('../api-server/comments')
const { add }= commentModule
export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  }
}

function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function handleAddComment({comment}) {
  console.log(comment)
  return dispatch => {
    return add(undefined, comment)
    .then(comment=> {
      console.log(comment)
      dispatch(addComment(comment))
    })
  }
}
