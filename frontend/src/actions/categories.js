export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'

export function receiveCategories ({categories}) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  }

}
