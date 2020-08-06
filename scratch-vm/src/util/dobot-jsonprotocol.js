const JSONPROTOCOL = require('./jsonprotocol').default;
// const log = require('../util/log');

class DobotJsonProtocol extends JSONPROTOCOL {
  constructor (addr) {
    super();
    this.addr = addr;
    this._ws = null;
    this.isSocketConnect = false;
    this.isClose = false;
  }

  init () {
    return new Promise((resolve, reject) => {
      this._ws = new WebSocket(this.addr);
      this._ws.onopen = open_event => {
        this.isClose = false;
        this.isSocketConnect = true;
        this._ws.onmessage = e => this._onSocketMessage(e);
        this._ws.onopen = e => this._onSocketOpen(e);
        this._ws.onclose = e => {
          this.isClose = true;
          this._onSocketClose(e);
        };
        this._ws.onerror = e => this._onSocketError(e);
        resolve(open_event);
      };
      this._ws.onerror = e => {
        this._ws = null;
        reject(e);
      };
    });
  }
  sendRemoteRequstProgress (method, params, callback) {
    super.sendRemoteRequestProgress(method, params, callback);
  }
  sendRemoteRequest (method, params, timeout) {
    if (this.isClose){
      return this.init().then(() => this._sendRemoteRequest(method, params, timeout));
    }
    return this._sendRemoteRequest(method, params, timeout);
  }
 
  _sendRemoteRequest(method, params, timeout){
    timeout = timeout || 20000;
    return new Promise((resolve, reject) => {
      if (this.isSocketConnect) {
        const timeoutID = window.setTimeout(() => {
          reject(new Error('DobotJsonProtocol Timeout'));
        }, timeout);

        super.sendRemoteRequest(method, params)
          .then(data => {
            window.clearTimeout(timeoutID);
            resolve(data);
          })
          .catch(e => {
            window.clearTimeout(timeoutID);
            reject(e);
          });
      } else {
        if (method.includes('Disconnect')) {
          const djp = require('../io/djp-manager.js');
          djp.dispose();
          resolve();
        }
        reject(Error('socket closed error'));
      }

    });
  }

  dispose () {
    this._ws.close();
    this._ws = null;
  }

  _onSocketOpen (e) {}

  // override from WebSocket
  _onSocketClose () {
    this.isSocketConnect = false;
  }

  // override from WebSocket
  _onSocketError (e) {}

  // override from WebSocket
  _onSocketMessage (res) {
    const json = JSON.parse(res.data);
    this._handleMessage(json);
  }

  // override from JSONPROTOCOL
  didReceiveCall (method, params) {
    console.log('[didReceiveCall]', method, params);
  }
  // 处理异常错误信息
  _handleErrorMessage (json) {
    console.log(json);
  }

  // override from JSONPROTOCOL
  _sendMessage (message) {
    const messageText = JSON.stringify(message);
    this._ws.send(messageText);
  }
}

module.exports = DobotJsonProtocol;
