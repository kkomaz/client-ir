import File from 'models/file'
import {
  REQUEST_CREATE_FILE,
  CREATE_FILE_SUCCESS,
  CREATE_FILE_FAIL,
} from '..'

const createFile = (params, openNotificationWithIcon) => (
  async (dispatch) => {
    dispatch({ type: REQUEST_CREATE_FILE })

    try {
      const file = new File(params)
      await file.save()

      dispatch({
        type: CREATE_FILE_SUCCESS,
        payload: {
          file,
        },
        openNotificationWithIcon,
      })
    } catch (error) {
      dispatch({
        type: CREATE_FILE_FAIL,
        error,
        openNotificationWithIcon
      })
    }
  }
)

export default createFile
