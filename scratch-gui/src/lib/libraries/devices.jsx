import React from 'react';
import { FormattedMessage } from 'react-intl';

const magicianImg = require('./extensions/devices/magician.png');
const magicianLiteImg = require('./extensions/devices/magician_lite.png');
const aistarterImg = require('./extensions/devices/aistarter.png');
const arduinoImg = require('./extensions/devices/arduino.png');
const arduinoMega2560Img = require('./extensions/devices/arduinomega.png');
const mobileplatformImg = require('./extensions/devices/mobileplatform.png');
const arduinokitImg = require('./extensions/devices/arduinoKit.png');
const controllerImg = require('./extensions/devices/controller.png');

export const deviceChooseList = [
  {
    name: 'Magician',
    deviceName: 'magician',
    picName: 'magician',
    rawURL: magicianImg,
    type: 'sprite',
    tags: [
      'magician'
    ],
    json: {
      isDevice: true,
      isUpload: false,
      objName: 'Magician',
      deviceName: 'magician',
      costumes: [{
        costumeName: 'magician',
        baseLayerID: -1,
        baseLayerMD5: magicianImg,
        bitmapResolution: 1
      }],
      currentCostumeIndex: 0,
      isDraggable: false,
      visible: false,
      spriteInfo: {}
    }
  },
  {
    name: 'Magician Lite',
    picName: 'magician_lite',
    rawURL: magicianLiteImg,
    type: 'sprite',
    tags: [
      'magician'
    ],
    json: {
      isDevice: true,
      isUpload: false,
      objName: 'Magician Lite',
      deviceName: 'magicianlite',
      costumes: [{
        costumeName: 'magician',
        baseLayerID: -1,
        baseLayerMD5: magicianLiteImg,
        bitmapResolution: 1
      }],
      currentCostumeIndex: 0,
      scratchX: -79,
      scratchY: 11,
      scale: 0,
      direction: 90,
      rotationStyle: 'normal',
      isDraggable: false,
      visible: false,
      spriteInfo: {}
    }
  },
  {
    name: 'Magic Box',
    deviceName: 'controller',
    picName: 'controller',
    rawURL: controllerImg,
    type: 'sprite',
    tags: [
      'magician'
    ],
    json: {
      isDevice: true,
      isUpload: false,
      objName: 'Magic Box',
      deviceName: 'controller',
      costumes: [{
        costumeName: 'controller',
        baseLayerID: -1,
        baseLayerMD5: controllerImg,
        bitmapResolution: 1
      }],
      currentCostumeIndex: 0,
      scale: 0,
      rotationStyle: 'normal',
      isDraggable: false,
      visible: false,
      spriteInfo: {}
    }
  },
  {
    name: 'Mobile Platform',
    picName: 'mobileplatform',
    rawURL: mobileplatformImg,
    type: 'sprite',
    tags: [
      'magician'
    ],
    json: {
      isDevice: true,
      isUpload: true,
      objName: 'Mobile Platform',
      deviceName: 'mobileplatform',
      costumes: [{
        costumeName: 'mobileplatform',
        baseLayerID: -1,
        baseLayerMD5: mobileplatformImg,
        bitmapResolution: 1
      }],
      currentCostumeIndex: 0,
      scale: 0,
      rotationStyle: 'normal',
      isDraggable: false,
      visible: false,
      spriteInfo: {}
    }
  },
  {
    name: 'AIStarter',
    picName: 'aistarter',
    rawURL: aistarterImg,
    type: 'sprite',
    tags: [
      'magician'
    ],
    json: {
      isUpload: true,
      deviceName: 'aistarter',
      isDevice: true,
      objName: 'AIStarter',
      costumes: [{
        costumeName: 'aistarter',
        baseLayerID: -1,
        baseLayerMD5: aistarterImg,
        bitmapResolution: 1
      }],
      currentCostumeIndex: 0,
      scratchX: -79,
      scratchY: 11,
      scale: 0,
      direction: 90,
      rotationStyle: 'normal',
      isDraggable: false,
      visible: false,
      spriteInfo: {}
    }
  },
  {
    name: 'Arduino Kit',
    picName: 'arduinokit',
    rawURL: arduinokitImg,
    type: 'sprite',
    tags: [
      'magician'
    ],
    json: {
      isUpload: true,
      deviceName: 'arduinokit',
      isDevice: true,
      objName: 'Arduino Kit',
      costumes: [{
        costumeName: 'arduinokit',
        baseLayerID: -1,
        baseLayerMD5: arduinokitImg,
        bitmapResolution: 1
      }],
      currentCostumeIndex: 0,
      scratchX: -79,
      scratchY: 11,
      scale: 0,
      direction: 90,
      rotationStyle: 'normal',
      isDraggable: false,
      visible: false,
      spriteInfo: {}
    }
  },
  {
    name: 'Arduino Uno',
    picName: 'arduino',
    rawURL: arduinoImg,
    type: 'sprite',
    tags: [
      'arduino'
    ],
    json: {
      deviceName: 'arduinouno',
      isDevice: true,
      isUpload: true,
      objName: 'Arduino Uno',
      costumes: [{
        costumeName: 'arduino',
        baseLayerID: -1,
        baseLayerMD5: arduinoImg,
        bitmapResolution: 1
      }],
      currentCostumeIndex: 0,
      scale: 1,
      rotationStyle: 'normal',
      isDraggable: false,
      visible: false,
      spriteInfo: {}
    }
  },
  {
    name: 'Arduino Mega2560',
    picName: 'arduinomega',
    rawURL: arduinoMega2560Img,
    type: 'sprite',
    tags: [
      'magician'
    ],
    json: {
      isDevice: true,
      isUpload: true,
      objName: 'Arduino Mega',
      deviceName: 'arduinomega',
      costumes: [{
        costumeName: 'arduinomega',
        baseLayerID: -1,
        baseLayerMD5: arduinoMega2560Img,
        bitmapResolution: 1
      }],
      currentCostumeIndex: 0,
      scale: 0,
      rotationStyle: 'normal',
      isDraggable: false,
      visible: false,
      spriteInfo: {}
    }
  }
];

export const deviceConnectionList = [
  {
    name: 'Magician',
    extensionId: 'magician',
    iconURL: magicianImg,
    insetIconURL: magicianImg,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: false,
    launchPeripheralConnectionFlow: false,
    useAutoScan: true,
    connectionIconURL: magicianImg,
    connectionSmallIconURL: magicianImg,
    connectingMessage: (
      <FormattedMessage
        defaultMessage="Connecting"
        description="Message to help people connect to their WeDo."
        id="gui.extension.wedo2.connectingMessage"
      />
    ),
    helpLink: 'https://dobot.cc'
  },
  {
    name: 'MagicianLite',
    extensionId: 'magicianlite',
    iconURL: magicianLiteImg,
    insetIconURL: magicianLiteImg,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: false,
    launchPeripheralConnectionFlow: false,
    useAutoScan: true,
    connectionIconURL: magicianLiteImg,
    connectionSmallIconURL: magicianLiteImg,
    connectingMessage: (
      <FormattedMessage
        defaultMessage="Connecting"
        description="Message to help people connect to their WeDo."
        id="gui.extension.wedo2.connectingMessage"
      />
    ),
    helpLink: 'https://dobot.cc'
  },
  {
    name: 'Magic Box',
    extensionId: 'controller',
    iconURL: controllerImg,
    insetIconURL: controllerImg,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: false,
    launchPeripheralConnectionFlow: false,
    useAutoScan: true,
    connectionIconURL: controllerImg,
    connectionSmallIconURL: controllerImg,
    connectingMessage: (
      <FormattedMessage
        defaultMessage="Connecting"
        description="Message to help people connect to their WeDo."
        id="gui.extension.wedo2.connectingMessage"
      />
    ),
    helpLink: 'https://dobot.cc'
  }
];
