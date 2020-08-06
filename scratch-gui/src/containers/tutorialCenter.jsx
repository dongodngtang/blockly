/* eslint-disable max-len */
import React from 'react';
import { intlShape } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VM from 'scratch-vm';
const path = window.require && window.require('path');
const fs = window.require && window.require('fs');
import {
  getIsShowingWithoutId,
  requestProjectUpload,
  LoadingStates,
  onLoadedProject
} from '../reducers/project-state';
import TutorialCenter from '../components/tutorialCenter';
import sharedMessages from '../lib/shared-messages';
import {
  showSyncDialog,
  getFileNameFromPath,
  getFileFromPath
} from '../lib/electron-utils';
import { setDeviceIndex, setSpriteIndex } from '../reducers/tab-type';
import {
  openLoadingProject,
  closeLoadingProject
} from '../reducers/modals';
import {
  closeFileMenu
} from '../reducers/menus';
import {
  changeIsShowTutorialSidebar,
  changeIsShowTutorialCenter,
  changeChooseproduct,
  changePdfData,
  changeIsSelectedTutorial,
  resetChooseproduct,
  changeActiveIndex,
  changePagenumber
} from '../reducers/tutorialCenter';
import log from '../lib/log';
import { TUTORIALPDFCHANGE } from '../lib/events.js';

class TutorialCenterContainer extends React.Component {

  constructor(props){
    super(props);
    this.chooseIndex = 0;
  }
  componentDidMount(){
    document.addEventListener(TUTORIALPDFCHANGE, () => {
      const { chooseproduct } = this.props;
      const pdfPath = path.join(window.__dirname, '..', '..', 'app', chooseproduct.name, `${chooseproduct.tutorialContent[this.chooseIndex].blocks}.pdf`);
      const pdfbuffer = fs.readFileSync(pdfPath);
      this.props.onChangePdfData(pdfbuffer);
    });
  }

  changeActiveIndex = index => {
    const chooseproduct = this.props.products.find((_, ind) => index === ind);
    this.props.onChangeChooseproduct(chooseproduct);
    this.props.onChangeActiveIndex(index);
  }

  closeTutorialCenter = () => {
    this.props.onChangeisShowTutorialCenter(false);
    this.props.onResetChooseproduct();
  }

  tutorialDbckick = index => {
    this.chooseIndex = index;
    const { chooseproduct } = this.props;
    let stillOpen = true;
    if (this.props.projectChanged) {
      stillOpen = showSyncDialog('warning', this.props.intl.formatMessage(sharedMessages.replaceProjectWarning));
    }
    if (!stillOpen) return;
    const blocksPath = path.join(window.__dirname, '..', '..', 'app', chooseproduct.name, `${chooseproduct.tutorialContent[index].blocks}.sb3`);
    const pdfPath = path.join(window.__dirname, '..', '..', 'app', chooseproduct.name, `${chooseproduct.tutorialContent[index].blocks}.pdf`);
    const pdfbuffer = fs.readFileSync(pdfPath);
    
    this.props.beforeLoadProject();
    this.props.onLoadingStarted();
    this.props.requestProjectUpload(this.props.loadingState);
    const fileName = getFileNameFromPath(blocksPath);
    this.props.vm.loadProject(getFileFromPath(blocksPath))
      .then(() => {
        this.props.onLoadingFinished(this.props.loadingState, true);
        this.props.onUpdateProjectTitle(fileName);
        this.props.onChangePagenumber(1);
        this.props.onChangePdfData(pdfbuffer);
        this.props.onChangeIsSelectedTutorial(true);
        this.closeTutorialCenter();
        this.props.onChangeIsShowTutorialSidebar(true);
        this.props.toCloseCodePane();
      })
      .catch(error => {
        log.warn(error);
        this.props.onLoadingFinished(this.props.loadingState, false);
      });
  }


  render = () => (
    <div style={{ display: this.props.isShowTutorialCenter ? 'block' : 'none' }}>
      <TutorialCenter
        hideTutorialCenter={this.closeTutorialCenter}
        products={this.props.products}
        changeActiveIndex={this.changeActiveIndex}
        tutorialDbckick={this.tutorialDbckick}
        chooseproduct={this.props.chooseproduct}
        activeIndex={this.props.activeIndex}
      />
    </div>
  )
}

TutorialCenterContainer.propTypes = {
  onChangeisShowTutorialCenter: PropTypes.func,
  projectChanged: PropTypes.bool,
  intl: intlShape.isRequired,
  beforeLoadProject: PropTypes.func,
  onLoadingStarted: PropTypes.func,
  requestProjectUpload: PropTypes.func,
  onLoadingFinished: PropTypes.func,
  onUpdateProjectTitle: PropTypes.func,
  loadingState: PropTypes.oneOf(LoadingStates),
  vm: PropTypes.instanceOf(VM).isRequired,
  onChangeIsShowTutorialSidebar: PropTypes.func,
  onChangeChooseproduct: PropTypes.func,
  onChangePdfData: PropTypes.func,
  onChangePagenumber: PropTypes.func,
  products: PropTypes.array,
  chooseproduct: PropTypes.object,
  onChangeIsSelectedTutorial: PropTypes.func,
  toCloseCodePane: PropTypes.func,
  onResetChooseproduct: PropTypes.func,
  onChangeActiveIndex: PropTypes.func,
  activeIndex: PropTypes.number,
  isShowTutorialCenter: PropTypes.bool
};

const mapStatesToProps = state => {
  const loadingState = state.scratchGui.projectState.loadingState;
  return {
    isShowingWithoutId: getIsShowingWithoutId(loadingState),
    projectChanged: state.scratchGui.projectChanged,
    loadingState,
    products: state.scratchGui.tutorialCenter.products,
    chooseproduct: state.scratchGui.tutorialCenter.chooseproduct,
    activeIndex: state.scratchGui.tutorialCenter.activeIndex
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoadingFinished: (loadingState, success) => {
    dispatch(onLoadedProject(loadingState, success));
    dispatch(closeLoadingProject());
    dispatch(closeFileMenu());
  },
  onChangeisShowTutorialCenter: flag => dispatch(changeIsShowTutorialCenter(flag)),
  beforeLoadProject: () => {
    dispatch(setDeviceIndex(''));
    dispatch(setSpriteIndex(''));
  },
  onLoadingStarted: () => dispatch(openLoadingProject()),
  requestProjectUpload: loadingState => dispatch(requestProjectUpload(loadingState)),
  onChangeIsShowTutorialSidebar: flag => dispatch(changeIsShowTutorialSidebar(flag)),
  onChangeChooseproduct: chooseproduct => dispatch(changeChooseproduct(chooseproduct)),
  onChangePdfData: chooseproduct => dispatch(changePdfData(chooseproduct)),
  onChangeIsSelectedTutorial: flag => dispatch(changeIsSelectedTutorial(flag)),
  onResetChooseproduct: () => dispatch(resetChooseproduct()),
  onChangeActiveIndex: index => dispatch(changeActiveIndex(index)),
  onChangePagenumber: index => dispatch(changePagenumber(index))
});

export default connect(mapStatesToProps, mapDispatchToProps)(TutorialCenterContainer);
