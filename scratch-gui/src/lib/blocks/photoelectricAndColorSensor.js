import ScratchBlocks from 'scratch-blocks';
import { colors } from '../make-device-toolbox-xml/common';
const cast = require('./util/cast');

const getDeviceName = DeviceName => (DeviceName === 'controller' ? 'MagicBox' : 'Magician');

const generatePrimitiveFunc = runtime => {

  runtime._primitives.PhotoelectricSensor_SetInfraredSensor = args => new Promise(resolve => {
    const deviceName = getDeviceName(runtime._editingTarget.deviceName);
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.enable = !!cast.toNumber(args.IsEnable);
    params.port = cast.toNumber(args.port);
    params.version = cast.toNumber(args.Version);
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.${deviceName}.SetInfraredSensor`, params).then(() => {
      resolve();
    });
  });
  runtime._primitives.PhotoelectricSensor_GetInfraredSensor = args => new Promise(resolve => {
    const deviceName = getDeviceName(runtime._editingTarget.deviceName);
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.${deviceName}.GetInfraredSensor`, params).then(date => {
      resolve(date.status);
    });
  });

  runtime._primitives.PhotoelectricSensor_SetSeeedLightSensor = args => new Promise(resolve => {
    const deviceName = getDeviceName(runtime._editingTarget.deviceName);
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id),
      port: cast.toNumber(args.port)
    };
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.${deviceName}.SetSeeedLightSensor`, params).then(() => {
      resolve();
    });
  });

  runtime._primitives.PhotoelectricSensor_GetSeeedLightSensor = args => new Promise(resolve => {
    const deviceName = getDeviceName(runtime._editingTarget.deviceName);
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.mode = args.port;
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.${deviceName}.GetSeeedLightSensor`, params).then(data => {
      resolve(data.intensity);
    });
  });

  runtime._primitives.PhotoelectricSensor_SetColorSensor = args => new Promise(resolve => {
    const deviceName = getDeviceName(runtime._editingTarget.deviceName);
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.enable = !!cast.toNumber(args.IsEnable);
    params.port = cast.toNumber(args.port);
    params.version = cast.toNumber(args.Version);
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.${deviceName}.SetColorSensor`, params).then(() => {
      resolve();
    });
  });

  runtime._primitives.PhotoelectricSensor_GetColorSensor = args => new Promise(resolve => {
    const deviceName = getDeviceName(runtime._editingTarget.deviceName);
    const ColorSensor = cast.toNumber(args.color);
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.mode = args.port;
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.${deviceName}.GetColorSensor`, params).then(data => {
      switch (ColorSensor) {
      case 1:
        resolve(data.red);
        break;
      case 2:
        resolve(data.green);
        break;
      case 3:
        resolve(data.blue);
        break;
      }
    });
  });
};

export const photoelectricAndColorSensorBlocks = function (intl, runtime) {
  generatePrimitiveFunc(runtime);
  const getGPPort = function () {
    const magicianPorts = [
      ['GP1', '0'],
      ['GP2', '1'],
      ['GP4', '2'],
      ['GP5', '3']
    ];
    const controllerPorts = [
      ['port1', '0'],
      ['port2', '1'],
      ['port3', '2'],
      ['port4', '3'],
      ['port5', '4'],
      ['port6', '5']
    ];
    if (runtime._editingTarget.deviceName === 'controller'){
      return controllerPorts;
    }
    return magicianPorts;
  };
  ScratchBlocks.Blocks.PhotoelectricSensor_SetInfraredSensor = {
    init: function() {
      this.jsonInit({
        // intl.messages.AI_VIOCE
        message0: intl.messages.EXTENSION_PHOTOELECTRICSENSOR_SETINFRAREDSENSOR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}Photoelectric_Color_Sensor.png`,
            width: 40,
            height: 40
          },
          {
            type: 'field_dropdown',
            name: 'IsEnable',
            options: [
              [intl.messages.EXTENSION_PHOTOELECTRICSENSOR_ON, '1'],
              [intl.messages.EXTENSION_PHOTOELECTRICSENSOR_OFF, '0']
            ]
          },
          {
            type: 'field_dropdown',
            name: 'Version',
            options: [
              ['V1', '0'],
              ['V2', '1']
            ]
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: getGPPort
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'photoelectricAndColorSensor',
        extensions: ['shape_statement']
      });
    }
  };

  ScratchBlocks.Blocks.PhotoelectricSensor_GetInfraredSensor = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.EXTENSION_PHOTOELECTRICSENSOR_GETINFRAREDSENSOR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}Photoelectric_Color_Sensor.png`,
            width: 40,
            height: 40
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: getGPPort
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'photoelectricAndColorSensor',
        extensions: ['output_string']
      });
    }
  };

  ScratchBlocks.Blocks.PhotoelectricSensor_SetSeeedLightSensor = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.EXTENSION_PHOTOELECTRICSENSOR_SETSEEEDLIGHTSENSOR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}Photoelectric_Color_Sensor.png`,
            width: 40,
            height: 40
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: getGPPort
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'photoelectricAndColorSensor',
        extensions: ['shape_statement']
      });
    }
  };

  ScratchBlocks.Blocks.PhotoelectricSensor_GetSeeedLightSensor = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.EXTENSION_PHOTOELECTRICSENSOR_GETSEEEDLIGHTSENSOR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}Photoelectric_Color_Sensor.png`,
            width: 40,
            height: 40
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: [
              [intl.messages.EXTENSION_PHOTOELECTRICSENSOR_GETSEEEDLIGHTSENSOR_VISIBLELIGHT, '0'],
              [intl.messages.EXTENSION_PHOTOELECTRICSENSOR_GETSEEEDLIGHTSENSOR_ALL, '1'],
              [intl.messages.EXTENSION_PHOTOELECTRICSENSOR_GETSEEEDLIGHTSENSOR_INFRARED, '2']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'photoelectricAndColorSensor',
        extensions: ['output_string']
      });
    }
  };

  ScratchBlocks.Blocks.PhotoelectricSensor_SetColorSensor = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.EXTENSION_PHOTOELECTRICSENSOR_SETCOLORSENSOR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}Photoelectric_Color_Sensor.png`,
            width: 40,
            height: 40
          },
          {
            type: 'field_dropdown',
            name: 'IsEnable',
            options: [
              [intl.messages.EXTENSION_PHOTOELECTRICSENSOR_ON, '1'],
              [intl.messages.EXTENSION_PHOTOELECTRICSENSOR_OFF, '0']
            ]
          },
          {
            type: 'field_dropdown',
            name: 'Version',
            options: [
              ['V1', '0'],
              ['V2', '1']
            ]
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: getGPPort
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'photoelectricAndColorSensor',
        extensions: ['shape_statement']
      });
    }
  };

  ScratchBlocks.Blocks.PhotoelectricSensor_GetColorSensor = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.EXTENSION_PHOTOELECTRICSENSOR_GETCOLORSENSOR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}Photoelectric_Color_Sensor.png`,
            width: 40,
            height: 40
          },
          {
            type: 'field_dropdown',
            name: 'color',
            options: [
              [intl.messages.EXTENSION_PHOTOELECTRICSENSOR_COLOR_MENU_R, '1'],
              [intl.messages.EXTENSION_PHOTOELECTRICSENSOR_COLOR_MENU_G, '2'],
              [intl.messages.EXTENSION_PHOTOELECTRICSENSOR_COLOR_MENU_B, '3']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'photoelectricAndColorSensor',
        extensions: ['output_string']
      });
    }
  };
};
