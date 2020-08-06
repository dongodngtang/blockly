import ScratchBlocks from 'scratch-blocks';

export const aiStarterMathBlocks = function () {
  ScratchBlocks.Blocks.AIStarter_number = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_number',
        message0: ScratchBlocks.Msg.AISTARTER_NUMBER,
        args0: [
          {
            type: 'input_value',
            name: 'NUM'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_number']
      });
    }
  };
  ScratchBlocks.Blocks.AIStarter_operator_add = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_operator_add',
        message0: ScratchBlocks.Msg.OPERATORS_ADD,
        args0: [
          {
            type: 'input_value',
            name: 'NUM1'
          },
          {
            type: 'input_value',
            name: 'NUM2'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_number']
      });
    }
  };
  ScratchBlocks.Blocks.AIStarter_operator_subtract = {
    init: function() {
      this.jsonInit({
        id: 'AIStarter_operator_subtract',
        message0: ScratchBlocks.Msg.OPERATORS_SUBTRACT,
        args0: [
          {
            type: 'input_value',
            name: 'NUM1'
          },
          {
            type: 'input_value',
            name: 'NUM2'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_operator_multiply = {
    init: function() {
      this.jsonInit({
        id: 'AIStarter_operator_multiply',
        message0: ScratchBlocks.Msg.OPERATORS_MULTIPLY,
        args0: [
          {
            type: 'input_value',
            name: 'NUM1'
          },
          {
            type: 'input_value',
            name: 'NUM2'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_operator_divide = {
    init: function() {
      this.jsonInit({
        id: 'AIStarter_operator_divide',
        message0: ScratchBlocks.Msg.OPERATORS_DIVIDE,
        args0: [
          {
            type: 'input_value',
            name: 'NUM1'
          },
          {
            type: 'input_value',
            name: 'NUM2'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_number']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_operator_lt = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.OPERATORS_LT,
        args0: [
          {
            type: 'input_value',
            name: 'OPERAND1'
          },
          {
            type: 'input_value',
            name: 'OPERAND2'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_boolean']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_operator_equals = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.OPERATORS_EQUALS,
        args0: [
          {
            type: 'input_value',
            name: 'OPERAND1'
          },
          {
            type: 'input_value',
            name: 'OPERAND2'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_boolean']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_operator_gt = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.OPERATORS_GT,
        args0: [
          {
            type: 'input_value',
            name: 'OPERAND1'
          },
          {
            type: 'input_value',
            name: 'OPERAND2'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_boolean']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_operator_and = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.OPERATORS_AND,
        args0: [
          {
            type: 'input_value',
            name: 'OPERAND1',
            check: 'Boolean'
          },
          {
            type: 'input_value',
            name: 'OPERAND2',
            check: 'Boolean'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_boolean']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_operator_or = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.OPERATORS_OR,
        args0: [
          {
            type: 'input_value',
            name: 'OPERAND1',
            check: 'Boolean'
          },
          {
            type: 'input_value',
            name: 'OPERAND2',
            check: 'Boolean'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_boolean']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_operator_not = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.OPERATORS_NOT,
        args0: [
          {
            type: 'input_value',
            name: 'OPERAND',
            check: 'Boolean'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_boolean']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_operator_bitwise = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.AISTARTER_OPERATORS_BITWISE,
        args0: [
          {
            type: 'input_value',
            name: 'NUM1'
          },
          {
            type: 'field_dropdown',
            name: 'KEY',
            options: [
              ['&', '&'],
              ['|', '|'],
              ['^', '^'],
              ['>>', '>>'],
              ['<<', '<<']
            ]
          },
          {
            type: 'input_value',
            name: 'NUM2'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_number']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_operator_random = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.OPERATORS_RANDOM,
        args0: [
          {
            type: 'input_value',
            name: 'FROM'
          },
          {
            type: 'input_value',
            name: 'TO'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_number']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_operator_MaxMin = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.AISTARTER_OPERATOR_MAXMIN,
        args0: [
          {
            type: 'field_dropdown',
            name: 'type',
            options: [
              [ScratchBlocks.Msg.AISTARTER_OPERATOR_MAX, 'max'],
              [ScratchBlocks.Msg.AISTARTER_OPERATOR_MIN, 'min']
            ]
          },
          {
            type: 'input_value',
            name: 'NUM1'
          },
          {
            type: 'input_value',
            name: 'NUM2'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_number']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_operator_mathop = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.OPERATORS_MATHOP,
        args0: [
          {
            type: 'field_dropdown',
            name: 'OPERATOR',
            options: [
              [ScratchBlocks.Msg.OPERATORS_MATHOP_ABS, 'abs'],
              [ScratchBlocks.Msg.OPERATORS_MATHOP_FLOOR, 'floor'],
              [ScratchBlocks.Msg.OPERATORS_MATHOP_CEILING, 'ceiling'],
              [ScratchBlocks.Msg.OPERATORS_MATHOP_SQRT, 'sqrt'],
              [ScratchBlocks.Msg.OPERATORS_MATHOP_SQ, 'sq'],
              [ScratchBlocks.Msg.OPERATORS_MATHOP_SIN, 'sin'],
              [ScratchBlocks.Msg.OPERATORS_MATHOP_COS, 'cos'],
              [ScratchBlocks.Msg.OPERATORS_MATHOP_TAN, 'tan'],
              [ScratchBlocks.Msg.OPERATORS_MATHOP_ASIN, 'asin'],
              [ScratchBlocks.Msg.OPERATORS_MATHOP_ACOS, 'acos'],
              [ScratchBlocks.Msg.OPERATORS_MATHOP_ATAN, 'atan'],
              [ScratchBlocks.Msg.OPERATORS_MATHOP_LN, 'ln'],
              [ScratchBlocks.Msg.OPERATORS_MATHOP_LOG, 'log'],
              [ScratchBlocks.Msg.OPERATORS_MATHOP_EEXP, 'e ^'],
              [ScratchBlocks.Msg.OPERATORS_MATHOP_10EXP, '10 ^']
            ]
          },
          {
            type: 'input_value',
            name: 'NUM'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_number']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_operator_GetBytes = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.AISTARTER_OPERATOR_GETBYTES,
        args0: [
          {
            type: 'input_value',
            name: 'value'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_number']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_operator_constraint = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.AISTARTER_OPERATOR_CONSTRAINT,
        args0: [
          {
            type: 'input_value',
            name: 'value'
          },
          {
            type: 'input_value',
            name: 'low'
          },
          {
            type: 'input_value',
            name: 'high'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['colours_operators', 'output_number']
      });
    }
  };
  
};
