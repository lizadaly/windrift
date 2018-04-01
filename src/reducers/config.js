import { GET_CONFIG } from '../actions'

const config = (state = {}, action) => {
  switch (action.type) {
    case GET_CONFIG:
      return state
    default:
      return state
  }
}
export default config
