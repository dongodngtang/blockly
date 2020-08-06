// import * as Blockly from 'scratch-blocks';

Blockly.Python.Str2Code = function (str) {

  if (str === '') {
    return '';
  }
  const hexCharCode = [];
  hexCharCode.push('0x');
  for (let i = 0; i < str.length; i++) {
    hexCharCode.push(`${(str.charCodeAt(i)).toString(16)}_`);
  }
  return hexCharCode.join('');
};

Blockly.Python.procedures_call = function (block) {
  let funcName = block.inputList[0].fieldRow[0].text_;
  funcName = Blockly.Python.Str2Code(funcName);
  let args = null;
  for (let i = 0; i < block.argumentIds_.length; ++i) {
    const argName = block.argumentIds_[i];
    const value = Blockly.Python.valueToCode(block, argName, Blockly.Python.ORDER_NONE) || 'null';
    args = args ? `${args}, ${value}` : `${value}`;
  }
  const code = `${funcName}(${args})${Blockly.Python.END}`;
  return code;
};

Blockly.Python.argument_reporter_boolean = function (block) {
  const arg1 = block.getFieldValue('VALUE');
  const code = arg1;
  return [Blockly.Python.Str2Code(code), Blockly.Python.ORDER_NONE];
};
Blockly.Python.argument_reporter_string_number = function (block) {
  const arg1 = block.getFieldValue('VALUE');
  const code = arg1;
  return [Blockly.Python.Str2Code(code), Blockly.Python.ORDER_NONE];
};


Blockly.Python.procedures_definition = function (block) {
  let args = null;
  const customBlock = block.getInputTargetBlock('custom_block');
  const childBlocks = customBlock.getChildren();
  for (let i = 0; i < childBlocks.length; ++i) {
    const childBlock = childBlocks[i];
    const code = Blockly.Python[childBlock.type].call(childBlock, childBlock)[0];
    switch (childBlock.type) {
    case 'argument_reporter_boolean':
      args = args ? `${args}, bool ${code}` : `bool ${code}`;
      break;
    case 'argument_reporter_string_number':
      args = args ? `${args}, float ${code}` : `float ${code}`;
      break;
    }
  }

  let funcName = customBlock.inputList[0].fieldRow[0].text_;
  funcName = Blockly.Python.Str2Code(funcName);

  let code = `float ${funcName}(${args})\n{\n`;
  code = Blockly.Python.scrub_(block, code);
  code = `${code}}${Blockly.Python.END}`;
  Blockly.Python.definitions_[`%${funcName}`] = code;
};
