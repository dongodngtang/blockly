const SET_RECOGNITIONCONTENT = 'set_recognitionContent';
const SET_RECOGING_TIME = 'set_recoging_time';
const CHANGE_ISSHOWLOADING = 'change_isShowLoading';
const CHANGE_ISRECORDINGFINISH = 'change_isRecordingFinish';
const CHANGE_LANGUAGES = 'change_languages';
const CHANGE_ISMANUALVOICE = 'change_isManualVoice';
const CHANGE_ISRECORDINGBTNDISABLE = 'change_isrecordingbtndisable';
const CHANGE_ISRECORDING = 'change_isrecording';

const initialState = {
  recognitionContent: '',
  recogingTime: ' ......',
  isShowLoading: false,
  isRecordingFinish: false,
  languages: 'ZH',
  isManualVoice: false,
  isRecordingBtnDisable: false,
  isRecording: false
};

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
  case SET_RECOGNITIONCONTENT:
    return Object.assign({}, state, {
      recognitionContent: action.recognitionContent
    });

  case SET_RECOGING_TIME:
    return Object.assign({}, state, {
      recogingTime: action.time
    });

  case CHANGE_ISSHOWLOADING:
    return Object.assign({}, state, {
      isShowLoading: action.isShowLoading
    });

  case CHANGE_ISRECORDINGFINISH:
    return Object.assign({}, state, {
      isRecordingFinish: action.isRecordingFinish
    });

  case CHANGE_LANGUAGES:
    return Object.assign({}, state, {
      languages: action.languages
    });

  case CHANGE_ISMANUALVOICE:
    return Object.assign({}, state, {
      isManualVoice: action.isManualVoice
    });
  case CHANGE_ISRECORDINGBTNDISABLE:
    return Object.assign({}, state, {
      isRecordingBtnDisable: action.isRecordingBtnDisable
    });
  case CHANGE_ISRECORDING:
    return Object.assign({}, state, {
      isRecording: action.isRecording
    });
  default:
    return state;
  }
};

const setRecognitionContent = function (text) {
  return {
    type: SET_RECOGNITIONCONTENT,
    recognitionContent: text
  };
};

const setRecogingTime = function (time) {
  return {
    type: SET_RECOGING_TIME,
    time: time
  };
};

const changeIsShowLoading = function (flag) {
  return {
    type: CHANGE_ISSHOWLOADING,
    isShowLoading: flag
  };
};

const changeIsRecordingFinish = function (flag) {
  return {
    type: CHANGE_ISRECORDINGFINISH,
    isRecordingFinish: flag
  };
};

const changeLanguages = function (languages) {
  return {
    type: CHANGE_LANGUAGES,
    languages: languages
  };
};

const changeIsManualVoice = function (flag) {
  return {
    type: CHANGE_ISMANUALVOICE,
    isManualVoice: flag
  };
};

const changeIsRecordingBtnDisable = function (flag) {
  return {
    type: CHANGE_ISRECORDINGBTNDISABLE,
    isRecordingBtnDisable: flag
  };
};

const changeIsRecording = function (flag) {
  return {
    type: CHANGE_ISRECORDING,
    isRecording: flag
  };
};

export {
  reducer as default,
  initialState as voiceRecognitionInitialState,
  setRecognitionContent,
  setRecogingTime,
  changeIsShowLoading,
  changeIsRecordingFinish,
  changeLanguages,
  changeIsManualVoice,
  changeIsRecordingBtnDisable,
  changeIsRecording
};
