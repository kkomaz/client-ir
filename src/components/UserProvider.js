import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const UserContext = React.createContext();

class UserProvider extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    theme: PropTypes.string.isRequired,
    setTheme: PropTypes.func.isRequired,
    userSession: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    const { userSession, theme, setTheme } = props

    const userData = userSession.loadUserData()

    /* eslint-disable react/no-unused-state */
    this.state = {
      sessionUser: {
        userSession,
        userData,
        username: userData.username,
      },
      theme: {
        color: theme,
        setTheme,
      }
    }
  }

  render() {
    const { children } = this.props

    return (
      <UserContext.Provider value={{
        state: this.state,
      }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider
