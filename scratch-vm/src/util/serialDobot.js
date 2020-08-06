/* eslint-disable no-invalid-this */
// const WebSerial = require('./webSerial.js').default;
import WebSerial from './webSerial';
window.locationHref = window.location.href.split('//')[1].split(':')[0];
class WebSerialDobot extends WebSerial{
  isWebSerialMode = !window.location.href.includes('localhost')
  constructor() {
    super();
    this._ws = new WebSocket(`ws://${window.locationHref}:9098`);
    this._ws.onopen = () => {
      this._ws.onmessage = data => {
        // arraybuffer
        const messageData = data.data;
        if (messageData) {
          const res = [];
          for (let i = 0; i < messageData.length; i += 2) {
            res.push(Number(`0x${messageData.slice(i, i + 2)}`));
          }
          this.send(res);
        }
      };
    };
  }
  send = async msg => {
    const response = await this._send(msg);
    if (!response) return Error('no data');
    this.handleResponse(response);
  }
  handleResponse = value => {
    this._ws.send(JSON.stringify(value));
  }
}

export const serialDobot = new WebSerialDobot();
