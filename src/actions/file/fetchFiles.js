import File from 'models/file'

const fetchFiles = () => (
  async (dispatch) => {
    const result = await File.fetchList()
    dispatch({
      type: 'FETCH_FILES',
      payload: result
    })
  }
)

export default fetchFiles
