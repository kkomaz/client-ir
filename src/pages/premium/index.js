/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
} from 'antd'
import {
  ProductCheck,
  ProductHeader
} from 'components/Product'

function Premium() {
  return (
    <div>
      <Row gutter={16}>
        <Col
          css={css`
            margin-bottom: 10px;
          `}
          xs={24}
          md={12}
        >
          <Card>
            <ProductHeader
              title="EZResize Free"
              price="$0.00"
            />
            <ProductCheck text="Unlimited file uploads (5)" disabled />

            <ProductCheck text="File compression" disabled />

            <Divider />

            <div
              css={css`
                text-align: center;
              `}
            >
              <Button type="primary">
                Get Free
              </Button>
            </div>
          </Card>
        </Col>

        <Col
          css={css`
            margin-bottom: 10px;
          `}
          xs={24}
          md={12}
        >
          <Card>
            <ProductHeader
              title="EZResize Premium"
              price="$9.99"
            />
            <ProductCheck text="Unlimited file uploads" />

            <ProductCheck text="File compression" />

            <Divider />

            <div
              css={css`
                text-align: center;
              `}
            >
              <Button type="primary">
                Get Premium
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Premium
