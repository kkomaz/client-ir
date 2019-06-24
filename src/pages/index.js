import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { UserSession } from 'blockstack'
import { appConfig } from 'utils/constants'

class Index extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    userSession: new UserSession({ appConfig })
  }

  componentDidMount = async () => {
    const { userSession } = this.state

    if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn()

      if (!userData.username) {
        throw new Error('This app requires a username')
      }

      window.location = '/' // eslint-disable-line no-undef
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
    const { userSession } = this.state
    const { classes } = this.props

    return (
      <div className={classes}>
        {
          userSession.isUserSignedIn() ?
            <Button variant="contained" color="secondary" onClick={this.handleSignOut}>
              Sign Out
            </Button> :
            <div>
              <Button variant="contained" color="primary" onClick={this.handleSignIn}>
                Sign In
              </Button>
            </div>
        }
      </div>
    )
  }
}

export default Index
