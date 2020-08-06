/**
 * Created by Riven on 7/15/2016.
 */
'use strict';

goog.provide('Blockly.Arduino.control');

goog.require('Blockly.Arduino');

Blockly.Arduino['control_wait'] = function (block) {
  var order = Blockly.Arduino.ORDER_HIGH;
  var arg0 = Blockly.Arduino.valueToCode(block, 'DURATION', order);
  var ms = arg0 + "*1000";
  var code = Blockly.Arduino.tab() + "delay(" + ms + ")" + Blockly.Arduino.END;
  return code;
};

Blockly.Arduino['control_repeat'] = function (block) {
  var order = Blockly.Arduino.ORDER_HIGH;
  var repeats = Blockly.Arduino.valueToCode(block, 'TIMES', order);
  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  var code = Blockly.Arduino.tab() + "for(int i=0;i<" + repeats + ";i++){\n";
  Blockly.Arduino.tabPos++;
  code += branch;
  Blockly.Arduino.tabPos--;
  code += Blockly.Arduino.tab() + "}\n";
  return code;
};

Blockly.Arduino['control_forever'] = function (block) {
  // if first forever, treat it as loop
  var code;
  if (Blockly.Arduino.codeStage != Blockly.Arduino.Loop) {
    Blockly.Arduino.codeStage = Blockly.Arduino.Loop;
    Blockly.Arduino.tabPos = 0;
    var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    branch = Blockly.Arduino.addLoopTrap(branch, block.id);
    code = "\n}\n"; // finish up setup
    code += "\nvoid loop(){\n";
    code += branch;
  } else {
    code = Blockly.Arduino.tab() + "while(1){\n";
    Blockly.Arduino.tabPos++;
    var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    branch = Blockly.Arduino.addLoopTrap(branch, block.id);
    code += branch;
    Blockly.Arduino.tabPos--;
    code += Blockly.Arduino.tab() + "}\n";
  }
  return code;
};

Blockly.Arduino['control_if'] = function (block) {
  var argument = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_NONE) || 'false';

  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  var code = Blockly.Arduino.tab() + "if(" + argument + "){\n";
  Blockly.Arduino.tabPos++;
  code += branch;
  Blockly.Arduino.tabPos--;
  code += Blockly.Arduino.tab() + "}\n";
  return code;
};


Blockly.Arduino['control_if_else'] = function (block) {
  var argument = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_NONE) || 'false';

  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  var branch2 = Blockly.Arduino.statementToCode(block, 'SUBSTACK2');
  branch2 = Blockly.Arduino.addLoopTrap(branch2, block.id);

  var code = Blockly.Arduino.tab() + "if(" + argument + "){\n";
  Blockly.Arduino.tabPos++;
  code += branch;
  Blockly.Arduino.tabPos--;
  code += Blockly.Arduino.tab() + "}else{\n";
  Blockly.Arduino.tabPos++;
  code += branch2;
  Blockly.Arduino.tabPos--;
  code += Blockly.Arduino.tab() + "}\n";
  return code;
};

Blockly.Arduino['control_wait_until'] = function (block) {
  var order = Blockly.Arduino.ORDER_HIGH;
  var repeats = Blockly.Arduino.valueToCode(block, 'CONDITION', order);
  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  var code = Blockly.Arduino.tab() + "while(" + repeats + "){\n";
  Blockly.Arduino.tabPos++;
  code += branch;
  Blockly.Arduino.tabPos--;
  code += Blockly.Arduino.tab() + "}\n";
  return code;
};

Blockly.Arduino['control_repeat_until'] = function (block) {
  var argument = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_NONE) || 'false';

  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  var code = Blockly.Arduino.tab() + "while(!(" + argument + "){\n";
  Blockly.Arduino.tabPos++;
  code += branch;
  Blockly.Arduino.tabPos--;
  code += Blockly.Arduino.tab() + "}\n";
  return code;
};

Blockly.Arduino['control_stop'] = function () {
  var code = Blockly.Arduino.tab() + "while(1);\n";
  return code;
};

Blockly.Arduino['control_break'] = function () {
  var code = Blockly.Arduino.tab() + "break;\n";
  return code;
};
Blockly.Arduino['control_step_for'] = function () {
  // For loop.
  // var variable0 = Blockly.Arduino.variableDB_.getName(
  //     this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var variable0 = Blockly.Arduino.valueToCode(this, 'VAR',
      Blockly.Arduino.ORDER_ASSIGNMENT) || 'i';
  var argument0 = Blockly.Arduino.valueToCode(this, 'FROM',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'TO',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var step = Blockly.Arduino.valueToCode(this, 'STEP',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '1';
  var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var code;
  var down = 0;
  if (argument0.match(/^-?\d+(\.\d+)?$/) &&
    argument1.match(/^-?\d+(\.\d+)?$/)) {
    //起止数是常量
    down = (argument1 - argument0 < 0);
    code = 'for (int ' + variable0 + ' = ' + argument0 + '; ' +
      variable0 + (down ? ' >= ' : ' <= ') + argument1 + '; ' +
      variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
      branch + '}\n';
  } else {
    //起止数有变量
    if (step.match(/^-?\d+(\.\d+)?$/)) {
      //步长是常量
      down = step < 0;
      code = 'for (int ' + variable0 + ' = (' + argument0 + '); ' +
        variable0 + (down ? ' >= ' : ' <= ') + '(' + argument1 + '); ' +
        variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
        branch + '}\n';
    } else {
      //步长是变量
      code = 'for (int ' + variable0 + ' = (' + argument0 + '); ' +
        '(' + argument1 + '>=' + argument0 + ')?(' + variable0 + '<=' + argument1 + '):(' + variable0 + '>=' + argument1 + '); ' +
        variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
        branch + '}\n';
    }

  }
  return code;
};
