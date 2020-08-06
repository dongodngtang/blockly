import axios from 'axios';
import { store } from './app-state-hoc';
import * as pkg from '../../package.json';
import {
  getUpdateInfo,
  changeIsUpdate,
  showUpdate,
  changeIsAnupdate,
  changeIsCheck,
  changeIsNewest
} from '../reducers/version-update';
import {
  showFirmwareUpdate,
  changeIsAnFirmwareupdate,
  changeIsFirmwareCheck,
  changeIsFirmwareNewest,
  getOldFirmwaReversion,
  getFirmwareUpdateInfo
} from '../reducers/firmware-update';

const { dispatch } = store;

const _getUpdateInfo = () => new Promise((resolve, reject) => {
  axios.get('http://localhost:9991/checkUpdate')
    .then(res => resolve(res));
});

const _getFirmwareUpdateInfo = () => new Promise((resolve, reject) => {
  axios.get('http://localhost:9991/checkFirmwareUpdate')
    .then(res => resolve(res));
});


const autoCheckUpdate = (manual = false) => {
  dispatch(changeIsCheck(true));
  // 获取版本号
  _getUpdateInfo()
    .then(res => {
      setTimeout(() => {
        if (res.data.DobotScratch.version > pkg.version) {
          dispatch(showUpdate());
          dispatch(getUpdateInfo(res.data.DobotScratch));
          dispatch(changeIsAnupdate(true));
        } else if (manual) {
          dispatch(changeIsNewest(true));
          dispatch(changeIsUpdate(true));
        }
        dispatch(changeIsCheck(false));
      }, 1000);
    })
    .catch(e => {
      dispatch(changeIsCheck(false));
      console.error(e);
    });
};

const autoCheckFirmwareUpdate = (extensionId, portName, manual = false) => {
  dispatch(changeIsFirmwareCheck(true));
  store.getState().scratchGui.vm.runtime.peripheralExtensions[extensionId].GetDeviceVersion(portName)
    .then(res => {
      const oldFirmwaReversion = {};
      oldFirmwaReversion.version =
        `${res.majorVersion.toString()}.${res.minorVersion.toString()}.${res.revision.toString()}`;
      oldFirmwaReversion.name = extensionId;
      oldFirmwaReversion.portName = portName;
      dispatch(getOldFirmwaReversion(oldFirmwaReversion));
      // 获取版本号
      _getFirmwareUpdateInfo()
        .then(result => {
          const contentedFirmwareInfo = result.data.firmware[extensionId];
          setTimeout(() => {
            if (contentedFirmwareInfo.version > oldFirmwaReversion.version) {
              dispatch(showFirmwareUpdate());
              dispatch(getFirmwareUpdateInfo(contentedFirmwareInfo));
              dispatch(changeIsAnFirmwareupdate(true));
            } else if (manual) {
              dispatch(changeIsFirmwareNewest(true));
            }
            dispatch(changeIsFirmwareCheck(false));
          }, 1000);
        })
        .catch(e => {
          dispatch(changeIsFirmwareCheck(false));
          console.error(e);
        });
    })
    .catch(e => {
      dispatch(changeIsFirmwareCheck(false));
      console.error(e);
    });
};
export {
  autoCheckUpdate,
  autoCheckFirmwareUpdate
};
