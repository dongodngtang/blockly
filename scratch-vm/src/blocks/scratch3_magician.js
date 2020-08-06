/* eslint-disable no-invalid-this */

const cast = require('../util/cast');
const {timeout: _timeout} = require('../util/constants');
const DobotSerial = require('../io/dobot-serial');
const formatMessage = require('format-message');

class Magician {
  /**
     * Construct a Magician communication object.
     * @param {Runtime} runtime - the Scratch 3.0 runtime
     * @param {string} extensionId - the id of the extension
     */
  constructor(runtime, extensionId) {
    /**
         * The Scratch 3.0 runtime used to trigger the green flag button.
         * @type {Runtime}
         * @private
         */
    this._runtime = runtime;

    /**
         * The DobotSerial connection socket for reading/writing peripheral data.
         * @type {DobotSerial}
         * @private
         */
    this._dobotSerial = null;

    /**
         * The id of the extension this peripheral belongs to.
         */
    this._extensionId = extensionId;

    /**
         * Interval ID for data reading timeout.
         * @type {number}
         * @private
         */
    this._timeoutID = null;

    /**
         * A flag that is true while we are busy sending data to the BLE socket.
         * @type {boolean}
         * @private
         */
    this._busy = false;

    /**
         * ID for a timeout which is used to clear the busy flag if it has been
         * true for a long time.
         */
    this._busyTimeoutID = null;

    // this.disconnect = this.disconnect.bind(this);
    // this._onConnect = this._onConnect.bind(this);
    // this._onMessage = this._onMessage.bind(this);

    this._dobotSerial = DobotSerial;
    this._devType = 'Magician';
    this._commTimeout = 60000;

    this._ports = {};
    this._port = null;
    this._searchList = null;

    this._runtime.registerPeripheralExtension(extensionId, this);
    this.flag = false;
  }

  // setCurrentSpritePort(port) {
  //     console.log('portlllllllllll',port);
  //     this._port = port;
  // }

  /**
     * Called by the runtime when user wants to scan for a peripheral.
     * @param {string} errorMsg 扫描发送错误时的回调事件名称
     * @return {promise} 扫描结果
     */
  scan(errorMsg) {
    return new Promise(resolve => {
      this._dobotSerial
        .scan(this._devType, this._commTimeout)
        .then(data => {
          console.log('[scan received]', data);
          resolve(data);
          this._searchList = data;
          this._runtime.emit(
            this._runtime.constructor.PERIPHERAL_LIST_UPDATE,
            this._searchList
          );
        })
        .catch(e => {
          this._runtime.emit(errorMsg, {
            type: errorMsg,
            msg: null
          });
          console.error('Target scan error', this._extensionId, e);
        });
    });
  }

  writeCommand(method, params, callback, timeout) {
    // if (!this.isConnected(this._runtime._editingTarget.id)) return;
    // if (this._busy) return;
    // console.log('writeCommand', params);
    // this._busy = true;
    // 如果没有端口的话
    if (!params.portName) {
      if (callback) {
        return callback(null);
      }
      return formatMessage({
        id: 'Device.No_Connect_Message',
        default: 'Please Connect Device'
      });
      
    }
    return new Promise((resolve, reject) => {
      this._dobotSerial
        .write(
          method,
          params,
          timeout || this._commTimeout
        )
        .then(data => {
          resolve(data);
          if (callback) {
            callback(data);
          }
        })
        .catch(e => {
          reject(e);
          // this.disconnect(null, e.error.portName);
          console.log('Magician writeCommand error', e);
          // this._busy = true;
        });
    });
  }

  /**
     * Called by the runtime when user wants to connect to a certain peripheral.
     * @param {number} portName - the id of the peripheral to connect to.
     * @param {string} deviceId - 为了多硬件连接进行硬件的区分.
     * @returns {Promise} 返回连接结果
     */
  connect(portName, deviceId) {
    // TODO: id???
    
    return new Promise(resolve => this._dobotSerial
      .write(
        'dobotlink.Magician.ConnectDobot', {
          portName
        },
        this._commTimeout
      )
      .then(() => {
        this._runtime.emit(
          this._runtime.constructor.PERIPHERAL_CONNECTED,
          deviceId
        );
        this._ports[deviceId] = portName;
        resolve({
          portName,
          deviceType: 'magician',
          deviceId
        });
      })
      .catch(e => {
        this._runtime.emit(
          this._runtime.constructor.PERIPHERAL_REQUEST_ERROR,
          this._extensionId
        );
        console.error('Maigician connect error', this._extensionId, e);
      }));
  }

  getPose(deviceId, portName) {
    portName = portName || this._ports[deviceId];
    return new Promise((resolve, reject) => {
      this.writeCommand('dobotlink.Magician.GetPose', {
        portName
      }, resolve, 2000)
        .catch(e => {
          console.error('getPose catch', e);
          reject(e);
        });
    });
  }
  /**
     * Disconnect from the Magician.
     * @param {string} deviceId 待断开的设备Id
     * @param {string} port 待断开设备的端口号
     */
  disconnect(deviceId, port) {
    if (!this._ports[deviceId] || !deviceId) {
      for (const portObj of Object.entries(this._ports)) {
        if (portObj[1] === port) {
          deviceId = portObj[0];
        }
      }
    }
    // 如果没有端口
    if (!port && !this._ports[deviceId]) {
      return;
    }
    this._dobotSerial
      .write(
        'dobotlink.Magician.DisconnectDobot', {
          portName: (port ? port : this._ports[deviceId])
        },
        this._commTimeout
      )
      .catch(e => {
        console.error(
          'Maigician disconnect error',
          this._extensionId,
          e
        );
      })
      .finally(() => {
        this._ports[deviceId] = null;
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_DISCONNECTED, deviceId);
      });
  }

  /**
     * 断开所有连接
     */
  disconnectAll() {
    Object.entries(this._ports).forEach(portEntry => {
      const [deviceId, port] = portEntry;
      this._dobotSerial
        .write('dobotlink.Magician.DisconnectDobot', {
          portName: port
        },
        this._commTimeout)
        .catch(console.error)
        .finally(() => {
          delete this._ports[deviceId];
          this._runtime.emit(this._runtime.constructor.PERIPHERAL_DISCONNECTED, deviceId);
        });
    });
  }

  /**
     * Return true if connected to the Magician.
     * @return {boolean} - whether the Magician is connected.
     * @param {string} deviceId - 为了多硬件连接进行硬件的区分.
     */
  isConnected(deviceId) {
    return !!this._ports[deviceId];
  }

  setJOGcmd(axis, deviceId, isJoint) {
    let cmd;
    switch (axis) {
    case 'X+':
    case 'J1+':
      cmd = 1;
      break;
    case 'X-':
    case 'J1-':
      cmd = 2;
      break;
    case 'Y+':
    case 'J2+':
      cmd = 3;
      break;
    case 'Y-':
    case 'J2-':
      cmd = 4;
      break;
    case 'Z+':
    case 'J3+':
      cmd = 5;
      break;
    case 'Z-':
    case 'J3-':
      cmd = 6;
      break;
    case 'R+':
    case 'J4+':
      cmd = 7;
      break;
    case 'R-':
    case 'J4-':
      cmd = 8;
      break;
    case 'L+':
      cmd = 9;
      break;
    case 'L-':
      cmd = 10;
      break;
    default:
      cmd = 0;
    }
    if (cmd === 9 || cmd === 10){
      isJoint = true;
      this.flag = true;
    } else if (this.flag && cmd === 0){
      isJoint = true;
      this.flag = false;
    }

    this._dobotSerial
      .write(
        'dobotlink.Magician.SetJOGCmd', {
          portName: this._ports[deviceId],
          isJoint,
          cmd: cmd
        },
        this._commTimeout
      )
      .catch(e => {
        console.error('Maigician connect error', this._extensionId, e);
      });
  }

  Home(deviceId) {
    return this._dobotSerial
      .write(
        'dobotlink.Magician.SetHOMECmd', {
          portName: this._ports[deviceId],
          timeout: this._commTimeout
        },
        this._commTimeout
      );
  }
  SetEndEffectorSuctionCup(enable, suck, deviceId) {
    this._dobotSerial
      .write(
        'dobotlink.Magician.SetEndEffectorSuctionCup', {
          portName: this._ports[deviceId],
          enable: enable,
          on: suck
        },
        this._commTimeout
      );
  }
  SetEndEffectorGripper(enable, grip, deviceId) {
    this._dobotSerial
      .write(
        'dobotlink.Magician.SetEndEffectorGripper', {
          portName: this._ports[deviceId],
          enable: enable,
          on: grip
        },
        this._commTimeout
      );
  }
  SetEndEffectorParams(portName, xOffset, yOffset, zOffset) {
    this._dobotSerial
      .write(
        'dobotlink.Magician.SetEndEffectorParams', {
          portName,
          xOffset,
          yOffset,
          zOffset
        },
        this._commTimeout
      );
  }
  SetDeviceWithL(enable, deviceId) {
    this._dobotSerial
      .write(
        'dobotlink.Magician.SetDeviceWithL', {
          portName: this._ports[deviceId],
          enable: enable
        },
        this._commTimeout
      );
  }
  GetJOGCommonParams(portName){
    return this._dobotSerial
      .write(
        'dobotlink.Magician.GetJOGCommonParams', {
          portName: portName
        }
      );
  }
  SetJOGCommonParams(accelerationRatio, velocityRatio, portName){
    return this._dobotSerial
      .write(
        'dobotlink.Magician.SetJOGCommonParams', {
          accelerationRatio,
          velocityRatio,
          portName,
          isQueued: false
        }
      );
  }
  // 获取固件版本号
  GetDeviceVersion(portName){
    return this._dobotSerial
      .write(
        'dobotlink.Magician.GetDeviceVersion', {
          typeIndex: 3,
          portName
        }
      );
  }
  // 清除警报
  ClearAllAlarmsState(portName) {
    return this._dobotSerial
      .write(
        'dobotlink.Magician.ClearAllAlarmsState', {
          portName
        }
      );
  }
  
}
class Scratch3Magician {
  constructor(runtime) {
    /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
    this.runtime = runtime;

    this._peripheral = new Magician(this.runtime, 'magician');
  }

  /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     * **/
  getPrimitives() {
    return {
      Magician_Home: this.Home,
      Magician_SetEndFixture: this.SetEndFixture,
      Magician_SetPTPCommonParams: this.SetPTPCommonParams,
      Magician_SetPTPJointParams: this.SetPTPJointParams,
      Magician_SetPTPCoordinateParams: this.SetPTPCoordinateParams,
      Magician_SetPTPJumpParams: this.SetPTPJumpParams,
      Magician_SetLostStepParams: this.SetLostStepParams,
      Magician_SetLostStep: this.SetLostStep,
      Magician_JumpTo: this.JumpTo,
      Magician_Goto: this.Goto,
      Magician_MoveDistance: this.MoveDistance,
      Magician_ClearAllAlarmsState: this.ClearAllAlarmsState,
      Magician_SetJointAngle: this.SetJointAngle,
      Magician_SetSuctionCup: this.SetSuctionCup,
      Magician_Gripper: this.Gripper,
      Magician_SetIOMultiplexing: this.SetIOMultiplexing,
      Magician_SetLeaveIOutput: this.SetLeaveIOutput,
      Magician_SetPWMOutput: this.SetPWMOutput,
      Magician_SetMotorSpeed: this.SetMotorSpeed,
      Magician_SetMotorSpeedAndDistance: this.SetMotorSpeedAndDistance,
      Magician_SetConveyor: this.SetConveyor,
      Magician_GetCurrentCoordinate: this.GetCurrentCoordinate,
      Magician_GetJointAngle: this.GetJointAngle,
      Magician_GetIODI: this.GetIODI,
      Magician_GetIOADC: this.GetIOADC,
      Magician_SetEndEffectorSuctionCup: this.SetEndEffectorSuctionCup,
      Magician_GetEndEffectorSuctionCup: this.GetEndEffectorSuctionCup
    };
  }

  Home(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id],
      timeout: this._commTimeout
    };
    return this._peripheral.writeCommand('dobotlink.Magician.SetHOMECmd', params);
  }
  SetEndFixture(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.xOffset = cast.toNumber(args.BTN);
    params.yOffset = 0;
    params.zOffset = 0;
    return this._peripheral.writeCommand('dobotlink.Magician.SetEndEffectorParams', params);
  }
  SetPTPCommonParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.velocityRatio = cast.toNumber(args.velocity);
    params.accelerationRatio = cast.toNumber(args.acceleration);
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPCommonParams', params);
  }
  SetPTPJointParams(args, block) {
    const velocity = new Array();
    velocity[0] = cast.toNumber(args.velocity);
    velocity[1] = cast.toNumber(args.velocity);
    velocity[2] = cast.toNumber(args.velocity);
    velocity[3] = cast.toNumber(args.velocity);
    const acceleration = new Array();
    acceleration[0] = cast.toNumber(args.acceleration);
    acceleration[1] = cast.toNumber(args.acceleration);
    acceleration[2] = cast.toNumber(args.acceleration);
    acceleration[3] = cast.toNumber(args.acceleration);
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.velocity = velocity;
    params.acceleration = acceleration;
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPJointParams', params);
  }
  SetPTPCoordinateParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.xyzVelocity = cast.toNumber(args.xyzVelocity);
    params.rVelocity = cast.toNumber(args.rVelocity);
    params.xyzAcceleration = cast.toNumber(args.xyzAcceleration);
    params.rAccleration = cast.toNumber(args.rAccleration);
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPCoordinateParams', params);
  }
  SetPTPJumpParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.jumpHeight = cast.toNumber(args.jumpHeight);
    params.zLimit = cast.toNumber(args.zLimit);
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPJumpParams', params);
  }
  SetLostStepParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.value = cast.toNumber(args.threshold);
    return this._peripheral.writeCommand('dobotlink.Magician.SetLostStepValue', params);
  }
  SetLostStep(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return this._peripheral.writeCommand('dobotlink.Magician.SetLostStepCmd', params);
  }
  JumpTo(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.ptpMode = 0;
    params.x = cast.toNumber(args.x);
    params.y = cast.toNumber(args.y);
    params.z = cast.toNumber(args.z);
    params.r = cast.toNumber(args.r);
    params.timeout = _timeout;
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPCmd', params);
  }
  Goto(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.ptpMode = cast.toNumber(args.moveType);
    params.x = cast.toNumber(args.x);
    params.y = cast.toNumber(args.y);
    params.z = cast.toNumber(args.z);
    params.r = cast.toNumber(args.r);
    params.timeout = _timeout;
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPCmd', params);
  }
  MoveDistance(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.ptpMode = 7;
    params.x = cast.toNumber(args.x);
    params.y = cast.toNumber(args.y);
    params.z = cast.toNumber(args.z);
    params.r = cast.toNumber(args.r);
    params.timeout = _timeout;
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPCmd', params);
  }
  ClearAllAlarmsState(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return this._peripheral.writeCommand('dobotlink.Magician.ClearAllAlarmsState', params);
  }
  SetJointAngle(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.ptpMode = 4;
    params.x = cast.toNumber(args.Joint1);
    params.y = cast.toNumber(args.Joint2);
    params.z = cast.toNumber(args.Joint3);
    params.r = cast.toNumber(args.Joint4);
    params.timeout = _timeout;
    return this._peripheral.writeCommand('dobotlink.Magician.SetPTPCmd', params);
  }
  SetSuctionCup(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.enable = (!!cast.toNumber(args.status));
    params.on = true;
    return this._peripheral.writeCommand('dobotlink.Magician.SetEndEffectorSuctionCup', params);
  }
  Gripper(args, block) {
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
  SetIOMultiplexing(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
    params.multiplex = cast.toNumber(args.mode);
    return this._peripheral.writeCommand('dobotlink.Magician.SetIOMultiplexing', params);
  }
  SetLeaveIOutput(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
    params.level = cast.toNumber(args.IsEnable);
    return this._peripheral.writeCommand('dobotlink.Magician.SetIODO', params);
  }
  SetPWMOutput(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
    params.frequency = cast.toNumber(args.frequency);
    params.dutyCycle = cast.toNumber(args.dutyCycle);
    return this._peripheral.writeCommand('dobotlink.Magician.SetIOPWM', params);
  }
  SetMotorSpeed(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.index = cast.toNumber(args.Motor);
    params.enable = true;
    // params.speed = cast.toNumber(args.Speed) / 3200 * 37 * 3.1415926;
    params.speed = cast.toNumber(args.Speed);


    return this._peripheral.writeCommand('dobotlink.Magician.SetEMotor', params);
  }
  SetMotorSpeedAndDistance(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.index = cast.toNumber(args.Motor);
    params.enable = true;
    params.speed = cast.toNumber(args.Speed);
    params.distance = cast.toNumber(args.Distance);
    return this._peripheral.writeCommand('dobotlink.Magician.SetEMotorS', params);
  }
  SetConveyor(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    const STEP_PER_CIRCLE = 32000;
    const MM_PER_CIRCLE = 3.1415926535898 * 36;
    const vel = STEP_PER_CIRCLE / MM_PER_CIRCLE;
    params.index = cast.toNumber(args.Motor);
    params.enable = true;
    params.speed = Math.floor(args.Speed * vel);
    return this._peripheral.writeCommand('dobotlink.Magician.SetEMotor', params);
  }
  GetCurrentCoordinate(args, block) {
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
        }).catch(e => {
          console.log(e);
        });
    });
  }
  GetJointAngle(args, block) {
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
  GetIODI(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
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
  GetIOADC(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
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
  SetEndEffectorSuctionCup(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return this._peripheral.writeCommand('dobotlink.Magician.SetEndEffectorSuctionCup', params);
  }
  GetEndEffectorSuctionCup(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return new Promise(resolve => {
      this._peripheral.writeCommand('dobotlink.Magician.GetEndEffectorSuctionCup', params, data => {
        resolve(data);
      });
    });
  }
}

module.exports = Scratch3Magician;
