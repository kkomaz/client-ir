import {
  CREATE_FILE_SUCCESS,
} from 'actions'

const defaultState = {
  list: [],
}

export default function viewReducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_FILE_SUCCESS: {
      return { ...state, list: [...state.files, action.payload.file] }
    }
    default:
      return state
  }
}
