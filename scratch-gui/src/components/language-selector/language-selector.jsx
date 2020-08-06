import PropTypes from 'prop-types';
import React from 'react';

import locales from 'scratch-l10n';
import styles from './language-selector.css';
import MenuBarMenu from '../menu-bar/menu-bar-menu';
import { MenuSection, MenuItem } from '../menu/menu';

// supported languages to exclude from the menu, but allow as a URL option
const ignore = [];

const LanguageSelector = ({ onClick, onCloseLanguageMenu, open, localesMap }) => (
  <MenuBarMenu
    open={open}
    place={'right'}
    onRequestClose={onCloseLanguageMenu}
    className={styles.menuBarMenu}
  >
    <MenuSection>
      {
        Object.keys(locales)
          .filter(l => !ignore.includes(l))
          .map(locale => (
            <MenuItem
              onClick={onClick(locale)}
              key={locale}
            >
              {localesMap[locale]}
            </MenuItem>
          ))
      }
    </MenuSection>
  </MenuBarMenu>
);

LanguageSelector.propTypes = {
  onClick: PropTypes.func,
  open: PropTypes.bool,
  onCloseLanguageMenu: PropTypes.func,
  localesMap: PropTypes.any
};

export default LanguageSelector;
