// import * as Blockly from 'scratch-blocks';

Blockly.Python.lists_create_with_text = function (block) {
  const order = Blockly.Python.ORDER_NONE;
  const dropdownType = block.getFieldValue('TYPE');
  const varName = Blockly.Python.valueToCode(block, 'VAR', order);
  const size = Blockly.Python.valueToCode(block, 'SIZE', order);
  const text = Blockly.Python.valueToCode(block, 'TEXT', order);
  Blockly.Python.definitions_[`var_lists${varName}`] = `${dropdownType} ${varName}[${size}]={${text}};\n`;
  return '';
};

Blockly.Python.lists_getIndex = function (block) {
  // Indexing into a list is the same as indexing into a string.
  const order = Blockly.Python.ORDER_NONE;
  const varName = Blockly.Python.valueToCode(block, 'VAR', order);
  const argument0 = Blockly.Python.valueToCode(block, 'AT', order);
  const code = `${varName}[(int)(${argument0})]`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.lists_setIndex = function (block) {
  // Set element at index.
  const order = Blockly.Python.ORDER_NONE;
  const varName = Blockly.Python.valueToCode(block, 'VAR', order);
  const argument0 = Blockly.Python.valueToCode(block, 'AT', order);
  const argument2 = Blockly.Python.valueToCode(block, 'TO', order);
  return `${Blockly.Python.tab() + varName}[(int)(${argument0})] = ${argument2}${Blockly.Python.END}`;
};

Blockly.Python.lists_length = function (block) {
  const order = Blockly.Python.ORDER_NONE;
  const varName = Blockly.Python.valueToCode(block, 'VAR', order);
  const code = `sizeof(${varName})/sizeof(${varName}[0])`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};
