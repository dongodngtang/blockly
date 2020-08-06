/* eslint-disable no-invalid-this */
class WebSerial {
  needWebSerial = location.hostname !== 'localhost'
  constructor() {
    this.isBusy = false;
    this.queue = [];
  }
  // _connect = async () => {
  //   if (!window.currentPort) throw Error('还选择端口, 怎么连接嘛');
  //   await window.currentPort.open({baudrate: 115200});
  // }
  get writer(){
    if (this._writer) {
      return this._writer;
    }
    this._writer = window.currentPort.writable.getWriter();
    return this._writer;
  }
  get reader() {
    if (this._reader) {
      return this._reader;
    }
    this._reader = window.currentPort.readable.getReader();
    return this._reader;
  }
  /**
   * 准备数据合并
   * @param {Buffer} data 收到的数据
   * @returns {any} 是否准备好, 准备好后返回数据, 否则返回 false
   */
  prepareMerge = data => {
    if (this.remainLength > 0) {
      data = new Uint8Array([...this.toMergeData, ...data]);
    }
    const dataLength = data.length;
    if (data[2]) {
      this.remainLength = data[2] + 4 - dataLength;
    } else {
      this.remainLength = 100;
    }
    if (this.remainLength > 0) {
      this.toMergeData = data;
      return false;
    }
    this.toMergeData = [];
    return data;
  }

  read = async() => {
    const {value} = await this.reader.read();
    const res = this.prepareMerge(value);
    if (res) {
      this.isBusy = false;

      this._checkQueue();

      return res;
    }
    return await this.read();
  }
  _send = msg => new Promise(async resolve => {
    this.queue.push({
      msg, resolve
    });

    this._checkQueue();
  })
  _checkQueue = async () => {
    if (this.isBusy) return;
    const task = this.queue.shift();
    if (!task) return;
    this.isBusy = true;
    if (Array.isArray(task.msg)) {
      task.msg = new Uint8Array(task.msg);
    }
    await this.writer.write(task.msg);
    const value = await this.read();
    if (!value) return task.resolve();
    task.resolve(value);
  }
}


export default WebSerial;
