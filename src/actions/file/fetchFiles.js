import File from 'models/file'
import {
  REQUEST_FETCH_FILES,
  FETCH_FILES_SUCCESS,
  FETCH_FILES_FAIL,
} from '..'

const fetchFiles = openNotificationWithIcon => (
  async (dispatch) => {
    dispatch({ type: REQUEST_FETCH_FILES })

    try {
      const result = await File.fetchOwnList()
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
        openNotificationWithIcon,
      })
    }
  }
)

export default fetchFiles
