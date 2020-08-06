/* eslint-disable no-invalid-this */

const cast = require('../util/cast');
const {timeout: _timeout} = require('../util/constants');
const DobotSerial = require('../io/dobot-serial');
const formatMessage = require('format-message');

class MagicianLite {
  /**
     * Construct a MagicianLite communication object.
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
    this._devType = 'MagicianLite';
    this._commTimeout = 60000;
  
    this._ports = {};
    this._port = null;
    this._searchList = null;
  
    this._runtime.registerPeripheralExtension(extensionId, this);
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
          this._busy = false;
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
        'dobotlink.MagicianLite.ConnectDobot', {
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
      this.writeCommand('dobotlink.MagicianLite.GetPose', {
        portName
      }, resolve, 2000)
        .catch(e => {
          // console.log('getPose catch', e);
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
        'dobotlink.MagicianLite.DisconnectDobot', {
          portName: (port ? port : this._ports[deviceId])
        },
        this._commTimeout
      )
      .then(() => {
        this._ports[deviceId] = null;
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_DISCONNECTED, deviceId);
      })
      .catch(e => {
        console.error(
          'Maigician disconnect error',
          this._extensionId,
          e
        );
      });
  }
  
  /**
       * 断开所有连接
       */
  disconnectAll() {
    Object.entries(this._ports).forEach(portEntry => {
      const [deviceId, port] = portEntry;
      this._dobotSerial
        .write('dobotlink.MagicianLite.DisconnectDobot', {
          portName: port
        },
        this._commTimeout)
        .then(() => {
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
    this._dobotSerial
      .write(
        'dobotlink.MagicianLite.SetJOGCmd', {
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
  SetArmSpeedRatio(portName, value, type) {
    this._dobotSerial
      .write(
        'dobotlink.MagicianLite.SetArmSpeedRatio', {
          portName,
          type,
          value
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
        'dobotlink.MagicianLite.SetHOMECmd', {
          portName: this._ports[deviceId],
          timeout: this._commTimeout
        },
        this._commTimeout
      );
  }
  SetEndEffectorSuctionCup(enable, suck, deviceId) {
    this._dobotSerial
      .write(
        'dobotlink.MagicianLite.SetEndEffectorSuctionCup', {
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
        'dobotlink.MagicianLite.SetEndEffectorGripper', {
          portName: this._ports[deviceId],
          enable: enable,
          on: grip
        },
        this._commTimeout
      );
  }
  
  SetEndEffectorParams(portName, type) {
    this._dobotSerial
      .write(
        'dobotlink.MagicianLite.SetEndEffectorType', {
          portName,
          type
        },
        this._commTimeout
      );
  }
  SetDeviceWithL(enable, deviceId) {
    this._dobotSerial
      .write(
        'dobotlink.MagicianLite.SetDeviceWithL', {
          portName: this._ports[deviceId],
          enable: enable
        },
        this._commTimeout
      );
  }
  GetJOGCommonParams(portName){
    return this._dobotSerial
      .write(
        'dobotlink.MagicianLite.GetArmSpeedRatio', {
          portName: portName,
          type: 0
        }
      );
  }
  SetJOGCommonParams(accelerationRatio, velocityRatio, portName){
    return this._dobotSerial
      .write(
        'dobotlink.MagicianLite.SetJOGCommonParams', {
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
        'dobotlink.MagicianLite.GetDeviceVersion', {
          typeIndex: 3,
          portName
        }
      );
  }

  // 坐标标定功能MagicianLite 移动到固定的点位
  CalibrationSetPTPCmd(portName){
    return this._dobotSerial
      .write(
        'dobotlink.MagicianLite.SetPTPCmd', {
          ptpMode: 1,
          x: 250,
          y: 0,
          z: 120,
          r: 0,
          portName,
          _timeout
        }
      );
  }
  // 报警功能回到固定点位
  AlarmSetPTPCmd(portName){
    return this._dobotSerial
      .write(
        'dobotlink.MagicianLite.SetPTPCmd', {
          ptpMode: 1,
          x: 250,
          y: 0,
          z: 0,
          r: 0,
          portName,
          _timeout
        }
      );
  }

  // 开启碰撞检测
  SetCollisionCheck(portName){
    return this._dobotSerial
      .write(
        'dobotlink.MagicianLite.SetCollisionCheck', {
          enable: true,
          portName
        }
      );
  }
  // 获取报警信息
  GetAlarmsState(deviceId){
    const portName = this._ports[deviceId];
    return this._dobotSerial
      .write(
        'dobotlink.MagicianLite.GetAlarmsState', {
          portName
        }
      );
  }
  // 清除警报
  ClearAllAlarmsState(portName) {
    return this._dobotSerial
      .write(
        'dobotlink.MagicianLite.ClearAllAlarmsState', {
          portName
        }
      );
  }
  // 坐标检测
  CheckPoseLimit(checkParams){
    return this._dobotSerial
      .write(
        'dobotlink.MagicianLite.CheckPoseLimit',
        checkParams
      );
  }
  // 开启队列
  QueuedCmdStart(deviceId){
    const portName = this._ports[deviceId];
    return this._dobotSerial
      .write(
        'dobotlink.MagicianLite.QueuedCmdStart', {
          portName
        }
      );
  }
  // 清空队列
  QueuedCmdClear(deviceId){
    const portName = this._ports[deviceId];
    return this._dobotSerial
      .write(
        'dobotlink.MagicianLite.QueuedCmdClear', {
          portName
        }
      );
  }

}
class Scratch3MagicianLite {
  constructor(runtime) {
    /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
    this.runtime = runtime;
  
    this._peripheral = new MagicianLite(this.runtime, 'magicianlite');
  }
  
  /**
       * Retrieve the block primitives implemented by this package.
       * @return {object.<string, Function>} Mapping of opcode to Function.
       * **/
  getPrimitives() {
    return {
      Magician_Lite_Home: this.Home,
      Magician_Lite_SetEndFixture: this.SetEndFixture,
      Magician_Lite_SetPTPCommonParams: this.SetPTPCommonParams,
      Magician_Lite_SetPTPJointParams: this.SetPTPJointParams,
      Magician_Lite_SetPTPCoordinateParams: this.SetPTPCoordinateParams,
      Magician_Lite_SetPTPJumpParams: this.SetPTPJumpParams,
      Magician_Lite_SetLostStepParams: this.SetLostStepParams,
      Magician_Lite_SetLostStep: this.SetLostStep,
      Magician_Lite_JumpTo: this.JumpTo,
      Magician_Lite_Goto: this.Goto,
      Magician_Lite_MoveDistance: this.MoveDistance,
      Magician_Lite_CheckLostStep: this.CheckLostStep,
      Magician_Lite_ClearAllAlarmsState: this.ClearAllAlarmsState,
      Magician_Lite_SetJointAngle: this.SetJointAngle,
      Magician_Lite_SetSuctionCup: this.SetSuctionCup,
      Magician_Lite_Gripper: this.Gripper,
      Magician_Lite_SetIOMultiplexing: this.SetIOMultiplexing,
      Magician_Lite_SetLeaveIOutput: this.SetLeaveIOutput,
      Magician_Lite_SetPWMOutput: this.SetPWMOutput,
      Magician_Lite_SetMotorSpeed: this.SetMotorSpeed,
      Magician_Lite_SetMotorSpeedAndDistance: this.SetMotorSpeedAndDistance,
      Magician_Lite_SetConveyor: this.SetConveyor,
      Magician_Lite_GetCurrentCoordinate: this.GetCurrentCoordinate,
      Magician_Lite_GetJointAngle: this.GetJointAngle,
      Magician_Lite_GetIODI: this.GetIODI,
      Magician_Lite_GetIOADC: this.GetIOADC,
      Magician_Lite_SetEndEffectorSuctionCup: this.SetEndEffectorSuctionCup,
      Magician_Lite_GetEndEffectorSuctionCup: this.GetEndEffectorSuctionCup
    };
  }
  
  Home(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id],
      timeout: this._commTimeout
    };
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetHOMECmd', params);
  }
  SetEndFixture(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.type = cast.toNumber(args.BTN);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetEndEffectorType', params);
  }
  SetPTPCommonParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id],
      type: 1
    };
    params.value = cast.toNumber(args.percent);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetArmSpeedRatio', params);
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
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetPTPJointParams', params);
  }
  SetPTPCoordinateParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.xyzVelocity = cast.toNumber(args.xyzVelocity);
    params.rVelocity = cast.toNumber(args.rVelocity);
    params.xyzAcceleration = cast.toNumber(args.xyzAcceleration);
    params.rAccleration = cast.toNumber(args.rAccleration);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetPTPCoordinateParams', params);
  }
  SetPTPJumpParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.jumpHeight = cast.toNumber(args.jumpHeight);
    params.zLimit = cast.toNumber(args.zLimit);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetPTPJumpParams', params);
  }
  SetLostStepParams(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.value = cast.toNumber(args.threshold);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetLostStepValue', params);
  }
  SetLostStep(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetLostStepCmd', params);
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
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetPTPCmd', params);
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
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetPTPCmd', params);
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
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetPTPCmd', params);
  }
  CheckLostStep(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return new Promise(resolve => {
      this._peripheral.writeCommand('dobotlink.MagicianLite.GetAlarmsState', params, data => {
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
  ClearAllAlarmsState(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return this._peripheral.writeCommand('dobotlink.MagicianLite.ClearAllAlarmsState', params);
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
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetPTPCmd', params);
  }
  SetSuctionCup(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.enable = (!!cast.toNumber(args.status));
    params.on = true;
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetEndEffectorSuctionCup', params);
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
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetEndEffectorGripper', params);
  }
  SetIOMultiplexing(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.TYPE);
    params.multiplex = cast.toNumber(args.EIO);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetIOMultiplexing', params);
  }
  SetLeaveIOutput(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
    params.level = cast.toNumber(args.IsEnable);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetIODO', params);
  }
  SetPWMOutput(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
    params.frequency = cast.toNumber(args.frequency);
    params.dutyCycle = cast.toNumber(args.dutyCycle);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetIOPWM', params);
  }
  SetMotorSpeed(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.index = cast.toNumber(args.Motor);
    params.enable = true;
    params.speed = cast.toNumber(args.Speed) / 32000 * 36 * 3.1415926;

    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetEMotor', params);
  }
  SetMotorSpeedAndDistance(args, block) {
    // uint8_t index;          //电机编号。0：Stepper1。 1：Stepper2
    // uint8_t isEnabled;      //电机控制使能。0：未使能。1：使能
    // uint32_t speed;          //电机控制速度（脉冲个数每秒）
    // uint32_t distance;
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.index = cast.toNumber(args.Motor);
    params.enable = true;
    params.speed = cast.toNumber(args.Speed) / 32000 * 36 * 3.1415926;
    params.distance = cast.toNumber(args.Distance);
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetEMotorS', params);
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
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetEMotor', params);
  }
  GetCurrentCoordinate(args, block) {
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
  GetJointAngle(args, block) {
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
  GetIODI(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
    return new Promise(resolve => {
      this._peripheral.writeCommand('dobotlink.MagicianLite.GetIODI', params, data => {
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
      this._peripheral.writeCommand('dobotlink.MagicianLite.GetIOADC', params, data => {
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
    return this._peripheral.writeCommand('dobotlink.MagicianLite.SetEndEffectorSuctionCup', params);
  }
  GetEndEffectorSuctionCup(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    return new Promise(resolve => {
      this._peripheral.writeCommand('dobotlink.MagicianLite.GetEndEffectorSuctionCup', params, data => {
        resolve(data);
      });
    });
  }
}

module.exports = Scratch3MagicianLite;
