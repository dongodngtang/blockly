import React from 'react';
import PropTypes from 'prop-types';
import styles from './switch-cordinate.css';
export const SwitchJoint = props => (
  <div
    className={styles.switchJoint}
    style={{
      zoom: props.zoomSize
    }}
  >
    <span>{props.label}</span>
    <button
      className={styles.cordContainer + (props.isJoint ? '' : ` ${styles.buttonActive}`)}
      onClick={props.onClickDicar}
      
    >
      <img
        className={props.isJoint ? '' : styles.active}
        src={require('./dicar.svg')}
      />
    </button>
    <button
      className={styles.cordContainer + (props.isJoint ? ` ${styles.buttonActive}` : '')}
      onClick={props.onClickAngle}
    >
      <img
        className={props.isJoint ? styles.active : ''}
        src={require('./angle.svg')}
        style={{
          margin: '1px 0 0 1px'
        }}
      />
    </button>
  </div>
);

SwitchJoint.propTypes = {
  isJoint: PropTypes.bool,
  label: PropTypes.string,
  onClickAngle: PropTypes.func,
  onClickDicar: PropTypes.func,
  zoomSize: PropTypes.string
};
