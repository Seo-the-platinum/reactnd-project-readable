export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT= 'EDIT_COMMENT'
export const DELETE_COMMENT= 'DELETE_COMMENT'

const commentModule= require('../api-server/comments')
const { add, edit, disableByParent, disable }= commentModule
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

function deleteComment(comment) {
  return {
    type: DELETE_COMMENT,
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

export function handleDeleteComment ({comment}) {
  return dispatch => {
    return disable(undefined, comment.id)
    .then(comment=> {
      dispatch(deleteComment(comment.id))
    })
  }
}
export function handleParentDeleted({post}) {
  return dispatch => {
    return disableByParent(undefined, post)
  }
}
