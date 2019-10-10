export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT= 'EDIT_COMMENT'

const commentModule= require('../api-server/comments')
const { add, edit }= commentModule
export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  }
}

function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment,
  }
}

export function handleAddComment({comment}) {
  return dispatch => {
    return add(undefined, comment)
    .then(comment=> {
      dispatch(addComment(comment))
    })
  }
}

export function handleEditComment ({comment}) {
  return dispatch => {
    return edit(undefined, comment.id, comment)
    .then(comment=> {
      dispatch(editComment(comment))
    })
  }
}
