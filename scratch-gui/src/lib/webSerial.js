class WebSerial {
  needWebSerial = location.hostname !== 'localhost'
  async connect() {
    if (!this.port) throw Error('还选择端口, 怎么连接嘛');
    await this.port.open({ baudrate: 115200 });
  }
  get writer() {
    return this.port.writable.getWriter();
  }
  get reader() {
    return this.port.readable.getReader();
  }
  async search() {
    this.port = window.currentPort = await navigator.serial.requestPort();
    if (this.port) {
      await this.connect();
    }
  }
  async readLoop(finishIndex, resolve) {
    const testFinishMsg = new Uint8Array([0xaa, 0xaa, 0x02, 0xf6, 0x00, 0x0a]);
    this.writer.write(testFinishMsg);
    const { value } = await this.reader.read();
    if (value[5] === finishIndex) {
      resolve(value);
    } else {
      setTimeout(() => {
        this.readLoop(finishIndex, resolve);
      }, 500);
    }
  }
  async send(msg) {
    this.writer.write(msg);
    const { value } = await this.reader.read();
    const res = await new Promise(resolve => {
      this.readLoop(value[5], resolve);
    });
    console.log(msg, res);
  }
}
const webSerial = new WebSerial();
export default webSerial;
