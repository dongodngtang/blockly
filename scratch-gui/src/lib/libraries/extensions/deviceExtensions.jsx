import React from 'react';
import { FormattedMessage } from 'react-intl';

import slidingRailImg from './magician/SlidingRailKit.png';
import slidingRailSmallImg from './magician/SlidingRailKitsmall.svg';
import magicianLiteImgsvg from './controller/magicianlite.svg';

import magicianLiteImg from './controller/MagicianLite.png';

import PhotoelectricAndColorSensor from './magician/Photoelectric&ColorSensor.png';
import PhotoelectricAndColorSensorSmallImg from './magician/Photoelectric&ColorSensorsmall.svg';

import AIIcon from './controller/AIIcon.png';
import AISmallImg from './controller/AISmallImg.svg';

import enlightenmentKit from './controller/enlightenment-kit.png';
import enlightenmentKitIcon from './controller/enlightenment-kit-icon.png';

export const specialExtensionNames = {
  MagicianLiteAIExtensionFORControllerFORMagician: 'MagicianLiteAIExtensionFORControllerFORMagician'
};

/**
 * 根据设备名筛选出对应的扩展
 * @param {!string} deviceName 设备名称
 * @returns {!array} 扩展列表
 */
export default function getByDeviceName(deviceName) {
  switch (deviceName) {
  case 'magician':
    return [
      {
        name: (
          <FormattedMessage
            defaultMessage="Sliding Rail Kit"
            description="Name for the 'Magician' extension"
            id="gui.extension.magician.SlidingRailKit.name"
          />
        ),
        extensionId: 'SlidingRailFORMagicianFORController',
        iconURL: slidingRailImg,
        insetIconURL: slidingRailSmallImg,
        description: (
          <FormattedMessage
            defaultMessage="This is a Sliding Rail Kit for magician"
            description="Description for the 'Magician' extension"
            id="gui.extension.magician.SlidingRailKit.description"
          />
        ),
        featured: true
      },
      {
        name: (
          <FormattedMessage
            defaultMessage="Photoelectric & Color Sensor"
            description="Name for the 'Magician' extension"
            id="gui.extension.magician.PhotoelectricAndColorSenso.name"
          />
        ),
        extensionId:
            'PhotoelectricAndColorSensorFORMagicianFORController',
        iconURL: PhotoelectricAndColorSensor,
        insetIconURL: PhotoelectricAndColorSensorSmallImg,
        description: (
          <FormattedMessage
            defaultMessage="This is a Photoelectric & Color Sensor for magician"
            description="Description for the 'Magician' extension"
            id="gui.extension.magician.PhotoelectricAndColorSenso.description"
          />
        ),
        featured: true
      }, {
        name: (
          <FormattedMessage
            defaultMessage="AI Extension"
            id="gui.extension.controller.MagicBoxAIExtension"
          />
        ),
        extensionId:
            specialExtensionNames.MagicianLiteAIExtensionFORControllerFORMagician,
        iconURL: AIIcon,
        insetIconURL: AISmallImg,
        description: (
          <FormattedMessage
            defaultMessage="This is the extension of Magician Lite and Magic Box"
            id="gui.extension.controller.MagicBoxExtension.description"
          />
        ),
        featured: true
      }
    ];
  case 'controller':
    return [
      {
        name: (
          <FormattedMessage
            defaultMessage="Magician Lite"
            description="Name for the 'Magic Box' extension"
            id="gui.extension.controller.Magician Lite.name"
          />
        ),
        extensionId: 'MagicianLiteFORController',
        iconURL: magicianLiteImg,
        insetIconURL: magicianLiteImgsvg,
        description: (
          <FormattedMessage
            defaultMessage="This is a magicianlite for controller"
            description="Description for the 'Magic Box' extension"
            id="gui.extension.controller.magicianlite.description"
          />
        ),
        featured: true
      },
      // {
      //   name: (
      //     <FormattedMessage
      //       defaultMessage="Magician"
      //       description="Name for the 'Magic Box' extension"
      //       id="gui.extension.controller.Magician.name"
      //     />
      //   ),
      //   extensionId: 'MagicianFORController',
      //   iconURL: magicianImg,
      //   insetIconURL: magicianImgsvg,
      //   description: (
      //     <FormattedMessage
      //       defaultMessage="This is a magician for controller"
      //       description="Description for the 'Magic Box' extension"
      //       id="gui.extension.controller.magician.description"
      //     />
      //   ),
      //   featured: true
      // },
      {
        name: (
          <FormattedMessage
            defaultMessage="Sliding Rail Kit"
            description="Name for the 'Magic Box' extension"
            id="gui.extension.controller.SlidingRailKit.name"
          />
        ),
        extensionId: 'SlidingRailFORMagicianFORController',
        iconURL: slidingRailImg,
        insetIconURL: slidingRailSmallImg,
        description: (
          <FormattedMessage
            defaultMessage="This is a Sliding Rail Kit for controller"
            description="Description for the 'Magic Box' extension"
            id="gui.extension.controller.SlidingRailKit.description"
          />
        ),
        featured: true
      },
      {
        name: (
          <FormattedMessage
            defaultMessage="Photoelectric & Color Sensor"
            description="Name for the 'Magic Box' extension"
            id="gui.extension.controller.PhotoelectricAndColorSenso.name"
          />
        ),
        extensionId:
            'PhotoelectricAndColorSensorFORMagicianFORController',
        iconURL: PhotoelectricAndColorSensor,
        insetIconURL: PhotoelectricAndColorSensorSmallImg,
        description: (
          <FormattedMessage
            defaultMessage="This is a Photoelectric & Color Sensor for controller"
            description="Description for the 'Magic Box' extension"
            id="gui.extension.controller.PhotoelectricAndColorSenso.description"
          />
        ),
        featured: true
      },
      {
        name: (
          <FormattedMessage
            defaultMessage="AI Extension"
            id="gui.extension.controller.MagicBoxAIExtension"
          />
        ),
        extensionId:
            specialExtensionNames.MagicianLiteAIExtensionFORControllerFORMagician,
        iconURL: AIIcon,
        insetIconURL: AISmallImg,
        description: (
          <FormattedMessage
            defaultMessage="This is the extension of Magician Lite and Magic Box"
            id="gui.extension.controller.MagicBoxExtension.description"
          />
        ),
        featured: true
      },
      {
        name: (
          <FormattedMessage
            defaultMessage="AI Enlightenment Kit"
            id="gui.extension.controller.EnlightenmentKit"
          />
        ),
        extensionId: 'EnlightenmentKitFORController',
        iconURL: enlightenmentKit,
        insetIconURL: enlightenmentKitIcon,
        description: (
          <FormattedMessage
            defaultMessage="This is the enlightenment kit for the control box"
            id="gui.extension.controller.EnlightenmentKit.description"
          />
        ),
        featured: true
      }
    ];
  case 'magicianlite':
    return [
      {
        name: (
          <FormattedMessage
            defaultMessage="AI Extension"
            id="gui.extension.MagicianLiteAIExtension"
          />
        ),
        extensionId:
            specialExtensionNames.MagicianLiteAIExtensionFORControllerFORMagician,
        iconURL: AIIcon,
        insetIconURL: AISmallImg,
        description: (
          <FormattedMessage
            defaultMessage="This is the extension of Magician Lite and Magic Box"
            id="gui.extension.controller.MagicBoxExtension.description"
          />
        ),
        featured: true
      }
    ];
  default:
    return [];
  }
}
