import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { projectTitleInitialState, setProjectTitle } from '../reducers/project-title';
import downloadBlob from '../lib/download-blob';
import { setProjectUnchanged } from '../reducers/project-changed';
import { isElectronEnv, saveCurrentFile } from '../lib/electron-utils';
/**
 * Project saver component passes a downloadProject function to its child.
 * It expects this child to be a function with the signature
 *     function (downloadProject, props) {}
 * The component can then be used to attach project saving functionality
 * to any other component:
 *
 * <SB3Downloader>{(downloadProject, props) => (
 *     <MyCoolComponent
 *         onClick={downloadProject}
 *         {...props}
 *     />
 * )}</SB3Downloader>
 */
class SB3AutoDownloader extends React.Component {
  constructor (props) {
    super(props);
    bindAll(this, [
      'autoDownloadProject'
    ]);
  }
  autoDownloadProject () {
    this.props.saveProjectSb3().then(content => {
      if (this.props.onSaveFinished) {
        this.props.onSaveFinished();
      }
      if (isElectronEnv()) {
        saveCurrentFile(content);
      } else {
        downloadBlob(this.props.projectFilename, content);
      }
    });
  }
  render () {
    const {
      children
    } = this.props;
    return children(
      this.props.className,
      this.autoDownloadProject
    );
  }
}

export const getProjectFilename = (curTitle, defaultTitle) => {
  let filenameTitle = curTitle;
  if (!filenameTitle || filenameTitle.length === 0) {
    filenameTitle = defaultTitle;
  }
  return `${filenameTitle.substring(0, 100)}.sb3`;
};

SB3AutoDownloader.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  onSaveFinished: PropTypes.func,
  projectFilename: PropTypes.string,
  saveProjectSb3: PropTypes.func
};
SB3AutoDownloader.defaultProps = {
  className: ''
};

const mapStateToProps = state => ({
  saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
  projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState)
});
const mapDispatchToProps = dispatch => ({
  onSaveFinished: () => dispatch(setProjectUnchanged())

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SB3AutoDownloader);
