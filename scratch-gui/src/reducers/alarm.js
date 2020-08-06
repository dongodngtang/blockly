const SET_ISMAGICIANLITARALM = 'scratch-gui/alarm/setIsMagicianLitAralm';
const SET_ALARMTYPE = 'scratch-gui/alarm/setAlarmType';
const SET_ISCONFIRM = 'scratch-gui/alarm/isConfirm';

const initialState = {
  isMagicianLitAralm: false,
  alarmType: {},
  isConfirm: false
};

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
  case SET_ISMAGICIANLITARALM:
    return Object.assign({}, state, {
      isMagicianLitAralm: action.isMagicianLitAralm
    });
  case SET_ALARMTYPE:
    return Object.assign({}, state, {
      alarmType: action.alarmType
    });
  case SET_ISCONFIRM:
    return Object.assign({}, state, {
      isConfirm: action.isConfirm
    });
  
  default:
    return state;
  }
};
const setIsmagicianLitAralm = function(flag){
  return {
    type: SET_ISMAGICIANLITARALM,
    isMagicianLitAralm: flag
  };
};
const setAlarmType = function(alarmType){
  return {
    type: SET_ALARMTYPE,
    alarmType: alarmType
  };
};
const setIsconfirm = function(flag){
  return {
    type: SET_ISCONFIRM,
    isConfirm: flag
  };
};

export {
  reducer as default,
  initialState as alarmInitialState,
  setIsmagicianLitAralm,
  setAlarmType,
  setIsconfirm
};
