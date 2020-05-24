import React from 'react';
import { render }  from 'react-dom';
import { App } from './components/app';
import { Provider } from 'react-redux';
import configureStore from './store';

import './styles/styles.css';

const renderApp = () => {
  const initialState = {};
  const store = configureStore(initialState);

  render(
    <Provider store={store}>
      <div className="container">
        <App />
      </div>
    </Provider>, document.getElementById('root')
  );
};

renderApp();
