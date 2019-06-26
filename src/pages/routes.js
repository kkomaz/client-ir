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
import FilesRoutes from 'pages/files/routes'
import Home from '.'
import Donate from './donate'
import Premium from './premium'

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
        <Navbar theme={theme} userSession={userSession} />

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
                    <Home />
                  )}
                />
                <Route
                  path="/files"
                  render={({ match }) => (
                    <FilesRoutes match={match} />
                  )}
                />
                <Route
                  path="/donate"
                  render={() => (
                    <Donate />
                  )}
                />
                <Route
                  path="/premium"
                  render={() => (
                    <Premium />
                  )}
                />
              </Switch>
            </Layout>
          </Layout>
        </Container>
        <Layout.Footer
          css={css`
            margin-left: 200px;
            text-align: center;

            @media (max-width: 689px) {
              margin-left: 0;
            }
          `}
        >
          TechRally ©2019 Created by TechRally
        </Layout.Footer>
      </Layout>
    </UserProvider>
  )
}

RootRoute.propTypes = {
  userSession: PropTypes.object.isRequired,
}

export default RootRoute
