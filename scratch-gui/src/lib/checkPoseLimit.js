/* eslint-disable max-len */
import { message, Modal } from 'antd';
import ScratchBlocks from 'scratch-blocks';
import { store } from './app-state-hoc';
const moveBlock = [
  'Magician_Lite_JumpTo',
  'Magician_Lite_Goto',
  'Magician_Lite_SetJointAngle'
];
const setSpeedBlock = [
  'Magician_Lite_SetPTPCommonParams',
  'Magician_SetPTPCommonParams'
];
let timeout;

const checkPoseLimit = e => {
 
  if (Blockly.getMainWorkspace().blockDB_[e.blockId] && e.recordUndo && e.element && e.oldValue !== e.newValue){
    const blockType = Blockly.getMainWorkspace().blockDB_[e.blockId].parentBlock_.type;
    if (moveBlock.includes(blockType) || setSpeedBlock.includes(blockType)){
      const { vm } = store.getState().scratchGui;
      const isConnected = store.getState().scratchGui.connectedDeviceStatus.connectedList.includes(vm.editingTarget.id);
      if (!isConnected){
        return;
      }
      let flag = false;
      const parentBlock = Blockly.getMainWorkspace().blockDB_[e.blockId].parentBlock_;
      window.a = parentBlock;
      const inputArr = [];
      const inputList = parentBlock.inputList;
      for (let i = 0; i < inputList.length; i++) {
        if (inputList[i].name){
          let num = parseInt(Blockly.Python.valueToCode(parentBlock, inputList[i].name), 10);
          num = isNaN(num) ? 0 : num;
          inputArr.push(num);
        }
      }
      const portName = vm.runtime.findKey(vm.editingTarget.id);
      if (setSpeedBlock.includes(blockType)){
       
        inputArr.forEach(item => {
          if (item === 0){
            Modal.warning({
              title: ScratchBlocks.Msg.WARNING,
              content: ScratchBlocks.Msg.WARNING_TEXT
            });
          }
        });
        return;
      }
      if (blockType === 'Magician_Lite_SetJointAngle'){
        flag = true;
      }
      const params = {
        portName,
        x: inputArr[0],
        y: inputArr[1],
        z: inputArr[2],
        r: inputArr[3],
        isJoint: flag
      };
      vm.runtime.peripheralExtensions.magicianlite.CheckPoseLimit(params).then(data => {
        if (data.isLimited){
          message.warning(ScratchBlocks.Msg.COORDINATE_TIPS, 1);
        }
      });
    }
  }
};

export const checkPoseLimitDebounce = e => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    checkPoseLimit(e);
    timeout = null;
  }, 600);
};
