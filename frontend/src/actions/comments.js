export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT= 'EDIT_COMMENT'
export const DELETE_COMMENT= 'DELETE_COMMENT'
export const VOTE_COMMENT= 'VOTE_COMMENT'

const commentModule= require('../api-server/comments')
const { add, edit, disableByParent, disable, vote }= commentModule

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

function voteComment(comment) {
  return {
    type: VOTE_COMMENT,
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

export function handleCommentVote({comment}, option) {
  return dispatch => {
    return vote (undefined, comment.id, option)
    .then((comment)=> {
      dispatch(voteComment(comment))
    })
  }
}
