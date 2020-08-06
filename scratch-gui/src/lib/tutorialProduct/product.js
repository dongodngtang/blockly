import { store } from '../app-state-hoc';
import { initProducts, resetChooseproduct } from '../../reducers/tutorialCenter';
import ScratchBlocks from 'scratch-blocks';
import { TUTORIALCHANGE } from '../events';

import magician from '../libraries/extensions/devices/magician.png';
import aistarter from '../libraries/extensions/devices/aistarter.png';
import arduino from '../libraries/extensions/devices/arduino.png';
import arduinoKit from '../libraries/extensions/devices/arduinoKit.png';
import arduinomega from '../libraries/extensions/devices/arduinomega.png';
import magicbox from '../libraries/extensions/devices/controller.png';
import magicianLite from '../libraries/extensions/devices/magician_lite.png';
import mobileplatform from '../libraries/extensions/devices/mobileplatform.png';
import warehousingGoods from './images/magicianLite/warehousingGoods.png';
import smartShoppingAssistant from './images/magicianLite/smartShoppingAssistant.png';
import garbageClassification from './images/magicianLite/garbageClassification.png';
import supermarketIntelligentReplenishmentSystem from
  './images/magicianLite/supermarketIntelligentReplenishmentSystem.png';
const productsObject = {};
const initProductsFu = () => {
  productsObject.products = [
    {
      name: 'Magician',
      image: magician
      // 添加内容时按下面格式添加
      // tutorialContent: [
      //   {
      //     title: 'magican1',
      //     tutorialImage: magician,
      //     blocks: 'magician1',
      //     details: '教程详情，教程详情，教程详情，教程详情'
      //   },
      //   {
      //     title: 'magican2',
      //     tutorialImage: magician,
      //     blocks: 'magician2',
      //     details: '教程详情，教程详情，教程详情，教程详情'
      //   },
      //   {
      //     title: 'magican3',
      //     tutorialImage: magician,
      //     blocks: 'magician3',
      //     details: '教程详情，教程详情，教程详情，教程详情'
      //   }
      // ]
    },
    {
      name: 'Magician Lite',
      image: magicianLite,
      tutorialContent: [
        {
          title: ScratchBlocks.Msg.EXPERIMENT_1_WAREHOUSING_GOODS,
          tutorialImage: warehousingGoods,
          blocks: ScratchBlocks.Msg.EXPERIMENT_1_WAREHOUSING_GOODS,
          details: ''
        },
        {
          title: ScratchBlocks.Msg.EXPERIMENT_2_SUPERMARKET_INTELLIGENT_REPLENISHMENT_SYSTEM,
          tutorialImage: supermarketIntelligentReplenishmentSystem,
          blocks: ScratchBlocks.Msg.EXPERIMENT_2_SUPERMARKET_INTELLIGENT_REPLENISHMENT_SYSTEM,
          details: ''
        },
        {
          title: ScratchBlocks.Msg.EXPERIMENT_3_SMART_SHOPPING_ASSISTANT,
          tutorialImage: smartShoppingAssistant,
          blocks: ScratchBlocks.Msg.EXPERIMENT_3_SMART_SHOPPING_ASSISTANT,
          details: ''
        },
        {
          title: ScratchBlocks.Msg.EXPERIMENT_4_GARBAGE_CLASSIFICATION,
          tutorialImage: garbageClassification,
          blocks: ScratchBlocks.Msg.EXPERIMENT_4_GARBAGE_CLASSIFICATION,
          details: ''
        }
      ]
    },
    {
      name: 'Magic Box',
      image: magicbox
    },
    {
      name: 'Mobile Platform',
      image: mobileplatform
    },
    {
      name: 'AIStarter',
      image: aistarter
    },
    {
      name: 'Arduino Kit',
      image: arduinoKit
    },
    {
      name: 'Arduino Uno',
      image: arduino
    },
    {
      name: 'Arduino Mega2560',
      image: arduinomega
    }
  ];
  store.dispatch(initProducts(productsObject.products));
  store.dispatch(resetChooseproduct());
};

document.addEventListener(TUTORIALCHANGE, initProductsFu);
export { productsObject, initProductsFu };
