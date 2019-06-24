import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { configure } from 'radiks';
import { UserSession, AppConfig } from 'blockstack';
import { BrowserRouter } from 'react-router-dom'

// Redux Configs
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'

// Relative Paths
import GlobalComp from './GlobalComp';

const configureStore = (initialState) => {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
  )

  return store
}

const setAxiosHeaders = () => {
  axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD
}

const userSession = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data'])
})

const apiServer = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_RADIKS_PROD

const store = configureStore()


setAxiosHeaders()
configure({
  apiServer,
  userSession
});

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <GlobalComp />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
