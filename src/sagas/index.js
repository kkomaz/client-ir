import { fork } from 'redux-saga/effects'
import fileSaga from 'sagas/file'

export default function* rootSaga() {
  yield [
    fork(fileSaga)
  ]
}
