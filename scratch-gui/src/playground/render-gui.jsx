import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'redux';

import AppStateHOC from '../lib/app-state-hoc.jsx';
import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';

const onClickLogo = () => {
  window.open('https://cn.dobot.cc/');
};
const WrappedGui = compose(
  AppStateHOC,
  HashParserHOC
)(GUI);
/*
 * Render the GUI playground. This is a separate function because importing anything
 * that instantiates the VM causes unsupported browsers to crash
 * {object} appTarget - the DOM element to render to
 */
export default appTarget => {
  GUI.setAppElement(appTarget);
  // note that redux's 'compose' function is just being used as a general utility to make
  // the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
  // ability to compose reducers.
  ReactDOM.render(
    <WrappedGui
      backpackVisible={false}
      showComingSoon={false}
      canSave={false}
      onClickLogo={onClickLogo}
    />,
    appTarget);
};
