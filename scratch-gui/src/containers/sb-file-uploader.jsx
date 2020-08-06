/* eslint-disable max-len */
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import ScratchBlocks from 'scratch-blocks';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Modal } from 'antd';

import log from '../lib/log';
import sharedMessages from '../lib/shared-messages';

import {
  LoadingStates,
  getIsLoadingUpload,
  getIsShowingWithoutId,
  onLoadedProject,
  requestProjectUpload
} from '../reducers/project-state';

import {
  openLoadingProject,
  closeLoadingProject
} from '../reducers/modals';
import {
  closeFileMenu
} from '../reducers/menus';
import { setDeviceIndex, setSpriteIndex } from '../reducers/tab-type';
import {
  isElectronEnv,
  getFileFromPath,
  getFileNameFromPath,
  showSyncDialog,
  showOpenDialog }
  from '../lib/electron-utils';

import { editAI } from '../lib/events';
const isWebSerialMode = !window.location.href.includes('localhost');

/**
 * SBFileUploader component passes a file input, load handler and props to its child.
 * It expects this child to be a function with the signature
 *     function (renderFileInput, loadProject) {}
 * The component can then be used to attach project loading functionality
 * to any other component:
 *
 * <SBFileUploader>{(renderFileInput, loadProject) => (
 *     <MyCoolComponent
 *         onClick={loadProject}
 *     >
 *         {renderFileInput()}
 *     </MyCoolComponent>
 * )}</SBFileUploader>
 */

const messages = defineMessages({
  loadError: {
    id: 'gui.projectLoader.loadError',
    defaultMessage: 'The project file that was selected failed to load.',
    description: 'An error that displays when a local project file fails to load.'
  }
});

class SBFileUploader extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'getProjectTitleFromFilename',
      'handleChange',
      'handleClick',
      'renderFileInput',
      'setFileInput',
      'onload',
      'resetFileInput'
    ]);
  }
  componentDidMount() {
    this.reader = new FileReader();
    this.reader.onload = this.onload;
    this.resetFileInput();
  }
  componentDidUpdate(prevProps) {
    if (this.props.isLoadingUpload && !prevProps.isLoadingUpload && this.fileToUpload && this.reader) {
      this.reader.readAsArrayBuffer(this.fileToUpload);
    }
  }
  componentWillUnmount() {
    this.reader = null;
    this.resetFileInput();
  }
  resetFileInput() {
    this.fileToUpload = null;
    if (this.fileInput) {
      this.fileInput.value = null;
    }
  }
  getProjectTitleFromFilename(fileInputFilename) {
    if (!fileInputFilename) return '';
    // only parse title with valid scratch project extensions
    // (.sb, .sb2, and .sb3)
    const matches = fileInputFilename.match(/^(.*)\.sb[23]?$/);
    if (!matches) return '';
    return matches[1].substring(0, 100); // truncate project title to max 100 chars
  }
  // called when user has finished selecting a file to upload
  handleChange(e) {
    const {
      intl,
      isShowingWithoutId,
      loadingState,
      projectChanged
    } = this.props;

    const thisFileInput = e.target;
    if (thisFileInput.files.length) { // Don't attempt to load if no file was selected
      this.fileToUpload = thisFileInput.files[0];
      // Allow upload to continue only after confirmation if the project
      // has changed and is not showing with ID. If it has an ID, this operation
      // does not currently overwrite that project, so it is safe to do without confirmation.
      const uploadAllowed = (isShowingWithoutId && projectChanged) ?
        confirm(intl.formatMessage(sharedMessages.replaceProjectWarning)) : // eslint-disable-line no-alert
        true;
      if (uploadAllowed) {
        this.props.requestProjectUpload(loadingState);
      } else {
        this.resetFileInput();
      }
    }
  }
  // called when file upload raw data is available in the reader
  onload() {
    if (this.reader) {
      this.props.beforeLoadProject();
      this.props.onLoadingStarted();
      const filename = this.fileToUpload && this.fileToUpload.name;
      this.props.vm.loadProject(this.reader.result)
        .then(() => {
          // Remove the hash if any (without triggering a hash change event or a reload)

          if ((window.toLoadAIData && window.toLoadAIData.generalImageListObj && window.toLoadAIData.generalImageListObj[0].length) ||
          (window.toLoadAIData && window.toLoadAIData.cutImageListObj && window.toLoadAIData.cutImageListObj[0].length) ||
          (window.toLoadAIData && window.toLoadAIData.cutColorImageListObj && window.toLoadAIData.cutColorImageListObj[0].length)){
            document.dispatchEvent(editAI(false, 'editAI', true));
          }
          if (window.toLoadAIData && window.toLoadAIData.faceImageListObj && window.toLoadAIData.faceImageListObj[0].length){
            document.dispatchEvent(editAI(true, 'editAIFace', true));
          }
          try { // Can fail e.g. when GUI is loaded from static file (integration tests)
            history.replaceState({}, document.title, '.');
          } catch {
            // No fallback, just do not trigger promise catch below
          }
          this.props.onLoadingFinished(this.props.loadingState, true);
          // Reset the file input after project is loaded
          // This is necessary in case the user wants to reload a project
          if (filename) {
            const uploadedProjectTitle = this.getProjectTitleFromFilename(filename);
            this.props.onUpdateProjectTitle(uploadedProjectTitle);
          }
          this.resetFileInput();

          // const extensions = this.props.vm.runtime.peripheralExtensions;
          // Object.keys(extensions).forEach(key => {
          //   if (extensions[key].disconnectAll){
          //     extensions[key].disconnectAll();
          //   }
          // });
        })
        .catch(error => {
          log.warn(error);
          alert(this.props.intl.formatMessage(messages.loadError)); // eslint-disable-line no-alert
          this.props.onLoadingFinished(this.props.loadingState, false);
          // Reset the file input after project is loaded
          // This is necessary in case the user wants to reload a project
          this.resetFileInput();
        });
    }
  }
  handleElectronUploader() {
    let stillOpen = true;
    if (this.props.projectChanged) {
      stillOpen = showSyncDialog('warning', this.props.intl.formatMessage(sharedMessages.replaceProjectWarning));
    }
    if (!stillOpen) return;
    const path = showOpenDialog();
    if (!path) return;
    this.props.beforeLoadProject();
    this.props.onLoadingStarted();
    this.props.requestProjectUpload(this.props.loadingState);
    const fileName = getFileNameFromPath(path);
    this.props.vm.loadProject(getFileFromPath(path))
      .then(() => {
        // try {
        //   history.replaceState({}, document.title, '.');
        // } catch {
        // // No fallback, just do not trigger promise catch below
        // }
        if ((window.toLoadAIData && window.toLoadAIData.generalImageListObj && window.toLoadAIData.generalImageListObj[0].length) ||
          (window.toLoadAIData && window.toLoadAIData.cutImageListObj && window.toLoadAIData.cutImageListObj[0].length) ||
          (window.toLoadAIData && window.toLoadAIData.cutColorImageListObj && window.toLoadAIData.cutColorImageListObj[0].length)){
          document.dispatchEvent(editAI(false, 'editAI', true));
        }
        if (window.toLoadAIData && window.toLoadAIData.faceImageListObj && window.toLoadAIData.faceImageListObj[0].length){
          document.dispatchEvent(editAI(true, 'editAIFace', true));
        }
        this.props.onLoadingFinished(this.props.loadingState, true);
        this.props.onUpdateProjectTitle(fileName);
      })
      .catch(error => {
        log.warn(error);
        this.props.onLoadingFinished(this.props.loadingState, false);
      });
  }
  handleClick() {
    if (isElectronEnv()) {
      this.handleElectronUploader();
    } else if (isWebSerialMode && this.props.connectedList.includes(this.props.vm.editingTarget.id)){
      Modal.confirm({
        title: ScratchBlocks.Msg.WARNING,
        content: ScratchBlocks.Msg.MODAL_CONTENT,
        okText: ScratchBlocks.Msg.MODAL_REFRESH,
        cancelText: ScratchBlocks.Msg.MODAL_CANCELTEXT,
        onOk() {
          window.history.go(0);
        },
        onCancel() {
        }
      });
    } else {
      this.fileInput.click();
    }

  }
  setFileInput(input) {
    this.fileInput = input;
  }
  renderFileInput() {
    return (
      <input
        accept=".sb,.sb2,.sb3"
        ref={this.setFileInput}
        style={{ display: 'none' }}
        type="file"
        onChange={this.handleChange}
      />
    );
  }
  render() {
    return this.props.children(this.props.className, this.renderFileInput, this.handleClick);
  }
}

SBFileUploader.propTypes = {
  beforeLoadProject: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  children: PropTypes.func,
  className: PropTypes.string,
  intl: intlShape.isRequired,
  isLoadingUpload: PropTypes.bool,
  isShowingWithoutId: PropTypes.bool,
  loadingState: PropTypes.oneOf(LoadingStates),
  onLoadingFinished: PropTypes.func,
  onLoadingStarted: PropTypes.func,
  onUpdateProjectTitle: PropTypes.func,
  projectChanged: PropTypes.bool,
  requestProjectUpload: PropTypes.func,
  vm: PropTypes.shape({
    loadProject: PropTypes.func,
    runtime: PropTypes.any,
    editingTarget: PropTypes.any
  }),
  connectedList: PropTypes.array
};
SBFileUploader.defaultProps = {
  className: ''
};
const mapStateToProps = state => {
  const loadingState = state.scratchGui.projectState.loadingState;
  return {
    isLoadingUpload: getIsLoadingUpload(loadingState),
    isShowingWithoutId: getIsShowingWithoutId(loadingState),
    loadingState: loadingState,
    projectChanged: state.scratchGui.projectChanged,
    vm: state.scratchGui.vm,
    connectedList: state.scratchGui.connectedDeviceStatus.connectedList
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoadingFinished: (loadingState, success) => {
    dispatch(onLoadedProject(loadingState, ownProps.canSave, success));
    dispatch(closeLoadingProject());
    dispatch(closeFileMenu());
  },
  beforeLoadProject: () => {
    dispatch(setDeviceIndex(''));
    dispatch(setSpriteIndex(''));
  },
  requestProjectUpload: loadingState => dispatch(requestProjectUpload(loadingState)),
  onLoadingStarted: () => dispatch(openLoadingProject())
});

// Allow incoming props to override redux-provided props. Used to mock in tests.
const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
  {}, stateProps, dispatchProps, ownProps
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(injectIntl(SBFileUploader));
