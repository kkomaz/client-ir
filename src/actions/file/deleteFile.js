import { getBlobUrl } from 'utils/file'
import {
  REQUEST_DELETE_FILE,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAIL,
} from '..'

const deleteFile = (file, userSession) => (
  async (dispatch) => {
    const { blob_id } = file.attrs

    dispatch({ type: REQUEST_DELETE_FILE })

    try {
      await file.destroy()

      await userSession.deleteFile(getBlobUrl(blob_id))

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
