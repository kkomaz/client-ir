import { put, call } from 'redux-saga/effects'
import {
  CREATE_FILE_SUCCESS,
  CREATE_FILE_FAIL,
} from 'actions'
import File from 'models/file'

const createFile = async (action) => {
  const { name, blob } = action.payload

  const file = new File({ name, blob })
  await file.save()

  return file
}

function* createFileSaga(action) {
  try {
    const file = yield call(createFile, action)
    yield put({ type: CREATE_FILE_SUCCESS, payload: file })
  } catch (error) {
    yield put({ type: CREATE_FILE_FAIL, error })
  }
}

export default createFileSaga
