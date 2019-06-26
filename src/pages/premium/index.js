/** @jsx jsx */
import { useState } from 'react'
import { User } from 'radiks'
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
  const [status, setStatus] = useState(false)

  const toggleStatus = async () => {
    setStatus(!status)

    const result = await User.fetchList()
    console.log(result)

    // EzUser.update({
    //   premium: !status
    // })
    // await EzUser.save()
  }

  return (
    <div>
      <Button onClick={toggleStatus}>
        Update
      </Button>
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
