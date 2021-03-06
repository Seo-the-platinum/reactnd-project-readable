import { RECEIVE_COMMENTS, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../actions/comments'

export default function comments(state={}, action) {
  switch(action.type) {
    case RECEIVE_COMMENTS:
      return {
       ...state,
       ...action.comments
     }
     case ADD_COMMENT:
       return {
         ...state,
         [action.comment.id]: action.comment,
       }
    case EDIT_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment,
      }
    case DELETE_COMMENT:
      return {
        ...state,
      }
    default:
      return state
  }
}
