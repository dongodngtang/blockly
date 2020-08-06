const SET_ID = 'scratch-gui/connection-modal/setId';
const SET_POSE = 'scratch-gui/connection-modal/GET_POSE';
const SET_SPEEDINFO = 'scratch-gui/connection-modal/setSpeedInfo';
const SET_ISCONTROLLERMAGICIANLITE = 'scratch-gui/connection-moda/iscontrollerMagicianlite';

const initialState = {
  extensionId: null,
  poseData: {
    x: '0',
    y: '0',
    z: '0',
    r: '0',
    jointAngle: ['0', '0', '0', '0']
  },
  speedInfo: {
    accelerationRatio: 0,
    velocityRatio: 0
  },
  isControllerMagicianLite: false
};

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
  case SET_ID:
    return Object.assign({}, state, {
      extensionId: action.extensionId
    });
  case SET_POSE:
    return Object.assign({}, state, {
      poseData: action.poseData
    });
  case SET_SPEEDINFO:
    return Object.assign({}, state, {
      speedInfo: action.speedInfo
    });
  case SET_ISCONTROLLERMAGICIANLITE:
    return Object.assign({}, state, {
      isControllerMagicianLite: true
    });
  
  default:
    return state;
  }
};

const setConnectionModalExtensionId = function (extensionId) {
  return {
    type: SET_ID,
    extensionId: extensionId
  };
};

const setPose = function (poseData) {
  return {
    type: SET_POSE,
    poseData: poseData
  };
};

const setSpeedInfo = function (speedInfo) {
  return {
    type: SET_SPEEDINFO,
    speedInfo
  };
};
const setVelocity = function(speedInfo){
  return {
    type: SET_SPEEDINFO,
    speedInfo: speedInfo
  };
};
const setIsControllerMagicianLite = function(){
  return {
    type: SET_ISCONTROLLERMAGICIANLITE
  };
};

export {
  reducer as default,
  initialState as connectionModalInitialState,
  setConnectionModalExtensionId,
  setPose,
  setSpeedInfo,
  setVelocity,
  setIsControllerMagicianLite
};
