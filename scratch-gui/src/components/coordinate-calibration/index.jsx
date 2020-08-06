import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Draggable from 'react-draggable';
import VM from 'scratch-vm';
import styles from './index.css';

import helpIcon from '../../lib/assets/icon--tutorials.svg';
import closeIcon from '../ai/icon--close.svg';

import { Title, ContentContainer } from './body-content';
import { CloseTipsPopup, SuccessPopup } from './tips.jsx';


const CardHeader = ({ step, showClosePopup }) => (
  <div className={styles.headerButtons}>
    <div
      className={styles.allButton}
    >
      <img
        className={styles.helpIcon}
        src={helpIcon}
      />
      <FormattedMessage
        defaultMessage="Coordinate calibration"
        id="gui.coordinateCalibration"
      />
    </div>
    {
      <div className={styles.stepsList}>
        {Array(7).fill(0)
          .map((_, i) => (
            <div
              className={i === step ? styles.activeStepPip : styles.inactiveStepPip}
              key={`pip-step-${i}`}
            />
          ))}
      </div>
    }
    <button
      className={styles.removeButton}
      onClick={showClosePopup}
    >
      <FormattedMessage
        defaultMessage="Close"
        description="Title for button to close how-to card"
        id="gui.cards.close"
      />
      <img
        className={styles.closeIcon}
        src={closeIcon}
      />
    </button>
  </div>
);


CardHeader.propTypes = {
  step: PropTypes.number,
  showClosePopup: PropTypes.func.isRequired
};


const CardContainer = props => {
  const {
    step,
    nextStep,
    prveStep,
    vm,
    calibrationValidateImg,
    stopFlag,
    changeStopFlag,
    nextBtnDisable,
    changeNextBtnDisable,
    closeCalibration
  } = props;
  const [isShowClosePopup, setisShowClosePopup] = useState(false);
  const showClosePopup = () => {
    setisShowClosePopup(true);
  };
  const closeClosePopup = () => {
    setisShowClosePopup(false);
    closeCalibration();
  };
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <CardHeader
          step={step}
          showClosePopup={showClosePopup}
        />
        <section className={styles.body}>
          <Title step={step} />
          <div className={styles.bodyContent}>
            <ContentContainer
              step={step}
              vm={vm}
              calibrationValidateImg={calibrationValidateImg}
              stopFlag={stopFlag}
              changeStopFlag={changeStopFlag}
              nextBtnDisable={nextBtnDisable}
              changeNextBtnDisable={changeNextBtnDisable}
              isShowClosePopup={isShowClosePopup}
            />
          </div>
          <div className={styles.footBtn}>
            <button
              className={styles.prve}
              style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
              onClick={prveStep}
            >
              <FormattedMessage
                defaultMessage="Prev"
                description="Prev"
                id="gui.calibration.Prev"
              />
            </button>
            <button
              className={nextBtnDisable ? styles.nextBtnDisable : ''}
              onClick={nextStep}
              disabled={nextBtnDisable}
            >
              <FormattedMessage
                defaultMessage="Next"
                description="Next"
                id="gui.calibration.Next"
              />
            </button>
          </div>
          {
            isShowClosePopup ? <CloseTipsPopup closeClosePopup={closeClosePopup} /> : ''
          }
        </section>
      </div>
    </div>
  );
};

CardContainer.propTypes = {
  step: PropTypes.number,
  nextStep: PropTypes.func,
  prveStep: PropTypes.func,
  vm: PropTypes.instanceOf(VM).isRequired,
  calibrationValidateImg: PropTypes.func,
  stopFlag: PropTypes.bool,
  changeStopFlag: PropTypes.func,
  nextBtnDisable: PropTypes.bool,
  changeNextBtnDisable: PropTypes.func,
  closeCalibration: PropTypes.func
};


const CoordinateCalibration = props => {
  const {
    step,
    nextStep,
    prveStep,
    vm,
    calibrationValidateImg,
    stopFlag,
    changeStopFlag,
    nextBtnDisable,
    changeNextBtnDisable,
    isShowCardContainer,
    closeCalibration,
    isShowSuccessPopup,
    isErr,
    recalibration
  } = props;

  return (
    <div className={styles.mask}>
      {
        isShowCardContainer ?
          <CardContainer
            step={step}
            nextStep={nextStep}
            prveStep={prveStep}
            vm={vm}
            calibrationValidateImg={calibrationValidateImg}
            stopFlag={stopFlag}
            changeStopFlag={changeStopFlag}
            nextBtnDisable={nextBtnDisable}
            changeNextBtnDisable={changeNextBtnDisable}
            closeCalibration={closeCalibration}
          /> : ''
      }
      {
        isShowSuccessPopup ? <SuccessPopup
          isErr={isErr}
          recalibration={recalibration}
          closeCalibration={closeCalibration}
        /> : ''
      }
      
    </div>
  );
};

CoordinateCalibration.propTypes = {
  step: PropTypes.number,
  nextStep: PropTypes.func,
  prveStep: PropTypes.func,
  vm: PropTypes.instanceOf(VM).isRequired,
  calibrationValidateImg: PropTypes.func,
  stopFlag: PropTypes.bool,
  changeStopFlag: PropTypes.func,
  nextBtnDisable: PropTypes.bool,
  changeNextBtnDisable: PropTypes.func,
  isShowCardContainer: PropTypes.bool,
  closeCalibration: PropTypes.func,
  isShowSuccessPopup: PropTypes.bool,
  isErr: PropTypes.bool,
  recalibration: PropTypes.func
};

export default CoordinateCalibration;
