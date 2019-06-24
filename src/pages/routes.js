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
  Layout,
} from 'antd';
import Navbar from 'components/Navbar'
import IrSidebar from 'components/Sidebar'

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
            <IrSidebar />

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
