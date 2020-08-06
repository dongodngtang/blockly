import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { camera } from '../../../../lib/video/camera';

const CalibrationContentRight = props => {
  const handleCaptureClick = classIndex =>
    () => props.handleCaptureClick(classIndex, camera.captureImageGenerator(props.videoRef.current, props.isFacial));
  const handleDeleteImg = (classIndex, imageIndex) => () => props.handleDeleteImg(classIndex, imageIndex);
  const handleCharacterNameChange = classIndex => e => {
    props.handleCharacterNameChange(classIndex, e.target.value);
  };
  const addRef1 = useRef('add1');
  const addRef2 = useRef('add2');
  const addRef3 = useRef('add3');
  const addRef4 = useRef('add4');
  const refs = [addRef1, addRef2, addRef3, addRef4];
  useEffect(() => {
    // 切割分类和人脸识别都不会超出可见范围
    if (props.isCut || props.isColorCut || props.isFacial) return;
    refs.forEach(ref => {
      if (ref.current && ref.current.scrollIntoViewIfNeeded) {
        ref.current.scrollIntoViewIfNeeded(false);
      }
    });
  }, [props.imageList]);
  return (
    <div className={styles.contentLeft}>
      {props.characterNames.map((classIndex, idx) => (
        <div
          className={styles.inputRow}
          key={idx}
        >
          {
            idx === 0 ? '' : (<i
              className={styles.delClass}
              onClick={props.delClass(idx)}
            />)
          }
          <span>{idx + 1}</span>
          <input
            name="calibrationName"
            onChange={handleCharacterNameChange(idx)}
            type="text"
            value={props.characterNames[idx]}
            autoComplete={'false'}
          />
          <div
            className={styles.imagesWrapper +
                  (((props.isCut || props.isColorCut) && props.selectIndex === idx) ? ` ${styles.selectedRow}` : '')}
            onClick={() => props.setSelectIndex(idx)}
          >
            {props.imageList[idx] && props.imageList[idx].map((imgUrl, index) => (
              <div
                className={styles.imageWrapper}
                key={index}
              >
                <img
                  alt="缩略图"
                  height={50}
                  src={imgUrl}
                  width={50}
                />
                <button
                  onClick={handleDeleteImg(idx, index)}
                  title={'click to delete'}
                />
              </div>
            ))}
            {props.isCut || props.isColorCut ? null :
              ((props.isFacial && props.imageList[idx] && props.imageList[idx].length >= 1) ? null :
                (<div
                  className={styles.addImage}
                  onClick={handleCaptureClick(idx)}
                  ref={refs[idx]}
                >
                  <span>{'+'}</span>
                </div>))}
          </div>
        </div>
      ))}
      <div
        className={styles.addClass}
        onClick={props.addClass}
        style={{ display: props.characterNames.length >= 4 ? 'none' : 'block' }}
      >
        <span>{'+'}</span>
      </div>
    </div>
  
  );
};
  
CalibrationContentRight.propTypes = {
  characterNames: PropTypes.array,
  handleCaptureClick: PropTypes.func,
  handleCharacterNameChange: PropTypes.func,
  handleDeleteImg: PropTypes.func,
  imageList: PropTypes.array,
  selectIndex: PropTypes.number,
  isCut: PropTypes.bool,
  setSelectIndex: PropTypes.func,
  isFacial: PropTypes.bool,
  isColorCut: PropTypes.bool,
  addClass: PropTypes.func,
  delClass: PropTypes.func,
  videoRef: PropTypes.object
};

export default CalibrationContentRight;
