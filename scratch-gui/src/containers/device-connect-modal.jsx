import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import DeviceConnectionModalComponent, { DEVICEPHASES } from '../components/device-connect-modal/device-connect-modal';
import VM from 'scratch-vm';
import { deviceConnectionList } from '../lib/libraries/devices.jsx';
import { connect } from 'react-redux';
import { closeDeviceConnectionModal } from '../reducers/modals';
import { setConnectedDeviceList, removeConnectedDevice } from '../reducers/connect_status';
import { setPose, setSpeedInfo } from '../reducers/connection-modal';

class DeviceConnectionModal extends React.Component {
  constructor (props) {
    super(props);
    bindAll(this, [
      'handleScanning',
      'handleCancel',
      'handleConnected',
      'handleConnecting',
      'handleDisconnect',
      'handleError',
      'handleHelp'
    ]);
    const connectionDate = deviceConnectionList;
    this.state = {
      extension: connectionDate.find(ext => ext.extensionId === props.extensionId),
      phase: props.vm.getPeripheralIsConnected(props.extensionId) ?
        DEVICEPHASES.connected : DEVICEPHASES.scanning
    };
  }
  componentDidMount () {
    this.props.vm.on('PERIPHERAL_CONNECTED', this.handleConnected);
    this.props.vm.on('PERIPHERAL_REQUEST_ERROR', this.handleError);
  }
  componentWillUnmount () {
    this.props.vm.removeListener('PERIPHERAL_CONNECTED', this.handleConnected);
    this.props.vm.removeListener('PERIPHERAL_REQUEST_ERROR', this.handleError);
  }
  handleScanning () {
    this.setState({
      phase: DEVICEPHASES.scanning
    });
  }
  handleConnecting (portName) {
    this.portName = portName;
    this.props.vm.connectDobot(portName);
    this.setState({
      phase: DEVICEPHASES.connecting
    });
  }
  handleDisconnect (event, portName) {
    let isEditingTarget = true;
    if (typeof event === 'string' && (event.includes('COM') || event.includes('DT'))) {
      // 连接端口点击断开非 editingTarget
      portName = event;
      isEditingTarget = false;
    }
    try {
      this.props.vm.disConnectDobot(portName, isEditingTarget);
    } catch (e) {
      console.error(e);
    }
    this.props.onCancel();
  }
  initDeviceControlPane() {
    // 置零速度条
    this.props.setSpeed({
      accelerationRatio: 0,
      velocityRatio: 0
    });

    // 置零pose
    this.props.onHandleSetPose(
      {
        x: '0',
        y: '0',
        z: '0',
        r: '0',
        jointAngle: ['0', '0', '0', '0']
      }
    );
  }
  handleCancel () {
    // try {
    //     // If we're not connected to a peripheral, close the websocket so we stop scanning.
    //     if (this.props.vm.getPeripheralIsConnected(this.props.extensionId)) {
    //         this.props.vm.disconnectPeripheral(this.props.extensionId);
    //     }
    // } finally {
    //     // Close the modal.
    //     this.props.onCancel();
    // }
    this.props.onCancel();

  }
  handleError () {
    // Assume errors that come in during scanning phase are the result of not
    // having scratch-link installed.
    if (this.state.phase === DEVICEPHASES.scanning || this.state.phase === DEVICEPHASES.unavailable) {
      this.setState({
        phase: DEVICEPHASES.unavailable
      });
    } else {
      this.setState({
        phase: DEVICEPHASES.error
      });
    }
  }
  handleConnected (deviceId) {
    const { vm, setSpeed } = this.props;
    const extensionId = vm.editingTarget.deviceName;
    const isMagician = extensionId === 'magician';
    // 连接成功后获取速度信息
    vm.runtime.peripheralExtensions[extensionId].GetJOGCommonParams(this.portName).then(
      data => {
        const tempDate = {};
        if (data.velocityRatio){
          tempDate.velocityRatio = data.velocityRatio;
          tempDate.accelerationRatio = data.accelerationRatio;
        } else {
          tempDate.velocityRatio = data.value;
          tempDate.accelerationRatio = 50;
        }
        setSpeed(tempDate);
      }
    );
    // 设置坐标系为吸盘末端偏移量
    if (isMagician){
      vm.runtime.peripheralExtensions[extensionId].SetEndEffectorParams(
        this.portName,
        59.7,
        0,
        0
      );
    } else {
      vm.runtime.peripheralExtensions[extensionId].SetEndEffectorParams(
        this.portName,
        1
      );
    }
    
    // 设备为MagicianLite时打开碰撞检测
    if (extensionId === 'magicianlite' || extensionId === 'controller'){
      if (vm.runtime.peripheralExtensions[extensionId]) {
        vm.runtime.peripheralExtensions[extensionId].SetCollisionCheck(this.portName);
      }
    }

    this.props.setConnectedDeviceList(deviceId);
    this.setState({
      phase: DEVICEPHASES.connected
    });
    
    this.props.autoCheckFirmwareUpdate(this.props.extensionId, this.portName);
  }
  handleHelp () {
    window.open(this.state.extension.helpLink, '_blank');
  }
  render () {
    return (
      <DeviceConnectionModalComponent
        connectingMessage={this.state.extension.connectingMessage}
        connectionIconURL={this.state.extension.connectionIconURL}
        connectionSmallIconURL={this.state.extension.connectionSmallIconURL}
        connectionTipIconURL={this.state.extension.connectionTipIconURL}
        extensionId={this.props.extensionId}
        name={this.state.extension.name}
        phase={this.state.phase}
        title={this.props.extensionId}
        vm={this.props.vm}
        onCancel={this.handleCancel}
        onConnected={this.handleConnected}
        onConnecting={this.handleConnecting}
        onDisconnect={this.handleDisconnect}
        onHelp={this.handleHelp}
        onScanning={this.handleScanning}
      />
    );
  }
}

DeviceConnectionModal.propTypes = {
  extensionId: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  setConnectedDeviceList: PropTypes.func.isRequired,
  vm: PropTypes.instanceOf(VM).isRequired,
  setSpeed: PropTypes.func,
  autoCheckFirmwareUpdate: PropTypes.func,
  onHandleSetPose: PropTypes.func
};

const mapStateToProps = state => ({
  extensionId: state.scratchGui.connectionModal.extensionId
});

const mapDispatchToProps = dispatch => ({
  onCancel: () => {
    dispatch(closeDeviceConnectionModal());
  },
  setConnectedDeviceList: deviceId => {
    dispatch(setConnectedDeviceList(deviceId));
  },
  setSpeed: speedInfo => {
    dispatch(setSpeedInfo(speedInfo));
  },
  onHandleSetPose: poseData => {
    dispatch(setPose(poseData));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceConnectionModal);
