const DobotSerial = require('../io/dobot-serial');
const extensionId = 'uploadDevice';
class UploadDevice {
  constructor (runtime) {
    this._runtime = runtime;
    this._dobotSerial = DobotSerial;
    this._devType = extensionId;
    this._ports = {};
  }
  /**
     * 扫描串口
     * @param {string} errorMsg 错误事件名称, 用于监听发生错误
     */
  scan (errorMsg) {
    this._dobotSerial
      .scan(this._devType, this._commTimeout)
      .then(data => {
        console.log('[scan received]', data);
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
  }
  /**
     * 选择端口
     * @param {string} deviceId 设备 ID
     * @param {string} portName 端口名
     */
  choosePort (deviceId, portName) {
    this._ports[deviceId] = portName;
  }
  isDeviceBindPort (deviceId) {
    return !!this._ports[deviceId];
  }
  writeCommand (method, params, callback) {
    // 暂时不管锁机制
    // this._busy = true;
    this._dobotSerial
      .writeForProgress(
        method,
        params,
        callback
      );
  }
  /**
     * 打开串口监视器
     */
  openPortTool () {
    this.writeCommand('dobotlink.api.ShowSerialPortTool', {
      on: true
    });
  }
  /**
     * 上传代码到硬件中
     * @param {string} data 待上传的代码
     * @param {string} deviceId 端口号
     * @param {function} callback 上传完成的回调
     */
  uploadCode (data, deviceId, callback) {
    const portName = this._ports[deviceId];
    const deviceType = this._runtime.getEditingTarget().deviceName;
    let type;
    switch (deviceType) {
    case 'aistarter':
      type = 'AIStarter';
      break;
    case 'arduinouno':
      type = 'Arduino Uno';
      break;
    case 'arduinomega':
      type = 'Arduino Mega2560';
      break;
    case 'mobileplatform':
      type = 'MobilePlatform';
      break;
    case 'arduinokit':
      type = 'SmartKit';
      break;
    case 'controller':
      type = 'controller';
      break;
    default:
      break;
    }
    if (type === 'controller') {
      this.writeCommand('dobotlink.MagicBox.DownloadProgram', {
        portName,
        code: data,
        fileName: 'DobotScratch.py'
      }, callback);
    } else if (type) {
      this.writeCommand('dobotlink.Arduino.ArduinoProgram', {
        portName,
        data,
        type
      }, callback);
    } else {
      this.writeCommand('dobotlink.Microbit.MicrobitProgram', {
        data,
        type: 'python'
      }, callback);
    }
  }
}

module.exports = {
  extensionId,
  obj: UploadDevice
};
