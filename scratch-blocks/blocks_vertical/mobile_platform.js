'use strict';

goog.provide('Blockly.Blocks.mobileplatform');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

goog.require('Blockly.constants');

goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['MobilePlatform_SmartBotSetMovment'] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotSetMovment",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOVMENT,
      "args0": [{
        "type": "field_dropdown",
        "name": "DIR",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_DIR_FRONT, 'FRONT'],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_DIR_BACK, 'BACK'],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_DIR_RIGHT, 'RIGHT'],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_DIR_LEFT, 'LEFT']
        ]
      },
      {
        "type": "input_value",
        "name": "SPEED"
      }
      ],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOVMENT_TOOLTIP,
      "extensions": ["colours_mobileplatform", "shape_statement"]
    });
  }
};

Blockly.Blocks['MobilePlatform_SmartBotSetMovmentTime'] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotSetMovmentTime",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOVMENT_TIME,
      "args0": [{
        "type": "field_dropdown",
        "name": "DIR",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_DIR_FRONT, 'FRONT'],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_DIR_BACK, 'BACK'],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_DIR_RIGHT, 'RIGHT'],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_DIR_LEFT, 'LEFT']
        ]
      },
      {
        "type": "input_value",
        "name": "SPEED"
      },
      {
        "type": "input_value",
        "name": "TIME"
      }
      ],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOVMENT_TIME_TOOLTIP,
      "extensions": ["colours_mobileplatform", "shape_statement"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotSetMotor"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotSetMotor",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOTOR,
      "args0": [{
        "type": "field_dropdown",
        "name": "PORT",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_MOTOR_RIGHT, 'MOTORR'],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_MOTOR_LEFT, 'MOTORL']
        ]
      },
      {
        "type": "input_value",
        "name": "SPEED"
      }
      ],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOTOR_TOOLTIP,
      "extensions": ["colours_mobileplatform", "shape_statement"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotSetMotorPI"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotSetMotorPI",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOTOR_PI,
      "args0": [{
        "type": "input_value",
        "name": "KP"
      },
      {
        "type": "input_value",
        "name": "KI"
      }
      ],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOTOR_PI_TOOLTIP,
      "extensions": ["colours_mobileplatform", "shape_statement"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotGetMotorPose"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotGetMotorPose",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_MOTOR_POSE,
      "args0": [{
        "type": "field_dropdown",
        "name": "PORT",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_MOTOR_RIGHT, 'MOTORR'],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_MOTOR_LEFT, 'MOTORL']
        ]
      }],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_MOTOR_POSE_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "output_number"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotSetSonar"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotSetSonar",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_SONAR,
      "args0": [{
        "type": "field_dropdown",
        "name": "PORT",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_RF, 'SONAR3'],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_F, 'SONAR2'],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_LF, 'SONAR1']
        ]
      }],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_SONAR_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "shape_statement"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotGetBarrier"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotGetBarrier",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_BARRIER,
      "args0": [{
        "type": "field_dropdown",
        "name": "PORT",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_RF, 'SONAR3'],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_F, 'SONAR2'],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_LF, 'SONAR1']
        ]
      }],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_BARRIER_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "output_boolean"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotGetSonar"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotGetSonar",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_SONAR,
      "args0": [{
        "type": "field_dropdown",
        "name": "PORT",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_RF, 'SONAR3'],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_F, 'SONAR2'],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_LF, 'SONAR1']
        ]
      }],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_SONAR_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "output_number"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotGetIRModuleValue"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotGetIRModuleValue",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_IR_MODULE_VALUE,
      "args0": [{
        "type": "field_dropdown",
        "name": "PORT",
        "options": [
          ["IR1", "IR1"],
          ["IR2", "IR2"],
          ["IR3", "IR3"],
          ["IR4", "IR4"],
          ["IR5", "IR5"],
          ["IR6", "IR6"]
        ]
      }],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_IR_MODULE_VALUE_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "output_number"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotGetCompass"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotGetCompass",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_COMPASS,
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_COMPASS_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "output_number"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotSetCompassCalibration"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotSetCompassCalibration",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_COMPASS_CALIBRATION,
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_COMPASS_CALIBRATION_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "shape_statement"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotSetColorWB"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotSetColorWB",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_COLOR_WB,
      "args0": [{
        "type": "field_dropdown",
        "name": "PORT",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLORSENOR_RIGHT, "COLORSENOR2"],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLORSENOR_LEFT, "COLORSENOR1"]
        ]
      }],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_COLOR_WB_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "shape_statement"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotSetColorSenor"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotSetColorSenor",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_COLOR_SENOR,
      "args0": [{
        "type": "field_dropdown",
        "name": "PORT",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLORSENOR_RIGHT, "COLORSENOR2"],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLORSENOR_LEFT, "COLORSENOR1"]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "ISON",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_LED_STATES_ON, "1"],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_LED_STATES_OFF, "0"]
        ]
      }
      ],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_COLOR_SENOR_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "shape_statement"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotGetColorSenor"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotGetColorSenor",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_COLOR_SENOR,
      "args0": [{
        "type": "field_dropdown",
        "name": "PORT",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLORSENOR_RIGHT, "COLORSENOR2"],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLORSENOR_LEFT, "COLORSENOR1"]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "COLOR",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLOR_SENOR_R, "RCOLOR"],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLOR_SENOR_G, "GCOLOR"],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLOR_SENOR_B, "BCOLOR"]
        ]
      }
      ],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_COLOR_SENOR_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "output_number"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotDetColorSenor"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotDetColorSenor",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_DET_COLOR_SENOR,
      "args0": [{
        "type": "field_dropdown",
        "name": "PORT",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLORSENOR_RIGHT, "COLORSENOR2"],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLORSENOR_LEFT, "COLORSENOR1"]
        ]
      },
      {

        "type": "field_dropdown",
        "name": "COLOR",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLOR_SENOR_R, "RCOLOR"],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLOR_SENOR_G, "GCOLOR"],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLOR_SENOR_B, "BCOLOR"]
        ]
      }
      ],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_DET_COLOR_SENOR_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "output_boolean"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotSetKeyInit"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotSetKeyInit",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_KEY_INIT,
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_KEY_INIT_TOOLTIP,
      "extensions": ["colours_mobileplatform", "shape_statement"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotGetKeyValue"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotGetKeyValue",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_KEY_VALUE,
      "args0": [{
        "type": "field_dropdown",
        "name": "KEY",
        "options": [
          ["1", "SW1"],
          ["2", "SW2"]
        ]
      }],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_KEY_VALUE_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "output_number"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotSetLED"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotSetLED",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_LED,
      "args0": [{
        "type": "field_dropdown",
        "name": "PORT",
        "options": [
          ["LED1", "LED1"],
          ["LED2", "LED2"],
          ["LED3", "LED3"],
          ["LED4", "LED4"]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "STATE",
        "options": [
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_LED_STATES_ON, "ON"],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_LED_STATES_OFF, "OFF"],
          [Blockly.Msg.MOBILE_PLATFORM_OPTIONS_LED_STATES_BLINK, "BLINK"]
        ]
      }
      ],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_LED_TOOLTIP,
      "extensions": ["colours_mobileplatform", "shape_statement"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotSetSonarThreshold"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotSetSonarThreshold",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_SONAR_THRESHOLD,
      "args0": [{
        "type": "input_value",
        "name": "DISTANCE"
      }],
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_SONAR_THRESHOLD_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "shape_statement"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotInit"] = {
  init: function () {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotInit",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_INIT,
      "colour": Blockly.Colours.mobileplatform.primary,
      "colourSecondary": Blockly.Colours.mobileplatform.secondary,
      "colourTertiary": Blockly.Colours.mobileplatform.tertiary,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_INIT_TOOLTIP,
      "extensions": ["colours_mobileplatform", "shape_statement"]
    });
  }
};


Blockly.Blocks["MobilePlatform_SetDeviation"] = {
  init: function () {
    this.jsonInit({
      id: "MobilePlatform_SetDeviation",
      message0: Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_DEVIATION_SET_DEVIATION,
      colour: Blockly.Colours.mobileplatform.primary,
      colourSecondary: Blockly.Colours.mobileplatform.secondary,
      colourTertiary: Blockly.Colours.mobileplatform.tertiary,
      category: Blockly.Categories.mobileplatform,
      tooltip: Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_DEVIATION_SET_DEVIATION_TOOLTIP,
      extensions: ["colours_mobileplatform_sensor", "shape_statement"],
      args0: [{
        "type": "input_value",
        "name": "IR1"
      }, {
        "type": "input_value",
        "name": "IR2"
      }, {
        "type": "input_value",
        "name": "IR3"
      }, {
        "type": "input_value",
        "name": "IR4"
      }, {
        "type": "input_value",
        "name": "IR5"
      }, {
        "type": "input_value",
        "name": "IR6"
      }]
    });
  }
};

Blockly.Blocks["MobilePlatform_GetDeviation"] = {
  init() {
    this.jsonInit({
      "id": "MobilePlatform_GetDeviation",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_DEVIATION,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_DEVIATION_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "output_number"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotGetPIDLocation"] = {
  init() {
    this.jsonInit({
      "id": "MobilePlatform_SmartBotGetPIDLocation",
      "message0": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_PID_LOCATION,
      "category": Blockly.Categories.mobileplatform,
      "tooltip": Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_PID_LOCATION_TOOLTIP,
      "extensions": ["colours_mobileplatform_sensor", "output_number"]
    });
  }
};

Blockly.Blocks["MobilePlatform_SmartBotSetLocationPID"] = {
  init: function () {
    this.jsonInit({
      id: "MobilePlatform_SmartBotSetLocationPID",
      message0: Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_LOCATION_PID,
      colour: Blockly.Colours.mobileplatform.primary,
      colourSecondary: Blockly.Colours.mobileplatform.secondary,
      colourTertiary: Blockly.Colours.mobileplatform.tertiary,
      category: Blockly.Categories.mobileplatform,
      tooltip: Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_LOCATION_PID_TOOLTIP,
      extensions: ["colours_mobileplatform_sensor", "shape_statement"],
      args0: [{
        "type": "input_value",
        "name": "KP"
      }, {
        "type": "input_value",
        "name": "KI"
      }, {
        "type": "input_value",
        "name": "KD"
      }, {
        "type": "input_value",
        "name": "Limit"
      }]
    });
  }
};
