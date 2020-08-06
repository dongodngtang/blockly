// import * as Blockly from 'scratch-blocks';

Blockly.Python.math_number = function (block) {
  // Numeric value.
  const code = parseFloat(block.getFieldValue('NUM'));
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text = function (block) {
  // Text value.
  const code = Blockly.Python.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.operator_random = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'FROM', Blockly.Python.ORDER_HIGH) || '0';
  const arg1 = Blockly.Python.valueToCode(block, 'TO', Blockly.Python.ORDER_HIGH) || '0';
  Blockly.Python.definitions_.random = 'import random';
  const code = `(random.randint(${arg0},${arg1}))`;
  return [code, Blockly.Python.ORDER_HIGH];
};

Blockly.Python.operator_compare = function (block) {
  const oplist = {
    operator_gt: '>',
    operator_equals: '==',
    operator_lt: '<'
  };
  const arg0 = Blockly.Python.valueToCode(block, 'OPERAND1', Blockly.Python.ORDER_HIGH) || '0';
  const arg1 = Blockly.Python.valueToCode(block, 'OPERAND2', Blockly.Python.ORDER_HIGH) || '0';
  const op = oplist[block.type];
  const code = `(str(${arg0}) ${op} ${arg1})`;
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python.operator_arithmetic = function (block) {
  const oplist = {
    operator_add: '+',
    operator_subtract: '-',
    operator_multiply: '*',
    operator_divide: '/'
  };
  // Numeric value.
  const argument0 = Blockly.Python.valueToCode(block, 'NUM1', Blockly.Python.ORDER_HIGH) || '0';
  const argument1 = Blockly.Python.valueToCode(block, 'NUM2', Blockly.Python.ORDER_HIGH) || '0';
  let order = Blockly.Python.ORDER_ADDITIVE;
  if (block.type === 'operator_multiply' || block.type === 'operator_divide') {
    order -= 1;
  }
  const op = oplist[block.type];
  const code = `(${argument0} ${op} ${argument1})`;
  return [code, order];
};

Blockly.Python.operator_and = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'OPERAND1', Blockly.Python.ORDER_HIGH) || '0';
  const arg1 = Blockly.Python.valueToCode(block, 'OPERAND2', Blockly.Python.ORDER_HIGH) || '0';
  const code = `(${arg0}and${arg1})`;
  return [code, Blockly.Python.ORDER_HIGH];
};

Blockly.Python.operator_or = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'OPERAND1', Blockly.Python.ORDER_HIGH) || '0';
  const arg1 = Blockly.Python.valueToCode(block, 'OPERAND2', Blockly.Python.ORDER_HIGH) || '0';
  const code = `(${arg0}or${arg1})`;
  return [code, Blockly.Python.ORDER_HIGH];
};

Blockly.Python.operator_not = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'OPERAND', Blockly.Python.ORDER_HIGH) || '0';
  const code = `(not${arg0})`;
  return [code, Blockly.Python.ORDER_HIGH];
};

Blockly.Python.operator_mathop = function (block) {
  Blockly.Python.definitions_.math = 'import math';
  const arg0 = block.getFieldValue('OPERATOR');
  const arg1 = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_HIGH) || '0';
  let code;
  if (arg0 === 'sin' || arg0 === 'cos' || arg0 === 'tan') {
    code = `(math.${arg0}(${arg1} / 180.0 * 3.141592653))`;
  } else if (arg0 === 'asin' || arg0 === 'acos' || arg0 === 'atan') {
    code = `(math.${arg0}(${arg1}) / 3.141592653 * 180.0)`;
  } else if (arg0 === 'ln') {
    code = `(${'math.log('}${arg1}))`;
  } else if (arg0 === 'log') {
    code = `(${'math.log('}${arg1}) /math.log(10))`;
  } else if (arg0 === 'e ^') {
    code = `(${'math.exp('}${arg1}))`;
  } else if (arg0 === '10 ^') {
    code = `(${'math.pow(10,'}${arg1}))`;
  } else if (arg0 === 'abs'){
    code = `(${arg0}(${arg1}))`;
  } else if (arg0 === 'ceiling'){
    code = `(math.ceil(${arg1}))`;
  } else {
    code = `(math.${arg0}(${arg1}))`;
  }
  return [code, Blockly.Python.ORDER_HIGH];
};

Blockly.Python.operator_join = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'STRING1', Blockly.Python.ORDER_HIGH);
  const arg1 = Blockly.Python.valueToCode(block, 'STRING2', Blockly.Python.ORDER_HIGH);
  const code = `(str(${arg0}) + str(${arg1}))`;
  return [code, Blockly.Python.ORDER_HIGH];
};

Blockly.Python.operator_letter_of = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'LETTER', Blockly.Python.ORDER_HIGH);
  const arg1 = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_HIGH);
  const code = `(${arg1}[${arg0 - 1}:${arg0}])`;
  return [code, Blockly.Python.ORDER_HIGH];
};

Blockly.Python.operator_length = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_HIGH);
  const code = `(len(${arg0}))`;
  return [code, Blockly.Python.ORDER_HIGH];
};

Blockly.Python.operator_contains = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'STRING1', Blockly.Python.ORDER_HIGH);
  const arg1 = Blockly.Python.valueToCode(block, 'STRING2', Blockly.Python.ORDER_HIGH);
  const code = `(str.find(${arg0},${arg1}) != -1)`;
  return [code, Blockly.Python.ORDER_HIGH];
};

Blockly.Python.operator_mod = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'NUM1', Blockly.Python.ORDER_HIGH);
  const arg1 = Blockly.Python.valueToCode(block, 'NUM2', Blockly.Python.ORDER_HIGH);
  const code = `(${arg0}%${arg1})`;
  return [code, Blockly.Python.ORDER_HIGH];
};

Blockly.Python.operator_round = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_HIGH);
  const code = `(round(${arg0}))`;
  return [code, Blockly.Python.ORDER_HIGH];
};
Blockly.Python.String_Extract = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'inputString', Blockly.Python.ORDER_HIGH);
  const arg1 = Blockly.Python.valueToCode(block, 'startNum', Blockly.Python.ORDER_HIGH);
  const arg2 = Blockly.Python.valueToCode(block, 'endNum', Blockly.Python.ORDER_HIGH);
  const code = `(${arg0}[${arg1 - 1}:${arg2}])`;
  return [code, Blockly.Python.ORDER_HIGH];
};
Blockly.Python.String_Begin = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'inputString', Blockly.Python.ORDER_HIGH);
  const arg1 = Blockly.Python.valueToCode(block, 'beginString', Blockly.Python.ORDER_HIGH);
  const code = `(${arg0}.startswith(${arg1}))`;
  return [code, Blockly.Python.ORDER_HIGH];
};
Blockly.Python.String_End = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'inputString', Blockly.Python.ORDER_HIGH);
  const arg1 = Blockly.Python.valueToCode(block, 'endString', Blockly.Python.ORDER_HIGH);
  const code = `(${arg0}.endswith(${arg1}))`;
  return [code, Blockly.Python.ORDER_HIGH];
};
Blockly.Python.String_Contain = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'inputString', Blockly.Python.ORDER_HIGH);
  const arg1 = Blockly.Python.valueToCode(block, 'containsString', Blockly.Python.ORDER_HIGH);
  const code = `(${arg1} in ${arg0})`;
  return [code, Blockly.Python.ORDER_HIGH];
};
Blockly.Python.String_Number = function (block) {
  const arg0 = Blockly.Python.valueToCode(block, 'inputString', Blockly.Python.ORDER_HIGH);
  const code = `(int(''.join(list(filter(str.isdigit, ${arg0}))))) `;
  return [code, Blockly.Python.ORDER_HIGH];
};

Blockly.Python.operator_add = Blockly.Python.operator_arithmetic;
Blockly.Python.operator_subtract = Blockly.Python.operator_arithmetic;
Blockly.Python.operator_multiply = Blockly.Python.operator_arithmetic;
Blockly.Python.operator_divide = Blockly.Python.operator_arithmetic;

Blockly.Python.operator_gt = Blockly.Python.operator_compare;
Blockly.Python.operator_equals = Blockly.Python.operator_compare;
Blockly.Python.operator_lt = Blockly.Python.operator_compare;
Blockly.Python.math_angle = Blockly.Python.math_number;
Blockly.Python.math_positive_number = Blockly.Python.math_number;
Blockly.Python.math_whole_number = Blockly.Python.math_number;
