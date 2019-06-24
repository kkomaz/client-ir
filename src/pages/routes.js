/** @jsx jsx */
import { useState } from 'react'
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import UserProvider from 'components/UserProvider'
import {
  Switch,
  Route,
} from 'react-router-dom'
import Container from 'components/Common/Container'
import {
  Icon,
  Layout,
  Menu,
} from 'antd';
import Navbar from 'components/Navbar'

const {
  Sider,
} = Layout

function RootRoute(props) {
  const { userSession } = props
  const [theme, setTheme] = useState('light')

  return (
    <UserProvider
      userSession={userSession}
      theme={theme}
      setTheme={setTheme}
    >
      <Layout>
        <Navbar theme={theme} />

        <Container
          css={css`
            height: 100vh;
          `}
        >
          <Layout
            css={css`
              height: 100vh;
            `}
          >
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              style={{
                background: 'inherit'
              }}
            >
              <Menu
                css={css`
                  background: inherit;
                `}
                onClick={() => console.log('clicking')}
                defaultSelectedKeys={['1']}
              >
                <Menu.Item
                  css={css`
                    margin-top: 0 !important;
                  `}
                  key="1"
                >
                  <Icon type="upload" />
                  <span>Resize</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="file" />
                  <span>My files</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout
              css={css`
                background: #fff;
                padding: 20px;
              `}
            >
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <div>
                      Hello World
                    </div>
                  )}
                />
              </Switch>
            </Layout>
          </Layout>
        </Container>
      </Layout>
    </UserProvider>
  )
}

RootRoute.propTypes = {
  userSession: PropTypes.object.isRequired,
}

export default RootRoute
