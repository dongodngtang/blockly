import { func } from 'prop-types';

const SHOW_UPDATE = 'cratch-gui/version-update/SHOWUPDATE';
const HIDE_UPDATE = 'cratch-gui/version-update/hideUpdate';
const CHANGE_IS_AN_UPDATE = 'cratch-gui/version-update/changeIsAnupdate';
const CHANGE_IS_CHECK = 'cratch-gui/version-update/changeIsCheck';
const CHANGE_IS_NEWEST = 'cratch-gui/version-update/changeIsNewest';
const CHANGE_IS_AUTO_UPDATE = 'cratch-gui/version-update/changeisAutoUpdate';
const GET_UPDARWINFO = 'cratch-gui/version-update/getUpdateInfo';
const CHANGE_ISUPDATE = 'cratch-gui/version-update/changeIsUpdate';

const initialState = {
  isShowUpdate: false,
  isCheck: true,
  isAnUpdate: false,
  isNewest: false,
  isAutoUpdate: true,
  updateInfo: {},
  isUpdated: false
};

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
  case SHOW_UPDATE:
    return Object.assign({}, state, {
      isShowUpdate: action.isShowUpdate
    });
  case HIDE_UPDATE:
    return Object.assign({}, state, {
      isShowUpdate: action.isShowUpdate
    });
  case CHANGE_IS_AN_UPDATE:
    return Object.assign({}, state, {
      isAnUpdate: action.isAnUpdate
    });
  case CHANGE_IS_CHECK:
    return Object.assign({}, state, {
      isCheck: action.isCheck
    });
  case CHANGE_IS_NEWEST:
    return Object.assign({}, state, {
      isNewest: action.isNewest
    });
  case CHANGE_IS_AUTO_UPDATE:
    return Object.assign({}, state, {
      isAutoUpdate: action.isAutoUpdate
    });
  case GET_UPDARWINFO:
    return Object.assign({}, state, {
      updateInfo: action.updateInfo
    });
  case CHANGE_ISUPDATE:
    return Object.assign({}, state, {
      isUpdated: action.isUpdated
    });
  default:
    return state;
  }
};

const changeisAutoUpdate = function(flag){
  return {
    type: CHANGE_IS_AUTO_UPDATE,
    isAutoUpdate: flag
  };
};

const changeIsNewest = function(flag){
  return {
    type: CHANGE_IS_NEWEST,
    isNewest: flag
  };
};

const changeIsCheck = function(flag){
  return {
    type: CHANGE_IS_CHECK,
    isCheck: flag
  };
};

const changeIsAnupdate = function(flag){
  return {
    type: CHANGE_IS_AN_UPDATE,
    isAnUpdate: flag
  };
};

const showUpdate = function(){
  return {
    type: SHOW_UPDATE,
    isShowUpdate: true
  };
};

const hideUpdate = function(){
  return {
    type: HIDE_UPDATE,
    isShowUpdate: false
  };
};

const getUpdateInfo = function(updateInfo){
  return {
    type: GET_UPDARWINFO,
    updateInfo: updateInfo
  };
};

const changeIsUpdate = function(flag){
  return {
    type: CHANGE_ISUPDATE,
    isUpdated: flag
  };
};

export {
  reducer as default,
  initialState as versionUpdateInitialState,
  showUpdate,
  hideUpdate,
  changeIsAnupdate,
  changeIsCheck,
  changeIsNewest,
  changeisAutoUpdate,
  getUpdateInfo,
  changeIsUpdate
};
