import React, { Fragment, useState, useRef } from 'react';
import styles from './index.css';
import PropTypes from 'prop-types';
import CalibrationContentRight from './content/calibrationContentRight.jsx';
import CalibrationContentLeft from './content/calibrationContentLeft.jsx';
import ValidateCalibrationLeft from './content/validateCalibrationLeft.jsx';
import { PageHeader } from '../common';
import infoIcon from './icon-test.png';
import { FormattedMessage, intlShape } from 'react-intl';
import { camera } from '../../../lib/video/camera';

const VIDEOHEIGHT = 200;
const VIDEOWIDTH = 267;

const clearCanvas = function(canvasRef) {
  const context = canvasRef.current.getContext('2d');
  context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
};

const strokeCanvas = function(canvasRef, recArray, setStoreRect, color = 'orange', clear = true) {
  const context = canvasRef.current.getContext('2d');
  if (clear) clearCanvas(canvasRef);
  context.strokeStyle = color;
  context.lineWidth = 4;
  context.beginPath();
  const tempRect = [];
  recArray.forEach(arr => {
    const tempArr = [...arr];
    const temptempArr = tempArr.slice(0, 4);
    context.rect(...temptempArr);
    tempRect.push(tempArr);
    setStoreRect(tempRect);
    context.stroke();
  });
};

const handleVideoSelectClick = (e, camList) => {
  camera.stop();
  const index = e.target.options.selectedIndex;
  const id = camList[index][1];
  const constraint = {
    video: { deviceId: { exact: id } },
    audio: false
  };
  camera.requestStream(constraint);
};

const Page1 = ({
  imageListObj,
  handleCaptureClick,
  handleDeleteImg,
  characterNames,
  handleCharacterNameChange,
  onSwitchType,
  isCut,
  handleValidateInputChange,
  rectArray,
  isFacial,
  addClass,
  stopFlag,
  handleChangeStopFlag,
  delClassificationData,
  isShowDlebtn,
  delClass,
  setBackground,
  changeCalibrationType,
  calibrationType,
  isColorCut,
  intl
}) => {
  const videoRef = useRef();
  const [selectIndex, setSelectIndex] = useState(0);
  const handleAddClass = () => {
    addClass();
    const index = characterNames.length - 1;
    setSelectIndex(index);
  };
  const handledelClass = idx => () => {
    delClass(idx);
    setSelectIndex(idx - 1);
  };
  
  return (
    <Fragment>
      <PageHeader step={0} />
      <div className={styles.content}>
        <CalibrationContentLeft
          VIDEOHEIGHT={VIDEOHEIGHT}
          VIDEOWIDTH={VIDEOWIDTH}
          strokeCanvas={strokeCanvas}
          clearCanvas={clearCanvas}
          handleVideoSelectClick={handleVideoSelectClick}
          onSwitchType={onSwitchType}
          isCut={isCut}
          isColorCut={isColorCut}
          handleValidateInputChange={handleValidateInputChange}
          rectArray={rectArray}
          selectIndex={selectIndex}
          handleCaptureClick={handleCaptureClick}
          isFacial={isFacial}
          stopFlag={stopFlag}
          handleChangeStopFlag={handleChangeStopFlag}
          ref={videoRef}
          setBackground={setBackground}
          calibrationType={calibrationType}
          changeCalibrationType={changeCalibrationType}
          intl={intl}
        />
        <CalibrationContentRight
          videoRef={videoRef}
          characterNames={characterNames || []}
          isCut={isCut}
          isColorCut={isColorCut}
          imageList={imageListObj || []}
          handleCaptureClick={handleCaptureClick}
          handleCharacterNameChange={handleCharacterNameChange}
          handleDeleteImg={handleDeleteImg}
          selectIndex={selectIndex}
          setSelectIndex={setSelectIndex}
          isFacial={isFacial}
          addClass={handleAddClass}
          delClass={handledelClass}
        />
        <p
          className={styles.delDate}
          onClick={delClassificationData}
          style={{ display: isShowDlebtn || isFacial ? 'block' : 'none' }}
        >
          <img src={infoIcon} />
          <span>
            <FormattedMessage
              defaultMessage="Delete categorical data"
              description="Delete categorical data"
              id="gui.ardino.card.DeleteCategoricalData"
            />
          </span>
        </p>
      </div>
    </Fragment>
  );
}
  ;
Page1.propTypes = {
  characterNames: PropTypes.array,
  handleCaptureClick: PropTypes.func,
  handleCharacterNameChange: PropTypes.func,
  handleDeleteImg: PropTypes.func,
  imageListObj: PropTypes.any,
  onSwitchType: PropTypes.func,
  isCut: PropTypes.bool,
  isColorCut: PropTypes.bool,
  handleValidateInputChange: PropTypes.func,
  rectArray: PropTypes.array,
  isFacial: PropTypes.bool,
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
const Page2 = ({
  handleValidateInputChange, validateImage, validateRes, handleFinish, onlyResult, rectArray, isCut, characterNames,
  isFacial, timeoutSeconds, isMaual, decreaseTimeout, stopFlag, handleChangeStopFlag, isColorCut
}) => (
  <div>
    <PageHeader step={1} />
    <ValidateCalibrationLeft
      VIDEOHEIGHT={VIDEOHEIGHT}
      VIDEOWIDTH={VIDEOWIDTH}
      strokeCanvas={strokeCanvas}
      clearCanvas={clearCanvas}
      handleVideoSelectClick={handleVideoSelectClick}
      handleValidateInputChange={handleValidateInputChange}
      validateImage={validateImage}
      validateRes={validateRes}
      handleFinish={handleFinish}
      onlyResult={onlyResult}
      rectArray={rectArray}
      isCut={isCut}
      isColorCut={isColorCut}
      characterNames={characterNames}
      isFacial={isFacial}
      timeoutSeconds={timeoutSeconds}
      decreaseTimeout={decreaseTimeout}
      isMaual={isMaual}
      stopFlag={stopFlag}
      handleChangeStopFlag={handleChangeStopFlag}
    />
  </div>
);
Page2.propTypes = {
  handleValidateInputChange: PropTypes.func,
  handleFinish: PropTypes.func,
  validateImage: PropTypes.string,
  validateRes: PropTypes.array,
  onlyResult: PropTypes.bool,
  rectArray: PropTypes.array,
  isCut: PropTypes.bool,
  isColorCut: PropTypes.bool,
  characterNames: PropTypes.array,
  isFacial: PropTypes.bool,
  timeoutSeconds: PropTypes.number,
  isMaual: PropTypes.bool,
  decreaseTimeout: PropTypes.func,
  stopFlag: PropTypes.bool,
  handleChangeStopFlag: PropTypes.func
};

export {
  Page1,
  Page2
};
