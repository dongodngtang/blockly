import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CodeTutorialBtn from '../components/code-tutorial-btn/index';
import {
  changeIsShowTutorialSidebar
} from '../reducers/tutorialCenter';
import ArduinoCTab from './arduinoC-tab.jsx';

class CodeTutorialBtnContainer extends React.Component {

  shwoTutorialSidebar = () => {
    this.props.toCloseCodePane();
    this.props.onChangeIsShowTutorialSidebar(true);
  }
  
  render = () => (
    <Fragment>
      <ArduinoCTab
        deviceName={this.props.editingTarget.deviceName}
        closeCodePane={this.props.toCloseCodePane}
        showCodePane={this.props.showCodePane}
        translateCode={this.props.translateCode}
        code={this.props.code}
        onChangeIsShowTutorialSidebar={this.props.onChangeIsShowTutorialSidebar}
      />
      <CodeTutorialBtn
        shwoTutorialSidebar={this.shwoTutorialSidebar}
        isShowTutorialSidebar={this.props.isShowTutorialSidebar}
        isSelectedTutorial={this.props.isSelectedTutorial}
        showCodePane={this.props.toShowCodePane}
        isShowCodePane={this.props.showCodePane}
        deviceName={this.props.editingTarget.deviceName}
      />
    </Fragment>

  )
}

CodeTutorialBtnContainer.propTypes = {
  onChangeIsShowTutorialSidebar: PropTypes.func,
  isShowTutorialSidebar: PropTypes.bool,
  isSelectedTutorial: PropTypes.bool,
  editingTarget: PropTypes.any,
  translateCode: PropTypes.func,
  code: PropTypes.string,
  showCodePane: PropTypes.bool,
  toShowCodePane: PropTypes.func,
  toCloseCodePane: PropTypes.func
};

const mapStatesToProps = state => ({
  isShowTutorialSidebar: state.scratchGui.tutorialCenter.isShowTutorialSidebar,
  isSelectedTutorial: state.scratchGui.tutorialCenter.isSelectedTutorial,
  editingTarget: state.scratchGui.vm.editingTarget || { deviceName: 'magician' }
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeIsShowTutorialSidebar: flag => dispatch(changeIsShowTutorialSidebar(flag))
});

export default connect(mapStatesToProps, mapDispatchToProps)(CodeTutorialBtnContainer);
