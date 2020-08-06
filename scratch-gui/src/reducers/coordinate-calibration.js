const SET_IMAGEPOINT = 'scratch-gui/coordinate-calibration-modal/set_imagepoint';
const SET_ROBOTPOINT = 'scratch-gui/coordinate-calibration-modal/set_robotPoint';


const initialState = {
  imagePoint: [],
  robotPoint: []
};

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
  case SET_IMAGEPOINT:
    return Object.assign({}, state, {
      imagePoint: action.imagePoint
    });
  case SET_ROBOTPOINT:
    return Object.assign({}, state, {
      robotPoint: action.robotPoint
    });
  default:
    return state;
  }
};

const setImagePoint = function (imagePoint) {
  return {
    type: SET_IMAGEPOINT,
    imagePoint: imagePoint
  };
};

const setRobotPoint = function (robotPoint) {
  return {
    type: SET_ROBOTPOINT,
    robotPoint: robotPoint
  };
};

export {
  reducer as default,
  initialState as calibrationModalInitialState,
  setImagePoint,
  setRobotPoint
};
