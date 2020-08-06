import React from 'react';
import { AI } from '../components/ai';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  setImageListObj,
  setCharacterNames,
  setCutImageListObj,
  setCutClassNames
} from '../reducers/ai';
import { intlShape } from 'react-intl';
import { message } from 'antd';


class CutImageRecognition extends React.Component {
  state = {
    rectArray: null,
    isShowLoading: false
  };

  componentWillUnmount(){
    this.isUnmount = true;
  }

  // 卸载组件时停止处理数据
  isUnmount = false;

  onTraining = () => new Promise((resolve, reject) => {
    if (this.props.step === 0) {
      // 进行分类训练
      const size = this.props.imageListObj.length;
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
    this.props.handleSetCutImageListObj(tempImageList);
  }

  onCalibrationValidateImgChange = (image, isValidateCutImage, isCutRecognizeBlock) => new Promise(resolve => {
    if (!image) return;
    // 如果是第一步点击分割时
    if (this.props.step === 0) {
      this.props.caliWs.cutImage(image).then(rectArray => {
        if (!this.isUnmount){
          this.setState({
            rectArray
          }, resolve);
        }
      });
    } else if (this.props.step === 1) { // 验证阶段
      // 拍照阶段不现实验证内容
      if (this.props.onlyResult) {
        return this.setState({
          rectArray: []
        });
      }
      // 识别切割的图片
      if (isValidateCutImage) {
        this.props.caliWs.groupImage(image).then(index => {
          resolve(index);
        });
      } else if (this.props.caliWs.cutImage(image, !isCutRecognizeBlock)){
        this.props.caliWs.cutImage(image, !isCutRecognizeBlock).then(rectArray => {
          if (isCutRecognizeBlock) {
            resolve(rectArray);
          } else {
            this.setState({
              rectArray
            }, () => resolve(rectArray));
          }
        });
      }
    }
  })

  onCharacterNameChange = (classIndex, value) => {
    const tempCharacterNames = [...this.props.characterNames];
    tempCharacterNames[classIndex] = value;
    this.props.handleSetCharacterNames(tempCharacterNames);
    this.props.handleSetCutClassNames(tempCharacterNames);
  }

  // 删除识别类
  delClass = delClassIndex => {
    const {
      characterNames,
      imageListObj,
      cutImageListObj
    } = this.props;

    const tempCharacterNames = characterNames.filter((_, idx) => idx !== delClassIndex);
    const tempImageListObj = imageListObj.filter((_, idx) => idx !== delClassIndex);
    const tempImgList = cutImageListObj.filter((_, idx) => idx !== delClassIndex);
    this.props.handleSetImageListObj(tempImageListObj);
    this.props.handleSetCharacterNames(tempCharacterNames);
    this.props.handleSetCutImageListObj(tempImgList);
    this.props.handleSetCutClassNames(tempCharacterNames);
  }

  // 添加识别类
  classNum = 1;
  addClass = () => {
    const {
      isFacial,
      characterNames,
      imageListObj,
      cutImageListObj
    } = this.props;

    const oldCharacterNames = characterNames;
    const newClass = (isFacial ? 'Name' : 'Class') + (++this.classNum);
    oldCharacterNames.push(newClass);
    const tempCharacterNames = [...oldCharacterNames];
    const tempImageListObj = [...imageListObj, []];
    const tempImgList = [...cutImageListObj, []];
    this.props.handleSetImageListObj(tempImageListObj);
    this.props.handleSetCharacterNames(tempCharacterNames);
    this.props.handleSetCutImageListObj(tempImgList);
    this.props.handleSetCutClassNames(tempCharacterNames);
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
      this.props.handleSetCharacterNames(['Class1']);
      this.props.handleSetCutImageListObj([[]]);
      this.props.handleSetCutClassNames(['Class1']);
      this.props.turnIsShowDlePopup(false);
      
      if (window.toSaveAIData){
        window.toSaveAIData.cutImageListObj = [[]];
        window.toSaveAIData.cutClassNames = [];
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

  onPrevStep = () => {
    this.props.handleChangeStopFlag(false);
    this.props.handlePrev();
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
      onPrevStep={this.onPrevStep}
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
      x={this.props.x}
      y={this.props.y}
      isTraining={this.props.isTraining}
      characterNames={this.props.characterNames}
      imageListObj={this.props.imageListObj}
      isShowDlebtn={this.props.isShowDlebtn}
      stopFlag={this.props.stopFlag}
      timeoutSeconds={this.props.timeoutSeconds}
      setBackground={this.props.setBackground}
      isSetBackground={this.props.isSetBackground}
      calibrationType={this.props.calibrationType}
      changeCalibrationType={this.props.changeCalibrationType}
      intl={this.props.intl}
      {...this.state}
    />
  )
}

CutImageRecognition.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  draging: PropTypes.bool,
  onlyResult: PropTypes.bool,
  isFacial: PropTypes.bool,
  isOpen: PropTypes.bool,
  isTraining: PropTypes.bool,
  isMaual: PropTypes.bool,
  isCut: PropTypes.bool,
  headTitle: PropTypes.any,
  isShowDlePopup: PropTypes.bool,
  isShowDlebtn: PropTypes.bool,
  timeoutSeconds: PropTypes.number,
  stopFlag: PropTypes.bool,
  isTrained: PropTypes.bool,
  decreaseTimeout: PropTypes.func,
  onFinish: PropTypes.func,
  handleOnDrag: PropTypes.func,
  handleEndDrag: PropTypes.func,
  handleNext: PropTypes.func,
  handlePrev: PropTypes.func,
  handleStartDrag: PropTypes.func,
  handleChangeStopFlag: PropTypes.func,
  hanndleChangeIsShowSavePopup: PropTypes.func,
  changeIsTraining: PropTypes.func,
  turnIsShowDlePopup: PropTypes.func,
  generateRandom: PropTypes.func,
  step: PropTypes.number,
  changeIsShowDlePopup: PropTypes.func,
  changeIsTrained: PropTypes.func,
  caliWs: PropTypes.object,
  handleSetImageListObj: PropTypes.func,
  handleSetCharacterNames: PropTypes.func,
  handleSetCutImageListObj: PropTypes.func,
  handleSetCutClassNames: PropTypes.func,
  imageListObj: PropTypes.array,
  characterNames: PropTypes.array,
  cutImageListObj: PropTypes.array,
  cutClassNames: PropTypes.array,
  intl: intlShape.isRequired,
  setBackground: PropTypes.func,
  isSetBackground: PropTypes.bool,
  calibrationType: PropTypes.string,
  changeCalibrationType: PropTypes.func
};

const mapStatesToProps = states => ({
  imageListObj: states.scratchGui.ai.imageListObj,
  characterNames: states.scratchGui.ai.characterNames,
  cutImageListObj: states.scratchGui.ai.cutImageListObj,
  cutClassNames: states.scratchGui.ai.cutClassNames
});
const mapDispatchToProps = dispatch => ({
  handleSetImageListObj: imageListObj => dispatch(setImageListObj(imageListObj)),
  handleSetCharacterNames: characterNames => dispatch(setCharacterNames(characterNames)),
  handleSetCutImageListObj: cutImageListObj => dispatch(setCutImageListObj(cutImageListObj)),
  handleSetCutClassNames: cutClassNames => dispatch(setCutClassNames(cutClassNames))
});
  

export default connect(mapStatesToProps, mapDispatchToProps)(CutImageRecognition);
