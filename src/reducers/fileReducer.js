import {
  REQUEST_CREATE_FILE,
  CREATE_FILE_FAIL,
  CREATE_FILE_SUCCESS,
} from 'actions'

const defaultState = {
  list: [],
}

export default function viewReducer(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_CREATE_FILE: {
      return state;
    }
    case CREATE_FILE_FAIL: {
      return state
    }
    case CREATE_FILE_SUCCESS: {
      action.openNotificationWithIcon('success', 'File Saved', 'File Successfully Saved')
      return { ...state, list: [...state.list, action.payload.file] }
    }
    default:
      return state
  }
}
