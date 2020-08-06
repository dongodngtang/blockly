import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { selectLocale } from '../reducers/locales';
import { closeLanguageMenu, languageMenuOpen, openLanguageMenu } from '../reducers/menus';
import { tutorialChange, tutorialPDFChange, alarmTypeChange } from '../lib/events';

import LanguageSelectorComponent from '../components/language-selector/language-selector.jsx';

class LanguageSelector extends React.Component {
  constructor (props) {
    super(props);
    document.documentElement.lang = props.currentLocale;
  }
  localesMap = {
    'en': 'English',
    'zh-cn': '简体中文',
    'zh-hk': '繁體中文',
    // 'pt': 'Português'
    'ja': '日本語',
    'cs': 'Česká republika',
    'es': 'Espanol',
    'ru': 'русский язык',
    'fi': 'Suomen tasavalta',
    'hu': 'Magyarország'
  };
  handleClick = newLocale => _ => {
    if (this.props.messagesByLocale[newLocale]) {
      this.props.onChangeLanguage(newLocale);
      document.documentElement.lang = newLocale;
      setTimeout(() => {
        document.dispatchEvent(tutorialChange);
        document.dispatchEvent(tutorialPDFChange);
        document.dispatchEvent(alarmTypeChange);
      }, 0);
    }
  }
  render () {
    const {
      onChangeLanguage, // eslint-disable-line no-unused-vars
      messagesByLocale, // eslint-disable-line no-unused-vars
      children,
      ...props
    } = this.props;
    return (
      <LanguageSelectorComponent
        onClick={this.handleClick}
        open={this.props.languageMenuOpen}
        onCloseLanguageMenu={this.props.closeLanguageMenu}
        localesMap={this.localesMap}
        {...props}
      >
        {children}
      </LanguageSelectorComponent>
    );
  }
}

LanguageSelector.propTypes = {
  children: PropTypes.node,
  currentLocale: PropTypes.string.isRequired,
  // Only checking key presence for messagesByLocale, no need to be more specific than object
  messagesByLocale: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onChangeLanguage: PropTypes.func.isRequired,
  languageMenuOpen: PropTypes.bool,
  closeLanguageMenu: PropTypes.func
};

const mapStateToProps = state => ({
  currentLocale: state.locales.locale,
  messagesByLocale: state.locales.messagesByLocale,
  languageMenuOpen: languageMenuOpen(state)
});

const mapDispatchToProps = dispatch => ({
  onChangeLanguage: locale => {
    dispatch(selectLocale(locale));
    dispatch(closeLanguageMenu());
  },
  onCloseLanguageMenu: () => dispatch(closeLanguageMenu())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelector);
