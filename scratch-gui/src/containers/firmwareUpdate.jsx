import React, { Fragment } from 'react';
import FirmwareUpdate from '../components/firmware-update';
import { connect } from 'react-redux';
import { hideFirmwareUpdate } from '../reducers/firmware-update';
import PropTypes from 'prop-types';
import VM from 'scratch-vm';


class FirmwareUpdateContainer extends React.Component {
 

  closeFirmwareUpdate = () => {
    this.props.onHideFirmwareUpdate();
    this.props.changeIsAnFirmwareupdate(false);
    this.props.changeIsFirmwareCheck(true);
    this.props.changeIsFirmwareNewest(false);
  }

  updateBtn = () => {
    this.closeFirmwareUpdate();
  }

  changeAutoUpdate = () => {
    const flag = !this.props.isAutoFirmwareUpdate;
    this.props.changeisAutoFirmwareUpdate(flag);
    localStorage.setItem('autoFirmwareUpdate', flag);
  }

  render = () => {
    const { vm, ...componentProps } = this.props;
    return (
      <Fragment >
        <FirmwareUpdate
          hideFirmwareUpdate={this.closeFirmwareUpdate}
          updateBtn={this.updateBtn}
          changeAutoUpdate={this.changeAutoUpdate}
          extensionId={vm.editingTarget.deviceName}
          {...componentProps}
        />
      </Fragment>);
  }
}

FirmwareUpdateContainer.propTypes = {
  changeIsAnFirmwareupdate: PropTypes.func,
  changeIsFirmwareCheck: PropTypes.func,
  changeIsFirmwareNewest: PropTypes.func,
  changeisAutoFirmwareUpdate: PropTypes.func,
  isAutoFirmwareUpdate: PropTypes.bool,
  vm: PropTypes.instanceOf(VM).isRequired,
  onHideFirmwareUpdate: PropTypes.func
};

const mapStatesToProps = state => ({
  isFirmwareCheck: state.scratchGui.firmwareUpdate.isFirmwareCheck,
  isAnFirmwareUpdate: state.scratchGui.firmwareUpdate.isAnFirmwareUpdate,
  isFirmwareNewest: state.scratchGui.firmwareUpdate.isFirmwareNewest
});

const mapDispatchToProps = dispatch => ({
  onHideFirmwareUpdate: () => dispatch(hideFirmwareUpdate())
});

export default connect(mapStatesToProps, mapDispatchToProps)(FirmwareUpdateContainer);
