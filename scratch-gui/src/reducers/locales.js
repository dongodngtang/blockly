import { addLocaleData } from 'react-intl';

import { localeData } from 'scratch-l10n';
import editorMessages from 'scratch-l10n/locales/editor-msgs';
import blockMessages from 'scratch-l10n/locales/blocks-msgs';
import { isRtl } from 'scratch-l10n';
addLocaleData(localeData);
const UPDATE_LOCALES = 'scratch-gui/locales/UPDATE_LOCALES';
const SELECT_LOCALE = 'scratch-gui/locales/SELECT_LOCALE';
import ScratchBlockly from 'scratch-blocks';
// 覆盖原有 scratch blocks 中的 i18n, 对积木描述的修改直接放到这里即可
ScratchBlockly.ScratchMsgs.locales = blockMessages;
const totalMessages = {};
Object.keys(editorMessages).forEach(key => {
  totalMessages[key] = Object.assign({}, editorMessages[key], blockMessages[key]);
});

const initialState = {
  isRtl: false,
  locale: 'en',
  messagesByLocale: Object.assign({}, totalMessages),
  messages: Object.assign({}, totalMessages.en)
};

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
  case SELECT_LOCALE:
    return Object.assign({}, state, {
      isRtl: isRtl(action.locale),
      locale: action.locale,
      messagesByLocale: state.messagesByLocale,
      messages: Object.assign({}, state.messagesByLocale.en, state.messagesByLocale[action.locale])
    });
  case UPDATE_LOCALES:
    return Object.assign({}, state, {
      isRtl: state.isRtl,
      locale: state.locale,
      messagesByLocale: action.messagesByLocale,
      messages: Object.assign({}, state.messagesByLocale.en, state.messagesByLocale[action.locale])
    });
  default:
    return state;
  }
};

const selectLocale = function (locale) {
  return {
    type: SELECT_LOCALE,
    locale: locale
  };
};

const setLocales = function (localesMessages) {
  return {
    type: UPDATE_LOCALES,
    messagesByLocale: localesMessages
  };
};
const initLocale = function (currentState, locale) {
  if (Object.prototype.hasOwnProperty.call(currentState.messagesByLocale, locale)) {
    return Object.assign(
      {},
      currentState,
      {
        isRtl: isRtl(locale),
        locale: locale,
        messagesByLocale: currentState.messagesByLocale,
        messages: currentState.messagesByLocale[locale]
      }
    );
  }
  // don't change locale if it's not in the current messages
  return currentState;
};
export {
  reducer as default,
  initialState as localesInitialState,
  initLocale,
  selectLocale,
  setLocales
};
