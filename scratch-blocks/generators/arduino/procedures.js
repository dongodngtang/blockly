'use strict';

goog.provide('Blockly.Arduino.procedures');

goog.require('Blockly.Arduino');

Blockly.Arduino.Str2Code = function (str) {

  if (str === "")
  {return "";}
  var hexCharCode = [];
  hexCharCode.push("0x");
  for (var i = 0; i < str.length; i++) {
    hexCharCode.push((str.charCodeAt(i)).toString(16) + "_");
  }
  return hexCharCode.join("");
};

Blockly.Arduino['procedures_call'] = function (block) {
  let funcName = block.inputList[0].fieldRow[0].text_;
  funcName = Blockly.Arduino.Str2Code(funcName);
  let args = null;
  for (let i = 0; i < block.argumentIds_.length; ++i) {
    let argName = block.argumentIds_[i];
    let value = Blockly.Arduino.valueToCode(block, argName, Blockly.Arduino.ORDER_NONE) || 'null';
    args = args ? `${args}, ${value}` : `${value}`;
  }
  let code = `    ${funcName}(${args})${Blockly.Arduino.END}`;
  return code;
};

Blockly.Arduino['argument_reporter_boolean'] = function (block) {
  var arg1 = block.getFieldValue("VALUE");
  var code = arg1;
  return [Blockly.Arduino.Str2Code(code), Blockly.Arduino.ORDER_NONE];
};
Blockly.Arduino['argument_reporter_string_number'] = function (block) {
  var arg1 = block.getFieldValue("VALUE");
  var code = arg1;
  return [Blockly.Arduino.Str2Code(code), Blockly.Arduino.ORDER_NONE];
};


Blockly.Arduino['procedures_definition'] = function (block) {
  let args = null;
  let customBlock = block.getInputTargetBlock("custom_block");
  let childBlocks = customBlock.getChildren();
  for (let i = 0; i < childBlocks.length; ++i) {
    let childBlock = childBlocks[i];
    let code = Blockly.Arduino[childBlock.type].call(childBlock, childBlock)[0];
    switch (childBlock.type) {
      case "argument_reporter_boolean":
        args = args ? `${args}, bool ${code}` : `bool ${code}`;
        break;
      case "argument_reporter_string_number":
        args = args ? `${args}, float ${code}` : `float ${code}`;
        break;
    }
  }

  let funcName = customBlock.inputList[0].fieldRow[0].text_;
  funcName = Blockly.Arduino.Str2Code(funcName);

  let code = `float ${funcName}(${args})\n{\n`;
  code = Blockly.Arduino.scrub_(block, code);
  code = `${code}}${Blockly.Arduino.END}`;
  Blockly.Arduino.definitions_[`%${funcName}`] = code;
};
