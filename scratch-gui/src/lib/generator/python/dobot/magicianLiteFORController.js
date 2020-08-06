/* eslint-disable max-len */

Blockly.Python.MagicianLiteFORController_Magician_Lite_Home = function (block) {
  const code = `${Blockly.Python.tab()}mgl.SetHOMECmd(0, 1, 1)\n`;
  return code;
};
Blockly.Python.MagicianLiteFORController_Magician_Lite_SetEndFixture = function (block) {
  const type = Blockly.Python.getExtensionDropdown(block, 'end_fixture');
  const code = `${Blockly.Python.tab()}mgl.SetEndEffectorType(${type}, 1, 1)\n`;
  return code;
};

Blockly.Python.MagicianLiteFORController_Magician_Lite_SetPTPCommonParams = function (block) {
  const velocity = Blockly.Python.valueToCode(block, 'percent', Blockly.Python.ORDER_ATOMIC) || 20;
  // TODO: Assemble Python into code variable.
  const code = `${Blockly.Python.tab()}mgl.SetArmSpeedRatioEx(api,${velocity})\n`;
  return code;
};

Blockly.Python.MagicianLiteFORController_Magician_Lite_SetPTPJumpParams = function(block) {
  let height = Blockly.Python.valueToCode(block, 'jumpHeight', Blockly.Python.ORDER_ATOMIC) || 20;
  let zLimit = Blockly.Python.valueToCode(block, 'zLimit', Blockly.Python.ORDER_ATOMIC) || 100;
  height = (parseFloat(height) < 0) ? 0 : height;
  height = (parseFloat(height) > 225) ? 225 : height;
  zLimit = (parseFloat(zLimit) < 10) ? 10 : zLimit;
  zLimit = (parseFloat(zLimit) > 235) ? 235 : zLimit;
  // TODO: Assemble Python into code variable.
  const code = `${Blockly.Python.tab()}mgl.SetPTPJumpParams(${height}, ${zLimit}1)\n`;
  return code;
};
// 设置丢步阈值
Blockly.Python.MagicianLiteFORController_Magician_Lite_SetLostStepParams = function(block) {
  const threshold = Blockly.Python.valueToCode(block, 'threshold', Blockly.Python.ORDER_ATOMIC) || 0.5;
  // TODO: Assemble Python into code variable.
  const code = `${Blockly.Python.tab()}mgl.SetLostStepValue(${threshold})\n`;
  return code;
};
// 执行检测丢步
Blockly.Python.MagicianLiteFORController_Magician_Lite_SetLostStep = function(block) {
  const code = '${Blockly.Python.tab()}mgl.SetLostStepCmdEx(1)\n';
  return code;
};

// 清除报警
Blockly.Python.MagicianLiteFORController_Magician_Lite_ClearAllAlarmsState = function(block) {
  const code = `${Blockly.Python.tab()}mgl.ClearAllAlarmsState()\n`;
  return code;
};

Blockly.Python.MagicianLiteFORController_Magician_Lite_SetPTPCmd_Jump = function(block) {
  const xbias = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC) || 208;
  const ybias = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const zbias = Blockly.Python.valueToCode(block, 'z', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const rbias = Blockly.Python.valueToCode(block, 'r', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const code = `${Blockly.Python.tab()}mgl.SetPTPCmd(0, ${xbias},  ${ybias},  ${zbias}, ${rbias}, 1, 1)\n`;
  return code;
};
Blockly.Python.MagicianLiteFORController_Magician_Lite_SetPTPCmd_Goto = function(block) {
  const ptpMode = Blockly.Python.getExtensionDropdown(block, 'move_type');
  const xbias = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC) || 208;
  const ybias = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const zbias = Blockly.Python.valueToCode(block, 'z', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const rbias = Blockly.Python.valueToCode(block, 'r', Blockly.Python.ORDER_ATOMIC) || 0.0;
  
  const code = `${Blockly.Python.tab()}mgl.SetPTPCmd(${ptpMode}, ${xbias},  ${ybias},  ${zbias}, ${rbias}, 1, 1)\n`;
  return code;
};

Blockly.Python.MagicianLiteFORController_Magician_Lite_SetPTPCmd_Realative = function(block) {
  const xbias = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const ybias = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const zbias = Blockly.Python.valueToCode(block, 'z', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const rbias = Blockly.Python.valueToCode(block, 'r', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const code = `${Blockly.Python.tab()}mgl.SetPTPCmd(7, ${xbias},  ${ybias},  ${zbias}, ${rbias}, 1, 1)\n`;
  return code;
};

Blockly.Python.MagicianLiteFORController_Magician_Lite_SetR = function(block) {
  const rbias = Blockly.Python.valueToCode(block, 'r', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const code = `${Blockly.Python.tab()}current_pose = ${Blockly.Python.tab()}mgl.GetPose(0)\n${Blockly.Python.tab()}mgl.SetPTPCmd(4, current_pose[4], current_pose[5], current_pose[6], ${rbias}, 1, 1)\n`;
  return code;
};

Blockly.Python.MagicianLiteFORController_Magician_Lite_SetPTPCmd_Move_Joints = function(block) {
  const xbias = Blockly.Python.valueToCode(block, 'Joint1', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const ybias = Blockly.Python.valueToCode(block, 'Joint2', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const zbias = Blockly.Python.valueToCode(block, 'Joint3', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const rbias = Blockly.Python.valueToCode(block, 'Joint4', Blockly.Python.ORDER_ATOMIC) || 0.0;
  const code = `${Blockly.Python.tab()}mgl.SetPTPCmd(4, ${xbias},  ${ybias},  ${zbias}, ${rbias}, 1, 1)\n`;
  return code;
};

Blockly.Python.MagicianLiteFORController_Magician_Lite_SetEndEffectorSuctionCup = function(block) {
  const statues = Blockly.Python.getExtensionDropdown(block, 'suctioncup_state');
  const code = `${Blockly.Python.tab()}mgl.SetEndEffectorSuctionCup(${statues}, 1, 1)\n`;
  return code;
};

Blockly.Python.MagicianLiteFORController_Magician_Lite_SetEndEffectorGripper = function (block) {
  const statue = Blockly.Python.getExtensionDropdown(block, 'gripper_state');
  const statues = [1, 1];
  if (statue === 'Release'){
    statues[1] = 0;

  } else if (statue === 'OFF') {
    statues[0] = 0;
    statues[1] = 0;
  }
  return `${Blockly.Python.tab()}mgl.SetEndEffectorGripper(0, ${statues.join(',')}, 1, 1)\n`;
};


Blockly.Python.MagicianLiteFORController_Magician_Lite_GetPose_Coordinate = function(block) {
  const value = Blockly.Python.getExtensionDropdown(block, 'coordinate');
  const code = `mgl.GetPose(0)[${value - 1}]`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.MagicianLiteFORController_Magician_Lite_GetPose_Joint = function(block) {
  const value = Blockly.Python.getExtensionDropdown(block, 'joint');
  const index = Number(value) + 3;
  const code = `mgl.GetPose(0)[${index}]`;
  return [code, Blockly.Python.ORDER_NONE];
};
