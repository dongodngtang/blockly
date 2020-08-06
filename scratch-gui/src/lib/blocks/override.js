import ScratchBlocks from 'scratch-blocks';
import { checkPoseLimitDebounce } from '../checkPoseLimit';
import { store } from '../app-state-hoc';
const cast = require('./util/cast');

const generatePrimitiveFunc = runtime => {
  runtime._primitives.Magician_SetR = args => new Promise(resolve => {
    const { poseData } = store.getState().scratchGui.connectionModal;

    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.ptpMode = 2;
    params.x = cast.toNumber(poseData.x);
    params.y = cast.toNumber(poseData.y);
    params.z = cast.toNumber(poseData.z);
    params.r = cast.toNumber(args.r);
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.Magician.SetPTPCmd`, params).then(() => {
      resolve();
    });
  });

  runtime._primitives.Magician_Lite_SetR = args => new Promise(resolve => {
    const { poseData } = store.getState().scratchGui.connectionModal;

    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.ptpMode = 2;
    params.x = cast.toNumber(poseData.x);
    params.y = cast.toNumber(poseData.y);
    params.z = cast.toNumber(poseData.z);
    params.r = cast.toNumber(args.r);
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.MagicianLite.SetPTPCmd`, params).then(() => {
      resolve();
    });
  });
};
export const arduinoOverride = function () {
  ScratchBlocks.Blocks.arduino_pin_mode = {
    init: function () {
      this.jsonInit({
        id: 'arduino_pin_mode',
        message0: ScratchBlocks.Msg.ARDUINO_PINMODE,
        args0: [{
          type: 'input_value',
          name: 'PINNUM'
        },
        {
          type: 'field_dropdown',
          name: 'ARDUINO_PIN_MODE_OPTION',
          options: [
            ['OUTPUT', 'OUTPUT'],
            ['INPUT', 'INPUT'],
            ['INPUT_PULLUP', 'INPUT_PULLUP']
          ]
        }
        ],
        category: ScratchBlocks.Categories.arduino,
        tooltip: ScratchBlocks.Msg.ARDUINO_PIN_MODE_TOOLTIP,
        extensions: ['colours_arduino', 'shape_statement']
      });
    }
  };
};

export const aiOverride = function (){
  ScratchBlocks.Blocks.event_whengreaterthan = {
    init: function() {
      this.jsonInit({
        message0: ScratchBlocks.Msg.EVENT_WHENGREATERTHAN,
        args0: [
          {
            type: 'field_dropdown',
            name: 'WHENGREATERTHANMENU',
            options: [
              [ScratchBlocks.Msg.EVENT_WHENGREATERTHAN_TIMER, 'TIMER']
            ]
          },
          {
            type: 'input_value',
            name: 'VALUE'
          }
        ],
        category: ScratchBlocks.Categories.event,
        extensions: ['colours_event', 'shape_hat']
      });
    }
  };
};

export const magicianOverride = (intl, runtime) => {
  generatePrimitiveFunc(runtime);
  window.intl = intl;

  ScratchBlocks.Blocks.Magician_Lite_SetEndFixture = {
    init: function () {
      this.jsonInit({
        id: 'Magician_Lite_SetEndFixture',
        message0: ScratchBlocks.Msg.MAGICIAN_LITE_SET_END_FIXTURE,
        args0: [{
          type: 'field_image',
          src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}MagicianLite.png`,
          width: 40,
          height: 40
        },
        {
          type: 'field_dropdown',
          name: 'BTN',
          options: () => {
            const GRIPPER = intl.messages.MAGICIAN_LITE_OPTIONS_SET_END_FIXTURE_GRIPPER;
            const SUCTION_CUP = intl.messages.MAGICIAN_LITE_OPTIONS_SET_END_FIXTURE_SUCTION_CUP;
            return [
              [GRIPPER.message || GRIPPER, '2'],
              [SUCTION_CUP.message || SUCTION_CUP, '1'],
              [ScratchBlocks.Msg.MAGICIAN_LITE_OPTIONS_SET_END_FIXTURE_PEN, '3']
            ];
          }
        }
        ],
        category: ScratchBlocks.Categories.magicianlite,
        tooltip: ScratchBlocks.Msg.MAGICIAN_LITE_SET_END_FIXTURE_TOOLTIP,
        extensions: ['colours_magician_lite_setting', 'shape_statement']
      });
    }
  };
  ScratchBlocks.Blocks.Magician_SetEndFixture = {
    init: function () {
      this.jsonInit({
        id: 'Magician_SetEndFixture',
        message0: ScratchBlocks.Msg.MAGICIAN_SET_END_FIXTURE,
        args0: [{
          type: 'field_image',
          src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}magician.png`,
          width: 40,
          height: 40
        },
        {
          type: 'field_dropdown',
          name: 'BTN',
          options: () => {
            const GRIPPER = intl.messages.MAGICIAN_LITE_OPTIONS_SET_END_FIXTURE_GRIPPER;
            const SUCTION_CUP = intl.messages.MAGICIAN_LITE_OPTIONS_SET_END_FIXTURE_SUCTION_CUP;
            return [
            // 数值一样会同时选中两个
              [GRIPPER.message || GRIPPER, '59.7'],
              [SUCTION_CUP.message || SUCTION_CUP, '59.70'],
              [ScratchBlocks.Msg.MAGICIAN_OPTIONS_SET_END_FIXTURE_PEN, '61']
            ];
          }
        }
        ],
        category: ScratchBlocks.Categories.magician,
        tooltip: ScratchBlocks.Msg.MAGICIAN_SET_END_FIXTURE_TOOLTIP,
        extensions: ['colours_magician_setting', 'shape_statement']
      });
    }
  };

  ScratchBlocks.Blocks.Magician_SetR = {
    init: function () {
      this.jsonInit({
        id: 'Magician_SetR',
        message0: intl.messages.MAGICIAN_SET_R,
        args0: [{
          type: 'field_image',
          src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}magician.png`,
          width: 40,
          height: 40
        },
        {
          type: 'input_value',
          name: 'r'
        }
        ],
        category: ScratchBlocks.Categories.magician,
        tooltip: ScratchBlocks.Msg.MAGICIAN_SET_R_TOOLTIP,
        extensions: ['colours_magician_motion', 'shape_statement']
      });
    }
  };
  ScratchBlocks.Blocks.Magician_SetPTPCommonParams = {
    init: function () {
      this.jsonInit({
        id: 'Magician_SetPTPCommonParams',
        message0: ScratchBlocks.Msg.MAGICIAN_SET_PTP_COMMON_PARAMS,
        args0: [{
          type: 'field_image',
          src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}magician.png`,
          width: 40,
          height: 40
        },
        {
          type: 'input_value',
          name: 'velocity'
        },
        {
          type: 'input_value',
          name: 'acceleration'
        }
        ],
        category: ScratchBlocks.Categories.magician,
        tooltip: ScratchBlocks.Msg.MAGICIAN_SET_PTP_COMMON_PARAMS_TOOLTIP,
        extensions: ['colours_magician_setting', 'shape_statement']
      });
      this.setOnChange(e => checkPoseLimitDebounce(e));
    }
  };
};

export const magicianliteOverride = function(intl, runtime) {
  generatePrimitiveFunc(runtime);
  ScratchBlocks.Blocks.Magician_Lite_SetPTPCommonParams = {
    init: function () {
      this.jsonInit({
        id: 'Magician_Lite_SetPTPCommonParams',
        message0: intl.messages.MAGICIAN_LITE_SET_PTP_COMMON_PARAMS,
        args0: [{
          type: 'field_image',
          src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}MagicianLite.png`,
          width: 40,
          height: 40
        },
        {
          type: 'input_value',
          name: 'percent'
        }
        ],
        category: ScratchBlocks.Categories.magicianlite,
        tooltip: ScratchBlocks.Msg.MAGICIAN_LITE_SET_PTP_COMMON_PARAMS_TOOLTIP,
        extensions: ['colours_magician_lite_setting', 'shape_statement']
      });
      this.setOnChange(e => checkPoseLimitDebounce(e));
    }
  };

  ScratchBlocks.Blocks.Magician_Lite_SetR = {
    init: function () {
      this.jsonInit({
        id: 'Magician_Lite_SetR',
        message0: intl.messages.MAGICIAN_SET_R,
        args0: [{
          type: 'field_image',
          src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}MagicianLite.png`,
          width: 40,
          height: 40
        },
        {
          type: 'input_value',
          name: 'r'
        }
        ],
        category: ScratchBlocks.Categories.magicianlite,
        tooltip: ScratchBlocks.Msg.MAGICIAN_LITE_SET_R_TOOLTIP,
        extensions: ['colours_magician_lite_motion', 'shape_statement']
      });
    }
  };

  ScratchBlocks.Blocks.Magician_Lite_JumpTo = {
    init: function () {
      this.jsonInit({
        id: 'Magician_Lite_JumpTo',
        message0: ScratchBlocks.Msg.MAGICIAN_LITE_JUMP_TO,
        args0: [{
          type: 'field_image',
          src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}MagicianLite.png`,
          width: 40,
          height: 40
        },
        {
          type: 'input_value',
          name: 'x'
        },
        {
          type: 'input_value',
          name: 'y'
        },
        {
          type: 'input_value',
          name: 'z'
        },
        {
          type: 'input_value',
          name: 'r'
        }
        ],
        category: ScratchBlocks.Categories.magicianlite,
        tooltip: ScratchBlocks.Msg.MAGICIAN_LITE_JUMP_TO_TOOLTIP,
        extensions: ['colours_magician_lite_motion', 'shape_statement']
      });
      this.setOnChange(e => checkPoseLimitDebounce(e));
    }
  };
  ScratchBlocks.Blocks.Magician_Lite_Goto = {
    init: function () {
      this.jsonInit({
        id: 'Magician_Lite_Goto',
        message0: ScratchBlocks.Msg.MAGICIAN_LITE_GOTO,
        args0: [{
          type: 'field_image',
          src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}MagicianLite.png`,
          width: 40,
          height: 40
        },
        {
          type: 'input_value',
          name: 'x'
        },
        {
          type: 'input_value',
          name: 'y'
        },
        {
          type: 'input_value',
          name: 'z'
        },
        {
          type: 'input_value',
          name: 'r'
        },
        {
          type: 'field_dropdown',
          name: 'moveType',
          options: [
            [ScratchBlocks.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_GOTO_STRAIGHT, '2'],
            [ScratchBlocks.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_GOTO_JOINT, '1']
          ]
        }
        ],
        category: ScratchBlocks.Categories.magicianlite,
        tooltip: ScratchBlocks.Msg.MAGICIAN_LITE_GOTO_TOOLTIP,
        extensions: ['colours_magician_lite_motion', 'shape_statement']
      });
      this.setOnChange(e => checkPoseLimitDebounce(e));
    }
  };
  ScratchBlocks.Blocks.Magician_Lite_SetJointAngle = {
    init: function () {
      this.jsonInit({
        id: 'Magician_Lite_SetJointAngle',
        message0: ScratchBlocks.Msg.MAGICIAN_LITE_SET_JOINT_ANGLE,
        args0: [{
          type: 'field_image',
          src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}MagicianLite.png`,
          width: 40,
          height: 40
        },
        {
          type: 'input_value',
          name: 'Joint1'
        },
        {
          type: 'input_value',
          name: 'Joint2'
        },
        {
          type: 'input_value',
          name: 'Joint3'
        },
        {
          type: 'input_value',
          name: 'Joint4'
        }
        ],
        category: ScratchBlocks.Categories.magicianlite,
        tooltip: ScratchBlocks.Msg.MAGICIAN_LITE_SET_JOINT_ANGLE_TOOLTIP,
        extensions: ['colours_magician_lite_motion', 'shape_statement']
      });
      this.setOnChange(e => checkPoseLimitDebounce(e));
    }
  };
};

export const otherOverride = function(intl) {
  ScratchBlocks.Blocks.arduino_analog_read = {
    /**
     * return analogread on port
     * @this ScratchBlocks.Block
     */
    init: function () {
      this.jsonInit({
        id: 'arduino_analog_read',
        message0: intl.messages.ARDUINO_ANALOGREAD,
        args0: [{
          type: 'input_value',
          name: 'PINNUM'
        }],
        colour: ScratchBlocks.Colours.arduino.tertiary,
        colourSecondary: ScratchBlocks.Colours.arduino.secondary,
        colourTertiary: ScratchBlocks.Colours.arduino.tertiary,
        category: ScratchBlocks.Categories.arduino,
        tooltip: ScratchBlocks.Msg.ARDUINO_ANALOG_READ_TOOLTIP,
        extensions: ['colours_arduino', 'output_number']
      });
    }
  };
  ScratchBlocks.Blocks.MobilePlatform_SmartBotSetSonar = {
    init: function () {
      this.jsonInit({
        id: 'MobilePlatform_SmartBotSetSonar',
        message0: intl.messages.MOBILE_PLATFORM_SMART_BOT_SET_SONAR,
        args0: [{
          type: 'field_dropdown',
          name: 'PORT',
          options: [
            [ScratchBlocks.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_RF, 'SONAR3'],
            [ScratchBlocks.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_F, 'SONAR2'],
            [ScratchBlocks.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_LF, 'SONAR1']
          ]
        }],
        colour: ScratchBlocks.Colours.mobileplatform.primary,
        colourSecondary: ScratchBlocks.Colours.mobileplatform.secondary,
        colourTertiary: ScratchBlocks.Colours.mobileplatform.tertiary,
        category: ScratchBlocks.Categories.mobileplatform,
        tooltip: ScratchBlocks.Msg.MOBILE_PLATFORM_SMART_BOT_SET_SONAR_TOOLTIP,
        extensions: ['colours_mobileplatform_sensor', 'shape_statement']
      });
    }
  };
  ScratchBlocks.Blocks.AIStarter_SmartBotSetSonar = {
    init: function () {
      this.jsonInit({
        id: 'AIStarter_SmartBotSetSonar',
        message0: intl.messages.MOBILE_PLATFORM_SMART_BOT_SET_SONAR,
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
        extensions: ['colours_aistarter_other', 'output_boolean']
      });
    }
  };
};

export const colorOverride = function() {
  ScratchBlocks.Colours.controller.tertiary = '#7764cb';

  ScratchBlocks.ScratchMsgs.setLocale = function(locale) {
    if (Object.keys(ScratchBlocks.ScratchMsgs.locales).includes(locale)) {
      ScratchBlocks.ScratchMsgs.currentLocale_ = locale;
      ScratchBlocks.Msg = Object.assign({},
        ScratchBlocks.Msg,
        // 积木为翻译的国际化语言默认显示为英语
        ScratchBlocks.ScratchMsgs.locales.en,
        ScratchBlocks.ScratchMsgs.locales[locale]
      );
    } else {
      // keep current locale
      console.warn(`Ignoring unrecognized locale: ${locale}`);
    }
  };
  
  ScratchBlocks.ScratchMsgs.translate = function(msgId, defaultMsg, useLocale) {
    const locale = useLocale || ScratchBlocks.ScratchMsgs.currentLocale_;
  
    if (Object.keys(ScratchBlocks.ScratchMsgs.locales).includes(locale)) {
      const messages = ScratchBlocks.ScratchMsgs.locales[locale];
      if (Object.keys(messages).includes(msgId)) {
        return messages[msgId];
      }
    }
    return defaultMsg;
  };
};
