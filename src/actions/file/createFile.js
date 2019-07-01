import File from 'models/file'
import {
  ADD_BLOB_SUCCESS,
  REQUEST_CREATE_FILE,
  CREATE_FILE_SUCCESS,
  CREATE_FILE_FAIL,
} from '..'

const createFile = params => (
  async (dispatch) => {
    dispatch({ type: REQUEST_CREATE_FILE })

    try {
      const file = new File(params)
      await file.save()

      dispatch({
        type: ADD_BLOB_SUCCESS,
        payload: {
          blob: params.blob,
          blobId: params.blob_id,
        }
      })

      dispatch({
        type: CREATE_FILE_SUCCESS,
        payload: {
          file,
        },
      })
    } catch (error) {
      dispatch({
        type: CREATE_FILE_FAIL,
        error,
      })
    }
  }
)

export default createFile
