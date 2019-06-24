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
  const [currentFile, setCurrentFile] = useState('')

  const fileChangedHandler = async () => {
    const convertedFile = files[0].originFileObj
    Resizer.imageFileResizer(
      convertedFile,
      300,
      300,
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
                Support for a single or bulk upload. Strictly prohibit from uploading company
                data or other band files
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
                css={css`
                  margin: 0 0.5em;
                `}
              />
              <Button onClick={fileChangedHandler}>
                Resize it
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
              `}
            >
              <Title level={4}>Image Preview</Title>
              <img
                css={theme => css`
                  border: 1px dashed ${theme.colors.primary};
                  `}
                src={_.isEmpty(currentFile) ? placeholder : currentFile}
                alt="preview"
              />
            </div>
          </Col>

          <Col span={12}>
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
