import ScratchBlocks from 'scratch-blocks';
import { colors } from '../make-device-toolbox-xml/common';
const cast = require('./util/cast');


const generatePrimitiveFunc = runtime => {

  runtime._primitives.BlueTooth_setBlueTooth = args => new Promise(resolve => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.groupID = cast.toString(args.name);
    params.devID = cast.toNumber(args.id);
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.MagicBox.SetBleMesh`, params).then(() => {
      resolve();
    });
  });
  runtime._primitives.BlueTooth_getBlueToothMesagges = args => new Promise(resolve => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    const id = cast.toNumber(args.id);
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.MagicBox.BleReadMeshData`, params).then(res => {
      let data = '';
      if (res.devID === id) {
        data = res.data;
      }
      resolve(data);
    });
  });
  runtime._primitives.BlueTooth_setBlueToothMesagges = args => new Promise(resolve => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.devID = cast.toNumber(args.id);
    params.data = cast.toString(args.msg);
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.MagicBox.BleWriteMeshData`, params).then(() => {
      resolve();
    });
  });
  runtime._primitives.BlueTooth_isGetBlueToothMesagges = args => new Promise(resolve => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    const id = cast.toNumber(args.id);
    const msg = cast.toString(args.msg);
    runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.MagicBox.BleReadMeshData`, params).then(res => {
      resolve(id === res.devID && msg === res.data);
    });
  });

};

export const blueToothBlocks = function (intl, runtime) {
  generatePrimitiveFunc(runtime);
  ScratchBlocks.Blocks.BlueTooth_setBlueTooth = {
    init: function() {
      this.jsonInit({
        id: 'BlueTooth_setBlueTooth',
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

  ScratchBlocks.Blocks.BlueTooth_getBlueToothMesagges = {
    init: function() {
      this.jsonInit({
        id: 'BlueTooth_getBlueToothMesagges',
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

  ScratchBlocks.Blocks.BlueTooth_setBlueToothMesagges = {
    init: function() {
      this.jsonInit({
        id: 'BlueTooth_setBlueToothMesagges',
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

  ScratchBlocks.Blocks.BlueTooth_isGetBlueToothMesagges = {
    init: function() {
      this.jsonInit({
        id: 'BlueTooth_isGetBlueToothMesagges',
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

  ScratchBlocks.Blocks.BlueTooth_start = {
    init: function() {
      this.jsonInit({
        id: 'BlueTooth_start',
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
