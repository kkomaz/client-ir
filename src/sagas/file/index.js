import {
  REQUEST_CREATE_FILE,
} from 'actions'
import { takeLatest } from 'redux-saga/effects'

import createFile from './createFile'

export default function* fileSaga() {
  yield [
    takeLatest(REQUEST_CREATE_FILE, createFile)
  ]
}
