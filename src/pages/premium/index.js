/** @jsx jsx */
import { useState, useContext } from 'react'
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
import { UserContext } from 'components/UserProvider'

function Premium() {
  const [status, setStatus] = useState(false)
  const userContext = useContext(UserContext)

  const toggleStatus = async () => {
    setStatus(!status)

    const { state } = userContext

    state.sessionUser.ezUser.update({
      premium: !status
    })
    const result = await state.sessionUser.ezUser.save()
    userContext.setEzUser(result)
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
