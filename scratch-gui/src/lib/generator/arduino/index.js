const TAB = Blockly.Arduino.INDENT;

// 处理多个变量转c代码问题
const repeatVar = (addDeclareVariableList, arg) => {
  const tempArr = addDeclareVariableList.split('\n');
  const tempList = [];
  tempArr.forEach(item => {
    item.split(' ').forEach((str => {
      tempList.push(str);
    }));
  });
  return tempList.includes(`${arg};`);
};
const intVar = arg => {
  const dataType = window.variableList.find(item => item.name === arg).variableOptions.dataType;
  if (Blockly.Arduino.definitions_.addDeclareVariable){
    if (!repeatVar(Blockly.Arduino.definitions_.addDeclareVariable, arg)){
      Blockly.Arduino.definitions_.addDeclareVariable += `${dataType} ${arg}${Blockly.Arduino.END}`;
    }
  } else {
    Blockly.Arduino.definitions_.addDeclareVariable = `${dataType} ${arg}${Blockly.Arduino.END}`;
  }
};

Blockly.Arduino.Str2Code = function (str) {

  if (str === '') {
    return '';
  }
  const hexCharCode = [];
  hexCharCode.push('fn');
  for (let i = 0; i < str.length; i++) {
    hexCharCode.push(`fn${(str.charCodeAt(i)).toString(16)}_`);
  }
  return hexCharCode.join('');
};

Blockly.Arduino.Arduino_Break = function (block) {
  return `${TAB}break;`;
};

Blockly.Arduino.Arduino_For = function(block) {
  // For loop.
  // var variable0 = Blockly.Arduino.variableDB_.getName(
  //     this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  const variable0 = Blockly.Arduino.valueToCode(this, 'VAR',
    Blockly.Arduino.ORDER_ASSIGNMENT) || 'i';
  const argument0 = Blockly.Arduino.valueToCode(this, 'FROM',
    Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  const argument1 = Blockly.Arduino.valueToCode(this, 'TO',
    Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  const step = Blockly.Arduino.valueToCode(this, 'BY',
    Blockly.Arduino.ORDER_ASSIGNMENT) || '1';
  let branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
      `'${this.id}'`) + branch;
  }
  let code = TAB;
  let down = 0;
  if (argument0.match(/^-?\d+(\.\d+)?$/) &&
    argument1.match(/^-?\d+(\.\d+)?$/)) {
    // 起止数是常量
    down = (argument1 - argument0 < 0);
    code += `for (int ${variable0} = ${argument0}; ${
      variable0}${down ? ' >= ' : ' <= '}${argument1}; ${
      variable0} = ${variable0} + (${step})) {\n${
      branch}${TAB}}\n`;
  } else if (step.match(/^-?\d+(\.\d+)?$/)) {
    // 起止数有变量
    // 步长是常量
    down = step < 0;
    code += `for (int ${variable0} = (${argument0}); ${
      variable0}${down ? ' >= ' : ' <= '}(${argument1}); ${
      variable0} = ${variable0} + (${step})) {\n${
      branch}${TAB}}\n`;
  } else {
    // 步长是变量
    code += `for (int ${variable0} = (${argument0}); ` +
        `(${argument1}>=${argument0})?(${variable0}<=${argument1}):(${variable0}>=${argument1}); ${
          variable0} = ${variable0} + (${step})) {\n${
          branch}${TAB}}\n`;
  }
  return code;
};

Blockly.Arduino.AIStarter_operator_mathop = function (block) {
  const arg0 = block.getFieldValue('OPERATOR');
  const arg1 = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_HIGH) || '0';
  let code;
  if (arg0 === 'sin' || arg0 === 'cos' || arg0 === 'tan') {
    code = `${arg0}(${arg1} / 180.0 * 3.141592653)`;
  } else if (arg0 === 'asin' || arg0 === 'acos' || arg0 === 'atan') {
    code = `${arg0}(${arg1}) / 3.141592653 * 180.0`;
  } else if (arg0 === 'ln') {
    code = `log(${arg1})`;
  } else if (arg0 === 'log') {
    code = `log(${arg1}) / log(10)`;
  } else if (arg0 === 'e ^') {
    code = `exp(${arg1})`;
  } else if (arg0 === '10 ^') {
    code = `pow(10,${arg1})`;
  } else {
    code = `${arg0}(${arg1})`;
  }
  return [code];
};

Blockly.Arduino.Arduino_Start = function(block) {
  return '';
};

Blockly.Arduino.control_repeat_until = function (block) {
  const argument = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_NONE) || 'false';

  let branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  let code = `${Blockly.Arduino.tab()}while((not ${argument})):\n`;
  Blockly.Arduino.tabPos++;
  code += branch;
  Blockly.Arduino.tabPos--;
  code += `${Blockly.Arduino.tab()}}\n`;
  return code;
};

Blockly.Arduino.procedures_definition = function (block) {
  let args = null;
  const customBlock = block.getInputTargetBlock('custom_block');
  const childBlocks = customBlock.getChildren();
  for (let i = 0; i < childBlocks.length; ++i) {
    const childBlock = childBlocks[i];
    const code = Blockly.Arduino[childBlock.type].call(childBlock, childBlock)[0];
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
  funcName = Blockly.Arduino.Str2Code(funcName);

  let code = `float ${funcName}()\n{\n`;
  code = Blockly.Arduino.scrub_(block, code);
  code = `${code}}${Blockly.Arduino.END}`;
  Blockly.Arduino.definitions_[`%${funcName}`] = code;
};

Blockly.Arduino.procedures_call = function (block) {
  let funcName = block.inputList[0].fieldRow[0].text_;
  funcName = Blockly.Arduino.Str2Code(funcName);
  let args = null;
  for (let i = 0; i < block.argumentIds_.length; ++i) {
    const argName = block.argumentIds_[i];
    const value = Blockly.Arduino.valueToCode(block, argName, Blockly.Arduino.ORDER_NONE) || 'null';
    args = args ? `${args}, ${value}` : `${value}`;
  }
  const code = `    ${funcName}()${Blockly.Arduino.END}`;
  return code;
};

Blockly.Arduino.arduino_digital_write = function (block) {
  const order = Blockly.Arduino.ORDER_NONE;
  const arg0 = Blockly.Arduino.valueToCode(block, 'PINNUM', order);
  const arg1 = block.getFieldValue('ARDUINO_LEVEL_OPTION');
  // var arg1 = Blockly.Arduino.valueToCode(block, 'ARDUINO_LEVEL_OPTION', order);
  const code = `${Blockly.Arduino.tab()}digitalWrite(${arg0},${arg1})${Blockly.Arduino.END}`;
  return code;
};

Blockly.Arduino.control_repeat_until = function (block) {
  const argument = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_NONE) || 'false';

  let branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  let code = `${Blockly.Arduino.tab()}while(!(${argument})){\n`;
  Blockly.Arduino.tabPos++;
  code += branch;
  Blockly.Arduino.tabPos--;
  code += `${Blockly.Arduino.tab()}}\n`;
  return code;
};

Blockly.Arduino.data_variable = function (block) {
  const arg0 = block.getField('VARIABLE').text_;
  intVar(arg0);
  const code = arg0;
  return code;
};

Blockly.Arduino.data_setvariableto = function (block) {
  const arg = block.getField('VARIABLE').text_;
  intVar(arg);
  const order = Blockly.Arduino.ORDER_NONE;
  const arg1 = Blockly.Arduino.valueToCode(block, 'VALUE', order);
  const code = `${Blockly.Arduino.tab() + arg} = ${arg1}${Blockly.Arduino.END}`;
  return code;
};

Blockly.Arduino.data_changevariableby = function (block) {
  const arg0 = block.getField('VARIABLE').text_;
  intVar(arg0);
  const order = Blockly.Arduino.ORDER_NONE;
  const arg1 = Blockly.Arduino.valueToCode(block, 'VALUE', order);
  const code = `${Blockly.Arduino.tab() + arg0} = ${Blockly.Arduino.tab() + arg0} + ${arg1}${Blockly.Arduino.END}`;
  return code;
};

Blockly.Arduino.operator_compare = function (block) {
  const oplist = {
    AIStarter_operator_gt: '>',
    AIStarter_operator_equals: '==',
    AIStarter_operator_lt: '<'
  };
  const arg0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', Blockly.Arduino.ORDER_HIGH) || '0';
  const arg1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', Blockly.Arduino.ORDER_HIGH) || '0';
  const op = oplist[block.type];
  const code = `(${arg0} ${op} ${arg1})`;
  return [code, Blockly.Arduino.ORDER_RELATIONAL];
};

Blockly.Arduino.AIStarter_operator_gt = Blockly.Arduino.operator_compare;
Blockly.Arduino.AIStarter_operator_equals = Blockly.Arduino.operator_compare;
Blockly.Arduino.AIStarter_operator_lt = Blockly.Arduino.operator_compare;

Blockly.Arduino.operator_arithmetic = function (block) {
  const oplist = {
    AIStarter_operator_add: '+',
    AIStarter_operator_subtract: '-',
    AIStarter_operator_multiply: '*',
    AIStarter_operator_divide: '/'
  };
  // Numeric value.
  const argument0 = Blockly.Arduino.valueToCode(block, 'NUM1', Blockly.Arduino.ORDER_HIGH) || '0';
  const argument1 = Blockly.Arduino.valueToCode(block, 'NUM2', Blockly.Arduino.ORDER_HIGH) || '0';
  let order = Blockly.Arduino.ORDER_ADDITIVE;
  if (block.type === 'operator_multiply' || block.type === 'operator_divide') {
    order -= 1;
  }
  const op = oplist[block.type];
  const code = `(${argument0} ${op} ${argument1})`;
  return [code, order];
};

Blockly.Arduino.AIStarter_operator_add = Blockly.Arduino.operator_arithmetic;
Blockly.Arduino.AIStarter_operator_subtract = Blockly.Arduino.operator_arithmetic;
Blockly.Arduino.AIStarter_operator_multiply = Blockly.Arduino.operator_arithmetic;
Blockly.Arduino.AIStarter_operator_divide = Blockly.Arduino.operator_arithmetic;


Blockly.Arduino.AIStarter_operator_and = function (block) {
  const arg0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', Blockly.Arduino.ORDER_HIGH) || '0';
  const arg1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', Blockly.Arduino.ORDER_HIGH) || '0';
  const code = `(${arg0} && ${arg1})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_operator_or = function (block) {
  const arg0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', Blockly.Arduino.ORDER_HIGH) || '0';
  const arg1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', Blockly.Arduino.ORDER_HIGH) || '0';
  const code = `(${arg0} || ${arg1})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_operator_not = function (block) {
  const arg0 = Blockly.Arduino.valueToCode(block, 'OPERAND', Blockly.Arduino.ORDER_HIGH) || '0';
  const code = `(!${arg0})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_number = function (block) {
  const arg0 = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_HIGH) || '0';
  const code = arg0;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_operator_random = function (block) {
  const arg0 = Blockly.Arduino.valueToCode(block, 'FROM', Blockly.Arduino.ORDER_HIGH) || '0';
  const arg1 = Blockly.Arduino.valueToCode(block, 'TO', Blockly.Arduino.ORDER_HIGH) || '0';
  const code = `random(${arg0},${arg1})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_operator_MaxMin = function (block) {
  const type = block.getFieldValue('type');
  const arg0 = Blockly.Arduino.valueToCode(block, 'NUM1', Blockly.Arduino.ORDER_HIGH) || '0';
  const arg1 = Blockly.Arduino.valueToCode(block, 'NUM2', Blockly.Arduino.ORDER_HIGH) || '0';
  const code = `${type}(${arg0},${arg1})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_operator_bitwise = function (block) {
  const type = block.getFieldValue('KEY');
  const arg0 = Blockly.Arduino.valueToCode(block, 'NUM1', Blockly.Arduino.ORDER_HIGH) || '0';
  const arg1 = Blockly.Arduino.valueToCode(block, 'NUM2', Blockly.Arduino.ORDER_HIGH) || '0';
  const code = `(${arg0} ${type} ${arg1})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_operator_GetBytes = function (block) {
  const arg1 = Blockly.Arduino.valueToCode(block, 'value', Blockly.Arduino.ORDER_HIGH) || '0';
  const code = `(sizeof(${arg1}))`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_operator_constraint = function (block) {
  const arg1 = Blockly.Arduino.valueToCode(block, 'value', Blockly.Arduino.ORDER_HIGH) || '0';
  const low = Blockly.Arduino.valueToCode(block, 'low', Blockly.Arduino.ORDER_HIGH) || '0';
  const high = Blockly.Arduino.valueToCode(block, 'high', Blockly.Arduino.ORDER_HIGH) || '0';
  const code = `(constrain(${arg1},${low},${high}))`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

// 文本积木
Blockly.Arduino.AIStarter_string = function (block) {
  const arg0 = Blockly.Arduino.valueToCode(block, 'string', Blockly.Arduino.ORDER_HIGH);
  let code;
  if (block.childBlocks_[0].type === 'text'){
    code = `("${arg0}")`;
  } else {
    code = `(${arg0})`;
  }
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_char = function (block) {
  const arg0 = Blockly.Arduino.valueToCode(block, 'string', Blockly.Arduino.ORDER_HIGH);
  let code;
  if (block.childBlocks_[0].type === 'text'){
    code = `('${arg0}')`;
  } else {
    code = `(${arg0})`;
  }
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_string_connection = function (block) {
  let arg1 = Blockly.Arduino.valueToCode(block, 'string1', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[0].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  let arg2 = Blockly.Arduino.valueToCode(block, 'string2', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[1].type === 'text'){
    arg2 = `"${arg2}"`;
  }
  const code = `String(${arg1}) + String(${arg2});`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_string_changeType = function (block) {
  let arg1 = Blockly.Arduino.valueToCode(block, 'string', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[0].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  const type = block.getFieldValue('type');
  const code = `String(${arg1}).${type}();`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_string_indexOf = function (block) {
  let arg1 = Blockly.Arduino.valueToCode(block, 'string1', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[0].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  let arg2 = Blockly.Arduino.valueToCode(block, 'string2', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[1].type === 'text'){
    arg2 = `"${arg2}"`;
  }
  const code = `String(${arg1}).indexOf(String(${arg2}))`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_string_Extract = function (block) {
  let arg1 = Blockly.Arduino.valueToCode(block, 'inputString', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[0].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  const startNum = Blockly.Arduino.valueToCode(block, 'startNum', Blockly.Arduino.ORDER_HIGH);
  const endNum = Blockly.Arduino.valueToCode(block, 'endNum', Blockly.Arduino.ORDER_HIGH);
  const code = `String(${arg1}).substring(${startNum - 1}, ${endNum})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_string_toUpperCase = function (block) {
  let arg1 = Blockly.Arduino.valueToCode(block, 'inputString', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[0].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  const type = block.getFieldValue('type');
  const code = `${Blockly.Arduino.tab()}${arg1}.${type}()${Blockly.Arduino.END}`;
  return code;
};

Blockly.Arduino.AIStarter_string_trim = function (block) {
  let arg1 = Blockly.Arduino.valueToCode(block, 'inputString', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[0].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  const code = `${Blockly.Arduino.tab()}${arg1}.trim()${Blockly.Arduino.END}`;
  return code;
};

Blockly.Arduino.AIStarter_String_Begin = function (block) {
  let arg1 = Blockly.Arduino.valueToCode(block, 'inputString', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[0].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  let arg2 = Blockly.Arduino.valueToCode(block, 'beginString', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[1].type === 'text'){
    arg2 = `"${arg2}"`;
  }
  const code = `String(${arg1}).startsWith(${arg2})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_String_End = function (block) {
  let arg1 = Blockly.Arduino.valueToCode(block, 'inputString', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[0].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  let arg2 = Blockly.Arduino.valueToCode(block, 'endString', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[1].type === 'text'){
    arg2 = `"${arg2}"`;
  }
  const code = `String(${arg1}).endsWith(${arg2})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_String_DataTypeChange = function (block) {
  let arg1 = Blockly.Arduino.valueToCode(block, 'inputString', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[0].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  const type = block.getFieldValue('type');
  const code = `${type}(${arg1})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_String_getLength = function (block) {
  let arg1 = Blockly.Arduino.valueToCode(block, 'inputString', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[0].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  const code = `String(${arg1}).length()`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_String_charAt = function (block) {
  let arg1 = Blockly.Arduino.valueToCode(block, 'inputString', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[0].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  const arg2 = Blockly.Arduino.valueToCode(block, 'inputNumber', Blockly.Arduino.ORDER_HIGH);
  const code = `String(${arg1}).charAt(${arg2 - 1})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_String_Base = function (block) {
  let arg1 = Blockly.Arduino.valueToCode(block, 'inputString', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[0].type === 'text'){
    arg1 = `"${arg1}"`;
  }
  const type = block.getFieldValue('type');
  const code = `String(${arg1},${type})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_String_ASCLL2char = function (block) {
  const arg1 = Blockly.Arduino.valueToCode(block, 'inputString', Blockly.Arduino.ORDER_HIGH);
  const code = `char(${arg1})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_String_char2ASCLL = function (block) {
  let arg1 = Blockly.Arduino.valueToCode(block, 'inputString', Blockly.Arduino.ORDER_HIGH);
  if (block.childBlocks_[0].type === 'text'){
    arg1 = `'${arg1}'`;
  }
  const code = `toascii(${arg1})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};

Blockly.Arduino.AIStarter_String_KeepDecimals = function (block) {
  const arg1 = Blockly.Arduino.valueToCode(block, 'inputString', Blockly.Arduino.ORDER_HIGH);
  const arg2 = Blockly.Arduino.valueToCode(block, 'inputNumber', Blockly.Arduino.ORDER_HIGH);
  const code = `String(${arg1}, ${arg2})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
};
