/* eslint-disable max-len */
import { store } from '../../../app-state-hoc';

const getDeviceName = () => {
  const { vm } = store.getState().scratchGui;
  return vm.runtime._editingTarget.deviceName;
};

Blockly.Python.PhotoelectricSensor_SetInfraredSensor = function (block) {
  const IsEnable = block.getFieldValue('IsEnable');
  const Version = block.getFieldValue('Version');
  const port = block.getFieldValue('port');
  const deviceName = getDeviceName() === 'magician' ? 'mg' : 'mb';
  const code = `${Blockly.Python.tab()}${deviceName}.SetInfraredSensor(${IsEnable}, ${port}, ${Version})\n`;
  return code;
};

Blockly.Python.PhotoelectricSensor_GetInfraredSensor = function (block) {
  const port = block.getFieldValue('port');
  const deviceName = getDeviceName() === 'magician' ? 'mg' : 'mb';
  const code = `${deviceName}.GetInfraredSensor(${port})`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.PhotoelectricSensor_SetColorSensor = function (block) {
  const IsEnable = block.getFieldValue('IsEnable');
  const Version = block.getFieldValue('Version');
  const port = block.getFieldValue('port');
  const deviceName = getDeviceName() === 'magician' ? 'mg' : 'mb';
  const code = `${Blockly.Python.tab()}${deviceName}.SetColorSensor(${IsEnable}, ${port}, ${Version})\n`;
  return code;
};

Blockly.Python.PhotoelectricSensor_GetColorSensor = function (block) {
  const color = block.getFieldValue('color');
  const deviceName = getDeviceName() === 'magician' ? 'mg' : 'mb';
  const code = `${deviceName}.GetColorSensor(${color - 1})`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.PhotoelectricSensor_SetSeeedLightSensor = function (block) {
  const port = block.getFieldValue('port');
  const code = `${Blockly.Python.tab()}mb.SetSeeedLightSensor(${port})\n`;
  return code;
};

Blockly.Python.PhotoelectricSensor_GetSeeedLightSensor = function (block) {
  const port = block.getFieldValue('port');
  const code = `${Blockly.Python.tab()}mb.GetSeeedLightSensor(${port})`;
  return [code, Blockly.Python.ORDER_NONE];
};
