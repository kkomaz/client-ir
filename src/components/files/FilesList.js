/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import _ from 'lodash'
import { useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFiles, deleteFile } from 'actions/file'
import { createSelector } from 'reselect'
import {
  Button,
  Table,
  Modal,
} from 'antd'
import { saveAs } from 'file-saver'

const { confirm } = Modal

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

  const requestDeleteFile = useCallback(
    file => {
      return dispatch(
        deleteFile(file)
      )
    }, [dispatch]
  )

  const files = useSelector(state => selectFiles(state))

  const showDeleteConfirm = (file) => {
    confirm({
      title: 'Are you sure you want to delete this image?',
      content: 'Deleting this image will remove it from your storage permanently',
      okType: 'danger',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        requestDeleteFile(file)
      }
    })
  }

  const columns = [
    {
      align: 'center',
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <p>{text}</p>
    },
    {
      align: 'center',
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: file => (
        <img
          src={file.attrs.blob}
          alt="resize"
          css={css`
            background: url("${file.attrs.blob_low_quality}"));
            background-repeat: no-repeat, no-repeat;
            width: 100px;
            height: 100px;
          `}
        />
      )
    },
    {
      align: 'center',
      title: 'Max Width',
      dataIndex: 'max_width',
      key: 'max_height',
      render: width => <p>{`${width}px`}</p>
    },
    {
      align: 'center',
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
            onClick={() => showDeleteConfirm(file)}
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
    image: file,
    max_height: file.attrs.max_height,
    max_width: file.attrs.max_width,
    actions: file,
  }))

  console.log(files)

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
