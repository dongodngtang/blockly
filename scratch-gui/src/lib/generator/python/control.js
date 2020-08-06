// import * as Blockly from 'scratch-blocks';

Blockly.Python.control_wait = function (block) {
  const order = Blockly.Python.ORDER_HIGH;
  const arg0 = Blockly.Python.valueToCode(block, 'DURATION', order);
  Blockly.Python.definitions_.time = 'import time';
  const code = `${Blockly.Python.tab()}time.sleep(${arg0})${Blockly.Python.END}`;
  return code;
};

Blockly.Python.control_repeat = function (block) {
  const order = Blockly.Python.ORDER_HIGH;
  const repeats = Blockly.Python.valueToCode(block, 'TIMES', order);
  let branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Python.addLoopTrap(branch, block.id);

  let code = `${Blockly.Python.tab()}for i in range(${repeats}):\n`;
  Blockly.Python.tabPos++;
  code += branch;
  Blockly.Python.tabPos--;
  code += `${Blockly.Python.tab()}\n`;
  return code;
};

Blockly.Python.control_forever = function (block) {
  // if first forever, treat it as loop
  let code;
  let branch;
  code = `${Blockly.Python.tab()}while(True):\n`;
  branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Python.addLoopTrap(branch, block.id);
  code += branch;
  code += `${Blockly.Python.tab()}\n`;
  return code;
};
Blockly.Python.control_if = function (block) {
  // If/elseif/else condition.
  const argument = Blockly.Python.valueToCode(block, 'CONDITION',
    Blockly.Python.ORDER_NONE) || 'False';
  const branch = Blockly.Python.statementToCode(block, 'SUBSTACK') ||
      Blockly.Python.tab() + Blockly.Python.PASS;
  const code = `${Blockly.Python.tab()}if ${argument}:\n${branch}`;
  return code;
};
Blockly.Python.control_if_else = function (block) {
  // If/elseif/else condition.
  const argument = Blockly.Python.valueToCode(block, 'CONDITION',
    Blockly.Python.ORDER_NONE) || 'False';
  let branch = Blockly.Python.statementToCode(block, 'SUBSTACK') ||
      Blockly.Python.tab() + Blockly.Python.PASS;
  let code = `${Blockly.Python.tab()}if ${argument}:\n${branch}`;
  branch = Blockly.Python.statementToCode(block, 'SUBSTACK2') ||
      Blockly.Python.tab() + Blockly.Python.PASS;
  code += `${Blockly.Python.tab()}else:\n${branch}`;
  return code;
};

Blockly.Python.control_wait_until = function (block) {
  const order = Blockly.Python.ORDER_HIGH;
  const repeats = Blockly.Python.valueToCode(block, 'CONDITION', order);
  let branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Python.addLoopTrap(branch, block.id);

  let code = `${Blockly.Python.tab()}while(not(${repeats})):
  ${Blockly.Python.tab()}print('')\n`;
  Blockly.Python.tabPos++;
  code += branch;
  Blockly.Python.tabPos--;
  code += `${Blockly.Python.tab()}\n`;
  return code;
};

Blockly.Python.control_repeat_until = function (block) {
  const argument = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_NONE) || 'false';

  let branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Python.addLoopTrap(branch, block.id);

  let code = `${Blockly.Python.tab()}while((not ${argument})):\n`;
  Blockly.Python.tabPos++;
  code += branch;
  Blockly.Python.tabPos--;
  code += `${Blockly.Python.tab()}\n`;
  return code;
};
Blockly.Python.control_stop = function (block) {
  const code = `${Blockly.Python.tab()}break\n`;
  return code;
};
