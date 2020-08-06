import './aistarter/aistarterGenerator';
import './arduinoKit/arduinokitGenerator';
import './mobile_platform/mobileplatformGenerator';
import './arduino';
import './python';

// 重写此方法，解决变量名获取有误问题
Blockly.Generator.prototype.valueToCode = function(block, name, outerOrder) {
  if (isNaN(outerOrder)) {
    window.goog.asserts.fail('Expecting valid order from block "%s".', block.type);
  }
  const targetBlock = block.getInputTargetBlock(name);
  if (!targetBlock) {
    return '';
  }
  const tuple = this.blockToCode(targetBlock);
  if (tuple === '') {
    // Disabled block.
    return '';
  }
  window.goog.asserts.assertArray(tuple, 'Expecting tuple from value block "%s".',
    targetBlock.type);
  let code = tuple[0];
  let innerOrder = tuple[1];
  if (Array.isArray(tuple)){
    code = tuple[0];
    innerOrder = tuple[1];
  } else {
    code = tuple;
    innerOrder = tuple[1];
  }
  if (isNaN(innerOrder)) {
    window.goog.asserts.fail('Expecting valid order from value block "%s".',
      targetBlock.type);
  }
  if (!code) {
    return '';
  }

  // Add parentheses if needed.
  let parensNeeded = false;
  const outerOrderClass = Math.floor(outerOrder);
  const innerOrderClass = Math.floor(innerOrder);
  if (outerOrderClass <= innerOrderClass) {
    if (outerOrderClass === innerOrderClass &&
        (outerOrderClass === 0 || outerOrderClass === 99)) {
      // sensitive.  In fact in Python ('a' 'b') 'c' would fail.
    } else {
      parensNeeded = true;
      for (let i = 0; i < this.ORDER_OVERRIDES.length; i++) {
        if (this.ORDER_OVERRIDES[i][0] === outerOrder &&
            this.ORDER_OVERRIDES[i][1] === innerOrder) {
          parensNeeded = false;
          break;
        }
      }
    }
  }
  if (parensNeeded) {
    code = `(${code})`;
  }
  return code;
};
