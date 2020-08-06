/* eslint-disable max-len */
// import * as Blockly from 'scratch-blocks';
// 输出模拟信号管脚 %1 数值 %2
// Blockly.Python.Controller_Analog_output = block => {
//   const io = block.getFieldValue('eio');
//   const value = block.getFieldValue('value');
//   const code = `mb.SetIODOExt( ${io}, ${value}, 1)\n`;
//   return code;
// };
// 输出数字信号管脚 %1 电平 %2
Blockly.Python.Controller_Digital_output = block => {
  const io = block.getFieldValue('eio');
  const isEnable = block.getFieldValue('level') === 0 ? 0 : 1;
  // TODO: Assemble Python into code variable.
  const code = `${Blockly.Python.tab()}mb.SetIODOExt(${io}, ${isEnable}, 1)\n`;
  return code;
};
// 设置管脚 %1 模式 %2
Blockly.Python.Controller_Set_Pin = block => {
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
  const code = `${Blockly.Python.tab()}mb.SetIOMultiplexingExt(${io}, ${value}, 1)\n`;
  return code;
};
// 设置PWM信号输出管脚 %1 频率 %2 占空比 %3 %
Blockly.Python.Controller_SetIOPWM = block => {
  const io = block.getFieldValue('eio');
  const frequency = Blockly.Python.valueToCode(block, 'frequency', Blockly.Python.ORDER_ATOMIC) || 1;
  const dutyCycle = Blockly.Python.valueToCode(block, 'dutyCycle', Blockly.Python.ORDER_ATOMIC) || 40;
  const code = `${Blockly.Python.tab()}mb.SetIOPWMExt(${io}, ${frequency}, ${dutyCycle}, 1)\n`;
  return code;
};
// 读取数字信号 管脚 %1
Blockly.Python.Controller_digital_read = block => {
  const name = block.getFieldValue('PINNUM');
  const code = `mb.GetIODIExt(${name})`;
  return [code, Blockly.Python.ORDER_NONE];
};
// 读取数字信号 管脚 %1
Blockly.Python.Controller_digital_read_bool = block => {
  const name = block.getFieldValue('PINNUM');
  const code = `mb.GetIODI(${name})`;
  return [code, Blockly.Python.ORDER_NONE];
};
// 读取模拟信号 管脚A %1
Blockly.Python.Controller_analog_read = block => {
  const name = block.getFieldValue('eio');
  const code = `mb.GetIOADCExt(${name})`;

  return [code, Blockly.Python.ORDER_NONE];
};
// 设置步进电机 %1 速度 %2 脉冲/秒
Blockly.Python.Controller_SetStepperMotor = block => {
  const io = block.getFieldValue('index');
  const speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC) || 10000;
  const isEnable = speed !== 0;
  const code = `${Blockly.Python.tab()}mb.SetEMotorEx([${io}, ${isEnable}], ${speed}, 1)\n`;
  return code;
};
// 设置步进电机 %1 速度 %2 脉冲/秒，脉冲数 %3
Blockly.Python.Controller_SetStepperMotorNum = block => {
  const io = block.getFieldValue('index');
  const speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC) || 10000;
  const distance = Blockly.Python.valueToCode(block, 'num', Blockly.Python.ORDER_ATOMIC) || 10000;
  const isEnable = speed !== 0 && distance > 0;
  const code = `${Blockly.Python.tab()}mb.SetEMotorSEx([${io}, ${isEnable}], [${speed}, ${distance}], 1)\n`;
  return code;
};
// 设置传送带电机 %1 速度 %2 mm/s
Blockly.Python.Controller_SetConveyor = block => {
  const io = block.getFieldValue('index');
  const speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC) || 50.0;
  const isEnable = speed !== 0;
  const code = `${Blockly.Python.tab()}STEP_PER_CRICLE = 360.0 / 1.8 * 10.0 * 16.0\nMM_PER_CRICLE = 3.1415926535898 * 36.0\nvel = float(${speed}) * STEP_PER_CRICLE / MM_PER_CRICLE\nmb.SetEMotorEx([${io}, ${isEnable}], int(vel), 1)\n`;
  return code;
};

Blockly.Python.Controller_SmartBotXbeeRead = block => {
  const code = `Controller_SmartBotXbeeRead\n`;
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python.Controller_SmartBotXbeeWrite = block => {
  const code = `${Blockly.Python.tab()}Controller_SmartBotXbeeWrite\n`;
  return code;
};
Blockly.Python.Controller_SmartBotXbeeCompare = block => {
  const code = `Controller_SmartBotXbeeCompare\n`;
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python.Controller_SmartBotXbeeClear = block => {
  const code = `${Blockly.Python.tab()}Controller_SmartBotXbeeClear\n`;
  return code;
};

Blockly.Python.BlueTooth_setBlueTooth = block => {
  const name = Blockly.Python.valueToCode(block, 'name', Blockly.Python.ORDER_ATOMIC) || '000001';
  const id = Blockly.Python.valueToCode(block, 'id', Blockly.Python.ORDER_ATOMIC) || 1;
  const code = `${Blockly.Python.tab()}mb.SetBleMesh(${name},${id})\n`;
  return code;
};
Blockly.Python.BlueTooth_getBlueToothMesagges = block => {
  const id = Blockly.Python.valueToCode(block, 'id', Blockly.Python.ORDER_ATOMIC) || 1;
  const code = `mb.ReadBleMeshData(${id})\n`;
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python.BlueTooth_setBlueToothMesagges = block => {
  const id = Blockly.Python.valueToCode(block, 'id', Blockly.Python.ORDER_ATOMIC) || 1;
  const msg = Blockly.Python.valueToCode(block, 'msg', Blockly.Python.ORDER_ATOMIC) || '';
  const code = `${Blockly.Python.tab()}mb.WriteBleMeshData(${msg},${id})\n`;
  return code;
};
Blockly.Python.BlueTooth_isGetBlueToothMesagges = block => {
  const id = Blockly.Python.valueToCode(block, 'id', Blockly.Python.ORDER_ATOMIC) || 1;
  const msg = Blockly.Python.valueToCode(block, 'msg', Blockly.Python.ORDER_ATOMIC) || '';
  const code = `mb.IsReviceStr(${id},${msg})\n`;
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python.BlueTooth_start = block => {
  const code = `#BlueTooth_start\n`;
  return code;
};
