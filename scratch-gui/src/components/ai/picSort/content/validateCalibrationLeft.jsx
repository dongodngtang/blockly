/* eslint-disable no-undefined */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { camera } from '../../../../lib/video/camera';
import { FormattedMessage } from 'react-intl';
import { CountComponent } from '../timeoutCount';
import { AIAutoFinish, showOnlyAIRes } from '../../../../lib/events';
import ValidateCalibrationRes from './validateCalibrationRight.jsx';
import { getUsbCamera, orderChange } from '../../utils';

let stopValidateFlag = false;
const COLOR = ['red', 'yellow', 'blue', 'green'];

// eslint-disable-next-line react/display-name
const ValidateCalibrationLeft = props => {
  const videoRef = useRef();
  const { handleValidateInputChange, validateRes, handleFinish, onlyResult, isColorCut,
    isCut, rectArray, characterNames, isFacial, timeoutSeconds, isMaual, decreaseTimeout } = props;
  const [isShowLoading, setIsShowLoading] = useState(false);
  const imageRef = useRef(null);
  const [isShowTestBtn, setIsShowTestBtn] = useState(false);
  const canvasRef = useRef(null);
  let isdidunmount = false;
  // 开始捕获数据
  let startCapture = () => {
    // 如果没有切割数据
    if (stopValidateFlag) return;
    setIsShowLoading(true);
    handleValidateInputChange(camera.captureImageGenerator(videoRef.current, isFacial)).then(() => {
      // 如果没被置为空 人脸识别需手动点击按钮
      if (startCapture && !isFacial) {
        if (isFacial) {
          // 降低人脸识别的频率, 要钱啊!
          setTimeout(startCapture, 1000);
        } else {
          // 不要钱, 随便调
          startCapture();
        }
      }
      if (!isdidunmount) setIsShowLoading(false);
    });
  };
  const [camList, setCamList] = useState([]);
  // 拍照积木逻辑回调
  const blockStoreImage = () => {
    videoRef.current.pause();
    window.photo = camera.captureImageGenerator(videoRef.current);
    document.dispatchEvent(AIAutoFinish('ok'));
  };
  const handleButtonClick = function () {
    camera.videoPause(videoRef.current);
    startCapture = null;
    if (onlyResult) {
      handleValidateInputChange(camera.captureImageGenerator(videoRef.current));
    } else if (isMaual){
      blockStoreImage();
    } else {
      rectArray.map(arr => {
        const tempArr = arr.slice(0, 4);
        const tempImage = camera.generateClipCanvas(...tempArr,
          videoRef, props.VIDEOHEIGHT, props.VIDEOWIDTH).toDataURL();
        handleValidateInputChange(tempImage, true).then(index => {
          props.strokeCanvas(canvasRef, [arr], () => {}, COLOR[index], false);
        });
      });
    }
    stopValidateFlag = true;
  };
  // 判断是否是自动分割积木
  const isCutRecognizeBlock = (isCut || isColorCut) && isMaual && !onlyResult;
  const cutAndDraw = () => {
    handleValidateInputChange(window.photo, false, true).then(detectRect => {
      handleValidateInputChange(window.photo, false).then(drawRect => {
        detectRect.map((arr, index) => {
          camera.generateClipImageBase64(...arr, window.photo).then(tempImage => {
            handleValidateInputChange(tempImage, true).then(res => {
              props.strokeCanvas(canvasRef, [drawRect[index]], () => {}, COLOR[res], false);
              document.dispatchEvent(AIAutoFinish('ok'));
            });
          });
        });
      });
    });
  };
  // update
  useEffect(() => {
    if (isCutRecognizeBlock) {
      cutAndDraw();
    }
  }, [isMaual]);
  // didmount
  useEffect(() => {
    if (isCutRecognizeBlock) {
      return;
    }
    camera.getCameraList().then(list => {
      let tempArr = list;
      // 默认选择USB摄像头
      const usbCamera = getUsbCamera(list);
      let constraint = undefined;
      if (usbCamera){
        constraint = {
          video: { deviceId: { exact: usbCamera[1] } },
          audio: false
        };
        tempArr = orderChange(list, usbCamera);
      }
      camera.requestStream(constraint, videoRef.current).then(() => {
        startCapture();
        setIsShowTestBtn(true);
      });
      setCamList(tempArr);
    });
    stopValidateFlag = false;
  }, []);
  // didunmount
  useEffect(() => () => {
    if (isCutRecognizeBlock) {
      return;
    }
    startCapture = null;
    camera.stop();
    setIsShowTestBtn(false);
    isdidunmount = true;
  }, []);

  // rectArray 变化时
  useEffect(() => {
    // 如果有框定数据
    if (!rectArray) return;

    if (rectArray.length && canvasRef.current && !stopValidateFlag) {
      props.strokeCanvas(canvasRef, rectArray, () => {});
    }
  }, [rectArray]);

  // 倒计时结束
  useEffect(() => {
    if (!showOnlyAIRes || isMaual) return;
    if (timeoutSeconds === 0) {
      blockStoreImage();
    } else if (timeoutSeconds === 3) {
      videoRef.current.play();
    }
  }, [timeoutSeconds]);
  return (
    <div className={styles.validateWrapper}>
      <div className={styles.validateRight}>
        <div className={styles.validatePreview}>
          <div className={styles.previewImg}>
            {isCutRecognizeBlock ? null : <div style={{ display: 'flex' }}>
              <select
                name="camera"
                onChange={e => props.handleVideoSelectClick(e, camList)}
              >
                {camList.map(item => (
                  <option key={item[1] || 'default'}>{item[0] || 'default'}</option>
                ))}
              </select>
              {(isCut || isColorCut) ? <button onClick={handleButtonClick}>
                <FormattedMessage
                  defaultMessage="Screenshot cut"
                  description="Screenshot cut"
                  id="gui.ardino.card.ScreenshotCut"
                />
              </button> : null}
              {isMaual ? <button onClick={handleButtonClick}>
                <FormattedMessage
                  defaultMessage="Take Photo"
                  description="Take Photo"
                  id="gui.cameraModal.takePhoto"
                />
              </button> : null}
            </div>}
            <div style={{ position: 'relative' }}>
              {isCutRecognizeBlock ? <img
                src={window.photo}
                ref={imageRef}
                height={props.VIDEOHEIGHT}
                width={props.VIDEOWIDTH}
              /> : <video
                height={props.VIDEOHEIGHT}
                ref={videoRef}
                width={props.VIDEOWIDTH}
              />}
              {(isCut || isColorCut) ? <canvas
                ref={canvasRef}
                height={props.VIDEOHEIGHT}
                width={props.VIDEOWIDTH}
                style={{ position: 'absolute', left: 0 }}
              /> : null}
            </div>
            
          </div>
        </div>
        {onlyResult ? <div style={{ flex: 1 }}>
          <CountComponent
            current={timeoutSeconds}
            decreaseTimeout={decreaseTimeout}
          />
        </div> : <ValidateCalibrationRes
          COLOR={COLOR}
          validateRes={validateRes}
          handleFinish={handleFinish}
          characterNames={characterNames}
          isCut={isCut}
          isColorCut={isColorCut}
          timeoutSeconds={timeoutSeconds}
          isMaual={isMaual}
          isFacial={isFacial}
          isShowTestBtn={isShowTestBtn}
          startCapture={startCapture}
          isShowLoading={isShowLoading}
        />}
      </div>
      
    </div>
  );
};
ValidateCalibrationLeft.propTypes = {
  handleValidateInputChange: PropTypes.func,
  handleFinish: PropTypes.func,
  validateRes: PropTypes.array,
  onlyResult: PropTypes.bool,
  isCut: PropTypes.bool,
  isColorCut: PropTypes.bool,
  rectArray: PropTypes.array,
  characterNames: PropTypes.array,
  isFacial: PropTypes.bool,
  timeoutSeconds: PropTypes.number,
  isMaual: PropTypes.bool,
  decreaseTimeout: PropTypes.func,
  VIDEOHEIGHT: PropTypes.number,
  VIDEOWIDTH: PropTypes.number,
  strokeCanvas: PropTypes.func,
  handleVideoSelectClick: PropTypes.func
};

export default ValidateCalibrationLeft;
