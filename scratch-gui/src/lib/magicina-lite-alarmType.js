import ScratchBlocks from 'scratch-blocks';
import { ALARMTYPECHANGE } from './events';
/** *
 *type 0 : 丢步处理；
 *type 1 : 手动点击确定清除报警，机器自动回到固定点位；
 *type 2 : 点击确定关闭弹窗，重启后无异常则自动清除报警
 *type 3 : 设置运动速度 积木块，高亮并浮窗提示3秒，重新设置正确后不再提示
 */
export const alarmObject = {};
export const initalarmTypeFu = () => {
  alarmObject.alarmType = {
    16: {
      content: ScratchBlocks.Msg.ALARMTYPE_LIMIT_ABNORMAL,
      type: 1
    },
    17: {
      content: ScratchBlocks.Msg.ALARMTYPE_LIMIT_ABNORMAL,
      type: 1
    },
    18: {
      content: ScratchBlocks.Msg.ALARMTYPE_LIMIT_ABNORMAL,
      type: 1
    },
    19: {
      content: ScratchBlocks.Msg.ALARMTYPE_ABNORMAL_MOTION_PARAMETERSL,
      type: 1
    },
    20: {
      content: ScratchBlocks.Msg.ALARMTYPE_ABNORMAL_MOTION_PARAMETERSL,
      type: 1
    },
    21: {
      content: ScratchBlocks.Msg.ALARMTYPE_JUMP_ABNORMAL_MOTION_PARAMETERSL,
      type: 1
    },
    32: {
      content: ScratchBlocks.Msg.ALARMTYPE_LIMIT_ABNORMAL,
      type: 1
    },
    33: {
      content: ScratchBlocks.Msg.ALARMTYPE_LIMIT_ABNORMAL,
      type: 1
    },
    34: {
      content: ScratchBlocks.Msg.ALARMTYPE_LIMIT_ABNORMAL,
      type: 1
    },
    80: {
      content: ScratchBlocks.Msg.ALARMTYPE_STEP_LOSS1,
      type: 0
    },
    81: {
      content: ScratchBlocks.Msg.ALARMTYPE_STEP_LOSS2,
      type: 0
    },
    82: {
      content: ScratchBlocks.Msg.ALARMTYPE_STEP_LOSS3,
      type: 0
    },
    83: {
      content: ScratchBlocks.Msg.ALARMTYPE_STEP_LOSS4,
      type: 0
    },
    96: {
      content: ScratchBlocks.Msg.ALARMTYPE_ABNORMAL_MOTION_PARAMETERSL,
      type: 1
    },
    97: {
      content: ScratchBlocks.Msg.ALARMTYPE_ABNORMAL_MOTION_PARAMETERSL,
      type: 1
    },
    98: {
      content: ScratchBlocks.Msg.ALARMTYPE_ABNORMAL_MOTION_PARAMETERSL,
      type: 1
    },
    100: {
      content: ScratchBlocks.Msg.ALARMTYPE_EXCEPTION_RESTART,
      type: 2
    },
    101: {
      content: ScratchBlocks.Msg.ALARMTYPE_PARAMETER_EXCEPTION,
      type: 1
    },
    102: {
      content: ScratchBlocks.Msg.ALARMTYPE_PARAMETER_EXCEPTION,
      type: 1
    },
    103: {
      content: ScratchBlocks.Msg.ALARMTYPE_PARAMETER_EXCEPTION,
      type: 1
    },
    104: {
      content: ScratchBlocks.Msg.ALARMTYPE_FORMAT_FAILURE,
      type: 2
    },
    105: {
      content: ScratchBlocks.Msg.ALARMTYPE_FORMAT_FAILURE,
      type: 2
    }
  };
};

document.addEventListener(ALARMTYPECHANGE, initalarmTypeFu);

export const checkType = alarmNum => {
  if (Object.prototype.hasOwnProperty.call(alarmObject.alarmType, alarmNum)){
    return alarmObject.alarmType[alarmNum];
  }
};
