const Wsmanageer = require('./DobotWebSocketManager');
class Serial {
  open(wsAddr, port) {
    Wsmanageer.open(wsAddr, port);
  }
  search() {
  }
  send(jsonRpc) {
    Wsmanageer.send(jsonRpc);
  }
  recive() {

  }
  isOpen() {

  }
  close() {
    Wsmanageer.close();
  }
}

module.exports = Serial;
