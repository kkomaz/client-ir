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

const {
  Header,
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
                  margin-top: 20px;
                  background: inherit;
                `}
                onClick={() => console.log('clicking')}
                defaultSelectedKeys={['1']}
              >
                <Menu.Item key="1">
                  <Icon type="inbox" />
                  <span>Inbox</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="calendar" />
                  <span>Today</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="carry-out" />
                  <span>Week</span>
                </Menu.Item>
                <Menu.Item key="4">
                  <Icon type="carry-out" />
                  <span>Projects (TBD)</span>
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
