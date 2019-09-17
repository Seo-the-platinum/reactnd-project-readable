export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'

export function receiveCategories ({categories}) {
  console.log(categories)
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  }

}
