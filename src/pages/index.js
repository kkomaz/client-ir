/** @jsx jsx */
import { useState, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createFile } from 'actions/file'
import { jsx, css } from '@emotion/core'
import _ from 'lodash'
import Resizer from 'react-image-file-resizer'
import {
  Button,
  Card,
  Col,
  Icon,
  InputNumber,
  Row,
  Typography,
  Upload,
  Modal,
} from 'antd'
import { saveAs } from 'file-saver'
import placeholder from 'assets/placeholder.png'
import { dataUrlToFile, getBlobUrl } from 'utils/file'
import { UserContext } from 'components/UserProvider'
import generateUUID from 'utils/generateUUID'

const { Dragger } = Upload;
const { Title } = Typography

function Home(props) {
  const { currentFiles } = props
  const [files, setFiles] = useState([])
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [newWidth, setNewWidth] = useState(0)
  const [newHeight, setNewHeight] = useState(0)
  const [currentFile, setCurrentFile] = useState('')
  const [visible, setVisible] = useState(false)
  const [createFileLoading, setCreateFileLoading] = useState(false)
  const dispatch = useDispatch()
  const userContext = useContext(UserContext)
  const { ezUser } = userContext.state.sessionUser
  const { userSession } = userContext.state.sessionUser

  const saveToGaia = useCallback(
    async () => {
      let blowLq

      const blobId = generateUUID()
      const options = { encrypt: true }

      await userSession.putFile(getBlobUrl(blobId), JSON.stringify({
        _id: blobId,
        blob: currentFile
      }), options)

      Resizer.imageFileResizer(
        files[0],
        100,
        100,
        'JPEG',
        30,
        0,
        (uri) => {
          blowLq = uri
          const params = {
            name: files[0].name,
            blob_id: blobId,
            blob_lq: blowLq,
            max_height: height,
            max_width: width,
            new_height: newHeight,
            new_width: newWidth,
          }

          return dispatch(
            createFile(params, currentFile)
          ).then(() => {
            setCreateFileLoading(false)
          })
        }
      )
    }, [dispatch, files, currentFile, height, width, newHeight, newWidth, userSession]
  )

  const checkStatus = () => {
    if (currentFiles.length === 5 && !ezUser.attrs.premium) {
      setVisible(true)
      return null
    }

    setCreateFileLoading(true)

    return saveToGaia()
  }

  const setNewDimension = (uri) => {
    const file = dataUrlToFile(uri, 'sample.txt')
    const fr = new FileReader // eslint-disable-line

    fr.onload = () => {
      const img = new Image // eslint-disable-line

      img.onload = () => {
        setNewWidth(img.width)
        setNewHeight(img.height)
      };

      img.src = fr.result;
    };

    fr.readAsDataURL(file);
  }

  const fileChangedHandler = async () => {
    const convertedFile = files[0]

    Resizer.imageFileResizer(
      convertedFile,
      height,
      width,
      'JPEG',
      100,
      0,
      (uri) => {
        setCurrentFile(uri)
        setNewDimension(uri)
      },
      'base64'
    );
  }

  const removeImage = () => {
    setCurrentFile('')
    setHeight(0)
    setNewHeight(0)
    setWidth(0)
    setNewWidth(0)
    setFiles([])
  }

  const replaceFile = (file) => {
    if (currentFile) {
      removeImage()
    }
    setFiles([file])
    return false
  }

  const onWidthChange = (value) => {
    setWidth(value)
  }

  const onHeightChange = (value) => {
    setHeight(value)
  }

  const saveLocally = () => {
    saveAs(currentFile, files[0].name)
  }

  const handleClose = () => {
    setVisible(false)
  }

  const openSurvey = () => {
    const win = window.open('https://forms.gle/4zG3Gqt4Cn1eVeNJ8', '_blank'); /* eslint-disable-line */
    win.focus();
  }


  return (
    <div>
      <Card>
        <Row
          css={css`
            margin-bottom: 2em;
          `}
        >
          <Col span={24}>
            <Dragger
              name="file"
              customRequest={data => (
                setTimeout(() => {
                  data.onSuccess('ok')
                }, 0)
              )}
              multiple={false}
              beforeUpload={replaceFile}
              fileList={files}
              accept=".jpeg, .png, .webp"
              disabled={createFileLoading}
              onRemove={removeImage}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to resize your image (jpg, png, webp)</p>
              <p className="ant-upload-hint">
                Support for a single upload.
              </p>
              <p className="ant-upload-hint">
                Image size might not match the max width/height to preserve image ratio quality.
              </p>
            </Dragger>
          </Col>
        </Row>

        <Row
          css={css`
            margin-bottom: 2em;
          `}
        >
          <Col span={24}>
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
                align-items: center;
              `}
            >
              <span>
                max-width:
              </span>
              <InputNumber
                min={0}
                onChange={onWidthChange}
                css={css`
                  margin: 0 0.5em;
                `}
                value={width}
              />

              <span
                css={css`
                  margin-right: 0.5em;
                `}
              >
                x
              </span>

              <span>
                max-height:
              </span>
              <InputNumber
                min={0}
                onChange={onHeightChange}
                css={css`
                  margin: 0 0.5em;
                `}
                value={height}
              />
              <Button
                onClick={fileChangedHandler}
                disabled={
                  files.length === 0 ||
                  _.isEqual(0, width) ||
                  _.isEqual(0, height) ||
                  createFileLoading
                }
              >
                Rescale
              </Button>
            </div>
          </Col>
        </Row>
        <Row
          css={css`
            margin-bottom: 2em;
          `}
        >
          <Col span={24}>
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
              `}
            >
              <Title level={4}>Image Preview</Title>
              <div
                css={css`
                  max-height: 400px;
                  overflow: auto;
                `}
              >
                <img
                  css={theme => css`
                    border: 1px dashed ${theme.colors.primary};
                    width: 100%;
                  `}
                  src={_.isEmpty(currentFile) ? placeholder : currentFile}
                  alt="preview"
                />
              </div>
              {
                !_.isEmpty(currentFile) &&
                <p
                  css={css`
                    text-align: center;
                    margin-top: 1em;
                  `}
                >
                  Scaled Dimensions: {newWidth} x {newHeight}
                </p>
              }
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
              `}
            >
              <Title level={4}>Actions</Title>
              <Button
                loading={createFileLoading}
                onClick={checkStatus}
                type="primary"
                css={css`
                  width: 100%;
                  margin-bottom: 1em;
                `}
                disabled={_.isEmpty(currentFile)}
              >
                Save (Every save will create a new file)
              </Button>
              <Button
                loading={createFileLoading}
                css={css`
                  width: 100%;
                  margin-bottom: 1em;
                `}
                onClick={saveLocally}
                disabled={_.isEmpty(currentFile)}
              >
                Download (Locally)
              </Button>
              <Button
                loading={createFileLoading}
                onClick={removeImage}
                type="danger"
                css={css`
                  width: 100%;
                  margin-bottom: 1em;
                `}
                disabled={_.isEmpty(currentFile)}
              >
                Remove Image
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
      <Modal
        title="Oh No!  Looks like you're at max capacity!"
        visible={visible}
        footer={[
          <Button
            onClick={handleClose}
          >
            Close
          </Button>,
        ]}
      >
        <p>
          Thank you for using EZResize.  Currently, file saving is limited to 5 files.  If you would like to create a new file, please delete an older file by clicking on the <strong>My Files Tab</strong>.
        </p>

        <p>
          Would you consider a premium option with unlimited file storage?
        </p>

        <p>Take a quick survey and let us know!</p>

        <div
          css={css`
            text-align: center;
          `}
        >
          <Button
            type="primary"
            onClick={openSurvey}
          >
            Survey
          </Button>
        </div>
      </Modal>
    </div>
  )
}

Home.propTypes = {
  currentFiles: PropTypes.array.isRequired,
}

export default Home
