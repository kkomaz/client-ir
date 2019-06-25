import {
  REQUEST_CREATE_FILE,
  CREATE_FILE_FAIL,
  CREATE_FILE_SUCCESS,
  DELETE_FILE_SUCCESS,
  FETCH_FILES_SUCCESS,
} from 'actions'
import { removeObjFromList } from 'reducers/utils'
import openNotificationWithIcon from 'utils/notification/openNotificationWithIcon'

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
      openNotificationWithIcon('success', 'File Saved', 'File Successfully Saved')
      return { ...state, list: [...state.list, action.payload.file] }
    }
    case DELETE_FILE_SUCCESS: {
      openNotificationWithIcon('success', 'File Deleted', 'File Successfully Deleted')
      return { ...state, list: removeObjFromList(state.list, action.payload) };
    }
    case FETCH_FILES_SUCCESS: {
      return { ...state, list: action.payload.files }
    }
    default:
      return state
  }
}
