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

const { confirm } = Modal

function FilesList(props) {
  const { files } = props
  const dispatch = useDispatch()
  const blobs = useSelector(state => state.file.blobs)
  const userContext = useContext(UserContext)
  const { userSession } = userContext.state.sessionUser

  const saveLocally = (file) => {
    saveAs(file.attrs.blob, file.attrs.name)
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
      render: text => <p className="small">{text}</p>
    },
    {
      align: 'center',
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: file => (
        <div
          className={`file-${file._id}`}
          alt="resize"
          css={css`
            background-image: url("${file.attrs.blob_lq}");
            width: 100px;
            height: 100px;
          `}
        >
          <img
            css={css`
              width: 100px;
              height: 100px;
            `}
            src={blobs[file.attrs.blob_id]}
            alt=""
          />
        </div>
      )
    },
    {
      align: 'center',
      title: 'Width',
      dataIndex: 'width',
      key: 'width',
      render: width => {
        const text = width ? `${width}px` : '-'
        return <p className="small">{text}</p>;
      },
    },
    {
      align: 'center',
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
      render: height => {
        const text = height ? `${height}px` : '-'
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
    name: file.attrs.name,
    image: file,
    height: file.attrs.new_height,
    width: file.attrs.new_width,
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
