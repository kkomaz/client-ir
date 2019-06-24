import { REQUEST_CREATE_FILE } from '..'

const requestCreateFile = (name, blob) => {
  const params = {
    type: REQUEST_CREATE_FILE,
    payload: {
      name,
      blob,
    }
  }

  return params
}

export default requestCreateFile
