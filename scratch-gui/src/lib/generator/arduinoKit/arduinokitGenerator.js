/* eslint-disable max-len */
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
import { dataDefault } from '../../../containers/arduino-init-cards';
const TAB = Blockly.Arduino.INDENT;
const END = Blockly.Arduino.END;
const valueToCode = (block, name) => Blockly.Arduino.valueToCode(block, name);
Blockly.Arduino.ArduinoKit_RecognitionInit = function () {
  const initRecordData = window.data || dataDefault;
  const { x, y, z } = initRecordData.step3location;
  const { block1, block2, block3 } = initRecordData.step5block;
  const { point1, point2, point3 } = initRecordData.step4point;
  const colorToSig = initRecordData.step6colortosig;
  const zValue = initRecordData.step1Z;
  const colorToHeight = initRecordData.step2rgby;
  const code = `${TAB}SmartKit_VISSetGrapAreaZ(${zValue})${END}${TAB}SmartKit_VISSetAT(${x}, ${y}, ${z}, 0)${END}${TAB}SmartKit_VISSetDobotMatrix(${block1.x}, ${block1.y}, ${block2.x}, ${block2.y}, ${block3.x}, ${block3.y})${END}${TAB}SmartKit_VISSetPixyMatrix(
${TAB}${TAB}${point1.x || 0}, ${point1.y || 0}, ${point1.h || 0}, ${point1.w || 0},
${TAB}${TAB}${point2.x || 0}, ${point2.y || 0}, ${point2.h || 0}, ${point2.w || 0},
${TAB}${TAB}${point3.x || 0}, ${point3.y || 0}, ${point3.h || 0}, ${point3.w || 0})${END}${TAB}SmartKit_VISInit()${END}${TAB}SmartKit_VISSetColorSignature(RED, ${colorToSig.red})${END}${TAB}SmartKit_VISSetColorSignature(BLUE, ${colorToSig.blue})${END}${TAB}SmartKit_VISSetColorSignature(YELLOW, ${colorToSig.yellow})${END}${TAB}SmartKit_VISSetColorSignature(GREEN, ${colorToSig.green})${END}${TAB}SmartKit_VISSetBlockHeight(RED, ${colorToHeight.red})${END}${TAB}SmartKit_VISSetBlockHeight(BLUE, ${colorToHeight.blue})${END}${TAB}SmartKit_VISSetBlockHeight(YELLOW, ${colorToHeight.yellow})${END}${TAB}SmartKit_VISSetBlockHeight(GREEN, ${colorToHeight.green})${END}`;
  return code;
};
  
Blockly.Arduino.ArduinoKit_RecognitionExecute = function () {
  const code = `${TAB}SmartKit_VISRun()${END}`;
  return code;
};
  
Blockly.Arduino.ArduinoKit_SetBlockLocation = function (block) {
  const color = block.getFieldValue('chosen_color').toUpperCase();
  const x = valueToCode(block, 'cord_x');
  const y = valueToCode(block, 'cord_y');
  const z = valueToCode(block, 'cord_z');
  const r = valueToCode(block, 'cord_r');
  const code = `${TAB}SmartKit_VISSetBlockTA(${color}, ${x}, ${y}, ${z}, ${r})${END}`;
  return code;
};
  
Blockly.Arduino.ArduinoKit_DetectBlock = function (block) {
  const color = block.getFieldValue('chosen_color').toUpperCase();
  const code = `SmartKit_VISGetBlockCheckNum(${color})`;
  return [code];
};
  
Blockly.Arduino.ArduinoKit_CountBlock = function (block) {
  const color = block.getFieldValue('chosen_color').toUpperCase();
  const code = `SmartKit_VISGetBlockCheckNum(${color})`;
  return [code];
};
  
Blockly.Arduino.ArduinoKit_GetBlock = function (block) {
  const color = block.getFieldValue('chosen_color').toUpperCase();
  const code = `${TAB}SmartKit_VISGrabBlock(${color}, 1, 0)${END}`;
  return code;
};
Blockly.Arduino.ArduinoKit_StuckBlock = function (block) {
  const color = block.getFieldValue('chosen_color').toUpperCase();
  const code = `${TAB}SmartKit_VISPlaceBlock(${color})${END}`;
  return code;
};
Blockly.Arduino.ArduinoKit_SetBlockNumber = function (block) {
  const color = block.getFieldValue('chosen_color').toUpperCase();
  const num = valueToCode(block, 'block_count');
  const code = `${TAB}SmartKit_VISSetBlockPlaceNum(${color},${num})${END}`;
  return code;
};
Blockly.Arduino.ArduinoKit_SpeechRecognizeInit = function () {
  const code = `${TAB}SmartKit_VoiceCNStart()${END}`;
  return code;
};
Blockly.Arduino.ArduinoKit_Init = function () {
  const code = `  SmartKit_Init()${END}`;
  return code;
};
Blockly.Arduino.ArduinoKit_SpeechRecognizeAdd = function (block) {
  const phaseText = valueToCode(block, 'detect_phrase');
  const phaseNum = block.getFieldValue('phrase_number');
  const code = `${TAB}SmartKit_VoiceCNAddCommand("${phaseText}", ${phaseNum})${END}`;
  return code;
};
Blockly.Arduino.ArduinoKit_DetectPhases = function (block) {
  const phaseNum = block.getFieldValue('phrase_number');
  const code = `SmartKit_VoiceCNVoiceCheck(${phaseNum})`;
  return [code];
};
  
Blockly.Arduino.ArduinoKit_CheckButtonState = function (block) {
  const color = block.getFieldValue('chosen_color').toUpperCase();
  const code = `SmartKit_ButtonCheckState(${color})`;
  return [code];
};
Blockly.Arduino.ArduinoKit_TurnLED = function (block) {
  const color = block.getFieldValue('chosen_color').toUpperCase();
  const switchONOFF = block.getFieldValue('switch').toUpperCase();
  const mapONOFF = { ON: 'HIGH', OFF: 'LOW' };
  const code = `${TAB}SmartKit_LedTurn(${color}, ${mapONOFF[switchONOFF]})${END}`;
  return code;
};
Blockly.Arduino.ArduinoKit_CheckLEDState = function (block) {
  const color = block.getFieldValue('chosen_color').toUpperCase();
  const code = `SmartKit_LedCheckStatu(${color})`;
  return [code];
};
  
Blockly.Arduino.ArduinoKit_ReadJoystickValue = function (block) {
  const mapXY = { x: 'AXISX', y: 'AXISY' };
  const axis = block.getFieldValue('chosen_xy');
  const code = `SmartKit_JoyStickReadXYValue(${mapXY[axis]})`;
  return [code];
};
  
Blockly.Arduino.ArduinoKit_CheckJoystickPressState = function () {
  const code = `SmartKit_JoyStickCheckPressState()`;
  return [code];
};

Blockly.Arduino.Magician_Home = function (block) {
  const code = `${TAB}Dobot_SetHOMECmd()${END}`;
  return code;
};
  
Blockly.Arduino.Magician_SetPTPCommonParams = function (block) {
  const order = Blockly.Arduino.ORDER_NONE;
  const arg0 = Blockly.Arduino.valueToCode(block, 'velocity', order);
  const arg1 = Blockly.Arduino.valueToCode(block, 'acceleration', order);
  const code = `${TAB}Dobot_SetPTPCommonParams(${arg0},${arg1})${END}`;
  return code;
};
  
Blockly.Arduino.Magician_SetPTPJumpParams = function (block) {
  const order = Blockly.Arduino.ORDER_NONE;
  const arg0 = Blockly.Arduino.valueToCode(block, 'jumpHeight', order);
  const code = `${TAB}Dobot_SetPTPJumpParams(${arg0})${END}`;
  return code;
};
  
Blockly.Arduino.Magician_JumpTo = function (block) {
  const order = Blockly.Arduino.ORDER_NONE;
  const x = Blockly.Arduino.valueToCode(block, 'x', order);
  const y = Blockly.Arduino.valueToCode(block, 'y', order);
  const z = Blockly.Arduino.valueToCode(block, 'z', order);
  const r = Blockly.Arduino.valueToCode(block, 'r', order);
  const code = `${TAB}Dobot_SetPTPCmd(${0},${x},${y},${z},${r})${END}`;
  return code;
};
  
Blockly.Arduino.Magician_Goto = function (block) {
  const order = Blockly.Arduino.ORDER_NONE;
  const x = Blockly.Arduino.valueToCode(block, 'x', order);
  const y = Blockly.Arduino.valueToCode(block, 'y', order);
  const z = Blockly.Arduino.valueToCode(block, 'z', order);
  const r = Blockly.Arduino.valueToCode(block, 'r', order);
  const moveType = block.getFieldValue('moveType');
  const code = `${TAB}Dobot_SetPTPCmd(${moveType},${x},${y},${z},${r})${END}`;
  return code;
};
  
Blockly.Arduino.Magician_MoveDistance = function (block) {
  const order = Blockly.Arduino.ORDER_NONE;
  const x = Blockly.Arduino.valueToCode(block, 'x', order);
  const y = Blockly.Arduino.valueToCode(block, 'y', order);
  const z = Blockly.Arduino.valueToCode(block, 'z', order);
  const r = Blockly.Arduino.valueToCode(block, 'r', order);
  const code = `${TAB}Dobot_SetPTPCmd(${7},${x},${y},${z},${r})${END}`;
  return code;
};
  
Blockly.Arduino.Magician_SetMotorSpeed = function (block) {
  const order = Blockly.Arduino.ORDER_NONE;
  const Motor = block.getFieldValue('Motor');
  const Speed = Blockly.Arduino.valueToCode(block, 'Speed', order);
  const code = `${TAB}Dobot_SetEMotor(${Motor},1,${Speed})${END}`;
  return code;
};
  
Blockly.Arduino.Magician_SetMotorSpeedAndDistance = function (block) {
  const order = Blockly.Arduino.ORDER_NONE;
  const Motor = block.getFieldValue('Motor');
  const Speed = Blockly.Arduino.valueToCode(block, 'Speed', order);
  const Distance = Blockly.Arduino.valueToCode(block, 'Distance', order);
  const code = `${TAB}Dobot_SetEMotorS(${Motor},1,${Speed},${Distance})${END}`;
  return code;
};
  
Blockly.Arduino.Magician_GetCurrentCoordinate = function (block) {
  const order = Blockly.Arduino.ORDER_NONE;
  const coordinate = block.getFieldValue('coordinate');
  let arg;
  if (Number(coordinate) === 1) {
    arg = 'X';
  } else if (Number(coordinate) === 2) {
    arg = 'Y';
  } else if (Number(coordinate) === 3) {
    arg = 'Z';
  } else if (Number(coordinate) === 4) {
    arg = 'R';
  }
  const code = `Dobot_GetPose(${arg})`;
  return [code, order];
};
  
Blockly.Arduino.Magician_GetIODI = function (block) {
  const order = Blockly.Arduino.ORDER_NONE;
  const eio = block.getFieldValue('eio');
  const code = `Dobot_GetIODI(${eio})`;
  return [code, order];
};
