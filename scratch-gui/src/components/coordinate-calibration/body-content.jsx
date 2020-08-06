/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React, { Fragment, useRef, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import VM from 'scratch-vm';
import styles from './index.css';

import assemblyDrawing1 from './images/assembDlrawing1.jpg';
import assemblyDrawing2 from './images/assembDlrawing2.jpg';
import assemblyDrawing3 from './images/assembDlrawing3.jpg';

import DeviceControlPane from '../device-control-pane/device-control-pane.jsx';
import { detectClient } from '../../lib/detect-client';
import { camera } from '../../lib/video/camera.js';
import {
  clearCanvas,
  strokeCanvas,
  strokeBorderCanvas
} from './util';
import { getUsbCamera } from '../ai/utils';

const titleListOne = (<FormattedMessage
  defaultMessage="Please change the end-tool to suction cup."
  description="Please change the end-tool to suction cup."
  id="gui.coordinateCalibration.titleListOne"
/>);
const titleListToo = (<FormattedMessage
  defaultMessage="Please place the device and click Next, Magician Lite will move to the camera calibration point."
  description="Please place the device and click Next, Magician Lite will move to the camera calibration point."
  id="gui.coordinateCalibration.titleListToo"
/>);
const titleListThree = (<FormattedMessage
  defaultMessage="Please place the calibration card in the middle of the camera's view."
  description="Please place the calibration card in the middle of the camera's view."
  id="gui.coordinateCalibration.titleListThree"
/>);
const titleListFour = (<FormattedMessage
  defaultMessage="Please use the jog control button on the right to move the suction cup to the calibration point A, and then click Next."
  description="Please use the jog control button on the right to move the suction cup to the calibration point A, and then click Next."
  id="gui.coordinateCalibration.titleListFour"
/>);
const titleListFives = (<FormattedMessage
  defaultMessage="Please use the jog control button on the right to move the suction cup to the calibration point B, and then click Next."
  description="Please use the jog control button on the right to move the suction cup to the calibration point B, and then click Next."
  id="gui.coordinateCalibration.titleListFives"
/>);
const titleListSix = (<FormattedMessage
  defaultMessage="Please use the jog control button on the right to move the suction cup to the calibration point C, and then click Next."
  description="Please use the jog control button on the right to move the suction cup to the calibration point C, and then click Next."
  id="gui.coordinateCalibration.titleListSix"
/>);
const titleListSeven = (<FormattedMessage
  defaultMessage="Please use the jog control button on the right to move the suction cup to the calibration point D, and then click Next."
  description="Please use the jog control button on the right to move the suction cup to the calibration point D, and then click Next."
  id="gui.coordinateCalibration.titleListSeven"
/>);

const textListOne = (<FormattedMessage
  defaultMessage="Note: Magician Lite needs a certain range of space to move to the camera calibration point. Please make sure there are no obstacles in the working space."
  description="Note: Magician Lite needs a certain range of space to move to the camera calibration point. Please make sure there are no obstacles in the working space."
  id="gui.coordinateCalibration.textListOne"
/>);

const textListToo = (<FormattedMessage
  defaultMessage="Note: Please place the calibration card according to the blue frame as shown in the screen. When the four calibration points A, B, C, and D appear on the screen, fix the position of the calibration card."
  description="Note: Please place the calibration card according to the blue frame as shown in the screen. When the four calibration points A, B, C, and D appear on the screen, fix the position of the calibration card."
  id="gui.coordinateCalibration.textListToo"
/>);

const titleList = [
  titleListOne,
  titleListToo,
  titleListThree,
  titleListFour,
  titleListFives,
  titleListSix,
  titleListSeven
];
  
const textList = [
  textListOne,
  textListToo
];

const VIDEOHEIGHT = 210;
const VIDEOWIDTH = 278;

const dataArrays = ['X', 'Y', 'Z', 'R', 'L', 'J'];
let videoRef;
let canvasRef;
let borderCanvasRef;

const Title = ({ step }) => (
  <div className={styles.title}>
    <span className={styles.num}>{step + 1}</span><p>{titleList[step]}</p>
  </div>
);

Title.propTypes = {
  step: PropTypes.number
};


const ContentLeft = ({
  step,
  calibrationValidateImg,
  stopFlag,
  changeStopFlag,
  nextBtnDisable,
  changeNextBtnDisable,
  isShowClosePopup
}) => (
  <Fragment>
    {
      step <= 1 ? (<img
        style={{ width: VIDEOWIDTH, height: VIDEOHEIGHT }}
        src={step === 0 ? assemblyDrawing1 : assemblyDrawing3}
        alt=""
      />) : <View
        calibrationValidateImg={calibrationValidateImg}
        stopFlag={stopFlag}
        changeStopFlag={changeStopFlag}
        nextBtnDisable={nextBtnDisable}
        changeNextBtnDisable={changeNextBtnDisable}
        step={step}
        isShowClosePopup={isShowClosePopup}
      />
    }
     
  </Fragment>
);

ContentLeft.propTypes = {
  step: PropTypes.number,
  calibrationValidateImg: PropTypes.func,
  stopFlag: PropTypes.bool,
  changeStopFlag: PropTypes.func,
  nextBtnDisable: PropTypes.bool,
  changeNextBtnDisable: PropTypes.func,
  isShowClosePopup: PropTypes.bool
};


let flag;
let getCalibrationValidateImg;
let isWillUnmount;
let resArr;
let stopStrokFlag;
let isCameraOpen;

const View = ({
  stopFlag,
  changeStopFlag,
  calibrationValidateImg,
  nextBtnDisable,
  changeNextBtnDisable,
  step,
  isShowClosePopup
}) => {
  flag = stopFlag; // 控制请求函数停止与否
  isWillUnmount = isShowClosePopup;
  videoRef = useRef();
  canvasRef = useRef(null);
  borderCanvasRef = useRef(null);

  // didmount
  useEffect(() => {
    getCalibrationValidateImg = () => {
      if (!flag){
        calibrationValidateImg(camera.captureImageGenerator(videoRef.current))
          .then(res => {
            if (res && res.length && !stopStrokFlag){
              strokeCanvas(canvasRef, res);
              resArr = res;
            } else if (!stopStrokFlag){
              clearCanvas(canvasRef);
            }
            if (res && res.length && nextBtnDisable){
              changeNextBtnDisable(false);
            } else {
              changeNextBtnDisable(true);
            }
            if (!isWillUnmount){
              getCalibrationValidateImg();
            }
          });
      }
    };

    camera.getCameraList().then(list => {
      // 默认选择USB摄像头
      const usbCamera = getUsbCamera(list);
      // eslint-disable-next-line no-undefined
      let constraint = undefined;
      if (usbCamera){
        constraint = {
          video: { deviceId: { exact: usbCamera[1] } },
          audio: false
        };
      }
      camera.requestStream(constraint, videoRef.current).then(() => {
        isCameraOpen = true;
        strokeBorderCanvas(borderCanvasRef);
        getCalibrationValidateImg();
      });
    });
    
    return () => {
      camera.stop();
      changeStopFlag(true);
      stopStrokFlag = null;
      isCameraOpen = null;
    };
  }, []);

  // update
  useEffect(() => {
    if (step > 2){
      camera.videoPause(videoRef.current);
      if (!stopStrokFlag){
        stopStrokFlag = true;
      }
      strokeCanvas(canvasRef, resArr, step, false);
    } else if (step === 2 && isCameraOpen){
      camera.videoResume(videoRef.current);
      stopStrokFlag = false;
      getCalibrationValidateImg();
    }

  }, [step]);


  return (
    <div style={{ position: 'relative' }}>
      <video
        height={VIDEOHEIGHT}
        ref={videoRef}
        width={VIDEOWIDTH}
        style={{ background: ' #ccc' }}
      />
      <canvas
        height={VIDEOHEIGHT}
        id="canvas"
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: '0',
          left: '0'
        }}
        width={VIDEOWIDTH}
      />
      <canvas
        height={VIDEOHEIGHT}
        id="canvas"
        ref={borderCanvasRef}
        style={{
          position: 'absolute',
          top: '0',
          left: '0'
        }}
        width={VIDEOWIDTH}
      />
    </div>);
};


View.propTypes = {
  step: PropTypes.number,
  calibrationValidateImg: PropTypes.func,
  stopFlag: PropTypes.bool,
  changeStopFlag: PropTypes.func,
  nextBtnDisable: PropTypes.bool,
  changeNextBtnDisable: PropTypes.func,
  isShowClosePopup: PropTypes.bool
};

const ContentRight = ({ step, vm }) => {

  const handleMouseUp = () => {
    const deviceId = vm.editingTarget.id;
    const extensionId = vm.editingTarget.deviceName;
    if (detectClient().isPC) {
      document.removeEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('touchend', handleMouseUp);
    }
    vm.runtime.peripheralExtensions[extensionId].setJOGcmd(0, deviceId);
    return;
  };

  // 点动
  const handleMouseDown = mouseDownEvent => {
    const extensionId = vm.editingTarget.deviceName;
    const deviceId = vm.editingTarget.id;
    if (dataArrays.includes(mouseDownEvent.target.textContent[0])) {
      const content = mouseDownEvent.target.textContent;
      if (extensionId === 'magician') {
        vm.runtime.peripheralExtensions.magician.setJOGcmd(
          content,
          deviceId
        );
      } else if (extensionId === 'magicianlite') {
        vm.runtime.peripheralExtensions.magicianlite.setJOGcmd(
          content,
          deviceId
        );
      } else if (extensionId === 'controller') {
        vm.runtime.peripheralExtensions.controller.setJOGcmd(
          content,
          deviceId
        );
      }
    }
    if (detectClient().isPC) {
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.addEventListener('touchend', handleMouseUp);
    }
    return;
  };
 
  return (
    <div>
      {
        step === 0 ? (<img
          style={{ width: VIDEOWIDTH, height: VIDEOHEIGHT }}
          src={assemblyDrawing2}
          alt=""
        />) : step > 2 ? (<div style={{ width: VIDEOWIDTH, height: VIDEOHEIGHT, position: 'relative' }}>
          <div className={styles.controlBtn}>
            <DeviceControlPane.DeviceCircleControl
              onHandleMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              isUseJoint={false}
            />
          </div>
          <p className={styles.tipsText}>
            <FormattedMessage
              defaultMessage="Note: Do not move the calibration card!"
              id="gui.coordinateCalibration.DoNotMove"
            />
          </p>
        </div>) :
          (<div
            style={{ width: VIDEOWIDTH, height: VIDEOHEIGHT }}
            className={styles.textContainer}
          >
            <p className={styles.text}> {textList[step - 1]}</p>
          </div>)
      }
       
    </div>
  );
};

ContentRight.propTypes = {
  step: PropTypes.number,
  vm: PropTypes.instanceOf(VM).isRequired
};


const ContentContainer = ({
  step,
  vm,
  calibrationValidateImg,
  stopFlag,
  changeStopFlag,
  nextBtnDisable,
  changeNextBtnDisable,
  isShowClosePopup
}) =>
  (<div className={styles.contentContainer}>
    <ContentLeft
      step={step}
      calibrationValidateImg={calibrationValidateImg}
      stopFlag={stopFlag}
      changeStopFlag={changeStopFlag}
      nextBtnDisable={nextBtnDisable}
      changeNextBtnDisable={changeNextBtnDisable}
      isShowClosePopup={isShowClosePopup}
    />
    <ContentRight
      step={step}
      vm={vm}
    />
  </div>);

ContentContainer.propTypes = {
  step: PropTypes.number,
  vm: PropTypes.instanceOf(VM).isRequired,
  calibrationValidateImg: PropTypes.func,
  stopFlag: PropTypes.bool,
  changeStopFlag: PropTypes.func,
  nextBtnDisable: PropTypes.bool,
  changeNextBtnDisable: PropTypes.func,
  isShowClosePopup: PropTypes.bool
};

export {
  Title,
  ContentContainer
};
