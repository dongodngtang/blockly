/**
 * Created by Riven on 7/14/2016.
 */

'use strict';

goog.provide('Blockly.Arduino.data');

goog.require('Blockly.Arduino');


Blockly.Arduino['data_variable'] = function (block) {
  //   var arg0 = block.getFieldValue("VARIABLE");
  var arg0 = block.getField("VARIABLE").text_;
  Blockly.Arduino.definitions_['addDeclareVariable'] = "int " + arg0 + Blockly.Arduino.END;
  var code = arg0;
  return code;
};

Blockly.Arduino['addDeclareVariable'] = function (block) {
  //   var arg0 = block.getFieldValue("VARIABLE");
  var arg1 = block.getField("VARIABLE").text_;
  var code = "int " + arg1 + Blockly.Arduino.END;
  Blockly.Arduino.definitions_['addDeclareVariable'] = code;
  // return code;
};

Blockly.Arduino['data_setvariableto'] = function (block) {
  var arg = block.getField("VARIABLE").text_;
  Blockly.Arduino.definitions_['addDeclareVariable'] = "int " + arg + Blockly.Arduino.END;
  var order = Blockly.Arduino.ORDER_NONE;
  var arg1 = Blockly.Arduino.valueToCode(block, 'VALUE', order);
  var code = Blockly.Arduino.tab() + arg + " = " + arg1 + Blockly.Arduino.END;
  return code;
};

Blockly.Arduino['data_changevariableby'] = function (block) {
  var arg0 = block.getField("VARIABLE").text_;
  Blockly.Arduino.definitions_['addDeclareVariable'] = "int " + arg0 + Blockly.Arduino.END;
  var order = Blockly.Arduino.ORDER_NONE;
  var arg1 = Blockly.Arduino.valueToCode(block, 'VALUE', order);
  var code = Blockly.Arduino.tab() + arg0 + " += " + arg1 + Blockly.Arduino.END;
  return code;
};

Blockly.Arduino['data_showvariable'] = function () {
  return '';
};

Blockly.Arduino['data_hidevariable'] = function () {
  return '';
};

Blockly.Arduino['data_listcontents'] = function (block) {
  var arg1 = block.getField("LIST").text_;
  var code = arg1;
  return code;
};

Blockly.Arduino['data_listindexall'] = function () {
  return 'data_listindexall';
};

Blockly.Arduino['data_listindexrandom'] = function () {
  return 'data_listindexrandom';
};

Blockly.Arduino['data_addtolist'] = function (block) {
  var order = Blockly.Arduino.ORDER_NONE;
  var arg0 = Blockly.Arduino.valueToCode(block, 'ITEM', order);
  var arg1 = block.getField("LIST").text_;
  var code = Blockly.Arduino.tab() + arg0 + " += " + arg1 + Blockly.Arduino.END;
  return code;
};

Blockly.Arduino['data_deleteoflist'] = function () {
  return 'data_deleteoflist';
};

Blockly.Arduino['data_deletealloflist'] = function () {
  return 'data_deletealloflist';
};
Blockly.Arduino['data_insertatlist'] = function () {
  return 'data_insertatlist';
};
Blockly.Arduino['data_replaceitemoflist'] = function () {
  return 'data_replaceitemoflist';
};
Blockly.Arduino['data_itemoflist'] = function () {
  return 'data_itemoflist';
};
Blockly.Arduino['data_itemnumoflist'] = function () {
  return 'data_itemnumoflist';
};
Blockly.Arduino['data_lengthoflist'] = function () {
  return 'data_lengthoflist';
};
Blockly.Arduino['data_listcontainsitem'] = function () {
  return 'data_listcontainsitem';
};
Blockly.Arduino['data_showlist'] = function () {
  return '';
};
Blockly.Arduino['data_hidelist'] = function () {
  return '';
};
