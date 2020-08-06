// Polyfills
import 'es6-object-assign/auto';
import 'core-js/fn/array/includes';
import 'core-js/fn/promise/finally';
import 'intl'; // For Safari 9
import uuid from 'uuid';

import React from 'react';
import ReactDOM from 'react-dom';

import AppStateHOC from '../lib/app-state-hoc.jsx';
import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';
import supportedBrowser from '../lib/supported-browser';

import styles from './index.css';
import '../css/global.css';

// 删除注入的 electron 的 setImmediate 接口
delete window.setImmediate;
if (localStorage) {
  if (!localStorage.getItem('userID')) {
    localStorage.setItem('userID', uuid.v1());
  }
  if (!localStorage.getItem('autoUpdate')) {
    localStorage.setItem('autoUpdate', true);
  }
}


// Register "base" page view
const appTarget = document.createElement('div');
appTarget.className = styles.app;
document.body.appendChild(appTarget);

if (supportedBrowser()) {
  // require needed here to avoid importing unsupported browser-crashing code
  // at the top level
  require('./render-gui.jsx').default(appTarget);

} else {
  BrowserModalComponent.setAppElement(appTarget);
  const WrappedBrowserModalComponent = AppStateHOC(BrowserModalComponent, true /* localesOnly */);
  const handleBack = () => {};
  // eslint-disable-next-line react/jsx-no-bind
  ReactDOM.render(<WrappedBrowserModalComponent onBack={handleBack} />, appTarget);
}
