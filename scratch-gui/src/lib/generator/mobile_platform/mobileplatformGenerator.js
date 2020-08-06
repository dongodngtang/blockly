const TAB = Blockly.Arduino.INDENT;
const END = Blockly.Arduino.END;
const ORDER = Blockly.Arduino.ORDER_NONE;
Blockly.Arduino.MobilePlatform_SmartBotSetLED = function (block) {
  const arg0 = block.getFieldValue('PORT');
  const arg1 = block.getFieldValue('STATE');
  const code = `${TAB}MobilePlatform_SmartBotSetLED(${arg0},${arg1})${END}`;
  return code;
};

Blockly.Arduino.MobilePlatform_SmartBotSetMovment = function (block) {
  const arg0 = block.getFieldValue('DIR');
  const arg1 = Blockly.Arduino.valueToCode(block, 'SPEED', ORDER);
  const code = `${TAB}MobilePlatform_SmartBotSetMovment(${arg0},${arg1})${END}`;
  return code;
};


Blockly.Arduino.MobilePlatform_SmartBotSetMovmentTime = function (block) {

  const arg0 = block.getFieldValue('DIR');
  const arg1 = Blockly.Arduino.valueToCode(block, 'SPEED', ORDER);
  const arg2 = Blockly.Arduino.valueToCode(block, 'TIME', ORDER);
  const code = `${TAB}MobilePlatform_SmartBotSetMovmentTime(${arg0},${arg1},${arg2})${END}`;
  return code;
};

Blockly.Arduino.MobilePlatform_SmartBotSetMotor = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const arg1 = Blockly.Arduino.valueToCode(block, 'SPEED', ORDER);
  const code = `${TAB}MobilePlatform_SmartBotSetMotor(${arg0},${arg1})${END}`;
  return code;
};


Blockly.Arduino.MobilePlatform_SmartBotSetMotorPI = function (block) {

  const arg0 = Blockly.Arduino.valueToCode(block, 'KP', ORDER);
  const arg1 = Blockly.Arduino.valueToCode(block, 'KI', ORDER);
  const code = `${TAB}MobilePlatform_SmartBotSetMotorPI(${arg0},${arg1})${END}`;
  return code;
};

Blockly.Arduino.MobilePlatform_SmartBotGetMotorPose = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const code = `MobilePlatform_SmartBotGetMotorPose(${arg0})`;
  return [code, ORDER];
};

Blockly.Arduino.MobilePlatform_SmartBotSetSonar = function (block) {
  const arg0 = block.getFieldValue('PORT');
  const code = `${TAB}MobilePlatform_SmartBotSetSonar(${arg0})${END}`;
  return code;
};

Blockly.Arduino.MobilePlatform_SmartBotGetSonar = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const code = `MobilePlatform_SmartBotGetSonar(${arg0})`;
  return [code, ORDER];
};

Blockly.Arduino.MobilePlatform_SmartBotGetBarrier = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const code = `MobilePlatform_SmartBotGetBarrier(${arg0})`;
  return [code, ORDER];
};

Blockly.Arduino.MobilePlatform_SmartBotGetIRModuleValue = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const code = `MobilePlatform_SmartBotGetIRModuleValue(${arg0})`;
  return [code, ORDER];
};

Blockly.Arduino.MobilePlatform_SmartBotGetCompass = function () {

  const code = 'MobilePlatform_SmartBotGetCompass()';
  return [code, ORDER];
};

Blockly.Arduino.MobilePlatform_SmartBotSetCompassCalibration = function () {
  const code = `${TAB}MobilePlatform_SmartBotSetCompassCalibration()${END}`;
  return code;
};

Blockly.Arduino.MobilePlatform_SmartBotSetColorWB = function (block) {
  const arg0 = block.getFieldValue('PORT');
  const code = `${TAB}MobilePlatform_SmartBotSetColorWB(${arg0})${END}`;
  return code;
};

Blockly.Arduino.MobilePlatform_SmartBotSetColorSenor = function (block) {
  const arg0 = block.getFieldValue('PORT');
  const arg1 = block.getFieldValue('ISON');
  const code = `${TAB}MobilePlatform_SmartBotSetColorSenor(${arg0},${arg1})${END}`;
  return code;
};

Blockly.Arduino.MobilePlatform_SmartBotGetColorSenor = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const arg1 = block.getFieldValue('COLOR');
  const code = `MobilePlatform_SmartBotGetColorSenor(${arg0},${arg1})`;
  return [code, ORDER];
};

Blockly.Arduino.MobilePlatform_SmartBotDetColorSenor = function (block) {

  const arg0 = block.getFieldValue('PORT');
  const arg1 = block.getFieldValue('COLOR');
  const code = `MobilePlatform_SmartBotDetColorSenor(${arg0},${arg1})`;
  return [code, ORDER];
};

Blockly.Arduino.MobilePlatform_SmartBotSetKeyInit = function () {
  const code = `${TAB}MobilePlatform_SmartBotSetKeyInit()${END}`;
  return code;
};


Blockly.Arduino.MobilePlatform_SmartBotGetKeyValue = function (block) {

  const arg0 = block.getFieldValue('KEY');
  const code = `MobilePlatform_SmartBotGetKeyValue(${arg0})`;
  return [code, ORDER];
};

Blockly.Arduino.MobilePlatform_SmartBotSetSonarThreshold = function (block) {

  const arg0 = Blockly.Arduino.valueToCode(block, 'DISTANCE', ORDER);
  const code = `${TAB}MobilePlatform_SmartBotSetSonarThreshold(${arg0})${END}`;
  return code;
};


Blockly.Arduino.MobilePlatform_SmartBotInit = function () {
  const code = `${TAB}MobilePlatform_SmartBotInit()${END}`;
  return code;
};

Blockly.Arduino.MobilePlatform_SetDeviation = function (block) {

  const arg0 = Blockly.Arduino.valueToCode(block, 'IR1', ORDER);
  const arg1 = Blockly.Arduino.valueToCode(block, 'IR2', ORDER);
  const arg2 = Blockly.Arduino.valueToCode(block, 'IR3', ORDER);
  const arg3 = Blockly.Arduino.valueToCode(block, 'IR4', ORDER);
  const arg4 = Blockly.Arduino.valueToCode(block, 'IR5', ORDER);
  const arg5 = Blockly.Arduino.valueToCode(block, 'IR6', ORDER);
  // eslint-disable-next-line max-len
  const code = `${TAB}MobilePlatform_SmartBotSetLocationDeviation(${arg0}, ${arg1}, ${arg2}, ${arg3}, ${arg4}, ${arg5})${END}`;
  return code;
};

Blockly.Arduino.MobilePlatform_GetDeviation = function () {

  const code = `MobilePlatform_SmartBotGetLocation()`;
  return [code, ORDER];
};

Blockly.Arduino.MobilePlatform_SmartBotGetPIDLocation = function () {

  const code = `MobilePlatform_SmartBotGetPIDLocation()`;
  return [code, ORDER];
};

Blockly.Arduino.MobilePlatform_SmartBotSetLocationPID = function (block) {

  const arg0 = Blockly.Arduino.valueToCode(block, 'KP', ORDER);
  const arg1 = Blockly.Arduino.valueToCode(block, 'KI', ORDER);
  const arg2 = Blockly.Arduino.valueToCode(block, 'Limit', ORDER);
  const arg3 = Blockly.Arduino.valueToCode(block, 'KD', ORDER);
  const code = `${TAB}MobilePlatform_SmartBotSetLocationPID(${arg0}, ${arg1}, ${arg2}, ${arg3})${END}`;
  return code;
};

Blockly.Arduino.Magician_SetEndFixture = function (block) {

  const arg0 = block.getFieldValue('BTN');
  const arg1 = 0;
  const arg2 = 0;
  const code = `${TAB}Dobot_SetEndEffectorParams(${arg0}, ${arg1}, ${arg2})${END}`;
  return code;
};

Blockly.Arduino.Magician_SetPTPCommonParams = function (block) {

  const arg0 = Blockly.Arduino.valueToCode(block, 'velocity', ORDER);
  const arg1 = Blockly.Arduino.valueToCode(block, 'acceleration', ORDER);
  const code = `${TAB}Dobot_SetPTPCommonParams(${arg0}, ${arg1})${END}`;
  return code;
};

Blockly.Arduino.Magician_SetPTPJointParams = function (block) {

  const arg0 = Blockly.Arduino.valueToCode(block, 'velocity', ORDER);
  const arg1 = Blockly.Arduino.valueToCode(block, 'acceleration', ORDER);
  const code = `${TAB}Dobot_SetPTPJointParams(${arg0}, ${arg1}, ${arg0}, ${arg1}, 
    ${arg0}, ${arg1}, ${arg0}, ${arg1})${END}`;
  return code;
};

Blockly.Arduino.Magician_SetMotorSpeed = function (block) {

  const arg0 = block.getFieldValue('Motor');
  const arg1 = 1;
  const arg2 = Blockly.Arduino.valueToCode(block, 'Speed', ORDER);

  const code = `${TAB}Dobot_SetEMotor(${arg0}, ${arg1}, ${arg2})${END}`;
  return code;
};

Blockly.Arduino.Magician_SetPTPJumpParams = function (block) {

  const arg0 = Blockly.Arduino.valueToCode(block, 'jumpHeight', ORDER);
  const arg1 = Blockly.Arduino.valueToCode(block, 'zLimit', ORDER);

  const code = `${TAB}Dobot_SetPTPJumpParams(${arg0}, ${arg1})${END}`;
  return code;
};

Blockly.Arduino.Magician_SetMotorSpeedAndDistance = function (block) {

  const arg0 = block.getFieldValue('Motor');
  const arg1 = 1;
  const arg2 = Blockly.Arduino.valueToCode(block, 'Speed', ORDER);
  const arg3 = Blockly.Arduino.valueToCode(block, 'Distance', ORDER);
  const code = `${TAB}Dobot_SetEMotorS(${arg0}, ${arg1}, ${arg2}, ${arg3})${END}`;
  return code;
};

Blockly.Arduino.Magician_SetConveyor = function (block) {

  const STEP_PER_CIRCLE = 32000;
  const MM_PER_CIRCLE = 3.1415926535898 * 36;
  const vel = STEP_PER_CIRCLE / MM_PER_CIRCLE;
  const arg0 = block.getFieldValue('Motor');
  const arg1 = 1;
  const arg2 = Blockly.Arduino.valueToCode(block, 'Speed', ORDER) * vel;
  const code = `${TAB}Dobot_SetEMotor(${arg0}, ${arg1}, ${arg2})${END}`;
  return code;
};

Blockly.Arduino.Magician_Home = function (block) {
  const code = `${TAB}Dobot_SetHOMECmd()${END}`;
  return code;
};

Blockly.Arduino.Magician_JumpTo = function (block) {
  const ptpMode = 0;
  const x = Blockly.Arduino.valueToCode(block, 'x', ORDER);
  const y = Blockly.Arduino.valueToCode(block, 'y', ORDER);
  const z = Blockly.Arduino.valueToCode(block, 'z', ORDER);
  const r = Blockly.Arduino.valueToCode(block, 'r', ORDER);
  const code = `${TAB}Dobot_SetPTPCmd(${ptpMode}, ${x}, ${y}, ${z}, ${r})${END}`;
  return code;
};

Blockly.Arduino.Magician_Goto = function (block) {
  const ptpMode = block.getFieldValue('moveType');
  const x = Blockly.Arduino.valueToCode(block, 'x', ORDER);
  const y = Blockly.Arduino.valueToCode(block, 'y', ORDER);
  const z = Blockly.Arduino.valueToCode(block, 'z', ORDER);
  const r = Blockly.Arduino.valueToCode(block, 'r', ORDER);
  const code = `${TAB}Dobot_SetPTPCmd(${ptpMode}, ${x}, ${y}, ${z}, ${r})${END}`;
  return code;
};

Blockly.Arduino.Magician_MoveDistance = function (block) {
  const ptpMode = 7;
  const x = Blockly.Arduino.valueToCode(block, 'x', ORDER);
  const y = Blockly.Arduino.valueToCode(block, 'y', ORDER);
  const z = Blockly.Arduino.valueToCode(block, 'z', ORDER);
  const r = Blockly.Arduino.valueToCode(block, 'r', ORDER);
  const code = `${TAB}Dobot_SetPTPCmd(${ptpMode}, ${x}, ${y}, ${z}, ${r})${END}`;
  return code;
};

Blockly.Arduino.Magician_SetJointAngle = function (block) {
  const ptpMode = 4;
  const x = Blockly.Arduino.valueToCode(block, 'Joint1', ORDER);
  const y = Blockly.Arduino.valueToCode(block, 'Joint2', ORDER);
  const z = Blockly.Arduino.valueToCode(block, 'Joint3', ORDER);
  const r = Blockly.Arduino.valueToCode(block, 'Joint4', ORDER);
  const code = `${TAB}Dobot_SetPTPCmd(${ptpMode}, ${x}, ${y}, ${z}, ${r})${END}`;
  return code;
};

Blockly.Arduino.Magician_Gripper = function (block) {
  const arg0 = block.getFieldValue('status');
  let enable;
  let grip;
  if (arg0 === 'Grip') {
    enable = true;
    grip = true;
  } else if (arg0 === 'Release') {
    enable = true;
    grip = false;
  } else {
    enable = false;
    grip = false;
  }
  const code = `${TAB}Dobot_SetEndEffectorGripper(${enable}, ${grip})${END}`;
  return code;
};

Blockly.Arduino.Magician_SetSuctionCup = function (block) {
  const arg0 = block.getFieldValue('status');
  const code = `${TAB}Dobot_SetEndEffectorSuctionCup(${arg0})${END}`;
  return code;
};

Blockly.Arduino.Magician_GetCurrentCoordinate = function (block) {
  const coordinate = block.getFieldValue('coordinate');
  const code = `Dobot_GetPose(${coordinate})`;
  return [code, ORDER];
};

Blockly.Arduino.Magician_GetJointAngle = function (block) {
  const coordinate = block.getFieldValue('joint');
  const code = `Dobot_GetPose(${Number(coordinate) + 4})`;
  return [code, ORDER];
};

Blockly.Arduino.Magician_SetIOMultiplexing = function (block) {
  const address = block.getFieldValue('eio');
  const multiplex = block.getFieldValue('mode');
  const code = `${TAB}Dobot_SetIOMultiplexing(${address}, ${multiplex})${END}`;
  return code;
};

Blockly.Arduino.Magician_SetPWMOutput = function (block) {
  const address = block.getFieldValue('eio');
  const frequency = Blockly.Arduino.valueToCode(block, 'frequency', ORDER);
  const dutyCycle = Blockly.Arduino.valueToCode(block, 'dutyCycle', ORDER);
  const code = `${TAB}Dobot_SetIOPWM(${address}, ${frequency}, ${dutyCycle})${END}`;
  return code;
};

Blockly.Arduino.Magician_SetLeaveIOutput = function (block) {
  const address = block.getFieldValue('eio');
  const IsEnable = block.getFieldValue('IsEnable');
  const code = `${TAB}Dobot_SetIODO(${address}, ${IsEnable})${END}`;
  return code;
};

Blockly.Arduino.Magician_GetIODI = function (block) {
  const address = block.getFieldValue('eio');
  const code = `Dobot_GetIODI(${address})`;
  return [code, ORDER];
};

Blockly.Arduino.Magician_GetIOADC = function (block) {
  const address = block.getFieldValue('eio');
  const code = `Dobot_GetIOADC(${address})`;
  return [code, ORDER];
};
