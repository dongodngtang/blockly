import React, { Fragment } from 'react';
import AIPhotographContainer from './ai-photograph';
import { connect } from 'react-redux';
import {
  openAIModal,
  closeAIModal,
  openAIPhotograph,
  closeAIPhotograph,
  closeOnlinePop,
  openOnlinePop
} from '../reducers/modals';
import {
  setImageListObj,
  setCharacterNames,
  setGeneralImageListObj,
  setGeneralNames,
  setCutImageListObj,
  setCutClassNames,
  setFaceImageListObj,
  setFaceNames,
  setCutColorImageListObj,
  setCutColorClassNames
} from '../reducers/ai';
import PropTypes from 'prop-types';
import { EDITAI, ONLYAIRES, AIAutoFinish, MANUALAI, DELCONFIRM } from '../lib/events';
import { FormattedMessage, intlShape } from 'react-intl';
import { AISavePopup } from '../components/progress-bar/progress-bar';
import { AIOfflinePopup } from '../components/ai/popup';
import GeneralImageRecognition from './ai-generalImageRecognition.jsx';
import CutImageRecognition from './ai-cutImageRecgonition.jsx';
import CutImageColorRecgonition from './ai-cutImageColorRecgonition';
import FaceRecognition from './ai-faceRecgontion.jsx';
import calibrationWs from '../lib/calibration';
import tencentAPI from '../lib/tencentApi';
import { message } from 'antd';

let isInit = true;

const showWidth = 800;
const initPos = {
  x: (window.innerWidth - showWidth) / 2,
  y: window.innerHeight / 6
};

class AIContainer extends React.Component {
  state = {
    step: 0,
    x: initPos.x,
    y: initPos.y,
    draging: false,
    isTrained: false,
    onlyResult: false,
    isMaual: false,
    isCut: false,
    isFacial: false,
    timeoutSeconds: 0,
    headTitle: '初始化数据',
    stopFlag: false,
    isTraining: true,
    isShowSavePopup: false,
    isShowDlePopup: false,
    isShowDlebtn: false,
    caliWs: null,
    isSetBackground: false,
    calibrationType: 'general',
    isColorCut: false
  };
  componentDidMount = () => {
    document.addEventListener(EDITAI, ev => {
      let headTitle;
      if (ev.detail.type === 'editAI'){
        headTitle = (<FormattedMessage
          defaultMessage="编辑分类数据"
          id="gui.ardino.card.EditClassificationData"
        />);
      } else if (ev.detail.type === 'editAIFace'){
        if (!this.props.isOnline){
          this.props.handleOpenOnlinePop();
          return;
        }
        headTitle = (<FormattedMessage
          defaultMessage="编辑人脸数据"
          id="gui.ardino.card.EditFaceData"
        />);
      }
      this.setState({ headTitle });
      const isFacial = ev.detail.isFacial;

      let imageListObj = [];
      let characterNames = {};
      let flag = false;
      const tempObj = window.toLoadAIData || this.props.aiIdentificationData;
      if ((this.state.isCut && isFacial) || isFacial){
        imageListObj = tempObj.faceImageListObj;
        characterNames = tempObj.faceNames;
        if (this.props.aiIdentificationData && (this.props.aiIdentificationData.faceImageListObj.length > 1 ||
         this.props.aiIdentificationData.faceImageListObj[0].length > 0)){
          flag = true;
        }
      } else if (this.state.isCut && !isFacial){
        imageListObj = tempObj.cutImageListObj;
        characterNames = tempObj.cutClassNames;
        if (this.props.aiIdentificationData && (this.props.aiIdentificationData.cutImageListObj.length > 1 ||
        this.props.aiIdentificationData.cutImageListObj[0].length > 0)){
          flag = true;
        }
      } else if (this.state.isColorCut && !isFacial){
        imageListObj = tempObj.cutColorImageListObj;
        characterNames = tempObj.cutColorClassNames;
        if (this.props.aiIdentificationData && (this.props.aiIdentificationData.cutColorImageListObj.length > 1 ||
        this.props.aiIdentificationData.cutColorImageListObj[0].length > 0)){
          flag = true;
        }
      } else {
        imageListObj = tempObj.generalImageListObj;
        characterNames = tempObj.generalNames;
        if (this.props.aiIdentificationData && (this.props.aiIdentificationData.generalImageListObj.length > 1 ||
          this.props.aiIdentificationData.generalImageListObj[0].length > 0)){
          flag = true;
        }
      }
      this.props.handleSetImageListObj(imageListObj);
      this.props.handleSetCharacterNames(characterNames);
      const initAIState = {
        isFacial,
        isCut: (isFacial ? false : this.state.isCut),
        isMaual: false,
        onlyResult: false,
        step: 0,
        isTrained: false,
        isShowDlebtn: flag
      };
      if (window.toLoadAIData) {
        this.props.handleSetGeneralImageListObj(window.toLoadAIData.generalImageListObj);
        this.props.handleSetGeneralNames(window.toLoadAIData.generalNames);
        this.props.handleSetCutImageListObj(window.toLoadAIData.cutImageListObj);
        this.props.handleSetCutClassNames(window.toLoadAIData.cutClassNames);
        this.props.handleSetFaceImageListObj(window.toLoadAIData.faceImageListObj);
        this.props.handleSetFaceNames(window.toLoadAIData.faceNames);
        this.props.handleSetCutColorImageListObj(window.toLoadAIData.cutColorImageListObj);
        this.props.handleSetCutColorClassNames(window.toLoadAIData.cutColorClassNames);
        if (ev.detail.isUpload){
          window.updateToolboxXML(true, true);
          return;
        }
        this.setState(initAIState, this.props.handleOpenAI);
        window.toLoadAIData = null;
      } else {
        this.setState(initAIState, this.props.handleOpenAI);
      }
    });
    document.addEventListener(ONLYAIRES, ev => {
      this.setState({
        onlyResult: true,
        isMaual: false,
        step: 1,
        timeoutSeconds: ev.detail.timeout,
        isCut: false
      }, () => {
        this.props.handleOpenAIPhoto();
      });
    });
    document.addEventListener(MANUALAI, ev => {
      this.setState({
        isMaual: true,
        step: 1,
        isCut: ev.detail.isCut === 'shape',
        isColorCut: ev.detail.isCut !== 'shape',
        onlyResult: false
      },
      this.props.handleOpenAIPhoto);
    });
    if (isInit) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        caliWs: calibrationWs.getSingleInstace()
      });
      if (this.state.isFacial){
        tencentAPI.createGroup();
      }
      isInit = false;
    }
  }

  componentDidUpdate = props => {
    // 在首次加载时才 new websocket
    if (isInit) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        caliWs: calibrationWs.getSingleInstace()
      });
      if (this.state.isFacial){
        tencentAPI.createGroup();
      }
      isInit = false;
    }
  }

  componentWillUnmount() {
    isInit = true;
  }

  changeIsTraining = flag => {
    this.setState({
      isTraining: flag
    });
  }
  changeIsTrained = flag => {
    this.setState({
      isTrained: flag
    });
   
  }

  decreaseTimeout = () => {
    this.setState(prevState => ({ timeoutSeconds: prevState.timeoutSeconds - 1 }));
  }

  handlePrev = () => {
    this.setState(prevState => ({
      step: prevState.step - 1,
      isTraining: true
    }));
  }
  
  handleNext = () => {
    this.setState({
      step: this.state.step + 1
    });
  }
  handleOnDrag = (e_, { x, y }) => {
    if (y < 40 || y > window.innerHeight - 40) return;
    if (x < 0 || x > window.innerWidth - showWidth) return;
    this.setState({
      x,
      y
    });
  }

  handleStartDrag = e_ => {
    if (e_.target.className.includes('header-buttons')) {
      this.setState({ dragging: true });
    } else {
      e_.preventDefault();
      e_.stopPropagation();
      return false;
    }
  };
  handleEndDrag = () => this.setState({ dragging: false });

  generateRandom = (base = 1) => Number((base * Math.random()).toFixed(2))
  
  onFinish = () => {
    // 如果是积木手动识别
    if (this.state.isMaual) {
      document.dispatchEvent(AIAutoFinish('ok'));
    }
    this.props.handleCloseAI();
    this.props.handleCloseAIPhoto();
    this.setState({
      isTraining: true,
      stopFlag: false
    });
    window.toSaveAIData = this.props.aiIdentificationData;
    window.updateToolboxXML(true, true);
  }

  handleChangeStopFlag = flag => {
    this.setState({
      stopFlag: flag
    });
  }


  hanndleChangeIsShowSavePopup = flag => {
    this.setState({
      isShowSavePopup: flag
    });
  }

  changeIsShowDlePopup = () => new Promise((resolve, reject) => {
    document.addEventListener(DELCONFIRM, function confirm(ev) {
      if (ev.detail){
        resolve();
      } else {
        reject();
      }
      document.removeEventListener(DELCONFIRM, confirm);
    });
    this.setState({
      isShowDlePopup: true
    });
  })

  turnIsShowDlePopup = flag => {
    this.setState({
      isShowDlePopup: flag
    });
  }

  setBackground = (imgData, isfist) => {
    this.state.caliWs.setBackground(imgData).then(res => {
      if (res){
        if (!isfist) message.success('校准成功');
        if (!this.state.isSetBackground){
          this.setState({
            isSetBackground: true
          });
        }
      } else if (!isfist)message.error('校准失败,请重试');
    });
  }

  // 选择不同的模式
  changeCalibrationType = type => {
    this.setState(() => {
      let flag = false;
      if (type === 'general') {
        if (this.props.aiIdentificationData && (this.props.aiIdentificationData.generalImageListObj.length > 1 ||
          this.props.aiIdentificationData.generalImageListObj[0].length > 0)){
          flag = true;
        }
        this.props.handleSetImageListObj(this.props.aiIdentificationData.generalImageListObj);
        this.props.handleSetCharacterNames(this.props.aiIdentificationData.generalNames);
        return {
          isCut: false,
          isColorCut: false,
          isShowDlebtn: flag,
          calibrationType: type
        };
      } else if (type === 'shape'){
        if (this.props.aiIdentificationData && (this.props.aiIdentificationData.cutImageListObj.length > 1 ||
          this.props.aiIdentificationData.cutImageListObj[0].length > 0)){
          flag = true;
        }
        this.props.handleSetImageListObj(this.props.aiIdentificationData.cutImageListObj);
        this.props.handleSetCharacterNames(this.props.aiIdentificationData.cutClassNames);
        return {
          isCut: true,
          isColorCut: false,
          isShowDlebtn: flag,
          calibrationType: type
        };
      } else if (type === 'color'){
        if (this.props.aiIdentificationData && (this.props.aiIdentificationData.cutColorImageListObj.length > 1 ||
          this.props.aiIdentificationData.cutColorImageListObj[0].length > 0)){
          flag = true;
        }
        this.props.handleSetImageListObj(this.props.aiIdentificationData.cutColorImageListObj);
        this.props.handleSetCharacterNames(this.props.aiIdentificationData.cutColorClassNames);
        return {
          isCut: false,
          isColorCut: true,
          isShowDlebtn: flag,
          calibrationType: type
        };
      }
    });
  }

  initType = () => {
    this.setState(prevState => {
      if (prevState.calibrationType === 'general'){
        return {
          isCut: false,
          isColorCut: false
        };
      } else if (prevState.calibrationType === 'shape'){
        return {
          isCut: true,
          isColorCut: false
        };
      }
      return {
        isCut: false,
        isColorCut: true
      };
    });
  }

  render = () => (
    <Fragment>
      {
        this.props.isShowOnlinePop ? <AIOfflinePopup handleCloseOnlinePop={this.props.handleCloseOnlinePop} /> : ''
      }
      {
        this.state.isShowSavePopup ? <AISavePopup /> : ''
      }
      {
        this.props.isOpen ?
          this.state.isColorCut ? <CutImageColorRecgonition
            intl={this.props.intl}
            isOpen={this.props.isOpen}
            onFinish={this.onFinish}
            handleOnDrag={this.handleOnDrag}
            handleEndDrag={this.handleEndDrag}
            handleNext={this.handleNext}
            handlePrev={this.handlePrev}
            handleStartDrag={this.handleStartDrag}
            decreaseTimeout={this.decreaseTimeout}
            headTitle={this.headTitle}
            handleChangeStopFlag={this.handleChangeStopFlag}
            hanndleChangeIsShowSavePopup={this.hanndleChangeIsShowSavePopup}
            turnIsShowDlePopup={this.turnIsShowDlePopup}
            generateRandom={this.generateRandom}
            changeIsTraining={this.changeIsTraining}
            changeIsTrained={this.changeIsTrained}
            changeIsShowDlePopup={this.changeIsShowDlePopup}
            setBackground={this.setBackground}
            changeCalibrationType={this.changeCalibrationType}
            {...this.state}
          /> :
            this.state.isCut ?
              <CutImageRecognition
                intl={this.props.intl}
                isOpen={this.props.isOpen}
                onFinish={this.onFinish}
                handleOnDrag={this.handleOnDrag}
                handleEndDrag={this.handleEndDrag}
                handleNext={this.handleNext}
                handlePrev={this.handlePrev}
                handleStartDrag={this.handleStartDrag}
                decreaseTimeout={this.decreaseTimeout}
                headTitle={this.headTitle}
                handleChangeStopFlag={this.handleChangeStopFlag}
                hanndleChangeIsShowSavePopup={this.hanndleChangeIsShowSavePopup}
                turnIsShowDlePopup={this.turnIsShowDlePopup}
                generateRandom={this.generateRandom}
                changeIsTraining={this.changeIsTraining}
                changeIsTrained={this.changeIsTrained}
                changeIsShowDlePopup={this.changeIsShowDlePopup}
                setBackground={this.setBackground}
                changeCalibrationType={this.changeCalibrationType}
                {...this.state}
              /> :
              this.state.isFacial ?
                <FaceRecognition
                  intl={this.props.intl}
                  isOpen={this.props.isOpen}
                  onFinish={this.onFinish}
                  handleOnDrag={this.handleOnDrag}
                  handleEndDrag={this.handleEndDrag}
                  handleNext={this.handleNext}
                  handlePrev={this.handlePrev}
                  handleStartDrag={this.handleStartDrag}
                  decreaseTimeout={this.decreaseTimeout}
                  headTitle={this.headTitle}
                  handleChangeStopFlag={this.handleChangeStopFlag}
                  hanndleChangeIsShowSavePopup={this.hanndleChangeIsShowSavePopup}
                  turnIsShowDlePopup={this.turnIsShowDlePopup}
                  generateRandom={this.generateRandom}
                  changeIsTraining={this.changeIsTraining}
                  changeIsTrained={this.changeIsTrained}
                  changeIsShowDlePopup={this.changeIsShowDlePopup}
                  {...this.state}
                /> :
                <GeneralImageRecognition
                  intl={this.props.intl}
                  isOpen={this.props.isOpen}
                  onFinish={this.onFinish}
                  handleOnDrag={this.handleOnDrag}
                  handleEndDrag={this.handleEndDrag}
                  handleNext={this.handleNext}
                  handlePrev={this.handlePrev}
                  handleStartDrag={this.handleStartDrag}
                  decreaseTimeout={this.decreaseTimeout}
                  headTitle={this.headTitle}
                  handleChangeStopFlag={this.handleChangeStopFlag}
                  hanndleChangeIsShowSavePopup={this.hanndleChangeIsShowSavePopup}
                  turnIsShowDlePopup={this.turnIsShowDlePopup}
                  generateRandom={this.generateRandom}
                  changeIsTraining={this.changeIsTraining}
                  changeIsTrained={this.changeIsTrained}
                  changeIsShowDlePopup={this.changeIsShowDlePopup}
                  setBackground={this.setBackground}
                  changeCalibrationType={this.changeCalibrationType}
                  {...this.state}
                /> :
          ''
      }
      {
        this.props.isOpenPhoto ?
          <AIPhotographContainer
            handleFinish={this.onFinish}
            decreaseTimeout={this.decreaseTimeout}
            handleCaptureClick={this.onCaptureClick}
            generateRandom={this.generateRandom}
            initType={this.initType}
            {...this.state}
          /> : ''
      }
    </Fragment>
  )
}
AIContainer.propTypes = {
  handleCloseAI: PropTypes.func,
  handleOpenAI: PropTypes.func,
  isOpen: PropTypes.bool,
  isOpenPhoto: PropTypes.bool,
  isOnline: PropTypes.bool,
  handleOpenOnlinePop: PropTypes.func,
  isShowOnlinePop: PropTypes.bool,
  handleOpenAIPhoto: PropTypes.func,
  handleCloseAIPhoto: PropTypes.func,
  handleCloseOnlinePop: PropTypes.func,
  aiIdentificationData: PropTypes.object,
  handleSetImageListObj: PropTypes.func,
  handleSetCharacterNames: PropTypes.func,
  handleSetGeneralImageListObj: PropTypes.func,
  handleSetGeneralNames: PropTypes.func,
  handleSetCutImageListObj: PropTypes.func,
  handleSetCutClassNames: PropTypes.func,
  handleSetFaceImageListObj: PropTypes.func,
  handleSetFaceNames: PropTypes.func,
  handleSetCutColorImageListObj: PropTypes.func,
  handleSetCutColorClassNames: PropTypes.func,
  intl: intlShape.isRequired
};
const mapStatesToProps = states => ({
  isOpen: states.scratchGui.modals.ai_modal,
  isOpenPhoto: states.scratchGui.modals.ai_Photograph_Modal,
  isShowOnlinePop: states.scratchGui.modals.show_online_pop,
  isOnline: states.scratchGui.mode.isOnline,
  aiIdentificationData: states.scratchGui.ai
});
const mapDispatchToProps = dispatch => ({
  handleCloseAI: () => dispatch(closeAIModal()),
  handleOpenAI: () => dispatch(openAIModal()),
  handleOpenAIPhoto: () => dispatch(openAIPhotograph()),
  handleCloseAIPhoto: () => dispatch(closeAIPhotograph()),
  handleCloseOnlinePop: () => dispatch(closeOnlinePop()),
  handleOpenOnlinePop: () => dispatch(openOnlinePop()),
  handleSetImageListObj: imageListObj => dispatch(setImageListObj(imageListObj)),
  handleSetCharacterNames: characterNames => dispatch(setCharacterNames(characterNames)),
  handleSetGeneralImageListObj: generalImageListObj => dispatch(setGeneralImageListObj(generalImageListObj)),
  handleSetGeneralNames: generalNames => dispatch(setGeneralNames(generalNames)),
  handleSetCutImageListObj: cutImageListObj => dispatch(setCutImageListObj(cutImageListObj)),
  handleSetCutClassNames: cutClassNames => dispatch(setCutClassNames(cutClassNames)),
  handleSetFaceImageListObj: faceImageListObj => dispatch(setFaceImageListObj(faceImageListObj)),
  handleSetFaceNames: faceNames => dispatch(setFaceNames(faceNames)),
  handleSetCutColorImageListObj: cutColorImageListObj => dispatch(setCutColorImageListObj(cutColorImageListObj)),
  handleSetCutColorClassNames: cutColorClassNames => dispatch(setCutColorClassNames(cutColorClassNames))
});

export default connect(mapStatesToProps, mapDispatchToProps)(AIContainer);
