import { aiCollectionBlocks } from './aiDataCollection';
import { aiBlocks } from './aiBlocks';
import { aiOverride, colorOverride, magicianOverride, arduinoOverride,
  magicianliteOverride, otherOverride } from './override';
import { stringProcessingBlocks } from './stringProcessing';
import { commonBlocks } from './contextmemuEvent';
import { controllerBlocks } from './controller';
import { photoelectricAndColorSensorBlocks } from './photoelectricAndColorSensor';
import { slidingRailBlocks } from './scratch3_sliding_rail';
import { arduinoCommonBlocks } from './arduino';
import { enlightenmentKitBlock } from './enlightenmentKit';
import { aiStarterAllBlocks } from './aistarter/index';
import { overrideDataCategory } from './overrideDataCategory';
import { text2SpeakBlocks } from './text2SpeakBlocks';
import { blueToothBlocks } from './bluetoothBlocks';
import { translateBlocks } from './translateBlocks';

export const generateBlocks = function (intl, runtime) {
  aiCollectionBlocks(intl, runtime);
  arduinoOverride();
  aiOverride();
  colorOverride();
  magicianOverride(intl, runtime);
  stringProcessingBlocks(intl, runtime);
  aiBlocks(intl, runtime);
  commonBlocks();
  controllerBlocks(intl, runtime);
  magicianliteOverride(intl, runtime);
  otherOverride(intl);
  photoelectricAndColorSensorBlocks(intl, runtime);
  slidingRailBlocks(intl, runtime);
  arduinoCommonBlocks(intl, runtime);
  enlightenmentKitBlock(intl, runtime);
  text2SpeakBlocks(intl, runtime);
  translateBlocks(intl, runtime);
  aiStarterAllBlocks(intl);
  overrideDataCategory();
  blueToothBlocks(intl, runtime);
};
