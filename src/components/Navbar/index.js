/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import Container from 'components/Common/Container'
import {
  Layout,
  Menu,
} from 'antd';

const {
  Header,
} = Layout

function Navbar(props) {
  const { theme } = props

  return (
    <Header
      css={() => css`
        background: ${theme === 'dark' ? '#1C1D21' : '#D8E6E7'};
        padding: 0;
        margin-bottom: 2px;
      `}
      className="header"
    >
      <div className="logo" />
      <Container>
        <Menu
          css={css`
            border-bottom: none;
            display: flex;
            justify-content: flex-start;
            position: relative;
          `}
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
          theme={theme}
        >
          <Menu.Item
            key="1"
          >
            kkomaz.id
          </Menu.Item>
          <Menu.Item
            key="2"
            css={css`
              position: absolute !important;
              right: 0;
            `}
          >
            Sign Out
          </Menu.Item>
        </Menu>
      </Container>
    </Header>
  )
}

Navbar.propTypes = {
  theme: PropTypes.object.isRequired,
}

export default Navbar
