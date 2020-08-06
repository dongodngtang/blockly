import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import DeviceUploadModalComponent, { DEVICEPHASES } from '../components/device-upload-modal/device-upload-modal';
import VM from 'scratch-vm';
import { connect } from 'react-redux';
import { closeDeviceUploadModal } from '../reducers/modals';


class DeviceConnectionModal extends React.Component {
  constructor (props) {
    super(props);
    bindAll(this, [
      'handleScanning',
      'handleCancel',
      'handleError',
      'handleHelp',
      'handleChoosePort',
      'handleUpload',
      'handleCodeUpdating'
    ]);
    this.state = {
      phase: DEVICEPHASES.scanning,
      uploadProgress: 0
    };
  }
  componentDidMount () {
    this.props.vm.on('PERIPHERAL_REQUEST_ERROR', this.handleError);
  }
  componentWillUnmount () {
    this.props.vm.removeListener('PERIPHERAL_REQUEST_ERROR', this.handleError);
  }
  handleScanning () {
    this.setState({
      phase: DEVICEPHASES.scanning
    });
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
  handleChoosePort (port) {
    this.props.vm.chooseUploadPort(port);
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
  handleUpload () {
    const deviceName = this.props.vm.editingTarget.deviceName;
    if (deviceName === 'controller') {
      const code = Blockly.Python.workspaceToCode(Blockly.getMainWorkspace());
      this.props.vm.uploadDevice(code, this.handleCodeUpdating);
      return;
    }
    switch (deviceName) {
    case 'arduinokit':
      Blockly.Arduino.Header = '#include "SmartKit.h"\n#include "Magician.h"';
      break;
    case 'aistarter':
      Blockly.Arduino.Header = '#include "AIStarter.h"';
      break;
    case 'mobileplatform':
      Blockly.Arduino.Header = '#include "MobilePlatform.h"';
      break;
    default:
      Blockly.Arduino.Header = '#include <Arduino.h>\n#include <Wire.h>\n#include <SoftwareSerial.h>\n';
    }
    const code = Blockly.Arduino.workspaceToCode(Blockly.getMainWorkspace());
    this.props.vm.uploadDevice(code, this.handleCodeUpdating);
  }

  handleCodeUpdating (data) {
    if (data === true) {
      // 上传完成
      setTimeout(() => this.setState({
        uploadProgress: -1
      }), 1000);
    } else if (data.totalProgress) {
      // 有 progress 数据回传
      this.setState({
        uploadProgress: Number(data.totalProgress.toFixed())
      });
    } else {
      // 发生了错误
      this.setState({
        uploadProgress: -2
      });
    }
  }
  handleHelp () {
    console.log('handlehelp');
    // 需要修改为在线帮助的地址
    // window.open(this.state.extension.helpLink, '_blank');
  }
  render () {
    return (
      <DeviceUploadModalComponent
        extensionId="uploadDevice"
        phase={this.state.phase}
        progress={this.state.uploadProgress}
        title={this.props.intl.formatMessage({ id: 'gui.device-upload-modal.UploadCode' })}
        vm={this.props.vm}
        onCancel={this.handleCancel}
        onHandleChoose={this.handleChoosePort}
        onHelp={this.handleHelp}
        onScanning={this.handleScanning}
        onUpload={this.handleUpload}
      />
    );
  }
}

DeviceConnectionModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  vm: PropTypes.instanceOf(VM).isRequired,
  intl: PropTypes.object
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  onCancel: () => {
    dispatch(closeDeviceUploadModal());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceConnectionModal);
