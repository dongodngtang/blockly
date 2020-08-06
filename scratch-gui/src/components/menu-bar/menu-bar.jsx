import classNames from 'classnames';
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import bowser from 'bowser';
import React from 'react';

import VM from 'scratch-vm';

import Box from '../box/box.jsx';
import { ComingSoonTooltip } from '../coming-soon/coming-soon.jsx';
import Divider from '../divider/divider.jsx';
import LanguageSelector from '../../containers/language-selector.jsx';
import SBFileUploader from '../../containers/sb-file-uploader.jsx';
import MenuBarMenu from './menu-bar-menu.jsx';
import { MenuItem, MenuSection, MenuHoverItem } from '../menu/menu.jsx';
import ProjectTitleInput from './project-title-input.jsx';
import SB3Downloader from '../../containers/sb3-downloader.jsx';
import SB3AutoDownloader from '../../containers/sb3-autoDownloader.jsx';

import DeletionRestorer from '../../containers/deletion-restorer.jsx';
import TurboMode from '../../containers/turbo-mode.jsx';
import Modal from '../../containers/modal';

import { openTipsLibrary } from '../../reducers/modals';
import { setPlayer } from '../../reducers/mode';
import {
  autoUpdateProject,
  getIsUpdating,
  getIsShowingProject,
  manualUpdateProject,
  requestNewProject,
  remixProject,
  saveProjectAsCopy
} from '../../reducers/project-state';
import {
  openAccountMenu,
  closeAccountMenu,
  accountMenuOpen,
  openFileMenu,
  closeFileMenu,
  fileMenuOpen,
  openEditMenu,
  closeEditMenu,
  editMenuOpen,
  openLanguageMenu,
  closeLanguageMenu,
  languageMenuOpen,
  openLoginMenu,
  closeLoginMenu,
  loginMenuOpen,
  openHelpMenu,
  closeHelpMenu,
  helpMenuOpen
} from '../../reducers/menus';

import collectMetadata from '../../lib/collect-metadata';

import styles from './menu-bar.css';
import dropdownCaret from './dropdown-caret.svg';
import languageIcon from '../language-selector/language-icon.svg';
import { setPose, setSpeedInfo } from '../../reducers/connection-modal';


import dobotLogo from './dobot-logo.png';

import sharedMessages from '../../lib/shared-messages';
import { getRecentFiles,
  getFileFromPath,
  getFileNameFromPath,
  isElectronEnv,
  showNeedSaveBox,
  canSaveCurrent,
  removeRecentFile,
  clearCurrentPath,
  setCurrentPath
} from '../../lib/electron-utils.js';

const ariaMessages = defineMessages({
  language: {
    id: 'gui.menuBar.LanguageSelector',
    defaultMessage: 'language selector',
    description: 'accessibility text for the language selection menu'
  },
  tutorials: {
    id: 'gui.menuBar.tutorialsLibrary',
    defaultMessage: 'Tutorials',
    description: 'accessibility text for the tutorials button'
  }
});

const MenuBarItemTooltip = ({
  children,
  className,
  enable,
  id,
  place = 'bottom'
}) => {
  if (enable) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }
  return (
    <ComingSoonTooltip
      className={classNames(styles.comingSoon, className)}
      place={place}
      tooltipClassName={styles.comingSoonTooltip}
      tooltipId={id}
    >
      {children}
    </ComingSoonTooltip>
  );
};


MenuBarItemTooltip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  enable: PropTypes.bool,
  id: PropTypes.string,
  place: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

const MenuItemTooltip = ({ id, isRtl, children, className }) => (
  <ComingSoonTooltip
    className={classNames(styles.comingSoon, className)}
    isRtl={isRtl}
    place={isRtl ? 'left' : 'right'}
    tooltipClassName={styles.comingSoonTooltip}
    tooltipId={id}
  >
    {children}
  </ComingSoonTooltip>
);

MenuItemTooltip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  isRtl: PropTypes.bool
};

class MenuBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showRecent: false,
      showRecentAlertPath: null
    };
    bindAll(this, [
      'handleClickNew',
      'handleClickSave',
      'handleKeyPress',
      'handleLanguageMouseUp',
      'handleRestoreOption',
      'handleSaveToComputer',
      'restoreOptionMessage'
    ]);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.fileMenuOpen) {
      return Object.assign({}, prevState, { showRecent: false });
    }
    return prevState;
  }
  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  needSaveCheck = dowloadCB => {
    const formatMessage = this.props.intl.formatMessage;
    const showMessage = formatMessage(sharedMessages.replaceProjectWarning);
    const confirmMessage = formatMessage({ id: 'gui.prompt.ok' });
    const cancleMessage = formatMessage({ id: 'gui.prompt.cancel' });
    const saveMessage = formatMessage({ id: 'gui.cameraModal.save' });
    if (this.props.projectChanged && !this.props.canCreateNew) {
      if (isElectronEnv()) {
        const result = showNeedSaveBox({
          showMessage,
          saveMessage,
          confirmMessage,
          cancleMessage });
        if (result === saveMessage) {
          dowloadCB();
          return true;
        } else if (result === cancleMessage) {
          return false;
        }
        return true;
      }
      return confirm( // eslint-disable-line no-alert
        showMessage
      );
    }
    return true;
  }
  handleClickNew (dowloadCB) {
    return () => {
      clearCurrentPath();
      let readyToReplaceProject = true;
      // if the project is dirty, and user owns the project, we will autosave.
      // but if they are not logged in and can't save, user should consider
      // downloading or logging in first.
      // Note that if user is logged in and editing someone else's project,
      // they'll lose their work.
      readyToReplaceProject = this.needSaveCheck(dowloadCB);
      this.props.onRequestCloseFile();
      if (readyToReplaceProject) {
        this.props.onClickNew(this.props.canSave && this.props.canCreateNew);
        // 置零速度条
        this.props.setSpeed({
          accelerationRatio: 0,
          velocityRatio: 0
        });
        
        // 置零pose
        this.props.onHandleSetPose(
          {
            x: '0',
            y: '0',
            z: '0',
            r: '0',
            jointAngle: ['0', '0', '0', '0']
          }
        );
        // 清空AIstarter变量数据
        window.variableList = [];
      }
      this.props.onRequestCloseFile();

      const extensions = this.props.vm.runtime.peripheralExtensions;
      Object.keys(extensions).forEach(key => {
        if (extensions[key].disconnectAll){
          extensions[key].disconnectAll();
        }
      });
    };
  }

  handleClickSave () {
    this.props.onClickSave();
    this.props.onRequestCloseFile();
  }

  handleRestoreOption (restoreFun) {
    return () => {
      restoreFun();
      this.props.onRequestCloseEdit();
    };
  }
  handleKeyPress (event) {
    const modifier = bowser.mac ? event.metaKey : event.ctrlKey;
    if (modifier && event.key === 's') {
      this.props.onClickSave();
      event.preventDefault();
    }
  }
  handleSaveToComputer (downloadProjectCallback) {
    return () => {
      this.props.onRequestCloseFile();
      downloadProjectCallback();
      if (this.props.onProjectTelemetryEvent) {
        const metadata = collectMetadata(this.props.vm, this.props.projectTitle, this.props.locale);
        this.props.onProjectTelemetryEvent('projectDidSave', metadata);
      }
    };
  }
  handleLanguageMouseUp (e) {
    if (!this.props.languageMenuOpen) {
      this.props.onClickLanguage(e);
    }
  }
  restoreOptionMessage (deletedItem) {
    switch (deletedItem) {
    case 'Sprite':
      return (<FormattedMessage
        defaultMessage="Restore Sprite"
        description="Menu bar item for restoring the last deleted sprite."
        id="gui.menuBar.restoreSprite"
      />);
    case 'Sound':
      return (<FormattedMessage
        defaultMessage="Restore Sound"
        description="Menu bar item for restoring the last deleted sound."
        id="gui.menuBar.restoreSound"
      />);
    case 'Costume':
      return (<FormattedMessage
        defaultMessage="Restore Costume"
        description="Menu bar item for restoring the last deleted costume."
        id="gui.menuBar.restoreCostume"
      />);
    default: {
      return (<FormattedMessage
        defaultMessage="Restore"
        description="Menu bar item for restoring the last deleted item in its disabled state." /* eslint-disable-line max-len */
        id="gui.menuBar.restore"
      />);
    }
    }
  }
  handleRecentClick = downloadProjectCallback => e => {
    if (this.needSaveCheck(downloadProjectCallback)) {
      const path = e.target.textContent;
      const data = getFileFromPath(path);
      setCurrentPath(path);
      if (data) {
        this.props.vm.loadProject(data)
          .then(() => {
            const fileName = getFileNameFromPath(path);
            this.props.onUpdateProjectTitle(fileName);
          });
      } else {
        this.setState({
          showRecentAlertPath: path
        });
        removeRecentFile(path);
      }
    }
    this.props.onRequestCloseFile();
  }
  handleRecentAlertClose = () => {
    this.setState({
      showRecentAlertPath: null
    });
  }
  render () {
    const newProjectMessage = (
      <FormattedMessage
        defaultMessage="New"
        description="Menu bar item for creating a new project"
        id="gui.menuBar.new"
      />
    );
    const recentProjectMessage = (
      <FormattedMessage
        defaultMessage="Recent"
        description="Menu bar item for open recent project"
        id="gui.menuBar.recent"
      />
    );
    const saveRecentMessage = (
      <FormattedMessage
        defaultMessage="Save"
        description="Save current File"
        id="gui.menuBar.saveCurrent"
      />
    );
    const recentAlert = (
      this.state.showRecentAlertPath ? (<Modal
        onRequestClose={this.handleRecentAlertClose}
        contentLabel="Open File Error"
        className={styles.recentFileAlert}
      >
        <div className={styles.recentAlertContent}>
          <FormattedMessage
            defaultMessage="Unable to open the file"
            id="gui.menuBar.recentFileMiss1"
          />
          <span>{this.state.showRecentAlertPath}</span>
          <FormattedMessage
            defaultMessage="This project may be renamed, deleted or moved."
            id="gui.menuBar.recentFileMiss2"
          />
        </div></Modal>) : null
    );
    return (
      <Box
        className={classNames(
          this.props.className,
          styles.menuBar
        )}
      >
        {recentAlert}
        <div className={styles.mainMenu}>
          <div className={styles.fileGroup}>
            <div className={classNames(styles.menuBarItem)}>
              <img
                alt="Scratch"
                className={classNames(styles.dobotLogo, {
                  [styles.clickable]: typeof this.props.onClickLogo !== 'undefined'
                })}
                draggable={false}
                src={dobotLogo}
                onClick={this.props.onClickLogo}
              />
            </div>
            <div
              className={classNames(styles.menuBarItem, styles.hoverable, styles.languageMenu)}
              onMouseUp={this.props.onClickLanguage}
            >
              <div >
                <img
                  className={styles.languageIcon}
                  src={languageIcon}
                />
                <img
                  className={styles.languageCaret}
                  src={dropdownCaret}
                />
              </div>
              <LanguageSelector label={this.props.intl.formatMessage(ariaMessages.language)} />
            </div>
            <div
              className={classNames(styles.menuBarItem, styles.hoverable, {
                [styles.active]: this.props.fileMenuOpen
              })}
              onMouseUp={this.props.onClickFile}
            >
              <FormattedMessage
                defaultMessage="File"
                description="Text for file dropdown menu"
                id="gui.menuBar.file"
              />
              <MenuBarMenu
                className={classNames(styles.menuBarMenu)}
                open={this.props.fileMenuOpen}
                place={this.props.isRtl ? 'left' : 'right'}
                onRequestClose={this.props.onRequestCloseFile}
              >
                <MenuSection>
                  <SB3Downloader>{(className, downloadProjectCallback) => (
                    <MenuItem
                      isRtl={this.props.isRtl}
                      onClick={this.handleClickNew(downloadProjectCallback)}
                    >
                      {newProjectMessage}
                    </MenuItem>
                  )}</SB3Downloader>
                 
                </MenuSection>
                <MenuSection>
                  {canSaveCurrent() ?
                    (<SB3AutoDownloader>{(className, autoDownloadProject) => (
                      <MenuItem onClick={this.handleSaveToComputer(autoDownloadProject)}>
                        {saveRecentMessage}
                      </MenuItem>)}
                    </SB3AutoDownloader>) :
                    (<SB3Downloader>
                      {(className, downloadProjectCallback) => (
                        <MenuItem
                          className={className}
                          onClick={this.handleSaveToComputer(downloadProjectCallback)}
                        >
                          {saveRecentMessage}
                        </MenuItem>
                      )}</SB3Downloader>
                    )}
                </MenuSection>
                <MenuSection>
                  <SBFileUploader onUpdateProjectTitle={this.props.onUpdateProjectTitle}>
                    {(className, renderFileInput, loadProject) => (
                      <MenuItem
                        className={className}
                        onClick={loadProject}
                      >
                        <FormattedMessage
                          defaultMessage="Load from your computer"
                          description={
                            'Menu bar item for uploading a project from your computer'
                          }
                          id="gui.menuBar.uploadFromComputer"
                        />
                        {renderFileInput()}
                      </MenuItem>
                    )}
                  </SBFileUploader>
                  <SB3Downloader>{(className, downloadProjectCallback) => (
                    <MenuItem
                      className={className}
                      onClick={this.handleSaveToComputer(downloadProjectCallback)}
                    >
                      <FormattedMessage
                        defaultMessage="Save to your computer"
                        description="Menu bar item for downloading a project to your computer"
                        id="gui.menuBar.downloadToComputer"
                      />
                    </MenuItem>
                  )}</SB3Downloader>
                </MenuSection>
                <MenuSection>
                  <MenuHoverItem
                    isRtl={this.props.isRtl}
                    onMouseEnter={() => this.setState({
                      showRecent: true
                    })}
                    onMouseLeave={e => {
                      if (e.movementY < 0) {
                        this.setState({
                          showRecent: false
                        });
                      }
                    }}
                  >
                    {recentProjectMessage}
                  </MenuHoverItem>
                </MenuSection>
              </MenuBarMenu>
              <MenuBarMenu
                className={classNames(styles.recentFilesMenu)}
                open={this.state.showRecent && this.props.fileMenuOpen}
                place={this.props.isRtl ? 'left' : 'right'}
                onRequestClose={this.props.onRequestCloseFile}
                top="160px"
              >
                <SB3Downloader>{(className, downloadProjectCallback) => (
                  <MenuSection>
                    {getRecentFiles().map(item => (
                      <MenuItem
                        key={item}
                        isRtl={this.props.isRtl}
                        onClick={this.handleRecentClick(downloadProjectCallback)}
                      >
                        {item}
                      </MenuItem>
                    ))
                    }
                  </MenuSection>
                )}</SB3Downloader>
              </MenuBarMenu>
            </div>
            <div
              className={classNames(styles.menuBarItem, styles.hoverable, {
                [styles.active]: this.props.editMenuOpen
              })}
              onMouseUp={this.props.onClickEdit}
            >
              <div className={classNames(styles.editMenu)}>
                <FormattedMessage
                  defaultMessage="Edit"
                  description="Text for edit dropdown menu"
                  id="gui.menuBar.edit"
                />
              </div>
              <MenuBarMenu
                className={classNames(styles.menuBarMenu)}
                open={this.props.editMenuOpen}
                place={this.props.isRtl ? 'left' : 'right'}
                onRequestClose={this.props.onRequestCloseEdit}
              >
                <DeletionRestorer>{(handleRestore, { restorable, deletedItem }) => (
                  <MenuItem
                    className={classNames({ [styles.disabled]: !restorable })}
                    onClick={this.handleRestoreOption(handleRestore)}
                  >
                    {this.restoreOptionMessage(deletedItem)}
                  </MenuItem>
                )}</DeletionRestorer>
                <MenuSection>
                  <TurboMode>{(toggleTurboMode, { turboMode }) => (
                    <MenuItem onClick={toggleTurboMode}>
                      {turboMode ? (
                        <FormattedMessage
                          defaultMessage="Turn off Turbo Mode"
                          description="Menu bar item for turning off turbo mode"
                          id="gui.menuBar.turboModeOff"
                        />
                      ) : (
                        <FormattedMessage
                          defaultMessage="Turn on Turbo Mode"
                          description="Menu bar item for turning on turbo mode"
                          id="gui.menuBar.turboModeOn"
                        />
                      )}
                    </MenuItem>
                  )}</TurboMode>
                </MenuSection>
              </MenuBarMenu>
            </div>
            <div
              className={classNames(styles.menuBarItem, styles.hoverable, {
                [styles.active]: this.props.helpMenuOpen
              })}
              onMouseUp={this.props.onClickHelp}
            >
              <div className={classNames(styles.editMenu)}>
                <FormattedMessage
                  defaultMessage="Help"
                  id="gui.menuBar.Help"
                />
              </div>
              <MenuBarMenu
                className={classNames(styles.menuBarMenu)}
                open={this.props.helpMenuOpen}
                place={this.props.isRtl ? 'left' : 'right'}
                onRequestClose={this.props.onRequestCloseHelp}
              >
                <MenuSection>
                  <MenuItem onClick={this.props.onCheckUpdate}>
                    <FormattedMessage
                      defaultMessage="CheckUpdate"
                      id="gui.menuBar.checkupdate"
                    />
                  </MenuItem>
                  <MenuItem onClick={this.props.onCheckFirmwareUpdate}>
                    <FormattedMessage
                      defaultMessage="Firmware update"
                      id="gui.updated.FirmwareUpdate"
                    />
                  </MenuItem>
                </MenuSection>

              </MenuBarMenu>
            </div>
            <div
              className={classNames(styles.menuBarItem, styles.hoverable, {
                [styles.active]: this.props.helpMenuOpen
              })}
              onMouseUp={this.props.onShowTutorialCenter}
            >
              <div className={classNames(styles.editMenu)}>
                <FormattedMessage
                  defaultMessage="Tutorial Center"
                  id="gui.tutorialCenter"
                />
              </div>
            </div>
          </div>
          <Divider className={classNames(styles.divider)} />
          <div className={classNames(styles.menuBarItem, styles.growable)}>
            <MenuBarItemTooltip
              enable
              id="title-field"
            >
              <ProjectTitleInput
                className={classNames(styles.titleFieldGrowable)}
                onUpdateProjectTitle={this.props.onUpdateProjectTitle}
              />
            </MenuBarItemTooltip>
          </div>
        </div>
      </Box>
    );
  }
}

MenuBar.propTypes = {
  canCreateNew: PropTypes.bool,
  canSave: PropTypes.bool,
  className: PropTypes.string,
  editMenuOpen: PropTypes.bool,
  fileMenuOpen: PropTypes.bool,
  helpMenuOpen: PropTypes.bool,
  intl: intlShape,
  isRtl: PropTypes.bool,
  languageMenuOpen: PropTypes.bool,
  locale: PropTypes.any,
  onCheckUpdate: PropTypes.func,
  onCheckFirmwareUpdate: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickFile: PropTypes.func,
  onClickHelp: PropTypes.func,
  onClickLanguage: PropTypes.func,
  onClickLogo: PropTypes.func,
  onClickNew: PropTypes.func,
  onClickSave: PropTypes.func,
  onProjectTelemetryEvent: PropTypes.func,
  onRequestCloseEdit: PropTypes.func,
  onRequestCloseFile: PropTypes.func,
  onRequestCloseHelp: PropTypes.func,
  onUpdateProjectTitle: PropTypes.func,
  projectChanged: PropTypes.bool,
  projectTitle: PropTypes.string,
  vm: PropTypes.instanceOf(VM).isRequired,
  setSpeed: PropTypes.func,
  onHandleSetPose: PropTypes.func,
  onShowTutorialCenter: PropTypes.func
};

MenuBar.defaultProps = {
  onShare: () => { }
};

const mapStateToProps = state => {
  const loadingState = state.scratchGui.projectState.loadingState;
  const user = state.session && state.session.session && state.session.session.user;
  return {
    accountMenuOpen: accountMenuOpen(state),
    fileMenuOpen: fileMenuOpen(state),
    editMenuOpen: editMenuOpen(state),
    helpMenuOpen: helpMenuOpen(state),
    isRtl: state.locales.isRtl,
    isUpdating: getIsUpdating(loadingState),
    isShowingProject: getIsShowingProject(loadingState),
    languageMenuOpen: languageMenuOpen(state),
    locale: state.locales.locale,
    loginMenuOpen: loginMenuOpen(state),
    projectChanged: state.scratchGui.projectChanged,
    projectTitle: state.scratchGui.projectTitle,
    sessionExists: state.session && typeof state.session.session !== 'undefined',
    username: user ? user.username : null,
    vm: state.scratchGui.vm
  };
};

const mapDispatchToProps = dispatch => ({
  autoUpdateProject: () => dispatch(autoUpdateProject()),
  onOpenTipLibrary: () => dispatch(openTipsLibrary()),
  onClickAccount: () => dispatch(openAccountMenu()),
  onRequestCloseAccount: () => dispatch(closeAccountMenu()),
  onClickFile: () => dispatch(openFileMenu()),
  onRequestCloseFile: () => dispatch(closeFileMenu()),
  onClickEdit: () => dispatch(openEditMenu()),
  onRequestCloseEdit: () => dispatch(closeEditMenu()),
  onClickLanguage: () => dispatch(openLanguageMenu()),
  onRequestCloseLanguage: () => dispatch(closeLanguageMenu()),
  onClickLogin: () => dispatch(openLoginMenu()),
  onRequestCloseLogin: () => dispatch(closeLoginMenu()),
  onClickNew: needSave => dispatch(requestNewProject(needSave)),
  onClickRemix: () => dispatch(remixProject()),
  onClickSave: () => dispatch(manualUpdateProject()),
  onClickSaveAsCopy: () => dispatch(saveProjectAsCopy()),
  onSeeCommunity: () => dispatch(setPlayer(true)),
  onClickHelp: () => dispatch(openHelpMenu()),
  onRequestCloseHelp: () => dispatch(closeHelpMenu()),
  setSpeed: speedInfo => {
    dispatch(setSpeedInfo(speedInfo));
  },
  onHandleSetPose: poseData => {
    dispatch(setPose(poseData));
  }
});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar));
