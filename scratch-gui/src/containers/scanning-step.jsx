import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import OriginScanningStepComponent from '../components/connection-modal/scanning-step.jsx';
import DeviceScanningStepComponent from '../components/device-connect-modal/scanning-step';
import DeviceUploadStepComponent from '../components/device-upload-modal/scanning-step';
import VM from 'scratch-vm';
let ScanningStepComponent;
class ScanningStep extends React.Component {
  constructor (props) {
    super(props);
    bindAll(this, [
      'handlePeripheralListUpdate',
      'handlePeripheralScanTimeout',
      'handleRefresh'
    ]);
    if (this.props.isUpload) {
      ScanningStepComponent = DeviceUploadStepComponent;
    } else {
      ScanningStepComponent = props.isDevice ? DeviceScanningStepComponent : OriginScanningStepComponent;
    }
    this.state = {
      scanning: true,
      peripheralList: []
    };
  }
  componentDidMount () {
    this.props.vm.scanForPeripheral(this.props.extensionId);
    this.props.vm.on(
      'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
    this.props.vm.on(
      'PERIPHERAL_SCAN_TIMEOUT', this.handlePeripheralScanTimeout);
  }
  componentWillUnmount () {
    // @todo: stop the peripheral scan here
    this.props.vm.removeListener(
      'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
    this.props.vm.removeListener(
      'PERIPHERAL_SCAN_TIMEOUT', this.handlePeripheralScanTimeout);
  }
  handlePeripheralScanTimeout () {
    this.setState({
      scanning: false,
      peripheralList: []
    });
  }
  handlePeripheralListUpdate (newList) {
    // TODO: sort peripherals by signal strength? so they don't jump around
    const peripheralArray = Object.keys(newList).map(id =>
      newList[id]
    );
    this.setState({ peripheralList: peripheralArray });
  }
  handleRefresh () {
    this.props.vm.scanForPeripheral(this.props.extensionId);
    this.setState({
      scanning: true,
      peripheralList: []
    });
  }
  render () {
    return (
      <ScanningStepComponent
        choosePort={this.props.choosePort}
        connectionSmallIconURL={this.props.connectionSmallIconURL}
        peripheralList={this.state.peripheralList}
        phase={this.state.phase}
        progress={this.props.progress}
        scanning={this.state.scanning}
        title={this.props.extensionId}
        vm={this.props.vm}
        onConnected={this.props.onConnected}
        onConnecting={this.props.onConnecting}
        onDisconnect={this.props.onDisconnect}
        onHandleChoose={this.props.onHandleChoose}
        onRefresh={this.handleRefresh}
        onUpload={this.props.onUpload}
      />
    );
  }
}

ScanningStep.propTypes = {
  choosePort: PropTypes.string,
  connectionSmallIconURL: PropTypes.string,
  extensionId: PropTypes.string.isRequired,
  isDevice: PropTypes.bool,
  isUpload: PropTypes.bool,
  onConnected: PropTypes.func,
  onConnecting: PropTypes.func,
  onDisconnect: PropTypes.func,
  onHandleChoose: PropTypes.func,
  onUpload: PropTypes.func,
  progress: PropTypes.number,
  vm: PropTypes.instanceOf(VM).isRequired
};

export default ScanningStep;
