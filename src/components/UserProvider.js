import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { UserSession, AppConfig } from 'blockstack'

export const UserContext = React.createContext()

function UserProvider(props) {
  const appConfig = new AppConfig(['store_write', 'publish_data'])
  const userSession = new UserSession({ appConfig })

  const [userData] = useState(userSession.loadUserData())

  const { children } = props

  return (
    <UserContext.Provider value={{
      state: {
        userData
      }
    }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.object.isRequired,
}

export default UserProvider
