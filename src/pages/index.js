/** @jsx jsx */
import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
} from 'antd'
import { saveAs } from 'file-saver'
import placeholder from 'assets/placeholder.png'

const { Dragger } = Upload;
const { Title } = Typography

function Home() {
  const [files, setFiles] = useState([])
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [currentFile, setCurrentFile] = useState('')
  const dispatch = useDispatch()

  const createFileLoading = useSelector(state => state.file.createFileLoading)

  const saveToGaia = useCallback(
    () => {
      let blowLq

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
            blob: currentFile,
            blob_low_quality: blowLq,
            max_height: height,
            max_width: width,
          }

          return dispatch(
            createFile(params)
          )
        }
      )
    }, [dispatch, files, currentFile, height, width]
  )

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
      },
      'base64'
    );
  }

  const replaceFile = (file) => {
    setFiles([file])
    return false
  }

  const onWidthChange = (value) => {
    setWidth(value)
  }

  const onHeightChange = (value) => {
    setHeight(value)
  }

  const removeImage = () => {
    setCurrentFile('')
    setHeight(0)
    setWidth(0)
    setFiles([])
  }

  const saveLocally = () => {
    saveAs(currentFile, files[0].name)
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
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single upload. Image will be converted to jpeg, png, or webp
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
                onClick={saveToGaia}
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
    </div>
  )
}

export default Home
