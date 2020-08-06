const OPEN_MODAL = 'scratch-gui/modals/OPEN_MODAL';
const CLOSE_MODAL = 'scratch-gui/modals/CLOSE_MODAL';

const MODAL_BACKDROP_LIBRARY = 'backdropLibrary';
const MODAL_CAMERA_CAPTURE = 'cameraCapture';
const MODAL_COSTUME_LIBRARY = 'costumeLibrary';
const MODAL_EXTENSION_LIBRARY = 'extensionLibrary';
const MODAL_LOADING_PROJECT = 'loadingProject';
const MODAL_TELEMETRY = 'telemetryModal';
const MODAL_SOUND_LIBRARY = 'soundLibrary';
const MODAL_SPRITE_LIBRARY = 'spriteLibrary';
const MODAL_SOUND_RECORDER = 'soundRecorder';
const MODAL_DEVICE_LIBRARY = 'deviceLibrary';
const MODAL_CONNECTION = 'connectionModal';
const MODAL_DEVICE_CONNECTION = 'deviceConnectModal';
const MODAL_DEVICE_UPLOAD = 'deviceUploadModal';
const MODAL_TIPS_LIBRARY = 'tipsLibrary';
const MODAL_CALIBRATION = 'calibration';
const MODAL_CALIBRATION_MACHANICAL = 'calibration_machanical';
const MODAL_AI = 'ai_modal';
const MODAL_AI_PHOTOGRAPH = 'ai_Photograph_Modal';

const MODAL_SPEECH_RECOGNITION = 'speech_recognition';
const MODAL_AUTO_RECOGNITION = 'auto_recognition';
const MODAL_SHOW_SMALL_IMG = 'show_small_img';
const MODAL_SHOW_ONLINEPOP = 'show_online_pop';

const initialState = {
  [MODAL_BACKDROP_LIBRARY]: false,
  [MODAL_CAMERA_CAPTURE]: false,
  [MODAL_COSTUME_LIBRARY]: false,
  [MODAL_EXTENSION_LIBRARY]: false,
  [MODAL_LOADING_PROJECT]: false,
  [MODAL_TELEMETRY]: false,
  [MODAL_SOUND_LIBRARY]: false,
  [MODAL_SPRITE_LIBRARY]: false,
  [MODAL_SOUND_RECORDER]: false,
  [MODAL_CONNECTION]: false,
  [MODAL_TIPS_LIBRARY]: false,
  [MODAL_DEVICE_LIBRARY]: false,
  [MODAL_DEVICE_CONNECTION]: false,
  [MODAL_DEVICE_UPLOAD]: false,
  [MODAL_CALIBRATION]: false,
  [MODAL_CALIBRATION_MACHANICAL]: false,
  [MODAL_SPEECH_RECOGNITION]: false,
  [MODAL_AUTO_RECOGNITION]: false,
  [MODAL_AI]: false,
  [MODAL_AI_PHOTOGRAPH]: false,
  [MODAL_SHOW_SMALL_IMG]: false,
  [MODAL_SHOW_ONLINEPOP]: false
};

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
  case OPEN_MODAL:
    return Object.assign({}, state, {
      [action.modal]: true
    });
  case CLOSE_MODAL:
    return Object.assign({}, state, {
      [action.modal]: false
    });
  default:
    return state;
  }
};
const openModal = function (modal) {
  return {
    type: OPEN_MODAL,
    modal: modal
  };
};
const closeModal = function (modal) {
  return {
    type: CLOSE_MODAL,
    modal: modal
  };
};


const openOnlinePop = function(){
  return openModal(MODAL_SHOW_ONLINEPOP);
};
const openSmallImg = function(){
  return openModal(MODAL_SHOW_SMALL_IMG);
};
const openAIPhotograph = function(){
  return openModal(MODAL_AI_PHOTOGRAPH);
};
const openBackdropLibrary = function () {
  return openModal(MODAL_BACKDROP_LIBRARY);
};
const openCameraCapture = function () {
  return openModal(MODAL_CAMERA_CAPTURE);
};
const openCostumeLibrary = function () {
  return openModal(MODAL_COSTUME_LIBRARY);
};
const openExtensionLibrary = function () {
  return openModal(MODAL_EXTENSION_LIBRARY);
};
const openLoadingProject = function () {
  return openModal(MODAL_LOADING_PROJECT);
};
const openTelemetryModal = function () {
  return openModal(MODAL_TELEMETRY);
};
const openSoundLibrary = function () {
  return openModal(MODAL_SOUND_LIBRARY);
};
const openSpriteLibrary = function () {
  return openModal(MODAL_SPRITE_LIBRARY);
};
const openDeviceLibrary = function () {
  return openModal(MODAL_DEVICE_LIBRARY);
};
const openSoundRecorder = function () {
  return openModal(MODAL_SOUND_RECORDER);
};
const openConnectionModal = function () {
  return openModal(MODAL_CONNECTION);
};
const openTipsLibrary = function () {
  return openModal(MODAL_TIPS_LIBRARY);
};
const openDeviceConnectionModal = function () {
  return openModal(MODAL_DEVICE_CONNECTION);
};
const openDeviceUploadModal = function () {
  return openModal(MODAL_DEVICE_UPLOAD);
};
const openCalibrationModal = function () {
  return openModal(MODAL_CALIBRATION);
};
const openCalibrationMachanicalModal = function () {
  return openModal(MODAL_CALIBRATION_MACHANICAL);
};
const openSpeechRecognition = function () {
  return openModal(MODAL_SPEECH_RECOGNITION);
};
const openAutoRecogition = function () {
  return openModal(MODAL_AUTO_RECOGNITION);
};
const openAIModal = function() {
  return openModal(MODAL_AI);
};

const closeOnlinePop = function(){
  return closeModal(MODAL_SHOW_ONLINEPOP);
};
const closeSmallImg = function(){
  return closeModal(MODAL_SHOW_SMALL_IMG);
};
const closeAIPhotograph = function(){
  return closeModal(MODAL_AI_PHOTOGRAPH);
};

const closeBackdropLibrary = function () {
  return closeModal(MODAL_BACKDROP_LIBRARY);
};
const closeCameraCapture = function () {
  return closeModal(MODAL_CAMERA_CAPTURE);
};
const closeCostumeLibrary = function () {
  return closeModal(MODAL_COSTUME_LIBRARY);
};
const closeExtensionLibrary = function () {
  return closeModal(MODAL_EXTENSION_LIBRARY);
};
const closeLoadingProject = function () {
  return closeModal(MODAL_LOADING_PROJECT);
};
const closeTelemetryModal = function () {
  return closeModal(MODAL_TELEMETRY);
};
const closeSpriteLibrary = function () {
  return closeModal(MODAL_SPRITE_LIBRARY);
};
const closeDeviceLibrary = function () {
  return closeModal(MODAL_DEVICE_LIBRARY);
};
const closeSoundLibrary = function () {
  return closeModal(MODAL_SOUND_LIBRARY);
};
const closeSoundRecorder = function () {
  return closeModal(MODAL_SOUND_RECORDER);
};
const closeTipsLibrary = function () {
  return closeModal(MODAL_TIPS_LIBRARY);
};
const closeConnectionModal = function () {
  return closeModal(MODAL_CONNECTION);
};

const closeDeviceConnectionModal = function () {
  return closeModal(MODAL_DEVICE_CONNECTION);
};
const closeDeviceUploadModal = function () {
  return closeModal(MODAL_DEVICE_UPLOAD);
};
const closeCalibrationModal = function () {
  return closeModal(MODAL_CALIBRATION);
};
const closeCalibrationMachanicalModal = function () {
  return closeModal(MODAL_CALIBRATION_MACHANICAL);
};
const closeSpeechRecognition = function () {
  return closeModal(MODAL_SPEECH_RECOGNITION);
};
const closeAutoRecognition = function () {
  return closeModal(MODAL_AUTO_RECOGNITION);
};
const closeAIModal = function() {
  return closeModal(MODAL_AI);
};
export {
  reducer as default,
  initialState as modalsInitialState,
  openBackdropLibrary,
  openCameraCapture,
  openCostumeLibrary,
  openExtensionLibrary,
  openLoadingProject,
  openSoundLibrary,
  openSpriteLibrary,
  openDeviceLibrary,
  openSoundRecorder,
  openTelemetryModal,
  openTipsLibrary,
  openConnectionModal,
  openDeviceConnectionModal,
  openDeviceUploadModal,
  openCalibrationModal,
  openCalibrationMachanicalModal,
  openSpeechRecognition,
  openAutoRecogition,
  openAIModal,
  openAIPhotograph,
  openSmallImg,
  openOnlinePop,
  closeOnlinePop,
  closeSmallImg,
  closeBackdropLibrary,
  closeCameraCapture,
  closeCostumeLibrary,
  closeExtensionLibrary,
  closeLoadingProject,
  closeSpriteLibrary,
  closeDeviceLibrary,
  closeSoundLibrary,
  closeSoundRecorder,
  closeTelemetryModal,
  closeTipsLibrary,
  closeConnectionModal,
  closeDeviceConnectionModal,
  closeDeviceUploadModal,
  closeCalibrationModal,
  closeCalibrationMachanicalModal,
  closeSpeechRecognition,
  closeAutoRecognition,
  closeAIModal,
  closeAIPhotograph
};
