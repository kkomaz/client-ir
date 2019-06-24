import {
  REQUEST_CREATE_FILE,
  CREATE_FILE_SUCCESS,
  CREATE_FILE_FAIL,
} from '..'
import File from 'models/file'

const createFile = (name, blob) => (
  async (dispatch) => {
    dispatch({ type: REQUEST_CREATE_FILE })

    try {
      const file = new File({
        name,
        blob,
      })
      await file.save()

      dispatch({
        type: CREATE_FILE_SUCCESS,
        payload: {
          file,
        }
      })
    } catch (error) {
      dispatch({
        type: CREATE_FILE_FAIL,
        error
      })
    }
  }
)

export default createFile
