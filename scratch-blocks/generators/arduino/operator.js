/**
 * Created by Riven on 7/14/2016.
 */

'use strict';

goog.provide('Blockly.Arduino.operator');

goog.require('Blockly.Arduino');

Blockly.Arduino['math_number'] = function (block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['text'] = function (block) {
  // Text value.
  var code = Blockly.Arduino.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['operator_random'] = function (block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'FROM', Blockly.Arduino.ORDER_HIGH) || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'TO', Blockly.Arduino.ORDER_HIGH) || '0';
  var code = "random(" + arg0 + "," + arg1 + ")";
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino['operator_compare'] = function (block) {
  var oplist = {
    "operator_gt": ">",
    "operator_equals": "==",
    "operator_lt": "<"
  };
  var arg0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', Blockly.Arduino.ORDER_HIGH) || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', Blockly.Arduino.ORDER_HIGH) || '0';
  var op = oplist[block.type];
  var code = arg0 + op + arg1;
  return [code, Blockly.Arduino.ORDER_RELATIONAL];
};

Blockly.Arduino['operator_arithmetic'] = function (block) {
  var oplist = {
    "operator_add": "+",
    "operator_subtract": "-",
    "operator_multiply": "*",
    "operator_divide": "/"
  };
  // Numeric value.
  var argument0 = Blockly.Arduino.valueToCode(block, 'NUM1', Blockly.Arduino.ORDER_HIGH) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'NUM2', Blockly.Arduino.ORDER_HIGH) || '0';
  var order = Blockly.Arduino.ORDER_ADDITIVE;
  if (block.type == "operator_multiply" || block.type == "operator_divide") {
    order -= 1;
  }
  var op = oplist[block.type];
  var code = argument0 + op + argument1;
  return [code, order];
};

Blockly.Arduino['operator_and'] = function (block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', Blockly.Arduino.ORDER_HIGH) || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', Blockly.Arduino.ORDER_HIGH) || '0';
  var code = "(" + arg0 + "&&" + arg1 + ")";
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino['operator_or'] = function (block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', Blockly.Arduino.ORDER_HIGH) || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', Blockly.Arduino.ORDER_HIGH) || '0';
  var code = "(" + arg0 + "||" + arg1 + ")";
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino['operator_not'] = function (block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'OPERAND', Blockly.Arduino.ORDER_HIGH) || '0';
  var code = "(!" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino['operator_mathop'] = function (block) {
  var arg0 = block.getFieldValue("OPERATOR");
  var arg1 = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_HIGH) || '0';
  var code;
  if (arg0 == "sin" || arg0 == "cos" || arg0 == "tan") {
    code = arg0 + "(" + arg1 + " / 180.0 * 3.141592653)";
  } else if (arg0 == "asin" || arg0 == "acos" || arg0 == "atan") {
    code = arg0 + "(" + arg1 + ") / 3.141592653 * 180.0";
  } else if (arg0 == "ln") {
    code = "log(" + arg1 + ")";
  } else if (arg0 == "log") {
    code = "log(" + arg1 + ") / log(10)";
  } else if (arg0 == "e ^") {
    code = "exp(" + arg1 + ")";
  } else if (arg0 == "10 ^") {
    code = "pow(10," + arg1 + ")";
  } else {
    code = arg0 + "(" + arg1 + ")";
  }
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino['operator_join'] = function (block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'STRING1', Blockly.Arduino.ORDER_HIGH);
  var arg1 = Blockly.Arduino.valueToCode(block, 'STRING2', Blockly.Arduino.ORDER_HIGH);
  var code = "(String(\"" + arg0 + "\") + String(\"" + arg1 + "\"))";
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino['operator_letter_of'] = function (block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'LETTER', Blockly.Arduino.ORDER_HIGH);
  var arg1 = Blockly.Arduino.valueToCode(block, 'STRING', Blockly.Arduino.ORDER_HIGH);
  var code = "(\"" + arg1 + "\".charAt(" + arg0 + "))";
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino['operator_length'] = function (block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'STRING', Blockly.Arduino.ORDER_HIGH);
  var code = "(strlen(\"" + arg0 + "\")";
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino['operator_contains'] = function (block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'STRING1', Blockly.Arduino.ORDER_HIGH);
  var arg1 = Blockly.Arduino.valueToCode(block, 'STRING2', Blockly.Arduino.ORDER_HIGH);
  var code = "(" + arg0 + "&&" + arg1 + ")";
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino['operator_mod'] = function (block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'NUM1', Blockly.Arduino.ORDER_HIGH);
  var arg1 = Blockly.Arduino.valueToCode(block, 'NUM2', Blockly.Arduino.ORDER_HIGH);
  var code = "(" + arg0 + "%" + arg1 + ")";
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino['operator_round'] = function (block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_HIGH);
  var code = "(round(" + arg0 + "))";
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino['operator_mathop'] = function (block) {
  var arg0 = block.getFieldValue("OPERATOR");
  var arg1 = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_HIGH) || '0';
  var code;
  if (arg0 == "sin" || arg0 == "cos" || arg0 == "tan") {
    code = arg0 + "(" + arg1 + " / 180.0 * 3.141592653)";
  } else if (arg0 == "asin" || arg0 == "acos" || arg0 == "atan") {
    code = arg0 + "(" + arg1 + ") / 3.141592653 * 180.0";
  } else if (arg0 == "ln") {
    code = "log(" + arg1 + ")";
  } else if (arg0 == "log") {
    code = "log(" + arg1 + ") / log(10)";
  } else if (arg0 == "e ^") {
    code = "exp(" + arg1 + ")";
  } else if (arg0 == "10 ^") {
    code = "pow(10," + arg1 + ")";
  } else {
    code = arg0 + "(" + arg1 + ")";
  }
  return [code];
};

Blockly.Arduino['operator_add'] = Blockly.Arduino['operator_arithmetic'];
Blockly.Arduino['operator_subtract'] = Blockly.Arduino['operator_arithmetic'];
Blockly.Arduino['operator_multiply'] = Blockly.Arduino['operator_arithmetic'];
Blockly.Arduino['operator_divide'] = Blockly.Arduino['operator_arithmetic'];

Blockly.Arduino['operator_gt'] = Blockly.Arduino['operator_compare'];
Blockly.Arduino['operator_equals'] = Blockly.Arduino['operator_compare'];
Blockly.Arduino['operator_lt'] = Blockly.Arduino['operator_compare'];
Blockly.Arduino['math_angle'] = Blockly.Arduino['math_number'];
Blockly.Arduino['math_positive_number'] = Blockly.Arduino['math_number'];
Blockly.Arduino['math_whole_number'] = Blockly.Arduino['math_number'];
