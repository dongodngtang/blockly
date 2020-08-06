import ScratchBlocks from 'scratch-blocks';

// 禁用积木呈现的颜色
const BlockFillColor = '#cccccc';
const blockStrokeColor = '#aaaaaa';

// 设置禁用积木颜色
const disableColor = function (nodeName){
  nodeName.style.fill = BlockFillColor;
  nodeName.style.stroke = blockStrokeColor;
};

// 还原积木颜色
const restoreColor = function(nodeName){
  nodeName.style.fill = nodeName.getAttribute('fill');
  nodeName.style.stroke = nodeName.getAttribute('stroke');
};

const setDisable = function(block, isloop = false){
  ScratchBlocks.Events.fire(
    new ScratchBlocks.Events.Ui(block, 'block_disabled'));
  block.setDisabled(true);
  disableColor(block.svgPath_);
  block.getDescendants(false, true).map((tempBlock, index) => {
    if (index !== 0 && !tempBlock.outputShape_) return;
    // 只有是当前禁用积木的child 才禁用
    while (tempBlock.getParent()) {
      if (!tempBlock.outputShape_) break;
      tempBlock = tempBlock.getParent();
    }
    if (tempBlock !== block) return;
    tempBlock.setDisabled(true);
    disableColor(tempBlock.svgPath_);
  });

};

const cancelDisable = function(block){
  ScratchBlocks.Events.fire(
    new ScratchBlocks.Events.Ui(block, 'block_cancelDisable'));
  block.getDescendants().map((tempBlock, index) => {
    if (index !== 0 && !block.outputShape_) return;
    restoreColor(tempBlock.svgPath_);
    tempBlock.setDisabled(false);
  });
};


const findNextBlock = function(block, isCancel = false){
  const flag = isCancel;
  // eslint-disable-next-line no-use-before-define
  findChild(block);
  const nextBlock = block.getNextBlock();
  if (nextBlock) {
    if (isCancel){
      cancelDisable(nextBlock);
    } else {
      setDisable(nextBlock, true);
    }
    findNextBlock(nextBlock, flag);
    // eslint-disable-next-line no-use-before-define
    findChild(nextBlock, flag);
  }
};

const outputShapeChild = function(block, isCancel = false){
  const childList = block.childBlocks_;
  childList.map(tempBlock => {
    if (tempBlock.outputShape_){
      if (isCancel){
        restoreColor(tempBlock.svgPath_);
        tempBlock.setDisabled(false);
        // eslint-disable-next-line no-use-before-define
        findChild(tempBlock, isCancel);
      } else {
        tempBlock.setDisabled(true);
        disableColor(tempBlock.svgPath_);
        // eslint-disable-next-line no-use-before-define
        findChild(tempBlock, isCancel);
      }
     
    }
    
  });
};

const findSingleChild = function(block, isCancel = false){
  // eslint-disable-next-line no-cond-assign
  for (let i = 0, input; input = block.inputList[i]; i++) {

    if (input.outlinePath){
      if (isCancel){
        restoreColor(input.outlinePath);
      } else {
        disableColor(input.outlinePath);
      }
    }

    if (input.fieldRow){
      for (let j = 0; j < input.fieldRow.length; j++){
        if (input.fieldRow[j].fieldGroup_){
          if (isCancel){
            restoreColor(input.fieldRow[j].fieldGroup_.firstChild);
          } else {
            disableColor(input.fieldRow[j].fieldGroup_.firstChild);
          }
        }
      }
    }
  }
};

const findChild = function (block, isCancel = false){
  outputShapeChild(block, isCancel);
  const flag = isCancel;
  let childBlock;
  findSingleChild(block, flag);
  // eslint-disable-next-line no-cond-assign
  for (let i = 0, input; input = block.inputList[i]; i++) {
    if (input.type === ScratchBlocks.NEXT_STATEMENT) {
      childBlock = input.connection.targetBlock();
    }
    if (childBlock){
      findSingleChild(childBlock, flag);
      if (isCancel){
        cancelDisable(childBlock);
      } else {
        setDisable(childBlock, true);
      }
      findNextBlock(childBlock, flag);
      findChild(childBlock, flag);
    }
  }
};


const disableEvent = {
  disableAll: function(block, event){
    return function(){
      setDisable(block);
      findChild(block);
    };
  },

  disableSingle: function(block, event){
    return function(){
      setDisable(block);
      findSingleChild(block);
      outputShapeChild(block);
    };
  },

  cancelSingleDisable: function(block, event) {
    return function(){
      cancelDisable(block);
      findSingleChild(block, true);
      outputShapeChild(block, true);
    };
  },
  cancelAllDisable: function(block, event) {
    return function(){
      cancelDisable(block);
      findChild(block, true);
    };
  }
};

window.disableEvent = disableEvent;

export default disableEvent;
