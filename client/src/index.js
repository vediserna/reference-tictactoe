window.console.debug = window.console.log;

import inject from './microdi/inject';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import AppContextModule from "./appContext";

const {App} = AppContextModule(
    inject({
        io:window.io
    })
);
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
