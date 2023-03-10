import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './utils/i18n';

import { store } from './redux/store';
import App from './App';

import './index.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
