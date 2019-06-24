import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

class Login extends Component {
  state = {
    loadingUser: false,
  }

  static propTypes = {
    loggingIn: PropTypes.bool.isRequired,
  }

  signIn = (e) => {
    const { userSession } = this.props

    if (e) {
      e.preventDefault()
    }
    userSession.redirectToSignIn()
    this.setState({ loadingUser: true })
  }

  render() {
    const { loadingUser } = this.state;
    const { loggingIn } = this.props

    if (loggingIn) {
      return (
        <div>Logging In...</div>
      )
    }

    return (
      <div container spacing={2}>
        {
          loadingUser ? <div>Loading...</div> :
          <div className="login-blockstack">
            <Button variant="contained" color="primary" onClick={this.signIn}>
              Sign In
            </Button>
          </div>
        }
      </div>
    );
  }
}

Login.propTypes = {
  userSession: PropTypes.object.isRequired,
}

export default Login;
