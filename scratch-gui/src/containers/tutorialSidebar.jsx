import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TutorialSidebar from '../components/tutorialCenter/tutorialSidebar.jsx';
import {
  changeIsShowTutorialSidebar,
  changePagenumber
} from '../reducers/tutorialCenter';

class TutorialsidebarContainer extends React.Component {

  closeTutorialSidebar = () => {
    this.props.onChangeIsShowTutorialSidebar(false);
  }
  render = () => (
    <TutorialSidebar
      isShowTutorialSidebar={this.props.isShowTutorialSidebar}
      closeTutorialSidebar={this.closeTutorialSidebar}
      pdfData={this.props.pdfData}
      onChangePagenumber={this.props.onChangePagenumber}
      pageNumber={this.props.pageNumber}
    />
  )
}

TutorialsidebarContainer.propTypes = {
  isShowTutorialSidebar: PropTypes.bool,
  onChangeIsShowTutorialSidebar: PropTypes.func,
  onChangePagenumber: PropTypes.func,
  pdfData: PropTypes.any,
  pageNumber: PropTypes.number
};

const mapStatesToProps = state => ({
  isShowTutorialSidebar: state.scratchGui.tutorialCenter.isShowTutorialSidebar,
  pageNumber: state.scratchGui.tutorialCenter.pageNumber,
  pdfData: state.scratchGui.tutorialCenter.pdfData
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeIsShowTutorialSidebar: flag => dispatch(changeIsShowTutorialSidebar(flag)),
  onChangePagenumber: index => dispatch(changePagenumber(index))
});

export default connect(mapStatesToProps, mapDispatchToProps)(TutorialsidebarContainer);
