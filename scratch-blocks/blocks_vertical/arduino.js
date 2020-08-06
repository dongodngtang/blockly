
'use strict';

goog.provide('Blockly.Blocks.arduino');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

goog.require('Blockly.constants');

goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['arduino_analog_in_option'] = {
  /**
   * enum of devices uses one pin
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_analog_in_option",
      "message0": Blockly.Msg.ARDUINO_ANALOG_IN_OPTION,
      "args0": [{
        "type": "field_dropdown",
        "name": "ARDUINO_ANALOG_IN_OPTION",
        "options": [
          ['a0', 'A0'],
          ['a1', 'A1'],
          ['a2', 'A2'],
          ['a3', 'A3'],
          ['a4', 'A4'],
          ['a5', 'A5']
        ]
      }],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_ANALOG_IN_OPTION_TOOLTIP,
      "extensions": ["colours_arduino", "output_number"]
    });
  }
};

Blockly.Blocks['arduino_pwm_option'] = {
  /**
   * enum of devices uses one pin
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_pwm_option",
      "message0": Blockly.Msg.ARDUINO_PWM_OPTION,
      "args0": [{
        "type": "field_dropdown",
        "name": "ARDUINO_PWM_OPTION",
        "options": [
          ['3', '3'],
          ['5', '5'],
          ['9', '9'],
          ['10', '10'],
          ['11', '11']
        ]
      }],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_PWM_OPTION_TOOLTIP,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['arduino_pin_mode_option'] = {
  /**
   * enum of devices uses one pin
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_pin_mode_option",
      "message0": Blockly.Msg.ARDUINO_PIN_MODE_OPTION,
      "args0": [{
        "type": "field_dropdown",
        "name": "ARDUINO_PIN_MODE_OPTION",
        "options": [
          [Blockly.Msg.ARDUINO_INPUT, 'INPUT'],
          [Blockly.Msg.ARDUINO_OUTPUT, 'OUTPUT']
        ]
      }],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_PIN_MODE_OPTION_TOOLTIP,
      "extensions": ["colours_arduino", "output_number"]
    });
  }
};

Blockly.Blocks['arduino_level_option'] = {
  /**
   * enum of devices uses one pin
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_level_option",
      "message0": Blockly.Msg.ARDUINO_LEVEL_OPTION,
      "args0": [{
        "type": "field_dropdown",
        "name": "ARDUINO_LEVEL_OPTION",
        "options": [
          [Blockly.Msg.ARDUINO_HIGH, '1'],
          [Blockly.Msg.ARDUINO_LOW, '0']
        ]
      }],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_LEVEL_OPTION_TOOLTIP,
      "extensions": ["colours_arduino", "output_number"]
    });
  }
};

Blockly.Blocks['arduino_digital_write'] = {
  /**
   * digital write
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_digital_write",
      "message0": Blockly.Msg.ARDUINO_DIGITAL_WRITE,
      "args0": [{
        "type": "input_value",
        "name": "PINNUM"
      },
      {
        "type": "field_dropdown",
        "name": "ARDUINO_LEVEL_OPTION",
        "options": [
          [Blockly.Msg.MAGICIAN_OPTIONS_Magician_HIGH, '1'],
          [Blockly.Msg.MAGICIAN_OPTIONS_Magician_LOW, '0']
        ]
      }
      ],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_DIGITAL_WRITE_TOOLTIP,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['arduino_pwm_write'] = {
  /**
   * digital write
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_pwm_write",
      "message0": Blockly.Msg.ARDUINO_PWM_WRITE,
      "args0": [{
        "type": "input_value",
        "name": "ARDUINO_PWM_OPTION"
      },
      {
        "type": "input_value",
        "name": "PWM"
      }
      ],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_PWM_WRITE_TOOLTIP,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['arduino_digital_read'] = {
  /**
   * digital read
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_pin_ison",
      "message0": Blockly.Msg.ARDUINO_DIGITALREAD,
      "args0": [{
        "type": "input_value",
        "name": "PINNUM"
      }],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_DIGITAL_READ_TOOLTIP,
      "extensions": ["colours_arduino", "output_boolean"]
    });
  }
};

Blockly.Blocks['arduino_pin_mode'] = {
  /**
   * pin mode
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_pin_mode",
      "message0": Blockly.Msg.ARDUINO_PINMODE,
      "args0": [{
        "type": "input_value",
        "name": "PINNUM"
      },
      {
        "type": "input_value",
        "name": "ARDUINO_PIN_MODE_OPTION"
      }
      ],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_PIN_MODE_TOOLTIP,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['arduino_pin_value'] = {
  /**
   * return pin level
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_pin_value",
      "message0": Blockly.Msg.ARDUINO_PIN_VALUE,
      "args0": [{
        "type": "input_value",
        "name": "PINNUM"
      }],
      "colour": Blockly.Colours.arduino.tertiary,
      "colourSecondary": Blockly.Colours.arduino.secondary,
      "colourTertiary": Blockly.Colours.arduino.tertiary,
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_PIN_VALUE_TOOLTIP,
      "extensions": ["colours_arduino", "output_number"]
    });
  }
};

Blockly.Blocks['arduino_analog_read'] = {
  /**
   * return analogread on port
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_analog_read",
      "message0": Blockly.Msg.ARDUINO_ANALOGREAD,
      "args0": [{
        "type": "input_value",
        "name": "PINNUM"
      }],
      "colour": Blockly.Colours.arduino.tertiary,
      "colourSecondary": Blockly.Colours.arduino.secondary,
      "colourTertiary": Blockly.Colours.arduino.tertiary,
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_ANALOG_READ_TOOLTIP,
      "extensions": ["colours_arduino", "output_number"]
    });
  }
};

Blockly.Blocks['arduino_tone'] = {
  /**
   * tone(pin, frequency, duration)
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_tone",
      "message0": Blockly.Msg.ARDUINO_TONE,
      "args0": [{
        "type": "input_value",
        "name": "PINNUM"
      },
      {
        "type": "input_value",
        "name": "FREQUENCY"
      },
      {
        "type": "input_value",
        "name": "DURATION"
      }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_TONE_TOOLTIP,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['arduino_map'] = {
  /**
   * tone(pin, frequency, duration)
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_map",
      "message0": Blockly.Msg.ARDUINO_MAP,
      "args0": [{
        "type": "input_value",
        "name": "VAL"
      },
      {
        "type": "input_value",
        "name": "FROMLOW"
      },
      {
        "type": "input_value",
        "name": "FROMHIGH"
      },
      {
        "type": "input_value",
        "name": "TOLOW"
      },
      {
        "type": "input_value",
        "name": "TOHIGH"
      }
      ],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_MAP_TOOLTIP,
      "extensions": ["colours_arduino", "output_number"]
    });
  }
};

Blockly.Blocks['arduino_servo'] = {
  /**
   * servo(pin, angle)
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_servo",
      "message0": Blockly.Msg.ARDUINO_SERVO,
      "args0": [{
        "type": "input_value",
        "name": "PINNUM"
      },
      {
        "type": "input_value",
        "name": "ANGLE"
      }
      ],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_SERVO_TOOLTIP,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['arduino_pulsein'] = {
  /**
   * ultrasonicsensor(pintrig, pinecho)
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_pulsein",
      "message0": Blockly.Msg.ARDUINO_PULSEIN,
      "args0": [{
        "type": "input_value",
        "name": "PINNUM"
      },
      {
        "type": "input_value",
        "name": "TIMEOUT"
      }
      ],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_PULSEIN_TOOLTIP,
      "extensions": ["colours_arduino", "output_number"]
    });
  }
};

Blockly.Blocks['arduino_println'] = {
  /**
   * serial println
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_println",
      "message0": Blockly.Msg.ARDUINO_PRINTLN,
      "args0": [{
        "type": "input_value",
        "name": "TEXT"
      }],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_PRINTLN_TOOLTIP,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['arduino_print'] = {
  /**
   * serial print
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "arduino_print",
      "message0": Blockly.Msg.ARDUINO_PRINT,
      "args0": [{
        "type": "input_value",
        "name": "TEXT"
      }],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_PRINT_TOOLTIP,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['arduino_setBaudrate'] = {
  init: function () {
    this.jsonInit({
      "id": "arduino_setBaudrate",
      "message0": Blockly.Msg.ARDUINO_SETBAUDRATE,
      "args0": [{
        "type": "input_value",
        "name": "BAUDRATE"
      }],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_SET_BAUDRATE_TOOLTIP,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['arduino_setBaudrate2'] = {
  init: function () {
    this.jsonInit({
      "id": "arduino_setBaudrate2",
      "message0": Blockly.Msg.ARDUINO_SETBAUDRATE2,
      "args0": [{
        "type": "input_value",
        "name": "BAUDRATE"
      }],
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_SET_BAUDRATE2_TOOLTIP,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['arduino_serial_available'] = {
  init: function () {
    this.jsonInit({
      "id": "arduino_serial_available",
      "message0": Blockly.Msg.ARDUINO_SERIAL_AVAILABLE,
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_SERIAL_AVAILABLE_TOOLTIP,
      "extensions": ["colours_arduino", "output_number"]
    });
  }
};

Blockly.Blocks['arduino_serial_read'] = {
  init: function () {
    this.jsonInit({
      "id": "arduino_serial_read",
      "message0": Blockly.Msg.ARDUINO_SERIAL_READ,
      "category": Blockly.Categories.arduino,
      "tooltip": Blockly.Msg.ARDUINO_SERIAL_READ_TOOLTIP,
      "extensions": ["colours_arduino", "output_number"]
    });
  }
};
