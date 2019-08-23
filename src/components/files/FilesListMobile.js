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

function FilesListMobile(props) {
  const { files } = props
  const dispatch = useDispatch()
  const blobs = useSelector(state => state.file.blobs)
  const userContext = useContext(UserContext)
  const { userSession } = userContext.state.sessionUser

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
      title: 'Actions',
      align: 'center',
      dataIndex: 'actions',
      key: 'actions',
      render: file => (
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <Button
            onClick={() => showDeleteConfirm(file)}
            css={css`
              font-size: 11px;
              margin-bottom: 5px;
            `}
            type="danger"
          >
            Delete
          </Button>
          <Button
            css={css`
              font-size: 11px;
            `}
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

FilesListMobile.propTypes = {
  files: PropTypes.array.isRequired,
}

export default FilesListMobile
