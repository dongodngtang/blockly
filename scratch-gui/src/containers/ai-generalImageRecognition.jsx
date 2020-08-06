import React, { Fragment } from 'react';
import { AI } from '../components/ai';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  setImageListObj,
  setCharacterNames,
  setGeneralImageListObj,
  setGeneralNames
} from '../reducers/ai';
import { message } from 'antd';
import { intlShape } from 'react-intl';

class GeneralImageRecognition extends React.Component {
  state = {
    validateImage: '',
    validateRes: [],
    rectArray: null,
    isShowLoading: false
  };

  componentWillUnmount(){
    this.isUnmount = true;
  }
  isUnmount = false;

  onTraining = () => new Promise((resolve, reject) => {
    if (this.props.step === 0) {
      // 进行分类训练
      const size = this.props.imageListObj.length;
      // websocket 无法正常发送
      this.props.imageListObj.map((classImageList, classIndex) => {

        classImageList.map((image, imageIndex) => {
          let flag;
          if (imageIndex === 0 && classIndex === 0) {
            flag = 0; // 第一次发送flag要为 0
            if (classImageList.length === 1){
              flag = 2;
            }
          } else if (imageIndex < classImageList.length - 1 || classIndex < size - 1) {
            flag = 1; // 之后到最后一张发送flag为 1
          } else {
            flag = 2; // 最后一张发送flag为 2
          }
          this.props.caliWs.classifyImage([image], [classIndex], size, flag).then(res => {
            if (flag === 2) {
              this.props.changeIsTrained(true);
              resolve();
            }
          });
        });
      });
    }
  })

  onCaptureClick = (classIndex, data) => {
    const tempImageList = [...this.props.imageListObj];
    tempImageList[classIndex].push(data);
    this.props.handleSetImageListObj(tempImageList);
    this.props.handleSetGeneralImageListObj(tempImageList);
    
  }

  onCalibrationValidateImgChange = (image, isValidateCutImage, isCutRecognizeBlock) => new Promise(resolve => {
    if (!image) return;
    if (this.props.step === 1) { // 验证阶段
    // 拍照阶段不现实验证内容
      if (this.props.onlyResult) {
        return this.setState({
          rectArray: []
        });
      }
      // 手动或自动拍照
      if (this.props.isMaual || this.props.onlyResult) {
        window.photo = image;
      }
      if (this.props.caliWs){
        this.props.caliWs.groupImage(image).then(res => {
          const characters = this.props.characterNames;
          const tempValidateRes = [];
          Object.keys(characters).forEach(index => {
            tempValidateRes.push({
              name: characters[index],
              value: (parseInt(index, 10) === res ? 96 + this.props.generateRandom(4) : this.props.generateRandom())
            });
          });
          if (!this.isUnmount){
            this.setState({
              validateRes: tempValidateRes,
              validateImage: image
            }, resolve);
          }
          
        });
      }
    }
  })

  onCharacterNameChange = (classIndex, value) => {
    const tempCharacterNames = [...this.props.characterNames];
    tempCharacterNames[classIndex] = value;
    this.props.handleSetCharacterNames(tempCharacterNames);
    this.props.handleSetGeneralNames(tempCharacterNames);
  }

  // 删除识别类
  delClass = delClassIndex => {
    const {
      characterNames,
      imageListObj,
      generalImageListObj
    } = this.props;
    const tempCharacterNames = characterNames.filter((_, idx) => idx !== delClassIndex);
    const tempImageListObj = imageListObj.filter((_, idx) => idx !== delClassIndex);
    const tempImgList = generalImageListObj.filter((_, idx) => idx !== delClassIndex);
    this.props.handleSetImageListObj(tempImageListObj);
    this.props.handleSetGeneralImageListObj(tempImgList);
    this.props.handleSetCharacterNames(tempCharacterNames);
    this.props.handleSetGeneralNames(tempCharacterNames);
  }

  // 添加识别类
  classNum = 1;
  addClass = () => {
    const {
      characterNames,
      imageListObj,
      generalImageListObj
    } = this.props;

    const oldCharacterNames = characterNames;
    const newClass = `Class${++this.classNum}`;
    oldCharacterNames.push(newClass);
    const tempCharacterNames = [...oldCharacterNames];
    const tempImageListObj = [...imageListObj, []];
    
    const tempImgList = [...generalImageListObj, []];
    this.props.handleSetImageListObj(tempImageListObj);
    this.props.handleSetGeneralImageListObj(tempImgList);
    this.props.handleSetCharacterNames(tempCharacterNames);
    this.props.handleSetGeneralNames(tempCharacterNames);
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
      this.props.handleSetImageListObj([[]]);
      this.props.handleSetGeneralImageListObj([[]]);
      this.props.handleSetCharacterNames(['Class1']);
      this.props.handleSetGeneralNames(['Class1']);
      this.props.turnIsShowDlePopup(false);
      if (window.toSaveAIData){
        window.toSaveAIData.generalImageListObj = [[]];
        window.toSaveAIData.generalNames = [];
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
      isFacial={this.props.isFacial}
      decreaseTimeout={this.props.decreaseTimeout}
      headTitle={this.props.headTitle}
      addClass={this.addClass}
      delClass={this.delClass}
      handleChangeStopFlag={this.props.handleChangeStopFlag}
      hanndleChangeIsShowSavePopup={this.props.hanndleChangeIsShowSavePopup}
      delClassificationData={this.delClassificationData}
      isShowSavePopup={this.props.isShowSavePopup}
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
      setBackground={this.props.setBackground}
      isSetBackground={this.props.isSetBackground}
      changeCalibrationType={this.props.changeCalibrationType}
      calibrationType={this.props.calibrationType}
      intl={this.props.intl}
      {...this.state}
    />
  )
}

GeneralImageRecognition.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  draging: PropTypes.bool,
  onlyResult: PropTypes.bool,
  isTrained: PropTypes.bool,
  isFacial: PropTypes.bool,
  stopFlag: PropTypes.bool,
  isTraining: PropTypes.bool,
  isOpen: PropTypes.bool,
  isMaual: PropTypes.bool,
  isShowSavePopup: PropTypes.bool,
  isCut: PropTypes.bool,
  isShowDlePopup: PropTypes.bool,
  isShowDlebtn: PropTypes.bool,
  timeoutSeconds: PropTypes.number,
  headTitle: PropTypes.any,
  decreaseTimeout: PropTypes.func,
  onFinish: PropTypes.func,
  handleOnDrag: PropTypes.func,
  handleEndDrag: PropTypes.func,
  handleNext: PropTypes.func,
  handlePrev: PropTypes.func,
  handleStartDrag: PropTypes.func,
  handleChangeStopFlag: PropTypes.func,
  hanndleChangeIsShowSavePopup: PropTypes.func,
  generateRandom: PropTypes.func,
  changeIsShowDlePopup: PropTypes.func,
  turnIsShowDlePopup: PropTypes.func,
  changeIsTraining: PropTypes.func,
  changeIsTrained: PropTypes.func,
  step: PropTypes.number,
  imageListObj: PropTypes.array,
  characterNames: PropTypes.array,
  generalImageListObj: PropTypes.array,
  generalNames: PropTypes.array,
  handleSetImageListObj: PropTypes.func,
  handleSetCharacterNames: PropTypes.func,
  handleSetGeneralImageListObj: PropTypes.func,
  handleSetGeneralNames: PropTypes.func,
  setBackground: PropTypes.func,
  changeCalibrationType: PropTypes.func,
  caliWs: PropTypes.object,
  intl: intlShape.isRequired,
  isSetBackground: PropTypes.bool,
  calibrationType: PropTypes.string
};
const mapStatesToProps = states => ({
  imageListObj: states.scratchGui.ai.imageListObj,
  characterNames: states.scratchGui.ai.characterNames,
  generalImageListObj: states.scratchGui.ai.generalImageListObj,
  generalNames: states.scratchGui.ai.generalNames
});
const mapDispatchToProps = dispatch => ({
  handleSetImageListObj: imageListObj => dispatch(setImageListObj(imageListObj)),
  handleSetCharacterNames: characterNames => dispatch(setCharacterNames(characterNames)),
  handleSetGeneralImageListObj: generalImageListObj => dispatch(setGeneralImageListObj(generalImageListObj)),
  handleSetGeneralNames: generalNames => dispatch(setGeneralNames(generalNames))
});

export default connect(mapStatesToProps, mapDispatchToProps)(GeneralImageRecognition);
