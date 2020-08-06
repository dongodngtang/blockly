import React, { Fragment } from 'react';
import styles from './index.css';
import PropTypes from 'prop-types';
import { CalibrationTab } from './tabs';
import {
  CalibrationContentLeft,
  CalibrationContentRight,
  ValidateCalibrationLeft
} from './content/index';
const PageHeader = ({ step }) => (
  <div className={styles.title}>
    <div className={styles.subtitle + (step === 1 ? ` ${styles.selected}` : '')}>
      <span className={styles.index + (step === 1 ? ` ${styles.selected}` : '')}>{'1'}</span>
      {'添加特征及数据'}
    </div>
    <span className={styles.betweenSubtitle} />
    <div className={styles.subtitle + (step === 2 ? ` ${styles.selected}` : '')}>
      <span className={styles.index + (step === 2 ? ` ${styles.selected}` : '')}>{'2'}</span>
      {'测试分类模型'}
    </div>
  </div>
);
PageHeader.propTypes = {
  step: PropTypes.number
};
const Page1 = ({
  handleAddImage,
  imageListObj,
  handleCaptureClick,
  handleDeleteImg,
  selectTabIndex,
  changeIndex,
  handleDeleteTab,
  handleTabAdd,
  tabList,
  mode,
  blockHeight,
  handleBlockHeightChange,
  characterNames,
  handleCharacterNameChange, rectArray }) =>
  (
    <Fragment>
      <PageHeader step={1} />
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <CalibrationTab
            changeIndex={changeIndex}
            handleDeleteTab={handleDeleteTab}
            handleTabAdd={handleTabAdd}
            selectTabIndex={selectTabIndex}
            tabList={tabList}
          />
        </div>

        <div className={styles.contentRight}>
          <CalibrationContentLeft
            blockHeight={blockHeight}
            characterName={characterNames[tabList[selectTabIndex]]}
            handleAddImage={handleAddImage}
            handleBlockHeightChange={handleBlockHeightChange}
            handleCharacterNameChange={handleCharacterNameChange}
            handleDeleteImg={handleDeleteImg}
            imageList={imageListObj[tabList[selectTabIndex]] || []}
            mode={mode}
          />
          <CalibrationContentRight
            handleCaptureClick={handleCaptureClick}
            mode={mode}
            rectArray={rectArray}
          />
        </div>
      </div>
    </Fragment>
  );
Page1.propTypes = {
  blockHeight: PropTypes.number,
  changeIndex: PropTypes.func,
  characterNames: PropTypes.array,
  handleAddImage: PropTypes.func,
  handleBlockHeightChange: PropTypes.func,
  handleCaptureClick: PropTypes.func,
  handleCharacterNameChange: PropTypes.func,
  handleDeleteImg: PropTypes.func,
  handleDeleteTab: PropTypes.func,
  handleTabAdd: PropTypes.func,
  imageListObj: PropTypes.any,
  mode: PropTypes.number,
  selectTabIndex: PropTypes.number,
  tabList: PropTypes.array,
  rectArray: PropTypes.array
};
const Page2 = ({ handleValidateInputChange, validateImage, validateRes, mode, handleFinish }) => (
  <div>
    <PageHeader step={2} />
    <ValidateCalibrationLeft
      handleValidateInputChange={handleValidateInputChange}
      mode={mode}
      validateImage={validateImage}
      validateRes={validateRes}
      handleFinish={handleFinish}
    />
  </div>
);
Page2.propTypes = {
  handleValidateInputChange: PropTypes.func,
  handleFinish: PropTypes.func,
  mode: PropTypes.number,
  validateImage: PropTypes.string,
  validateRes: PropTypes.array
};

export {
  Page1,
  Page2
};
