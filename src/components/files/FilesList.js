/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import _ from 'lodash'
import { useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFiles } from 'actions/file'
import { createSelector } from 'reselect'
import {
  Button,
  Table,
} from 'antd'
import { saveAs } from 'file-saver'

const makeSelectFiles = () => (
  createSelector(
    state => state.file.list,
    files => files
  )
)

function FilesList() {
  const dispatch = useDispatch()
  const selectFiles = useMemo(
    makeSelectFiles,
    []
  )

  const startFetchLists = useCallback(
    () => dispatch(
      fetchFiles()
    ), [dispatch]
  )

  useEffect(() => {
    startFetchLists()
  }, [startFetchLists])

  const saveLocally = (file) => {
    saveAs(file.attrs.blob, file.attrs.name)
  }

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
    },
    {
      title: 'Actions',
      align: 'center',
      dataIndex: 'actions',
      key: 'actions',
      render: file => (
        <div>
          <Button
            css={css`
              margin-right: 10px;
            `}
            type="danger"
          >
            Delete
          </Button>
          <Button
            type="primary"
            onClick={() => saveLocally(file)}
          >
            Download
          </Button>
        </div>
      )
    }
  ]

  const data = _.map(files, file => ({
    key: file.attrs._id,
    name: file.attrs.name,
    image: file.attrs.blob,
    max_height: file.attrs.max_height,
    max_width: file.attrs.max_width,
    actions: file,
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
