/* eslint-disable no-undefined */
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Canvas from './canvas';
import { camera } from '../../../../lib/video/camera';

const VIDEOHEIGHT = 200;
const VIDEOWIDTH = 266.67;
let mediaTrack;
const CalibrationContentLeft = props => {
  const handleImageAdd = e => {
    props.handleAddImage(e.target.files);
  };
  const handleDeleteImg = index => () => props.handleDeleteImg(index);
  const handleInputChange = e => {
    props.handleBlockHeightChange(e.target.value);
  };
  const handleCharacterNameChange = e => {
    props.handleCharacterNameChange(e.target.value);
  };
  return (
    <div className={styles.contentLeft}>
      <div className={styles.inputRow}>
        <span>{'特征标签名'}</span>
        <input
          name="calibrationName"
          onChange={handleCharacterNameChange}
          type="text"
          value={props.characterName}
        />
      </div>
      <div className={styles.imagesWrapper}>
        {props.imageList.map((imgUrl, index) => (
          <div
            className={styles.imageWrapper}
            key={index}
          >
            <img
              alt="缩略图"
              height={66}
              src={imgUrl}
              width={66}
            />
            <button
              onClick={handleDeleteImg(index)}
              title={'click to delete'}
            />
          </div>
        ))}
        <div className={styles.addImage}>
          <input
            accept="image/*"
            name="imgFileInput"
            onChange={handleImageAdd}
            type="file"
          />
          {'+'}
        </div>

      </div>
      {<div className={styles.inputRow} >
        <span className={props.mode ? '' : styles.disabled}>{'物块高度'}</span>
        <input
          disabled={!props.mode}
          name="blockHeight"
          onChange={handleInputChange}
          type="text"
          value={props.blockHeight}
        />
        {'mm'}
      </div>}
    </div>
  );
};

CalibrationContentLeft.propTypes = {
  blockHeight: PropTypes.number,
  characterName: PropTypes.string,
  handleAddImage: PropTypes.func,
  handleBlockHeightChange: PropTypes.func,
  handleCharacterNameChange: PropTypes.func,
  handleDeleteImg: PropTypes.func,
  imageList: PropTypes.array,
  mode: PropTypes.number
};

const handleSelectClick = (e, callback) => {
  const constraint = {
    video: { deviceId: { exact: e.target.value } },
    audio: false
  };
  camera.requestStream(constraint);
};

const CalibrationContentRight = props => {
  const videoRef = useRef();
  const canvasRef = useRef(null);
  const [camList, setCamList] = useState([]);
  useEffect(() => {
    camera.requestStream(undefined, videoRef.current);
    camera.getCameraList().then(setCamList);
  }, []);
  useEffect(() => () => {
    camera.stop();
  }, []);
  const [manual, setManual] = useState(false);
  const [storeRect, setStoreRect] = useState([]);
  useEffect(() => {
    // 如果有框定数据
    if (!props.rectArray) return;
    if (props.rectArray.length) {
      const context = canvasRef.current.getContext('2d');
      context.strokeStyle = 'orange';
      context.lineWidth = 4;
      context.beginPath();
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      const tempRect = [];
      props.rectArray.forEach(arr => {
        context.rect(...arr);
        tempRect.push(arr);
        setStoreRect(tempRect);
        context.stroke();
      });
    }
  }, [props.rectArray]);
  const generateClip = (x, y, width, height) => {
    const tempanvas = document.createElement('canvas');
    const video = videoRef.current;
    tempanvas.height = height;
    tempanvas.width = width;
    const scaleX = video.videoWidth / VIDEOWIDTH;
    const scaleY = video.videoHeight / VIDEOHEIGHT;
    const ctx = tempanvas.getContext('2d');
    ctx.drawImage(video, x * scaleX, y * scaleY, width * scaleX, height * scaleY, 0, 0, width, height);
    props.handleCaptureClick(tempanvas.toDataURL());
  };

  const handleCaptureClick = () => {
    props.handleCaptureClick(camera.captureImageGenerator(videoRef.current));
  };
  const handleCaptureRect = () => {
    props.handleCaptureClick(camera.captureImageGenerator(videoRef.current), true);
  };
  const clearCanvas = () => {
    setStoreRect([]);
    canvasRef.current.getContext('2d').clearRect(0, 0, VIDEOWIDTH, VIDEOHEIGHT);
  };
  const handleManualSwitch = e => {
    setManual(e.target.getAttribute('name') === 'manual');
  };
  const [selectValue, setSelectValue] = useState(camList[0]);
  return (
    <div className={styles.contentRight}>
      <select
        name="camera"
        onChange={e => handleSelectClick(e, setSelectValue)}
        value={selectValue}
      >
        {camList.map(item => (
          <option key={item[1] || 'default'}>{item[0] || 'default'}</option>
        ))}
      </select>

      <div className={styles.videoWrapper}>
        <div
          style={{
            height: `${VIDEOHEIGHT}px`,
            width: `${VIDEOWIDTH}px`,
            margin: 'auto',
            position: 'relative'
          }}
        >
          {props.mode ?
            <div
              className={styles.manualSwitch}
              onClick={handleManualSwitch}
            >
              <div
                className={manual ? '' : styles.selected}
                name="auto"
              >{'自动'}</div>
              <div
                className={manual ? styles.selected : ''}
                name="manual"
              >{'手动'}</div>
            </div> : null}
          <video
            height={VIDEOHEIGHT}
            ref={videoRef}
            width={VIDEOWIDTH}
          />
          {props.mode ? <Canvas
            canvasRef={canvasRef}
            generateClip={generateClip}
            height={VIDEOHEIGHT}
            storeRect={storeRect}
            width={VIDEOWIDTH}
          /> : null}
        </div>
      </div>
      <div className={styles.contentRightBottom}>
        {props.mode ? <div onClick={clearCanvas}>{'清空选择'}</div> : null}
        {props.mode ?
          <div onClick={handleCaptureRect}>{'截取识别'}</div> :
          <div onClick={handleCaptureClick}>{'添加照片'}</div>}
      </div>
    </div>
  );
};

CalibrationContentRight.propTypes = {
  handleCaptureClick: PropTypes.func,
  mode: PropTypes.number,
  rectArray: PropTypes.array
};

const ValidateCalibrationLeft = ({ handleValidateInputChange, validateImage, validateRes, mode, handleFinish }) => {
  const modes = { file: 'file', camera: 'camera' };
  const videoRef = useRef(null);
  const [tabMode, setTabMode] = useState('file');
  const switchMode = type => () => {
    if (type === tabMode) return;
    setTabMode(type);
  };
  const previewImgRef = useRef(null);
  const onValidateInputChange = e => {
    handleValidateInputChange(e.target.files);
  };
  const isFileMode = tabMode === 'file';
  const onCapture = () => {
    camera.videoPause(videoRef.current);
    handleValidateInputChange(camera.captureImageGenerator(videoRef.current));
  };
  const onResume = () => {
    camera.videoResume(videoRef.current);
  };
  const [camList, setCamList] = useState([]);
  useEffect(() => {
    if (tabMode === modes.file) return;
    camera.requestStream(undefined, videoRef.current);
    camera.getCameraList().then(setCamList);
  }, [tabMode]);
  useEffect(() => () => {
    camera.stop();
  }, []);
  return (
    <div className={styles.validateWrapper}>
      <div className={styles.validateTabs}>
        <button
          className={styles.validateMode + (isFileMode ? ` ${styles.active}` : '')}
          onClick={switchMode(modes.file)}
        >{'文件'}</button>
        <button
          className={styles.validateMode + (isFileMode ? '' : ` ${styles.active}`)}
          onClick={switchMode(modes.camera)}
        >{'相机'}</button>
      </div>
      <div className={styles.validateRight}>
        <div className={styles.validatePreview}>
          <div className={styles.validateRow}>
            {'验证图像'}
            {isFileMode ?
              <div className={styles.addFileValidate}>
                {'打开'}
                <input
                  accept="image/*"
                  id="openValidateFile"
                  name="openValidateFile"
                  onChange={onValidateInputChange}
                  type="file"
                />
              </div> : null}
          </div>
          {isFileMode ?
            <div className={styles.previewImg}>
              {validateImage && <img
                height={'100%'}
                ref={previewImgRef}
                src={validateImage}
                width={'100%'}
              />}
            </div> :
            <div className={styles.previewImg}>
              { mode ? null : <select
                name="camera"
                onChange={handleSelectClick}
              >
                {camList.map(item => (
                  <option key={item[1] || 'default'}>{item[0] || 'default'}</option>
                ))}
              </select> }
              <video
                height={VIDEOHEIGHT}
                ref={videoRef}
                width={VIDEOWIDTH}
              />
              <div className={styles.leftBottom}>
                <div
                  className={styles.captureButton}
                  onClick={onCapture}
                >{'截图识别'}</div>
                <div
                  className={styles.captureButton}
                  onClick={onResume}
                >{'重新截图'}</div>
              </div>
            </div>
          }
        </div>
        <ValidateCalibrationRes
          validateRes={validateRes}
          handleFinish={handleFinish}
        />

      </div>
      
    </div>
  );
};
ValidateCalibrationLeft.propTypes = {
  handleValidateInputChange: PropTypes.func,
  handleFinish: PropTypes.func,
  mode: PropTypes.number,
  validateImage: PropTypes.string,
  validateRes: PropTypes.array
};

const ValidateCalibrationRes = ({ validateRes, handleFinish }) => {
  const onFinish = () => {
    // 取消录像, 减少资源消耗
    if (mediaTrack) mediaTrack.stop();
    handleFinish();
  };
  return (
    <div className={styles.validateRes}>
      <div>
        <p className={styles.validateTitle}>{'验证结果'}</p>
        {validateRes.map(res => (
          res.name ? <div
            className={styles.validateItem}
            key={res.name}
          >
            <span>{res.name}</span>
            <progress
              className={styles.validateProgress}
              max={100}
              value={Number(res.value)}
            />
            <span>{`${res.value}%`}</span>
          </div> : null
        ))}
      </div>
      <div
        className={styles.validateComplete}
        onClick={onFinish}
      >{'完成'}</div>
    </div>
  );
};
ValidateCalibrationRes.propTypes = {
  validateRes: PropTypes.array,
  handleFinish: PropTypes.func
};

export {
  CalibrationContentLeft,
  CalibrationContentRight,
  ValidateCalibrationLeft,
  ValidateCalibrationRes as ValidateCalibrationRight
};
