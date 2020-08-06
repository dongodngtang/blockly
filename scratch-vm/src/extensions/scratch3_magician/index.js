const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const cast = require('../../util/cast');
const formatMessage = require('format-message');
const {timeout} = require('../../util/constants');

/**
 * Icon png to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = require('./Magician.png');

/**
 * Enum for Magician pin states.
 * @readonly
 * @enum {string}
 */
const MAGICIAN_END_FIXTURE = {
  GRIPPER: '59.7',
  SUCTION_CUP: '59.7',
  PEN: '61'
};

const MAGICIAN_MOVE_TYPE = {
  LINE: '2',
  JOINT: '1'
};

const MagicianEIO = {
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

const MAGICIAN_COORDINATE = {
  X: '1',
  Y: '2',
  Z: '3',
  R: '4'
};

const MAGICIAN_PTP_MODE = {
  RELATIVE: '1',
  ABSOLUTE: '4'
};

const MAGICIAN_JOINT = {
  JOINT1: '1',
  JOINT2: '2',
  JOINT3: '3',
  JOINT4: '4'
};

const MAGICIAN_LEVEL = {
  LOW: '0',
  HIGH: '1'
};

const MAGICIAN_PIN = {
  GP1: '0',
  GP2: '1',
  GP4: '2',
  GP5: '3'
};

const MAGICIAN_SUCTIONCUP_STATE = {
  ON: '1',
  OFF: '0'
};

const MAGICIAN_GRIPPER_STATE = {
  GRIP: 'Grip',
  RELEASE: 'Release',
  OFF: 'OFF'
};

/**

/**
 * Scratch 3.0 blocks to interact with a Magician peripheral.
 */
class Scratch3MagicianBlocks {
  /**
     * @return {string} - the name of this extension.
     */
  static get EXTENSION_NAME() {
    return formatMessage({
      id: 'Magician.Extension.EXTENSION_NAME',
      default: 'Magician',
      description: 'Magician'
    });
  }

  /**
     * @return {string} - the ID of this extension.
     */
  static get EXTENSION_ID() {
    return 'MagicianFORController';
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
      value: MAGICIAN_END_FIXTURE.GRIPPER
    },
    {
      text: formatMessage({
        id: 'MAGICIAN_LITE_OPTIONS_SET_END_FIXTURE_SUCTION_CUP',
        default: 'Suction Cup',
        description: 'Suction Cup'
      }),
      value: MAGICIAN_END_FIXTURE.SUCTION_CUP
    },
    {
      text: formatMessage({
        id: 'MagicianLite.END_FIXTURE_MENU.Pen',
        default: 'Pen',
        description: 'Pen'
      }),
      value: MAGICIAN_END_FIXTURE.PEN
    }
    ];
  }

  get MAGICIAN_MOVE_TYPE_MENU() {
    return [{
      text: formatMessage({
        id: 'Magician.Extension.MOVE_TYPE_MENU.Line',
        default: 'Line',
        description: 'Line'
      }),
      value: MAGICIAN_MOVE_TYPE.LINE
    },
    {
      text: formatMessage({
        id: 'Magician.Extension.MOVE_TYPE_MENU.Joint',
        default: 'Joint',
        description: 'Joint'
      }),
      value: MAGICIAN_MOVE_TYPE.JOINT
    }
    ];
  }

  get MAGICIAN_LEVEL_MENU() {
    return [{
      text: formatMessage({
        id: 'Magician.Extension.LEVEL_MENU.High',
        default: 'High',
        description: 'High'
      }),
      value: MAGICIAN_LEVEL.HIGH
    },
    {
      text: formatMessage({
        id: 'Magician.Extension.LEVEL_MENU.Low',
        default: 'Low',
        description: 'Low'
      }),
      value: MAGICIAN_LEVEL.LOW
    }
    ];
  }

  get EIO_MENU() {
    return [
      {
        text: 'EIO16',
        value: MagicianEIO.EIO16
      },
      {
        text: 'EIO17',
        value: MagicianEIO.EIO17
      },
      {
        text: 'EIO18',
        value: MagicianEIO.EIO18
      },
      {
        text: 'EIO19',
        value: MagicianEIO.EIO19
      },
      {
        text: 'EIO20',
        value: MagicianEIO.EIO20
      },
      {
        text: 'EIO21',
        value: MagicianEIO.EIO21
      },
      {
        text: 'EIO22',
        value: MagicianEIO.EIO22
      },
      {
        text: 'EIO23',
        value: MagicianEIO.EIO23
      },
      {
        text: 'EIO24',
        value: MagicianEIO.EIO24
      }
    ];
  }

  get MAGICIAN_COORDINATE_MENU() {
    return [{
      text: 'x',
      value: MAGICIAN_COORDINATE.X
    },
    {
      text: 'y',
      value: MAGICIAN_COORDINATE.Y
    },
    {
      text: 'z',
      value: MAGICIAN_COORDINATE.R
    },
    {
      text: 'r',
      value: MAGICIAN_COORDINATE.Z
    }
    ];
  }

  get MAGICIAN_JOINT_MENU() {
    return [
      {
        text: formatMessage({
          id: 'Magician.Extension.JOINT_MENU.Joint1',
          default: 'Joint1',
          description: 'Joint1'
        }),
        value: MAGICIAN_JOINT.JOINT1
      },
      {
        text: formatMessage({
          id: 'Magician.Extension.JOINT_MENU.Joint2',
          default: 'Joint2',
          description: 'Joint2'
        }),
        value: MAGICIAN_JOINT.JOINT2
      },
      {
        text: formatMessage({
          id: 'Magician.Extension.JOINT_MENU.Joint3',
          default: 'Joint3',
          description: 'Joint3'
        }),
        value: MAGICIAN_JOINT.JOINT3
      },
      {
        text: formatMessage({
          id: 'Magician.Extension.JOINT_MENU.Joint4',
          default: 'Joint4',
          description: 'Joint4'
        }),
        value: MAGICIAN_JOINT.JOINT4
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

  get MAGICIAN_SUCTIONCUP_STATE_MENU() {
    return [{
      text: formatMessage({
        id: 'Magician.Extension.SUCTIONCUP_STATE_MENU.on',
        default: 'on',
        description: 'on'
      }),
      value: MAGICIAN_SUCTIONCUP_STATE.ON
    },
    {
      text: formatMessage({
        id: 'Magician.Extension.SUCTIONCUP_STATE_MENU.off',
        default: 'off',
        description: 'off'
      }),
      value: MAGICIAN_SUCTIONCUP_STATE.OFF
    }
    ];
  }

  get MAGICIAN_GRIPPER_STATE_MENU() {
    return [{
      text: formatMessage({
        id: 'Magician.Extension.GRIPPER_STATE_MENU.Grip',
        default: 'Grip',
        description: 'Grip'
      }),
      value: MAGICIAN_GRIPPER_STATE.GRIP
    },
    {
      text: formatMessage({
        id: 'Magician.Extension.GRIPPER_STATE_MENU.Release',
        default: 'Release',
        description: 'Release'
      }),
      value: MAGICIAN_GRIPPER_STATE.RELEASE
    },
    {
      text: formatMessage({
        id: 'Magician.Extension.GRIPPER_STATE_MENU.OFF',
        default: 'OFF',
        description: 'OFF'
      }),
      value: MAGICIAN_GRIPPER_STATE.OFF
    }
    ];
  }

  get MAGICIAN_PIN_MENU() {
    return [{
      text: 'GP1',
      value: MAGICIAN_PIN.GP1
    },
    {
      text: 'GP2',
      value: MAGICIAN_PIN.GP2
    },
    {
      text: 'GP4',
      value: MAGICIAN_PIN.GP4
    },
    {
      text: 'GP5',
      value: MAGICIAN_PIN.GP5
    }
    ];
  }
  /**
     * Construct a set of Magician blocks.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
  constructor(runtime) {
    this.runtime = runtime;
    // Create a new Magician peripheral instance这个时候的Magician是作为controller的拓展 所以注册设备也应该是controller
    this._peripheral = this.runtime.peripheralExtensions.controller;
  }

  /**
     * @returns {object} metadata for this extension and its blocks.
     */
  getInfo() {
    return {
      id: Scratch3MagicianBlocks.EXTENSION_ID,
      name: Scratch3MagicianBlocks.EXTENSION_NAME,
      blockIconURI: blockIconURI,
      showStatusButton: false,
      blocks: [{
        opcode: 'Magician_Home',
        text: formatMessage({
          id: 'Magician.Extension.Home',
          default: 'Home',
          description: 'Set Home'
        }),
        blockType: BlockType.COMMAND
      },
      {
        opcode: 'Magician_SetEndFixture',
        text: formatMessage({
          id: 'Magician.Extension.SetEndFixture',
          default: 'Select End Effector [BTN] ',
          description: 'Select End Effector'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          BTN: {
            type: ArgumentType.STRING,
            menu: 'end_fixture',
            defaultValue: MAGICIAN_END_FIXTURE.GRIPPER
          }
        }
      },
      {
        opcode: 'Magician_SetPTPCommonParams',
        text: formatMessage({
          id: 'Magician.Extension.SetPTPCommonParams',
          default: 'Set Motion Ratio  Velocity [velocity] % Acceleration [acceleration] %',
          description: 'Set Motion Ratio'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          velocity: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          acceleration: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      },
      {
        opcode: 'Magician_SetJOGJointParams',
        text: formatMessage({
          id: 'Magician.Extension.SetJOGJointParams',
          default: 'Set Joint Velocity [velocity] °/s  Acceleration [acceleration] °/s^2',
          description: 'Set Joint'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          velocity: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          acceleration: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      },
      {
        opcode: 'Magician_SetPTPCoordinateParams_XYZR',
        text: formatMessage({
          id: 'Magician.Extension.SetPTPCoordinateParams_XYZR',
          // eslint-disable-next-line max-len
          default: 'Set XYZ Velocity [Velocity] mm/s R Velocity [RVelocity] mm/s  XYZ Acceleration [Acceleration] mm/s^2 R Acceleration [RAcceleration] mm/s^2',
          description: 'Set Coordinate'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          Velocity: {
            type: ArgumentType.NUMBER,
            defaultValue: 100
          },
          RVelocity: {
            type: ArgumentType.NUMBER,
            defaultValue: 100
          },
          Acceleration: {
            type: ArgumentType.NUMBER,
            defaultValue: 100
          },
          RAcceleration: {
            type: ArgumentType.NUMBER,
            defaultValue: 100
          }
        }
      },
      {
        opcode: 'Magician_SetPTPJumpParams',
        text: formatMessage({
          id: 'Magician.Extension.SetPTPJumpParams',
          default: 'Set Jump Height [jumpHeight] mm',
          description: 'Set Jump Height'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          jumpHeight: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      },
      {
        opcode: 'Magician_SetLostStepParams',
        text: formatMessage({
          id: 'Magician.Extension.SetLostStepParams',
          default: 'Set Lost Step Threshold [threshold] °',
          description: 'Set Lost Step Threshold'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          threshold: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      },
      {
        opcode: 'Magician_SetLostStep',
        text: formatMessage({
          id: 'Magician.Extension.SetLostStep',
          default: 'Set Lost Step',
          description: 'Set Lost Step'
        }),
        blockType: BlockType.COMMAND
      },
      {
        opcode: 'Magician_SetPTPCmd_Jump',
        text: formatMessage({
          id: 'Magician.Extension.SetPTPCmd_Jump',
          default: 'Jump To X [x] Y [y] Z [z] R [r] ',
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
        opcode: 'Magician_SetPTPCmd_Goto',
        text: formatMessage({
          id: 'Magician.Extension.SetPTPCmd_Goto',
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
            defaultValue: MAGICIAN_MOVE_TYPE.LINE
          }
        }
      },
      {
        opcode: 'Magician_SetPTPCmd_Realative',
        text: formatMessage({
          id: 'Magician.Extension.SetPTPCmd_Realative',
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
        opcode: 'Magician_SetLostStepCmd',
        text: formatMessage({
          id: 'Magician.Extension.SetLostStepCmd',
          default: 'Check Lost Step',
          description: 'Check Lost Step'
        }),
        blockType: BlockType.BOOLEAN
      },
      {
        opcode: 'Magician_ClearAllAlarmsState',
        text: formatMessage({
          id: 'Magician.Extension.ClearAllAlarmsState',
          default: 'Clear All Alarms State',
          description: 'Clear All Alarms State'
        }),
        blockType: BlockType.COMMAND
      },
      {
        opcode: 'Magician_SetPTPCmd_Move_Joints',
        text: formatMessage({
          id: 'Magician.Extension.SetPTPCmd_Move_Joints',
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
        opcode: 'Magician_SetEndEffectorSuctionCup',
        text: formatMessage({
          id: 'Magician.Extension.SetEndEffectorSuctionCup',
          default: 'Suction Cup [status]',
          description: 'set Suction Cup'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          status: {
            type: ArgumentType.STRING,
            menu: 'suctioncup_state',
            defaultValue: MAGICIAN_SUCTIONCUP_STATE.ON
          }
        }
      },
      {
        opcode: 'Magician_SetEndEffectorGripper',
        text: formatMessage({
          id: 'Magician.Extension.SetEndEffectorGripper',
          default: 'Gripper [status]',
          description: 'Gripper'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          status: {
            type: ArgumentType.STRING,
            menu: 'gripper_state',
            defaultValue: MAGICIAN_GRIPPER_STATE.GRIP
          }
        }
      },
      {
        opcode: 'Magician_GetPose_Coordinate',
        text: formatMessage({
          id: 'Magician.Extension.GetPose_Coordinate',
          default: 'Get Current Coordinate [coordinate]',
          description: 'Get Current Coordinate'
        }),
        blockType: BlockType.REPORTER,
        arguments: {
          coordinate: {
            type: ArgumentType.STRING,
            menu: 'coordinate',
            defaultValue: MAGICIAN_COORDINATE.X
          }
        }
      },
      {
        opcode: 'Magician_GetPose_Joint',
        text: formatMessage({
          id: 'Magician.Extension.GetPose_Joint',
          default: 'Get Current Joint Angle [joint]',
          description: 'Get Current Joint Angle'
        }),
        blockType: BlockType.REPORTER,
        arguments: {
          joint: {
            type: ArgumentType.STRING,
            menu: 'joint',
            defaultValue: MAGICIAN_JOINT.JOINT1
          }
        }
      },
      {
        opcode: 'Magician_SetR',
        text: formatMessage({
          id: 'Magician.Extension.SetR',
          default: 'Set R [r]° Mode [ptpMode]',
          description: 'Set R'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          r: {
            type: ArgumentType.STRING,
            defaultValue: 0
          }
        }
      }
      ],
      menus: {
        end_fixture: this.END_FIXTURE_MENU,
        move_type: this.MAGICIAN_MOVE_TYPE_MENU,
        level: this.MAGICIAN_LEVEL_MENU,
        eio: this.EIO_MENU,
        coordinate: this.MAGICIAN_COORDINATE_MENU,
        joint: this.MAGICIAN_JOINT_MENU,
        pin: this.MAGICIAN_PIN_MENU,
        suctioncup_state: this.MAGICIAN_SUCTIONCUP_STATE_MENU,
        gripper_state: this.MAGICIAN_GRIPPER_STATE_MENU,
        ptpmode: this.MAGICIAN_PTP_MODE_MENU
      }
    };
  }
  Magician_Home(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return this._peripheral.writeCommand('dobotlink.Magician.SetHOMECmd', params);
  }

  Magician_SetEndFixture(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.xOffset = cast.toNumber(args.BTN);
    params.yOffset = 0;
    params.zOffset = 0;
    return this._peripheral.writeCommand('dobotlink.Magician.SetEndEffectorParams', params);
  }

  Magician_SetPTPCommonParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.velocityRatio = cast.toNumber(args.velocity);
    params.accelerationRatio = cast.toNumber(args.acceleration);
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPCommonParams', params);
  }

  Magician_SetJOGJointParams(args, block) {
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
    return this._peripheral.writeCommand('dobotlink.Magician.SetJOGJointParams', params);
  }

  Magician_SetPTPCoordinateParams_XYZR(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.xyzVelocity = cast.toNumber(args.Velocity);
    params.rVelocity = cast.toNumber(args.RVelocity);
    params.xyzAcceleration = cast.toNumber(args.Acceleration);
    params.rAcceleration = cast.toNumber(args.RAcceleration);
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPCoordinateParams', params);
  }

  Magician_SetPTPJumpParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.jumpHeight = cast.toNumber(args.jumpHeight);
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPJumpParams', params);
  }

  Magician_SetLostStepParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.value = cast.toNumber(args.threshold);
    return this._peripheral.writeCommand('dobotlink.Magician.SetLostStepValue', params);
  }
  Magician_SetLostStep(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return this._peripheral.writeCommand('dobotlink.Magician.SetLostStepCmd', params);
  }

  Magician_SetPTPCmd_Jump(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.ptpMode = 0;
    params.x = cast.toNumber(args.x);
    params.y = cast.toNumber(args.y);
    params.z = cast.toNumber(args.z);
    params.r = cast.toNumber(args.r);
    params.timeout = timeout;
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPCmd', params);
  }

  Magician_SetPTPCmd_Goto(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.ptpMode = cast.toNumber(args.mode);
    params.x = cast.toNumber(args.x);
    params.y = cast.toNumber(args.y);
    params.z = cast.toNumber(args.z);
    params.r = cast.toNumber(args.r);
    params.timeout = timeout;
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPCmd', params);
  }

  Magician_SetPTPCmd_Realative(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.ptpMode = 7;
    params.x = cast.toNumber(args.x);
    params.y = cast.toNumber(args.y);
    params.z = cast.toNumber(args.z);
    params.r = cast.toNumber(args.r);
    params.timeout = timeout;
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPCmd', params);
  }

  Magician_SetLostStepCmd(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return new Promise(resolve => {
      this._peripheral.writeCommand('dobotlink.Magician.GetAlarmsState', params, data => {
        if (!data) {
          resolve(formatMessage({
            id: 'Device.No_Connect_Message',
            default: 'Please Connect Device'
          }));
        }
        resolve(cast.toBoolean(data.state[10]));
      });
    });
  }

  Magician_ClearAllAlarmsState(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return this._peripheral.writeCommand('dobotlink.Magician.ClearAllAlarmsState', params);
  }

  Magician_SetPTPCmd_Move_Joints(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.ptpMode = 4;
    params.x = cast.toNumber(args.Joint1);
    params.y = cast.toNumber(args.Joint2);
    params.z = cast.toNumber(args.Joint3);
    params.r = cast.toNumber(args.Joint4);
    params.timeout = timeout;
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPCmd', params);
  }

  Magician_SetEndEffectorSuctionCup(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.enable = (!!cast.toNumber(args.status));
    params.on = true;
    return this._peripheral.writeCommand('dobotlink.Magician.SetEndEffectorSuctionCup', params);
  }

  Magician_SetEndEffectorGripper(args, block) {
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
    return this._peripheral.writeCommand('dobotlink.Magician.SetEndEffectorGripper', params);
  }

  Magician_SetIODO_digital(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.port);
    params.level = cast.toNumber(args.level);
    params.isBase = true;
    return this._peripheral.writeCommand('dobotlink.Magician.SetIODO', params);
  }

  Magician_SetIOPWM(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.port);
    params.frequency = cast.toNumber(args.Frequency);
    params.dutyCycle = cast.toNumber(args.DutyCycle);
    params.isBase = true;
    return this._peripheral.writeCommand('dobotlink.Magician.SetIOPWM', params);
  }

  Magician_GetPose_Coordinate(args, block) {
    const coordinate = cast.toNumber(args.coordinate);
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return new Promise(resolve => {
      this._peripheral
        .writeCommand('dobotlink.Magician.GetPose', params, data => {
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

  Magician_GetPose_Joint(args, block) {
    const JointAngle = cast.toNumber(args.joint);
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };

    return new Promise(resolve => {
      this._peripheral
        .writeCommand('dobotlink.Magician.GetPose', params, data => {
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

  Magician_GetIODI_Digital(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
    params.isBase = true;
    return new Promise(resolve => {
      this._peripheral.writeCommand('dobotlink.Magician.GetIODI', params, data => {
        if (!data) {
          resolve(formatMessage({
            id: 'Device.No_Connect_Message',
            default: 'Please Connect Device'
          }));
        }
        resolve(data.level);
      });
    });
  }

  Magician_GetIOADC_Analog(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
    params.isBase = true;
    return new Promise(resolve => {
      this._peripheral.writeCommand('dobotlink.Magician.GetIOADC', params, data => {
        if (!data) {
          resolve(formatMessage({
            id: 'Device.No_Connect_Message',
            default: 'Please Connect Device'
          }));
        }
        resolve(data.value);
      });
    });
  }

  Magician_SetIOMultiplexing(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.mode);
    params.multiplex = cast.toNumber(args.pin);
    params.isBase = true;
    return this._peripheral.writeCommand('dobotlink.Magician.SetIOMultiplexing', params);
  }

  Magician_SetR(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.r = cast.toNumber(args.r);
    return this._peripheral.writeCommand('dobotlink.Magician.SetRCmd', params);
  }
}

module.exports = Scratch3MagicianBlocks;
