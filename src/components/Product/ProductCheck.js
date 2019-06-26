/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import {
  Icon,
  Typography,
} from 'antd'

const { Text } = Typography

function ProductCheck(props) {
  const { text, disabled } = props

  return (
    <div
      css={css`
        display: flex;
        align-items: center;

        span {
          margin-left: 10px;
        }
      `}
    >
      {
        disabled ?
          <Icon type="check" fill="#f0f0f0" /> :
          <Icon type="check" fill="#1DA57A" />
      }
      {
        disabled ?
          <Text
            css={css`
              margin-top: 1px;
            `}
            type="secondary"
          >
            {text}
          </Text> :
          <Text
            css={theme => css`
              color: ${theme.colors.primary};
              margin-top: 1px;
            `}
          >
            {text}
          </Text>
      }
    </div>
  )
}

ProductCheck.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

ProductCheck.defaultProps = {
  disabled: false,
}

export default ProductCheck
