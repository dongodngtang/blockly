/* eslint-disable no-invalid-this */
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import VM from 'scratch-vm';
import { injectIntl, intlShape } from 'react-intl';

import ErrorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import {
  getIsError,
  getIsShowingProject
} from '../reducers/project-state';
import { setProjectTitle } from '../reducers/project-title';
import {
  activateTab,
  BLOCKS_TAB_INDEX,
  COSTUMES_TAB_INDEX,
  SOUNDS_TAB_INDEX,
  ARUINOC_TAB_INDEX
} from '../reducers/editor-tab';

import {
  closeCostumeLibrary,
  closeBackdropLibrary,
  closeTelemetryModal,
  openExtensionLibrary
} from '../reducers/modals';

import {
  showUpdate,
  changeIsAnupdate,
  changeIsCheck,
  changeIsNewest,
  changeisAutoUpdate
} from '../reducers/version-update';
import {
  showFirmwareUpdate,
  changeIsAnFirmwareupdate,
  changeIsFirmwareCheck,
  changeIsFirmwareNewest
} from '../reducers/firmware-update';
import {
  changeIsShowTutorialCenter
} from '../reducers/tutorialCenter';

import FontLoaderHOC from '../lib/font-loader-hoc.jsx';
import ProjectFetcherHOC from '../lib/project-fetcher-hoc.jsx';
import ProjectSaverHOC from '../lib/project-saver-hoc.jsx';
import storage from '../lib/storage';
import vmListenerHOC from '../lib/vm-listener-hoc.jsx';
import vmManagerHOC from '../lib/vm-manager-hoc.jsx';

import GUIComponent from '../components/gui/gui.jsx';
import { setIsScratchDesktop } from '../lib/isScratchDesktop.js';
import { setTabType } from '../reducers/tab-type.js';
import { autoCheckUpdate, autoCheckFirmwareUpdate } from '../lib/autoCheckUpdates.js';
import { showUpdateAlert, closeUpdateAlert } from '../reducers/alerts.js';
import { STARTVISUALSORT, OPEN_CALIBRATION, tutorialChange, alarmTypeChange } from '../lib/events.js';
import { viewCards } from '../reducers/arduino-init-cards.js';
import '../lib/generator';
import { generateBlocks } from '../lib/blocks/index.js';
import { openDeviceConnectionModal } from '../reducers/modals';
import {
  setDeviceConnectionModalExtensionId
} from '../reducers/device-conenct-modal';
import {
  setIsOnline
} from '../reducers/mode';
import { setTitleChanged } from '../reducers/project-state';
import { camera } from '../lib/video/camera';
const magicDeviceNames = ['magician', 'magicianlite', 'controller'];

class GUI extends React.Component {
    
  constructor(props) {
    super(props);
    // 覆盖原有积木的行为
    generateBlocks(this.props.intl, this.props.vm.runtime);
  }
    state = {
      isShowCalibration: false,
      code: '',
      showCodePane: false
    }
    componentDidMount () {
      this.props.handleSetIsOnline(navigator.onLine);
      window.addEventListener('online', () => {
        this.props.handleSetIsOnline(navigator.onLine);
      });
      window.addEventListener('offline', () => {
        this.props.handleSetIsOnline(navigator.onLine);
      });
      
      setIsScratchDesktop(this.props.isScratchDesktop);
      this.props.onStorageInit(storage);
      // 监听视觉套件的初始化
      document.addEventListener(STARTVISUALSORT, () => {
        this.props.onVisibleArduinoVisualCard();
      });
      this.props.vm.addListener('targetsUpdate', data => {
        if (data.editingTarget) {
          data.targetList.forEach(target => {
            if (target.id === data.editingTarget) {
              if (target.isDevice && this.props.targetTab !== 'device') {
                this.onTargetTabClick(0);
              } else if (!target.isDevice && this.props.targetTab === 'device') {
                this.onTargetTabClick(1);
              }
            }
          });
        }
      });
      // 坐标标定界面
      document.addEventListener(OPEN_CALIBRATION, () => {
        const { vm } = this.props;
        const extensionId = vm.editingTarget.deviceName;
        const deviceId = vm.editingTarget.id;
        const isConnected = this.props.connectedList.includes(deviceId);
        if (isConnected) {
          this.setState({
            isShowCalibration: true
          });
        } else {
          this.props.onHandleClickDeviceConnect(extensionId);
        }
      });
      if (!localStorage) return;
      if (localStorage.getItem('autoUpdate') === 'true'){
        this.props.onChangeisAutoUpdate(true);
      } else if (localStorage.getItem('autoUpdate') === 'false'){
        this.props.onChangeisAutoUpdate(false);
      }
      camera.getCameraList();
      document.dispatchEvent(tutorialChange);
      document.dispatchEvent(alarmTypeChange);
    }
    componentDidUpdate (prevProps) {
      if (this.props.projectId !== prevProps.projectId && this.props.projectId !== null) {
        this.props.onUpdateProjectId(this.props.projectId);
      }
      if (this.props.isShowingProject && !prevProps.isShowingProject) {
        // this only notifies container when a project changes from not yet loaded to loaded
        // At this time the project view in www doesn't need to know when a project is unloaded
        this.props.onProjectLoaded();
        // 自动检查软件更新
        if (this.props.isAutoUpdate){
          autoCheckUpdate();
        }
      }
      if (this.props.targetTab !== prevProps.targetTab ||
            this.props.targetDeviceIndex !== prevProps.targetDeviceIndex ||
            this.props.targetSpriteIndex !== prevProps.targetSpriteIndex) {
        // 切换角色或 tab 栏时默认选中第一个
        this.props.onActivateTab(BLOCKS_TAB_INDEX);
      }

    }

    // 坐标标定PTP
    calibrationSetPTPCmd(props){
      const { vm } = props;
      const extensionId = vm.editingTarget.deviceName;
      const deviceId = vm.editingTarget.id;
      const portName = vm.runtime.findKey(deviceId);
      vm.runtime.peripheralExtensions[extensionId].CalibrationSetPTPCmd(portName);
    }
    
    closeCalibration = () => {
      this.setState({
        isShowCalibration: false
      });
    };

    checkUpdate = () => {
      this.props.onShowUpdate();
      if (navigator.onLine) {
        autoCheckUpdate(true);
      }
    }

    checkFirmwareUpdate = () => {
      const { vm } = this.props;
      const extensionId = vm.editingTarget.deviceName;
      const deviceId = vm.editingTarget.id;
      const isConnected = this.props.connectedList.includes(deviceId);
      if (isConnected){
        this.props.onShowFirmwareUpdate();
        if (navigator.onLine) {
          const portName = vm.runtime.findKey(deviceId);
          autoCheckFirmwareUpdate(extensionId, portName, true);
        }
      } else if (extensionId === 'magician' || extensionId === 'magicianlite' || extensionId === 'controller'){
        this.props.onHandleClickDeviceConnect(extensionId);
      } else {
        alert('此设备不支持固件更新');
      }
    }
    onTargetTabClick = tab => {
      this.props.onSeleceTargetTab(tab);
      if (tab === 0 && this.props.targetDeviceIndex) {
        this.props.vm.setEditingTarget(this.props.targetDeviceIndex);
      } else if (this.props.targetSpriteIndex) this.props.vm.setEditingTarget(this.props.targetSpriteIndex);
    }
    onUpdateProjectTitle = newTitle => {
      this.props.handleSetTitleChanged();
      this.props.onUpdateReduxProjectTitle(newTitle);
    }

    showTutorialCenter = () => {
      this.props.onChangeisShowTutorialCenter(true);
    };

    translateCode = deviceName => {
      let code = '';
      try {
        switch (deviceName) {
        case 'arduinokit':
          Blockly.Arduino.Header = '#include "SmartKit.h"\n#include "Magician.h"';
          break;
        case 'aistarter':
          Blockly.Arduino.Header = '#include "AIStarter.h"';
          break;
        case 'magician':
          Blockly.Python.Header = '#include "magician.h"';
          break;
        case 'magicianlite':
          Blockly.Python.Header = '#include "magicianlite.h"';
          break;
        case 'controller':
          Blockly.Python.Header = '#include "magicbox.h"';
          break;
        default:
          Blockly.Arduino.Header = '#include <Arduino.h>\n#include <Wire.h>\n#include <SoftwareSerial.h>\n';
        }
        if (magicDeviceNames.includes(deviceName)){
          code += Blockly.Python.workspaceToCode(Blockly.getMainWorkspace());
        } else {
          code += Blockly.Arduino.workspaceToCode(Blockly.getMainWorkspace());
        }
       
      } catch (e) {
        code = '';
        console.log(e.message);
        // 如果报错还可以走 arduino 的逻辑
      }
      if (code !== this.state.code) {
        this.setState({
          code
        });
      }
    }

    toShowCodePane = () => {
      this.setState({
        showCodePane: true
      });
    }
    toCloseCodePane = () => {
      this.setState({
        showCodePane: false
      });
    }

    render () {
      const {
        /* eslint-disable no-unused-vars */
        assetHost,
        cloudHost,
        error,
        isError,
        isScratchDesktop,
        isShowingProject,
        onProjectLoaded,
        onStorageInit,
        onUpdateProjectId,
        onUpdateReduxProjectTitle,
        projectHost,
        projectId,
        projectTitle,
        /* eslint-enable no-unused-vars */
        children,
        fetchingProject,
        isLoading,
        loadingStateVisible,
        targetDeviceIndex,
        targetSpriteIndex,
        onOpenHelpAlert,
        onVisibleArduinoVisualCard,
        onShowUpdate,
        onShowFirmwareUpdate,
        onHandleClickDeviceConnect,
        handleSetIsOnline,
        handleSetTitleChanged,
        onChangeisShowTutorialCenter,
        isShowTutorialIcon,
        connectedList,
        ...componentProps
      } = this.props;
      return (
        <GUIComponent
          updateInfo={this.props.updateInfo}
          firmwareUpdateInfo={this.props.firmwareUpdateInfo}
          oldFirmwaReversion={this.props.oldFirmwaReversion}
          checkUpdate={this.checkUpdate}
          checkFirmwareUpdate={this.checkFirmwareUpdate}
          handleTargetTabClick={this.onTargetTabClick}
          isUpdated={this.props.isUpdated}
          loading={fetchingProject || isLoading || loadingStateVisible}
          autoCheckFirmwareUpdate={autoCheckFirmwareUpdate}
          closeCalibration={this.closeCalibration}
          isShowCalibration={this.state.isShowCalibration}
          calibrationSetPTPCmd={this.calibrationSetPTPCmd}
          onUpdateProjectTitle={this.onUpdateProjectTitle}
          showTutorialCenter={this.showTutorialCenter}
          translateCode={this.translateCode}
          code={this.state.code}
          showCodePane={this.state.showCodePane}
          toShowCodePane={this.toShowCodePane}
          toCloseCodePane={this.toCloseCodePane}
          {...componentProps}
        >
          {children}
        </GUIComponent>
      );
    }
}

GUI.propTypes = {
  handleSetIsOnline: PropTypes.func,
  onVisibleArduinoVisualCard: PropTypes.func,
  targetTab: PropTypes.string,
  onChangeisAutoUpdate: PropTypes.func,
  onActivateTab: PropTypes.func,
  onSeleceTargetTab: PropTypes.func,
  assetHost: PropTypes.string,
  children: PropTypes.node,
  cloudHost: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  fetchingProject: PropTypes.bool,
  intl: intlShape,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  isScratchDesktop: PropTypes.bool,
  isShowingProject: PropTypes.bool,
  loadingStateVisible: PropTypes.bool,
  onOpenHelpAlert: PropTypes.func,
  onProjectLoaded: PropTypes.func,
  onSeeCommunity: PropTypes.func,
  onStorageInit: PropTypes.func,
  onUpdateProjectId: PropTypes.func,
  onUpdateProjectTitle: PropTypes.func,
  onUpdateReduxProjectTitle: PropTypes.func,
  projectHost: PropTypes.string,
  projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  projectTitle: PropTypes.string,
  targetDeviceIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  targetSpriteIndex: PropTypes.string,
  telemetryModalVisible: PropTypes.bool,
  vm: PropTypes.instanceOf(VM).isRequired,
  onShowUpdate: PropTypes.func,
  isShowUpdate: PropTypes.bool,
  onChangeIsAnupdate: PropTypes.func,
  onChangeIsCheck: PropTypes.func,
  onChangeIsNewest: PropTypes.func,
  isAutoUpdate: PropTypes.bool,
  onShowFirmwareUpdate: PropTypes.func,
  isShowFirmwareUpdate: PropTypes.bool,
  onChangeIsAnFirmwareupdate: PropTypes.func,
  onChangeIsFirmwareCheck: PropTypes.func,
  onChangeIsFirmwareNewest: PropTypes.func,
  connectedList: PropTypes.array,
  onHandleClickDeviceConnect: PropTypes.func,
  handleSetTitleChanged: PropTypes.func,
  updateInfo: PropTypes.object,
  isUpdated: PropTypes.bool,
  firmwareUpdateInfo: PropTypes.object,
  oldFirmwaReversion: PropTypes.object,
  onChangeisShowTutorialCenter: PropTypes.func,
  isShowTutorialIcon: PropTypes.bool,
  isMagicianLitAralm: PropTypes.bool
};
GUI.defaultProps = {
  isScratchDesktop: false,
  onStorageInit: storageInstance => storageInstance.addOfficialScratchWebStores(),
  onProjectLoaded: () => { },
  onUpdateProjectId: () => { }
};

const mapStateToProps = (state, ownProps) => {
  const loadingState = state.scratchGui.projectState.loadingState;
  const vm = state.scratchGui.vm;
  return {
    activeTabIndex: state.scratchGui.editorTab.activeTabIndex,
    alertsVisible: state.scratchGui.alerts.visible,
    backdropLibraryVisible: state.scratchGui.modals.backdropLibrary,
    blocksTabVisible: state.scratchGui.editorTab.activeTabIndex === BLOCKS_TAB_INDEX,
    // cardsVisible: state.scratchGui.cards.visible,
    connectionModalVisible: state.scratchGui.modals.connectionModal,
    deviceUploadModalVisible: state.scratchGui.modals.deviceUploadModal,
    deviceConnectionModalVisible: state.scratchGui.modals.deviceConnectModal,
    costumeLibraryVisible: state.scratchGui.modals.costumeLibrary,
    costumesTabVisible: state.scratchGui.editorTab.activeTabIndex === COSTUMES_TAB_INDEX,
    arduinoCTabVisible: state.scratchGui.editorTab.activeTabIndex === ARUINOC_TAB_INDEX,
    error: state.scratchGui.projectState.error,
    isError: getIsError(loadingState),
    isFullScreen: state.scratchGui.mode.isFullScreen,
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    isRtl: state.locales.isRtl,
    isShowingProject: getIsShowingProject(loadingState),
    loadingStateVisible: state.scratchGui.modals.loadingProject,
    projectId: state.scratchGui.projectState.projectId,
    soundsTabVisible: state.scratchGui.editorTab.activeTabIndex === SOUNDS_TAB_INDEX,
    targetIsStage: (
      state.scratchGui.targets.stage &&
            state.scratchGui.targets.stage.id === state.scratchGui.targets.editingTarget
    ),
    targetTab: state.scratchGui.targetTab.tab_type,
    targetDeviceIndex: state.scratchGui.targetTab.device_tab_select,
    targetSpriteIndex: state.scratchGui.targetTab.sprite_tab_select,
    telemetryModalVisible: state.scratchGui.modals.telemetryModal,
    tipsLibraryVisible: state.scratchGui.modals.tipsLibrary,
    vm,
    isUpload: vm && vm.editingTarget && vm.editingTarget.isUpload,
    showUpdateAlert: state.scratchGui.alerts.showUpdateAlert,
    arduinoCardVisible: state.scratchGui.arduinoInitCards.visible,
    isShowUpdate: state.scratchGui.versionUpdate.isShowUpdate,
    isAutoUpdate: state.scratchGui.versionUpdate.isAutoUpdate,
    isShowFirmwareUpdate: state.scratchGui.firmwareUpdate.isShowFirmwareUpdate,
    connectedList: state.scratchGui.connectedDeviceStatus.connectedList,
    projectTitle: state.scratchGui.projectTitle,
    updateInfo: state.scratchGui.versionUpdate.updateInfo,
    isUpdated: state.scratchGui.versionUpdate.isUpdated,
    firmwareUpdateInfo: state.scratchGui.firmwareUpdate.firmwareUpdateInfo,
    oldFirmwaReversion: state.scratchGui.firmwareUpdate.oldFirmwaReversion,
    isShowTutorialCenter: state.scratchGui.tutorialCenter.isShowTutorialCenter,
    isShowTutorialIcon: state.scratchGui.tutorialCenter.isShowTutorialIcon,
    isMagicianLitAralm: state.scratchGui.alarm.isMagicianLitAralm
  };
};

const mapDispatchToProps = dispatch => ({
  onExtensionButtonClick: () => dispatch(openExtensionLibrary()),
  onActivateTab: tab => dispatch(activateTab(tab)),
  onActivateCostumesTab: () => dispatch(activateTab(COSTUMES_TAB_INDEX)),
  onActivateSoundsTab: () => dispatch(activateTab(SOUNDS_TAB_INDEX)),
  onActivateArduinoCTab: () => dispatch(activateTab(ARUINOC_TAB_INDEX)),
  onRequestCloseBackdropLibrary: () => dispatch(closeBackdropLibrary()),
  onRequestCloseCostumeLibrary: () => dispatch(closeCostumeLibrary()),
  onRequestCloseTelemetryModal: () => dispatch(closeTelemetryModal()),
  onUpdateReduxProjectTitle: title => dispatch(setProjectTitle(title)),
  onSeleceTargetTab: tab => dispatch(setTabType(tab)),
  onOpenHelpAlert: () => dispatch(showUpdateAlert()),
  onCloseHelpAlert: () => dispatch(closeUpdateAlert()),
  onVisibleArduinoVisualCard: () => dispatch(viewCards()),
  onShowUpdate: () => dispatch(showUpdate()),
  onChangeIsAnupdate: flag => dispatch(changeIsAnupdate(flag)),
  onChangeIsCheck: flag => dispatch(changeIsCheck(flag)),
  onChangeIsNewest: flag => dispatch(changeIsNewest(flag)),
  onChangeisAutoUpdate: flag => dispatch(changeisAutoUpdate(flag)),
  onShowFirmwareUpdate: () => dispatch(showFirmwareUpdate()),
  onChangeIsFirmwareCheck: flag => dispatch(changeIsFirmwareCheck(flag)),
  onChangeIsAnFirmwareupdate: flag => dispatch(changeIsAnFirmwareupdate(flag)),
  onChangeIsFirmwareNewest: flag => dispatch(changeIsFirmwareNewest(flag)),
  onHandleClickDeviceConnect: extensionId => {
    dispatch(setDeviceConnectionModalExtensionId(extensionId));
    dispatch(openDeviceConnectionModal());
  },
  handleSetIsOnline: flag => dispatch(setIsOnline(flag)),
  handleSetTitleChanged: () => dispatch(setTitleChanged()),
  onChangeisShowTutorialCenter: flag => dispatch(changeIsShowTutorialCenter(flag))
});

const ConnectedGUI = injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(GUI));

// note that redux's 'compose' function is just being used as a general utility to make
// the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
// ability to compose reducers.
const WrappedGui = compose(
  ErrorBoundaryHOC('Top Level App'),
  FontLoaderHOC,
  ProjectFetcherHOC,
  ProjectSaverHOC,
  vmListenerHOC,
  vmManagerHOC
)(ConnectedGUI);

WrappedGui.setAppElement = ReactModal.setAppElement;
export default WrappedGui;
