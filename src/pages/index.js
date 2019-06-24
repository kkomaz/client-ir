/** @jsx jsx */
import { useState } from 'react'
import { jsx, css } from '@emotion/core'
import _ from 'lodash'
import Resizer from 'react-image-file-resizer'
import {
  Button,
  Card,
  Col,
  Icon,
  InputNumber,
  message,
  Row,
  Typography,
  Upload,
} from 'antd'
import placeholder from 'assets/placeholder.png'

const { Dragger } = Upload;
const { Title } = Typography

function Home() {
  const [files, setFiles] = useState([])
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [currentFile, setCurrentFile] = useState('')

  const fileChangedHandler = async () => {
    const convertedFile = files[0]
    console.log(height, 'h')
    console.log(width, 'w')
    Resizer.imageFileResizer(
      convertedFile,
      width,
      height,
      'JPEG',
      100,
      0,
      uri => {
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

  console.log(currentFile)

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
              customRequest={(data) => {
                return setTimeout(() => {
                  data.onSuccess('ok')
                }, 0)
              }}
              onChange={(info) => {
                const { status } = info.file;
                if (status !== 'uploading') {
                  console.log('uploading...')
                }
                if (status === 'done') {
                  setCurrentFile('')
                  setFiles([info.file])
                  message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
              multiple={false}
              beforeUpload={replaceFile}
              fileList={files}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single upload. Image will be converted to jpeg
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
                width:
              </span>
              <InputNumber
                min={1}
                onChange={onWidthChange}
                css={css`
                  margin: 0 0.5em;
                `}
              />

              <span
                css={css`
                  margin-right: 0.5em;
                `}
              >
                x
              </span>

              <span>
                height:
              </span>
              <InputNumber
                min={1}
                onChange={onHeightChange}
                css={css`
                  margin: 0 0.5em;
                `}
              />
              <Button
                onClick={fileChangedHandler}
                disabled={files.length === 0 || _.isEqual(0, width) || _.isEqual(0, height)}
              >
                Resize it
              </Button>
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
                css={css`
                  width: 100%;
                  margin-bottom: 1em;
                `}
              >
                Save
              </Button>
              <Button
                css={css`
                  width: 100%;
                  margin-bottom: 1em;
                `}
              >
                Download (Locally)
              </Button>
              <Button
                css={css`
                  width: 100%;
                  margin-bottom: 1em;
                `}
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
