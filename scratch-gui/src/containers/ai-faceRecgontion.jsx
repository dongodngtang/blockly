import React from 'react';
import { AI } from '../components/ai';
import { connect } from 'react-redux';
import tencentAPI from '../lib/tencentApi';
import PropTypes from 'prop-types';
import {
  setImageListObj,
  setCharacterNames,
  setFaceImageListObj,
  setFaceNames
} from '../reducers/ai';
import { message } from 'antd';
import { intlShape } from 'react-intl';

class FaceRecognition extends React.Component {
  state = {
    validateImage: '',
    validateRes: [],
    rectArray: null,
    isShowLoading: false
  };

  onTraining = () => new Promise((resolve, reject) => {
    if (this.props.step === 0) {
      if (this.props.isFacial) {
        // 调用人脸识别的接口
        const promises = [];
        for (let i = 0; i < this.props.characterNames.length; i++) {
          const image = this.props.imageListObj[i][0];
          if (i === 0 && !image){
            // 没有添加图片不让训练模型
            return;
          }
          promises.push(tencentAPI.createPerson(this.props.characterNames[i], image));
        }
        Promise.all(promises).then(() => {
          this.props.changeIsTrained(true);
          resolve();
        });
        return;
      }
    }
  })

  onCaptureClick = (classIndex, data) => {
    const tempImageList = [...this.props.imageListObj];
    tempImageList[classIndex].push(data);
    this.props.handleSetImageListObj(tempImageList);
    this.props.handleSetFaceImageListObj(tempImageList);
  }

  onCalibrationValidateImgChange = (image, isValidateCutImage, isCutRecognizeBlock) => new Promise(resolve => {
    if (!image) return;
    // 如果是第一步点击分割时
    if (this.props.step === 0) {
      this.setState({
        rectArray: []
      });
    } else if (this.props.step === 1) { // 验证阶段
      // 拍照阶段不现实验证内容
      if (this.props.onlyResult) {
        return this.setState({
          rectArray: []
        });
      }
      
      // 人脸识别
      const tempValidateRes = [];
      const characters = this.props.characterNames;
      tencentAPI.faceNameSearch(image).then(res => {
        const name = res.data.name;
        Object.keys(characters).forEach(index => {
          tempValidateRes.push({
            name: characters[index],
            value: (characters[index] === name ? 96 + this.props.generateRandom(4) : this.props.generateRandom())
          });
        });
        this.setState({
          validateRes: tempValidateRes,
          validateImage: image
        }, resolve);
      });
    }
  })

  onCharacterNameChange = (classIndex, value) => {
    const tempCharacterNames = [...this.props.characterNames];
    tempCharacterNames[classIndex] = value;
    this.props.handleSetCharacterNames(tempCharacterNames);
    this.props.handleSetFaceNames(tempCharacterNames);
  }

  // 删除识别类
  delClass = delClassIndex => {
    const {
      characterNames,
      imageListObj,
      faceImageListObj
    } = this.props;
    

    const tempCharacterNames = characterNames.filter((_, idx) => idx !== delClassIndex);
    const tempImageListObj = imageListObj.filter((_, idx) => idx !== delClassIndex);

    const tempImgList = faceImageListObj.filter((_, idx) => idx !== delClassIndex);
    this.props.handleSetImageListObj(tempImageListObj);
    this.props.handleSetCharacterNames(tempCharacterNames);
    this.props.handleSetFaceImageListObj(tempImgList);
    this.props.handleSetFaceNames(tempCharacterNames);
  }

  // 添加识别类
  classNum = 1;
  addClass = () => {
    const {
      characterNames,
      imageListObj,
      faceImageListObj
    } = this.props;

    const oldCharacterNames = characterNames;
    const newClass = `Name${++this.classNum}`;
    oldCharacterNames.push(newClass);
    const tempCharacterNames = [...oldCharacterNames];
    const tempImageListObj = [...imageListObj, []];
    const tempImgList = [...faceImageListObj, []];
    this.props.handleSetImageListObj(tempImageListObj);
    this.props.handleSetCharacterNames(tempCharacterNames);
    this.props.handleSetFaceImageListObj(tempImgList);
    this.props.handleSetFaceNames(tempCharacterNames);
  }

  handleTraining = () => {
    let flag = false;
    const { imageListObj } = this.props;
    imageListObj.forEach(element => {
      if (imageListObj.length > 1){
        if (element.length){
          flag = true;
        } else {
          flag = false;
        }
      }
    });
    if (!flag){
      message.warning(this.props.intl.messages.gui_ai_imageRecgonition_message);
      return;
    }
    this.setState({
      isShowLoading: true
    });
    this.onTraining().then(() => {
      if (this.props.isTrained){
        setTimeout(() => {
          this.props.handleNext();
          this.props.handleChangeStopFlag(true);
          this.props.changeIsTraining(false);
          this.setState({
            isShowLoading: false
          });
        }, 500);
      }
    })
      .catch(e => console.log(e));
  };

  // 删除数据
  delClassificationData = () => {
    this.props.changeIsShowDlePopup().then(() => {
      tencentAPI.deleteGroup().then(() => {
        tencentAPI.createGroup();
      });
      this.props.handleSetImageListObj([[]]);
      this.props.handleSetCharacterNames(['Name1']);
      this.props.handleSetFaceImageListObj([[]]);
      this.props.handleSetFaceNames(['Name1']);
      this.props.turnIsShowDlePopup(false);
  
      if (window.toSaveAIData){
        window.toSaveAIData.faceImageListObj = [[]];
        window.toSaveAIData.faceNames = [];
      }
    })
      .catch(() => {
        this.props.turnIsShowDlePopup(false);
      });
  }

  deleteImageList = (classIndex, imgIndex) => {
    const tempImageList = [...this.props.imageListObj];
    tempImageList[classIndex].splice(imgIndex, 1);
    this.props.handleSetImageListObj(tempImageList);
  }

  render = () => (
    <AI
      step={this.props.step}
      dragging={this.props.draging}
      handleCaptureClick={this.onCaptureClick}
      handleCharacterNameChange={this.onCharacterNameChange}
      handleDeleteImg={this.deleteImageList}
      handleFinish={this.props.onFinish}
      handleTraining={this.handleTraining}
      onCloseCards={this.props.onFinish}
      onDrag={this.props.handleOnDrag}
      onEndDrag={this.props.handleEndDrag}
      onNextStep={this.props.onlyResult ? null : this.props.handleNext}
      onPrevStep={this.props.handlePrev}
      onStartDrag={this.props.handleStartDrag}
      totalSteps={this.props.onlyResult ? 1 : 2}
      handleValidateInputChange={this.onCalibrationValidateImgChange}
      rectArray={this.state.rectArray}
      isFacial={this.props.isFacial}
      decreaseTimeout={this.props.decreaseTimeout}
      headTitle={this.props.headTitle}
      addClass={this.addClass}
      delClass={this.delClass}
      handleChangeStopFlag={this.props.handleChangeStopFlag}
      hanndleChangeIsShowSavePopup={this.props.hanndleChangeIsShowSavePopup}
      delClassificationData={this.delClassificationData}
      isShowDlePopup={this.props.isShowDlePopup}
      isCut={this.props.isCut}
      isMaual={this.props.isMaual}
      isTraining={this.props.isTraining}
      x={this.props.x}
      y={this.props.y}
      imageListObj={this.props.imageListObj}
      characterNames={this.props.characterNames}
      isShowDlebtn={this.props.isShowDlebtn}
      stopFlag={this.props.stopFlag}
      timeoutSeconds={this.props.timeoutSeconds}
      isSetBackground={this.props.isSetBackground}
      intl={this.props.intl}
      {...this.state}
    />
  )
}

FaceRecognition.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  draging: PropTypes.bool,
  isMaual: PropTypes.bool,
  isTraining: PropTypes.bool,
  onlyResult: PropTypes.bool,
  isOpen: PropTypes.bool,
  isFacial: PropTypes.bool,
  isCut: PropTypes.bool,
  isShowDlePopup: PropTypes.bool,
  stopFlag: PropTypes.bool,
  timeoutSeconds: PropTypes.number,
  isShowDlebtn: PropTypes.bool,
  isTrained: PropTypes.bool,
  headTitle: PropTypes.any,
  decreaseTimeout: PropTypes.func,
  onFinish: PropTypes.func,
  handleOnDrag: PropTypes.func,
  handleEndDrag: PropTypes.func,
  handleNext: PropTypes.func,
  handlePrev: PropTypes.func,
  handleStartDrag: PropTypes.func,
  handleChangeStopFlag: PropTypes.func,
  generateRandom: PropTypes.func,
  hanndleChangeIsShowSavePopup: PropTypes.func,
  turnIsShowDlePopup: PropTypes.func,
  changeIsShowDlePopup: PropTypes.func,
  step: PropTypes.number,
  changeIsTrained: PropTypes.func,
  changeIsTraining: PropTypes.func,
  handleSetImageListObj: PropTypes.func,
  handleSetCharacterNames: PropTypes.func,
  handleSetFaceImageListObj: PropTypes.func,
  handleSetFaceNames: PropTypes.func,
  imageListObj: PropTypes.array,
  characterNames: PropTypes.array,
  faceImageListObj: PropTypes.array,
  faceNames: PropTypes.array,
  isSetBackground: PropTypes.bool,
  intl: intlShape.isRequired
};


const mapStatesToProps = states => ({
  imageListObj: states.scratchGui.ai.imageListObj,
  characterNames: states.scratchGui.ai.characterNames,
  faceImageListObj: states.scratchGui.ai.faceImageListObj,
  faceNames: states.scratchGui.ai.faceNames
});
const mapDispatchToProps = dispatch => ({
  handleSetImageListObj: imageListObj => dispatch(setImageListObj(imageListObj)),
  handleSetCharacterNames: characterNames => dispatch(setCharacterNames(characterNames)),
  handleSetFaceImageListObj: faceImageListObj => dispatch(setFaceImageListObj(faceImageListObj)),
  handleSetFaceNames: faceNames => dispatch(setFaceNames(faceNames))
});
  

export default connect(mapStatesToProps, mapDispatchToProps)(FaceRecognition);
