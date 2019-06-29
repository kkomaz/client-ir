/** @jsx, jsx */
import React, { Component } from 'react'
import _ from 'lodash'
import { UserSession } from 'blockstack'
import { appConfig } from 'utils/constants'
import { Global, css } from '@emotion/core'
import Login from 'components/Login'
import { ThemeProvider } from 'emotion-theming'
import colors from 'utils/colors'
import EzUser from 'models/ezUser'
import RootRoute from './pages/routes'

const theme = {
  colors,
}

class GlobalComp extends Component {
  constructor(props) {
    super(props)

    const userSession = new UserSession({ appConfig })

    this.state = {
      userSession,
      loggedIn: false,
      loggingIn: false,
    }
  }

  componentDidMount = async () => {
    const { userSession } = this.state

    // If already signed in
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();

      if (userData.username) {
        this.setState({ loggedIn: true }, async () => {
          await EzUser.createWithCurrentUser()
        })
      } else {
        return this.setState({ loggedIn: true })
      }
    }

    // If pending sign-in
    if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn()
      this.setState({ loggingIn: true })

      if (!userData.username) {
        return this.setState({
          loggedIn: true
        })
      }

      try {
        const ezUser = await EzUser.createWithCurrentUser()

        if (!_.has(ezUser, 'attrs.premium')) {
          ezUser.update({ premium: false })
          await ezUser.save()
        }
      } catch (e) {
        console.log(e.message)
      }

      return this.setState({
        loggedIn: true,
        loggingIn: false
      })
    }
  }

  handleSignIn = (e) => {
    const { userSession } = this.state

    e.preventDefault()
    userSession.redirectToSignIn()
  }

  handleSignOut = () => {
    const { userSession } = this.state

    userSession.signUserOut()
    window.location = '/' // eslint-disable-line no-undef
  }

  render() {
    const { loggedIn, userSession, loggingIn } = this.state

    return (
      <ThemeProvider theme={theme}>
        <Global
          styles={css`
            * {
              font-family: Poppins, sans-serif;
            }

            body {
              background: #fafbfc;
            }
          `}
        />
        <div>
          {
            loggedIn ?
              <div className="logged-in">
                <RootRoute
                  userSession={userSession}
                />
              </div>
              :
              <Login
                userSession={userSession}
                loggingIn={loggingIn}
              />
          }
        </div>
      </ThemeProvider>
    )
  }
}

export default GlobalComp
