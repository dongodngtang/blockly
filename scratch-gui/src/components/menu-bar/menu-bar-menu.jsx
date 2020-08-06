import PropTypes from 'prop-types';
import React from 'react';
import Menu from '../../containers/menu.jsx';

const MenuBarMenu = ({
  children,
  className,
  onRequestClose,
  open,
  place = 'right',
  top
}) => (
  <div
    className={className}
    style={{ top }}
  >
    <Menu
      open={open}
      place={place}
      onRequestClose={onRequestClose}
    >
      {children}
    </Menu>
  </div>
);

MenuBarMenu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onRequestClose: PropTypes.func,
  open: PropTypes.bool,
  place: PropTypes.oneOf(['left', 'right']),
  top: PropTypes.string
};

export default MenuBarMenu;
