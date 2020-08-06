/* eslint-disable no-undefined */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { FormattedMessage } from 'react-intl';
import { AIProgressBar } from '../../../progress-bar/progress-bar';

const testing = (<FormattedMessage
  defaultMessage="Testing..."
  description="Testing..."
  id="gui.ardino.card.Testing"
/>);
    
const ValidateCalibrationRes = ({
  isMaual,
  validateRes,
  characterNames,
  isCut,
  isColorCut,
  isFacial,
  isShowTestBtn,
  startCapture,
  isShowLoading,
  COLOR
}) => (
  <div className={styles.validateRes}>
    <div className={styles.validateResWarp}>
      {(isCut || isColorCut) ?
        characterNames.map((name, index) => (<div
          key={index}
          className={styles.validateItem}
        >
          <span>{`${name}: `}</span>
          <span style={{ color: COLOR[index], marginLeft: '10px' }}>{COLOR[index]}</span>
        </div>)) :
        (isMaual ? null : validateRes.map((res, ind) => (
          res.name ? <div
            className={styles.validateItem}
            key={ind}
          >
            <span>{res.name}</span>
            <progress
              className={styles.validateProgress}
              max={100}
              value={Number(res.value)}
            />
            <span>{`${res.value}%`}</span>
          </div> : null
        )))}
      <button
        className={styles.testBtn}
        style={{ display: (isFacial && isShowTestBtn) ? 'block' : 'none' }}
        onClick={startCapture}
      >
        <FormattedMessage
          defaultMessage="Test"
          description="Test"
          id="gui.ardino.card.Test"
        />
      </button>
    </div>
    {
      isShowLoading && isFacial ? <AIProgressBar text={testing} /> : ''
    }
  </div>
);
ValidateCalibrationRes.propTypes = {
  validateRes: PropTypes.array,
  isMaual: PropTypes.bool,
  characterNames: PropTypes.array,
  isCut: PropTypes.bool,
  isColorCut: PropTypes.bool,
  isFacial: PropTypes.bool,
  isShowTestBtn: PropTypes.bool,
  startCapture: PropTypes.func,
  isShowLoading: PropTypes.bool,
  COLOR: PropTypes.array
};

export default ValidateCalibrationRes;
