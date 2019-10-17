import { RECEIVE_POSTS, ADD_POST, EDIT_POST, DELETE_POST, VOTE_POST } from '../actions/posts'

export default function posts(state={}, action) {
  switch(action.type) {
    case RECEIVE_POSTS:
      return  {
        ...action.posts,
      }
    case ADD_POST:
      return {
        ...state,
        [action.post.id] : action.post,
      }
    case EDIT_POST:
      return {
        ...state,
        [action.post.id]: action.post,
      }
    
    default:
    return state
  }
}
