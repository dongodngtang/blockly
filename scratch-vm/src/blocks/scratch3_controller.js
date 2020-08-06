/* eslint-disable no-invalid-this */

const cast = require('../util/cast');

const DobotSerial = require('../io/dobot-serial');
const formatMessage = require('format-message');

class Controller {
  /**
     * Construct a Controller communication object.
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
    this._devType = 'Magic Box';
    this._commTimeout = 60000;

    this._ports = {};
    this._port = null;
    this._searchList = null;

    this._runtime.registerPeripheralExtension(extensionId, this);
    this.flag = false;
    this.dobotLinkApi = null;
  }

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
          console.log('Controller writeCommand error', e);
        });
    });
  }

  /**
     * Called by the runtime when user wants to connect to a certain peripheral.
     * @param {number} portName - the id of the peripheral to connect to.
     * @param {string} deviceId - 为了多硬件连接进行硬件的区分.
     * @returns {Promise} ws请求 Promise
     */
  connect(portName, deviceId) {
    // TODO: id???
   
    return new Promise(resolve => this._dobotSerial
      .write(
        'dobotlink.MagicBox.ConnectDobot', {
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
          deviceType: 'conntroller',
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

  // 清除警报
  ClearAllAlarmsState(portName) {
    return this._dobotSerial
      .write(
        'dobotlink.MagicianLite.ClearAllAlarmsState', {
          portName
        }
      );
  }

  getPose(deviceId, portName) {
    portName = portName || this._ports[deviceId];
    return new Promise((resolve, reject) => {
      this.writeCommand('dobotlink.MagicianLite.GetPose', {
        portName
      }, resolve, 2000)
        .catch(e => {
          console.log('getPose catch', e);
          reject(e);
        });
    });
  }
  /**
     * Disconnect from the Controller.
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
        'dobotlink.MagicBox.DisconnectDobot', {
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
        .write('dobotlink.MagicBox.DisconnectDobot', {
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
     * Return true if connected to the Controller.
     * @return {boolean} - whether the Controller is connected.
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
    // 区分box控制滑轨的点动操作
    if (cmd === 9 || cmd === 10){
      isJoint = true;
      this.flag = true;
      this.dobotLinkApi = 'MagicBox';
    } else if (this.flag && cmd === 0){
      isJoint = true;
      this.dobotLinkApi = 'MagicBox';
      this.flag = false;
    } else {
      this.dobotLinkApi = 'MagicianLite';
    }
    
    this._dobotSerial
      .write(
        `dobotlink.${this.dobotLinkApi}.SetJOGCmd`, {
          portName: this._ports[deviceId],
          isJoint,
          cmd: cmd
        },
        this._commTimeout
      )
      .catch(e => {
        console.error(`${this.dobotLinkApi} connect error`, this._extensionId, e);
      });
  }

  // 获取速度信息
  GetJOGCommonParams(portName){
    return this._dobotSerial
      .write(
        'dobotlink.MagicianLite.GetArmSpeedRatio', {
          portName: portName,
          type: 0
        }
      );
  }
  // 设置速度
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
  
  Home(deviceId) {
    return Promise.all([
      this._dobotSerial
        .write(
          'dobotlink.MagicBox.SetHOMECmd', {
            portName: this._ports[deviceId],
            timeout: this._commTimeout
          },
          this._commTimeout
        ),
      this._dobotSerial
        .write(
          'dobotlink.MagicianLite.SetHOMECmd', {
            portName: this._ports[deviceId]
          },
          this._commTimeout
        )]
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
        'dobotlink.MagicBox.SetDeviceWithL', {
          portName: this._ports[deviceId],
          enable: enable
        },
        this._commTimeout
      );
  }

  // 获取固件版本号
  GetDeviceVersion(portName){
    return this._dobotSerial
      .write(
        'dobotlink.MagicBox.GetDeviceVersion', {
          typeIndex: 3,
          portName
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
    let extensionId = 'MagicBox';
    if (this._runtime.isControllerMagicianLite){
      extensionId = 'magicianlite';
    }
    return this._dobotSerial
      .write(
        `dobotlink.${extensionId}.GetAlarmsState`, {
          portName
        }
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
class Scratch3Controller {
  constructor(runtime) {
    /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
    this.runtime = runtime;

    this._peripheral = new Controller(this.runtime, 'controller');
  }

  /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     * **/
  getPrimitives() {
    return {
      Controller_Analog_output: this.Analog_output,
      Controller_Digital_output: this.Digital_output,
      Controller_Set_Pin: this.Set_Pin,
      Controller_SetIOPWM: this.SetIOPWM,
      Controller_digital_read: this.digital_read,
      Controller_digital_read_bool: this.digital_read_bool,
      Controller_analog_read: this.analog_read,
      // Controller_SetServo: this.SetServo,
      Controller_SetStepperMotor: this.SetStepperMotor,
      Controller_SetStepperMotorNum: this.SetStepperMotorNum,
      Controller_SetConveyor: this.SetConveyor
    };
  }
  Analog_output(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
    params.level = cast.toNumber(args.value);
    params.slaveIndex = -1;
    return this._peripheral.writeCommand('dobotlink.MagicBox.SetIODO', params);
  }
  Digital_output(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
    params.level = cast.toNumber(args.level);
    params.slaveIndex = -1;
    return this._peripheral.writeCommand('dobotlink.MagicBox.SetIODO', params);
  }
  Set_Pin(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
    params.multiplex = cast.toNumber(args.mode);
    params.slaveIndex = -1;
    return this._peripheral.writeCommand('dobotlink.MagicBox.SetIOMultiplexing', params);
  }
  SetIOPWM(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
    params.frequency = cast.toNumber(args.frequency);
    params.dutyCycle = cast.toNumber(args.dutyCycle);
    params.slaveIndex = -1;
    return this._peripheral.writeCommand('dobotlink.MagicBox.SetIOPWM', params);
  }
  digital_read(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.PINNUM);
    params.slaveIndex = -1;
    return new Promise(resolve => {
      this._peripheral.writeCommand('dobotlink.MagicBox.GetIODI', params, data => {
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
  digital_read_bool(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.PINNUM);
    params.slaveIndex = -1;
    return new Promise(resolve => {
      this._peripheral.writeCommand('dobotlink.MagicBox.GetIODI', params, data => {
        if (!data) {
          resolve(formatMessage({
            id: 'Device.No_Connect_Message',
            default: 'Please Connect Device'
          }));
        }
        resolve(cast.toBoolean(data.value));
      });
    });
  }
  analog_read(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.port = cast.toNumber(args.eio);
    params.slaveIndex = -1;
    return new Promise(resolve => {
      this._peripheral.writeCommand('dobotlink.MagicBox.GetIOADC', params, data => {
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
  // SetServo (args, block) {
  //     const params = {
  //         portName: this._peripheral._ports[block.target.id]
  //     };
  //     params.address = cast.toNumber(args.PINNUM);
  //     return this._peripheral.writeCommand('dobotlink.MagicBox.SetJOGLParams', params);
  // }
  SetStepperMotor(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.index = cast.toNumber(args.index);
    params.speed = cast.toNumber(args.speed);
    params.enable = params.speed !== 0;
    return this._peripheral.writeCommand('dobotlink.MagicBox.SetEMotor', params);
  }
  SetStepperMotorNum(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    params.index = cast.toNumber(args.index);
    params.speed = cast.toNumber(args.speed);
    params.enable = params.speed !== 0;

    params.distance = cast.toNumber(args.num);
    return this._peripheral.writeCommand('dobotlink.MagicBox.SetEMotorS', params);
  }
  SetConveyor(args, block) {
    const params = {
      portName: this._peripheral._ports[block.target.id]
    };
    const STEP_PER_CIRCLE = 32000;
    const MM_PER_CIRCLE = 3.1415926535898 * 36;
    const vel = STEP_PER_CIRCLE / MM_PER_CIRCLE;
    params.index = cast.toNumber(args.index);
    params.speed = Math.floor(args.speed * vel);
    params.enable = params.speed !== 0;
    return this._peripheral.writeCommand('dobotlink.MagicBox.SetEMotor', params);
  }
}

module.exports = Scratch3Controller;
