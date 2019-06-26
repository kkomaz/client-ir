import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EzUser from 'models/ezUser'
export const UserContext = React.createContext();

class UserProvider extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    theme: PropTypes.string.isRequired,
    setTheme: PropTypes.func.isRequired,
    userSession: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const { userSession, theme, setTheme } = props;

    const userData = userSession.loadUserData();

    /* eslint-disable react/no-unused-state */
    this.state = {
      sessionUser: {
        userSession,
        userData,
        username: userData.username,
        ezUser: {},
      },
      theme: {
        color: theme,
        setTheme
      }
    };
  }

  componentDidMount = async () => {
    const { sessionUser, sessionUser: { username } } = this.state
    const ezUser = await EzUser.findOne({ username })

    this.setState({
      sessionUser: {
        ...sessionUser,
        ezUser
      }
    })
  }

  setEzUser = (ezUser) => {
    const { sessionUser } = this.state

    this.setState({
      sessionUser: {
        ...sessionUser,
        ezUser
      }
    })
  }

  render() {
    const { children } = this.props;

    return (
      <UserContext.Provider
        value={{
          state: this.state,
          setEzUser: this.setEzUser
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
