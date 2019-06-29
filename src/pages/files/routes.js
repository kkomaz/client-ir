import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { Default, Mobile } from 'components/Responsive'
import { FilesList, FilesListMobile } from 'components/files'

const FilesRoute = (props) => {
  const { match, files } = props

  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={() => {
          return (
            <React.Fragment>
              <Default>
                <FilesList files={files} />
              </Default>
              <Mobile>
                <FilesListMobile files={files} />
              </Mobile>
            </React.Fragment>
          )
        }}
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
