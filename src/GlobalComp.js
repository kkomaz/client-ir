/** @jsx, jsx */
import React, { Component } from 'react';
import _ from 'lodash'
import { UserSession } from 'blockstack'
import { appConfig } from 'utils/constants'
import { User } from 'radiks'
import { Global, css } from '@emotion/core'
import Login from 'components/Login'
import RootRoute from './pages/routes'

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
          await User.createWithCurrentUser()
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

      const user = User.currentUser()
      await user.fetch({ decrypt: false })

      try {
        const radiksUser = await User.findOne({ username: userData.username })
        const currentUser = await User.createWithCurrentUser()

        if (!radiksUser) {
          const profileImgUrl = _.get(currentUser, 'attrs.profile.image[0].contentUrl', null)
          if (profileImgUrl) {
            currentUser.update({
              profileImgUrl,
            })
            await currentUser.save()
          }
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
      <div>
        {
          loggedIn ?
            <div className="logged-in">
              <Global
                styles={css`
                  * {
                    font-family: Poppins, sans-serif;
                  }
                `}
              />
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
    )
  }
}

export default GlobalComp
