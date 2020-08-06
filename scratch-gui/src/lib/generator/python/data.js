// import * as Blockly from 'scratch-blocks';

Blockly.Python.data_variable = function (block) {
  //   var arg0 = block.getFieldValue("VARIABLE");
  const arg0 = block.getField('VARIABLE').text_;
  // Blockly.Python.definitions_.addDeclareVariable = `int ${arg0}${Blockly.Python.END}`;
  const code = arg0;
  return code;
};

Blockly.Python.addDeclareVariable = function (block) {
  //   var arg0 = block.getFieldValue("VARIABLE");
  const arg1 = block.getField('VARIABLE').text_;
  const code = `int ${arg1}${Blockly.Python.END}`;
  Blockly.Python.definitions_.addDeclareVariable = code;
  return code;
};

Blockly.Python.data_setvariableto = function (block) {
  const arg = block.getField('VARIABLE').text_;
  // Blockly.Python.definitions_.addDeclareVariable = `int ${arg}${Blockly.Python.END}`;
  const order = Blockly.Python.ORDER_NONE;
  const arg1 = Blockly.Python.valueToCode(block, 'VALUE', order);
  const code = `${Blockly.Python.tab() + arg} = ${arg1}${Blockly.Python.END}`;
  return code;
};

Blockly.Python.data_changevariableby = function (block) {
  const arg0 = block.getField('VARIABLE').text_;
  // Blockly.Python.definitions_.addDeclareVariable = `int ${arg0}${Blockly.Python.END}`;
  const order = Blockly.Python.ORDER_NONE;
  const arg1 = Blockly.Python.valueToCode(block, 'VALUE', order);
  const code = `${Blockly.Python.tab() + arg0} = int(${arg0}) + ${arg1}${Blockly.Python.END}`;
  return code;
};

Blockly.Python.data_showvariable = function () {
  return '#data_showvariable\n';
};

Blockly.Python.data_hidevariable = function () {
  return '#data_hidevariable\n';
};

Blockly.Python.data_listcontents = function (block) {
  const arg1 = block.getField('LIST').text_;
  const code = arg1;
  return code;
};

Blockly.Python.data_listindexall = function () {
  return '#data_listindexall\n';
};

Blockly.Python.data_listindexrandom = function () {
  return '#data_listindexrandom\n';
};

Blockly.Python.data_addtolist = function (block) {
  const order = Blockly.Python.ORDER_NONE;
  const arg0 = Blockly.Python.valueToCode(block, 'ITEM', order);
  const arg1 = block.getField('LIST').text_;
  const code = `${Blockly.Python.tab() + arg0} += ${arg1}${Blockly.Python.END}`;
  return code;
};

Blockly.Python.data_deleteoflist = function () {
  return '#data_deleteoflist\n';
};

Blockly.Python.data_deletealloflist = function () {
  return '#data_deletealloflist\n';
};
Blockly.Python.data_insertatlist = function () {
  return '#data_insertatlist\n';
};
Blockly.Python.data_replaceitemoflist = function () {
  return '#data_replaceitemoflist\n';
};
Blockly.Python.data_itemoflist = function () {
  return '#data_itemoflist\n';
};
Blockly.Python.data_itemnumoflist = function () {
  return '#data_itemnumoflist\n';
};
Blockly.Python.data_lengthoflist = function () {
  return '#data_lengthoflist\n';
};
Blockly.Python.data_listcontainsitem = function () {
  return '#data_listcontainsitem\n';
};
Blockly.Python.data_showlist = function () {
  return '#data_showlist\n';
};
Blockly.Python.data_hidelist = function () {
  return '#data_hidelist\n';
};
