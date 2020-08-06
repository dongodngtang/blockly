import React, { Fragment } from 'react';
import { Calibration, CalibrationMachanical } from '../components/calibration';
import { connect } from 'react-redux';
import {
  openCalibrationModal,
  closeCalibrationModal,
  openCalibrationMachanicalModal,
  closeCalibrationMachanicalModal
} from '../reducers/modals';
import PropTypes from 'prop-types';
import {
  STARTCALIBRATION,
  STARTMACHANICALCALIBRATION,
  EXPORTCALIBRATION,
  IMPORTCALIBRATION,
  EDITCALIBRATION } from '../lib/events';
import { readFileFromInput, exportCalibrateData, importCalibrateData } from '../lib/file-read';
import calibrationWs from '../lib/calibration';
class CalibrationContainer extends React.Component {
  state = {
    step: 0,
    x: 0,
    y: 0,
    draging: false,
    imageListObj: { 0: [] },
    autoImageListObj: { 0: [] },
    characterNames: { 0: '' },
    autoCharacterNames: { 0: '' },
    tabList: [0],
    autoTabList: [0],
    selectTabIndex: 0,
    mode: 0,
    validateImage: '',
    validateRes: [],
    blockHeight: 0,
    rectArray: [],
    isInited: false
  }

  static getDerivedStateFromProps (prevProps, state) {
    if (prevProps.isOpen && !state.isInited) {
      this.caliWs = calibrationWs.getSingleInstace();
      return Object.assign({}, state, {
        isInited: true
      });
    }
    return state;
  }
  componentDidMount() {
    document.addEventListener(STARTCALIBRATION, ev => {
      if (ev.detail.isInit) {
        if (confirm('Reset All?')) {
          this.setState(JSON.parse(JSON.stringify(this.initState)), this.props.handleOpenCalibration);
        }
      } else {
        this.init(this.props.handleOpenCalibration);
      }
    });
    document.addEventListener(STARTMACHANICALCALIBRATION, () => {
      this.init(this.props.handleOpenMachanicalCalibration);
    });
    document.addEventListener(EXPORTCALIBRATION, () => {
      exportCalibrateData(this.state);
    });
    document.addEventListener(IMPORTCALIBRATION, () => {
      importCalibrateData().then(res => {
        window.calibrationState = res;
        window.updateToolboxXML(true);
        this.setState(res);
      });
    });
    document.addEventListener(EDITCALIBRATION, () => {
      this.init(this.props.handleOpenCalibration);
      window.updateToolboxXML(true);
    });
  }

  initState = {
    step: 0,
    x: 0,
    y: 0,
    draging: false,
    imageListObj: { 0: [] },
    autoImageListObj: { 0: [] },
    characterNames: { 0: '' },
    autoCharacterNames: { 0: '' },
    tabList: [0],
    autoTabList: [0],
    selectTabIndex: 0,
    mode: 0,
    validateImage: '',
    validateRes: [],
    blockHeight: 0,
    rectArray: []
  }
  init = callback => {
    this.setState({
      
    }, callback);
  }
  changeMode = index => {
    if (index === this.state.mode) return;
    this.setState({
      mode: index
    });
  }
  changeIndex = index => {
    this.setState({
      selectIndex: index
    });
  }
  changeTab = index => {
    if (index === this.state.selectTabIndex) return;
    this.setState({
      selectTabIndex: index
    });
  }
  addTab = () => {
    const tabLiKey = this.state.mode ? 'autoTabList' : 'tabList';
    const characterNamesKey = this.state.mode ? 'autoCharacterNames' : 'characterNames';
    const cloneTabList = [...this.state[tabLiKey]];
    const lastTab = cloneTabList[cloneTabList.length - 1] + 1;
    cloneTabList.push(lastTab);
    const cloneCharacterNames = { ...this.state[characterNamesKey] };
    cloneCharacterNames[lastTab] = '';
    this.setState({
      [tabLiKey]: cloneTabList,
      selectTabIndex: cloneTabList.length - 1,
      [characterNamesKey]: cloneCharacterNames
    });
  }
  handlePrev = () => {
    this.setState(prevState => ({
      step: prevState.step - 1
    }));
  }
  handleNext = () => {
    if (this.state.step === 1) {
      const tabIndexes = [];
      const imageLists = [];
      let tabLiKey; let imageLi;
      // 进行分类训练
      if (this.state.mode) {
        tabLiKey = 'autoTabList';
        imageLi = 'autoImageListObj';
      } else {
        tabLiKey = 'tabList';
        imageLi = 'imageListObj';
      }
      console.log(this.state[imageLi]);
      this.state[tabLiKey].forEach(tabIndex => {
        this.state[imageLi][tabIndex].forEach(img => {
          tabIndexes.push(tabIndex);
          imageLists.push(img);
        });
      });
      const size = this.state[tabLiKey].length;
      let flag = 0;
      // TODO: websocket 无法正常发送
      while (flag !== 2) {
        const end = imageLists.length > 1 ? 1 : imageLists.length;
        const sendList = imageLists.splice(0, end);
        const tabIndex = tabIndexes.splice(0, end);
        this.caliWs.classifyImage(sendList, tabIndex, size, flag).then(res => {
          console.log(res);
        });
        if (imageLists.length === 0) {
          flag = 2;
        } else {
          flag = 1;
        }
      }
      this.caliWs.classifyImage([], [], size, flag).then(res => {
        console.log(res);
      });
    }
    this.setState(prevState => ({
      step: prevState.step + 1,
      selectTabIndex: 0,
      rectArray: []
    }));
  }
  handleOnDrag = (e_, { x, y }) => {
    this.setState({
      x,
      y
    });
  }
  onAddImage = files => {
    readFileFromInput(files).then(res => {
      this.addImageList(res);
    });
  }
  addImageList = res => {
    const tabLiKey = this.state.mode ? 'autoTabList' : 'tabList';
    const imageLiKey = this.state.mode ? 'autoImageListObj' : 'imageListObj';
    const index = this.state[tabLiKey][this.state.selectTabIndex];
    const tempImageList = [...(this.state[imageLiKey][index] || [])];
    tempImageList.push(res);
    this.setState({
      [imageLiKey]: Object.assign({}, this.state.imageListObj, { [index]: tempImageList })
    });
  }
  deleteImageList = imgIndex => {
    const tabLiKey = this.state.mode ? 'autoTabList' : 'tabList';
    const imageLiKey = this.state.mode ? 'autoImageListObj' : 'imageListObj';
    const index = this.state[tabLiKey][this.state.selectTabIndex];
    const tempImageList = [...this.state[imageLiKey][index]];
    tempImageList.splice(imgIndex, 1);
    this.setState({
      [imageLiKey]: Object.assign({}, this.state.imageListObj, { [index]: tempImageList })
    });
  }
  deleteTab = tabIndex => {
    const tabLiKey = this.state.mode ? 'autoTabList' : 'tabList';
    const imgLiKey = this.state.mode ? 'autoImageListObj' : 'imageListObj';
    const nameListKey = this.state.mode ? 'autoCharacterNames' : 'characterNames';
    const tempTabList = [...this.state[tabLiKey]];
    const tempImageList = { ...this.state[imgLiKey] };
    const tempNameList = { ...this.state[nameListKey] };
    let tempTabIndex = this.state.selectTabIndex;
    if (tabIndex === tempTabIndex && tempTabList.length) {
      // 如果删除的 tab 刚好被选中,tabList还有别的元素
      tempTabIndex = 0;
    } else if (tabIndex < tempTabIndex) {
      tempTabIndex -= 1;
    }
    delete tempImageList[tabIndex];
    delete tempNameList[tabIndex];
    tempTabList.splice(tabIndex, 1);
    this.setState({
      selectTabIndex: tempTabIndex,
      [tabLiKey]: tempTabList,
      [imgLiKey]: tempImageList,
      [nameListKey]: tempNameList
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
  onCaptureClick = (data, needRect) => {
    if (this.state.mode && needRect) {
      this.caliWs.cutImage(data).then(rectArray => {
        this.setState({
          rectArray
        });
      });
    } else {
      this.addImageList(data);
    }
  }
  generateRandom = (base = 1) => Number((base * Math.random()).toFixed(2))
  onCalibrationValidateImgChange = files => {
    if (typeof files === 'string') {
      console.log(files);
      this.caliWs.groupImage(files).then(res => {
        const characters = this.state.mode ? this.state.autoCharacterNames : this.state.characterNames;
        const tempValidateRes = [];
        Object.keys(characters).forEach(index => {
          tempValidateRes.push({
            name: characters[index],
            value: (parseInt(index, 10) === res ? 96 + this.generateRandom(4) : this.generateRandom())
          });
        });
        this.setState({
          validateRes: tempValidateRes
        });
      });
    } else {
      readFileFromInput(files).then(res => {
        this.caliWs.groupImage(res);
        this.setState({
          validateImage: res
        });
      });
    }
  }
  onBlockHeightInputChange = value => this.setState({ blockHeight: value })
  onCharacterNameChange = value => {
    const characterNamesKey = this.state.mode ? 'autoCharacterNames' : 'characterNames';
    const tabListKey = this.state.mode ? 'autoTabList' : 'tabList';
    const tempCharacterNames = { ...this.state[characterNamesKey] };
    tempCharacterNames[this.state[tabListKey][this.state.selectTabIndex]] = value;
    this.setState({ [characterNamesKey]: tempCharacterNames });
  }
  onFinish = () => {
    window.calibrationState = this.state;
    this.props.handleCloseCalibration();
  }
  render = () => {
    const tempProps = {
      ...this.state
    };
    if (!tempProps.isInited) return null;
    let imageLi; let tabLi; let characterNamesLi;
    if (this.state.mode) {
      imageLi = this.state.autoImageListObj;
      tabLi = this.state.autoTabList;
      characterNamesLi = this.state.autoCharacterNames;
    } else {
      imageLi = this.state.imageListObj;
      tabLi = this.state.tabList;
      characterNamesLi = this.state.characterNames;
    }
    // 按照 mode 传入不同的数据
    delete tempProps.autoImageListObj;
    delete tempProps.autoCharacterNames;
    delete tempProps.autoTabList;
    tempProps.imageListObj = imageLi;
    tempProps.tabList = tabLi;
    tempProps.characterNames = characterNamesLi;
    return (
      <Fragment >
        <div
          style={{
            display: (this.props.isOpen ? 'block' : 'none')
          }}
        >
          <Calibration
            addTab={this.addTab}
            changeTab={this.changeTab}
            dragging={this.state.draging}
            handleAddImage={this.onAddImage}
            handleBlockHeightChange={this.onBlockHeightInputChange}
            handleCaptureClick={this.onCaptureClick}
            handleCharacterNameChange={this.onCharacterNameChange}
            handleDeleteImg={this.deleteImageList}
            handleDeleteTab={this.deleteTab}
            handleModeChange={this.changeMode}
            handleValidateInputChange={this.onCalibrationValidateImgChange}
            handleFinish={this.onFinish}
            intl={this.props.intl}
            onCloseCards={this.props.handleCloseCalibration}
            onDrag={this.handleOnDrag}
            onEndDrag={this.handleEndDrag}
            onNextStep={this.handleNext}
            onPrevStep={this.handlePrev}
            onStartDrag={this.handleStartDrag}
            totalSteps={3}
            {...tempProps}
          />
        </div>
        <div
          style={{
            display: (this.props.isMachanicalOpen ? 'block' : 'none')
          }}
        >
          <CalibrationMachanical
            dragging={this.state.draging}
            intl={this.props.intl}
            onCloseCards={this.props.handleCloseMachanicalCalibration}
            onDrag={this.handleOnDrag}
            onEndDrag={this.handleEndDrag}
            onNextStep={this.handleNext}
            onPrevStep={this.handlePrev}
            onStartDrag={this.handleStartDrag}
            step={this.state.step}
            totalSteps={2}
            {...this.state}
          />
        </div>
      </Fragment>);
  }
}
CalibrationContainer.propTypes = {
  handleCloseCalibration: PropTypes.func,
  handleCloseMachanicalCalibration: PropTypes.func,
  handleOpenCalibration: PropTypes.func,
  handleOpenMachanicalCalibration: PropTypes.func,
  intl: PropTypes.any,
  isOpen: PropTypes.bool,
  isMachanicalOpen: PropTypes.bool
};
const mapStatesToProps = states => ({
  isOpen: states.scratchGui.modals.calibration,
  isMachanicalOpen: states.scratchGui.modals.calibration_machanical
});
const mapDispatchToProps = dispatch => ({
  handleCloseCalibration: () => dispatch(closeCalibrationModal()),
  handleOpenCalibration: () => dispatch(openCalibrationModal()),
  handleCloseMachanicalCalibration: () => dispatch(closeCalibrationMachanicalModal()),
  handleOpenMachanicalCalibration: () => dispatch(openCalibrationMachanicalModal())
});

export default connect(mapStatesToProps, mapDispatchToProps)(CalibrationContainer);
