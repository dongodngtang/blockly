import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import Draggable from 'react-draggable';

import styles from './index.css';

import rightArrow from './icon--next.svg';
import leftArrow from './icon--prev.svg';

import helpIcon from '../../lib/assets/icon--tutorials.svg';
import closeIcon from './icon--close.svg';
import IndexPage from './indexPage';
import { Page1, Page2 } from './picSort';
import { MachanicalIndex, MachanicalRecord } from './machanical';

const CardHeader = ({ onCloseCards, totalSteps, step }) => (
  <div className={styles.headerButtons}>
    <div
      className={styles.allButton}
    >
      <img
        className={styles.helpIcon}
        src={helpIcon}
      />
      <FormattedMessage
        defaultMessage="特征标定"
        id="gui.ardino.card.initVisual"
      />
    </div>
    {totalSteps > 1 ? (
      <div className={styles.stepsList}>
        {Array(totalSteps).fill(0)
          .map((_, i) => (
            <div
              className={i === step ? styles.activeStepPip : styles.inactiveStepPip}
              key={`pip-step-${i}`}
            />
          ))}
      </div>
    ) : null}
    <button
      className={styles.removeButton}
      onClick={onCloseCards}
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
  onCloseCards: PropTypes.func.isRequired,
  step: PropTypes.number,
  totalSteps: PropTypes.number
};
const NextPrevButtons = ({ isRtl, onNextStep, onPrevStep }) => (
  <Fragment>
    {onNextStep ? (
      <div>
        <div className={isRtl ? styles.leftCard : styles.rightCard} />
        <div
          className={isRtl ? styles.leftButton : styles.rightButton}
          onClick={onNextStep}
        >
          <img
            draggable={false}
            src={isRtl ? leftArrow : rightArrow}
          />
        </div>
      </div>
    ) : null}
    {onPrevStep ? (
      <div>
        <div className={isRtl ? styles.rightCard : styles.leftCard} />
        <div
          className={isRtl ? styles.rightButton : styles.leftButton}
          onClick={onPrevStep}
        >
          <img
            draggable={false}
            src={isRtl ? rightArrow : leftArrow}
          />
        </div>
      </div>
    ) : null}
  </Fragment>
);

NextPrevButtons.propTypes = {
  isRtl: PropTypes.bool,
  onNextStep: PropTypes.func,
  onPrevStep: PropTypes.func
};


const CalibrationStepComponent = ({
  currentStep, intl, tabList, imageListObj, changeIndex, selectTabIndex, addTab, handleAddImage,
  handleCaptureClick, handleDeleteImg, handleDeleteTab, handleModeChange, handleFinish, mode,
  validateImage, handleValidateInputChange, validateRes,
  blockHeight, handleBlockHeightChange, characterNames, handleCharacterNameChange, rectArray
}) => {
  switch (currentStep) {
  case 0:
    return (<IndexPage
      handleModeChange={handleModeChange}
      intl={intl}
      mode={mode}
    />);
  case 1:
    return (<Page1
      blockHeight={blockHeight}
      changeIndex={changeIndex}
      characterNames={characterNames}
      handleAddImage={handleAddImage}
      handleBlockHeightChange={handleBlockHeightChange}
      handleCaptureClick={handleCaptureClick}
      handleCharacterNameChange={handleCharacterNameChange}
      handleDeleteImg={handleDeleteImg}
      handleDeleteTab={handleDeleteTab}
      handleTabAdd={addTab}
      imageListObj={imageListObj}
      mode={mode}
      selectTabIndex={selectTabIndex}
      tabList={tabList}
      rectArray={rectArray}
    />);
  case 2:
    return (
      <Page2
        handleValidateInputChange={handleValidateInputChange}
        intl={intl}
        mode={mode}
        validateImage={validateImage}
        validateRes={validateRes}
        handleFinish={handleFinish}
      />
    );
  }
  return null;
};
CalibrationStepComponent.propTypes = {
  addTab: PropTypes.func,
  blockHeight: PropTypes.number,
  changeIndex: PropTypes.func,
  characterNames: PropTypes.array,
  currentStep: PropTypes.number,
  handleAddImage: PropTypes.func,
  handleBlockHeightChange: PropTypes.func,
  handleCaptureClick: PropTypes.func,
  handleCharacterNameChange: PropTypes.func,
  handleDeleteImg: PropTypes.func,
  handleDeleteTab: PropTypes.func,
  handleModeChange: PropTypes.func,
  handleValidateInputChange: PropTypes.func,
  handleFinish: PropTypes.func,
  imageListObj: PropTypes.any,
  intl: PropTypes.any,
  mode: PropTypes.number,
  selectTabIndex: PropTypes.number,
  tabList: PropTypes.array,
  validateImage: PropTypes.string,
  validateRes: PropTypes.array,
  rectArray: PropTypes.array
};

const Calibration = props => {
  const {
    onCloseCards,
    onDrag,
    onStartDrag,
    onEndDrag,
    onNextStep,
    onPrevStep,
    step,
    totalSteps,
    intl,
    tabList,
    imageListObj,
    changeTab,
    selectTabIndex,
    addTab,
    handleAddImage,
    handleCaptureClick,
    handleDeleteImg,
    handleDeleteTab,
    handleModeChange,
    handleFinish,
    mode,
    handleValidateInputChange,
    validateImage,
    validateRes,
    handleBlockHeightChange,
    blockHeight,
    handleCharacterNameChange,
    characterNames,
    rectArray
  } = props;
  let { x, y } = props;
  if (x === 0 || y === 0) {
    // initialize positions
    const widthCard = 600;
    x = (window.innerWidth - widthCard) / 2;
    y = window.innerHeight / 4;
  }
  return (
    <Draggable
      cancel="input,button,canvas,svg,select"
      onDrag={onDrag}
      onStart={onStartDrag}
      onStop={onEndDrag}
      position={{ x: x, y: y }}
    >
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <CardHeader
            onCloseCards={onCloseCards}
            step={step}
            totalSteps={totalSteps}
          />
          <div className={styles.stepBody} >
            <CalibrationStepComponent
              addTab={addTab}
              blockHeight={blockHeight}
              changeIndex={changeTab}
              characterNames={characterNames}
              currentStep={step}
              handleAddImage={handleAddImage}
              handleBlockHeightChange={handleBlockHeightChange}
              handleCaptureClick={handleCaptureClick}
              handleCharacterNameChange={handleCharacterNameChange}
              handleDeleteImg={handleDeleteImg}
              handleDeleteTab={handleDeleteTab}
              handleModeChange={handleModeChange}
              handleValidateInputChange={handleValidateInputChange}
              imageListObj={imageListObj}
              intl={intl}
              mode={mode}
              selectTabIndex={selectTabIndex}
              tabList={tabList}
              validateImage={validateImage}
              validateRes={validateRes}
              rectArray={rectArray}
              handleFinish={handleFinish}
            />
          </div>
          <NextPrevButtons
            onNextStep={step < totalSteps - 1 ? onNextStep : null}
            onPrevStep={step > 0 ? onPrevStep : null}
          />
        </div>
      </div>
    </Draggable>
  );
};

Calibration.propTypes = {
  addTab: PropTypes.func,
  blockHeight: PropTypes.number,
  changeTab: PropTypes.func,
  characterNames: PropTypes.array,
  handleAddImage: PropTypes.func,
  handleBlockHeightChange: PropTypes.func,
  handleCaptureClick: PropTypes.func,
  handleCharacterNameChange: PropTypes.func,
  handleDeleteImg: PropTypes.func,
  handleDeleteTab: PropTypes.func,
  handleModeChange: PropTypes.func,
  handleValidateInputChange: PropTypes.func,
  handleFinish: PropTypes.func,
  imageListObj: PropTypes.any,
  intl: intlShape.isRequired,
  mode: PropTypes.number,
  onCloseCards: PropTypes.func.isRequired,
  onDrag: PropTypes.func,
  onEndDrag: PropTypes.func,
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired,
  onStartDrag: PropTypes.func,
  selectTabIndex: PropTypes.number,
  step: PropTypes.number.isRequired,
  tabList: PropTypes.array,
  totalSteps: PropTypes.number,
  rectArray: PropTypes.array,
  validateImage: PropTypes.string,
  validateRes: PropTypes.array,
  x: PropTypes.number,
  y: PropTypes.number
};
const CalibrationMachanicalStepComponent = ({ currentStep }) => {
  switch (currentStep) {
  case 0:
    return <MachanicalIndex />;
  case 1:
    return <MachanicalRecord />;
  }
  return null;
};
CalibrationMachanicalStepComponent.propTypes = {
  currentStep: PropTypes.number
};

const CalibrationMachanical = props => {
  const {
    onCloseCards,
    onDrag,
    onStartDrag,
    onEndDrag,
    onNextStep,
    onPrevStep,
    step,
    totalSteps,
    intl
  } = props;
  let { x, y } = props;
  if (x === 0 && y === 0) {
    // initialize positions
    const widthCard = 600;
    x = (window.innerWidth - widthCard) / 2;
    y = window.innerHeight / 4;
  }
  return (
    <Draggable
      bounds="parent"
      cancel="input,button,canvas"
      onDrag={onDrag}
      onStart={onStartDrag}
      onStop={onEndDrag}
      position={{ x: x, y: y }}
    >
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <CardHeader
            onCloseCards={onCloseCards}
            step={step}
            totalSteps={totalSteps}
          />
          <div className={styles.stepBody} >
            <CalibrationMachanicalStepComponent currentStep={step} />
          </div>
          <NextPrevButtons
            onNextStep={step < totalSteps - 1 ? onNextStep : null}
            onPrevStep={step > 0 ? onPrevStep : null}
          />
        </div>
      </div>
    </Draggable>
  );
};

CalibrationMachanical.propTypes = {
  intl: intlShape.isRequired,
  onCloseCards: PropTypes.func.isRequired,
  onDrag: PropTypes.func,
  onEndDrag: PropTypes.func,
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired,
  onStartDrag: PropTypes.func,
  step: PropTypes.number.isRequired,
  totalSteps: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

export {
  Calibration,
  CalibrationMachanical
};
