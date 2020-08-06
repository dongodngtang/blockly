const SELECT_TAB_TYPE = 'scratch-gui/TargetMode/SELECT_TAB_TYPE';
const SELECT_DEVICE = 'scratch-gui/TargetMode/SELECT_DEVICE';
const SELECT_SPRITE = 'scratch-gui/TargetMode/SELECT_SPRITE';
const initialState = {
  tab_type: 'device',
  device_tab_select: '',
  sprite_tab_select: ''
};

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
  case SELECT_TAB_TYPE:
    return {
      ...state,
      tab_type: action.tab_type
    };
  case SELECT_DEVICE:
    return {
      ...state,
      device_tab_select: action.index
    };
  case SELECT_SPRITE:
    return {
      ...state,
      sprite_tab_select: action.index
    };
  default:
    return state;
  }
};

const setTabType = function (type) {
  return {
    type: SELECT_TAB_TYPE,
    tab_type: (type === 0 ? 'device' : 'sprite')
  };
};
const setDeviceIndex = function (index) {
  return {
    type: SELECT_DEVICE,
    index
  };
};
const setSpriteIndex = function (index) {
  return {
    type: SELECT_SPRITE,
    index
  };
};

export {
  reducer as default,
  initialState as TabInitialState,
  setTabType,
  setDeviceIndex,
  setSpriteIndex
};
