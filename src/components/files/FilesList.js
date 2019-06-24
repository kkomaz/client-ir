/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFiles } from 'actions/file'
import { createSelector } from 'reselect'
import {
  Table,
} from 'antd'

const makeSelectFiles = () => (
  createSelector(
    state => state.file.list,
    files => files
  )
)

function FilesList(props) {
  const dispatch = useDispatch()

  const startFetchLists = useCallback(
    () => dispatch(
      fetchFiles()
    ), [dispatch]
  )

  useEffect(() => {
    startFetchLists()
  }, [])

  const selectFiles = useMemo(
    makeSelectFiles,
    []
  )

  const files = useSelector(state => selectFiles(state))

  console.log(files)

  return (
    <div>
      Hello Files
    </div>
  )
}

export default FilesList
