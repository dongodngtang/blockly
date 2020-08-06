import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AIPhotograph } from '../components/ai/photograph';
import { SHOWSMALLIMG, SHOWCUTSMALLIMGLIST } from '../lib/events';
import { setSelectcamera } from '../reducers/ai';

const showWidth = 800;
const initPos = {
  x: (window.innerWidth - showWidth) / 2,
  y: window.innerHeight / 4
};
class AIPhotographContainer extends React.Component {

  state = {
    x: initPos.x,
    y: initPos.y,
    validateImage: '',
    validateRes: [],
    dragging: false,
    smallImgClass: '',
    isShowSmallImg: false,
    isShowSmallCutImgs: false,
    cutSmallImgList: []
  }
  
  componentDidMount(){
    document.addEventListener(SHOWSMALLIMG, this.handleShowSmall);
    document.addEventListener(SHOWCUTSMALLIMGLIST, this.handleShowSmallImageList);
  }
  componentWillUnmount() {
    this.props.initType();
    document.removeEventListener(SHOWSMALLIMG, this.handleShowSmall);
    document.removeEventListener(SHOWCUTSMALLIMGLIST, this.handleShowSmallImageList);
  }

  handleShowSmall = ev => {
    this.setState({
      smallImgClass: this.props.generalNames[ev.detail],
      isShowSmallImg: true
    });
  }
  handleShowSmallImageList = ev => {
    this.setState({
      cutSmallImgList: ev.detail,
      isShowSmallCutImgs: true
    });
  }
  handleOnDrag = async (e_, { x, y }) => {
    if (y < 40 || y > window.innerHeight - 40) return;
    if (x < -400 || x > window.innerWidth - 150) return;
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
 
  render = () => {
    const {
      characterNames,
      handleFinish,
      isCut,
      timeoutSeconds,
      decreaseTimeout,
      isMaual,
      imageListObj,
      isShowSmallImg,
      cutClassNames,
      selectCamera,
      handleSetSelectcamera,
      isColorCut,
      cutColorClassNames
    } = this.props;
    return (
      <Fragment >
        <AIPhotograph
          onDrag={this.handleOnDrag}
          onEndDrag={this.handleEndDrag}
          onStartDrag={this.handleStartDrag}
          characterNames={characterNames}
          validateImage={this.validateImage}
          validateRes={this.validateRes}
          handleFinish={handleFinish}
          isCut={isCut}
          timeoutSeconds={timeoutSeconds}
          decreaseTimeout={decreaseTimeout}
          isMaual={isMaual}
          isShowSmallImg={isShowSmallImg}
          imageListObj={imageListObj}
          cutClassNames={cutClassNames}
          selectCamera={selectCamera}
          handleSetSelectcamera={handleSetSelectcamera}
          isColorCut={isColorCut}
          cutColorClassNames={cutColorClassNames}
          {...this.state}
        />
      </Fragment>);
  }
}


AIPhotographContainer.propTypes = {
  characterNames: PropTypes.array,
  handleFinish: PropTypes.func,
  imageListObj: PropTypes.any,
  intl: PropTypes.any,
  onSwitchType: PropTypes.func,
  isCut: PropTypes.bool,
  isColorCut: PropTypes.bool,
  timeoutSeconds: PropTypes.number,
  isMaual: PropTypes.bool,
  decreaseTimeout: PropTypes.func,
  isShowSmallImg: PropTypes.bool,
  generalNames: PropTypes.array,
  cutClassNames: PropTypes.array,
  cutColorClassNames: PropTypes.array,
  caliWs: PropTypes.object,
  step: PropTypes.number,
  generateRandom: PropTypes.func,
  handleSetSelectcamera: PropTypes.func,
  initType: PropTypes.func,
  selectCamera: PropTypes.array
};
const mapStatesToProps = states => ({
  selectCamera: states.scratchGui.ai.selectCamera,
  isShowSmallImg: states.scratchGui.modals.show_small_img,
  imageListObj: states.scratchGui.ai.imageListObj,
  characterNames: states.scratchGui.ai.characterNames,
  cutClassNames: states.scratchGui.ai.cutClassNames,
  generalNames: states.scratchGui.ai.generalNames,
  cutColorClassNames: states.scratchGui.ai.cutColorClassNames
});
const mapDispatchToProps = dispatch => ({
  handleSetSelectcamera: camera => dispatch(setSelectcamera(camera))
});
export default connect(mapStatesToProps, mapDispatchToProps)(AIPhotographContainer);
