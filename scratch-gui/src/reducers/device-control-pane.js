const TOGGLE_OFFLINE = 'scratch-gui/device-control-pane/toggle_offline';
const initialState = {
  isOffline: null
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
  case TOGGLE_OFFLINE:
    return {
      isOffline: action.statue
    };
  default:
    return state;
  }
};

const toggleMBOffline = function (statue) {
  return {
    type: TOGGLE_OFFLINE,
    statue
  };
};

export {
  reducer as default,
  initialState as deviceControlInitialState,
  toggleMBOffline
};
