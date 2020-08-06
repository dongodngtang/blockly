/* eslint-disable max-len */
/* eslint-disable no-undefined */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { camera } from '../../../../lib/video/camera';
import Canvas from './canvas';
import { FormattedMessage, intlShape } from 'react-intl';
import { getUsbCamera, orderChange } from '../../utils';
import { Button, Tooltip } from 'antd';
const calibrationTypeList = ['general', 'shape', 'color'];

const tooltipMsg = (
  <FormattedMessage
    defaultMessage="Click to calibrate the background to improve the automatic recognition rate. Before and after calibration, please make sure that there are no objects in the background"
    id="gui.AI.setBackground.tip"
  />
);

// eslint-disable-next-line react/display-name
const CalibrationContentLeft = React.forwardRef((props, videoRef) => {
  const canvasRef = useRef(null);
  const [camList, setCamList] = useState([]);
  const [isHaveCamera, setIsHaveCamera] = useState(true);
  const getCutImage = () => {
    if ((props.isCut || props.isColorCut) && !props.stopFlag) {
      props.handleValidateInputChange(camera.captureImageGenerator(videoRef.current, props.isFacial)).then(() => {
        getCutImage();
      });
    }
  };
  useEffect(() => {
    camera.getCameraList().then(res => {
      // 默认选择USB摄像头
      let tempArr = res;
      const usbCamera = getUsbCamera(res);
      let constraint = undefined;
      if (usbCamera){
        constraint = {
          video: { deviceId: { exact: usbCamera[1] } },
          audio: false
        };
        tempArr = orderChange(res, usbCamera);
      }
      camera.requestStream(constraint, videoRef.current).then(() => {
        setIsHaveCamera(true);
        if (props.isCut || props.isColorCut) {
          getCutImage();
        }
      })
        .catch(() => {
          setIsHaveCamera(false);
        });
      setCamList(tempArr);
    });
    props.handleChangeStopFlag(false);

    return () => {
      setCamList([]);
      setIsHaveCamera(true);
    };
  }, []);
  
  const [storeRect, setStoreRect] = useState([]);
  useEffect(() => {
    // 如果有框定数据
    if (props.rectArray) {
      if (props.rectArray.length && canvasRef.current) {
        props.strokeCanvas(canvasRef, props.rectArray, setStoreRect);
      } else if (canvasRef.current){
        props.clearCanvas(canvasRef);
      }
    }
  }, [props.rectArray]);
  const generateClip = function(...data) {
    let temptempArr;
    if (props.isColorCut){
      temptempArr = data.slice(4);
    } else {
      temptempArr = data.slice(0, 4);
    }
    const c = camera.generateClipCanvas(...temptempArr, videoRef, props.VIDEOHEIGHT, props.VIDEOWIDTH);
    props.handleCaptureClick(props.selectIndex, c.toDataURL());
  };
  useEffect(() => () => {
    if (camera) {
      camera.stop();
    }
  }, []);

  const handleSetBackground = () => {
    props.setBackground(camera.captureImageGenerator(videoRef.current, false));
  };
  const handleChange = e => {
    const index = e.target.options.selectedIndex;
    props.changeCalibrationType(calibrationTypeList[index]);
  };
  return (
    <div className={styles.contentRight}>
      <div className={styles.header}>
        <select
          name="camera"
          onChange={e => props.handleVideoSelectClick(e, camList)}
          style={{ width: props.isFacial ? '210px' : '150px' }}
        >
          {camList.map(item => (
            <option
              key={item[1] || 'default'}
              id={item[1]}
            >{item[0] || 'default'}</option>
          ))}
        </select>
        {props.isFacial ? null : <span className={styles.cut}>
          <select
            name="calibrationType"
            style={{ width: '110px', color: '#595959' }}
            onChange={handleChange}
            value={props.calibrationType}
          >
            <option value="general">
              {props.intl.messages['gui.AI.general']}
            </option>
            <option value="shape">
              {props.intl.messages['gui.AI.shape']}
            </option>
            <option value="color">
              {props.intl.messages['gui.AI.color']}
            </option>
          </select>
        </span>}
      </div>
      <div className={styles.videoWrapper}>
        <div
          style={{
            height: `${props.VIDEOHEIGHT}px`,
            width: `${props.VIDEOWIDTH}px`,
            margin: 'auto',
            position: 'relative'
          }}
        >
          <div
            className={styles.cameraTip}
            style={{
              width: `${props.VIDEOWIDTH}px`,
              height: `${props.VIDEOHEIGHT}px`,
              display: isHaveCamera ? 'none' : 'flex'
            }}
          >
            <p style={{ margin: '0', fontWeight: 'bolder' }}>
              <FormattedMessage
                defaultMessage="Please connect the camera first!"
                description="Please connect the camera first!"
                id="gui.AI.cameraTip"
              />
            </p>
          </div>
          <div>
            <video
              height={props.VIDEOHEIGHT}
              ref={videoRef}
              width={props.VIDEOWIDTH}
              style={{ backgroundColor: '#000' }}
            />
            {(props.isCut || props.isColorCut) ? <Canvas
              canvasRef={canvasRef}
              generateClip={generateClip}
              height={props.VIDEOHEIGHT}
              storeRect={storeRect}
              width={props.VIDEOWIDTH}
            /> : null}
          </div>
        </div>
      </div>
      {
        props.isFacial ? '' : <div className={styles.setBackgroundBtn}>
          <div>
            <Tooltip
              placement="bottomRight"
              title={tooltipMsg}
              mouseEnterDelay={1}
            >
              <Button
                style={{ borderRadius: '4px' }}
                onClick={handleSetBackground}
              >
                <FormattedMessage
                  defaultMessage="Background calibration"
                  id="gui.AI.setBackground"
                />
              </Button>
            </Tooltip>
          </div>
        </div>
      }
    </div>
  );
});
  
CalibrationContentLeft.propTypes = {
  handleCaptureClick: PropTypes.func,
  isCut: PropTypes.bool,
  isColorCut: PropTypes.bool,
  handleValidateInputChange: PropTypes.func,
  rectArray: PropTypes.array,
  selectIndex: PropTypes.number,
  isFacial: PropTypes.bool,
  stopFlag: PropTypes.bool,
  handleChangeStopFlag: PropTypes.func,
  VIDEOHEIGHT: PropTypes.number,
  VIDEOWIDTH: PropTypes.number,
  strokeCanvas: PropTypes.func,
  clearCanvas: PropTypes.func,
  handleVideoSelectClick: PropTypes.func,
  setBackground: PropTypes.func,
  changeCalibrationType: PropTypes.func,
  calibrationType: PropTypes.string,
  intl: intlShape.isRequired
};

export default CalibrationContentLeft;
