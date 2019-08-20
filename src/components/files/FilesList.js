/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useCallback, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFile } from 'actions/file'
import {
  Button,
  Table,
  Modal,
} from 'antd'
import { saveAs } from 'file-saver'
import { UserContext } from 'components/UserProvider'
import { List } from 'react-content-loader'

const { confirm } = Modal

function FilesList(props) {
  const { files } = props
  const dispatch = useDispatch()
  const blobs = useSelector(state => state.file.blobs)
  const userContext = useContext(UserContext)
  const { userSession } = userContext.state.sessionUser

  console.log(blobs);

  const saveLocally = (file) => {
    saveAs(blobs[file.attrs.blob_id], file.attrs.name)
  }

  const requestDeleteFile = useCallback(
    file => {
      return dispatch(
        deleteFile(file, userSession)
      )
    }, [dispatch, userSession]
  )

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
      render: (file) => {
        const name = _.get(blobs[file.attrs.blob_id], 'name', '-')
        const src = _.get(blobs[file.attrs.blob_id], 'blob', '')

        if (_.isEmpty(src)) {
          return <List />
        }

        return (
          <p className="small">
            {name}
          </p>
        )
      }
    },
    {
      align: 'center',
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: file => {
        const src = _.get(blobs[file.attrs.blob_id], 'blob', '')

        if (_.isEmpty(src)) {
          return <List />
        }

        return (
          <div
            className={`file-${file._id}`}
            alt="resize"
          >
            <img
              css={css`
                width: 100px;
                height: 100px;
              `}
              src={_.get(blobs[file.attrs.blob_id], 'blob', '')}
              alt=""
            />
          </div>
        )
      }
    },
    {
      align: 'center',
      title: 'Width',
      dataIndex: 'width',
      key: 'width',
      render: file => {
        const newWidth = _.get(blobs[file.attrs.blob_id], 'new_width', '')
        const src = _.get(blobs[file.attrs.blob_id], 'blob', '')

        if (_.isEmpty(src)) {
          return <List />
        }

        const text = newWidth ? `${newWidth}px` : '-'
        return <p className="small">{text}</p>;
      },
    },
    {
      align: 'center',
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
      render: file => {
        const newHeight = _.get(blobs[file.attrs.blob_id], 'new_height', '')
        const src = _.get(blobs[file.attrs.blob_id], 'blob', '')

        if (_.isEmpty(src)) {
          return <List />
        }
        const text = newHeight ? `${newHeight}px` : '-'
        return <p className="small">{text}</p>;
      },
    },
    {
      title: 'Actions',
      align: 'center',
      dataIndex: 'actions',
      key: 'actions',
      render: file => (
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
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
    name: file,
    image: file,
    height: file,
    width: file,
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

FilesList.propTypes = {
  files: PropTypes.array.isRequired,
}

export default FilesList
