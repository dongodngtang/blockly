import { applyMiddleware, compose, combineReducers } from 'redux';
import alertsReducer, { alertsInitialState } from './alerts';
import assetDragReducer, { assetDragInitialState } from './asset-drag';
// import cardsReducer, { cardsInitialState } from './cards';
import arduinoCardsReducer, { arduinoInitCardsInitialState } from './arduino-init-cards';
import colorPickerReducer, { colorPickerInitialState } from './color-picker';
import connectionModalReducer, { connectionModalInitialState } from './connection-modal';
import customProceduresReducer, { customProceduresInitialState } from './custom-procedures';
import blockDragReducer, { blockDragInitialState } from './block-drag';
import editorTabReducer, { editorTabInitialState } from './editor-tab';
import hoveredTargetReducer, { hoveredTargetInitialState } from './hovered-target';
import menuReducer, { menuInitialState } from './menus';
import micIndicatorReducer, { micIndicatorInitialState } from './mic-indicator';
import modalReducer, { modalsInitialState } from './modals';
import voiceRecognitionReducer, { voiceRecognitionInitialState } from './voiceRecognition';
import modeReducer, { modeInitialState } from './mode';
import monitorReducer, { monitorsInitialState } from './monitors';
import monitorLayoutReducer, { monitorLayoutInitialState } from './monitor-layout';
import projectChangedReducer, { projectChangedInitialState } from './project-changed';
import projectStateReducer, { projectStateInitialState } from './project-state';
import projectTitleReducer, { projectTitleInitialState } from './project-title';
import fontsLoadedReducer, { fontsLoadedInitialState } from './fonts-loaded';
import restoreDeletionReducer, { restoreDeletionInitialState } from './restore-deletion';
import stageSizeReducer, { stageSizeInitialState } from './stage-size';
import targetChangeReducer, { TabInitialState } from './tab-type';
import targetReducer, { targetsInitialState } from './targets';
import timeoutReducer, { timeoutInitialState } from './timeout';
import toolboxReducer, { toolboxInitialState } from './toolbox';
import vmReducer, { vmInitialState } from './vm';
import vmStatusReducer, { vmStatusInitialState } from './vm-status';
import connectedDevicesReducer, { connectedListInitialState } from './connect_status';
import versionUpdateReducer, { versionUpdateInitialState } from './version-update';
import firmwareUpdateReducer, { firmwareUpdateInitialState } from './firmware-update';
import controlPaneReducer, { deviceControlInitialState } from './device-control-pane';
import calibrationReducer, { calibrationModalInitialState } from './coordinate-calibration';
import aiReducer, { aiInitialState } from './ai';
import tutorialCenterReducer, { tutorialCenterInitialState } from './tutorialCenter';
import alarmReducer, { alarmInitialState } from './alarm';
import throttle from 'redux-throttle';

// import decks from '../lib/libraries/decks/index.jsx';

// reducer 触发事件的防抖, leading 和 trailing 设置为 true 的话说明 50ms 之前或者之后有事件都不会响应
const guiMiddleware = compose(applyMiddleware(throttle(100, { leading: true, trailing: true })));

const guiInitialState = {
  alerts: alertsInitialState,
  assetDrag: assetDragInitialState,
  blockDrag: blockDragInitialState,
  //   cards: cardsInitialState,
  arduinoInitCards: arduinoInitCardsInitialState,
  colorPicker: colorPickerInitialState,
  connectionModal: connectionModalInitialState,
  customProcedures: customProceduresInitialState,
  editorTab: editorTabInitialState,
  mode: modeInitialState,
  hoveredTarget: hoveredTargetInitialState,
  stageSize: stageSizeInitialState,
  targetTab: TabInitialState,
  menus: menuInitialState,
  micIndicator: micIndicatorInitialState,
  modals: modalsInitialState,
  monitors: monitorsInitialState,
  monitorLayout: monitorLayoutInitialState,
  projectChanged: projectChangedInitialState,
  projectState: projectStateInitialState,
  projectTitle: projectTitleInitialState,
  fontsLoaded: fontsLoadedInitialState,
  restoreDeletion: restoreDeletionInitialState,
  targets: targetsInitialState,
  timeout: timeoutInitialState,
  toolbox: toolboxInitialState,
  vm: vmInitialState,
  vmStatus: vmStatusInitialState,
  connectedDeviceStatus: connectedListInitialState,
  voiceRecognition: voiceRecognitionInitialState,
  versionUpdate: versionUpdateInitialState,
  firmwareUpdate: firmwareUpdateInitialState,
  deviceControl: deviceControlInitialState,
  calibration: calibrationModalInitialState,
  ai: aiInitialState,
  tutorialCenter: tutorialCenterInitialState,
  alarm: alarmInitialState
};

const initPlayer = function (currentState) {
  return Object.assign(
    {},
    currentState,
    { mode: {
      isFullScreen: currentState.mode.isFullScreen,
      isPlayerOnly: true,
      // When initializing in player mode, make sure to reset
      // hasEverEnteredEditorMode
      hasEverEnteredEditor: false
    } }
  );
};
const initFullScreen = function (currentState) {
  return Object.assign(
    {},
    currentState,
    { mode: {
      isFullScreen: true,
      isPlayerOnly: currentState.mode.isPlayerOnly,
      hasEverEnteredEditor: currentState.mode.hasEverEnteredEditor
    } }
  );
};

const initEmbedded = function (currentState) {
  return Object.assign(
    {},
    currentState,
    { mode: {
      showBranding: true,
      isFullScreen: true,
      isPlayerOnly: true,
      hasEverEnteredEditor: false
    } }
  );
};

const initTelemetryModal = function (currentState) {
  return Object.assign(
    {},
    currentState,
    {
      modals: {
        telemetryModal: true // this key must match `MODAL_TELEMETRY` in modals.js
      }
    }
  );
};

const guiReducer = combineReducers({
  alerts: alertsReducer,
  assetDrag: assetDragReducer,
  blockDrag: blockDragReducer,
  //   cards: cardsReducer,
  arduinoInitCards: arduinoCardsReducer,
  colorPicker: colorPickerReducer,
  connectionModal: connectionModalReducer,
  customProcedures: customProceduresReducer,
  editorTab: editorTabReducer,
  mode: modeReducer,
  hoveredTarget: hoveredTargetReducer,
  stageSize: stageSizeReducer,
  targetTab: targetChangeReducer,
  menus: menuReducer,
  micIndicator: micIndicatorReducer,
  modals: modalReducer,
  monitors: monitorReducer,
  monitorLayout: monitorLayoutReducer,
  projectChanged: projectChangedReducer,
  projectState: projectStateReducer,
  projectTitle: projectTitleReducer,
  fontsLoaded: fontsLoadedReducer,
  restoreDeletion: restoreDeletionReducer,
  targets: targetReducer,
  timeout: timeoutReducer,
  toolbox: toolboxReducer,
  vm: vmReducer,
  vmStatus: vmStatusReducer,
  connectedDeviceStatus: connectedDevicesReducer,
  voiceRecognition: voiceRecognitionReducer,
  versionUpdate: versionUpdateReducer,
  firmwareUpdate: firmwareUpdateReducer,
  deviceControl: controlPaneReducer,
  calibration: calibrationReducer,
  ai: aiReducer,
  tutorialCenter: tutorialCenterReducer,
  alarm: alarmReducer
});

export {
  guiReducer as default,
  guiInitialState,
  guiMiddleware,
  initEmbedded,
  initFullScreen,
  initPlayer,
  initTelemetryModal
//   initTutorialCard
};
