/* eslint-disable max-len */
import { store } from '../../../app-state-hoc';
const getDeviceName = () => {
  const { vm } = store.getState().scratchGui;
  return vm.runtime._editingTarget.deviceName;
};


Blockly.Python.SlidingRail_SetLinearRail = function (block) {
  const IsEnable = block.getFieldValue('IsEnable');
  const Version = block.getFieldValue('version');
  const code = `${Blockly.Python.tab()}mg.SetDeviceWithL(${IsEnable}, ${Version})\n`;
  return code;
};
// magicBox 没有选择版本功能
Blockly.Python.SlidingRail_MagicBox_SetLinearRail = function (block) {
  const IsEnable = block.getFieldValue('IsEnable');
  const code = `${Blockly.Python.tab()}mb.SetDeviceWithL(${IsEnable}, 1)\n`;
  return code;
};
Blockly.Python.SlidingRail_SetPTPLParams = function (block) {
  const velocity = Blockly.Python.valueToCode(block, 'velocity', Blockly.Python.ORDER_ATOMIC) || 20;
  const deviceName = getDeviceName() === 'magician' ? 'mg' : 'mb';
  const code = `${Blockly.Python.tab()}${deviceName}.SetLSpeedRatio(1, ${velocity}, 0)\n`;
  return code;
};
Blockly.Python.SlidingRail_SetJOGLParams = function (block) {
  const velocity = Blockly.Python.valueToCode(block, 'velocity', Blockly.Python.ORDER_ATOMIC) || 20;
  const deviceName = getDeviceName() === 'magician' ? 'mg' : 'mb';
  const code = `${Blockly.Python.tab()}${deviceName}.SetLSpeedRatio(0, ${velocity}, 0)\n`;
  return code;
};
Blockly.Python.SlidingRail_MoveLinearRailTo = function (block) {
  const value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC) || 20;
  const { x, y, z, r } = store.getState().scratchGui.connectionModal.poseData;
  const deviceName = getDeviceName() === 'magician' ? 'mg' : 'mb';
  const code = `${Blockly.Python.tab()}${deviceName}.SetPTPWithLCmd(1, ${x}, ${y}, ${z}, ${r}, ${value}, 0)\n`;
  return code;
};
