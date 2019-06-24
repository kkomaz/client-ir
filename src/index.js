import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { configure } from 'radiks';
import { UserSession, AppConfig } from 'blockstack';
import { BrowserRouter } from 'react-router-dom'
import Index from './pages/index';

const setAxiosHeaders = () => {
  axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD
}

const userSession = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data'])
})

const apiServer = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_RADIKS_PROD

setAxiosHeaders()
configure({
  apiServer,
  userSession
});


ReactDOM.render((
  <BrowserRouter>
    <Index />
  </BrowserRouter>
), document.getElementById('root'));
