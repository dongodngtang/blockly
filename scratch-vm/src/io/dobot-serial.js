const djpMgr = require('./djp-manager');

const OSnow = () => {
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  if (isMac){
    return true;
  }
  return false;
};
const isMac = OSnow();
class DobotSerial {
  constructor() {
    djpMgr.getDjp();
  }
  

  scan(devType, timeout) {
    return new Promise((resolve, reject) => {
      // const method = devType === 'Magician' ?
      //     'dobotlink.Magician.SearchDobot' :
      //     'dobotlink.api.ShowAvailablePorts';
      const params = {filter: isMac ? 'Bluetooth' : '', connectCheck: false};
      let method = 'dobotlink.api.ShowAvailablePorts';
      if (devType === 'Magician') {
        method = `dobotlink.Magician.SearchDobot`;
      } else if (devType === 'Magic Box') {
        method = `dobotlink.MagicBox.SearchDobot`;
      } else if (devType === 'MagicianLite') {
        method = `dobotlink.MagicianLite.SearchDobot`;
        params.ForDetails = false;
      }

      // eslint-disable-next-line no-undefined

      djpMgr.getDjp()
        .then(djp => {
          djp.sendRemoteRequest(method, params, timeout)
            .then(data => {
              resolve(data);
            })
            .catch(e => {
              reject(e);
            });
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  open() { }

  close() { }

  read() { }

  write(method, params, timeout) {
    return new Promise((resolve, reject) => {

      djpMgr.getDjp().then(djp => {
        djp.sendRemoteRequest(method, params, timeout)
          .then(data => {
            resolve(data);
          })
          .catch(e => {
            // 处理getpost重复请求的问题
            if (e.code === 104) return resolve();
            reject(e);
          });
      });
    });
  }
  writeForProgress(method, params, callback) {
    djpMgr.getDjp().then(djp => {
      djp.sendRemoteRequstProgress(method, params, callback);
    });
  }
}

const DobotSerialInstance = new DobotSerial();

module.exports = DobotSerialInstance;
