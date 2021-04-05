import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './App';
import './assets/css/index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'mdbreact';

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();

