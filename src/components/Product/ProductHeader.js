/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import {
  Divider,
  Typography
} from 'antd';

const { Title } = Typography;

function ProductHeader(props) {
  const { title, price } = props

  return (
    <div>
      <Title level={3}>
        {title}
      </Title>

      <div
        css={css`
          display: flex;
          align-items: baseline;
        `}
      >
        <Title level={4}>
          {price}
        </Title>
        <p
          css={css`
            margin-left: 0.5em;
          `}
        >
          / month
        </p>
      </div>

      <Divider />
    </div>
  )
}

ProductHeader.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
}

export default ProductHeader
