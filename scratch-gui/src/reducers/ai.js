const SET_IMAGELISTOBJ = 'set_imageListObj';
const SET_CHARACTERNAMES = 'set_characterNames';
const SET_CUTIMAGELISTOBJ = 'set_cutImageListObj';
const SET_CUTCLASSNAMES = 'set_cutClassNames';
const SET_FACEIMAGELISTOBJ = 'set_faceImageListObj';
const SET_FACENAMES = 'set_faceNames';
const SET_GENERALIMAGELISTOBJ = 'set_generalImageListObj';
const SET_GENERALNAMES = 'set_generalNames';
const SET_SELECTCAMERA = 'set_selectCamera';
const SET_CUTCOLORCLASSNAMES = 'set_cutColorClassNames';
const SET_CUTCOLORIMAGELISTOBJ = 'set_cutColorImageListObj';

const initialState = {
  imageListObj: [[]],
  characterNames: ['Class1'],
  cutImageListObj: [[]],
  cutClassNames: ['Class1'],
  faceImageListObj: [[]],
  faceNames: ['Name1'],
  generalImageListObj: [[]],
  generalNames: ['Class1'],
  selectCamera: [],
  cutColorImageListObj: [[]],
  cutColorClassNames: ['Color1']
};

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
  case SET_IMAGELISTOBJ:
    return Object.assign({}, state, {
      imageListObj: action.imageListObj
    });
  case SET_CHARACTERNAMES:
    return Object.assign({}, state, {
      characterNames: action.characterNames
    });
  case SET_CUTIMAGELISTOBJ:
    return Object.assign({}, state, {
      cutImageListObj: action.cutImageListObj
    });
  case SET_CUTCLASSNAMES:
    return Object.assign({}, state, {
      cutClassNames: action.cutClassNames
    });
  case SET_FACEIMAGELISTOBJ:
    return Object.assign({}, state, {
      faceImageListObj: action.faceImageListObj
    });
  case SET_FACENAMES:
    return Object.assign({}, state, {
      faceNames: action.faceNames
    });
  case SET_GENERALIMAGELISTOBJ:
    return Object.assign({}, state, {
      generalImageListObj: action.generalImageListObj
    });
  case SET_GENERALNAMES:
    return Object.assign({}, state, {
      generalNames: action.generalNames
    });
  case SET_SELECTCAMERA:
    return Object.assign({}, state, {
      selectCamera: action.selectCamera
    });
  case SET_CUTCOLORIMAGELISTOBJ:
    return Object.assign({}, state, {
      cutColorImageListObj: action.cutColorImageListObj
    });
  case SET_CUTCOLORCLASSNAMES:
    return Object.assign({}, state, {
      cutColorClassNames: action.cutColorClassNames
    });

  default:
    return state;
  }
};

const setImageListObj = function (imageListObj) {
  return {
    type: SET_IMAGELISTOBJ,
    imageListObj
  };
};
const setCharacterNames = function (characterNames) {
  return {
    type: SET_CHARACTERNAMES,
    characterNames
  };
};
const setCutImageListObj = function (cutImageListObj) {
  return {
    type: SET_CUTIMAGELISTOBJ,
    cutImageListObj
  };
};
const setCutClassNames = function (cutClassNames) {
  return {
    type: SET_CUTCLASSNAMES,
    cutClassNames
  };
};
const setFaceImageListObj = function (faceImageListObj) {
  return {
    type: SET_FACEIMAGELISTOBJ,
    faceImageListObj
  };
};
const setFaceNames = function (faceNames) {
  return {
    type: SET_FACENAMES,
    faceNames
  };
};
const setGeneralImageListObj = function (generalImageListObj) {
  return {
    type: SET_GENERALIMAGELISTOBJ,
    generalImageListObj
  };
};
const setGeneralNames = function (generalNames) {
  return {
    type: SET_GENERALNAMES,
    generalNames
  };
};
const setSelectcamera = function (selectCamera) {
  return {
    type: SET_SELECTCAMERA,
    selectCamera
  };
};
const setCutColorImageListObj = function (cutColorImageListObj) {
  return {
    type: SET_CUTCOLORIMAGELISTOBJ,
    cutColorImageListObj
  };
};
const setCutColorClassNames = function (cutColorClassNames) {
  return {
    type: SET_CUTCOLORCLASSNAMES,
    cutColorClassNames
  };
};


export {
  reducer as default,
  initialState as aiInitialState,
  setImageListObj,
  setCharacterNames,
  setCutImageListObj,
  setCutClassNames,
  setFaceImageListObj,
  setFaceNames,
  setGeneralImageListObj,
  setGeneralNames,
  setSelectcamera,
  setCutColorImageListObj,
  setCutColorClassNames
};
