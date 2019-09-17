import { receiveCategories } from './categories'
import { receivePosts } from './posts'
import { receiveComments } from './comments'

const categoriesModule= require('../api-server/categories')
const postsModule= require('../api-server/posts')
const commentsModule= require('../api-server/comments')

export default function handleInitialData() {
  return (dispatch)=> {
    return Promise.all([categoriesModule.getAll(), postsModule.getAll(),commentsModule.getData()])
    .then((values)=> {
      console.log(values[0])
      dispatch(receiveCategories(values[0]))
      dispatch(receivePosts(values[1]))
      dispatch(receiveComments(values[2]))

    })
  }
}
