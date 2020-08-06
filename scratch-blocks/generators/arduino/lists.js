'use strict';

goog.provide('Blockly.Arduino.lists');

goog.require('Blockly.Arduino');


// Blockly.Arduino.lists_create_with = function () {
//   // Create a list with any number of elements of any type.
//   var dropdown_type = this.getFieldValue('TYPE');
//   var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
//     Blockly.Variables.NAME_TYPE);
//   var size = window.parseFloat(this.getFieldValue('SIZE'));
//   var code = new Array(this.itemCount_);
//   for (var n = 0; n < this.itemCount_; n++) {
//     code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
//       Blockly.Arduino.ORDER_NONE) || '0';
//   }
//   Blockly.Arduino.definitions_['var_lists' + varName] = dropdown_type + ' ' + varName + '[' + size + ']' + '=' + '{' + code.join(', ') + '};\n';
//   //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
//   //Blockly.Arduino.setups_['setup_lists'+varName] = code;
//   return '';
// };

// Blockly.Arduino.lists_create_with2 = function () {
//   // Create a list with any number of elements of any type.
//   var dropdown_type = this.getFieldValue('TYPE');
//   var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
//     Blockly.Variables.NAME_TYPE);
//   //var size=window.parseFloat(this.getFieldValue('SIZE'));
//   var code = new Array(this.itemCount_);
//   for (var n = 0; n < this.itemCount_; n++) {
//     code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
//       Blockly.Arduino.ORDER_NONE) || '0';
//   }
//   Blockly.Arduino.definitions_['var_lists' + varName] = dropdown_type + ' ' + varName + '[]' + '=' + '{' + code.join(', ') + '};\n';
//   //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
//   //Blockly.Arduino.setups_['setup_lists'+varName] = code;
//   return '';
// };

// Blockly.Arduino.lists_create_with_text2 = function () {
//   var dropdown_type = this.getFieldValue('TYPE');
//   var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
//     Blockly.Variables.NAME_TYPE);
//   //var size=window.parseFloat(this.getFieldValue('SIZE'));
//   var text = this.getFieldValue('TEXT');
//   Blockly.Arduino.definitions_['var_lists' + varName] = dropdown_type + ' ' + varName + '[]' + '=' + '{' + text + '};\n';
//   return '';
// };

Blockly.Arduino['lists_create_with_text'] = function (block) {
  var order = Blockly.Arduino.ORDER_NONE;
  var dropdown_type = block.getFieldValue('TYPE');
  var varName = Blockly.Arduino.valueToCode(block, 'VAR', order);
  var size = Blockly.Arduino.valueToCode(block, 'SIZE', order);
  var text = Blockly.Arduino.valueToCode(block, 'TEXT', order);
  Blockly.Arduino.definitions_['var_lists' + varName] = dropdown_type + ' ' + varName + '[' + size + ']' + '=' + '{' + text + '};\n';
  return '';
};

Blockly.Arduino['lists_getIndex'] = function (block) {
  // Indexing into a list is the same as indexing into a string.
  var order = Blockly.Arduino.ORDER_NONE;
  var varName = Blockly.Arduino.valueToCode(block, 'VAR', order);
  var argument0 = Blockly.Arduino.valueToCode(block, 'AT', order);
  var code = varName + '[(int)(' + argument0 + ')]';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['lists_setIndex'] = function (block) {
  // Set element at index.
  var order = Blockly.Arduino.ORDER_NONE;
  var varName = Blockly.Arduino.valueToCode(block, 'VAR', order);
  var argument0 = Blockly.Arduino.valueToCode(block, 'AT', order);
  var argument2 = Blockly.Arduino.valueToCode(block, 'TO', order);
  return Blockly.Arduino.tab() + varName + '[(int)(' + argument0 + ')] = ' + argument2 + Blockly.Arduino.END;
};

Blockly.Arduino['lists_length'] = function (block) {
  var order = Blockly.Arduino.ORDER_NONE;
  var varName = Blockly.Arduino.valueToCode(block, 'VAR', order);
  var code = 'sizeof(' + varName + ')/sizeof(' + varName + '[0])';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
