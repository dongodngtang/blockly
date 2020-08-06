const SHOW_FIRMWARE_UPDATE = 'cratch-gui/firmware-update/SHOWUPDATE';
const HIDE_FIRMWARE_UPDATE = 'cratch-gui/firmware-update/hideUpdate';
const CHANGE_IS_AN_FIRMWARE_UPDATE = 'cratch-gui/firmware-update/changeIsAnupdate';
const CHANGE_IS_FIRMWARE_CHECK = 'cratch-gui/firmware-uoate/changeIsCheck';
const CHANGE_IS_FIRMWARE_NEWEST = 'cratch-gui/firmware-update/changeIsNewest';
const GET_OLDFIRMWAREVERSION = 'cratch-gui/firmware-update/getOldFirmwaReversion';
const GET_FIRMWAREUPDATEINFO = 'cratch-gui/firmware-update/getFirmwareUpdateInfo';

const initialState = {
  isShowFirmwareUpdate: false,
  isFirmwareCheck: true,
  isAnFirmwareUpdate: false,
  isFirmwareNewest: false,
  oldFirmwaReversion: {},
  firmwareUpdateInfo: {}
};

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
  case SHOW_FIRMWARE_UPDATE:
    return Object.assign({}, state, {
      isShowFirmwareUpdate: action.isShowFirmwareUpdate
    });
  case HIDE_FIRMWARE_UPDATE:
    return Object.assign({}, state, {
      isShowFirmwareUpdate: action.isShowFirmwareUpdate
    });
  case CHANGE_IS_AN_FIRMWARE_UPDATE:
    return Object.assign({}, state, {
      isAnFirmwareUpdate: action.isAnFirmwareUpdate
    });
  case CHANGE_IS_FIRMWARE_CHECK:
    return Object.assign({}, state, {
      isFirmwareCheck: action.isFirmwareCheck
    });
  case CHANGE_IS_FIRMWARE_NEWEST:
    return Object.assign({}, state, {
      isFirmwareNewest: action.isFirmwareNewest
    });
  case GET_OLDFIRMWAREVERSION:
    return Object.assign({}, state, {
      oldFirmwaReversion: action.oldFirmwaReversion
    });
  case GET_FIRMWAREUPDATEINFO:
    return Object.assign({}, state, {
      firmwareUpdateInfo: action.firmwareUpdateInfo
    });
  default:
    return state;
  }
};


const changeIsFirmwareNewest = function(flag){
  return {
    type: CHANGE_IS_FIRMWARE_NEWEST,
    isFirmwareNewest: flag
  };
};

const changeIsFirmwareCheck = function(flag){
  return {
    type: CHANGE_IS_FIRMWARE_CHECK,
    isFirmwareCheck: flag
  };
};

const changeIsAnFirmwareupdate = function(flag){
  return {
    type: CHANGE_IS_AN_FIRMWARE_UPDATE,
    isAnFirmwareUpdate: flag
  };
};

const showFirmwareUpdate = function(){
  return {
    type: SHOW_FIRMWARE_UPDATE,
    isShowFirmwareUpdate: true
  };
};

const hideFirmwareUpdate = function(){
  return {
    type: HIDE_FIRMWARE_UPDATE,
    isShowFirmwareUpdate: false
  };
};

const getOldFirmwaReversion = function(oldFirmwaReversion){
  return {
    type: GET_OLDFIRMWAREVERSION,
    oldFirmwaReversion
  };
};

const getFirmwareUpdateInfo = function(firmwareUpdateInfo){
  return {
    type: GET_FIRMWAREUPDATEINFO,
    firmwareUpdateInfo
  };
};
export {
  reducer as default,
  initialState as firmwareUpdateInitialState,
  showFirmwareUpdate,
  hideFirmwareUpdate,
  changeIsAnFirmwareupdate,
  changeIsFirmwareCheck,
  changeIsFirmwareNewest,
  getOldFirmwaReversion,
  getFirmwareUpdateInfo
};
