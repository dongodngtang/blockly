import ScratchBlocks from 'scratch-blocks';
import { store } from '../app-state-hoc';
import {
  openSpeechRecognition
} from '../../reducers/modals';
import {
  colors
} from './common';

import { editAI } from '../events';
import { camera } from '../video/camera';
import { message } from 'antd';

export const checkCalibrationAIAdded = () => window.AIAdded;

window.addEventListener('load', () => {
  const workspace = ScratchBlocks.getMainWorkspace();
  workspace.registerButtonCallback('editAI', () => {
    document.dispatchEvent(editAI(false, 'editAI'));
  });
  workspace.registerButtonCallback('editAIFace', () => {
    document.dispatchEvent(editAI(true, 'editAIFace'));
  });
});

export const aiXml = function(canCalibrate) {

  const REFRESH_CAMERA_LIST = ScratchBlocks.ScratchMsgs.translate(
    'REFRESH_CAMERA_LIST',
    'Refresh camera list'
  );

  const VOICE_RECOGNITION = ScratchBlocks.ScratchMsgs.translate(
    'VOICE_RECOGNITION',
    'voice recognition'
  );
  const OPEN_SPEECH_RECOGNITION = ScratchBlocks.ScratchMsgs.translate(
    'OPEN_SPEECH_RECOGNITION',
    'open speech recognition'
  );
  const IMAGE_IDENTIFICATION = ScratchBlocks.ScratchMsgs.translate(
    'IMAGE_IDENTIFICATION',
    'Image recognition'
  );
  const IMAGE_ACQUISITION = ScratchBlocks.ScratchMsgs.translate(
    'IMAGE_ACQUISITION',
    'Image acquisition'
  );
  const FACE_RECOGNITION = ScratchBlocks.ScratchMsgs.translate(
    'FACE_RECOGNITION',
    'Face recognition'
  );
  const TEXT_RECOGNITION = ScratchBlocks.ScratchMsgs.translate(
    'TEXT_RECOGNITION',
    'OCR  Text recognition'
  );
  const INIT_CLASSIFICATION_DATA = ScratchBlocks.ScratchMsgs.translate(
    'INIT_CLASSIFICATION_DATA',
    'New classification data'
  );
  const EDIT_CLASSIFICATION_DATA = ScratchBlocks.ScratchMsgs.translate(
    'EDIT_CLASSIFICATION_DATA',
    'Edit classification data'
  );
  const INIT_FACE_DATA = ScratchBlocks.ScratchMsgs.translate(
    'INIT_FACE_DATA',
    'New face data'
  );
  const EDIT_FACE_DATA = ScratchBlocks.ScratchMsgs.translate(
    'EDIT_FACE_DATA',
    'Edit face data'
  );

  const aiIdentificationData = store.getState().scratchGui.ai;
  const changeClassBtnText = () => {
    if (aiIdentificationData){
      if ((aiIdentificationData.cutImageListObj.length > 1 ||
        aiIdentificationData.cutImageListObj[0].length > 0) ||
          (aiIdentificationData.generalImageListObj.length > 1 ||
            aiIdentificationData.generalImageListObj[0].length > 0) ||
            (aiIdentificationData.cutColorImageListObj.length > 1 ||
              aiIdentificationData.generalImageListObj[0].length > 0)){
        return EDIT_CLASSIFICATION_DATA;
      }
      return INIT_CLASSIFICATION_DATA;
    }
  };
  const changeFaceBtnText = () => {
    if (aiIdentificationData.faceImageListObj.length > 1 ||
      aiIdentificationData.faceImageListObj[0].length > 0){
      return EDIT_FACE_DATA;
    }
    return INIT_FACE_DATA;
  };
  
  const buttonKeys = {
    openSpeechRecognition: 'openSpeechRecognition',
    refreshCameraList: 'refreshCameraList'
  };
  (() => {
    const workspace = ScratchBlocks.getMainWorkspace();
    workspace.registerButtonCallback(buttonKeys.openSpeechRecognition, () => {
      store.dispatch(openSpeechRecognition());
    });
    workspace.registerButtonCallback(buttonKeys.refreshCameraList, () => {
      camera.getCameraList().then(() => {
        message.success('刷新成功');
      })
        .catch(() => {
          message.error('刷新失败');
        });
    });
  })();
  const hello = ScratchBlocks.ScratchMsgs.translate('DEFAUL_TTEXT_TO_SPEECH', 'hello');
  return `
    <category name="AI"
    id="AI" colour="${colors[7].colour}" secondaryColour="${colors[7].secondaryColour}">
      <label text="camera" category-label="false"></label>
      <button text="${REFRESH_CAMERA_LIST}" callbackKey="${buttonKeys.refreshCameraList}"></button>
      <block type="AIBlock_cameraList">
      </block>
      <label text="${VOICE_RECOGNITION}" category-label="false"></label>    
      <button text="${OPEN_SPEECH_RECOGNITION}" callbackKey="${buttonKeys.openSpeechRecognition}"></button>
      <block type="AIVoice_AutoVoice">
        <value name="time">
          <shadow type="math_number">
              <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="AIVoice_ManualVoice">
        <value name="time">
          <shadow type="math_number">
              <field name="NUM">1</field>
          </shadow>
        </value>
      </block>

      <block type="AIVoice_Result">
      </block>
      <label text="%{BKY_TEXTTOSPEECH}" category-label="false"></label>
      <block type="AIVoice_TextToSpeech">
        <value name="inputText">
          <shadow type="text">
            <field name="TEXT">${hello}</field>
          </shadow>
        </value>
      </block>
      <block type="AIBlock_setVoice"></block>
      <block type="AIBlock_setLanguage"></block>
      <label text="%{BKY_SPEECHTOTEXT}" category-label="false"></label>
      <block type="AIBlock_getTranslateblock">
        <value name="WORDS">
          <shadow type="text">
            <field name="TEXT">${hello}</field>
          </shadow>
        </value>
      </block>
      <block type="AIBlock_getViewerLanguageblock"></block>
      <label text="${IMAGE_ACQUISITION}" category-label="false"></label>
      <block type="AIBlock_DetectPic">
        <value name="timeout">
          <shadow type="math_number">
              <field name="NUM">3</field>
          </shadow>
        </value>
      </block>
      <block type="AIBlock_ManualDetectPic"></block>
      <block type="AIBlock_Picture"></block>
  
      <label text="${IMAGE_IDENTIFICATION}" category-label="false"></label>
      <button text="${changeClassBtnText()}" callbackKey="editAI"></button>
  
  
      <block type="AIBlock_TagPicture">
        <value name="picture">
          <shadow type="math_number">
              <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="AIBlock_CutAndSee">
        <value name="picture">
          <shadow type="math_number">
              <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="AIBlock_ThingsCount"></block>
      <block type="AIBlock_ThingsTag">
        <value name="index">
          <shadow type="math_number">
              <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      ${canCalibrate ? `<block type="AIBlock_ThingsPlace">
      <value name="index">
        <shadow type="math_number">
            <field name="NUM">1</field>
        </shadow>
      </value>
    </block>` : ''}
  
      <label text="${FACE_RECOGNITION}" category-label="false"></label>
      <button text="${changeFaceBtnText()}" callbackKey="editAIFace"></button>
      <block type="AIBlock_FaceGender">
        <value name="index">
          <shadow type="math_number">
              <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="AIBlock_FaceExpression">
        <value name="index">
          <shadow type="math_number">
              <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="AIBlock_FaceName">
        <value name="index">
          <shadow type="math_number">
              <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="AIBlock_FaceNamePercent">
        <value name="index">
          <shadow type="math_number">
              <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <label text="${TEXT_RECOGNITION}" category-label="false"></label>
      <block type="AIBlock_OCR">
        <value name="picture">
          <shadow type="math_number">
              <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
    </category>
    `;
};
