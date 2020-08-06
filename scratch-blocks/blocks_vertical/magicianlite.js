'use strict';

goog.provide('Blockly.Blocks.magicianlite');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

goog.require('Blockly.constants');

goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['Magician_Lite_Home'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_Home",
      "message0": Blockly.Msg.MAGICIAN_LITE_HOME,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      }],
      "tooltip": Blockly.Msg.MAGICIAN_LITE_HOME_TOOLTIP,
      "extensions": ["colours_magician_lite_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetEndFixture'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetEndFixture",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_END_FIXTURE,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "BTN",
        "options": [
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_SET_END_FIXTURE_GRIPPER_AND_SUCTION_CUP, '59.7'],
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_SET_END_FIXTURE_LASER, '70'],
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_SET_END_FIXTURE_PEN, '61']
        ]
      }
      ],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_END_FIXTURE_TOOLTIP,
      "extensions": ["colours_magician_lite_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetPTPCommonParams'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetPTPCommonParams",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_PTP_COMMON_PARAMS,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
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
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_PTP_COMMON_PARAMS_TOOLTIP,
      "extensions": ["colours_magician_lite_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetPTPJointParams'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetPTPJointParams",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_PTP_JOINT_PARAMS,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
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
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_PTP_JOINT_PARAMS_TOOLTIP,
      "extensions": ["colours_magician_lite_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetPTPCoordinateParams'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetPTPCoordinateParams",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_PTP_COORDINATE_PARAMS,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
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
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_PTP_COORDINATE_PARAMS_TOOLTIP,
      "extensions": ["colours_magician_lite_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetPTPLParams'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetPTPLParams",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_PTPL_PARAMS,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
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
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_PTPL_PARAMS_TOOLTIP,
      "extensions": ["colours_magician_lite_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetPTPJumpParams'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetPTPJumpParams",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_PTP_JUMP_PARAMS,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
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
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_PTP_JUMP_PARAMS_TOOLTIP,
      "extensions": ["colours_magician_lite_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetLostStepParams'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetLostStepParams",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_LOST_STEP_PARAMS,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "input_value",
        "name": "threshold"
      }
      ],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_LOST_STEP_PARAMS_TOOLTIP,
      "extensions": ["colours_magician_lite_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetLostStep'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetLostStep",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_LOST_STEP,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      }],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_LOST_STEP_TOOLTIP,
      "extensions": ["colours_magician_lite_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_JumpTo'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_JumpTo",
      "message0": Blockly.Msg.MAGICIAN_LITE_JUMP_TO,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
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
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_JUMP_TO_TOOLTIP,
      "extensions": ["colours_magician_lite_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_Goto'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_Goto",
      "message0": Blockly.Msg.MAGICIAN_LITE_GOTO,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
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
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_GOTO_STRAIGHT, '2'],
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_GOTO_JOINT, '1']
        ]
      }
      ],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_GOTO_TOOLTIP,
      "extensions": ["colours_magician_lite_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_MoveDistance'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_MoveDistance",
      "message0": Blockly.Msg.MAGICIAN_LITE_MOVE_DISTANCE,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
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
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_MOVE_DISTANCE_TOOLTIP,
      "extensions": ["colours_magician_lite_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetR'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetR",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_R,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
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
          [Blockly.Msg.MAGICIAN_LITE_SET_R_RELATIVE_COORDINATES, '1'],
          [Blockly.Msg.MAGICIAN_LITE_SET_R_ABSOLUTE_COORDINATES, '4']
        ]
      }
      ],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_R_TOOLTIP,
      "extensions": ["colours_magician_lite_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_CheckLostStep'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_CheckLostStep",
      "message0": Blockly.Msg.MAGICIAN_LITE_CHECK_LOST_STEP,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      }],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_CHECK_LOST_STEP_TOOLTIP,
      "extensions": ["colours_magician_lite_status", "output_boolean"]
    });
  }
};
Blockly.Blocks['Magician_Lite_ClearAllAlarmsState'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_ClearAllAlarmsState",
      "message0": Blockly.Msg.MAGICIAN_LITE_CLEAR_ALL_ALARMS_STATE,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      }],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_CLEAR_ALL_ALARMS_STATE_TOOLTIP,
      "extensions": ["colours_magician_lite_status", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetJointAngle'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetJointAngle",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_JOINT_ANGLE,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
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
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_JOINT_ANGLE_TOOLTIP,
      "extensions": ["colours_magician_lite_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetSuctionCup'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetSuctionCup",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_SUCTION_CUP,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "status",
        "options": [
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_SUCKER_ON, '1'],
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_SUCKER_OFF, '0']
        ]
      }
      ],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_SUCTION_CUP_TOOLTIP,
      "extensions": ["colours_magician_lite_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_Gripper'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_Gripper",
      "message0": Blockly.Msg.MAGICIAN_LITE_GRIPPER,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "status",
        "options": [
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_GRIPPER_GRIP, 'Grip'],
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_GRIPPER_RELEASE, 'Release'],
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_GRIPPER_OFF, 'OFF']
        ]
      }
      ],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_GRIPPER_TOOLTIP,
      "extensions": ["colours_magician_lite_motion", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetLeaveIOutput'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetLeaveIOutput",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET5_V_OUTPUT,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      },
      {
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
        "name": "IsEnable",
        "options": [
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_HIGH, '0'],
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_LOW, '1']
        ]
      }
      ],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET5_V_OUTPUT_TOOLTIP,
      "extensions": ["colours_magician_lite_io", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetPWMOutput'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetPWMOutput",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_PWM_OUTPUT,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      },
      {
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
        "type": "input_value",
        "name": "frequency"
      },
      {
        "type": "input_value",
        "name": "dutyCycle"
      }
      ],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_PWM_OUTPUT_TOOLTIP,
      "extensions": ["colours_magician_lite_io", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetMotorSpeed'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetMotorSpeed",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_MOTOR_SPEED,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "Motor",
        "options": [
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_STEPPER1, '0'],
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_STEPPER2, '1']
        ]
      },
      {
        "type": "input_value",
        "name": "Speed"
      }
      ],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_MOTOR_SPEED_TOOLTIP,
      "extensions": ["colours_magician_lite_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_SetMotorSpeedAndDistance'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetMotorSpeedAndDistance",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_MOTOR_SPEED_AND_DISTANCE,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "Motor",
        "options": [
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_STEPPER1, '0'],
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_STEPPER2, '1']
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
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_MOTOR_SPEED_AND_DISTANCE_TOOLTIP,
      "extensions": ["colours_magician_lite_setting", "shape_statement"]
    });
  }
};
// Blockly.Blocks['Magician_Lite_SetLaser'] = {
//   init: function() {
//     this.jsonInit({
//       "id": "Magician_Lite_SetLaser",
//       "message0": Blockly.Msg.MAGICIAN_LITE_SET_LASER,
//       "args0": [{
//         "type": "field_image",
//         "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
//         "width": 40,
//         "height": 40
//       },
//       {
//         "type": "field_dropdown",
//         "name": "IsEnable",
//         "options": [
//           [Blockly.Msg.MAGICIAN_LITE_OPTIONS_Magician_Lite_ON, '0'],
//           [Blockly.Msg.MAGICIAN_LITE_OPTIONS_Magician_Lite_OFF, '1']
//         ]
//       },
//       {
//         "type": "input_value",
//         "name": "Power"
//       }
//       ],
//       "category": Blockly.Categories.magicianlite,
//       "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_LASER_TOOLTIP,
//       "extensions": ["colours_magician_lite_setting", "shape_statement"]
//     });
//   }
// };
// Blockly.Blocks['Magician_Lite_SetPhotoelectricSensor'] = {
//   init: function() {
//     this.jsonInit({
//       "id": "Magician_Lite_SetPhotoelectricSensor",
//       "message0": Blockly.Msg.MAGICIAN_LITE_SET_PHOTOELECTRIC_SENSOR,
//       "args0": [{
//         "type": "field_image",
//         "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
//         "width": 40,
//         "height": 40
//       },
//       {
//         "type": "field_dropdown",
//         "name": "IsEnable",
//         "options": [
//           [Blockly.Msg.MAGICIAN_LITE_OPTIONS_Magician_Lite_ON, '0'],
//           [Blockly.Msg.MAGICIAN_LITE_OPTIONS_Magician_Lite_OFF, '1']
//         ]
//       },
//       {
//         "type": "field_dropdown",
//         "name": "Version",
//         "options": [
//           [Blockly.Msg.MAGICIAN_LITE_OPTIONS_Magician_Lite_V1, '0'],
//           [Blockly.Msg.MAGICIAN_LITE_OPTIONS_Magician_Lite_V2, '1']
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
//       "category": Blockly.Categories.magicianlite,
//       "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_PHOTOELECTRIC_SENSOR_TOOLTIP,
//       "extensions": ["colours_magician_lite_setting", "shape_statement"]
//     });
//   }
// };
Blockly.Blocks['Magician_Lite_SetConveyor'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_SetConveyor",
      "message0": Blockly.Msg.MAGICIAN_LITE_SET_CONVEYOR,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "Motor",
        "options": [
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_STEPPER1, '0'],
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_STEPPER2, '1']
        ]
      },
      {
        "type": "input_value",
        "name": "Speed"
      }
      ],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_SET_CONVEYOR_TOOLTIP,
      "extensions": ["colours_magician_lite_setting", "shape_statement"]
    });
  }
};
Blockly.Blocks['Magician_Lite_GetCurrentCoordinate'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_GetCurrentCoordinate",
      "message0": Blockly.Msg.MAGICIAN_LITE_GET_CURRENT_COORDINATE,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
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
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_GET_CURRENT_COORDINATE_TOOLTIP,
      "extensions": ["colours_magician_lite_status", "output_number"]
    });
  }
};
Blockly.Blocks['Magician_Lite_GetJointAngle'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_GetJointAngle",
      "message0": Blockly.Msg.MAGICIAN_LITE_GET_JOINT_ANGLE,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      },
      {
        "type": "field_dropdown",
        "name": "joint",
        "options": [
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_JOINT1, '1'],
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_JOINT2, '2'],
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_JOINT3, '3'],
          [Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_JOINT4, '4']
        ]
      }
      ],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_GET_JOINT_ANGLE_TOOLTIP,
      "extensions": ["colours_magician_lite_status", "output_number"]
    });
  }
};
Blockly.Blocks['Magician_Lite_GetIODI'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_GetIODI",
      "message0": Blockly.Msg.MAGICIAN_LITE_GET_IODI,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      },
      {
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
      }
      ],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_GET_IODI_TOOLTIP,
      "extensions": ["colours_magician_lite_io", "output_number"]
    });
  }
};
Blockly.Blocks['Magician_Lite_GetIOADC'] = {
  init: function () {
    this.jsonInit({
      "id": "Magician_Lite_GetIOADC",
      "message0": Blockly.Msg.MAGICIAN_LITE_GET_IOADC,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "MagicianLite.png",
        "width": 40,
        "height": 40
      },
      {
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
      }
      ],
      "category": Blockly.Categories.magicianlite,
      "tooltip": Blockly.Msg.MAGICIAN_LITE_GET_IOADC_TOOLTIP,
      "extensions": ["colours_magician_lite_io", "output_number"]
    });
  }
};
