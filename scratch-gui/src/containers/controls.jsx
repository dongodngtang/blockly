import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import { connect } from 'react-redux';
import {
  setDeviceConnectionModalExtensionId
} from '../reducers/device-conenct-modal';
import { openDeviceConnectionModal } from '../reducers/modals';
import ControlsComponent from '../components/controls/controls.jsx';

class Controls extends React.Component {
  constructor (props) {
    super(props);
    bindAll(this, [
      'handleGreenFlagClick',
      'handleStopAllClick',
      'handleClearAlarm'
    ]);
  }
  handleGreenFlagClick (e) {
    e.preventDefault();
    if (e.shiftKey) {
      this.props.vm.setTurboMode(!this.props.turbo);
    } else {
      if (!this.props.isStarted) {
        this.props.vm.start();
      }
      this.props.vm.greenFlag();
    }
  }
  handleStopAllClick (e) {
    e.preventDefault();
    this.props.vm.stopAll();
  }
  handleClearAlarm(e){
    e.preventDefault();
    const { vm } = this.props;
    const extensionId = vm.editingTarget.deviceName;
    const deviceId = vm.editingTarget.id;
    const isConnected = this.props.connectedList.includes(deviceId);
    if (isConnected){
      const portName = vm.runtime.findKey(deviceId);
      if (vm.runtime.peripheralExtensions[extensionId]) {
        vm.runtime.peripheralExtensions[extensionId].ClearAllAlarmsState(portName);
      }
    } else {
      this.props.onHandleClickDeviceConnect(extensionId);
    }
  }
  render () {
    const {
      vm, // eslint-disable-line no-unused-vars
      isStarted, // eslint-disable-line no-unused-vars
      projectRunning,
      turbo,
      connectedList,
      onHandleClickDeviceConnect,
      ...props
    } = this.props;
    return (
      <ControlsComponent
        {...props}
        active={projectRunning}
        turbo={turbo}
        onGreenFlagClick={this.handleGreenFlagClick}
        onStopAllClick={this.handleStopAllClick}
        onClearAlarm={this.handleClearAlarm}
      />
    );
  }
}

Controls.propTypes = {
  isStarted: PropTypes.bool.isRequired,
  projectRunning: PropTypes.bool.isRequired,
  turbo: PropTypes.bool.isRequired,
  vm: PropTypes.instanceOf(VM),
  connectedList: PropTypes.array,
  onHandleClickDeviceConnect: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isStarted: state.scratchGui.vmStatus.running,
  projectRunning: state.scratchGui.vmStatus.running,
  turbo: state.scratchGui.vmStatus.turbo,
  connectedList: state.scratchGui.connectedDeviceStatus.connectedList
});
// no-op function to prevent dispatch prop being passed to component
const mapDispatchToProps = dispatch => ({
  onHandleClickDeviceConnect: extensionId => {
    dispatch(setDeviceConnectionModalExtensionId(extensionId));
    dispatch(openDeviceConnectionModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
