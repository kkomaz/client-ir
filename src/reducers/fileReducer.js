import {
  APPEND_FILE_BLOB_SUCCESS,
  REQUEST_CREATE_FILE,
  CREATE_FILE_FAIL,
  CREATE_FILE_SUCCESS,
  DELETE_FILE_SUCCESS,
  FETCH_FILES_SUCCESS,
} from 'actions'
import { removeObjFromList } from 'reducers/utils'
import openNotificationWithIcon from 'utils/notification/openNotificationWithIcon'

const defaultState = {
  blobs: {},
  list: [],
  createFileLoading: false,
}

export default function viewReducer(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_CREATE_FILE: {
      return { ...state, createFileLoading: true }
    }
    case CREATE_FILE_FAIL: {
      return state
    }
    case CREATE_FILE_SUCCESS: {
      openNotificationWithIcon('success', 'File Saved', 'File Successfully Saved')
      return {
        ...state,
        list: [...state.list, action.payload.file],
        createFileLoading: false,
      }
    }
    case DELETE_FILE_SUCCESS: {
      openNotificationWithIcon('success', 'File Deleted', 'File Successfully Deleted')
      return { ...state, list: removeObjFromList(state.list, action.payload) };
    }
    case FETCH_FILES_SUCCESS: {
      return { ...state, list: action.payload.files }
    }
    case APPEND_FILE_BLOB_SUCCESS: {
      const { blobs } = action.payload
      return { ...state, blobs } // Need to fix this later
    }
    default:
      return state
  }
}
