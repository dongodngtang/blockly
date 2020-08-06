import ScratchBlocks from 'scratch-blocks';
import { colors } from '../make-device-toolbox-xml/common';
const cast = require('./util/cast');

const generatePrimitiveFunc = runtime => {
  runtime._primitives.Controller_SmartBotXbeeRead = args => new Promise(resolve => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    const baud = 9600;
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.MagicBox.SensorXBeeInit`, { portName: params.portName, port: params.port, baud }).then(() => {
      runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorXBeeReceive`, params).then(data => {
        resolve(data.text);
      });
    });
  });

  runtime._primitives.Controller_SmartBotXbeeWrite = args => new Promise(resolve => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.text = args.STR;
    const baud = 9600;
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.MagicBox.SensorXBeeInit`, { portName: params.portName, port: params.port, baud }).then(() => {
      runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorXBeeSend`, params).then(() => {
        resolve();
      });
    });
  });

  runtime._primitives.Controller_SmartBotXbeeCompare = args => new Promise(resolve => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    const text = args.inpText;
    const baud = 9600;
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.MagicBox.SensorXBeeInit`, { portName: params.portName, port: params.port, baud }).then(() => {
      runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorXBeeReceive`, params).then(data => {
        resolve(data.text === text);
      });
    });
  });

  runtime._primitives.Controller_SmartBotXbeeClear = args => new Promise(resolve => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.text = args.STR;
    const baud = 9600;
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.MagicBox.SensorXBeeInit`, { portName: params.portName, port: params.port, baud }).then(() => {
      runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorXBeeClear`, params).then(() => {
        resolve();
      });
    });
  });

};
export const controllerBlocks = function (intl, runtime) {
  generatePrimitiveFunc(runtime);
  ScratchBlocks.Blocks.Controller_Analog_output = {
    init: function () {
      this.jsonInit({
        id: 'Controller_Analog_output',
        
        message0: intl.messages.CONTROLLER_OUT_ANALOG_SIGNAL,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}controller.png`,
            width: 40,
            height: 40
          },
          {
            type: 'input_value',
            name: 'eio'
          },
          {
            type: 'input_value',
            name: 'value'
          }
        ],
        colour: colors[12].colour,
        colourSecondary: colors[12].secondaryColour,
        colourTertiary: colors[12].secondaryColour,
        tooltip: ScratchBlocks.Msg.CONTROLLER_OUT_ANALOG_SIGNAL_TOOLTIP,
        extensions: ['shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.Controller_Digital_output = {
    init: function () {
      this.jsonInit({
        id: 'Controller_Digital_output',
        message0: intl.messages.CONTROLLER_OUT_DIGITAL_SIGNAL,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}controller.png`,
            width: 40,
            height: 40
          },
          {
            type: 'input_value',
            name: 'eio'
          },
          {
            type: 'input_value',
            name: 'level'
          }
        ],
        tooltip: ScratchBlocks.Msg.CONTROLLER_OUT_DIGITAL_SIGNAL_TOOLTIP,
        colour: colors[12].colour,
        colourSecondary: colors[12].secondaryColour,
        colourTertiary: colors[12].secondaryColour,
        extensions: ['shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.Controller_Set_Pin = {
    init: function () {
      this.jsonInit({
        id: 'Controller_Set_Pin',
        message0: intl.messages.CONTROLLER_SET_PIN,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}controller.png`,
            width: 40,
            height: 40
          },
          {
            type: 'input_value',
            name: 'eio'
          },
          {
            type: 'field_dropdown',
            name: 'mode',
            options: [
              [ScratchBlocks.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DUMMY, '0'],
              [ScratchBlocks.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DO, '1'],
              [ScratchBlocks.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_PWM, '2'],
              [ScratchBlocks.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DI, '3'],
              [ScratchBlocks.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_ADC, '4'],
              [ScratchBlocks.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DIPU, '5'],
              [ScratchBlocks.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DIPD, '6']
            ]
          }
        ],
        tooltip: ScratchBlocks.Msg.CONTROLLER_SET_PIN_TOOLTIP,
        colour: colors[12].colour,
        colourSecondary: colors[12].secondaryColour,
        colourTertiary: colors[12].secondaryColour,
        extensions: ['shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.Controller_SetIOPWM = {
    init: function () {
      this.jsonInit({
        id: 'Controller_SetIOPWM',
        message0: intl.messages.CONTROLLER_SET_PWM,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}controller.png`,
            width: 40,
            height: 40
          },
          {
            type: 'input_value',
            name: 'eio'
          },
          {
            type: 'input_value',
            name: 'frequency'
          },
          {
            type: 'input_value',
            name: 'dutyCycle'
          }
        ],
        tooltip: ScratchBlocks.Msg.CONTROLLER_SET_PWM_TOOLTIP,
        colour: colors[12].colour,
        colourSecondary: colors[12].secondaryColour,
        colourTertiary: colors[12].secondaryColour,
        extensions: ['shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.Controller_digital_read = {
    init: function () {
      this.jsonInit({
        id: 'Controller_digital_read',
        message0: intl.messages.CONTROLLER_READ_DIGIGTAL,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}controller.png`,
            width: 40,
            height: 40
          },
          {
            type: 'input_value',
            name: 'PINNUM'
          }],
        tooltip: ScratchBlocks.Msg.CONTROLLER_READ_DIGIGTAL_TOOLTIP,
        colour: colors[12].colour,
        colourSecondary: colors[12].secondaryColour,
        colourTertiary: colors[12].secondaryColour,
        extensions: ['output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.Controller_digital_read_bool = {
    init: function () {
      this.jsonInit({
        id: 'Controller_digital_read_bool',
        message0: intl.messages.CONTROLLER_READ_DIGIGTAL,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}controller.png`,
            width: 40,
            height: 40
          },
          {
            type: 'input_value',
            name: 'PINNUM'
          }],
        tooltip: ScratchBlocks.Msg.CONTROLLER_READ_DIGIGTAL_TOOLTIP,
        colour: colors[12].colour,
        colourSecondary: colors[12].secondaryColour,
        colourTertiary: colors[12].secondaryColour,
        extensions: ['output_boolean']
      });
    }
  };
  
  ScratchBlocks.Blocks.Controller_analog_read = {
    init: function () {
      this.jsonInit({
        id: 'Controller_analog_read',
        message0: intl.messages.CONTROLLER_READ_ANALOG,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}controller.png`,
            width: 40,
            height: 40
          },
          {
            type: 'input_value',
            name: 'eio'
          }],
        tooltip: ScratchBlocks.Msg.CONTROLLER_READ_ANALOG_TOOLTIP,
        colour: colors[12].colour,
        colourSecondary: colors[12].secondaryColour,
        colourTertiary: colors[12].secondaryColour,
        extensions: ['output_number']
      });
    }
  };
  ScratchBlocks.Blocks.Controller_SetStepperMotor = {
    init: function () {
      this.jsonInit({
        id: 'Controller_SetStepperMotor',
        message0: intl.messages.CONTROLLER_SET_STEPPER,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}controller.png`,
            width: 40,
            height: 40
          },
          {
            type: 'field_dropdown',
            name: 'index',
            options: [
              [ScratchBlocks.Msg.MAGICIAN_OPTIONS_Magician_STEPPER1, '0'],
              [ScratchBlocks.Msg.MAGICIAN_OPTIONS_Magician_STEPPER2, '1']
            ]
          },
          {
            type: 'input_value',
            name: 'speed'
          }
        ],
        tooltip: ScratchBlocks.Msg.CONTROLLER_SET_STEPPER_TOOLTIP,
        colour: colors[12].colour,
        colourSecondary: colors[12].secondaryColour,
        colourTertiary: colors[12].secondaryColour,
        extensions: ['shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.Controller_SetStepperMotorNum = {
    init: function () {
      this.jsonInit({
        id: 'Controller_SetStepperMotorNum',
        message0: intl.messages.CONTROLLER_SET_STEPPER_NUM,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}controller.png`,
            width: 40,
            height: 40
          },
          {
            type: 'field_dropdown',
            name: 'index',
            options: [
              [ScratchBlocks.Msg.MAGICIAN_OPTIONS_Magician_STEPPER1, '0'],
              [ScratchBlocks.Msg.MAGICIAN_OPTIONS_Magician_STEPPER2, '1']
            ]
          },
          {
            type: 'input_value',
            name: 'speed'
          },
          {
            type: 'input_value',
            name: 'num'
          }
        ],
        tooltip: ScratchBlocks.Msg.CONTROLLER_SET_STEPPER_NUM_TOOLTIP,
        colour: colors[12].colour,
        colourSecondary: colors[12].secondaryColour,
        colourTertiary: colors[12].secondaryColour,
        extensions: ['shape_statement']
      });
    }
  };
  
  ScratchBlocks.Blocks.Controller_SetConveyor = {
    init: function () {
      this.jsonInit({
        id: 'Controller_SetConveyor',
        message0: intl.messages.CONTROLLER_SET_CONVEYOR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}controller.png`,
            width: 40,
            height: 40
          },
          {
            type: 'field_dropdown',
            name: 'index',
            options: [
              [ScratchBlocks.Msg.MAGICIAN_OPTIONS_Magician_STEPPER1, '0'],
              [ScratchBlocks.Msg.MAGICIAN_OPTIONS_Magician_STEPPER2, '1']
            ]
          },
          {
            type: 'input_value',
            name: 'speed'
          }
        ],
        tooltip: ScratchBlocks.Msg.CONTROLLER_SET_CONVEYOR_TOOLTIP,
        colour: colors[12].colour,
        colourSecondary: colors[12].secondaryColour,
        colourTertiary: colors[12].secondaryColour,
        extensions: ['shape_statement']
      });
    }
  };

  // XBee
  ScratchBlocks.Blocks.Controller_SmartBotXbeeRead = {
    init: function () {
      this.jsonInit({
        id: 'Controller_SmartBotXbeeRead',
        message0: ScratchBlocks.Msg.CONTROLLER_XBEE_READ,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}xbee.svg`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: [
              ['port2', '1']
            ]
          }
        ],
        tooltip: ScratchBlocks.Msg.CONTROLLER_XBEE_READ_TOOLTIP,
        colour: colors[14].colour,
        colourSecondary: colors[14].secondaryColour,
        colourTertiary: colors[14].secondaryColour,
        extensions: ['output_number']
      });
    }
  };
  
  ScratchBlocks.Blocks.Controller_SmartBotXbeeWrite = {
    init: function () {
      this.jsonInit({
        id: 'Controller_SmartBotXbeeWrite',
        message0: ScratchBlocks.Msg.CONTROLLER_XBEE_WRITE,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}xbee.svg`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: [
              ['port2', '1']
            ]
          },
          {
            type: 'input_value',
            name: 'STR'
          }
          
        ],
        tooltip: ScratchBlocks.Msg.CONTROLLER_XBEE_WRITE_TOOLTIP,
        colour: colors[14].colour,
        colourSecondary: colors[14].secondaryColour,
        colourTertiary: colors[14].secondaryColour,
        extensions: ['shape_statement']
      });
    }
  };
  ScratchBlocks.Blocks.Controller_SmartBotXbeeCompare = {
    init: function () {
      this.jsonInit({
        id: 'Controller_SmartBotXbeeCompare',
        message0: ScratchBlocks.Msg.CONTROLLERT_XBEE_COMPARE,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}xbee.svg`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: [
              ['port2', '1']
            ]
          },
          {
            type: 'input_value',
            name: 'inpText'
          }
        ],
        colour: colors[14].colour,
        colourSecondary: colors[14].secondaryColour,
        colourTertiary: colors[14].secondaryColour,
        tooltip: ScratchBlocks.Msg.AI_STARTER_SMART_BOT_XBEE_COMPARE_TOOLTIP,
        extensions: ['output_boolean']
      });
    }
  };
  
  
  ScratchBlocks.Blocks.Controller_SmartBotXbeeClear = {
    init: function () {
      this.jsonInit({
        id: 'Controller_SmartBotXbeeClear',
        message0: ScratchBlocks.Msg.CONTROLLER_XBEE_CLEAR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}xbee.svg`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: [
              ['port2', '1']
            ]
          }
        ],
        tooltip: ScratchBlocks.Msg.CONTROLLER_XBEE_CLEAR_TOOLTIP,
        colour: colors[14].colour,
        colourSecondary: colors[14].secondaryColour,
        colourTertiary: colors[14].secondaryColour,
        extensions: ['shape_statement']
      });
    }
  };
};
