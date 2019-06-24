/** @jsx jsx */
import { useState } from 'react'
import { jsx, css } from '@emotion/core'
import Resizer from 'react-image-file-resizer'
import {
  Button,
  Card,
  Icon,
  message,
  Upload,
  Row,
  Col,
} from 'antd'
import placeholder from 'assets/placeholder.png'

const { Dragger } = Upload;

function Home() {
  const [files, setFiles] = useState([])

  const fileChangedHandler = async () => {
    const convertedFile = files[0].originFileObj
    console.log(convertedFile)
    Resizer.imageFileResizer(
      convertedFile,
      300,
      300,
      'JPEG',
      100,
      0,
      uri => {
        console.log(uri)
      },
      'base64'
    );
  }

  console.log(files)

  return (
    <div>
      <Card title="ImageResizer">
        <Row
          css={css`
            margin-bottom: 2em;
          `}
        >
          <Col span={24}>
            <Button onClick={fileChangedHandler}>
              Resize it
            </Button>
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
                  setFiles(info.fileList)
                  message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company
                data or other band files
              </p>
            </Dragger>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <img
              css={theme => css`
                border: 1px dashed ${theme.colors.primary};
              `}
              src={placeholder}
              alt="preview"
            />
          </Col>

          <Col span={12}>
            Actions
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Home
