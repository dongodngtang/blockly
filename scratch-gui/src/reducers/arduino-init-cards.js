const CLOSE_CARDS = 'scratch-gui/arduino-init-cards/CLOSE_CARDS';
const VIEW_CARDS = 'scratch-gui/arduino-init-cards/VIEW_CARDS';
const NEXT_STEP = 'scratch-gui/arduino-init-cards/NEXT_STEP';
const PREV_STEP = 'scratch-gui/arduino-init-cards/PREV_STEP';
const DRAG_CARD = 'scratch-gui/arduino-init-cards/DRAG_CARD';
const START_DRAG = 'scratch-gui/arduino-init-cards/START_DRAG';
const END_DRAG = 'scratch-gui/arduino-init-cards/END_DRAG';
const SET_TOTAL_STEPS = 'scratch-gui/arduino-init-cards/SET_TOTAL_STEPS';
const SET_CONFIRM_STATE = 'scratch-gui/arduino-init-cards/SET_CONFIRM_STATE';
const RESET_STEP = 'scratch-gui/arduino-init-cards/RESET_STEP';

const initialState = {
  visible: false,
  step: 0,
  x: 0,
  y: 0,
  dragging: false,
  totalSteps: 0,
  confirmData: null
};

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
  case CLOSE_CARDS:
    return Object.assign({}, state, {
      visible: false
    });
  case VIEW_CARDS:
    return Object.assign({}, state, {
      visible: true
    });
  case NEXT_STEP:
    if (state.step < state.totalSteps) {
      return Object.assign({}, state, {
        step: state.step + 1
      });
    }
    return state;
  case PREV_STEP:
    if (state.step > 0) {
      return Object.assign({}, state, {
        step: state.step - 1
      });
    }
    return state;
  case RESET_STEP:
    if (state.step > 0) {
      return Object.assign({}, state, {
        step: 0
      });
    }
    return state;
  case DRAG_CARD:
    return Object.assign({}, state, {
      x: action.x,
      y: action.y
    });
  case START_DRAG:
    return Object.assign({}, state, {
      dragging: true
    });
  case END_DRAG:
    return Object.assign({}, state, {
      dragging: false
    });
  case SET_TOTAL_STEPS:
    return Object.assign({}, state, {
      totalSteps: action.totalSteps
    });
  case SET_CONFIRM_STATE:
    return Object.assign({}, state, {
      confirmData: action.data
    });
  default:
    return state;
  }
};


const viewCards = function () {
  return { type: VIEW_CARDS };
};

const closeCards = function () {
  return { type: CLOSE_CARDS };
};

const nextStep = function () {
  return { type: NEXT_STEP };
};

const prevStep = function () {
  return { type: PREV_STEP };
};

const resetStep = function () {
  return { type: RESET_STEP };
};

const dragCard = function (x, y) {
  return { type: DRAG_CARD, x, y };
};

const startDrag = function () {
  return { type: START_DRAG };
};

const endDrag = function () {
  return { type: END_DRAG };
};
const setTotalSteps = totalSteps => ({
  type: SET_TOTAL_STEPS,
  totalSteps
});
const setInitData = data => ({
  type: SET_CONFIRM_STATE,
  data
});
export {
  reducer as default,
  initialState as arduinoInitCardsInitialState,
  viewCards,
  closeCards,
  nextStep,
  prevStep,
  dragCard,
  startDrag,
  endDrag,
  setTotalSteps,
  setInitData,
  resetStep
};
