/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './device-control-pane.css';
import { FormattedMessage } from 'react-intl';
import { ButtonComponent } from './button';
import { RadioInput, CheckboxInput } from '../customInput';
const isWebSerialMode = !window.location.href.includes('localhost');
const OSnow = () => {
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  if (isMac){
    return true;
  }
  return false;
};
const isMac = OSnow();

class DeviceCircleControl extends PureComponent {
  render () {
    return (
      <div
        className={styles.deviceControlWrapper}
        onMouseDown={this.props.onHandleMouseDown}
        onMouseUp={this.props.onHandleMouseUp}
        onTouchStart={this.props.onHandleMouseDown}
        onTouchEnd={this.props.onHandleMouseUp}
      >
        <div className={styles.yUp} >
          <span>{this.props.isUseJoint ? 'J2+' : 'Y+'}</span>
        </div>
        <div className={styles.xUp} >
          <span>{this.props.isUseJoint ? 'J1+' : 'X+'}</span>
        </div>
        <div className={styles.yDown} >
          <span>{this.props.isUseJoint ? 'J2-' : 'Y-'}</span>
        </div>
        <div className={styles.xDown} >
          <span>{this.props.isUseJoint ? 'J1-' : 'X-'}</span>
        </div>
        <div className={styles.inner}>
          <div className={styles.zUp}>
            <span>{this.props.isUseJoint ? 'J3+' : 'Z+'}</span>
          </div>
          <div className={styles.zDown}>
            <span>{this.props.isUseJoint ? 'J3-' : 'Z-'}</span>
          </div>
        </div>
      </div>
    );
  }

}
class FirstLine extends PureComponent {
  render () {
    const tooltips = {
      connect: <FormattedMessage
        defaultMessage="To connect device"
        id="gui.device_control_pane.connectTip"
      />,
      home: <FormattedMessage
        defaultMessage="To reset device position"
        id="gui.device_control_pane.homeTip"
      />,
      burn2Hardware: <FormattedMessage
        defaultMessage="Burn to hardware"
        id="gui.device_control_pane.burn2Hardware"
      />,
      switch2OnlineMode: <FormattedMessage
        defaultMessage="Switch to online mode"
        id="gui.device_control_pane.Switch2OnlineMode"
      />,
      Switch2OfflineMode: <FormattedMessage
        defaultMessage="Switch to offline mode"
        id="gui.device_control_pane.Switch2OfflineMode"
      />
    };
    return (<div
      className={styles.firstLine}
      style={{
        zoom: this.props.zoomSize
      }}
    >
      <ButtonComponent
        iconSrc={this.props.connectIcon}
        tooltip={tooltips.connect}
        onClick={this.props.onHandleActionMenuClick}
      />
      {this.props.offline && <ButtonComponent
        iconSrc={require('./images/upload_firmware.svg')}
        tooltip={tooltips.burn2Hardware}
        onClick={this.props.handleUpload}
      />}
      {
        !isWebSerialMode && this.props.offline !== null && !isMac && <ButtonComponent
          iconSrc={this.props.offline ? require('./images/online.svg') : require('./images/offline.svg')}
          tooltip={this.props.offline ? tooltips.switch2OnlineMode : tooltips.Switch2OfflineMode}
          onClick={this.props.handleOfflineSwitch}
        />
      }
      <ButtonComponent
        iconSrc={require('./images/home.svg')}
        tooltip={tooltips.home}
        onClick={this.props.onHandleHomeClick}
        isDisable={this.props.isDisable}
      />
    </div>);
  }
}
FirstLine.propTypes = {
  connectIcon: PropTypes.string,
  onHandleActionMenuClick: PropTypes.func,
  onHandleHomeClick: PropTypes.func,
  zoomSize: PropTypes.string,
  handleUpload: PropTypes.func,
  handleOfflineSwitch: PropTypes.func,
  offline: PropTypes.bool,
  isDisable: PropTypes.bool
};

class DeviceInfoDisplay extends PureComponent {
  render () {
    return (
      <div className={styles.deviceInfoDisplay}>
        {Object.keys(this.props.info).map(key => (
          <div key={key}>
            <span className={styles.infoItemSpan}>{key}</span>
            <input
              readOnly
              className={styles.infoItemInput}
              type="text"
              value={this.props.info[key] || 0}
            /></div>
        ))}
      </div>
    );
  }
}

class AdditionalButtons extends PureComponent {
  render () {
    return (
      <div className={styles.additionalButtons}>
        {process.env.NODE_ENV.includes('development') && <button
          className={styles.developmentButton}
          onClick={this.props.onHandleGetPoseSwitch}
        >{'getPose'}</button>}
        <button
          onMouseDown={this.props.onHandleMouseDown}
          onMouseUp={this.props.onHandleMouseUp}
          onTouchEnd={this.props.onHandleMouseUp}
          onTouchStart={this.props.onHandleMouseDown}
        ><span className={styles.gripperLeft}>{this.props.isUseJoint ? 'J4-' : 'R-'}</span></button>
        <button
          onMouseDown={this.props.onHandleMouseDown}
          onMouseUp={this.props.onHandleMouseUp}
          onTouchEnd={this.props.onHandleMouseUp}
          onTouchStart={this.props.onHandleMouseDown}
        ><span className={styles.gripperRight}>{this.props.isUseJoint ? 'J4+' : 'R+'}</span></button>
      </div>
    );
  }
}

class SlideRail extends PureComponent {
  render () {
    return (
      <div className={styles.bottomControl} >
        <div
          className={styles.extension}
          style={{ display: this.props.extensionId === 'magicianlite' ? 'none' : '' }}
        >
          <CheckboxInput
            isChecked={this.props.railEnable}
            onClickFunc={this.props.onHandleRailEnable}
          />
          <FormattedMessage
            defaultMessage="滑轨"
            id="gui.device_control_pane.sliding"
          />
          <div className={styles.selectButtons}>
            <button
              onMouseDown={this.props.onHandleMouseDown}
              onMouseUp={this.props.onHandleMouseUp}
              onTouchEnd={this.props.onHandleMouseUp}
              onTouchStart={this.props.onHandleMouseDown}
              disabled={!this.props.railEnable}
            ><span>{'L-'}</span></button>
            <button
              onMouseDown={this.props.onHandleMouseDown}
              onMouseUp={this.props.onHandleMouseUp}
              disabled={!this.props.railEnable}
              onTouchEnd={this.props.onHandleMouseUp}
              onTouchStart={this.props.onHandleMouseDown}
            ><span>{'L+'}</span></button>
            
          </div>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line react/display-name
const BottomControl = React.forwardRef((props, bottomControlRef) => {
  const {
    isToolListShow,
    iconClick,
    toolList,
    selectionTool,
    toolClick,
    suckerChecked,
    handleSuckerChecked,
    grabChecked,
    handleGrabChecked
  } = props;
  return (
    <div className={styles.bottomList}>
      <div className={styles.leftList}>
        <div style={{ display: selectionTool.type === 'sucker' ? ' inline' : 'none' }}>
          <div className={styles.extension}>
            <RadioInput
              isChecked={suckerChecked === 1}
              onClickFunc={handleSuckerChecked(1)}
            />
            <FormattedMessage
              defaultMessage="吸取"
              id="gui.device_control_pane.sucker.suck"
            />
            <RadioInput
              isChecked={suckerChecked === 2}
              onClickFunc={handleSuckerChecked(2)}
            />
            <FormattedMessage
              defaultMessage="释放"
              id="gui.device_control_pane.sucker.release"
            />
          </div>
        </div>
        <div style={{ display: selectionTool.type === 'grab' ? ' inline-block' : 'none' }}>
          <div className={styles.extension}>
            <RadioInput
              isChecked={grabChecked === 0}
              onClickFunc={handleGrabChecked(0)}
            />
            <FormattedMessage
              defaultMessage="禁止"
              id="gui.device_control_pane.gripper.disable"
            />
            <RadioInput
              isChecked={grabChecked === 1}
              onClickFunc={handleGrabChecked(1)}
            />
            <FormattedMessage
              defaultMessage="开"
              id="gui.device_control_pane.gripper.open"
            />
            <RadioInput
              isChecked={grabChecked === 2}
              onClickFunc={handleGrabChecked(2)}
            />
            <FormattedMessage
              defaultMessage="合"
              id="gui.device_control_pane.gripper.close"
            />
          </div>
        </div>
        
      </div>
      <div
        className={styles.rightList}
        style={{ borderTop: isToolListShow ? 'none' : ' 1px solid rgb(32, 155, 250)' }}
      >
        <div
          className={styles.itemTop}
          onClick={iconClick}
        >
          <img
            src={selectionTool.selectionImg}
          />
          <i
            className={styles.sanjiaoIcon}
            style={{ transform: isToolListShow ? 'rotateZ(-180deg)' : '' }}
          />
        </div>
        <p className={styles.text}>
          {selectionTool.text}
        </p>
      </div>
      <ul
        className={styles.suckerList}
        ref={bottomControlRef}
      >
        {
          toolList.map(item => (
            <li
              key={item.type}
            
            >
              <img
                src={item.img}
              />
              <p
                className={styles.liText}
              >
                {item.text}

              </p>
              <div
                className={styles.clickMask}
                value={item.type}
                onClick={toolClick}
              />
            </li>
          ))
        }
      </ul>
    </div>
  );
});

const Loading = () => (
  <div className={styles.loadingWapper}>
    <div className={styles.img} />
    <p><FormattedMessage
      defaultMessage="正在运行中, 请稍候"
      id="gui.device.control.pane.loading"
    /></p>
  </div>
);

SlideRail.propTypes = {
  onHandleMouseDown: PropTypes.func.isRequired,
  onHandleMouseUp: PropTypes.func.isRequired,
  onHandleRailEnable: PropTypes.func.isRequired,
  railEnable: PropTypes.bool.isRequired,
  extensionId: PropTypes.string
};

DeviceCircleControl.propTypes = {
  isUseJoint: PropTypes.bool.isRequired,
  onHandleMouseDown: PropTypes.func.isRequired,
  onHandleMouseUp: PropTypes.func.isRequired
};
DeviceInfoDisplay.propTypes = {

  info: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string,
    z: PropTypes.string,
    r: PropTypes.string
  }).isRequired
};
AdditionalButtons.propTypes = {
  isUseJoint: PropTypes.bool.isRequired,
  onHandleGetPoseSwitch: PropTypes.func.isRequired,
  onHandleMouseDown: PropTypes.func.isRequired,
  onHandleMouseUp: PropTypes.func.isRequired
};

BottomControl.propTypes = {
  isToolListShow: PropTypes.bool,
  iconClick: PropTypes.func,
  toolList: PropTypes.array,
  selectionTool: PropTypes.object,
  toolClick: PropTypes.func,
  suckerChecked: PropTypes.number,
  handleSuckerChecked: PropTypes.func,
  grabChecked: PropTypes.number,
  handleGrabChecked: PropTypes.func
};
export default {
  DeviceCircleControl,
  DeviceInfoDisplay,
  AdditionalButtons,
  BottomControl,
  Loading,
  FirstLine,
  SlideRail
};
