/** @jsx jsx */
import {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFiles } from 'actions/file'
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
import { IrSidebar, IrSidebarMobile } from 'components/Sidebar'
import FilesRoutes from 'pages/files/routes'
import { createSelector } from 'reselect'
import { Default, Mobile } from 'components/Responsive'
import Home from '.'
import Donate from './donate'
import Premium from './premium'

const makeSelectFiles = () => (
  createSelector(
    state => state.file.list,
    files => files
  )
)

function RootRoute(props) {
  const { userSession } = props
  const [theme, setTheme] = useState('light')
  const [filesRequested, setFilesRequested] = useState(false)

  const dispatch = useDispatch()
  const selectFiles = useMemo(
    makeSelectFiles,
    []
  )
  const files = useSelector(state => selectFiles(state))

  const startFetchLists = useCallback(
    () => dispatch(
      fetchFiles(userSession)
    ), [dispatch, userSession]
  )

  useEffect(() => {
    if (!filesRequested) {
      setFilesRequested(true)
      startFetchLists()
    }
  }, [startFetchLists, filesRequested])

  return (
    <UserProvider
      userSession={userSession}
      theme={theme}
      setTheme={setTheme}
    >
      <Layout>
        <Navbar
          theme={theme}
          userSession={userSession}
        />

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

            <Default>
              <IrSidebar />
            </Default>
            <Mobile>
              <IrSidebarMobile />
            </Mobile>
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
                    <Home
                      currentFiles={files}
                    />
                  )}
                />
                <Route
                  path="/files"
                  render={({ match }) => (
                    <FilesRoutes
                      files={files}
                      match={match}
                    />
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
          Tech Rally ©2019 Created by Tech Rally
        </Layout.Footer>
      </Layout>
    </UserProvider>
  )
}

RootRoute.propTypes = {
  userSession: PropTypes.object.isRequired,
}

export default RootRoute
