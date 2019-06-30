import File from 'models/file'
import appendFileBlob from './appendFileBlob'
import {
  REQUEST_FETCH_FILES,
  FETCH_FILES_SUCCESS,
  FETCH_FILES_FAIL,
} from '..'

const fetchFiles = userSession => (
  async (dispatch) => {
    dispatch({ type: REQUEST_FETCH_FILES })

    try {
      const result = await File.fetchOwnList({
        omit: 'blob'
      })

      appendFileBlob(result, userSession, dispatch)

      dispatch({
        type: FETCH_FILES_SUCCESS,
        payload: {
          files: result
        },
      })
    } catch (error) {
      dispatch({
        type: FETCH_FILES_FAIL,
        error,
      })
    }
  }
)

export default fetchFiles
