import React from 'react';
import PropTypes from 'prop-types';
import uploadIcon from '../components/action-menu/upload.svg';
import monitorIcon from '../components/action-menu/monitor.svg';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import ActionMenu from '../components/action-menu/action-menu';
import { connect } from 'react-redux';
import VM from 'scratch-vm';
import { openDeviceUploadModal } from '../reducers/modals';
import { ProgressBar } from '../components/progress-bar/progress-bar';
const messages = defineMessages({
  uploadCode: {
    id: 'gui.spriteSelector.uploadCode',
    description: 'Button to upload code',
    defaultMessage: 'To upload code'
  },
  openMonitor: {
    id: 'gui.spriteSelector.openMonitor',
    description: 'Button to open monitor',
    defaultMessage: 'To Open Dobot Monitor'
  }
});

class DeviceUploadPane extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      uploadProgress: 0
    };

  }
    handleCodeUpdating = data => {
      console.log('DeviceUploadPane', data);
      if (data === true) {
        // 上传完成
        setTimeout(() => this.setState({
          uploadProgress: -1
        }), 1000);
      } else if (data.code === 1) {
        // 上传错误
        this.setState({
          uploadProgress: -2
        });
      } else {
        this.setState({
          uploadProgress: Number(data.totalProgress.toFixed())
        });
      }
    }
    handleMonitor = () => {
      this.props.vm.runtime.peripheralExtensions.uploadDevice.openPortTool();
    };
    handleUpload = () => this.props.onHandleClickDeviceUpload()
    render () {
      const intl = this.props.intl;
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            paddingBottom: '12px',
            width: '100%',
            height: '100%',
            background: '#e9f1fc'
          }}
        >
          <div
            style={{
              alignSelf: 'center',
              width: '100%'
            }}
          >
            <ProgressBar
              progress={this.state.uploadProgress}
              type="controlPane"
            />

          </div>
          <div
            style={{
              alignSelf: 'flex-end',
              display: 'flex',
              justifyContent: 'space-around',
              width: '100%'
            }}
          >
            <ActionMenu
              img={monitorIcon}
              title={intl.formatMessage(messages.openMonitor)}
              tooltipPlace={'right'}
              onClick={this.handleMonitor}
            />
            <ActionMenu
              img={uploadIcon}
              title={intl.formatMessage(messages.uploadCode)}
              tooltipPlace={'right'}
              onClick={this.handleUpload}
            />

          </div>
        </div>
      );
    }
}
DeviceUploadPane.propTypes = {
  intl: intlShape.isRequired,
  onHandleClickDeviceUpload: PropTypes.func,
  vm: PropTypes.instanceOf(VM).isRequired
};
const mapStatesToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
  onHandleClickDeviceUpload: () => {
    dispatch(openDeviceUploadModal());
  }
});

export default connect(mapStatesToProps, mapDispatchToProps)(injectIntl(DeviceUploadPane));
