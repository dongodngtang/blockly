import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';
import ConnectedIntlProvider from './connected-intl-provider.jsx';

import localesReducer, { initLocale, localesInitialState } from '../reducers/locales';

import { setPlayer, setFullScreen } from '../reducers/mode.js';

import locales from 'scratch-l10n';
import { detectLocale } from './detect-locale';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let initialState = {};
let reducers = {};
// 使用 reducer 的初始化状态
let initializedLocales = localesInitialState;
// 检测l10n 项目中的 locale
const locale = detectLocale(Object.keys(locales));
if (locale !== 'en') {
  // 如果不为英文, 重新初始化 locale, 因为 reducer 默认为英文
  initializedLocales = initLocale(initializedLocales, locale);
}
const guiRedux = require('../reducers/gui');
const guiReducer = guiRedux.default;
const {
  guiInitialState,
  guiMiddleware
} = guiRedux;
const { ScratchPaintReducer } = require('scratch-paint');

const initializedGui = guiInitialState;
// 全局的 reducer
reducers = {
  locales: localesReducer,
  scratchGui: guiReducer,
  scratchPaint: ScratchPaintReducer
};
initialState = {
  locales: initializedLocales,
  scratchGui: initializedGui
};
const enhancer = composeEnhancers(guiMiddleware);

const reducer = combineReducers(reducers);
export const store = createStore(
  reducer,
  initialState,
  enhancer
);


/*
 * Higher Order Component to provide redux state. If an `intl` prop is provided
 * it will override the internal `intl` redux state
 * @param {React.Component} WrappedComponent - component to provide state for
 * @param {boolean} localesOnly - 只提供本地 state, 而不是 GUI 需要的所有数据. 在仅仅渲染 modals而不是 gui 的时候会过量
 *                      only provide the locale state, not everything
 *                      required by the GUI. Used to exclude excess state when
                        only rendering modals, not the GUI.
 * @returns {React.Component} 返回带有 redux 和 intl 状态的组件 component with redux and intl state provided
 */
const AppStateHOC = function (WrappedComponent, localesOnly) {
  class AppStateWrapper extends React.Component {
    componentDidUpdate (prevProps) {
      if (localesOnly) return;
      // if (prevProps.isPlayerOnly !== this.props.isPlayerOnly) {
      //   store.dispatch(setPlayer(this.props.isPlayerOnly));
      // }
      // if (prevProps.isFullScreen !== this.props.isFullScreen) {
      //   store.dispatch(setFullScreen(this.props.isFullScreen));
      // }
    }
    render () {
      const {
        isFullScreen, // eslint-disable-line no-unused-vars
        isPlayerOnly, // eslint-disable-line no-unused-vars
        ...componentProps
      } = this.props;
      return (
        <Provider store={store}>
          <ConnectedIntlProvider>
            <WrappedComponent
              {...componentProps}
            />
          </ConnectedIntlProvider>
        </Provider>
      );
    }
  }
  AppStateWrapper.propTypes = {
    isFullScreen: PropTypes.bool,
    isPlayerOnly: PropTypes.bool
  };
  return AppStateWrapper;
};

export default AppStateHOC;
