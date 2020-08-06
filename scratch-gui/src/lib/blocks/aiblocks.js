import ScratchBlocks from 'scratch-blocks';
import { colors } from '../make-device-toolbox-xml/common';
import CalibrationWs from '../calibration';
import { camera } from '../video/camera';
import tencentAPI from '../tencentApi';
import {
  MANUALFINISH,
  CLOSEAUTOREACOGING,
  showOnlyAIRes,
  AIAUTOFINISH,
  manualAI,
  showSmallImg,
  showCutSmallImgList,
  noPhotoRecognition
} from '../events';
import { soundRecord } from '../audiojs/soundRecording';
import { SentenceRecognitionZH, SentenceRecognitionEN } from '../audiojs/SentenceRecognition';
import {
  setRecognitionContent,
  changeIsShowLoading,
  setRecogingTime,
  changeLanguages,
  changeIsManualVoice
} from '../../reducers/voiceRecognition.js';

import {
  openSpeechRecognition,
  openAutoRecogition
} from '../../reducers/modals';

import { setSelectcamera } from '../../reducers/ai';
import { store } from '../app-state-hoc';
const { dispatch } = store;


const generatePrimitiveFunc = runtime => {
  runtime._primitives.AIBlock_cameraList = args => new Promise(resolve => {
    const index = parseInt(args.camera, 10);
    if (args.camera !== -1){
      store.dispatch(setSelectcamera(camera.cameraList[index]));
    }
    resolve();
  });

  // 自动录音
  runtime._primitives.AIVoice_AutoVoice = args => new Promise(resolve => {
    (() => {
      document.addEventListener(CLOSEAUTOREACOGING, () => {
        resolve();
      });
    })();
    const num = args.time;
    // 打开弹窗
    dispatch(openSpeechRecognition());
    dispatch(openAutoRecogition());
    dispatch(changeIsShowLoading(true));
    // 保存语音识别时间
    dispatch(setRecogingTime(num));
    soundRecord.startRecording(args.time, num).then(blob => {
      // 保存录音
      window.voice = blob;
      // 语音识别
      if (args.Languages === 'ZH'){
        SentenceRecognitionZH().then(text => {
          window.recognitionContent = text;
          // 自动录音关闭loading
          dispatch(setRecognitionContent(text));
          dispatch(changeIsShowLoading(false));
          resolve();
        });
      } else if (args.Languages === 'EN'){
        SentenceRecognitionEN().then(text => {
          window.recognitionContent = text;
          // 自动录音关闭loading
          dispatch(setRecognitionContent(text));
          dispatch(changeIsShowLoading(false));
          resolve();
        });
      }
    });
  });

  // 手动录音
  runtime._primitives.AIVoice_ManualVoice = args => new Promise(resolve => {
    dispatch(changeLanguages(args.languages));
    dispatch(openSpeechRecognition());
    dispatch(changeIsManualVoice(true));
    (() => {
      document.addEventListener(MANUALFINISH, () => {
        resolve();
      });
    })();
  });
  // 显示结果
  runtime._primitives.AIVoice_Result = () => window.recognitionContent;

  const cb = resolve => evt => {
    resolve(evt.detail);
    document.removeEventListener(AIAUTOFINISH, cb(resolve));
  };
  runtime._primitives.AIBlock_DetectPic = args => new Promise(resolve => {
    const timeout = args.timeout;
    document.dispatchEvent(showOnlyAIRes(parseInt(timeout, 10)));
    document.addEventListener(AIAUTOFINISH, cb(resolve));
  });
  runtime._primitives.AIBlock_ManualDetectPic = _ => new Promise(resolve => {
    document.dispatchEvent(manualAI(false));
    document.addEventListener(AIAUTOFINISH, cb(resolve));
  });
  runtime._primitives.AIBlock_Picture = _ => window.photo;
  runtime._primitives.AIBlock_OCR = _ => new Promise(resolve => {
    tencentAPI.ocrText(resolve);
  });
  runtime._primitives.AIBlock_FaceGender = args => new Promise(resolve => {
    tencentAPI.faceGender(resolve, args.gender);
  });
  runtime._primitives.AIBlock_FaceExpression = args => new Promise(resolve => {
    tencentAPI.faceExpression(resolve, args.expression);
  });
  runtime._primitives.AIBlock_FaceName = _ => new Promise(resolve => {
    tencentAPI.faceName(resolve);
  });
  runtime._primitives.AIBlock_FaceNamePercent = args => new Promise(resolve => {
    const Class = args.class;
    tencentAPI.faceNamePercent(resolve, Class);
  });
  runtime._primitives.AIBlock_ThingsCount = args => new Promise(resolve => {
    const type = args.type;
    const apiType = type === 'shape' ? 'cutImage' : 'colorImageCut';
    CalibrationWs.getSingleInstace()[apiType](window.photo, false)
      .then(res => {
        resolve(res.length);
      });
  });

  runtime._primitives.AIBlock_CutAndSee = async args => {
    const picture = args.picture.includes('base64') ? args.picture : window.photo;
    if (!picture) return;
    const type = args.type;
    const cutApiType = type === 'shape' ? 'cutImage' : 'colorImageCut';
    const groupApiType = type === 'shape' ? 'groupImage' : 'colorImageGroup';
    const cutSmallImgList = [];
    document.dispatchEvent(manualAI(type));
    const res = await CalibrationWs.getSingleInstace()[cutApiType](picture, false);
    // 如果是多张图片
    res.map(async arr => {
      let tempObj = {};
      const tempArr = type === 'shape' ? arr : arr.slice(0, 4);
      const image = await camera.generateClipImageBase64(...tempArr, picture);
      tempObj.img = image;
      const i = await CalibrationWs.getSingleInstace()[groupApiType](image);
      tempObj.type = i;
      cutSmallImgList.push(tempObj);
      document.dispatchEvent(showCutSmallImgList(cutSmallImgList));
      tempObj = null;
    });
    document.dispatchEvent(noPhotoRecognition({ picture, res }));
  };
  runtime._primitives.AIBlock_ThingsTag = args => new Promise(resolve => {
    const type = args.type;
    const cutApiType = type === 'shape' ? 'cutImage' : 'colorImageCut';
    const groupApiType = type === 'shape' ? 'groupImage' : 'colorImageGroup';
    const classType = type === 'shape' ? 'cutClassNames' : 'cutColorClassNames';
    CalibrationWs.getSingleInstace()[cutApiType](window.photo, false)
      .then(res => {
        // 如果是多张图片
        res.map((arr, index) => {
          if (+args.index === index + 1) {
            const tempArr = type === 'shape' ? arr : arr.slice(0, 4);
            camera.generateClipImageBase64(...tempArr, window.photo)
              .then(image => CalibrationWs.getSingleInstace()[groupApiType](image))
              .then(i => {
                resolve(store.getState().scratchGui.ai[classType][i]);
              })
              .then(() => resolve('error'));
          }
        });
      });
  });
  runtime._primitives.AIBlock_ThingsPlace = args => new Promise(resolve => {
    const type = args.type;
    const apiType = type === 'shape' ? 'cutImage' : 'colorImageCut';
    const cord = args.cord;
    CalibrationWs.getSingleInstace()[apiType](window.photo, false)
      .then(res => {
        // 如果有图片
        if (res[0]) {
          res.map((arr, index) => {
            if (+args.index === index + 1) {
              CalibrationWs.getSingleInstace().imagePointToRobotPoint(arr[0] + (arr[2] / 2), arr[1] + (arr[3] / 2))
                .then(result => {
                  if (!result) resolve('error');
                  resolve(result[0][cord]);
                });
            }
          });
        } else {
          resolve('error');
        }
      });
  });
  runtime._primitives.AIBlock_TagPicture = _ => new Promise(resolve => {
    CalibrationWs.getSingleInstace().groupImage(window.photo)
      .then(res => {
        document.dispatchEvent(showSmallImg(res));
        resolve(store.getState().scratchGui.ai.generalNames[res]);
      });
  });
};

export const aiBlocks = function (intl, runtime) {
  generatePrimitiveFunc(runtime);

  const getCamera = () => {
    const tempArr = [];
    if (camera.cameraList.length){
      camera.cameraList.forEach((item, index) => {
        tempArr.push([item[0], `${index}`]);
      });
    } else {
      tempArr.push(['nothing', '-1']);
    }
    return tempArr;
  };


  ScratchBlocks.Blocks.AIBlock_cameraList = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.AI_CAMERALIST,
        args0: [
          {
            type: 'field_dropdown',
            name: 'camera',
            options: getCamera
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'ai',
        extensions: ['shape_statement']
      });
    }
  };

  ScratchBlocks.Blocks.AIVoice_AutoVoice = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.AI_VIOCE,
        args0: [
          {
            type: 'field_dropdown',
            name: 'Languages',
            options: [
              [intl.messages.AI_LANGUAGES_ZH, 'ZH'],
              [intl.messages.AI_LANGUAGES_EN, 'EN']
            ]
          },
          {
            type: 'input_value',
            name: 'time'
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'ai',
        extensions: ['shape_statement']
      });
    }
  };

  
  ScratchBlocks.Blocks.AIVoice_ManualVoice = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.MANUAL_VOICE,
        args0: [
          {
            type: 'field_dropdown',
            name: 'languages',
            options: [
              [intl.messages.AI_LANGUAGES_ZH, 'ZH'],
              [intl.messages.AI_LANGUAGES_EN, 'EN']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        extensions: ['shape_statement'],
        category: 'ai'
      });
    }
  };
  ScratchBlocks.Blocks.AIVoice_Result = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.SPEECH_RECOGNITION_RESULTS,
        category: 'ai',
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        extensions: ['output_string']
      });
    }
  };

  ScratchBlocks.Blocks.AIBlock_DetectPic = {
    init: function () {
      this.jsonInit({
        id: 'AIBlock_DetectPic',
        message0: intl.messages['AI.AIBlock_DetectPic'],
        args0: [{
          type: 'input_value',
          name: 'timeout'
        }],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'To Detect Things in Picture',
        extensions: ['shape_statement'],
        category: 'ai'
      });
    }
  };
  ScratchBlocks.Blocks.AIBlock_ManualDetectPic = {
    init: function () {
      this.jsonInit({
        id: 'AIBlock_ManualDetectPic',
        message0: intl.messages['AI.AIBlock_ManualDetectPic'],
        args0: [],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'To Detect Things in Picture',
        extensions: ['shape_statement'],
        category: 'ai'
      });
    }
  };
  ScratchBlocks.Blocks.AIBlock_TagPicture = {
    init: function () {
      this.jsonInit({
        id: 'AIBlock_TagPicture',
        message0: intl.messages['AI.AIBlock_TagPicture'],
        args0: [{
          type: 'input_value',
          name: 'picture'
        }],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'To tag in Picture',
        extensions: ['output_string'],
        category: 'ai'
      });
    }
  };
  ScratchBlocks.Blocks.AIBlock_Picture = {
    init: function () {
      this.jsonInit({
        id: 'AIBlock_Picture',
        message0: intl.messages['AI.AIBlock_Picture'],
        args0: [],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'Get Picture',
        extensions: ['output_string'],
        category: 'ai'
      });
    }
  };
  ScratchBlocks.Blocks.AIBlock_CutAndSee = {
    init: function () {
      this.jsonInit({
        id: 'AIBlock_CutAndSee',
        message0: intl.messages['AI.AIBlock_CutAndSee'],
        args0: [
          {
            type: 'field_dropdown',
            name: 'type',
            options: [
              [intl.messages.AI_CUT_TYPE_SHAPE, 'shape'],
              [intl.messages.AI_CUT_TYPE_COLOR, 'color']
            ]
          },
          {
            type: 'input_value',
            name: 'picture'
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'Get Picture',
        extensions: ['shape_statement'],
        category: 'ai'
      });
    }
  };
  ScratchBlocks.Blocks.AIBlock_ThingsCount = {
    init: function () {
      this.jsonInit({
        id: 'AIBlock_ThingsCount',
        message0: intl.messages['AI.AIBlock_ThingsCount'],
        args0: [
          {
            type: 'field_dropdown',
            name: 'type',
            options: [
              [intl.messages.AI_CUT_TYPE_SHAPE, 'shape'],
              [intl.messages.AI_CUT_TYPE_COLOR, 'color']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'Get Picture',
        extensions: ['output_number'],
        category: 'ai'
      });
    }
  };
  ScratchBlocks.Blocks.AIBlock_ThingsPlace = {
    init: function () {
      this.jsonInit({
        id: 'AIBlock_ThingsPlace',
        message0: intl.messages['AI.AIBlock_ThingsPlace'],
        args0: [{
          type: 'field_dropdown',
          name: 'type',
          options: [
            [intl.messages.AI_CUT_TYPE_SHAPE, 'shape'],
            [intl.messages.AI_CUT_TYPE_COLOR, 'color']
          ]
        }, {
          type: 'input_value',
          name: 'index'
        }, {
          type: 'field_dropdown',
          name: 'cord',
          options: [['x', '0'], ['y', '1']]
        }],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'Get Picture',
        extensions: ['output_number'],
        category: 'ai'
      });
    }
  };
  ScratchBlocks.Blocks.AIBlock_ThingsTag = {
    init: function () {
      this.jsonInit({
        id: 'AIBlock_ThingsTag',
        message0: intl.messages['AI.AIBlock_ThingsTag'],
        args0: [
          {
            type: 'field_dropdown',
            name: 'type',
            options: [
              [intl.messages.AI_CUT_TYPE_SHAPE, 'shape'],
              [intl.messages.AI_CUT_TYPE_COLOR, 'color']
            ]
          },
          {
            type: 'input_value',
            name: 'index'
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'Get thing\'s tag',
        extensions: ['output_string'],
        category: 'ai'
      });
    }
  };
  ScratchBlocks.Blocks.AIBlock_FaceGender = {
    init: function () {
      this.jsonInit({
        id: 'AIBlock_FaceGender',
        message0: intl.messages['AI.AIBlock_FaceGender'],
        args0: [{
          type: 'input_value',
          name: 'index'
        }, {
          type: 'field_dropdown',
          name: 'gender',
          options: [['male', 'male'], ['female', 'female']]
        }],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'Get face gender',
        extensions: ['output_boolean'],
        category: 'ai'
      });
    }
  };
  ScratchBlocks.Blocks.AIBlock_FaceExpression = {
    init: function () {
      this.jsonInit({
        id: 'AIBlock_FaceExpression',
        message0: intl.messages['AI.AIBlock_FaceExpression'],
        args0: [{
          type: 'input_value',
          name: 'index'
        }, {
          type: 'field_dropdown',
          name: 'expression',
          options: [['normal', 'normal'], ['smile', 'smile'], ['laugh', 'laugh']]
        }],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'Get face expression',
        extensions: ['output_boolean'],
        category: 'ai'
      });
    }
  };
  ScratchBlocks.Blocks.AIBlock_FaceName = {
    init: function () {
      this.jsonInit({
        id: 'AIBlock_FaceName',
        message0: intl.messages['AI.AIBlock_FaceName'],
        args0: [{
          type: 'input_value',
          name: 'index'
        }],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'Get face name',
        extensions: ['output_string'],
        category: 'ai'
      });
    }
  };
  const getOption = function() {
    if (store.getState().scratchGui.ai.faceNames.length) {
      const tempOption = [];
      if (store.getState().scratchGui.ai.faceNames){
        store.getState().scratchGui.ai.faceNames.map(Class => {
          tempOption.push([Class, Class]);
        });
      }
      return tempOption;
    }
    return [['Class1', 'Class1'], ['Class2', 'Class2'], ['Class3', 'Class3']];
  };
  ScratchBlocks.Blocks.AIBlock_FaceNamePercent = {

    init: function () {
      this.jsonInit({
        id: 'AIBlock_FaceNamePercent',
        message0: intl.messages['AI.AIBlock_FaceNamePercent'],
        args0: [{
          type: 'input_value',
          name: 'index'
        }, {
          type: 'field_dropdown',
          name: 'class',
          options: getOption()
        }],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'Get face name',
        extensions: ['output_string'],
        category: 'ai'
      });
    }
  };
  ScratchBlocks.Blocks.AIBlock_OCR = {
    init: function () {
      this.jsonInit({
        id: 'AIBlock_OCR',
        message0: intl.messages['AI.AIBlock_OCR'],
        args0: [{
          type: 'input_value',
          name: 'picture'
        }],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'To cut and recognize',
        extensions: ['output_string'],
        category: 'ai'
      });
    }
  };
  
};
