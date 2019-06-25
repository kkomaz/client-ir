import {
  REQUEST_DELETE_FILE,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAIL,
} from '..'

const deleteFile = file => (
  async (dispatch) => {
    dispatch({ type: REQUEST_DELETE_FILE })

    try {
      await file.destroy()

      dispatch({
        type: DELETE_FILE_SUCCESS,
        payload: {
          _id: file._id,
        },
      })
    } catch (error) {
      dispatch({
        type: DELETE_FILE_FAIL,
        error,
      })
    }
  }
)

export default deleteFile
