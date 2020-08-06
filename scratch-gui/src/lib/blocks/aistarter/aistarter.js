import ScratchBlocks from 'scratch-blocks';
import { colors } from '../../make-device-toolbox-xml/common';


export const aiStarterBlocks = function (intl) {
  ScratchBlocks.Blocks.AIStarter_SmartBotSetMovment = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotSetMovment',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_MOVMENT,
        args0: [{
          type: 'field_dropdown',
          name: 'DIR',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_DIR_FRONT, 'FRONT'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_DIR_BACK, 'BACK'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_DIR_RIGHT, 'RIGHT'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_DIR_LEFT, 'LEFT']
          ]
        },
        {
          type: 'input_value',
          name: 'SPEED'
        }
        ],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_MOVMENT_TOOLTIP,
        extensions: ['colours_aistarter_motion', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotSetMovmentTime = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotSetMovmentTime',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_MOVMENT_TIME,
        args0: [{
          type: 'field_dropdown',
          name: 'DIR',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_DIR_FRONT, 'FRONT'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_DIR_BACK, 'BACK'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_DIR_RIGHT, 'RIGHT'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_DIR_LEFT, 'LEFT']
          ]
        },
        {
          type: 'input_value',
          name: 'SPEED'
        },
        {
          type: 'input_value',
          name: 'TIME'
        }
        ],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_MOVMENT_TIME_TOOLTIP,
        extensions: ['colours_aistarter_motion', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotSetMotor = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotSetMotor',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_MOTOR,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_MOTOR_RIGHT, 'MOTORR'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_MOTOR_LEFT, 'MOTORL']
          ]
        },
        {
          type: 'input_value',
          name: 'SPEED'
        }
        ],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_MOTOR_TOOLTIP,
        extensions: ['colours_aistarter_motion', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotSetMotorPI = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotSetMotorPI',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_MOTOR_PI,
        args0: [{
          type: 'input_value',
          name: 'KP'
        },
        {
          type: 'input_value',
          name: 'KI'
        }
        ],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_MOTOR_PI_TOOLTIP,
        extensions: ['colours_aistarter', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotGetMotorPose = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotGetMotorPose',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_MOTOR_POSE,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_MOTOR_RIGHT, 'MOTORR'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_MOTOR_LEFT, 'MOTORL']
          ]
        }],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_MOTOR_POSE_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotSetSonar = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotSetSonar',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_SONAR,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_SONAR_RF, 'SONAR3'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_SONAR_F, 'SONAR2'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_SONAR_LF, 'SONAR1']
          ]
        }],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_SONAR_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotGetBarrier = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotGetBarrier',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_BARRIER,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_SONAR_RF, 'SONAR3'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_SONAR_F, 'SONAR2'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_SONAR_LF, 'SONAR1']
          ]
        }],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_BARRIER_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'output_boolean']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotGetSonar = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotGetSonar',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_SONAR,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_SONAR_RF, 'SONAR3'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_SONAR_F, 'SONAR2'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_SONAR_LF, 'SONAR1']
          ]
        }],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_SONAR_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotGetIRModuleValue = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotGetIRModuleValue',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_IR_MODULE_VALUE,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            ['IR1', 'IR1'],
            ['IR2', 'IR2'],
            ['IR3', 'IR3'],
            ['IR4', 'IR4'],
            ['IR5', 'IR5'],
            ['IR6', 'IR6']
          ]
        }],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_IR_MODULE_VALUE_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotGetCompass = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotGetCompass',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_COMPASS,
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_COMPASS_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotSetCompassCalibration = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotSetCompassCalibration',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_COMPASS_CALIBRATION,
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_COMPASS_CALIBRATION_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotSetColorWB = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotSetColorWB',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_COLOR_WB,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLORSENOR_RIGHT, 'COLORSENOR2'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLORSENOR_LEFT, 'COLORSENOR1']
          ]
        }],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_COLOR_WB_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotSetColorSenor = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotSetColorSenor',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_COLOR_SENOR,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLORSENOR_RIGHT, 'COLORSENOR2'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLORSENOR_LEFT, 'COLORSENOR1']
          ]
        },
        {
          type: 'field_dropdown',
          name: 'ISON',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_LED_STATES_ON, '1'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_LED_STATES_OFF, '0']
          ]
        }
        ],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_COLOR_SENOR_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotGetColorSenor = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotGetColorSenor',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_COLOR_SENOR,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLORSENOR_RIGHT, 'COLORSENOR2'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLORSENOR_LEFT, 'COLORSENOR1']
          ]
        },
        {
          type: 'field_dropdown',
          name: 'COLOR',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLOR_SENOR_R, 'RCOLOR'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLOR_SENOR_G, 'GCOLOR'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLOR_SENOR_B, 'BCOLOR']
          ]
        }
        ],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_COLOR_SENOR_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotDetColorSenor = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotDetColorSenor',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_DET_COLOR_SENOR,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLORSENOR_RIGHT, 'COLORSENOR2'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLORSENOR_LEFT, 'COLORSENOR1']
          ]
        },
        {
  
          type: 'field_dropdown',
          name: 'COLOR',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLOR_SENOR_R, 'RCOLOR'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLOR_SENOR_G, 'GCOLOR'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLOR_SENOR_B, 'BCOLOR']
          ]
        }
        ],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_DET_COLOR_SENOR_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'output_boolean']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotSetKeyInit = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotSetKeyInit',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_KEY_INIT,
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_KEY_INIT_TOOLTIP,
        extensions: ['colours_aistarter', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotGetKeyValue = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotGetKeyValue',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_KEY_VALUE,
        args0: [{
          type: 'field_dropdown',
          name: 'KEY',
          options: [
            ['Switch1', 'PINSW1'],
            ['Switch2', 'PINSW2'],
            ['Switch3', 'PINSW3']
          ]
        }],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_KEY_VALUE_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotSetLED = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotSetLED',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_LED,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            ['LED1', 'LED1'],
            ['LED2', 'LED2']
          ]
        },
        {
          type: 'field_dropdown',
          name: 'STATE',
          options: [
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_LED_STATES_ON, 'ON'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_LED_STATES_OFF, 'OFF'],
            [ScratchBlocks.Msg.AI_STARTER_SMART_BOT_OPTIONS_LED_STATES_BLINK, 'BLINK']
          ]
        }
        ],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_LED_TOOLTIP,
        extensions: ['colours_aistarter', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotSetSonarThreshold = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotSetSonarThreshold',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_SONAR_THRESHOLD,
        args0: [{
          type: 'input_value',
          name: 'DISTANCE'
        }],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_SONAR_THRESHOLD_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotInit = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotInit',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_INIT,
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_INIT_TOOLTIP,
        extensions: ['colours_aistarter', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotGetLightAnalog = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotGetLightAnalog',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_LIGHT_ANALOG,
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_LIGHT_ANALOG_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotServoattach = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotServoattach',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SERVOATTACH,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            ['SERVO1', 'SERVO1'],
            ['SERVO2', 'SERVO2']
          ]
        }],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SERVOATTACH_TOOLTIP,
        extensions: ['colours_aistarter_motion', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotServoWrite = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotServoWrite',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SERVO_WRITE,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            ['SERVO1', 'SERVO1'],
            ['SERVO2', 'SERVO2']
          ]
        },
        {
          type: 'input_value',
          name: 'VALUE'
        }
        ],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SERVO_WRITE_TOOLTIP,
        extensions: ['colours_aistarter_motion', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotServoDetach = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotServoDetach',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SERVO_DETACH,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            ['SERVO1', 'SERVO1'],
            ['SERVO2', 'SERVO2']
          ]
        }],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SERVO_DETACH_TOOLTIP,
        extensions: ['colours_aistarter_motion', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotTimerTaskAttach = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotTimerTaskAttach',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_TIMER_TASK_ATTACH,
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_TIMER_TASK_ATTACH_TOOLTIP,
        extensions: ['colours_aistarter', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotTimerTaskDetach = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotTimerTaskDetach',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_TIMER_TASK_DETACH,
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_TIMER_TASK_DETACH_TOOLTIP,
        extensions: ['colours_aistarter', 'shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotXbeeRead = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotXbeeRead',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_XBEE_READ,
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_XBEE_READ_TOOLTIP,
        colour: colors[14].colour,
        colourSecondary: colors[14].secondaryColour,
        colourTertiary: colors[14].secondaryColour,
        extensions: ['output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotXbeeWrite = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotXbeeWrite',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_XBEE_WRITE,
        args0: [{
          type: 'input_value',
          name: 'STR'
        }],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_XBEE_WRITE_TOOLTIP,
        colour: colors[14].colour,
        colourSecondary: colors[14].secondaryColour,
        colourTertiary: colors[14].secondaryColour,
        extensions: ['shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotXbeeCompare = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotXbeeCompare',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_XBEE_COMPARE,
        args0: [
          {
            type: 'input_value',
            name: 'STR1'
          }
        ],
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_XBEE_COMPARE_TOOLTIP,
        colour: colors[14].colour,
        colourSecondary: colors[14].secondaryColour,
        colourTertiary: colors[14].secondaryColour,
        extensions: ['output_boolean']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotXbeeClear = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotXbeeClear',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_XBEE_CLEAR,
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_XBEE_CLEAR_TOOLTIP,
        colour: colors[14].colour,
        colourSecondary: colors[14].secondaryColour,
        colourTertiary: colors[14].secondaryColour,
        extensions: ['shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SetDeviation = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SetDeviation',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_DEVIATION_SET_DEVIATION,
        colour: ScratchBlocks.Colours.aistarter.primary,
        colourSecondary: ScratchBlocks.Colours.aistarter.secondary,
        colourTertiary: ScratchBlocks.Colours.aistarter.tertiary,
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_DEVIATION_SET_DEVIATION_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'shape_statement'],
        args0: [{
          type: 'input_value',
          name: 'IR1'
        }, {
          type: 'input_value',
          name: 'IR2'
        }, {
          type: 'input_value',
          name: 'IR3'
        }, {
          type: 'input_value',
          name: 'IR4'
        }, {
          type: 'input_value',
          name: 'IR5'
        }, {
          type: 'input_value',
          name: 'IR6'
        }]
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_GetDeviation = {
    init() {
      this.jsonInit({
        id: 'AIStarter_GetDeviation',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_DEVIATION,
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_DEVIATION_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_GetHeadDeviation = {
    init() {
      this.jsonInit({
        id: 'AIStarter_GetHeadDeviation',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_HEAD_GET_DEVIATION,
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_HEAD_DEVIATION_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotGetPIDLocation = {
    init() {
      this.jsonInit({
        id: 'AIStarter_SmartBotGetPIDLocation',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_PID_LOCATION,
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_GET_PID_LOCATION_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.AIStarter_SmartBotSetLocationPID = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotSetLocationPID',
        message0: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_LOCATION_PID,
        colour: ScratchBlocks.Colours.aistarter.primary,
        colourSecondary: ScratchBlocks.Colours.aistarter.secondary,
        colourTertiary: ScratchBlocks.Colours.aistarter.tertiary,
        category: ScratchBlocks.Categories.aistarter,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_SET_LOCATION_PID_TOOLTIP,
        extensions: ['colours_aistarter_sensor', 'shape_statement'],
        args0: [{
          type: 'input_value',
          name: 'KP'
        }, {
          type: 'input_value',
          name: 'KI'
        }, {
          type: 'input_value',
          name: 'KD'
        }, {
          type: 'input_value',
          name: 'Limit'
        }]
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_setBlueTooth = {
    init: function() {
      this.jsonInit({
        id: 'AIStarter_setBlueTooth',
        message0: intl.messages.BLUETOOTH_SETBLUETOOTH,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}bluetooth.png`,
            width: 40,
            height: 30
          },
          {
            type: 'input_value',
            name: 'name'
          },
          {
            type: 'input_value',
            name: 'id'
          }
        ],
        colour: colors[14].colour,
        colourSecondary: colors[14].secondaryColour,
        colourTertiary: colors[14].secondaryColour,
        category: 'blueTooth',
        extensions: ['shape_statement']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_getBlueToothMesagges = {
    init: function() {
      this.jsonInit({
        id: 'AIStarter_getBlueToothMesagges',
        message0: intl.messages.BLUETOOTH_GETBLUETOOTHMESAGGES,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}bluetooth.png`,
            width: 40,
            height: 30
          },
          {
            type: 'input_value',
            name: 'id'
          }
        ],
        colour: colors[14].colour,
        colourSecondary: colors[14].secondaryColour,
        colourTertiary: colors[14].secondaryColour,
        category: 'blueTooth',
        extensions: ['output_string']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_setBlueToothMesagges = {
    init: function() {
      this.jsonInit({
        id: 'AIStarter_setBlueToothMesagges',
        message0: intl.messages.BLUETOOTH_SETBLUETOOTHMESAGGES,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}bluetooth.png`,
            width: 40,
            height: 30
          },
          {
            type: 'input_value',
            name: 'id'
          },
          {
            type: 'input_value',
            name: 'msg'
          }
        ],
        colour: colors[14].colour,
        colourSecondary: colors[14].secondaryColour,
        colourTertiary: colors[14].secondaryColour,
        category: 'blueTooth',
        extensions: ['shape_statement']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_isGetBlueToothMesagges = {
    init: function() {
      this.jsonInit({
        id: 'AIStarter_isGetBlueToothMesagges',
        message0: intl.messages.BLUETOOTH_ISGETBLUETOOTHMESAGGES,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}bluetooth.png`,
            width: 40,
            height: 30
          },
          {
            type: 'input_value',
            name: 'id'
          },
          {
            type: 'input_value',
            name: 'msg'
          }
        ],
        colour: colors[14].colour,
        colourSecondary: colors[14].secondaryColour,
        colourTertiary: colors[14].secondaryColour,
        category: 'blueTooth',
        extensions: ['output_boolean']
      });
    }
  };

  ScratchBlocks.Blocks.AIStarter_start = {
    init: function() {
      this.jsonInit({
        id: 'AIStarter_start',
        message0: intl.messages.BLUETOOTH_WHENGETBLUETOOTHMESAGGES,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}bluetooth.png`,
            width: 40,
            height: 30
          },
          {
            type: 'input_value',
            name: 'id'
          },
          {
            type: 'input_value',
            name: 'msg'
          }
        ],
        colour: colors[14].colour,
        colourSecondary: colors[14].secondaryColour,
        colourTertiary: colors[14].secondaryColour,
        category: 'blueTooth',
        extensions: ['shape_hat']
      });
    }
  };
  
};
