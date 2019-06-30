import _ from 'lodash'
import { getBlobUrl } from 'utils/file'
import {
  APPEND_FILE_BLOB_SUCCESS,
  APPEND_FILE_BLOB_FAIL,
} from '..'

const appendFileBlob = async (result, userSession, dispatch) => {
  const blobs = []
  const parsedBlobs = {}
  const options = { decrypt: true }

  try {
    for (let i = 0; i < result.length; i += 1) {
      const blob = userSession.getFile(getBlobUrl(result[i].attrs.blob_id), options)
      blobs.push(blob)
    }

    const fetchedBlobs = await Promise.all(blobs)

    _.each(fetchedBlobs, (b) => {
      const parsedBlob = JSON.parse(b)
      parsedBlobs[parsedBlob._id] = parsedBlob.blob
    })

    dispatch({
      type: APPEND_FILE_BLOB_SUCCESS,
      payload: {
        blobs: parsedBlobs
      }
    })
  } catch (error) {
    dispatch({
      type: APPEND_FILE_BLOB_FAIL,
      error
    })
  }
}

export default appendFileBlob
