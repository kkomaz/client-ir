/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useContext } from 'react'
import PropTypes from 'prop-types'
import Container from 'components/Common/Container'
import {
  Avatar,
  Layout,
  Menu,
} from 'antd';
import logo from 'assets/logo.png'
import { UserContext } from 'components/UserProvider'

const {
  Header,
} = Layout

function Navbar(props) {
  const { theme, userSession } = props
  const userContext = useContext(UserContext)

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
            style={{
              paddingLeft: 0,
            }}
            key="username"
          >
            <Avatar
              src={logo}
              css={css`
                margin-right: 10px;
              `}
            />
            {userContext.state.sessionUser.username}
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
          <div
            css={css`
              position: absolute;
              left: 60%;
              transform: translateX(-60%);
            `}
          >
            <a
              href="https://www.producthunt.com/posts/ezresize?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-ezresize" target="_blank">
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=163244&theme=light"
                alt="EZResize - A privacy focused re-size tool | Product Hunt Embed"
                style={{
                  width: '250px',
                  height: '54px',
                }}
              />
            </a>
          </div>
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
