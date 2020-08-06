import ScratchBlocks from 'scratch-blocks';
import { colors } from '../../make-device-toolbox-xml/common';

export const aiStarterTextBlocks = function () {
  ScratchBlocks.Blocks.AIStarter_string = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_string',
        message0: ScratchBlocks.Msg.AISTARTER_STRING_STRING,
        args0: [
          {
            type: 'input_value',
            name: 'string'
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_string']
      });
    }
  };
  ScratchBlocks.Blocks.AIStarter_char = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_char',
        message0: ScratchBlocks.Msg.AISTARTER_STRING_CHAR,
        args0: [
          {
            type: 'input_value',
            name: 'string'
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_string']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_string_connection = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_string_connection',
        message0: ScratchBlocks.Msg.AISTARTER_STRING_CONNECTION,
        args0: [
          {
            type: 'input_value',
            name: 'string1'
          },
          {
            type: 'input_value',
            name: 'string2'
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_string']
      });
    }
  };
  ScratchBlocks.Blocks.AIStarter_string_changeType = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_string_changeType',
        message0: ScratchBlocks.Msg.AISTARTER_STRING_CHANGETYPE,
        args0: [
          {
            type: 'input_value',
            name: 'string'
          },
          {
            type: 'field_dropdown',
            name: 'type',
            options: [
              [ScratchBlocks.Msg.AISTARTER_STRING_INT, 'toInt'],
              [ScratchBlocks.Msg.AISTARTER_STRING_FLOAT, 'toFloat']
            ]
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_string']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_string_indexOf = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_string_indexOf',
        message0: ScratchBlocks.Msg.AISTARTER_STRING_INDEXOF,
        args0: [
          {
            type: 'input_value',
            name: 'string1'
          },
          {
            type: 'input_value',
            name: 'string2'
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_number']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_string_Extract = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.EXTRACTING_CHARACTERS,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          },
          {
            type: 'input_value',
            name: 'startNum'
          },
          {
            type: 'input_value',
            name: 'endNum'
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_string']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_string_toUpperCase = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.AISTARTER_STRING_TOUPPERCASE,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          },
          {
            type: 'field_dropdown',
            name: 'type',
            options: [
              [ScratchBlocks.Msg.AISTARTER_STRING_UPPER, 'toUpperCase'],
              [ScratchBlocks.Msg.AISTARTER_STRING_LOWER, 'toLowerCase']
            ]
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['shape_statement']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_string_trim = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.AISTARTER_STRING_TRIM,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['shape_statement']
      });
    }
  };
  ScratchBlocks.Blocks.AIStarter_String_Begin = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.WHETHER_BEGIN,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          },
          {
            type: 'input_value',
            name: 'beginString'
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_boolean']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_String_End = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.WHETHER_END,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          },
          {
            type: 'input_value',
            name: 'endString'
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_boolean']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_String_DataTypeChange = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.AISTARTER_STRING_DATATYPECHANGE,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          },
          {
            type: 'field_dropdown',
            name: 'type',
            options: [
              [ScratchBlocks.Msg.AISTARTER_STRING_STRINGTYPE, 'String'],
              [ScratchBlocks.Msg.AISTARTER_STRING_CHARTYPE, 'char'],
              [ScratchBlocks.Msg.AISTARTER_STRING_BYTETYPE, 'byte'],
              [ScratchBlocks.Msg.AISTARTER_STRING_INTTYPE, 'int'],
              [ScratchBlocks.Msg.AISTARTER_STRING_LONGTYPE, 'long'],
              [ScratchBlocks.Msg.AISTARTER_STRING_FLOATTYPE, 'float']
            ]
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_string']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_String_getLength = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.AISTARTER_STRING_GETLENGTH,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_number']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_String_charAt = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.AISTARTER_STRING_CHARAT,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          },
          {
            type: 'input_value',
            name: 'inputNumber'
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_number']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_String_Base = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.AISTARTER_STRING_BASE,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          },
          {
            type: 'field_dropdown',
            name: 'type',
            options: [
              [ScratchBlocks.Msg.AISTARTER_STRING_BINARY, 'BIN'],
              [ScratchBlocks.Msg.AISTARTER_STRING_OCTAL, 'OCT'],
              [ScratchBlocks.Msg.AISTARTER_STRING_DECIMAL, 'DEC'],
              [ScratchBlocks.Msg.AISTARTER_STRING_HEX, 'HEX']
            ]
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_string']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_String_ASCLL2char = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.AISTARTER_STRING_ASCLL2CHAR,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_string']
      });
    }
  };
  ScratchBlocks.Blocks.AIStarter_String_char2ASCLL = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.AISTARTER_STRING_CHAR2ASCLL,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_string']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_String_KeepDecimals = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.AISTARTER_STRING_KEEPDECIMALS,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          },
          {
            type: 'input_value',
            name: 'inputNumber'
          }
        ],
        colour: colors[15].colour,
        colourSecondary: colors[15].secondaryColour,
        colourTertiary: colors[15].secondaryColour,
        category: ScratchBlocks.Categories.aistarter,
        extensions: ['output_number']
      });
    }
  };
};
