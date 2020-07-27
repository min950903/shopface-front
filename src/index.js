import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import './index.css';
import rootReducer, { rootSaga } from './modules';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';
import config from './config';
import createSagaMiddleware from 'redux-saga';
import { tempSetUser } from './modules/common/auth';
import './lib/styles/scss/_app.scss';
import client from './lib/api/client';

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare)),
);

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return;
    const parseUser = JSON.parse(user);
    store.dispatch(tempSetUser(parseUser));

    client.defaults.headers.common['Authorization'] =
      'bearer ' + JSON.parse(user).jwt;
  } catch (e) {
    console.log('localstorage가 동작하지 않습니다.');
  }
}

sagaMiddleWare.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
