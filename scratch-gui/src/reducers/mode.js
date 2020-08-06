const SET_FULL_SCREEN = 'scratch-gui/mode/SET_FULL_SCREEN';
const SET_PLAYER = 'scratch-gui/mode/SET_PLAYER';
const SET_ISONLINE = 'scratch-gui/mode/setIsOnline';

const initialState = {
  showBranding: false,
  isFullScreen: false,
  isPlayerOnly: false,
  hasEverEnteredEditor: true,
  isOnline: false // 浏览器在线状态
};

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
  case SET_FULL_SCREEN:
    return Object.assign({}, state, {
      isFullScreen: action.isFullScreen
    });
  case SET_PLAYER:
    return Object.assign({}, state, {
      isPlayerOnly: action.isPlayerOnly,
      hasEverEnteredEditor: state.hasEverEnteredEditor || !action.isPlayerOnly
    });
  case SET_ISONLINE:
    return Object.assign({}, state, {
      isOnline: action.isOnline
    });
  default:
    return state;
  }
};

const setFullScreen = function (isFullScreen) {
  return {
    type: SET_FULL_SCREEN,
    isFullScreen: isFullScreen
  };
};
const setPlayer = function (isPlayerOnly) {
  return {
    type: SET_PLAYER,
    isPlayerOnly: isPlayerOnly
  };
};

const setIsOnline = function(isOnline){
  return {
    type: SET_ISONLINE,
    isOnline: isOnline
  };
};

export {
  reducer as default,
  initialState as modeInitialState,
  setFullScreen,
  setPlayer,
  setIsOnline
};
