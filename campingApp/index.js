/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './src/reducers/camping';
import {thunk} from 'redux-thunk';
import React from 'react';

const store = createStore(reducer, applyMiddleware(...middleware));
const middleware = [thunk];

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => AppContainer);
