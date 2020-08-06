// const webSerial = require('./webSerial').default;
export default class JSONRPC {
  constructor() {
    this._requestID = 0;
    this._openRequests = {};
    this._getPoseRequestId = 0;
  }

  /**
   * Make an RPC request and retrieve the result.
   * @param {string} method - the remote method to call.
   * @param {object} params - the parameters to pass to the remote method.
   * @returns {Promise} - a promise for the result of the call.
   */
  sendRemoteRequest(method, params) {
    const requestID = this._requestID++;

    if (method === 'dobotlink.Magician.GetPose') {
      this._getPoseRequestId = requestID;
    }
    const promise = new Promise((resolve, reject) => {
      this._openRequests[requestID] = {
        resolve,
        reject
      };
    });

    this._sendRequest(method, params, requestID);

    return promise;
  }
  /**
   * 持续接受 socket onMessage 消息
   * @param {string} method 发送方法
   * @param {object} params 参数对象
   * @param {function} callback 回调函数
   */
  sendRemoteRequestProgress(method, params, callback) {
    const requestID = this._requestID++;
    this._openRequests[requestID] = callback;
    this._sendRequest(method, params, requestID);
  }

  /**
   * Make an RPC notification with no expectation of a result or callback.
   * @param {string} method - the remote method to call.
   * @param {object} params - the parameters to pass to the remote method.
   */
  sendRemoteNotification(method, params) {
    this._sendRequest(method, params);
  }

  /**
   * Handle an RPC request from remote, should return a result or Promise for result, if appropriate.
   * @param {string} method - the method requested by the remote caller.
   * @param {object} params - the parameters sent with the remote caller's request.
   */
  didReceiveCall(/* method , params */) {
    throw new Error('Must override didReceiveCall');
  }

  _sendMessage(/* jsonMessageObject */) {
    throw new Error('Must override _sendMessage');
  }

  _sendRequest(method, params, id) {
    const request = {
      jsonrpc: '2.0',
      method,
      params
    };

    if (id !== null) {
      request.id = id;
    }

    this._sendMessage(request);
  }

  _handleMessage(json) {
    if (json.jsonrpc !== '2.0') {
      throw new Error(`Bad or missing JSON-RPC version in message: ${json}`);
    }
    if (json.hasOwnProperty('method')) {
      this._handleRequest(json);
    } else if (json.error) {
      if (this._openRequests[json.id]) {
        // 有 callback 需要处理
        this._handleResponse(json);
      } else if (json.id === 0 && this._openRequests[this._getPoseRequestId]) {
        // 更换 id 为最新的 requestid
        json.id = this._getPoseRequestId;
        this._handleResponse(json);
      } else {
        this._handleErrorMessage(json);
      }
    } else {
      this._handleResponse(json);
    }

  }

  _sendResponse(id, result, error) {
    const response = {
      jsonrpc: '2.0',
      id
    };
    if (error) {
      response.error = error;
    } else {
      response.result = result || null;
    }
    this._sendMessage(response);
  }

  _handleCommonResponse(error, id, result) {
    const openRequest = this._openRequests[id];
    if (typeof (openRequest) === 'function') {
      if (result) {
        openRequest(result);
        if (result === true) {
          delete this._openRequests[id];
        }
      }
      if (error) {
        openRequest(error);
        delete this._openRequests[id];
      }
    } else {
      delete this._openRequests[id];
      if (openRequest) {
        if (error) {
          openRequest.reject(error);
        } else {
          openRequest.resolve(result);
        }
      }
    }
  }

  _handleResponse(json) {
    const {
      error,
      id,
      result
    } = json;
    this._handleCommonResponse(error, id, result);
  }

  _handleRequest(json) {
    const {
      method,
      params,
      id
    } = json;
    const rawResult = this.didReceiveCall(method, params);
    if (id) {
      Promise.resolve(rawResult).then(
        result => {
          this._sendResponse(id, result);
        },
        error => {
          this._sendResponse(id, null, error);
        }
      );
    }
  }
}

// module.exports = JSONRPC;
