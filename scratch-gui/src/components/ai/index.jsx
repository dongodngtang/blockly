import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Draggable from 'react-draggable';
import { FormattedMessage, intlShape } from 'react-intl';

import styles from './index.css';

import { Page1, Page2 } from './picSort';
import { CardHeader } from './common';
import { AIProgressBar } from '../progress-bar/progress-bar';
import { AIDlePopup } from './popup';
import { Tooltip, Button } from 'antd';
import defaultBackgroun from './ai_calibration_background.png';
const canvasNode = document.createElement('canvas');

const InTraining = (<FormattedMessage
  defaultMessage="In training..."
  description="In training..."
  id="gui.ardino.card.InTraining"
/>);
const trainingTip = (
  <FormattedMessage
    defaultMessage="Please calibrate the background first"
    id="gui.AI.training.tip"
  />
);

const CalibrationStepComponent = ({
  currentStep, imageListObj, calibrationType, changeCalibrationType, isColorCut,
  handleCaptureClick, handleDeleteImg, handleFinish, mode, setBackground, intl,
  validateImage, handleValidateInputChange, validateRes, onlyResult, onSwitchType, isCut, rectArray,
  isFacial, characterNames, handleCharacterNameChange, timeoutSeconds, isMaual, decreaseTimeout, addClass,
  stopFlag, handleChangeStopFlag, delClassificationData, isShowDlebtn, delClass
}) => {
  switch (currentStep) {
  case 0:
    return (<Page1
      characterNames={characterNames}
      handleCaptureClick={handleCaptureClick}
      handleCharacterNameChange={handleCharacterNameChange}
      handleDeleteImg={handleDeleteImg}
      imageListObj={imageListObj}
      onSwitchType={onSwitchType}
      isCut={isCut}
      isColorCut={isColorCut}
      handleValidateInputChange={handleValidateInputChange}
      rectArray={rectArray}
      isFacial={isFacial}
      addClass={addClass}
      delClass={delClass}
      stopFlag={stopFlag}
      handleChangeStopFlag={handleChangeStopFlag}
      delClassificationData={delClassificationData}
      isShowDlebtn={isShowDlebtn}
      setBackground={setBackground}
      calibrationType={calibrationType}
      changeCalibrationType={changeCalibrationType}
      intl={intl}
    />);
  case 1:
    return (
      <Page2
        characterNames={characterNames}
        handleValidateInputChange={handleValidateInputChange}
        mode={mode}
        validateImage={validateImage}
        validateRes={validateRes}
        handleFinish={handleFinish}
        onlyResult={onlyResult}
        isCut={isCut}
        isColorCut={isColorCut}
        rectArray={rectArray}
        isFacial={isFacial}
        timeoutSeconds={timeoutSeconds}
        decreaseTimeout={decreaseTimeout}
        isMaual={isMaual}
        stopFlag={stopFlag}
        handleChangeStopFlag={handleChangeStopFlag}
      />
    );
  }
  return null;
};
CalibrationStepComponent.propTypes = {
  characterNames: PropTypes.array,
  currentStep: PropTypes.number,
  handleCaptureClick: PropTypes.func,
  handleCharacterNameChange: PropTypes.func,
  handleDeleteImg: PropTypes.func,
  handleValidateInputChange: PropTypes.func,
  handleFinish: PropTypes.func,
  imageListObj: PropTypes.any,
  mode: PropTypes.number,
  validateImage: PropTypes.string,
  validateRes: PropTypes.array,
  onlyResult: PropTypes.bool,
  onSwitchType: PropTypes.func,
  isCut: PropTypes.bool,
  isColorCut: PropTypes.bool,
  rectArray: PropTypes.array,
  isFacial: PropTypes.bool,
  timeoutSeconds: PropTypes.number,
  isMaual: PropTypes.bool,
  decreaseTimeout: PropTypes.func,
  addClass: PropTypes.func,
  stopFlag: PropTypes.bool,
  handleChangeStopFlag: PropTypes.func,
  delClassificationData: PropTypes.func,
  isShowDlebtn: PropTypes.bool,
  delClass: PropTypes.func,
  setBackground: PropTypes.func,
  changeCalibrationType: PropTypes.func,
  calibrationType: PropTypes.string,
  intl: intlShape.isRequired
};

const AI = props => {
  const {
    onCloseCards,
    onDrag,
    onStartDrag,
    onEndDrag,
    onPrevStep,
    step,
    totalSteps,
    imageListObj,
    handleCaptureClick,
    handleDeleteImg,
    handleDeleteTab,
    handleModeChange,
    handleFinish,
    handleValidateInputChange,
    validateImage,
    validateRes,
    handleTraining,
    handleCharacterNameChange,
    onSwitchType,
    isCut,
    isFacial,
    characterNames,
    onlyResult,
    rectArray,
    timeoutSeconds,
    decreaseTimeout,
    isMaual,
    x,
    y,
    headTitle,
    addClass,
    stopFlag,
    handleChangeStopFlag,
    isTraining,
    isShowLoading,
    hanndleChangeIsShowSavePopup,
    delClassificationData,
    isShowDlePopup,
    isShowDlebtn,
    delClass,
    setBackground,
    isSetBackground,
    calibrationType,
    changeCalibrationType,
    isColorCut,
    intl
  } = props;
  const onHandleFinish = () => {
    handleFinish();
    hanndleChangeIsShowSavePopup(true);
    setTimeout(() => {
      hanndleChangeIsShowSavePopup(false);
    }, 500);
  };
  useEffect(() => {
    if (!isSetBackground){
      const ctx = canvasNode.getContext('2d');
      const image = document.createElement('img');
      image.src = defaultBackgroun;
      image.onload = () => {
        canvasNode.height = image.height;
        canvasNode.width = image.width;
        ctx.drawImage(image, 0, 0);
        setBackground(canvasNode.toDataURL('image/jpeg'), true);
      };
    }
  }, []);

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
            headTitle={headTitle}
            onCloseCards={onCloseCards}
            step={step}
            totalSteps={totalSteps}
          />
          <div className={styles.stepBody} >
            <CalibrationStepComponent
              characterNames={characterNames}
              currentStep={step}
              handleCaptureClick={handleCaptureClick}
              handleCharacterNameChange={handleCharacterNameChange}
              handleDeleteImg={handleDeleteImg}
              handleDeleteTab={handleDeleteTab}
              handleModeChange={handleModeChange}
              handleValidateInputChange={handleValidateInputChange}
              imageListObj={imageListObj}
              validateImage={validateImage}
              validateRes={validateRes}
              rectArray={rectArray}
              handleFinish={handleFinish}
              onlyResult={onlyResult}
              onSwitchType={onSwitchType}
              isCut={isCut}
              isColorCut={isColorCut}
              isFacial={isFacial}
              timeoutSeconds={timeoutSeconds}
              decreaseTimeout={decreaseTimeout}
              isMaual={isMaual}
              addClass={addClass}
              delClass={delClass}
              stopFlag={stopFlag}
              handleChangeStopFlag={handleChangeStopFlag}
              delClassificationData={delClassificationData}
              isShowDlebtn={isShowDlebtn}
              setBackground={setBackground}
              calibrationType={calibrationType}
              changeCalibrationType={changeCalibrationType}
              intl={intl}
            />
            <div className={styles.contentRightBottom}>
              <Button
                style={{ visibility: isTraining ? 'hidden' : 'visible', padding: '0 45px' }}
                onClick={onPrevStep}
              >
                <FormattedMessage
                  defaultMessage="< Return"
                  description="< Return"
                  id="gui.ardino.card.return"
                />
              </Button>
              {
                isTraining ?
                  <Tooltip title={isSetBackground ? '' : trainingTip}>
                    <Button
                      onClick={handleTraining}
                      type="primary"
                      style={{ padding: '0 45px' }}
                      disabled={isFacial ? false : !isSetBackground}
                    >
                      <FormattedMessage
                        defaultMessage="Training model >"
                        description="Training model >"
                        id="gui.ardino.card.TrainingModel"
                      />
                    </Button>
                  </Tooltip> :
                  <Button
                    onClick={onHandleFinish}
                    type="primary"
                    style={{ padding: '0 45px' }}
                  >
                    <FormattedMessage
                      defaultMessage="finish"
                      description="finish"
                      id="gui.arduinokit.finish"
                    />
                  </Button>
              }
            </div>
          </div>
        </div>
        {
          isShowLoading ? <AIProgressBar
            text={InTraining}
          /> : ''
        }
        {
          isShowDlePopup ? <AIDlePopup /> : ''
        }
      </div>
    </Draggable>
  );
};

AI.propTypes = {
  characterNames: PropTypes.array,
  handleCaptureClick: PropTypes.func,
  handleCharacterNameChange: PropTypes.func,
  handleDeleteImg: PropTypes.func,
  handleDeleteTab: PropTypes.func,
  handleModeChange: PropTypes.func,
  handleValidateInputChange: PropTypes.func,
  handleFinish: PropTypes.func,
  imageListObj: PropTypes.any,
  onCloseCards: PropTypes.func.isRequired,
  onDrag: PropTypes.func,
  onEndDrag: PropTypes.func,
  onPrevStep: PropTypes.func.isRequired,
  onStartDrag: PropTypes.func,
  step: PropTypes.number.isRequired,
  totalSteps: PropTypes.number,
  rectArray: PropTypes.array,
  validateImage: PropTypes.string,
  validateRes: PropTypes.array,
  x: PropTypes.number,
  y: PropTypes.number,
  handleTraining: PropTypes.func,
  onlyResult: PropTypes.bool,
  onSwitchType: PropTypes.func,
  isCut: PropTypes.bool,
  isColorCut: PropTypes.bool,
  isFacial: PropTypes.bool,
  timeoutSeconds: PropTypes.number,
  isMaual: PropTypes.bool,
  decreaseTimeout: PropTypes.func,
  headTitle: PropTypes.object,
  addClass: PropTypes.func,
  stopFlag: PropTypes.bool,
  handleChangeStopFlag: PropTypes.func,
  isTraining: PropTypes.bool,
  isShowLoading: PropTypes.bool,
  hanndleChangeIsShowSavePopup: PropTypes.func,
  delClassificationData: PropTypes.func,
  isShowDlePopup: PropTypes.bool,
  isShowDlebtn: PropTypes.bool,
  isSetBackground: PropTypes.bool,
  delClass: PropTypes.func,
  setBackground: PropTypes.func,
  changeCalibrationType: PropTypes.func,
  calibrationType: PropTypes.string,
  intl: intlShape.isRequired
};


export {
  AI
};
