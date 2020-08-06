import React from 'react';
import styles from './index.css';
import PropTypes from 'prop-types';
const RadioInput = props => (
  <div
    className={styles.customRadio + (props.isChecked ? ` ${styles.selected}` : '')}
    onClick={props.onClickFunc}
  >
    <span />
  </div>
);


RadioInput.propTypes = {
  isChecked: PropTypes.bool,
  onClickFunc: PropTypes.func
};
const CheckboxInput = props => (
  <div
    className={styles.customCheckbox + (props.isChecked ? ` ${styles.selected}` : '')}
    onClick={props.onClickFunc}
  >
    <span />
  </div>
);
CheckboxInput.propTypes = {
  isChecked: PropTypes.bool,
  onClickFunc: PropTypes.func
};

export {
  RadioInput,
  CheckboxInput
};
