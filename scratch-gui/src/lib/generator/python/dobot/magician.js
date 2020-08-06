/* eslint-disable max-len */
// import * as Blockly from 'scratch-blocks';

Blockly.Python.Magician_Home = function (block) {
  // TODO: Assemble JavaScript into code variable.
  const code = `${Blockly.Python.tab()}mg.SetHOMECmdEx(0, 1)\n`;
  return code;
};
Blockly.Python.Magician_SetEndFixture = function (block) {
  const type = block.getFieldValue('BTN');
  const code = `${Blockly.Python.tab()}mg.SetEndEffectorType(${type})\n`;
  return code;
};

Blockly.Python.Magician_SetPTPCommonParams = function (block) {
  const velocity = Blockly.Python.valueToCode(block, 'velocity', Blockly.Python.ORDER_ATOMIC) || 20;
  const acceleration = Blockly.Python.valueToCode(block, 'acceleration', Blockly.Python.ORDER_ATOMIC) || 50;
  // TODO: Assemble Python into code variable.
  const code = `${Blockly.Python.tab()}mg.SetPTPCommonParamsEx(api,${velocity},${acceleration},1)\n`;
  return code;
};
Blockly.Python.Magician_SetPTPJointParams = function (block) {
  const velocity = Blockly.Python.valueToCode(block, 'velocity', Blockly.Python.ORDER_ATOMIC) || 20;
  const acceleration = Blockly.Python.valueToCode(block, 'acceleration', Blockly.Python.ORDER_ATOMIC) || 50;
  // TODO: Assemble Python into code variable.
  const code = `${Blockly.Python.tab()}mg.SetPTPJointParamsEx(api,${velocity},${acceleration},1)\n`;
  return code;
};

Blockly.Python.Magician_SetPTPCoordinateParams = function(block) {
  const xyzVelocity = Blockly.Python.valueToCode(block, 'xyzVelocity', Blockly.Python.ORDER_ATOMIC) || 20;
  const xyzAcceleration = Blockly.Python.valueToCode(block, 'xyzAcceleration', Blockly.Python.ORDER_ATOMIC) || 50;
  const rVelocity = Blockly.Python.valueToCode(block, 'rVelocity', Blockly.Python.ORDER_ATOMIC) || 20;
  const rAccleration = Blockly.Python.valueToCode(block, 'rAccleration', Blockly.Python.ORDER_ATOMIC) || 50;
  // TODO: Assemble Python into code variable.
  const code = `${Blockly.Python.tab()}mg.SetPTPCoordinateParamsEx(api,${
    xyzVelocity},${xyzAcceleration},${
    rVelocity},${rAccleration},1)\n`;
  return code;
};
Blockly.Python.Magician_SetPTPLParams = function(block) {
  const velocity = Blockly.Python.valueToCode(block, 'velocity', Blockly.Python.ORDER_ATOMIC) || 20;
  const acceleration = Blockly.Python.valueToCode(block, 'acceleration', Blockly.Python.ORDER_ATOMIC) || 50;
  // TODO: Assemble Python into code variable.
  const code = `${Blockly.Python.tab()}mg.Magician_SetPTPLParams(api,${velocity},${acceleration},1)\n`;
  return code;
};

Blockly.Python.Magician_SetPTPJumpParams = function(block) {
  let height = Blockly.Python.valueToCode(block, 'jumpHeight', Blockly.Python.ORDER_ATOMIC) || 20;
  let zLimit = Blockly.Python.valueToCode(block, 'zLimit', Blockly.Python.ORDER_ATOMIC) || 200;

  height = (parseFloat(height) < 0) ? 0 : height;
  height = (parseFloat(height) > 225) ? 225 : height;
  zLimit = (parseFloat(zLimit) < 10) ? 10 : zLimit;
  zLimit = (parseFloat(zLimit) > 235) ? 235 : zLimit;

  // TODO: Assemble Python into code variable.
  const code = `${Blockly.Python.tab()}mg.SetPTPJumpParamsEx(api,${height},${zLimit},1)\n`;
  return code;
};

Blockly.Python.Magician_SetLostStepParams = function(block) {
  const threshold = Blockly.Python.valueToCode(block, 'threshold', Blockly.Python.ORDER_ATOMIC) || 0.5;
  // TODO: Assemble Python into code variable.
  const code = `${Blockly.Python.tab()}mg.SetLostStepParams(${threshold})\n`;
  return code;
};

Blockly.Python.Magician_SetLostStep = function(block) {
  const code = '${Blockly.Python.tab()}mg.SetLostStepCmdEx(1)\n';
  return code;
};

Blockly.Python.Magician_JumpTo = function(block) {
  const xbias = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC) || 208;
  const ybias = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const zbias = Blockly.Python.valueToCode(block, 'z', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const rbias = Blockly.Python.valueToCode(block, 'r', Blockly.Python.ORDER_ATOMIC) || 0.0;
  // TODO: Assemble Python into code variable.
  const code = `${Blockly.Python.tab()}mg.SetPTPCmdEx(0, ${xbias},  ${ybias},  ${zbias}, ${rbias}, 1)\n`;
  return code;
};
Blockly.Python.Magician_Goto = function(block) {
  const xbias = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC) || 208;
  const ybias = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const zbias = Blockly.Python.valueToCode(block, 'z', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const rbias = Blockly.Python.valueToCode(block, 'r', Blockly.Python.ORDER_ATOMIC) || 0.0;
  // type???????
  const code = `${Blockly.Python.tab()}mg.SetPTPCmdEx(2, ${xbias},  ${ybias},  ${zbias}, ${rbias}, 1)\n`;
  return code;
};

Blockly.Python.Magician_MoveDistance = function(block) {
  const xbias = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const ybias = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const zbias = Blockly.Python.valueToCode(block, 'z', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const rbias = Blockly.Python.valueToCode(block, 'r', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const code = `${Blockly.Python.tab()}mg.SetPTPCmdEx(7, ${xbias},  ${ybias},  ${zbias}, ${rbias}, 1)\n`;
  return code;
};

Blockly.Python.Magician_SetR = function(block) {
  const zbias = Blockly.Python.valueToCode(block, 'r', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const code = `current_pose = ${Blockly.Python.tab()}mg.GetPose(api)\nmb.SetPTPCmdEx(4, current_pose[4], current_pose[5], current_pose[6], ${zbias}, 1)\n`;
  return code;
};


Blockly.Python.Magician_ClearAllAlarmsState = function(block) {
  const code = `${Blockly.Python.tab()}mg.ClearAllAlarmsState()\n`;
  return code;
};

Blockly.Python.Magician_SetJointAngle = function(block) {
  const xbias = Blockly.Python.valueToCode(block, 'Joint1', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const ybias = Blockly.Python.valueToCode(block, 'Joint2', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const zbias = Blockly.Python.valueToCode(block, 'Joint3', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const rbias = Blockly.Python.valueToCode(block, 'Joint4', Blockly.Python.ORDER_ATOMIC) || 0.0;
  // TODO: Assemble Python into code variable.
  const code = `${Blockly.Python.tab()}mg.SetPTPCmdEx(4, ${xbias},  ${ybias},  ${zbias}, ${rbias}, 1)\n`;
  return code;
};

Blockly.Python.Magician_SetSuctionCup = function(block) {
  const statue = block.getFieldValue('status');
  // TODO: Assemble Python into code variable.
  const code = `${Blockly.Python.tab()}mg.SetEndEffectorSuctionCupEx(${statue}, 1)\n`;
  return code;
};

Blockly.Python.Magician_Gripper = function (block) {
  const statue = block.getFieldValue('status');
  // TODO: Assemble Python into code variable.
  const statues = [1, 1];
  if (statue === 'Release'){
    statues[1] = 0;

  } else if (statue === 'OFF') {
    statues[0] = 0;
    statues[1] = 0;
  }

  return `${Blockly.Python.tab()}mg.SetEndEffectorGripperEx(api,+${statues.join(',')})\n`;
};

Blockly.Python.Magician_SetMotorSpeed = function(block) {
  const io = block.getFieldValue('Motor');
  const speed = Blockly.Python.valueToCode(block, 'Speed', Blockly.Python.ORDER_ATOMIC) || 10000;
  const isEnable = speed === 0 ? 0 : 1;
  const code = `${Blockly.Python.tab()}mg.SetEMotorEx(${io}, ${isEnable}, ${speed}, 1)\n`;
  return code;
};

Blockly.Python.Magician_SetMotorSpeedAndDistance = function(block) {
  const io = block.getFieldValue('Motor');
  const speed = Blockly.Python.valueToCode(block, 'Speed', Blockly.Python.ORDER_ATOMIC) || 10000;
  const distance = Blockly.Python.valueToCode(block, 'Distance', Blockly.Python.ORDER_ATOMIC) || 10000;
  const isEnable = (speed !== 0 && distance > 0) ? 1 : 0;
  const code = `${Blockly.Python.tab()}mg.SetEMotorSEx(${io}, ${isEnable}, ${speed}, ${distance}, 1)\n`;
  return code;
};

Blockly.Python.Magician_SetConveyor = function(block) {
  const io = block.getFieldValue('Motor');
  const speed = Blockly.Python.valueToCode(block, 'Speed', Blockly.Python.ORDER_ATOMIC) || 50.0;
  const isEnable = speed === 0 ? 0 : 1;
  // TODO: Assemble Python into code variable.
 
  const code = `${Blockly.Python.tab()}STEP_PER_CRICLE = 360.0 / 1.8 * 10.0 * 16.0\nMM_PER_CRICLE = 3.1415926535898 * 36.0\nvel = float(${speed}) * STEP_PER_CRICLE / MM_PER_CRICLE\nmb.SetEMotorEx(${io}, ${isEnable}, int(vel), 1)\n`;
  return code;
};

Blockly.Python.Magician_GetCurrentCoordinate = function(block) {
  const value = block.getFieldValue('coordinate');
  // TODO: Assemble Python into code variable.
  const code = `mg.GetPoseEx(${value - 1})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.Magician_GetJointAngle = function(block) {
  const value = block.getFieldValue('joint');
  // TODO: Assemble Python into code variable.
  const index = Number(value) + 3;
  const code = `mg.GetPoseEx(${index})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.Magician_SetIOMultiplexing = function(block) {
  const io = block.getFieldValue('eio');
  let value = block.getFieldValue('mode');
  switch (value){
  case '1':
    value = '3';
    break;
  case '3':
    value = '4';
    break;
  case '4':
  case '5':
  case '6':
    value = '1';
    break;
  case '7':
    value = '2';
    break;
  }
  const code = `${Blockly.Python.tab()}mg.SetIOMultiplexingEx(${io}, ${value}, 1)\n`;
  return code;
};

Blockly.Python.Magician_SetPWMOutput = function(block) {
  const io = block.getFieldValue('eio');
  const frequency = Blockly.Python.valueToCode(block, 'frequency', Blockly.Python.ORDER_ATOMIC) || 0;
  const dutyCycle = Blockly.Python.valueToCode(block, 'dutyCycle', Blockly.Python.ORDER_ATOMIC) || 0;
  const code = `${Blockly.Python.tab()}mg.SetIODOEx(${io}, ${frequency}, ${dutyCycle})\n`;
  return code;
};

Blockly.Python.Magician_SetLeaveIOutput = function(block) {
  const io = block.getFieldValue('eio');
  const value = block.getFieldValue('IsEnable');
  const code = `${Blockly.Python.tab()}mg.SetIODOEx(${io}, ${value}, 1)\n`;
  return code;
};

Blockly.Python.Magician_GetIODI = function(block) {
  const name = block.getFieldValue('eio');
  const code = `mg.GetIODI(${name})[0]`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.Magician_GetIOADC = function(block) {
  const name = block.getFieldValue('eio');
  const code = `mg.GetIOADC(${name})[0]`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
