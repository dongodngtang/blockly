import ScratchBlocks from 'scratch-blocks';
import { colors } from '../make-device-toolbox-xml/common';
import { camera as cameraUtil } from '../video/camera';
import { recordAudio, playRecord } from '../audiojs/record';
let camListOptions = [['none', 'none']];
cameraUtil.getCameraList().then(res => {
  if (res.length >= 1) {
    camListOptions = res;
  }
});
window.storeAICollection = { picDict: {}, recordDict: {} };

export const indexOptions = () => Array.from({ length: 20 }).map((_, index) => [`${index + 1}`, `${index + 1}`]);

const generatePrimitiveFunc = runtime => {
  runtime._primitives.AIDataCollection_Save = (args, block) => {
    const camera = args.camera;
    const saveIndex = args.index;
    return cameraUtil.requestStream({ video: { deviceId: { exact: camera } }, audio: false }).then(() => {
      window.storeAICollection.picDict[saveIndex] = cameraUtil.captureImageGenerator();
      cameraUtil.stop();
    });
  };
  runtime._primitives.AIDataCollection_SaveLength = (args, blocks) => {
    const key = args.type === 'record' ? 'recordDict' : 'picDict';
    return Object.keys(window.storeAICollection[key]).length;
  };
  runtime._primitives.AIDataCollection_Record = (args, blocks) => {
    const recordTime = args.record_time;
    const recordIndex = args.index;
    return recordAudio(recordTime, recordIndex);
  };
  runtime._primitives.AIDataCollection_Play = args => {
    const blob = window.storeAICollection.recordDict[args.index];
    if (blob){
      return playRecord(blob);
    }
    return 'no record';
  };
};


export const aiCollectionBlocks = function (intl, runtime) {
  generatePrimitiveFunc(runtime);

  ScratchBlocks.Blocks.AIDataCollection_Save = {
    init: function () {
      this.jsonInit({
        id: 'AIDataCollection_Save',
        message0: intl.messages['AIDataCollection.SAVE'],
        args0: [
          {
            type: 'field_dropdown',
            name: 'camera',
            options: camListOptions
          }, {
            type: 'field_dropdown',
            name: 'index',
            options: indexOptions
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'To Save Visual Recognition Data',
        extensions: ['shape_statement'],
        category: 'ai_data_collection'
      });
    }
  };
  ScratchBlocks.Blocks.AIDataCollection_SaveLength = {
    init: function () {
      this.jsonInit({
        id: 'AIDataCollection_SaveLength',
        message0: intl.messages['AIDataCollection.SAVELENGTH'],
        args0: [{
          type: 'field_dropdown',
          name: 'type',
          options: [['record', 'record'], ['image', 'image']]
        }],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'To Get Visual Recognition Image Size',
        extensions: ['output_number'],
        category: 'ai_data_collection'
      });
    }
  };
  ScratchBlocks.Blocks.AIDataCollection_Record = {
    init: function () {
      this.jsonInit({
        id: 'AIDataCollection_Record',
        message0: intl.messages['AIDataCollection.RECORD'],
        args0: [
          {
            type: 'input_value',
            name: 'record_time'
          }, {
            type: 'field_dropdown',
            name: 'index',
            options: indexOptions
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'To Prepare Record',
        extensions: ['shape_statement'],
        category: 'ai_data_collection'
      });
    }
  };
  ScratchBlocks.Blocks.AIDataCollection_Play = {
    init: function () {
      this.jsonInit({
        id: 'AIDataCollection_Play',
        message0: intl.messages['AIDataCollection.PLAY'],
        args0: [{
          type: 'field_dropdown',
          name: 'index',
          options: indexOptions
        }],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'To Play Record',
        extensions: ['shape_statement'],
        category: 'ai_data_collection'
      });
    }
  };
  ScratchBlocks.Blocks.AIDataCollection_ClearImage = {
    init: function () {
      this.jsonInit({
        id: 'AIDataCollection_ClearImage',
        message0: intl.messages['AIDataCollection.CLEARIMAGE'],
        args0: [{
          type: 'field_dropdown',
          name: 'index',
          options: indexOptions
        }],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        tooltip: 'To Delete Image',
        extensions: ['shape_statement'],
        category: 'ai_data_collection'
      });
    }
  };

  ScratchBlocks.Blocks.AIDataCollection_ClearRecord = {
    init: function () {
      this.jsonInit({
        id: 'AIDataCollection_ClearRecord',
        message0: intl.messages['AIDataCollection.CLEARRECORD'],
        args0: [{
          type: 'field_dropdown',
          name: 'index',
          options: indexOptions
        }],
        colour: colors[9].colour,
        colourSecondary: colors[9].secondaryColour,
        colourTertiary: colors[9].secondaryColour,
        tooltip: 'To Delete Record',
        extensions: ['shape_statement'],
        category: 'ai_data_collection'
      });
    }
  };
  ScratchBlocks.Blocks.AIDataCollection_ClearAll = {
    init: function () {
      this.jsonInit({
        id: 'AIDataCollection_ClearAll',
        message0: intl.messages['AIDataCollection.CLEARALL'],
        colour: colors[9].colour,
        colourSecondary: colors[9].secondaryColour,
        colourTertiary: colors[9].secondaryColour,
        tooltip: 'To Delete All Images And Records',
        extensions: ['shape_statement'],
        category: 'ai_data_collection'
      });
    }
  };
};
