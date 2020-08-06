const SET_CONNECTED_DEVICE_LIST = 'scratch-gui/connect_status/set_connected_device_list';
const DELETE_CONNECTED_DEVICE_LIST = 'scratch-gui/connect_status/delete_connected_device';

const initialState = {
  connectedList: []
};

const reducer = (state, action) => {
  if (!state) return initialState;
  const originList = state.connectedList;
  const index = originList.indexOf(action.deviceId);
  switch (action.type) {
  case SET_CONNECTED_DEVICE_LIST:
    if (index === -1) {
      return {
        connectedList: originList.concat(action.deviceId)
      };
    }
    return state;
  case DELETE_CONNECTED_DEVICE_LIST:
    if (index !== -1) {
      originList.splice(index, 1);
      return {
        connectedList: originList
      };
    }
    return state;
  default:
    return state;
  }
};

const setConnectedDeviceList = function (deviceId) {
  return {
    type: SET_CONNECTED_DEVICE_LIST,
    deviceId
  };
};

const removeConnectedDevice = function (deviceId) {
  return {
    type: DELETE_CONNECTED_DEVICE_LIST,
    deviceId
  };
};

export {
  reducer as default,
  initialState as connectedListInitialState,
  setConnectedDeviceList,
  removeConnectedDevice
};
