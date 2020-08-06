import Blockly from 'scratch-blocks';
import { blockSeparator, translatorFn, colors } from './common';
import getVisualData from '../import-visual-data';
import downloadBlob from '../download-blob';
import { startVisualSort, ADDEDVISUALSORT, CANCELVISUALSORT } from '../events';
const getArduinoKitInitLabel = translatorFn('ARDUINOKIT_VISUAL_INIT', 'Init Visual Sort');
let isInited = false;
let importFile = {};
const getArduinoKitImportLabel = translatorFn('ARDUINOKIT_VISUAL_IMPORT', 'Import Initailization Data');
const getArduinoKitSaveLabel = translatorFn('ARDUINOKIT_VISUAL_SAVE', 'Save Current Initialization Data');
export const getArduinoKitXml = function () {
  const initCallbackKey = 'initArduinoKitVisual';
  const workspace = Blockly.getMainWorkspace();
  workspace.registerButtonCallback(initCallbackKey, e => {
    if (isInited) {
      document.dispatchEvent(startVisualSort);
      return false;
    }
    new Promise((resolve, reject) => {
      document.dispatchEvent(startVisualSort);
      document.addEventListener(ADDEDVISUALSORT, resolve, { once: true });
      document.addEventListener(CANCELVISUALSORT, reject, { once: true });
    })
      .then(() => {
        isInited = true;
        window.updateToolboxXML(true, true);
      });
  });
  let initedXML = '';
  const importCallbackKey = 'importArduinoKitData';
  workspace.registerButtonCallback(importCallbackKey, () => {
    getVisualData().then(result => {
      const data = JSON.parse(result);
      importFile = { ...data };
      window.data = data;
      isInited = true;
      window.updateToolboxXML(true, true);
    });
  });
  if (isInited) {
    const saveCallbackKey = 'saveArduinoKitData';
    workspace.registerButtonCallback(saveCallbackKey, () => {
      downloadBlob('Visiual Data.txt', new Blob([JSON.stringify(window.data)], { type: 'application/json' }));
      console.log('saveCallbackKey');
    });
    initedXML = `
  ${importFile.filename ? `<label text="imported: ${importFile.filename}" category-label="false"></label>` : ''}
  <button text="${getArduinoKitSaveLabel()}" callbackKey="${saveCallbackKey}"></button>
  <block type="ArduinoKit_RecognitionInit"></block>
  <block type="ArduinoKit_RecognitionExecute"></block>
      <block type="ArduinoKit_SetBlockLocation">
        <value name="cord_x">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="cord_y">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="cord_z">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="cord_r">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="ArduinoKit_DetectBlock"></block>
      <block type="ArduinoKit_CountBlock"></block>
      <block type="ArduinoKit_GetBlock"></block>
      <block type="ArduinoKit_StuckBlock"></block>
      <block type="ArduinoKit_SetBlockNumber">
        <value name="block_count">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
  `;
  }
  return `
    <category name="%{BKY_CATEGORY_VISUAL_SORTING}"
    id="ArduinoKit_Visual" colour="${colors[4].colour}" secondaryColour="${colors[4].secondaryColour}">
      <button text="${getArduinoKitInitLabel()}" callbackKey="${initCallbackKey}"></button>
      <button text="${getArduinoKitImportLabel()}" callbackKey="${importCallbackKey}"></button>
      ${initedXML}      
    </category>
    ${blockSeparator}
    <category name="%{BKY_CATEGORY_SPEECH_RECOGNIZE}"
    id="ArduinoKit_Speech" colour="${colors[5].colour}" secondaryColour="${colors[5].secondaryColour}">
      <block type="ArduinoKit_SpeechRecognizeInit"></block>
      <block type="ArduinoKit_SpeechRecognizeAdd">
        <value name="detect_phrase">
          <shadow type="text">
            <field name="TEXT">hello</field>
          </shadow>
        </value>
      </block>
      <block type="ArduinoKit_DetectPhases"></block>
    </category>
    ${blockSeparator}
    <category name="%{BKY_CATEGORY_JOYSTICK}"
    id="ArduinoKit_Joystick" colour="${colors[6].colour}" secondaryColour="${colors[6].secondaryColour}">
      <block type="ArduinoKit_CheckButtonState"></block>
      <block type="ArduinoKit_TurnLED"></block>
      <block type="ArduinoKit_CheckLEDState"></block>
      <block type="ArduinoKit_ReadJoystickValue"></block>
      <block type="ArduinoKit_CheckJoystickPressState"></block>
    </category>
  `;
};
