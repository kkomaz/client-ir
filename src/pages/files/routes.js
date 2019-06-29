import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { FilesList } from 'components/files'

const FilesRoute = (props) => {
  const { match, files } = props

  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={() => <FilesList files={files} />}
      />
    </Switch>
  )
}

FilesRoute.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.array.isRequired,
}

export default FilesRoute
