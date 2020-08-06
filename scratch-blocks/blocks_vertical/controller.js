'use strict';

goog.provide('Blockly.Blocks.controller');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

goog.require('Blockly.constants');

goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['Controller_Analog_output'] = {
  init: function () {
    this.jsonInit({
      "id": "Controller_Analog_output",
      "message0": Blockly.Msg.CONTROLLER_OUT_ANALOG_SIGNAL,
      "args0": [{
        "type": "input_value",
        "name": "eio"
      },
      {
        "type": "input_value",
        "name": "value"
      }
      ],
      "tooltip": Blockly.Msg.CONTROLLER_OUT_ANALOG_SIGNAL_TOOLTIP,
      "extensions": ["colours_controller", "shape_statement"]
    });
  }
};

Blockly.Blocks['Controller_Digital_output'] = {
  init: function () {
    this.jsonInit({
      "id": "Controller_Digital_output",
      "message0": Blockly.Msg.CONTROLLER_OUT_DIGITAL_SIGNAL,
      "args0": [{
        "type": "input_value",
        "name": "eio"
      },
      {
        "type": "input_value",
        "name": "level"
      }
      ],
      "tooltip": Blockly.Msg.CONTROLLER_OUT_DIGITAL_SIGNAL_TOOLTIP,
      "extensions": ["colours_controller", "shape_statement"]
    });
  }
};

Blockly.Blocks['Controller_Set_Pin'] = {
  init: function () {
    this.jsonInit({
      "id": "Controller_Set_Pin",
      "message0": Blockly.Msg.CONTROLLER_SET_PIN,
      "args0": [{
        "type": "field_dropdown",
        "name": "eio",
        "options": [
          ['EIO16', '16'],
          ['EIO17', '17'],
          ['EIO18', '18'],
          ['EIO19', '19'],
          ['EIO20', '20'],
          ['EIO21', '21'],
          ['EIO22', '22'],
          ['EIO23', '23'],
          ['EIO24', '24']
        ]
      },
      {
        "type": "field_dropdown",
        "name": "mode",
        "options": [
          [Blockly.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DUMMY, '0'],
          [Blockly.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DO, '1'],
          [Blockly.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_PWM, '2'],
          [Blockly.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DI, '3'],
          [Blockly.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_ADC, '4'],
          [Blockly.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DIPU, '5'],
          [Blockly.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DIPD, '6']
        ]
      }
      ],
      "tooltip": Blockly.Msg.CONTROLLER_SET_PIN_TOOLTIP,
      "extensions": ["colours_controller", "shape_statement"]
    });
  }
};

Blockly.Blocks['Controller_SetIOPWM'] = {
  init: function () {
    this.jsonInit({
      "id": "Controller_SetIOPWM",
      "message0": Blockly.Msg.CONTROLLER_SET_PWM,
      "args0": [{
        "type": "input_value",
        "name": "eio"
      },
      {
        "type": "input_value",
        "name": "frequency"
      },
      {
        "type": "input_value",
        "name": "dutyCycle"
      }
      ],
      "tooltip": Blockly.Msg.CONTROLLER_SET_PWM_TOOLTIP,
      "extensions": ["colours_controller", "shape_statement"]
    });
  }
};

Blockly.Blocks['Controller_digital_read'] = {
  init: function () {
    this.jsonInit({
      "id": "Controller_digital_read",
      "message0": Blockly.Msg.CONTROLLER_READ_DIGIGTAL,
      "args0": [{
        "type": "input_value",
        "name": "PINNUM"
      }],
      "tooltip": Blockly.Msg.CONTROLLER_READ_DIGIGTAL_TOOLTIP,
      "extensions": ["colours_controller", "output_number"]
    });
  }
};

Blockly.Blocks['Controller_digital_read_bool'] = {
  init: function () {
    this.jsonInit({
      "id": "Controller_digital_read_bool",
      "message0": Blockly.Msg.CONTROLLER_READ_DIGIGTAL,
      "args0": [{
        "type": "input_value",
        "name": "PINNUM"
      }],
      "tooltip": Blockly.Msg.CONTROLLER_READ_DIGIGTAL_TOOLTIP,
      "extensions": ["colours_controller", "output_boolean"]
    });
  }
};

Blockly.Blocks['Controller_analog_read'] = {
  init: function () {
    this.jsonInit({
      "id": "Controller_analog_read",
      "message0": Blockly.Msg.CONTROLLER_READ_ANALOG,
      "args0": [{
        "type": "input_value",
        "name": "eio"
      }],
      "tooltip": Blockly.Msg.CONTROLLER_READ_ANALOG_TOOLTIP,
      "extensions": ["colours_controller", "output_number"]
    });
  }
};

// Blockly.Blocks['Controller_SetServo'] = {
//   init: function () {
//     this.jsonInit({
//       "id": "Controller_SetServo",
//       "message0": Blockly.Msg.CONTROLLER_SET_SERVO,
//       "args0": [{
//           "type": "input_value",
//           "name": "eio"
//         },
//         {
//           "type": "input_value",
//           "name": "angle"
//         }
//       ],
//       "tooltip": Blockly.Msg.CONTROLLER_SET_SERVO_TOOLTIP,
//       "extensions": ["colours_controller", "shape_statement"]
//     });
//   }
// };

Blockly.Blocks['Controller_SetStepperMotor'] = {
  init: function () {
    this.jsonInit({
      "id": "Controller_SetStepperMotor",
      "message0": Blockly.Msg.CONTROLLER_SET_STEPPER,
      "args0": [{
        "type": "input_value",
        "name": "velocity"
      },
      {
        "type": "input_value",
        "name": "acceleration"
      }
      ],
      "tooltip": Blockly.Msg.CONTROLLER_SET_STEPPER_TOOLTIP,
      "extensions": ["colours_controller", "shape_statement"]
    });
  }
};

Blockly.Blocks['Controller_SetStepperMotorNum'] = {
  init: function () {
    this.jsonInit({
      "id": "Controller_SetStepperMotorNum",
      "message0": Blockly.Msg.CONTROLLER_SET_STEPPER_NUM,
      "args0": [{
        "type": "input_value",
        "name": "velocity"
      },
      {
        "type": "input_value",
        "name": "acceleration"
      },
      {
        "type": "input_value",
        "name": "num"
      }
      ],
      "tooltip": Blockly.Msg.CONTROLLER_SET_STEPPER_NUM_TOOLTIP,
      "extensions": ["colours_controller", "shape_statement"]
    });
  }
};

Blockly.Blocks['Controller_SetConveyor'] = {
  init: function () {
    this.jsonInit({
      "id": "Controller_SetConveyor",
      "message0": Blockly.Msg.CONTROLLER_SET_CONVEYOR,
      "args0": [{
        "type": "input_value",
        "name": "velocity"
      },
      {
        "type": "input_value",
        "name": "acceleration"
      }
      ],
      "tooltip": Blockly.Msg.CONTROLLER_SET_CONVEYOR_TOOLTIP,
      "extensions": ["colours_controller", "shape_statement"]
    });
  }
};
