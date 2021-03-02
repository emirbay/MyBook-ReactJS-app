import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import { composeWithDevTools} from 'redux-devtools-extension';

import reducers from './store/reducers';

const createStoreWithMiddleware = createStore(reducers,composeWithDevTools(
  applyMiddleware(promiseMiddleware) //, others...
  ));

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>   
      <Routes />
  </Provider>,
  document.getElementById('root')
);
 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

