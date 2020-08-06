import Blockly from 'scratch-blocks';
import disableEvent from './disableEventUtils';
let isDisabled = false;
const filterBlock = blocks => {
  const disableCategory = ['ai', 'events', 'Magician'];
  const disableBlocks = [
    'Magician_Lite_SetLostStep', 'Magician_Lite_SetLostStepParams',
    'Magician_Lite_SetPTPLParams', 'Magician_Lite_SetPTPCoordinateParams', 'Magician_Lite_SetPTPJointParams',
    'Magician_Lite_SetPTPCommonParams', 'Controller_Analog_output', 'Magician_Lite_SetLostStepCmd',
    'Magician_Lite_ClearAllAlarmsState', 'Magician_Lite_SetJOGJointParams', 'Magician_Lite_SetPTPCoordinateParams_XYZR'
  ];
  const newBlocks = blocks.filter(block => {
    
    if (disableCategory.includes(block.getCategory()) ||
      disableBlocks.includes(block.type.replace('MagicianLiteFORController_', ''))) {
      return true;
    }
    return false;
  });
  return newBlocks;
};
const disableBlocksArray = blocks => {
  blocks.forEach(block => {
    disableEvent.disableSingle(block)();
  });
};
const enableBlocksArray = blocks => {
  blocks.forEach(block => {
    disableEvent.cancelAllDisable(block)();
  });
};

const getOnlineBlocks = () => {
  const toolboxBlocks = Blockly.getMainWorkspace().getToolbox().flyout_.getWorkspace().getAllBlocks();
  const xmlBlocks = Blockly.getMainWorkspace().getAllBlocks();
  return [...toolboxBlocks, ...xmlBlocks];
};
export const disableAllOnlineBlocks = () => {
  disableBlocksArray(filterBlock(getOnlineBlocks()));
  isDisabled = true;
};
export const enableAllOnlineBlocks = () => {
  enableBlocksArray(getOnlineBlocks());
  isDisabled = false;
};
export const getOfflineIsDisabled = () => isDisabled;
