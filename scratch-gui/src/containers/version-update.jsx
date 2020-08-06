import React, { Fragment } from 'react';
import VersionUpDate from '../components/version-update';
import { connect } from 'react-redux';
import { hideUpdate } from '../reducers/version-update';
import PropTypes from 'prop-types';
import VM from 'scratch-vm';

class VersionUpdateContainer extends React.Component {
 

  closeUpdate = () => {
    this.props.onHideUpdate();
    this.props.changeIsAnupdate(false);
    this.props.changeIsCheck(true);
    this.props.changeIsNewest(false);
  }

  updateBtn = () => {
    const { isAnUpdate, updateInfo } = this.props;
    if (isAnUpdate){
      if (updateInfo.updateURL){
        window.open(updateInfo.updateURL, '_blank');
      } else {
        window.open('https://cn.dobot.cc/', '_blank');
      }
      this.closeUpdate();
    } else {
      this.closeUpdate();
    }
  }

  changeAutoUpdate = () => {
    const flag = !this.props.isAutoUpdate;
    this.props.changeisAutoUpdate(flag);
    localStorage.setItem('autoUpdate', flag);
  }

  render = () => {
    const { vm, ...componentProps } = this.props;
    return (
      <Fragment >
        <VersionUpDate
          hideUpdate={this.closeUpdate}
          updateBtn={this.updateBtn}
          changeAutoUpdate={this.changeAutoUpdate}
          {...componentProps}
        />
      </Fragment>);
  }
}

VersionUpdateContainer.propTypes = {
  onHideUpdate: PropTypes.func,
  isCheck: PropTypes.bool,
  changeIsAnupdate: PropTypes.func,
  changeIsCheck: PropTypes.func,
  changeIsNewest: PropTypes.func,
  updateInfo: PropTypes.object,
  changeisAutoUpdate: PropTypes.func,
  isAutoUpdate: PropTypes.bool,
  vm: PropTypes.instanceOf(VM).isRequired,
  isAnUpdate: PropTypes.bool
};

const mapStatesToProps = state => ({
  isCheck: state.scratchGui.versionUpdate.isCheck,
  isAnUpdate: state.scratchGui.versionUpdate.isAnUpdate,
  isNewest: state.scratchGui.versionUpdate.isNewest
});
const mapDispatchToProps = dispatch => ({
  onHideUpdate: () => dispatch(hideUpdate())
});

export default connect(mapStatesToProps, mapDispatchToProps)(VersionUpdateContainer);
