import Blockly from 'scratch-blocks';

export const arduinoCommonBlocks = (intl, runtime) => {
  Blockly.Blocks.Arduino_Break = {
    init: function () {
      this.jsonInit({
        id: 'Arduino_Break',
        message0: intl.messages.ARDUINO_BREAK,
        category: Blockly.Categories.control,
        tooltip: intl.messages.Arduino_Break_Tooltip,
        extensions: ['colours_control', 'shape_statement']
      });
    }
  };

  Blockly.Blocks.Arduino_For = {
    init: function() {
      this.jsonInit({
        id: 'Arduino_For',
        message0: intl.messages.ARDUINO_FOR,
        message1: intl.messages.ARDUINO_FOR_EXEC, // Statement
        message2: '%1', // Icon
        lastDummyAlign2: 'RIGHT',
        category: Blockly.Categories.control,
        tooltip: intl.messages.Arduino_For_Tooltip,
        extensions: ['colours_control', 'shape_statement'],
        args0: [
          {
            type: 'field_variable',
            name: 'VAR',
            variable: null
          },
          {
            type: 'input_value',
            name: 'FROM'
          },
          {
            type: 'input_value',
            name: 'TO'
          },
          {
            type: 'input_value',
            name: 'BY'
          }
        ],
        args1: [
          {
            type: 'input_statement',
            name: 'SUBSTACK'
          }
        ],
        args2: [
          {
            type: 'field_image',
            src: `${Blockly.mainWorkspace.options.pathToMedia}repeat.svg`,
            width: 24,
            height: 24,
            alt: '*',
            flip_rtl: true
          }
        ]
      });
    }
  };

  Blockly.Blocks.Arduino_Start = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.ARDUINO_START,
        extensions: ['colours_event', 'shape_hat']
      });
    }
  };

  Blockly.Blocks.Arduino_Control_Forever = {
    init: function() {
      this.jsonInit({
        id: 'Arduino_Control_Forever',
        message0: '%1 %2',
        args0: [
          {
            type: 'input_statement',
            name: 'SUBSTACK'
          },
          {
            type: 'field_image',
            src: `${Blockly.mainWorkspace.options.pathToMedia}icons/control_forever.svg`,
            width: 40,
            height: 40,
            alt: '*',
            flip_rtl: true
          }
        ],
        inputsInline: true,
        previousStatement: null,
        category: Blockly.Categories.control,
        colour: Blockly.Colours.control.primary,
        colourSecondary: Blockly.Colours.control.secondary,
        colourTertiary: Blockly.Colours.control.tertiary
      });
    }
  };
};
