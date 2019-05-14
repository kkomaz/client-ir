import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { UserSession } from 'blockstack'
import { appConfig } from 'utils/constants'
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

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
      <div>
        {
          userSession.isUserSignedIn() ?
            <Button variant="contained" color="secondary" onClick={this.handleSignOut}>
              Sign Out
            </Button> :
            <div className={classes}>
              <Button variant="contained" color="primary" onClick={this.handleSignIn}>
                Sign In
              </Button>
            </div>
        }
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Index));
