import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { FilesList } from 'components/files'

const FilesRoute = (props) => {
  const { match } = props

  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={() => <FilesList />}
      />
    </Switch>
  )
}

FilesRoute.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired
}

export default FilesRoute
