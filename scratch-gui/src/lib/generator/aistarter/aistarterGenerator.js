const TAB = Blockly.Arduino.INDENT;
const END = Blockly.Arduino.END;
const ORDER = Blockly.Arduino.ORDER_NONE;
Blockly.Arduino.AIStarter_SmartBotSetLED = function (block) {
  const arg0 = block.getFieldValue('PORT');
  const arg1 = block.getFieldValue('STATE');
  const code = `${TAB}AIStarter_SmartBotSetLED(${arg0},${arg1})${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotSetMovment = function (block) {

  const arg0 = block.getFieldValue('DIR');
  const arg1 = Blockly.Arduino.valueToCode(block, 'SPEED', ORDER);
  const code = `${TAB}AIStarter_SmartBotSetMovment(${arg0},${arg1})${END}`;
  return code;
};


Blockly.Arduino.AIStarter_SmartBotSetMovmentTime = function (block) {

  const arg0 = block.getFieldValue('DIR');
  const arg1 = Blockly.Arduino.valueToCode(block, 'SPEED', ORDER);
  const arg2 = Blockly.Arduino.valueToCode(block, 'TIME', ORDER);
  const code = `${TAB}AIStarter_SmartBotSetMovmentTime(${arg0},${arg1},${arg2})${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotSetMotor = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const arg1 = Blockly.Arduino.valueToCode(block, 'SPEED', ORDER);
  const code = `${TAB}AIStarter_SmartBotSetMotor(${arg0},${arg1})${END}`;
  return code;
};


Blockly.Arduino.AIStarter_SmartBotSetMotorPI = function (block) {

  const arg0 = Blockly.Arduino.valueToCode(block, 'KP', ORDER);
  const arg1 = Blockly.Arduino.valueToCode(block, 'KI', ORDER);
  const code = `${TAB}AIStarter_SmartBotSetMotorPI(${arg0},${arg1})${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotGetMotorPose = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const code = `AIStarter_SmartBotGetMotorPose(${arg0})`;
  return [code, ORDER];
};

Blockly.Arduino.AIStarter_SmartBotSetSonar = function (block) {
  const arg0 = block.getFieldValue('PORT');
  const code = `${TAB}AIStarter_SmartBotSetSonar(${arg0})${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotGetSonar = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const code = `AIStarter_SmartBotGetSonar(${arg0})`;
  return [code, ORDER];
};

Blockly.Arduino.AIStarter_SmartBotGetBarrier = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const code = `AIStarter_SmartBotGetBarrier(${arg0})`;
  return [code, ORDER];
};

Blockly.Arduino.AIStarter_SmartBotGetIRModuleValue = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const code = `AIStarter_SmartBotGetIRModuleValue(${arg0})`;
  return [code, ORDER];
};

Blockly.Arduino.AIStarter_SmartBotGetCompass = function () {

  const code = 'AIStarter_SmartBotGetCompass()';
  return [code, ORDER];
};

Blockly.Arduino.AIStarter_SmartBotSetCompassCalibration = function () {

  const code = `${TAB}AIStarter_SmartBotSetCompassCalibration()${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotSetColorWB = function (block) {
  const arg0 = block.getFieldValue('PORT');
  const code = `${TAB}AIStarter_SmartBotSetColorWB(${arg0})${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotSetColorSenor = function (block) {
  const arg0 = block.getFieldValue('PORT');
  const arg1 = block.getFieldValue('ISON');
  const code = `${TAB}AIStarter_SmartBotSetColorSenor(${arg0},${arg1})${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotGetColorSenor = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const arg1 = block.getFieldValue('COLOR');
  const code = `AIStarter_SmartBotGetColorSenor(${arg0},${arg1})`;
  return [code, ORDER];
};

Blockly.Arduino.AIStarter_SmartBotDetColorSenor = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const arg1 = block.getFieldValue('COLOR');
  const code = `AIStarter_SmartBotDetColorSenor(${arg0},${arg1})`;
  return [code, ORDER];
};

Blockly.Arduino.AIStarter_SmartBotSetKeyInit = function () {
  const code = `${TAB}AIStarter_SmartBotSetKeyInit()${END}`;
  return code;
};


Blockly.Arduino.AIStarter_SmartBotGetKeyValue = function (block) {

  const arg0 = block.getFieldValue('KEY');
  const code = `AIStarter_SmartBotGetKeyValue(${arg0})`;
  return [code, ORDER];
};

Blockly.Arduino.AIStarter_SmartBotSetSonarThreshold = function (block) {

  const arg0 = Blockly.Arduino.valueToCode(block, 'DISTANCE', ORDER);
  const code = `${TAB}AIStarter_SmartBotSetSonarThreshold(${arg0})${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotInit = function () {
  const code = `${TAB}AIStarter_SmartBotInit()${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotGetLightAnalog = function () {

  const code = 'AIStarter_SmartBotGetLightAnalog()';
  return [code, ORDER];
};

Blockly.Arduino.AIStarter_SmartBotServoattach = function (block) {
  const arg0 = block.getFieldValue('PORT');
  const code = `${TAB}AIStarter_SmartBotServoAttach(${arg0})${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotServoWrite = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const arg1 = Blockly.Arduino.valueToCode(block, 'VALUE', ORDER);
  const code = `${TAB}AIStarter_SmartBotServoWrite(${arg0},${arg1})${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotServoDetach = function (block) {
  const arg0 = block.getFieldValue('PORT');
  const code = `${TAB}AIStarter_SmartBotServoDetach(${arg0})${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotTimerTaskAttach = function () {
  const code = `${TAB}AIStarter_SmartBotTimerTaskAttach()${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotTimerTaskDetach = function () {
  const code = `${TAB}AIStarter_SmartBotTimerTaskDetach()${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotXbeeRead = function () {

  const code = 'AIStarter_SmartBotXbeeRead()';
  return [code, ORDER];
};

Blockly.Arduino.AIStarter_SmartBotXbeeWrite = function (block) {

  let arg0 = Blockly.Arduino.valueToCode(block, 'STR', ORDER);
  if (block.childBlocks_[0].type === 'text'){
    arg0 = `"${arg0}"`;
  }
  const code = `${TAB}AIStarter_SmartBotXbeeWrite(${arg0})${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SmartBotXbeeCompare = function (block) {

  let arg0 = Blockly.Arduino.valueToCode(block, 'STR1', ORDER);
  if (block.childBlocks_[0].type === 'text'){
    arg0 = `"${arg0}"`;
  }
  const code = `AIStarter_SmartBotXbeeCompare(${arg0})`;
  return [code, ORDER];
};

Blockly.Arduino.AIStarter_SmartBotXbeeClear = function () {
  const code = `${TAB}AIStarter_SmartBotXbeeClear()${END}`;
  return code;
};

Blockly.Arduino.AIStarter_SetDeviation = function (block) {

  const arg0 = Blockly.Arduino.valueToCode(block, 'IR1', ORDER);
  const arg1 = Blockly.Arduino.valueToCode(block, 'IR2', ORDER);
  const arg2 = Blockly.Arduino.valueToCode(block, 'IR3', ORDER);
  const arg3 = Blockly.Arduino.valueToCode(block, 'IR4', ORDER);
  const arg4 = Blockly.Arduino.valueToCode(block, 'IR5', ORDER);
  const arg5 = Blockly.Arduino.valueToCode(block, 'IR6', ORDER);
  // eslint-disable-next-line max-len
  const code = `${TAB}AIStarter_SmartBotSetLocationDeviation(${arg0}, ${arg1}, ${arg2}, ${arg3}, ${arg4}, ${arg5})${END}`;
  return code;
};

Blockly.Arduino.AIStarter_GetDeviation = function () {

  const code = `AIStarter_SmartBotGetLocation()`;
  return [code, ORDER];
};

Blockly.Arduino.AIStarter_GetHeadDeviation = function () {

  const code = `AIStarter_SmartBotGetCarHeadOffset()`;
  return [code, ORDER];
};

Blockly.Arduino.AIStarter_SmartBotGetPIDLocation = function () {

  const code = `AIStarter_SmartBotGetPIDLocation()`;
  return [code, ORDER];
};

Blockly.Arduino.AIStarter_SmartBotSetLocationPID = function (block) {

  const arg0 = Blockly.Arduino.valueToCode(block, 'KP', ORDER);
  const arg1 = Blockly.Arduino.valueToCode(block, 'KI', ORDER);
  const arg2 = Blockly.Arduino.valueToCode(block, 'Limit', ORDER);
  const arg3 = Blockly.Arduino.valueToCode(block, 'KD', ORDER);
  const code = `${TAB}AIStarter_SmartBotSetLocationPID(${arg0}, ${arg1}, ${arg2}, ${arg3})${END}`;
  return code;
};
Blockly.Arduino.arduino_pin_mode = function (block) {
  const order = Blockly.Arduino.ORDER_NONE;
  const arg0 = Blockly.Arduino.valueToCode(block, 'PINNUM', order);
  const arg1 = block.getFieldValue('ARDUINO_PIN_MODE_OPTION');
  const code = `${Blockly.Arduino.tab()}pinMode(${arg0},${arg1})${Blockly.Arduino.END}`;
  return code;
};


Blockly.Arduino.AIStarter_setBlueTooth = block => {
  let arg0 = Blockly.Arduino.valueToCode(block, 'name', ORDER);
  const arg1 = Blockly.Arduino.valueToCode(block, 'id', ORDER);
  window.a = block;
  if (block.childBlocks_[1].type === 'text'){
    arg0 = `"${arg0}"`;
  }
  const code = `${Blockly.Arduino.tab()}AIStarter_SmartBotSetBleMesh(${arg0},${arg1})${Blockly.Arduino.END}`;
  return code;
};
Blockly.Arduino.AIStarter_getBlueToothMesagges = block => {
  const arg0 = Blockly.Arduino.valueToCode(block, 'id', ORDER);
  const code = `AIStarter_SmartBotBleMeshReadData(${arg0})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};
Blockly.Arduino.AIStarter_setBlueToothMesagges = block => {
  const arg0 = Blockly.Arduino.valueToCode(block, 'id', ORDER);
  let arg1 = Blockly.Arduino.valueToCode(block, 'msg', ORDER);
  if (block.childBlocks_[1].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  const code = `${Blockly.Arduino.tab()}AIStarter_SmartBotBleMeshWriteData(${arg0},${arg1})${Blockly.Arduino.END}`;
  return code;
};
Blockly.Arduino.AIStarter_isGetBlueToothMesagges = block => {
  const arg0 = Blockly.Arduino.valueToCode(block, 'id', ORDER);
  let arg1 = Blockly.Arduino.valueToCode(block, 'msg', ORDER);
  if (block.childBlocks_[1].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  const code = `AIStarter_SmartBotBleMeshIsRead(${arg0},${arg1})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};
Blockly.Arduino.AIStarter_start = block => {
  const arg0 = Blockly.Arduino.valueToCode(block, 'id', ORDER);
  let arg1 = Blockly.Arduino.valueToCode(block, 'msg', ORDER);
  if (block.childBlocks_[1].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  const code = `${Blockly.Arduino.tab()}AIStarter_SmartBotBleMeshWaitRead(${arg0},${arg1},50000)${Blockly.Arduino.END}`;
  return code;
};

Blockly.Arduino.arduino_print = function (block) {
  const order = Blockly.Arduino.ORDER_NONE;
  let arg0 = Blockly.Arduino.valueToCode(block, 'TEXT', order);
  if (block.childBlocks_[0].type === 'text'){
    arg0 = `"${arg0}"`;
  }
  const code = `${Blockly.Arduino.tab()}Serial.print(${arg0})${Blockly.Arduino.END}`;

  return code;
};

Blockly.Arduino.arduino_println = function (block) {
  const order = Blockly.Arduino.ORDER_NONE;
  let arg0 = Blockly.Arduino.valueToCode(block, 'TEXT', order);
  if (block.childBlocks_[0].type === 'text'){
    arg0 = `"${arg0}"`;
  }
  const code = `${Blockly.Arduino.tab()}Serial.println(${arg0})${Blockly.Arduino.END}`;
  return code;
};
