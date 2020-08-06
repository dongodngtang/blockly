import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './index.css';

const clearAlarmComponent = function (props) {
  const {
    className,
    onClick,
    title
  } = props;
  return (
    <button
      className={classNames(
        className,
        styles.clearBtn
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
clearAlarmComponent.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string
};
clearAlarmComponent.defaultProps = {
  active: false,
  title: 'Clear alarm'
};
export default clearAlarmComponent;
