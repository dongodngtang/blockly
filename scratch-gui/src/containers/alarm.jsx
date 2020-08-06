import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AlarmPopups from '../components/alarm';
import { setIsmagicianLitAralm, setAlarmType, setIsconfirm } from '../reducers/alarm';
import VM from 'scratch-vm';

class AlarmContainer extends React.Component {

  btnCLick = type => {
    const { vm } = this.props;
    const deviceId = vm.editingTarget.id;
    const portName = this.props.vm.runtime.findKey(deviceId);
    const extensionId = vm.editingTarget.deviceName;
    if (type === 1){
      if (vm.runtime.peripheralExtensions.magicianlite) {
        vm.runtime.peripheralExtensions.magicianlite.AlarmSetPTPCmd(portName);
        vm.runtime.peripheralExtensions.magicianlite.ClearAllAlarmsState(portName).then(
          () => {
            this.props.handleSetIsmagicianLitAralm(false);
            this.props.handlSetAlarmType({});
            this.props.handlSetIsconfirm(true);
          },
          error => {
            console.log(error);
          }
        );
      }
    } else if ([0, 2].includes(type)) {
      if (type === 0){
        // 清空队列并开启队列
        vm.runtime.peripheralExtensions[extensionId].QueuedCmdClear(deviceId).then(() => {
          vm.runtime.peripheralExtensions[extensionId].QueuedCmdStart(deviceId);
        });
        
      }
      this.props.handleSetIsmagicianLitAralm(false);
      this.props.handlSetAlarmType({});
      this.props.handlSetIsconfirm(true);
    }
  }
  render = () => (
    <AlarmPopups
      btnCLick={this.btnCLick}
      {...this.props}
    />
  )
}

AlarmContainer.propTypes = {
  alarmType: PropTypes.object,
  handleSetIsmagicianLitAralm: PropTypes.func,
  handlSetAlarmType: PropTypes.func,
  handlSetIsconfirm: PropTypes.func,
  vm: PropTypes.instanceOf(VM).isRequired
};

const mapStatesToProps = state => ({
  alarmType: state.scratchGui.alarm.alarmType
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSetIsmagicianLitAralm: flag => dispatch(setIsmagicianLitAralm(flag)),
  handlSetAlarmType: alarmType => dispatch(setAlarmType(alarmType)),
  handlSetIsconfirm: flag => dispatch(setIsconfirm(flag))
});

export default connect(mapStatesToProps, mapDispatchToProps)(AlarmContainer);
