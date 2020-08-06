import ScratchBlocks from 'scratch-blocks';
import { colors } from '../make-device-toolbox-xml/common';
const cast = require('./util/cast');


const getGPPort = function () {
  return [
    ['port1', '0'],
    ['port2', '1'],
    ['port3', '2'],
    ['port4', '3'],
    ['port5', '4'],
    ['port6', '5']
  ];
};
const getVolume = function () {
  const volumepArr = [];
  for (let i = 0; i < 16; i++){
    const temp = [`${i}`, `${i}`];
    volumepArr.push(temp);
  }
  return volumepArr;
};

const getPlayMusic = () => {
  const playMusicArr = [];
  for (let i = 0; i < 15; i++){
    const temp = [`${i + 1}`, `${i}`];
    playMusicArr.push(temp);
  }
  return playMusicArr;
};

const getPlaySound = () => {
  const playSoundArr = [];
  for (let i = 0; i < 8; i++){
    const temp = [`${i + 1}`, `${i}`];
    playSoundArr.push(temp);
  }
  return playSoundArr;
};

const getPromptTone = () => {
  const promptToneArr = [];
  for (let i = 0; i < 25; i++){
    const temp = [`${i + 1}`, `${i}`];
    promptToneArr.push(temp);
  }
  return promptToneArr;
};

const getColumn = () => {
  const columnArr = [];
  for (let i = 0; i < 15; i++){
    const temp = [`${i + 1}`, `${i}`];
    columnArr.push(temp);
  }
  return columnArr;
};

const getColors = [[2, 0, 0], [0, 2, 0], [0, 0, 2], [2, 2, 0], [2, 2, 2]];

const generatePrimitiveFunc = runtime => {
  runtime._primitives.EnlightenmentKit_setLEDlampRGB = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.index = cast.toNumber(args.lamp);
    params.red = cast.toNumber(args.R);
    params.green = cast.toNumber(args.G);
    params.blue = cast.toNumber(args.B);
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorRGBLEDInit`, { portName: params.portName, port: params.port });
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSetRGBLEDVlaue`, params);
      return res;
    } catch (e){
      console.error(e);
    }
  };
  runtime._primitives.EnlightenmentKit_setLEDlampColor = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    let brightness = Math.round(cast.toNumber(args.value));
    if (brightness > 100){
      brightness = 100;
    } else if (brightness < 0){
      brightness = 0;
    }
    const color = cast.toNumber(args.color);
    params.port = cast.toNumber(args.port);
    params.index = cast.toNumber(args.lamp);
    params.red = getColors[color][0] * brightness;
    params.green = getColors[color][1] * brightness;
    params.blue = getColors[color][2] * brightness;
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorRGBLEDInit`, { portName: params.portName, port: params.port });
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSetRGBLEDVlaue`, params);
      return res;
    } catch (e){
      console.error(e);
    }
  };
  runtime._primitives.EnlightenmentKit_setLEDlamp = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.index = cast.toNumber(args.lamp);
    params.on = !!cast.toNumber(args.switch);
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorRGBLEDInit`, { portName: params.portName, port: params.port });
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSetRGBLEDState`, params);
      return res;
    } catch (e){
      console.error(e);
    }
  };

  runtime._primitives.EnlightenmentKit_voicePlayback = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.text = cast.toString(args.value);
    const baud = 9600;
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSYNInit`, { portName: params.portName, port: params.port, baud });
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSendSYN`, params);
      return res;
    } catch (e){
      console.error(e);
    }
  };
  runtime._primitives.EnlightenmentKit_setVolumeAndSpeed = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.sound = cast.toNumber(args.volume);
    params.speed = cast.toNumber(4);
    const baud = 9600;
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSYNInit`, { portName: params.portName, port: params.port, baud });
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSetSYN`, params);
      return res;
    } catch (e){
      console.error(e);
    }
  };
  runtime._primitives.EnlightenmentKit_playMusic = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.index = cast.toNumber(args.grade);
    params.type = 0;
    const baud = 9600;
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSYNInit`, { portName: params.portName, port: params.port, baud });
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSetSYNMusic`, params);
      return res;
    } catch (e){
      console.error(e);
    }
  };
  runtime._primitives.EnlightenmentKit_playSound = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.index = cast.toNumber(args.grade);
    params.type = 1;
    const baud = 9600;
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSYNInit`, { portName: params.portName, port: params.port, baud });
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSetSYNMusic`, params);
      return res;
    } catch (e){
      console.error(e);
    }
  };
  runtime._primitives.EnlightenmentKit_playPromptTone = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.index = cast.toNumber(args.grade);
    params.type = 2;
    const baud = 9600;
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSYNInit`, { portName: params.portName, port: params.port, baud });
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSetSYNMusic`, params);
      return res;
    } catch (e){
      console.error(e);
    }
  };
  runtime._primitives.EnlightenmentKit_operation = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.cmd = cast.toNumber(args.operation);
    const baud = 9600;
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSYNInit`, { portName: params.portName, port: params.port, baud });
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSetSYNCmd`, params);
      return res;
    } catch (e){
      console.error(e);
    }
  };

  runtime._primitives.EnlightenmentKit_setOLEDDisplay = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.x = 0;
    params.y = 0;
    params.text = cast.toString(args.inputText);
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorOledInit`, { portName: params.portName, port: params.port });
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorOledDisplay`, params);
      return res;
    } catch (e){
      console.warn(e);
    }
  };

  runtime._primitives.EnlightenmentKit_setOLEDRanksDisplay = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.x = cast.toNumber(args.row);
    params.y = cast.toNumber(args.column);
    params.text = cast.toString(args.inputText);
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorOledInit`, { portName: params.portName, port: params.port });
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorOledDisplay`, params);
      return res;
    } catch (e){
      console.error(e);
    }
  };

  runtime._primitives.EnlightenmentKit_setOLEDClear = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorOledInit`, params);
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorOledClear`, params);
      return res;
    } catch (e){
      console.error(e);
    }
  };

  runtime._primitives.EnlightenmentKit_getKnobSensor = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorKnobInit`, params);
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorGetKnob`, params);
      return res.value;
    } catch (e){
      console.error(e);
    }
  };

  
  runtime._primitives.EnlightenmentKit_getLightSensor = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorLightInit`, params);
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorGetLight`, params);
      return res.value;
    } catch (e){
      console.error(e);
    }
  };

  runtime._primitives.EnlightenmentKit_getSoundSensor = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorVoiceInit`, params);
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorGetVoice`, params);
      return res.value;
    } catch (e){
      console.error(e);
    }
  };

  runtime._primitives.EnlightenmentKit_getTemperatureAndHumiditySensor = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    const type = args.type;
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorSHT31Init`, { portName: params.portName, port: params.port });
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorGetSHT31`, params);
      return res[type];
    } catch (e){
      console.error(e);
    }
  };

  runtime._primitives.EnlightenmentKit_getColorSensorRGB = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.index = cast.toNumber(args.type);
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorColorInit`, { portName: params.portName, port: params.port });
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorGetColor`, params);
      return res.value;
    } catch (e){
      console.error(e);
    }
  };
  runtime._primitives.EnlightenmentKit_getColorSensorColor = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    const type = args.type;
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorColorInit`, { portName: params.portName, port: params.port });
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SensorGetColorRes`, params);
      return res.color === type;
    } catch (e){
      console.error(e);
    }
  };


  runtime._primitives.EnlightenmentKit_getphotoelectricitySensorBool = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.version = cast.toNumber(args.Version);
    params.enable = true;
    const type = cast.toNumber(args.bool);
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SetInfraredSensor`, params);
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.GetInfraredSensor`, params);
      return res.status === type;
    } catch (e){
      console.error(e);
    }
  };
  runtime._primitives.EnlightenmentKit_getphotoelectricitySensor = async args => {
    const params = {
      portName: runtime.findKey(runtime._editingTarget.id)
    };
    params.port = cast.toNumber(args.port);
    params.version = cast.toNumber(args.Version);
    params.enable = true;
    try {
      await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.SetInfraredSensor`, params);
      const res = await runtime.peripheralExtensions[runtime._editingTarget.deviceName].writeCommand(
        `dobotlink.MagicBox.GetInfraredSensor`, params);
      return res.status;
    } catch (e){
      console.error(e);
    }
  };
};

export const enlightenmentKitBlock = function (intl, runtime) {
  generatePrimitiveFunc(runtime);
  // light
  ScratchBlocks.Blocks.EnlightenmentKit_setLEDlampRGB = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_setLEDlampRGB',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_LED +
            intl.messages.CONTROLLER_ENLIGHTENMENTKIT_SETLEDLAMPRGB,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: getGPPort
          },
          {
            type: 'field_dropdown',
            name: 'lamp',
            options: [
              ['1', '0'],
              ['2', '1'],
              ['3', '2']
            ]
          },
          {
            type: 'input_value',
            name: 'R'
          },
          {
            type: 'input_value',
            name: 'G'
          },
          {
            type: 'input_value',
            name: 'B'
          }
          
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['shape_statement']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_setLEDlampColor = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_setLEDlampColor',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_LED +
            intl.messages.CONTROLLER_ENLIGHTENMENTKIT_SETLEDLAMPCOLOR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: getGPPort
          },
          {
            type: 'field_dropdown',
            name: 'lamp',
            options: [
              ['1', '0'],
              ['2', '1'],
              ['3', '2']
            ]
          },
          {
            type: 'field_dropdown',
            name: 'color',
            options: [
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_RED, '0'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_GREEN, '1'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_BLUE, '2'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_YELLOW, '3'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_WHITE, '4']
            ]
          },
          {
            type: 'input_value',
            name: 'value'
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['shape_statement']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_setLEDlamp = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_setLEDlamp',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_LED +
            intl.messages.CONTROLLER_ENLIGHTENMENTKIT_SETLEDLAMP,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: getGPPort
          },
          {
            type: 'field_dropdown',
            name: 'lamp',
            options: [
              ['1', '0'],
              ['2', '1'],
              ['3', '2']
            ]
          },
          {
            type: 'field_dropdown',
            name: 'switch',
            options: [
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_ON, '1'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_OFF, '0']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['shape_statement']
      });
    }
  };

  // sound
  ScratchBlocks.Blocks.EnlightenmentKit_voicePlayback = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_voicePlayback',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_SOUND +
        intl.messages.CONTROLLER_ENLIGHTENMENTKIT_VOICE_PLAYBACK,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
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
            name: 'value'
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['shape_statement']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_setVolumeAndSpeed = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_setVolumeAndSpeed',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_SOUND +
        intl.messages.CONTROLLER_ENLIGHTENMENTKIT_SETVOLUME,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
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
            type: 'field_dropdown',
            name: 'volume',
            options: getVolume
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['shape_statement']
      });
    }
  };

  ScratchBlocks.Blocks.EnlightenmentKit_playMusic = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_playMusic',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_SOUND +
        intl.messages.CONTROLLER_ENLIGHTENMENTKIT_PLAYMUSIC,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
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
            type: 'field_dropdown',
            name: 'grade',
            options: getPlayMusic
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['shape_statement']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_playSound = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_playSound',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_SOUND +
        intl.messages.CONTROLLER_ENLIGHTENMENTKIT_PLAYSOUND,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
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
            type: 'field_dropdown',
            name: 'grade',
            options: getPlaySound
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['shape_statement']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_playPromptTone = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_playPromptTone',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_SOUND +
        intl.messages.CONTROLLER_ENLIGHTENMENTKIT_PLAYPROMPTTONE,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
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
            type: 'field_dropdown',
            name: 'grade',
            options: getPromptTone
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['shape_statement']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_operation = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_operation',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_SOUND +
        intl.messages.CONTROLLER_ENLIGHTENMENTKIT_OPERATION,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
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
            type: 'field_dropdown',
            name: 'operation',
            options: [
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_PlAY, '2'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_STOP, '1'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_LAST, '4'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_NEXT, '3']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['shape_statement']
      });
    }
  };

  // 显示
  ScratchBlocks.Blocks.EnlightenmentKit_setOLEDDisplay = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_setOLEDDisplay',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_SETOLEDDISPLAY,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: getGPPort
          },
          {
            type: 'input_value',
            name: 'inputText'
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['shape_statement']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_setOLEDRanksDisplay = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_setOLEDRanksDisplay',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_SETOLEDRANKSDISPLAY,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: getGPPort
          },
          {
            type: 'field_dropdown',
            name: 'row',
            options: [
              ['1', '0'],
              ['2', '1'],
              ['3', '2'],
              ['4', '3']
            ]
          },
          {
            type: 'field_dropdown',
            name: 'column',
            options: getColumn
          },
          {
            type: 'input_value',
            name: 'inputText'
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['shape_statement']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_setOLEDClear = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_setOLEDClear',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_SETOLEDCLEAR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
            width: 40,
            height: 30
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
        category: 'enlightenmentKit',
        extensions: ['shape_statement']
      });
    }
  };
  
  // 传感器
  ScratchBlocks.Blocks.EnlightenmentKit_getKnobSensor = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_getKnobSensor',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_GETKNOBSENSOR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: [
              ['port3', '2'],
              ['port4', '3']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['output_string']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_getLightSensor = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_getLightSensor',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_GETLIGHTSENSOR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: [
              ['port3', '2'],
              ['port4', '3']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['output_string']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_getSoundSensor = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_getSoundSensor',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_GESOUNDSENSOR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: [
              ['port3', '2'],
              ['port4', '3']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['output_string']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_getTemperatureAndHumiditySensor = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_getTemperatureAndHumiditySensor',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_GETTEMPERATUREANDHUMIDITYSENSOR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: getGPPort
          },
          {
            type: 'field_dropdown',
            name: 'type',
            options: [
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_TEMPERATURE, 'tem'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_HUMIDITY, 'hum']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['output_string']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_getColorSensorRGB = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_getColorSensorRGB',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_GETCOLORSENSORRGB,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: getGPPort
          },
          {
            type: 'field_dropdown',
            name: 'type',
            options: [
              ['R', '0'],
              ['G', '1'],
              ['B', '2']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['output_string']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_getColorSensorColor = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_getColorSensorColor',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_GETCOLORSENSORCOLOR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}enlightenment-kit-sensor.png`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: getGPPort
          },
          {
            type: 'field_dropdown',
            name: 'type',
            options: [
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_BLACK, 'black'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_WHITE, 'white'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_RED, 'red'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_GREEN, 'green'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_BLUE, 'blue'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_YELLOW, 'yellow']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['output_boolean']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_getphotoelectricitySensorBool = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_getphotoelectricitySensorBool',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_GETPHOTOELECTRICITYSENSORBOOl,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}Photoelectric_Color_Sensor.png`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: getGPPort
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
            name: 'bool',
            options: [
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_GETPHOTOELECTRICITYSENSORCOVERED, '1'],
              [intl.messages.CONTROLLER_ENLIGHTENMENTKIT_GETPHOTOELECTRICITYSENSORNOOCCLUSION, '0']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['output_boolean']
      });
    }
  };
  ScratchBlocks.Blocks.EnlightenmentKit_getphotoelectricitySensor = {
    init: function() {
      this.jsonInit({
        id: 'EnlightenmentKit_getphotoelectricitySensor',
        message0: intl.messages.CONTROLLER_ENLIGHTENMENTKIT_GETPHOTOELECTRICITYSENSOR,
        args0: [
          {
            type: 'field_image',
            src: `${ScratchBlocks.mainWorkspace.options.pathToMedia}Photoelectric_Color_Sensor.png`,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'port',
            options: getGPPort
          },
          {
            type: 'field_dropdown',
            name: 'Version',
            options: [
              ['V1', '0'],
              ['V2', '1']
            ]
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'enlightenmentKit',
        extensions: ['output_string']
      });
    }
  };
};
