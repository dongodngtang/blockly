const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const cast = require('../../util/cast');
const formatMessage = require('format-message');
const {timeout} = require('../../util/constants');
// const Runtime = require('../../engine/runtime');
// const runtime = new Runtime();

/**
 * Icon png to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = require('./MagicianLite.png');

/**
 * Enum for MagicianLite pin states.
 * @readonly
 * @enum {string}
 */
const MAGICIANLITE_END_FIXTURE = {
  GRIPPER: '2',
  SUCTION_CUP: '1',
  PEN: '3'
};

const MAGICIANLITE_MOVE_TYPE = {
  LINE: '2',
  JOINT: '1'
};

const MagicianLiteEIO = {
  EIO16: '16',
  EIO17: '17',
  EIO18: '18',
  EIO19: '19',
  EIO20: '20',
  EIO21: '21',
  EIO22: '22',
  EIO23: '23',
  EIO24: '24'
};

const MAGICIANLITE_COORDINATE = {
  X: '1',
  Y: '2',
  Z: '3',
  R: '4'
};

const MAGICIANLITE_JOINT = {
  JOINT1: '1',
  JOINT2: '2',
  JOINT3: '3',
  JOINT4: '4'
};

const MAGICIAN_PTP_MODE = {
  RELATIVE: '1',
  ABSOLUTE: '4'
};


const MAGICIANLITE_LEVEL = {
  LOW: '0',
  HIGH: '1'
};

const MAGICIANLITE_PIN = {
  GP1: '0',
  GP2: '1',
  GP3: '2',
  GP4: '3',
  GP5: '4',
  GP6: '5'
};

const MAGICIANLITE_SUCTIONCUP_STATE = {
  ON: '1',
  OFF: '0'
};

const MAGICIANLITE_GRIPPER_STATE = {
  GRIP: 'Grip',
  RELEASE: 'Release',
  OFF: 'OFF'
};

/**

/**
 * Scratch 3.0 blocks to interact with a MagicianLite peripheral.
 */
class Scratch3MagicianLiteBlocks {
  /**
     * @return {string} - the name of this extension.
     */
  static get EXTENSION_NAME() {
    return formatMessage({
      id: 'MAGICIAN_LITE_EXTENSION_NAME',
      default: 'MagicianLite',
      description: 'MagicianLite'
    });
  }

  /**
     * @return {string} - the ID of this extension.
     */
  static get EXTENSION_ID() {
    return 'MagicianLiteFORController';
  }

  /**
     * @return {number} - the tilt sensor counts as "tilted" if its tilt angle meets or exceeds this threshold.
     */
  static get TILT_THRESHOLD() {
    return 15;
  }

  get END_FIXTURE_MENU() {
    return [{
      text: formatMessage({
        id: 'MAGICIAN_LITE_OPTIONS_SET_END_FIXTURE_GRIPPER',
        default: 'Gripper',
        description: 'Gripper'
      }),
      value: MAGICIANLITE_END_FIXTURE.GRIPPER
    },
    {
      text: formatMessage({
        id: 'MAGICIAN_LITE_OPTIONS_SET_END_FIXTURE_SUCTION_CUP',
        default: 'Suction Cup',
        description: 'Suction Cup'
      }),
      value: MAGICIANLITE_END_FIXTURE.SUCTION_CUP
    },
    {
      text: formatMessage({
        id: 'MagicianLite.END_FIXTURE_MENU.Pen',
        default: 'Pen',
        description: 'Pen'
      }),
      value: MAGICIANLITE_END_FIXTURE.PEN
    }
    ];
  }

  get MAGICIANLITE_MOVE_TYPE_MENU() {
    return [{
      text: formatMessage({
        id: 'MagicianLite.Extension.MOVE_TYPE_MENU.Line',
        default: 'Line',
        description: 'Line'
      }),
      value: MAGICIANLITE_MOVE_TYPE.LINE
    },
    {
      text: formatMessage({
        id: 'MagicianLite.Extension.MOVE_TYPE_MENU.Joint',
        default: 'Joint',
        description: 'Joint'
      }),
      value: MAGICIANLITE_MOVE_TYPE.JOINT
    }
    ];
  }

  get MAGICIANLITE_LEVEL_MENU() {
    return [{
      text: formatMessage({
        id: 'MagicianLite.Extension.LEVEL_MENU.High',
        default: 'High',
        description: 'High'
      }),
      value: MAGICIANLITE_LEVEL.HIGH
    },
    {
      text: formatMessage({
        id: 'MagicianLite.Extension.LEVEL_MENU.Low',
        default: 'Low',
        description: 'Low'
      }),
      value: MAGICIANLITE_LEVEL.LOW
    }
    ];
  }

  get EIO_MENU() {
    return [{
      text: 'EIO16',
      value: MagicianLiteEIO.EIO16
    },
    {
      text: 'EIO17',
      value: MagicianLiteEIO.EIO17
    },
    {
      text: 'EIO18',
      value: MagicianLiteEIO.EIO18
    },
    {
      text: 'EIO19',
      value: MagicianLiteEIO.EIO19
    },
    {
      text: 'EIO20',
      value: MagicianLiteEIO.EIO20
    },
    {
      text: 'EIO21',
      value: MagicianLiteEIO.EIO21
    },
    {
      text: 'EIO22',
      value: MagicianLiteEIO.EIO23
    },
    {
      text: 'EIO23',
      value: MagicianLiteEIO.EIO23
    },
    {
      text: 'EIO24',
      value: MagicianLiteEIO.EIO24
    }
    ];
  }

  get MAGICIANLITE_COORDINATE_MENU() {
    return [{
      text: 'x',
      value: MAGICIANLITE_COORDINATE.X
    },
    {
      text: 'y',
      value: MAGICIANLITE_COORDINATE.Y
    },
    {
      text: 'z',
      value: MAGICIANLITE_COORDINATE.Z
    },
    {
      text: 'r',
      value: MAGICIANLITE_COORDINATE.R
    }
    ];
  }

  get MAGICIANLITE_JOINT_MENU() {
    return [{
      text: formatMessage({
        id: 'MagicianLite.Extension.JOINT_MENU.Joint1',
        default: 'Joint1',
        description: 'Joint1'
      }),
      value: MAGICIANLITE_JOINT.JOINT1
    },
    {
      text: formatMessage({
        id: 'MagicianLite.Extension.JOINT_MENU.Joint2',
        default: 'Joint2',
        description: 'Joint2'
      }),
      value: MAGICIANLITE_JOINT.JOINT2
    },
    {
      text: formatMessage({
        id: 'MagicianLite.Extension.JOINT_MENU.Joint3',
        default: 'Joint3',
        description: 'Joint3'
      }),
      value: MAGICIANLITE_JOINT.JOINT3
    },
    {
      text: formatMessage({
        id: 'MagicianLite.Extension.JOINT_MENU.Joint4',
        default: 'Joint4',
        description: 'Joint4'
      }),
      value: MAGICIANLITE_JOINT.JOINT4
    }
    ];
  }
  get MAGICIAN_PTP_MODE_MENU() {
    return [{
      text: formatMessage({
        id: 'Magician.Extension.PTP_MODE_MENU.RELATIVE',
        default: 'relative',
        description: 'relative'
      }),
      value: MAGICIAN_PTP_MODE.RELATIVE
    },
    {
      text: formatMessage({
        id: 'Magician.Extension.PTP_MODE_MENU.ABSOLUTE',
        default: 'absolute',
        description: 'absolute'
      }),
      value: MAGICIAN_PTP_MODE.ABSOLUTE
    }
    ];
  }

  get MAGICIANLITE_SUCTIONCUP_STATE_MENU() {
    return [{
      text: formatMessage({
        id: 'MagicianLite.SUCTIONCUP_STATE_MENU.on',
        default: 'on',
        description: 'on'
      }),
      value: MAGICIANLITE_SUCTIONCUP_STATE.ON
    },
    {
      text: formatMessage({
        id: 'MagicianLite.SUCTIONCUP_STATE_MENU.off',
        default: 'off',
        description: 'off'
      }),
      value: MAGICIANLITE_SUCTIONCUP_STATE.OFF
    }
    ];
  }

  get MAGICIANLITE_GRIPPER_STATE_MENU() {
    return [{
      text: formatMessage({
        id: 'MagicianLite.Extension.GRIPPER_STATE_MENU.Grip',
        default: 'Grip',
        description: 'Grip'
      }),
      value: MAGICIANLITE_GRIPPER_STATE.GRIP
    },
    {
      text: formatMessage({
        id: 'MagicianLite.Extension.GRIPPER_STATE_MENU.Release',
        default: 'Release',
        description: 'Release'
      }),
      value: MAGICIANLITE_GRIPPER_STATE.RELEASE
    },
    {
      text: formatMessage({
        id: 'MagicianLite.Extension.GRIPPER_STATE_MENU.OFF',
        default: 'OFF',
        description: 'OFF'
      }),
      value: MAGICIANLITE_GRIPPER_STATE.OFF
    }
    ];
  }

  get MAGICIANLITE_PIN_MENU() {
    return [{
      text: 'GP1',
      value: MAGICIANLITE_PIN.GP1
    },
    {
      text: 'GP2',
      value: MAGICIANLITE_PIN.GP2
    },
    {
      text: 'GP3',
      value: MAGICIANLITE_PIN.GP3
    },
    {
      text: 'GP4',
      value: MAGICIANLITE_PIN.GP4
    },
    {
      text: 'GP5',
      value: MAGICIANLITE_PIN.GP5
    },
    {
      text: 'GP6',
      value: MAGICIANLITE_PIN.GP6
    }
    ];
  }

  /**
     * Construct a set of MagicianLite blocks.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
  constructor(runtime) {
    this.runtime = runtime;
    // Create a new MagicianLite peripheral instance  这个时候的magicianlite是作为controller的拓展 所以注册设备也应该是controller
    this._peripheral = this.runtime.peripheralExtensions.controller;
  }

  /**
     * @returns {object} metadata for this extension and its blocks.
     */
  getInfo() {
    // 在MagicianBox添加MagicianLit触发
    this.runtime.setIsControllerMagicianlite();
    return {
      id: Scratch3MagicianLiteBlocks.EXTENSION_ID,
      name: Scratch3MagicianLiteBlocks.EXTENSION_NAME,
      blockIconURI: blockIconURI,
      showStatusButton: false,
      blocks: [{
        opcode: 'Magician_Lite_Home',
        text: formatMessage({
          id: 'MagicianLite.Extension.Home',
          default: 'Home',
          description: 'Set Home'
        }),
        blockType: BlockType.COMMAND
      },
      {
        opcode: 'Magician_Lite_SetEndFixture',
        text: formatMessage({
          id: 'MagicianLite.Extension.SetEndFixture',
          default: 'Select End Effector [BTN]',
          description: 'Select End Effector'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          BTN: {
            type: ArgumentType.STRING,
            menu: 'end_fixture',
            defaultValue: MAGICIANLITE_END_FIXTURE.GRIPPER
          }
        }
      },
      {
        opcode: 'Magician_Lite_SetPTPCommonParams',
        text: formatMessage({
          id: 'MagicianLite.Extension.SetPTPCommonParams',
          default: 'Set Motion Ratio  Velocity [percent] %',
          description: 'Set Motion Ratio'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          percent: {
            type: ArgumentType.NUMBER,
            defaultValue: 100
          }
        }
      },
      {
        opcode: 'Magician_Lite_SetPTPJumpParams',
        text: formatMessage({
          id: 'MagicianLite.Extension.SetPTPJumpParams',
          default: 'Set Jump Height [jumpHeight] mm [zLimit] mm',
          description: 'Set Jump Height'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          jumpHeight: {
            type: ArgumentType.NUMBER,
            defaultValue: 10
          },
          zLimit: {
            type: ArgumentType.NUMBER,
            defaultValue: 10
          }
        }
      },
      {
        opcode: 'Magician_Lite_SetLostStepParams',
        text: formatMessage({
          id: 'MagicianLite.Extension.SetLostStepParams',
          default: 'Set Lost Step Threshold [threshold] °',
          description: 'Set Lost Step Threshold'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          threshold: {
            type: ArgumentType.NUMBER,
            defaultValue: 1
          }
        }
      },
      {
        opcode: 'Magician_Lite_SetPTPCmd_Jump',
        text: formatMessage({
          id: 'MagicianLite.Extension.SetPTPCmd_Jump',
          default: 'Jump To X [x] Y [y] Z [z] R [r]',
          description: 'Jump To'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          x: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          y: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          z: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          r: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      },
      {
        opcode: 'Magician_Lite_SetPTPCmd_Goto',
        text: formatMessage({
          id: 'MagicianLite.Extension.SetPTPCmd_Goto',
          default: 'Goto To X [x] Y [y] Z [z] R [r], Move Type [mode]',
          description: 'Goto To'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          x: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          y: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          z: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          r: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          mode: {
            type: ArgumentType.STRING,
            menu: 'move_type',
            defaultValue: MAGICIANLITE_MOVE_TYPE.LINE
          }
        }
      },
      {
        opcode: 'Magician_Lite_SetPTPCmd_Realative',
        text: formatMessage({
          id: 'MagicianLite.Extension.SetPTPCmd_Realative',
          default: 'Relative Move ΔX [x] mm ΔY [y] mm ΔZ [z] mm ΔR [r]°',
          description: 'Relative Move'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          x: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          y: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          z: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          r: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      },
      {
        opcode: 'Magician_Lite_SetLostStep',
        text: formatMessage({
          id: 'MagicianLite.Extension.SetLostStep',
          default: 'Set Lost Step',
          description: 'Set Lost Step'
        }),
        blockType: BlockType.COMMAND
      },
      {
        opcode: 'Magician_Lite_SetPTPCmd_Move_Joints',
        text: formatMessage({
          id: 'MagicianLite.Extension.SetPTPCmd_Move_Joints',
          default: 'Move Joints to Joint1 [Joint1]° Joint2 [Joint2]° Joint3 [Joint3]° Joint4 [Joint4]°',
          description: 'Move Joints'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          Joint1: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          Joint2: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          Joint3: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          Joint4: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      },
      {
        opcode: 'Magician_Lite_SetEndEffectorSuctionCup',
        text: formatMessage({
          id: 'MagicianLite.Extension.SetEndEffectorSuctionCup',
          default: 'Suction Cup [status]',
          description: 'set Suction Cup'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          status: {
            type: ArgumentType.STRING,
            menu: 'suctioncup_state',
            defaultValue: MAGICIANLITE_SUCTIONCUP_STATE.ON
          }
        }
      },
      {
        opcode: 'Magician_Lite_SetEndEffectorGripper',
        text: formatMessage({
          id: 'MagicianLite.Extension.SetEndEffectorGripper',
          default: 'Gripper [status]',
          description: 'Gripper'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          status: {
            type: ArgumentType.STRING,
            menu: 'gripper_state',
            defaultValue: MAGICIANLITE_GRIPPER_STATE.GRIP
          }
        }
      },
      {
        opcode: 'Magician_Lite_GetPose_Coordinate',
        text: formatMessage({
          id: 'MagicianLite.Extension.GetPose_Coordinate',
          default: 'Get Current Coordinate [coordinate]',
          description: 'Get Current Coordinate'
        }),
        blockType: BlockType.REPORTER,
        arguments: {
          coordinate: {
            type: ArgumentType.STRING,
            menu: 'coordinate',
            defaultValue: MAGICIANLITE_COORDINATE.X
          }
        }
      },
      {
        opcode: 'Magician_Lite_GetPose_Joint',
        text: formatMessage({
          id: 'MagicianLite.Extension.GetPose_Joint',
          default: 'Get Current Joint Angle [joint]',
          description: 'Get Current Joint Angle'
        }),
        blockType: BlockType.REPORTER,
        arguments: {
          joint: {
            type: ArgumentType.STRING,
            menu: 'joint',
            defaultValue: MAGICIANLITE_JOINT.JOINT1
          }
        }
      },
      {
        opcode: 'Magician_Lite_ClearAllAlarmsState',
        text: formatMessage({
          id: 'MagicianLite.Extension.ClearAllAlarmsState',
          default: 'Clear All Alarms State',
          description: 'Clear All Alarms State'
        }),
        blockType: BlockType.COMMAND
      },
      {
        opcode: 'Magician_Lite_SetR',
        text: formatMessage({
          id: 'MagicianLite.Extension.SetR',
          default: 'Set R [r]°',
          description: 'Set R'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          r: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      }
      ],
      menus: {
        end_fixture: this.END_FIXTURE_MENU,
        move_type: this.MAGICIANLITE_MOVE_TYPE_MENU,
        level: this.MAGICIANLITE_LEVEL_MENU,
        eio: this.EIO_MENU,
        coordinate: this.MAGICIANLITE_COORDINATE_MENU,
        joint: this.MAGICIANLITE_JOINT_MENU,
        pin: this.MAGICIANLITE_PIN_MENU,
        suctioncup_state: this.MAGICIANLITE_SUCTIONCUP_STATE_MENU,
        gripper_state: this.MAGICIANLITE_GRIPPER_STATE_MENU,
        ptpmode: this.MAGICIAN_PTP_MODE_MENU
      }
    };
  }
  Magician_Lite_Home(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetHOMECmd', params);
  }

  Magician_Lite_SetEndFixture(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.type = cast.toNumber(args.BTN);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetEndEffectorType', params);
  }

  Magician_Lite_SetPTPCommonParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id],
      type: 1
    };
    params.value = cast.toNumber(args.percent);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetArmSpeedRatio', params);
  }

  Magician_Lite_SetJOGJointParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    const velocity = [
      cast.toNumber(args.velocity),
      cast.toNumber(args.velocity),
      cast.toNumber(args.velocity),
      cast.toNumber(args.velocity)];
    const acceleration = [
      cast.toNumber(args.acceleration),
      cast.toNumber(args.acceleration),
      cast.toNumber(args.acceleration),
      cast.toNumber(args.acceleration)];
    params.velocity = velocity;
    params.acceleration = acceleration;
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetPTPJointParams', params);
  }

  Magician_Lite_SetPTPCoordinateParams_XYZR(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.xyzVelocity = cast.toNumber(args.Velocity);
    params.rVelocity = cast.toNumber(args.RVelocity);
    params.xyzAcceleration = cast.toNumber(args.Acceleration);
    params.rAcceleration = cast.toNumber(args.RAcceleration);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetPTPCoordinateParams', params);
  }
  Magician_Lite_SetPTPJumpParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.jumpHeight = cast.toNumber(args.jumpHeight);
    params.zLimit = cast.toNumber(args.zLimit);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetPTPJumpParams', params);
  }

  Magician_Lite_SetLostStepParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.value = cast.toNumber(args.threshold);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetLostStepValue', params);
  }

  Magician_Lite_SetPTPCmd_Jump(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.ptpMode = 0;
    params.x = cast.toNumber(args.x);
    params.y = cast.toNumber(args.y);
    params.z = cast.toNumber(args.z);
    params.r = cast.toNumber(args.r);
    params.timeout = timeout;
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetPTPCmd', params);
  }

  Magician_Lite_SetPTPCmd_Goto(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.ptpMode = cast.toNumber(args.mode);
    params.x = cast.toNumber(args.x);
    params.y = cast.toNumber(args.y);
    params.z = cast.toNumber(args.z);
    params.r = cast.toNumber(args.r);
    params.timeout = timeout;
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetPTPCmd', params);
  }

  Magician_Lite_SetPTPCmd_Realative(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.ptpMode = 7;
    params.x = cast.toNumber(args.x);
    params.y = cast.toNumber(args.y);
    params.z = cast.toNumber(args.z);
    params.r = cast.toNumber(args.r);
    params.timeout = timeout;
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetPTPCmd', params);
  }

  Magician_Lite_SetLostStep(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetLostStepCmd', params);
  }

  Magician_Lite_SetPTPCmd_Move_Joints(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.ptpMode = 4;
    params.x = cast.toNumber(args.Joint1);
    params.y = cast.toNumber(args.Joint2);
    params.z = cast.toNumber(args.Joint3);
    params.r = cast.toNumber(args.Joint4);
    params.timeout = timeout;
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetPTPCmd', params);
  }

  Magician_Lite_SetEndEffectorSuctionCup(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.enable = (!!cast.toNumber(args.status));
    params.on = true;
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetEndEffectorSuctionCup', params);
  }

  Magician_Lite_SetEndEffectorGripper(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    if (args.status === 'Grip') {
      params.enable = true;
      params.on = true;
    } else if (args.status === 'Release') {
      params.enable = true;
      params.on = false;
    } else {
      params.enable = false;
      params.on = false;
    }
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetEndEffectorGripper', params);
  }

  Magician_Lite_GetPose_Coordinate(args, block) {
    const coordinate = cast.toNumber(args.coordinate);
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return new Promise(resolve => {
      this._peripheral
        .writeCommand('dobotlink.MagicianLite.GetPose', params, data => {
          if (!data) {
            return resolve(formatMessage({
              id: 'Device.No_Connect_Message',
              default: 'Please Connect Device'
            }));
          }
          let pose;
          switch (coordinate) {
          case 1:
            pose = data.x;
            break;
          case 2:
            pose = data.y;
            break;
          case 3:
            pose = data.z;
            break;
          case 4:
            pose = data.r;
            break;
          }
          resolve(pose);
        });
    });
  }

  Magician_Lite_GetPose_Joint(args, block) {
    const JointAngle = cast.toNumber(args.joint);
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };

    return new Promise(resolve => {
      this._peripheral
        .writeCommand('dobotlink.MagicianLite.GetPose', params, data => {
          if (!data) {
            return resolve(formatMessage({
              id: 'Device.No_Connect_Message',
              default: 'Please Connect Device'
            }));
          }
          let pose;
          switch (JointAngle) {
          case 1:
            pose = data.jointAngle[0];
            break;
          case 2:
            pose = data.jointAngle[1];
            break;
          case 3:
            pose = data.jointAngle[2];
            break;
          case 4:
            pose = data.jointAngle[3];
            break;
          }
          resolve(pose);
        });
    });
  }
  Magician_Lite_ClearAllAlarmsState(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return this._peripheral.writeCommand('dobotlink.MagicianLite.ClearAllAlarmsState', params);
  }

  Magician_Lite_SetR(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.r = cast.toNumber(args.r);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetRCmd', params);
  }
}

module.exports = Scratch3MagicianLiteBlocks;
