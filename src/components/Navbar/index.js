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
  const { theme, userSession } = props

  const handleSignOut = () => {
    userSession.signUserOut()
    window.location = '/' // eslint-disable-line no-undef
  }

  const onMenuClick = (value) => {
    if (value.key === 'sign-out') {
      handleSignOut()
    }
  }

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
          onClick={onMenuClick}
        >
          <Menu.Item
            key="username"
          >
            kkomaz.id
          </Menu.Item>
          <Menu.Item
            key="sign-out"
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
  theme: PropTypes.string.isRequired,
  userSession: PropTypes.object.isRequired,
}

export default Navbar
