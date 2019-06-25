/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import _ from 'lodash'
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <p>{text}</p>
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: blob => (
        <img
          src={blob}
          alt="resize"
          css={css`
            width: 100px;
            height: 100px;
          `}
        />
      )
    },
    {
      title: 'Max Width',
      dataIndex: 'max_width',
      key: 'max_height',
      render: width => <p>{`${width}px`}</p>
    },
    {
      title: 'Max Height',
      dataIndex: 'max_height',
      key: 'max_height',
      render: height => <p>{`${height}px`}</p>
    }
  ]

  const data = _.map(files, file => ({
    key: file.attrs._id,
    name: file.attrs.name,
    image: file.attrs.blob,
    max_height: file.attrs.max_height,
    max_width: file.attrs.max_width,
  }))

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}

export default FilesList
