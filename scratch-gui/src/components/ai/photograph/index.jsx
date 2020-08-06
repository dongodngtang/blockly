/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { FormattedMessage } from 'react-intl';
import styles from './index.css';
import closeIcon from '../icon--close.svg';
import helpIcon from '../../../lib/assets/icon--tutorials.svg';
import { camera } from '../../../lib/video/camera';
import { AIAutoFinish, showOnlyAIRes, NOPHOTORECOGNITION } from '../../../lib/events';
import { getUsbCamera, orderChange } from '../utils';

const countdown = (<FormattedMessage
  defaultMessage="Countdown"
  id="gui.AI.countdown"
/>);
const closeMessage = (<FormattedMessage
  defaultMessage="Close"
  description="Title for button to close how-to card"
  id="gui.cards.close"
/>);
const takePhoto = (<FormattedMessage
  defaultMessage="Take Photo"
  id="gui.AI.takePhoto"
/>);

const classificationType = (<FormattedMessage
  defaultMessage="Classification Type:"
  id="gui.AI.classificationType"
/>);

const manualDataClassification = (<FormattedMessage
  defaultMessage="Manual Data Classification"
  id="gui.AI.manualDataClassification"
/>);

const classificationResult = (<FormattedMessage
  defaultMessage="Classification Result:"
  id="gui.AI.classificationResult"
/>);

const automaticCuttingClassification = (<FormattedMessage
  defaultMessage="Automatic Cutting Classification"
  id="gui.AI.automaticCuttingClassification"
/>);

const ObjectFront = (<FormattedMessage
  defaultMessage="Object"
  id="gui.AI.ObjectFront"
/>);

const ObjectEnd = (<FormattedMessage
  id="gui.AI.ObjectEnd"
/>);

let videoRef;
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

const VIDEOHEIGHT = 200;
const VIDEOWIDTH = 267;

const clearCanvas = function(canvasRef) {
  const context = canvasRef.current.getContext('2d');
  context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
};


const strokeCanvas = function(canvasRef, rectArray, color = 'orange', clear = true) {
  const context = canvasRef.current.getContext('2d');
  if (clear) clearCanvas(canvasRef);
  context.strokeStyle = color;
  context.lineWidth = 4;
  context.beginPath();
  rectArray.forEach(arr => {
    const tempArr = arr.slice(0, 4);
    context.rect(...tempArr);
    context.stroke();
  });
};


const CardHeader = ({ closePopup }) => (
  <div className={styles.headerButtons}>
    <div
      className={styles.allButton}
    >
      <img
        className={styles.helpIcon}
        src={helpIcon}
      />
      {takePhoto}
    </div>
    <button
      className={styles.removeButton}
      onClick={closePopup}
    >
      {closeMessage}
      <img
        className={styles.closeIcon}
        src={closeIcon}
      />
    </button>
  </div>
);


// eslint-disable-next-line react/display-name
const CountComponent = React.memo(props => {
  if (props.current > 0 && props.isCamOpen) {
    setTimeout(props.decreaseTimeout, 1000);
  }
  return (
    <div className={styles.text}>
      <p>{countdown}{'：'}{props.current}</p>
    </div>
  );
});

CountComponent.propTypes = {
  current: PropTypes.number.isRequired,
  decreaseTimeout: PropTypes.func.isRequired,
  isCamOpen: PropTypes.bool
};


export const AIPhotograph = props => {
  const {
    onDrag,
    onStartDrag,
    onEndDrag,
    x,
    y,
    handleFinish,
    isCut,
    timeoutSeconds,
    decreaseTimeout,
    isMaual,
    smallImgClass,
    isShowSmallImg,
    cutSmallImgList,
    isShowSmallCutImgs,
    cutClassNames,
    selectCamera,
    handleSetSelectcamera,
    isColorCut,
    cutColorClassNames
  } = props;
  videoRef = useRef();
  const canvasRef = useRef(null);
  const [camList, setCamList] = useState([]);
  const [smallPhoto, setSmallPhoto] = useState('');
  const [isCamOpen, setIsCamOpen] = useState(false); // 用于摄像头调用成功后开始计时
  const [rectArray, setrectArray] = useState([]);
  // 拍照积木逻辑回调
  const blockStoreImage = () => {
    camera.videoPause(videoRef.current);
    window.photo = camera.captureImageGenerator(videoRef.current);
    setSmallPhoto(window.photo);
    document.dispatchEvent(AIAutoFinish('ok'));
  };
  const handleButtonClick = function () {
    blockStoreImage();
  };
  const imgRecognition = ev => {
    const photo = ev.detail.data.picture;
    const resArray = ev.detail.data.res;
    setrectArray(resArray);
    setSmallPhoto(photo);
    const imgNode = document.createElement('img');
    imgNode.src = photo;
    imgNode.onload = () => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(imgNode, 0, 0, canvasRef.current.width, canvasRef.current.height);
    };
    
  };
  // didmount
  useEffect(() => {
    document.addEventListener(NOPHOTORECOGNITION, imgRecognition);
    camera.getCameraList().then(list => {
      let tempArr = list;
      // 默认选择USB摄像头
      // eslint-disable-next-line no-undefined
      let constraint = undefined;
      if (selectCamera.length){
        constraint = {
          video: { deviceId: { exact: selectCamera[1] } },
          audio: false
        };
        tempArr = orderChange(list, selectCamera);
      } else {
        const usbCamera = getUsbCamera(list);
        if (usbCamera){
          constraint = {
            video: { deviceId: { exact: usbCamera[1] } },
            audio: false
          };
          tempArr = orderChange(list, usbCamera);
        }
      }
      camera.requestStream(constraint, videoRef.current).then(() => {
        setIsCamOpen(true);
      });
      setCamList(tempArr);
    });
  }, []);
  // didunmount
  useEffect(() => () => {
    document.removeEventListener(NOPHOTORECOGNITION, imgRecognition);
    camera.stop();
    setSmallPhoto(null);
    setIsCamOpen(false);
    handleSetSelectcamera([]);
    setrectArray([]);
  }, []);

  // 倒计时结束
  useEffect(() => {
    if (!showOnlyAIRes || isMaual) return;
    if (timeoutSeconds === 0) {
      blockStoreImage();
    } else if (timeoutSeconds > 0) {
      videoRef.current.play();
    }
  }, [timeoutSeconds]);

  useEffect(() => {
    // strokeCanvas(canvasRef, rectArray);
  }, [rectArray]);
  
  return (
    <Draggable
      cancel="input,button,canvas,svg,select"
      onDrag={onDrag}
      onStart={onStartDrag}
      onStop={onEndDrag}
      position={{ x: x, y: y }}
    >
      <div style={{ position: 'absolute', zIndex: '6000' }}>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <CardHeader
              closePopup={handleFinish}
            />
            <div
              className={styles.cardBody}
            >
              <div className={styles.showPhoto}>
                <div
                  style={{
                    height: `${VIDEOHEIGHT}px`,
                    width: `${VIDEOWIDTH}px`
                  }}
                >
                  <video
                    height={VIDEOHEIGHT}
                    ref={videoRef}
                    width={VIDEOWIDTH}
                  />
                  {(isCut || isColorCut) ? <canvas
                    ref={canvasRef}
                    height={VIDEOHEIGHT}
                    width={VIDEOWIDTH}
                    style={{ position: 'absolute', left: '18px' }}
                  /> : null}
                </div>
                <div className={styles.right}>
                  <select
                    style={{ width: '200px', height: '20px' }}
                    name="camera"
                    onChange={e => handleVideoSelectClick(e, camList)}
                  >
                    {camList.map(item => (
                      <option
                        key={item[1] || 'default'}
                        id={item[1]}
                      >{item[0] || 'default'}</option>
                    ))}
                  </select>
                  {
                    isMaual ?
                      '' : <CountComponent
                        current={timeoutSeconds}
                        decreaseTimeout={decreaseTimeout}
                        isCamOpen={isCamOpen}
                      />
                  }
                  <button
                    style={{ display: isMaual && !isCut ? 'block' : 'none' }}
                    onClick={handleButtonClick}
                    className={styles.btn}
                  >{takePhoto}</button>
                  
                </div>
              </div>
              <ul
                className={styles.thumbnailList}
                style={{ display: (smallPhoto && isShowSmallImg) ? 'block' : 'none' }}
              >
                <li>
                  <img
                    src={smallPhoto}
                    alt="缩略图"
                  />
                  <div className={styles.distinguish}>
                    <p>{classificationType}{manualDataClassification}</p>
                    <p>{classificationResult}{smallImgClass}</p>
                  </div>
                </li>
              </ul>
              <ul
                className={styles.thumbnailList}
                style={{ display: (smallPhoto && isShowSmallCutImgs) ? 'block' : 'none' }}
              >
                {
                  cutSmallImgList.map((item, index) => (
                    <li key={index}>
                      <img
                        src={item.img}
                        alt="缩略图"
                      />
                      <div style={{ color: '#fff' }}>
                        {ObjectFront}{index + 1}{ObjectEnd}
                      </div>
                      <div className={styles.distinguish}>
                        <p>{classificationType}{automaticCuttingClassification}</p>
                        <p>{classificationResult}{isColorCut ? cutColorClassNames[item.type] : cutClassNames[item.type]}</p>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    </Draggable>
  );
};

CardHeader.propTypes = {
  closePopup: PropTypes.func
};

AIPhotograph.propTypes = {
  onDrag: PropTypes.func,
  onEndDrag: PropTypes.func,
  onStartDrag: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number,
  handleFinish: PropTypes.func,
  isCut: PropTypes.bool,
  isColorCut: PropTypes.bool,
  timeoutSeconds: PropTypes.number,
  isMaual: PropTypes.bool,
  decreaseTimeout: PropTypes.func,
  smallImgClass: PropTypes.string,
  isShowSmallImg: PropTypes.bool,
  cutSmallImgList: PropTypes.array,
  isShowSmallCutImgs: PropTypes.bool,
  cutClassNames: PropTypes.array,
  cutColorClassNames: PropTypes.array,
  selectCamera: PropTypes.array,
  handleSetSelectcamera: PropTypes.func
};
