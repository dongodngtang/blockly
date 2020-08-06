import ScratchBlocks from 'scratch-blocks';
import { colors } from '../make-device-toolbox-xml/common';

const generatePrimitiveFunc = runtime => {

  runtime._primitives.String_Extract = args => args.inputString.slice(args.startNum - 1, args.endNum);

  runtime._primitives.String_Begin = args => {
    if (args.beginString){
      return args.inputString.indexOf(args.beginString) === 0;
    }
    return false;
  };

  runtime._primitives.String_End = args => {
    if (args.endString){
      return args.inputString.lastIndexOf(args.endString) === args.inputString.length - 1;
    }
    return false;
  };

  runtime._primitives.String_Contain = args => {

    if (args.containsString){
      return args.inputString.lastIndexOf(args.containsString) !== -1;
    }
    return false;
  };

  runtime._primitives.String_Number = args => {
    const reg = (/\d+/g);
    let res;
    let result = '';
    do {
      res = reg.exec(args.inputString);
      if (res){
        result += res[0];
      }
    } while (res);
    return result;
    
  };
};

export const stringProcessingBlocks = function (intl, runtime){
  generatePrimitiveFunc(runtime);

  ScratchBlocks.Blocks.String_Extract = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.EXTRACTING_CHARACTERS,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          },
          {
            type: 'input_value',
            name: 'startNum'
          },
          {
            type: 'input_value',
            name: 'endNum'
          }
        ],
        colour: colors[11].colour,
        colourSecondary: colors[11].secondaryColour,
        colourTertiary: colors[11].secondaryColour,
        category: ScratchBlocks.Categories.more,
        extensions: ['output_string']
      });
    }
  };

  ScratchBlocks.Blocks.String_Begin = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.WHETHER_BEGIN,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          },
          {
            type: 'input_value',
            name: 'beginString'
          }
        ],
        colour: colors[11].colour,
        colourSecondary: colors[11].secondaryColour,
        colourTertiary: colors[11].secondaryColour,
        category: ScratchBlocks.Categories.more,
        extensions: ['output_boolean']
      });
    }
  };

  ScratchBlocks.Blocks.String_End = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.WHETHER_END,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          },
          {
            type: 'input_value',
            name: 'endString'
          }
        ],
        colour: colors[11].colour,
        colourSecondary: colors[11].secondaryColour,
        colourTertiary: colors[11].secondaryColour,
        category: ScratchBlocks.Categories.more,
        extensions: ['output_boolean']
      });
    }
  };

  ScratchBlocks.Blocks.String_Contain = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.WHETHER_CONTAINS,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          },
          {
            type: 'input_value',
            name: 'containsString'
          }
        ],
        colour: colors[11].colour,
        colourSecondary: colors[11].secondaryColour,
        colourTertiary: colors[11].secondaryColour,
        category: ScratchBlocks.Categories.more,
        extensions: ['output_boolean']
      });
    }
  };

  ScratchBlocks.Blocks.String_Number = {
    init: function() {
      this.jsonInit({
        message0: intl.messages.EXTRACT_NUM,
        args0: [
          {
            type: 'input_value',
            name: 'inputString'
          }
        ],
        colour: colors[11].colour,
        colourSecondary: colors[11].secondaryColour,
        colourTertiary: colors[11].secondaryColour,
        category: ScratchBlocks.Categories.more,
        extensions: ['output_string']
      });
    }
  };
};
