'use strict';

goog.provide('Blockly.Blocks.magician');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

goog.require('Blockly.constants');

goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['Magician_Home'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Home",
      "message0": Blockly.Msg.MAGICIAN_HOME,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      }],
      "tooltip": Blockly.Msg.MAGICIAN_HOME_TOOLTIP,
      "extensions": ["colours_magician_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetEndFixture'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetEndFixture",
      "message0": Blockly.Msg.MAGICIAN_SET_END_FIXTURE,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "BTN",
        "options": [
          [Blockly.Msg.MAGICIAN_OPTIONS_SET_END_FIXTURE_GRIPPER_AND_SUCTION_CUP, '59.7'],
          [Blockly.Msg.MAGICIAN_OPTIONS_SET_END_FIXTURE_LASER, '70'],
          [Blockly.Msg.MAGICIAN_OPTIONS_SET_END_FIXTURE_PEN, '61']
        ]
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_END_FIXTURE_TOOLTIP,
      "extensions": ["colours_magician_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetPTPCommonParams'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetPTPCommonParams",
      "message0": Blockly.Msg.MAGICIAN_SET_PTP_COMMON_PARAMS,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "input_value",
        "name": "velocity"
      },
      {
        "type": "input_value",
        "name": "acceleration"
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_PTP_COMMON_PARAMS_TOOLTIP,
      "extensions": ["colours_magician_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetPTPJointParams'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetPTPJointParams",
      "message0": Blockly.Msg.MAGICIAN_SET_PTP_JOINT_PARAMS,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "input_value",
        "name": "velocity"
      },
      {
        "type": "input_value",
        "name": "acceleration"
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_PTP_JOINT_PARAMS_TOOLTIP,
      "extensions": ["colours_magician_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetPTPCoordinateParams'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetPTPCoordinateParams",
      "message0": Blockly.Msg.MAGICIAN_SET_PTP_COORDINATE_PARAMS,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "input_value",
        "name": "xyzVelocity"
      },
      {
        "type": "input_value",
        "name": "rVelocity"
      },
      {
        "type": "input_value",
        "name": "xyzAcceleration"
      },
      {
        "type": "input_value",
        "name": "rAccleration"
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_PTP_COORDINATE_PARAMS_TOOLTIP,
      "extensions": ["colours_magician_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetPTPLParams'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetPTPLParams",
      "message0": Blockly.Msg.MAGICIAN_SET_PTPL_PARAMS,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "input_value",
        "name": "velocity"
      },
      {
        "type": "input_value",
        "name": "acceleration"
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_PTPL_PARAMS_TOOLTIP,
      "extensions": ["colours_magician_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetPTPJumpParams'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetPTPJumpParams",
      "message0": Blockly.Msg.MAGICIAN_SET_PTP_JUMP_PARAMS,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "input_value",
        "name": "jumpHeight"
      },
      {
        "type": "input_value",
        "name": "zLimit"
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_PTP_JUMP_PARAMS_TOOLTIP,
      "extensions": ["colours_magician_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetLostStepParams'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetLostStepParams",
      "message0": Blockly.Msg.MAGICIAN_SET_LOST_STEP_PARAMS,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "input_value",
        "name": "threshold"
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_LOST_STEP_PARAMS_TOOLTIP,
      "extensions": ["colours_magician_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetLostStep'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetLostStep",
      "message0": Blockly.Msg.MAGICIAN_SET_LOST_STEP,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      }],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_LOST_STEP_TOOLTIP,
      "extensions": ["colours_magician_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_JumpTo'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_JumpTo",
      "message0": Blockly.Msg.MAGICIAN_JUMP_TO,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "input_value",
        "name": "x"
      },
      {
        "type": "input_value",
        "name": "y"
      },
      {
        "type": "input_value",
        "name": "z"
      },
      {
        "type": "input_value",
        "name": "r"
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_JUMP_TO_TOOLTIP,
      "extensions": ["colours_magician_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Goto'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Goto",
      "message0": Blockly.Msg.MAGICIAN_GOTO,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "input_value",
        "name": "x"
      },
      {
        "type": "input_value",
        "name": "y"
      },
      {
        "type": "input_value",
        "name": "z"
      },
      {
        "type": "input_value",
        "name": "r"
      },
      {
        "type": "field_dropdown",
        "name": "moveType",
        "options": [
          [Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_GOTO_STRAIGHT, '2'],
          [Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_GOTO_JOINT, '1']
        ]
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_GOTO_TOOLTIP,
      "extensions": ["colours_magician_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_MoveDistance'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_MoveDistance",
      "message0": Blockly.Msg.MAGICIAN_MOVE_DISTANCE,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "input_value",
        "name": "x"
      },
      {
        "type": "input_value",
        "name": "y"
      },
      {
        "type": "input_value",
        "name": "z"
      },
      {
        "type": "input_value",
        "name": "r"
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_MOVE_DISTANCE_TOOLTIP,
      "extensions": ["colours_magician_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetR'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetR",
      "message0": Blockly.Msg.MAGICIAN_SET_R,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "input_value",
        "name": "r"
      },
      {
        "type": "field_dropdown",
        "name": "ptpMode",
        "options": [
          [Blockly.Msg.MAGICIAN_SET_R_RELATIVE_COORDINATES, '1'],
          [Blockly.Msg.MAGICIAN_SET_R_ABSOLUTE_COORDINATES, '4']
        ]
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_R_TOOLTIP,
      "extensions": ["colours_magician_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_CheckLostStep'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_CheckLostStep",
      "message0": Blockly.Msg.MAGICIAN_CHECK_LOST_STEP,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      }],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_CHECK_LOST_STEP_TOOLTIP,
      "extensions": ["colours_magician_status", "output_boolean"]
    });
  }
};
Blockly.Blocks['Magician_ClearAllAlarmsState'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_ClearAllAlarmsState",
      "message0": Blockly.Msg.MAGICIAN_CLEAR_ALL_ALARMS_STATE,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      }],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_CLEAR_ALL_ALARMS_STATE_TOOLTIP,
      "extensions": ["colours_magician_status", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetJointAngle'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetJointAngle",
      "message0": Blockly.Msg.MAGICIAN_SET_JOINT_ANGLE,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "input_value",
        "name": "Joint1"
      },
      {
        "type": "input_value",
        "name": "Joint2"
      },
      {
        "type": "input_value",
        "name": "Joint3"
      },
      {
        "type": "input_value",
        "name": "Joint4"
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_JOINT_ANGLE_TOOLTIP,
      "extensions": ["colours_magician_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetSuctionCup'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetSuctionCup",
      "message0": Blockly.Msg.MAGICIAN_SET_SUCTION_CUP,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "status",
        "options": [
          [Blockly.Msg.MAGICIAN_OPTIONS_Magician_SUCKER_ON, '1'],
          [Blockly.Msg.MAGICIAN_OPTIONS_Magician_SUCKER_OFF, '0']
        ]
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_SUCTION_CUP_TOOLTIP,
      "extensions": ["colours_magician_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Gripper'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Gripper",
      "message0": Blockly.Msg.MAGICIAN_GRIPPER,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "status",
        "options": [
          [Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_GRIPPER_GRIP, 'Grip'],
          [Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_GRIPPER_RELEASE, 'Release'],
          [Blockly.Msg.MAGICIAN_OPTIONS_Magician_GRIPPER_OFF, 'OFF']
        ]
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_GRIPPER_TOOLTIP,
      "extensions": ["colours_magician_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetIOMultiplexing'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetIOMultiplexing",
      "message0": Blockly.Msg.MAGICIAN_SET_IO_MULTIPLEXING,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "eio",
        "options": [
          ['EIO1', '1'],
          ['EIO2', '2'],
          ['EIO3', '3'],
          ['EIO4', '4'],
          ['EIO5', '5'],
          ['EIO6', '6'],
          ['EIO7', '7'],
          ['EIO8', '8'],
          ['EIO9', '9'],
          ['EIO10', '10'],
          ['EIO11', '11'],
          ['EIO12', '12'],
          ['EIO13', '13'],
          ['EIO14', '14'],
          ['EIO15', '15'],
          ['EIO16', '16'],
          ['EIO17', '17'],
          ['EIO18', '18'],
          ['EIO19', '19'],
          ['EIO20', '20']
        ]
      },
      {
        "type": "field_dropdown",
        "name": "mode",
        "options": [
          [Blockly.Msg.MAGICIAN_MULTIPLEXING_MODE_IO_FUNCTION_DUMMY, '0'],
          [Blockly.Msg.MAGICIAN_MULTIPLEXING_MODE_IO_FUNCTION_DO, '1'],
          [Blockly.Msg.MAGICIAN_MULTIPLEXING_MODE_IO_FUNCTION_PWM, '2'],
          [Blockly.Msg.MAGICIAN_MULTIPLEXING_MODE_IO_FUNCTION_DI, '3'],
          [Blockly.Msg.MAGICIAN_MULTIPLEXING_MODE_IO_FUNCTION_ADC, '4'],
          [Blockly.Msg.MAGICIAN_MULTIPLEXING_MODE_IO_FUNCTION_DIPU, '5'],
          [Blockly.Msg.MAGICIAN_MULTIPLEXING_MODE_IO_FUNCTION_DIPD, '6']
        ]
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_IO_MULTIPLEXING_TOOLTIP,
      "extensions": ["colours_magician_io", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetLeaveIOutput'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetLeaveIOutput",
      "message0": Blockly.Msg.MAGICIAN_SET5_V_OUTPUT,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "eio",
        "options": [
          ['EIO1', '1'],
          ['EIO2', '2'],
          ['EIO3', '3'],
          ['EIO4', '4'],
          ['EIO5', '5'],
          ['EIO6', '6'],
          ['EIO7', '7'],
          ['EIO8', '8'],
          ['EIO9', '9'],
          ['EIO10', '10'],
          ['EIO11', '11'],
          ['EIO12', '12'],
          ['EIO13', '13'],
          ['EIO14', '14'],
          ['EIO15', '15'],
          ['EIO16', '16'],
          ['EIO17', '17'],
          ['EIO18', '18'],
          ['EIO19', '19'],
          ['EIO20', '20']
        ]
      },
      {
        "type": "field_dropdown",
        "name": "IsEnable",
        "options": [
          [Blockly.Msg.MAGICIAN_OPTIONS_Magician_HIGH, '1'],
          [Blockly.Msg.MAGICIAN_OPTIONS_Magician_LOW, '0']
        ]
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET5_V_OUTPUT_TOOLTIP,
      "extensions": ["colours_magician_io", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetPWMOutput'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetPWMOutput",
      "message0": Blockly.Msg.MAGICIAN_SET_PWM_OUTPUT,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "eio",
        "options": [
          ['EIO1', '1'],
          ['EIO2', '2'],
          ['EIO3', '3'],
          ['EIO4', '4'],
          ['EIO5', '5'],
          ['EIO6', '6'],
          ['EIO7', '7'],
          ['EIO8', '8'],
          ['EIO9', '9'],
          ['EIO10', '10'],
          ['EIO11', '11'],
          ['EIO12', '12'],
          ['EIO13', '13'],
          ['EIO14', '14'],
          ['EIO15', '15'],
          ['EIO16', '16'],
          ['EIO17', '17'],
          ['EIO18', '18'],
          ['EIO19', '19'],
          ['EIO20', '20']
        ]
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
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_PWM_OUTPUT_TOOLTIP,
      "extensions": ["colours_magician_io", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetMotorSpeed'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetMotorSpeed",
      "message0": Blockly.Msg.MAGICIAN_SET_MOTOR_SPEED,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "Motor",
        "options": [
          [Blockly.Msg.MAGICIAN_OPTIONS_Magician_STEPPER1, '0'],
          [Blockly.Msg.MAGICIAN_OPTIONS_Magician_STEPPER2, '1']
        ]
      },
      {
        "type": "input_value",
        "name": "Speed"
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_MOTOR_SPEED_TOOLTIP,
      "extensions": ["colours_magician_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_SetMotorSpeedAndDistance'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetMotorSpeedAndDistance",
      "message0": Blockly.Msg.MAGICIAN_SET_MOTOR_SPEED_AND_DISTANCE,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "Motor",
        "options": [
          [Blockly.Msg.MAGICIAN_OPTIONS_Magician_STEPPER1, '0'],
          [Blockly.Msg.MAGICIAN_OPTIONS_Magician_STEPPER2, '1']
        ]
      },
      {
        "type": "input_value",
        "name": "Speed"
      },
      {
        "type": "input_value",
        "name": "Distance"
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_MOTOR_SPEED_AND_DISTANCE_TOOLTIP,
      "extensions": ["colours_magician_setting", "shape_statement"]
    });
  }
};
// Blockly.Blocks['Magician_SetLaser'] = {
//   init: function() {
//     this.jsonInit({
//       "id": "Magician_SetLaser",
//       "message0": Blockly.Msg.MAGICIAN_SET_LASER,
//       "args0": [{
//         "type": "field_image",
//         "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
//         "width": 40,
//         "height": 40
//       },
//       {
//         "type": "field_dropdown",
//         "name": "IsEnable",
//         "options": [
//           [Blockly.Msg.MAGICIAN_OPTIONS_Magician_ON, '0'],
//           [Blockly.Msg.MAGICIAN_OPTIONS_Magician_OFF, '1']
//         ]
//       },
//       {
//         "type": "input_value",
//         "name": "Power"
//       }
//       ],
//       "category": Blockly.Categories.magician,
//       "tooltip": Blockly.Msg.MAGICIAN_SET_LASER_TOOLTIP,
//       "extensions": ["colours_magician_setting", "shape_statement"]
//     });
//   }
// };
// Blockly.Blocks['Magician_SetPhotoelectricSensor'] = {
//   init: function() {
//     this.jsonInit({
//       "id": "Magician_SetPhotoelectricSensor",
//       "message0": Blockly.Msg.MAGICIAN_SET_PHOTOELECTRIC_SENSOR,
//       "args0": [{
//         "type": "field_image",
//         "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
//         "width": 40,
//         "height": 40
//       },
//       {
//         "type": "field_dropdown",
//         "name": "IsEnable",
//         "options": [
//           [Blockly.Msg.MAGICIAN_OPTIONS_Magician_ON, '0'],
//           [Blockly.Msg.MAGICIAN_OPTIONS_Magician_OFF, '1']
//         ]
//       },
//       {
//         "type": "field_dropdown",
//         "name": "Version",
//         "options": [
//           [Blockly.Msg.MAGICIAN_OPTIONS_Magician_V1, '0'],
//           [Blockly.Msg.MAGICIAN_OPTIONS_Magician_V2, '1']
//         ]
//       },
//       {
//         "type": "field_dropdown",
//         "name": "port",
//         "options": [
//           ['GP1', '0'],
//           ['GP2', '1'],
//           ['GP3', '2'],
//           ['GP4', '3'],
//           ['GP5', '4']
//         ]
//       }
//       ],
//       "category": Blockly.Categories.magician,
//       "tooltip": Blockly.Msg.MAGICIAN_SET_PHOTOELECTRIC_SENSOR_TOOLTIP,
//       "extensions": ["colours_magician_setting", "shape_statement"]
//     });
//   }
// };
Blockly.Blocks['Magician_SetConveyor'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_SetConveyor",
      "message0": Blockly.Msg.MAGICIAN_SET_CONVEYOR,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "Motor",
        "options": [
          [Blockly.Msg.MAGICIAN_OPTIONS_Magician_STEPPER1, '0'],
          [Blockly.Msg.MAGICIAN_OPTIONS_Magician_STEPPER2, '1']
        ]
      },
      {
        "type": "input_value",
        "name": "Speed"
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_SET_CONVEYOR_TOOLTIP,
      "extensions": ["colours_magician_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_GetCurrentCoordinate'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_GetCurrentCoordinate",
      "message0": Blockly.Msg.MAGICIAN_GET_CURRENT_COORDINATE,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "coordinate",
        "options": [
          ['X', '1'],
          ['Y', '2'],
          ['Z', '3'],
          ['R', '4']
        ]
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_GET_CURRENT_COORDINATE_TOOLTIP,
      "extensions": ["colours_magician_status", "output_number"]
    });
  }
};
Blockly.Blocks['Magician_GetJointAngle'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_GetJointAngle",
      "message0": Blockly.Msg.MAGICIAN_GET_JOINT_ANGLE,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "joint",
        "options": [
          [Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_JOINT1, '1'],
          [Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_JOINT2, '2'],
          [Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_JOINT3, '3'],
          [Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_JOINT4, '4']
        ]
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_GET_JOINT_ANGLE_TOOLTIP,
      "extensions": ["colours_magician_status", "output_number"]
    });
  }
};
Blockly.Blocks['Magician_GetIODI'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_GetIODI",
      "message0": Blockly.Msg.MAGICIAN_GET_IODI,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "eio",
        "options": [
          ['EIO1', '1'],
          ['EIO2', '2'],
          ['EIO3', '3'],
          ['EIO4', '4'],
          ['EIO5', '5'],
          ['EIO6', '6'],
          ['EIO7', '7'],
          ['EIO8', '8'],
          ['EIO9', '9'],
          ['EIO10', '10'],
          ['EIO11', '11'],
          ['EIO12', '12'],
          ['EIO13', '13'],
          ['EIO14', '14'],
          ['EIO15', '15'],
          ['EIO16', '16'],
          ['EIO17', '17'],
          ['EIO18', '18'],
          ['EIO19', '19'],
          ['EIO20', '20']
        ]
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_GET_IODI_TOOLTIP,
      "extensions": ["colours_magician_io", "output_number"]
    });
  }
};
Blockly.Blocks['Magician_GetIOADC'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_GetIOADC",
      "message0": Blockly.Msg.MAGICIAN_GET_IOADC,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "eio",
        "options": [
          ['EIO1', '1'],
          ['EIO2', '2'],
          ['EIO3', '3'],
          ['EIO4', '4'],
          ['EIO5', '5'],
          ['EIO6', '6'],
          ['EIO7', '7'],
          ['EIO8', '8'],
          ['EIO9', '9'],
          ['EIO10', '10'],
          ['EIO11', '11'],
          ['EIO12', '12'],
          ['EIO13', '13'],
          ['EIO14', '14'],
          ['EIO15', '15'],
          ['EIO16', '16'],
          ['EIO17', '17'],
          ['EIO18', '18'],
          ['EIO19', '19'],
          ['EIO20', '20']
        ]
      }
      ],
      "category": Blockly.Categories.magician,
      "tooltip": Blockly.Msg.MAGICIAN_GET_IOADC_TOOLTIP,
      "extensions": ["colours_magician_io", "output_number"]
    });
  }
};
// Blockly.Blocks['Magician_GetInfraredSensor'] = {
//   init: function() {
//     this.jsonInit({
//       "id": "Magician_GetInfraredSensor",
//       "message0": Blockly.Msg.MAGICIAN_GET_INFRARED_SENSOR,
//       "args0": [{
//         "type": "field_image",
//         "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
//         "width": 40,
//         "height": 40
//       },
//       {
//         "type": "field_dropdown",
//         "name": "port",
//         "options": [
//           ['GP1', '0'],
//           ['GP2', '1'],
//           ['GP3', '2'],
//           ['GP4', '3'],
//           ['GP5', '4']
//         ]
//       }
//       ],
//       "category": Blockly.Categories.magician,
//       "tooltip": Blockly.Msg.MAGICIAN_GET_INFRARED_SENSOR_TOOLTIP,
//       "extensions": ["colours_magician_status", "output_number"]
//     });
//   }
// };
// Blockly.Blocks['Magician_GetColorSensor'] = {
//   init: function() {
//     this.jsonInit({
//       "id": "Magician_GetColorSensor",
//       "message0": Blockly.Msg.MAGICIAN_GET_COLOR_SENSOR,
//       "args0": [{
//         "type": "field_image",
//         "src": Blockly.mainWorkspace.options.pathToMedia + "magician.png",
//         "width": 40,
//         "height": 40
//       },
//       {
//         "type": "field_dropdown",
//         "name": "port",
//         "options": [
//           [Blockly.Msg.MAGICIAN_OPTIONS_COLOR_R, '1'],
//           [Blockly.Msg.MAGICIAN_OPTIONS_COLOR_G, '2'],
//           [Blockly.Msg.MAGICIAN_OPTIONS_COLOR_B, '3']
//         ]
//       }
//       ],
//       "category": Blockly.Categories.magician,
//       "tooltip": Blockly.Msg.MAGICIAN_GET_COLOR_SENSOR_TOOLTIP,
//       "extensions": ["colours_magician_status", "output_number"]
//     });
//   }
// };
