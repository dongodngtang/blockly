const DobotJsonProtocol = require('../util/dobot-jsonprotocol');
const {serialDobot} = require('../util/serialDobot');
const ip = serialDobot.isWebSerialMode ? window.locationHref : 'localhost';
const DobotLinkAddr = `ws://${ip}:9090`;
class DjpManager {
  constructor() {
    this.djpPool = [];
  }

  getDjp() {
    return new Promise(resolve => {
      if (this.djpPool.length === 0) {
        const djp = new DobotJsonProtocol(DobotLinkAddr);
        djp.init()
          .then(() => {
            this.djpPool.push(djp);
            resolve(djp);
          })
          .catch(e => {
            console.error(e);
          });
      } else {
        resolve(this.djpPool[0]);
      }
    });
  }
  dispose() {
    this.djpPool = [];
  }
}

module.exports = new DjpManager();
