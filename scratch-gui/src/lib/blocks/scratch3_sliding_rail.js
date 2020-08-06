import ScratchBlocks from 'scratch-blocks';
import { colors } from '../make-device-toolbox-xml/common';
import { store } from '../app-state-hoc';
const cast = require('./util/cast');

const getDeviceName = DeviceName => (DeviceName === 'controller' ? 'MagicBox' : 'Magician');

const generatePrimitiveFunc = runtime => {

  runtime._primitives.SlidingRail_SetLinearRail = args => new Promise(resolve => {
    const deviceName = getDeviceName(runtime._editingTarget.deviceName);
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.enable = !!cast.toNumber(args.IsEnable);
    params.version = cast.toNumber(args.version);
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.${deviceName}.SetDeviceWithL`, params).then(() => {
      resolve();
    });
  });
  
  runtime._primitives.SlidingRail_MagicBox_SetLinearRail = args => new Promise(resolve => {
    const deviceName = getDeviceName(runtime._editingTarget.deviceName);
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.enable = !!cast.toNumber(args.IsEnable);
    params.version = 1;

    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.${deviceName}.SetDeviceWithL`, params).then(() => {
      resolve();
    });
  });

  runtime._primitives.SlidingRail_SetPTPLParams = args => new Promise(resolve => {
    const deviceName = getDeviceName(runtime._editingTarget.deviceName);
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.velocity = cast.toNumber(args.velocity);
    params.acceleration = cast.toNumber(args.acceleration);

    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.${deviceName}.SetPTPLParams`, params).then(() => {
      resolve();
    });
  });

  runtime._primitives.SlidingRail_SetJOGLParams = args => new Promise(resolve => {
    const deviceName = getDeviceName(runtime._editingTarget.deviceName);
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.velocity = cast.toNumber(args.velocity);
    params.acceleration = cast.toNumber(args.acceleration);

    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.${deviceName}.SetJOGLParams`, params).then(() => {
      resolve();
    });
  });

  runtime._primitives.SlidingRail_MoveLinearRailTo = args => new Promise(resolve => {
    const deviceName = getDeviceName(runtime._editingTarget.deviceName);
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    const { poseData } = store.getState().scratchGui.connectionModal;
    params.ptpMode = 1;
    params.l = cast.toNumber(args.value);
    params.x = cast.toNumber(poseData.x);
    params.y = cast.toNumber(poseData.y);
    params.z = cast.toNumber(poseData.z);
    params.r = cast.toNumber(poseData.r);
    params.timeout = 100000;
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      // eslint-disable-next-line no-undefined
      `dobotlink.${deviceName}.SetPTPWithLCmd`, params, undefined,
      100000).then(() => {
      resolve();
    });
  });

};

export const slidingRailBlocks = function (intl, runtime) {
  generatePrimitiveFunc(runtime);
  ScratchBlocks.Blocks.SlidingRail_SetLinearRail = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.SLIDINGRAIL_SETLINEARRAIL,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}LinearRailKit.png`,
            width: 40,
            height: 40
          },
          {
            type: 'field_dropdown',
            name: 'IsEnable',
            options: [
              [intl.messages.SLIDINGRAIL_SUCTIONCUP_STATE_MENU_ON, '1'],
              [intl.messages.SLIDINGRAIL_SUCTIONCUP_STATE_MENU_OFF, '0']
            ]
          },
          {
            type: 'field_dropdown',
            name: 'version',
            options: [
              ['V1', '0'],
              ['V2', '1']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'slidingRail',
        extensions: ['shape_statement']
      });
    }
  };
  // magicBox 没有选择版本功能
  ScratchBlocks.Blocks.SlidingRail_MagicBox_SetLinearRail = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.SLIDINGRAIL_MAGICBOX_SETLINEARRAIL,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}LinearRailKit.png`,
            width: 40,
            height: 40
          },
          {
            type: 'field_dropdown',
            name: 'IsEnable',
            options: [
              [intl.messages.SLIDINGRAIL_SUCTIONCUP_STATE_MENU_ON, '1'],
              [intl.messages.SLIDINGRAIL_SUCTIONCUP_STATE_MENU_OFF, '0']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'slidingRail',
        extensions: ['shape_statement']
      });
    }
  };

  ScratchBlocks.Blocks.SlidingRail_SetPTPLParams = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.SLIDINGRAIL_SETPTPLPARAMS,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}LinearRailKit.png`,
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
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'slidingRail',
        extensions: ['shape_statement']
      });
    }
  };

  ScratchBlocks.Blocks.SlidingRail_SetJOGLParams = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.SLIDINGRAIL_SETJOGLPARAMS,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}LinearRailKit.png`,
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
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'slidingRail',
        extensions: ['shape_statement']
      });
    }
  };

  ScratchBlocks.Blocks.SlidingRail_MoveLinearRailTo = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.SLIDINGRAIL_MOVELINEARRAILTO,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}LinearRailKit.png`,
            width: 40,
            height: 40
          },
          {
            type: 'input_value',
            name: 'value'
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'slidingRail',
        extensions: ['shape_statement']
      });
    }
  };
};
