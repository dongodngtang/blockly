import ScratchBlocks from 'scratch-blocks';
import disableEvent from './util/disableEventUtils';
import { store } from '../app-state-hoc';
import {
  setDeviceConnectionModalExtensionId
} from '../../reducers/device-conenct-modal';
import { openDeviceConnectionModal } from '../../reducers/modals';

const motionString = [
  'JumpTo',
  'Goto',
  'MoveDistance',
  'SetJointAngle',
  'SetR',
  'Jump',
  'Realative',
  'Joints'
];
let procCode;

const setBlockIptValue = function(block, blickType, event){
  return function(){
    const { poseData } = store.getState().scratchGui.connectionModal;
    const { connectedList } = store.getState().scratchGui.connectedDeviceStatus;
    const { vm } = store.getState().scratchGui;
    const isConnected = connectedList.includes(vm.editingTarget.id);
    if (isConnected){
      if (blickType === 'SetR'){
        block.getInputTargetBlock('r').setFieldValue(poseData.r, 'NUM');
      } else if (blickType === 'SetJointAngle' || blickType === 'Joints'){
        block.getInputTargetBlock('Joint1').setFieldValue(poseData.jointAngle[0], 'NUM');
        block.getInputTargetBlock('Joint2').setFieldValue(poseData.jointAngle[1], 'NUM');
        block.getInputTargetBlock('Joint3').setFieldValue(poseData.jointAngle[2], 'NUM');
        block.getInputTargetBlock('Joint4').setFieldValue(poseData.jointAngle[3], 'NUM');
      } else {
        block.getInputTargetBlock('x').setFieldValue(poseData.x, 'NUM');
        block.getInputTargetBlock('y').setFieldValue(poseData.y, 'NUM');
        block.getInputTargetBlock('z').setFieldValue(poseData.z, 'NUM');
        block.getInputTargetBlock('r').setFieldValue(poseData.r, 'NUM');
      }
    } else {
      store.dispatch(setDeviceConnectionModalExtensionId(vm.editingTarget.deviceName));
      store.dispatch(openDeviceConnectionModal());
    }
    
  };
};

export const commonBlocks = function() {
  const copySingleOption = function(block, event) {
    const duplicateOption = {
      text: store.getState().locales.messages.DUPLICATESINGLE,
      enabled: true,
      callback:
          ScratchBlocks.scratchBlocksUtils.duplicateAndDragCallback(block, event, true)
    };
    return duplicateOption;
  };
  const disableAllBlocks = function(block, event){
    const disableAllBlocksOption = {
      text: store.getState().locales.messages.DISABLE_ALL_BLOCKS,
      enabled: true,
      callback: disableEvent.disableAll(block, event)
    };
    return disableAllBlocksOption;
  };
  // const disableSingleBlock = function(block, event){
  //   const disableSingleBlockOption = {
  //     text: store.getState().locales.messages.DISABLE_THIS_BLOCKS,
  //     enabled: true,
  //     callback: disableEvent.disableSingle(block, event)
  //   };
  //   return disableSingleBlockOption;
  // };

  const cancelAllBlocksDisable = function(block, event){
    const cancelAllBlocksDisableOption = {
      text: store.getState().locales.messages.CANCEL_ALL_BLOCKS,
      enabled: true,
      callback: disableEvent.cancelAllDisable(block, event)
    };
    return cancelAllBlocksDisableOption;
  };

  // const cancelSingleblockDisable = function(block, event){
  //   const cancelSingleblockDisableOption = {
  //     text: store.getState().locales.messages.CANCEL_THIS_BLOCKS,
  //     enabled: true,
  //     callback: disableEvent.cancelSingleDisable(block, event)
  //   };
  //   return cancelSingleblockDisableOption;
  // };

  const showPostInblock = function(block, event){
    const disableSingleBlockOption = {
      text: store.getState().locales.messages.FILL_COORDINATES,
      enabled: true,
      callback: setBlockIptValue(block, event)
    };
    return disableSingleBlockOption;
  };

  ScratchBlocks.BlockSvg.prototype.showContextMenu_ = function(e) {
    // 重写customContextMenu以修改删除自定义积木时提示文案
    this.customContextMenu = function (menuOptions) {
      // Add the edit option at the end.
      // 删除编辑选项
      // menuOptions.push(ScratchBlocks.Procedures.makeEditOption(this));
  
      // Find the delete option and update its callback to be specific to
      // functions.
      // eslint-disable-next-line no-cond-assign
      for (let i = 0, option; option = menuOptions[i]; i++) {
        if (option.text === ScratchBlocks.Msg.DELETE_BLOCK) {
          const input = this.getInput('custom_block');
          // this is the root block, not the shadow block.
          if (input && input.connection && input.connection.targetBlock()) {
            procCode = input.connection.targetBlock().getProcCode();
          } else {
            return;
          }
          const rootBlock = this;
          // eslint-disable-next-line no-loop-func
          option.callback = function () {
            const didDelete = ScratchBlocks.Procedures.deleteProcedureDefCallback(
              procCode, rootBlock);
            if (!didDelete) {
              // TODO:(#1151)
              if (store.getState().locales.locale === 'en'){
                alert('To delete a block definition, first remove all uses of the block');
              } else {
                alert('要删除积木定义，请首先删除积木的所有用途');
              }
              
            }
          };
        }
      }
      // Find and remove the duplicate option
      // eslint-disable-next-line no-cond-assign
      for (let i = 0, option; option = menuOptions[i]; i++) {
        if (option.text === ScratchBlocks.Msg.DUPLICATE) {
          menuOptions.splice(i, 1);
          break;
        }
      }
    };


    if (this.workspace.options.readOnly || !this.contextMenu) {
      return;
    }
    // Save the current block in a variable for use in closures.
    const block = this;
    const menuOptions = [];
    if (this.isDeletable() && this.isMovable() && !block.isInFlyout) {
      menuOptions.push(
        ScratchBlocks.ContextMenu.blockDuplicateOption(block, e),
        copySingleOption(block, e)
      );
      
      // 判断是否已经禁用
      if (block.disabled){
        menuOptions.push(
          cancelAllBlocksDisable(block, event)
        );
      } else {
        menuOptions.push(
          disableAllBlocks(block, event)
        );
      }

      // 判断是否为运动模块
      const blickType = block.type.split('_').reverse()[0];
      if (motionString.find(item => item === blickType)){
        menuOptions.push(showPostInblock(block, blickType, event));
      }
      if (this.isEditable() && this.workspace.options.comments) {
        menuOptions.push(ScratchBlocks.ContextMenu.blockCommentOption(block));
      }
      menuOptions.push(ScratchBlocks.ContextMenu.blockDeleteOption(block));
    } else if (this.parentBlock_ && this.isShadow_) {
      this.parentBlock_.showContextMenu_(e);
      return;
    }
  
    // Allow the block to add or modify menuOptions.
    if (this.customContextMenu) {
      this.customContextMenu(menuOptions);
    }
    ScratchBlocks.ContextMenu.show(e, menuOptions, this.RTL);
    ScratchBlocks.ContextMenu.currentBlock = this;
  };

};


ScratchBlocks.scratchBlocksUtils.duplicateAndDragCallback = function(oldBlock, event, isSingle = false) {
  let newBlock;
  const isMouseEvent = ScratchBlocks.Touch.getTouchIdentifierFromEvent(event) === 'mouse';
  return function(e) {
    // Give the context menu a chance to close.
    setTimeout(() => {
      const ws = oldBlock.workspace;
      const svgRootOld = oldBlock.getSvgRoot();
      if (!svgRootOld) {
        throw new Error('oldBlock is not rendered.');
      }
      let xml;
      // Create the new block by cloning the block in the flyout (via XML).
      if (isSingle){
        xml = ScratchBlocks.Xml.blockToDom(oldBlock, true);
      } else {
        xml = ScratchBlocks.Xml.blockToDom(oldBlock);
      }
 
      // The target workspace would normally resize during domToBlock, which
      // will lead to weird jumps.
      // Resizing will be enabled when the drag ends.
      ws.setResizesEnabled(false);

      // Disable events and manually emit events after the block has been
      // positioned and has had its shadow IDs fixed (Scratch-specific).
      ScratchBlocks.Events.disable();
      try {
        // Using domToBlock instead of domToWorkspace means that the new block
        // will be placed at position (0, 0) in main workspace units.
        newBlock = ScratchBlocks.Xml.domToBlock(xml, ws);

        // Scratch-specific: Give shadow dom new IDs to prevent duplicating on paste
        ScratchBlocks.scratchBlocksUtils.changeObscuredShadowIds(newBlock);

        const svgRootNew = newBlock.getSvgRoot();
        if (!svgRootNew) {
          throw new Error('newBlock is not rendered.');
        }

        // The position of the old block in workspace coordinates.
        const oldBlockPosWs = oldBlock.getRelativeToSurfaceXY();

        // Place the new block as the same position as the old block.
        // TODO: Offset by the difference between the mouse position and the upper
        // left corner of the block.
        newBlock.moveBy(oldBlockPosWs.x, oldBlockPosWs.y);
        if (!isMouseEvent) {
          const offsetX = ws.RTL ? -100 : 100;
          const offsetY = 100;
          newBlock.moveBy(offsetX, offsetY); // Just offset the block for touch.
        }
      } finally {
        ScratchBlocks.Events.enable();
      }
      if (ScratchBlocks.Events.isEnabled()) {
        ScratchBlocks.Events.fire(new ScratchBlocks.Events.BlockCreate(newBlock));
      }

      if (isMouseEvent) {
        // e is not a real mouseEvent/touchEvent/pointerEvent.  It's an event
        // created by the context menu and has the coordinates of the mouse
        // click that opened the context menu.
        const fakeEvent = {
          clientX: event.clientX,
          clientY: event.clientY,
          type: 'mousedown',
          preventDefault: function() {
            e.preventDefault();
          },
          stopPropagation: function() {
            e.stopPropagation();
          },
          target: e.target
        };
        ws.startDragWithFakeEvent(fakeEvent, newBlock);
      }
    }, 0);
  };
};

// eslint-disable-next-line camelcase
ScratchBlocks.Xml.blockToDom = function(block, isSingle = false, opt_noId) {
  // eslint-disable-next-line no-undef
  const element = goog.dom.createDom(block.isShadow() ? 'shadow' : 'block');
  element.setAttribute('type', block.type);
  // eslint-disable-next-line camelcase
  if (!opt_noId) {
    element.setAttribute('id', block.id);
  }
  if (block.mutationToDom) {
    // Custom data for an advanced block.
    const mutation = block.mutationToDom();
    if (mutation && (mutation.hasChildNodes() || mutation.hasAttributes())) {
      element.appendChild(mutation);
    }
  }

  ScratchBlocks.Xml.allFieldsToDom_(block, element);

  ScratchBlocks.Xml.scratchCommentToDom_(block, element);

  if (block.data) {
    // eslint-disable-next-line no-undef
    const dataElement = goog.dom.createDom('data', null, block.data);
    element.appendChild(dataElement);
  }
  // eslint-disable-next-line no-cond-assign
  for (let i = 0, input; input = block.inputList[i]; i++) {
    let container;
    let empty = true;
    if (input.type === ScratchBlocks.DUMMY_INPUT) {
      continue;
    } else {
      const childBlock = input.connection.targetBlock();
      if (input.type === ScratchBlocks.INPUT_VALUE) {
        // eslint-disable-next-line no-undef
        container = goog.dom.createDom('value');
      } else if (input.type === ScratchBlocks.NEXT_STATEMENT) {
        // eslint-disable-next-line no-undef
        container = goog.dom.createDom('statement');
      }
      const shadow = input.connection.getShadowDom();
      if (shadow && (!childBlock || !childBlock.isShadow())) {
        const shadowClone = ScratchBlocks.Xml.cloneShadow_(shadow);
        // Remove the ID from the shadow dom clone if opt_noId
        // is specified to true.
        // eslint-disable-next-line camelcase
        if (opt_noId && shadowClone.getAttribute('id')) {
          shadowClone.removeAttribute('id');
        }
        container.appendChild(shadowClone);
      }
      if (childBlock) {
        container.appendChild(ScratchBlocks.Xml.blockToDom(childBlock, opt_noId));
        empty = false;
      }
    }
    container.setAttribute('name', input.name);
    if (!empty) {
      element.appendChild(container);
    }
  }
  
  if (block.inputsInlineDefault !== block.inputsInline) {
    element.setAttribute('inline', block.inputsInline);
  }
  if (block.isCollapsed()) {
    element.setAttribute('collapsed', true);
  }
  if (block.disabled) {
    element.setAttribute('disabled', true);
  }
  if (!block.isDeletable() && !block.isShadow()) {
    element.setAttribute('deletable', false);
  }
  if (!block.isMovable() && !block.isShadow()) {
    element.setAttribute('movable', false);
  }
  if (!block.isEditable()) {
    element.setAttribute('editable', false);
  }

  if (!isSingle){
    const nextBlock = block.getNextBlock();
    if (nextBlock) {
      // eslint-disable-next-line no-undef
      const container = goog.dom.createDom('next', null,
        ScratchBlocks.Xml.blockToDom(nextBlock, opt_noId));
      element.appendChild(container);
    }
    const shadow = block.nextConnection && block.nextConnection.getShadowDom();
    if (shadow && (!nextBlock || !nextBlock.isShadow())) {
      // eslint-disable-next-line no-undef
      container.appendChild(ScratchBlocks.Xml.cloneShadow_(shadow));
    }
  }
  
  return element;
};
