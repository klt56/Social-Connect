// index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getUsers } from './actions/users.actions';

// Dev tools: Remember to remove composeWithDevTools and logger before deployment
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

store.dispatch(getUsers());

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Use createRoot

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
