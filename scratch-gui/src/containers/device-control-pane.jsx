import React from 'react';
import PropTypes from 'prop-types';
import DevicePane from '../components/device-control-pane/device-control-pane';
import linkIcon from '../components/action-menu/link.svg';
import unlinkIcon from '../components/action-menu/unlink-symbol.svg';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import VM from 'scratch-vm';
import { openDeviceConnectionModal, openDeviceUploadModal } from '../reducers/modals';
import {
  setDeviceConnectionModalExtensionId
} from '../reducers/device-conenct-modal';
import {
  SwitchJoint
} from '../components/device-control-pane/switch-cordinate/switch-cordinate';
import { detectClient } from '../lib/detect-client';
import { SpeedSlide } from '../components/device-control-pane/speed-slider/speed-slider';
import { setVelocity, setSpeedInfo, setPose } from '../reducers/connection-modal';

import penBule from '../components/device-control-pane/images/Bi.png';
import pen from '../components/device-control-pane/images/bi-2.png';
import suckerBule from '../components/device-control-pane/images/x.png';
import sucker from '../components/device-control-pane/images/x-1.png';
import grabBule from '../components/device-control-pane/images/z.png';
import grab from '../components/device-control-pane/images/z-1.png';
import { disableAllOnlineBlocks, enableAllOnlineBlocks } from '../lib/blocks/util/disableMBOnline';
import { toggleMBOffline } from '../reducers/device-control-pane';
import { FormattedMessage } from 'react-intl';
import { checkType } from '../lib/magicina-lite-alarmType';
import { setIsmagicianLitAralm, setAlarmType, setIsconfirm } from '../reducers/alarm';
import { Modal } from 'antd';

const boxAndLite = ['controller', 'magicianlite'];
// 移动端时速度条点击时速度显示由定时器控制
let isSpeedClick = false;

const messages = defineMessages({
  coordinate: {
    id: 'gui.spriteSelector.coordinate',
    description: 'show coordinate',
    defaultMessage: 'Coordiate'
  }
});

const ClickHomeStates = {
  getSetHomeMsg: 'SetHomeComplete',
  SettingHomeList: {},
  add(deviceId, homeAction) {
    ClickHomeStates.SettingHomeList[deviceId] = true;
    homeAction.finally(() => {
      delete ClickHomeStates.SettingHomeList[deviceId];
      document.dispatchEvent(new CustomEvent(ClickHomeStates.getSetHomeMsg));
    });
  }
};
const initialPose = {
  x: '0',
  y: '0',
  z: '0',
  r: '0',
  jointAngle: ['0', '0', '0', '0']
};

const suckerText = (
  <FormattedMessage
    defaultMessage="SuctionCup"
    description="SuctionCup"
    id="gui.device_control_pane.sucker"
  />
);

const penText = (
  <FormattedMessage
    defaultMessage="Pen"
    description="Pen"
    id="gui.device_control_pane.pen"
  />
);

const grabText = (
  <FormattedMessage
    defaultMessage="Gripper"
    description="Gripper"
    id="gui.device_control_pane.gripper"
  />
);

const initialToolList = [
  {
    type: 'pen',
    img: pen,
    selectionImg: penBule,
    text: penText
  },
  {
    type: 'sucker',
    img: sucker,
    selectionImg: suckerBule,
    text: suckerText
  },
  {
    type: 'grab',
    img: grab,
    selectionImg: grabBule,
    text: grabText
  }
];
const initialSpeed = {
  accelerationRatio: 0,
  velocityRatio: 0
};
const initialState = {
  poseData: initialPose,
  checkedIndex: 0,
  railEnable: false,
  timeoutCount: 0,
  isEnable: true,
  isUseJoint: false,
  isToolListShow: false,
  toolList: initialToolList,
  selectionTool: {
    type: 'sucker',
    img: sucker,
    selectionImg: suckerBule,
    text: suckerText
  },
  suckerChecked: 0,
  grabChecked: 10
};

const flags = {
  ON: 1,
  OFF: 2,
  DISABLE: 0
};

class DeviceControlPane extends React.PureComponent {
  constructor(props) {
    super(props);
    // eslint-disable-next-line max-len
    this.dataArrays = ['X', 'Y', 'Z', 'R', 'L', 'J'];
    this.state = { ...initialState };
    if (props.extensionId === 'controller') {
      DeviceControlPane.magicBoxOnlineStatues[props.deviceId] = false;
      this.state.offline = false;
    }
    this.getposeFlag = true;
    this.timmer = null;
    this.sliderRef = React.createRef();
    this.bottomControlRef = React.createRef();
    this.stopGetAlarm = false;
  }
 
  static getDerivedStateFromProps(props, state) {
    if (!props.isConnected) {
      state = { ...initialState };
      props.onHandleSetPose(initialPose);
      props.setSpeed(initialSpeed);
    }
    return state;
  }
  
  componentDidMount(){
    this.sliderWarp = this.sliderRef.current;
    this.bigWarp = this.sliderWarp.parentNode;
    this.sliderBackground = this.sliderWarp.children[1];
    this.tipsWarp = this.sliderWarp.parentNode.children[2];
    this.smallPieces = this.sliderWarp.children[0];
    // eslint-disable-next-line radix
    this.smallPiecesWidth = parseInt(window.getComputedStyle(this.sliderWarp.children[0]).width);
    // eslint-disable-next-line radix
    this.sliderWarpWidth = parseInt(window.getComputedStyle(this.sliderWarp).width);
    this.toolList = this.bottomControlRef.current;
    // 国际化切换时保持速度条状态
    this.sliderBackground.style.width = `${this.props.speedInfo.velocityRatio}%`;
    this.sliderWarp.children[0].style.left = `${this.props.speedInfo.velocityRatio}%`;
  }

  componentDidUpdate(prevProps) {
    if (this.props.extensionId === 'controller') {
      // eslint-disable-next-line no-undefined
      if (DeviceControlPane.magicBoxOnlineStatues[this.props.deviceId] === undefined) {
        this.props.setMBOffline(false);
        DeviceControlPane.magicBoxOnlineStatues[this.props.deviceId] = false;
      } else {
        this.props.setMBOffline(DeviceControlPane.magicBoxOnlineStatues[this.props.deviceId]);
      }
    } else if (this.props.mbOffline !== null){
      this.props.setMBOffline(null);
    }
    if (prevProps.speedInfo.velocityRatio !== this.props.speedInfo.velocityRatio) {
      const scale = this.props.speedInfo.velocityRatio / 100;
      this.sliderWarp.children[0].style.left = `${scale * this.sliderWarpWidth}px`;
      this.sliderBackground.style.width = `${scale * this.sliderWarpWidth}px`;
    }
    if (this.props.isConfirm){
      this.alarmTimmer = null;
      this.props.handlSetIsconfirm(false);
      this.stopGetAlarm = false;
    }
  }

  componentWillUnmount() {
    if (this.timmer) {
      clearTimeout(this.timmer);
      this.timmer = null;
    }
  }
  get scale () {
    return this.props.stageSizeMode === 'small' ? '0.8' : '1';
  }

  static magicBoxOnlineStatues = {}
  setMBStatue = statue => {
    DeviceControlPane.magicBoxOnlineStatues[this.props.deviceId] = statue;
    this.setState({
      offline: statue
    });
  }
  handleSwitchJoint = isJoint => () => {
    this.setState({
      isUseJoint: isJoint
    });
  };
  handleMouseDown = mouseDownEvent => {
    const { isConnected, vm, extensionId, deviceId } = this.props;
    if (this.dataArrays.includes(mouseDownEvent.target.textContent[0])) {
      if (isConnected) {
        const content = mouseDownEvent.target.textContent;
        if (extensionId === 'magician') {
          vm.runtime.peripheralExtensions.magician.setJOGcmd(
            content,
            deviceId,
            this.state.isUseJoint
          );
        } else if (extensionId === 'magicianlite') {
          vm.runtime.peripheralExtensions.magicianlite.setJOGcmd(
            content,
            deviceId,
            this.state.isUseJoint
          );
        } else if (extensionId === 'controller') {
          vm.runtime.peripheralExtensions.controller.setJOGcmd(
            content,
            deviceId,
            this.state.isUseJoint
          );
        }
      } else {
        this.props.onHandleClickDeviceConnect(extensionId);
      }
    }
    if (detectClient().isPC) {
      document.addEventListener('mouseup', this.handleMouseUp);
    }
    return;
  };
  waitingHomeRes = () => {
    this.setState({
      isEnable: false
    });
    document.addEventListener(
      ClickHomeStates.getSetHomeMsg,
      this.waitinHomeListener
    );
  };
  waitinHomeListener = () => {
    this.setState({
      isEnable: true
    });
  };
  handleHomeClick = () => {
    if (!this.state.isEnable || this.props.isRunning){
      return;
    }
    const { isConnected, vm, extensionId, deviceId } = this.props;
    if (isConnected && vm.runtime.peripheralExtensions[extensionId]) {
      ClickHomeStates.add(
        deviceId,
        vm.runtime.peripheralExtensions[extensionId].Home(deviceId)
      );
      this.waitingHomeRes();
    } else {
      this.props.onHandleClickDeviceConnect(extensionId);
    }
  };

  handleMouseUp = e => {
    e.preventDefault();
    if (detectClient().isPC) {
      document.removeEventListener('mouseup', this.handleMouseUp);
    } else {
      document.removeEventListener('touchend', this.handleMouseUp);
    }
    const { isConnected, vm, deviceId, extensionId } = this.props;
    if (isConnected && vm.runtime.peripheralExtensions[extensionId]) {
      vm.runtime.peripheralExtensions[extensionId].setJOGcmd(0, deviceId, this.state.isUseJoint);
    }
    return;
  };

  handleSwitchGetPoseFlag = () => {
    this.getposeFlag = !this.getposeFlag;
  };

  handleSuckerChecked = flag => () => {
    const { isConnected, vm, deviceId, extensionId } = this.props;
    if (isConnected) {
      this.setState({
        suckerChecked: flag
      });
      if (flag === flags.ON && vm.runtime.peripheralExtensions[extensionId]){
        vm.runtime.peripheralExtensions[extensionId].SetEndEffectorSuctionCup(
          true,
          true,
          deviceId
        );
      } else if (flag === flags.OFF && vm.runtime.peripheralExtensions[extensionId]){
        vm.runtime.peripheralExtensions[extensionId].SetEndEffectorSuctionCup(
          false,
          false,
          deviceId
        );
      }
    } else {
      this.props.onHandleClickDeviceConnect(extensionId);
    }
   

  }

  handleGrabChecked = flag => () => {
    const { isConnected, vm, deviceId, extensionId } = this.props;
    if (isConnected) {
      this.setState({
        grabChecked: flag
      });
      if (flag === flags.ON && vm.runtime.peripheralExtensions[extensionId]){
      // 张开
        vm.runtime.peripheralExtensions[extensionId].SetEndEffectorGripper(
          true,
          false,
          deviceId
        );
      } else if (flag === flags.OFF && vm.runtime.peripheralExtensions[extensionId]){
      // 闭合
        vm.runtime.peripheralExtensions[extensionId].SetEndEffectorGripper(
          true,
          true,
          deviceId
        );
      } else if (flag === flags.DISABLE && vm.runtime.peripheralExtensions[extensionId]){
        vm.runtime.peripheralExtensions[extensionId].SetEndEffectorGripper(
          false,
          false,
          deviceId
        );
      }
    } else {
      this.props.onHandleClickDeviceConnect(extensionId);
    }
    
  }

  handleRailEnable = () => {
    const { isConnected, extensionId, vm, deviceId } = this.props;
    if (isConnected && vm.runtime.peripheralExtensions[extensionId]) {
      vm.runtime.peripheralExtensions[extensionId].SetDeviceWithL(
        !this.state.railEnable,
        deviceId
      );
      this.setState(prevState => ({
        railEnable: !prevState.railEnable
      }));
    } else {
      return;
    }
  };

  errDisConnectDobot = error => {
    this.props.vm.disConnectDobot(error.portName);
    setTimeout(
      () =>
        this.setState({
          ...initialState
        }),
      150
    );
    Modal.warning({
      title: '警告',
      content: '设备失去连接，请检查设备',
      okText: 'ok'
    });
  }

  getPoseData = () => {
    const { vm, deviceId, extensionId, onHandleSetPose, isControllerMagicianLite } = this.props;
    if (!isControllerMagicianLite && extensionId === 'controller'){
      return;
    }
    
    if (!this.getposeFlag) {
      if (this.timmer) {
        clearTimeout(this.timmer);
        this.timmer = null;
      }
      return;
    }
    
    this.timmer = setTimeout(() => {
      if (vm.runtime.peripheralExtensions[extensionId]) {
        vm.runtime.peripheralExtensions[extensionId].getPose(deviceId).then(
          data => {
            const poseData = {};
            this.timmer = null;
            if (data) {
              Object.keys(data).forEach(key => {
                if (['x', 'y', 'z', 'r'].includes(key)) {
                  poseData[key] = data[key].toFixed(1).toString();
                } else {
                  poseData[key] = Array.from(
                    data[key].map(joint => joint.toFixed(1).toString())
                  );
                }
              });
              if (this.props.vm.editingTarget && this.props.connectedList.includes(this.props.vm.editingTarget.id)){
                onHandleSetPose(poseData);
              }
              this.setState({ timeoutCount: 0 });
            } else if (this.props.vm.editingTarget &&
                this.props.connectedList.includes(this.props.vm.editingTarget.id)){
              onHandleSetPose({ ...this.props.poseData });
            }
          },
          error => {
            if (this.timmer) {
              clearTimeout(this.timmer);
              this.timmer = null;
            }
            // 如果 getPose 获得的是 dobotlink 关闭, 或magician断开连接 的情况, 或尝试超过三次, 则直接断开连接
            if (
              !error.message.includes('closed') &&
                !error.message.includes('disconnect') &&
                this.state.timeoutCount < 2
            ) {
              return this.setState({
                timeoutCount: this.state.timeoutCount + 1
              });
            }
            this.errDisConnectDobot(error);
            // 置零速度条
            this.props.setSpeed(initialSpeed);
            // 置零pose
            this.props.onHandleSetPose(initialPose);
          }
        );
      }
    }, 400);
  };
  magicinaLitAlarmTodo = alarmNum => {
    const alarmType = checkType(alarmNum);
    if (alarmType){
      this.stopGetAlarm = true;
      this.props.handleSetIsmagicianLitAralm(true);
      this.props.handlsetAlarmType(alarmType);
      this.props.vm.stopAll();
    }
  }
  getAlarm = extensionId => {
    if (this.stopGetAlarm) return;
    const { vm, deviceId } = this.props;
    this.alarmTimmer = setTimeout(() => {
      if (this.props.isMagicianLitAralm || !this.props.isConnected){
        if (this.alarmTimmer){
          clearTimeout(this.alarmTimmer);
          this.alarmTimmer = null;
        }
        return;
      }
      if (vm.runtime.peripheralExtensions[extensionId]) {
        vm.runtime.peripheralExtensions[extensionId].GetAlarmsState(deviceId).then(
          data => {
            const arr = data.state;
            for (let i = 0; i < 16; i++) {
              for (let j = 0; j < 8; j++) {
                if (((arr[i] >> j) & 0b01) === 1 && (8 * i) + j !== 0) {
                  const alarmNum = (8 * i) + j;
                  this.magicinaLitAlarmTodo(alarmNum);
                }
              }
            }
            this.getAlarm(extensionId);
            this.setState({ timeoutCount: 0 });
          },
          error => {
            if (this.alarmTimmer) {
              clearTimeout(this.alarmTimmer);
              this.alarmTimmer = null;
            }
            if (
              extensionId === 'controller' && !error.message.includes('closed') &&
                !error.message.includes('disconnect') &&
                this.state.timeoutCount < 2
            ) {
              return this.setState({
                timeoutCount: this.state.timeoutCount + 1
              });
            }
            this.errDisConnectDobot(error);
          }
        );
      }
    }, 2000);
  }
  handleSlideMouseEnter = () => {
    this.tipsWarp.style.opacity = 1;
  }
  handleSlideMouseLeave = () => {
    this.tipsWarp.style.opacity = 0;
  }

  handleSliderClick = e => {
    e.stopPropagation();
    const { isConnected, extensionId } = this.props;
    if (isConnected){
      isSpeedClick = true;
      if (!detectClient().isPC){
        this.handleSlideMouseEnter();
        setTimeout(() => {
          this.handleSlideMouseLeave();
        }, 1000);
      }
      const mx = (detectClient().isPC ? e.clientX : e.targetTouches[0].clientX) / this.scale;
      const l = e.target.getBoundingClientRect().x;
      let ml = mx - l;
      if (ml < 0){
        ml = 0;
      }
      if (ml > this.sliderWarpWidth){
        ml = (this.sliderWarpWidth);
      }
      this.speed = Math.round((ml / this.sliderWarpWidth) * 100);
      this.smallPieces.style.left = `${ml}px`;
      this.sliderBackground.style.width = `${ml + (this.smallPiecesWidth / 2)}px`;
      this.props.setVelocity({
        accelerationRatio: this.props.speedInfo.accelerationRatio,
        velocityRatio: this.speed
      });
      this.handleSetJOGCommonParams();
    } else {
      this.props.onHandleClickDeviceConnect(extensionId);
    }
  }

  handleSliderMouseDown = e => {
    e.stopPropagation();
    const { isConnected, extensionId } = this.props;
    if (isConnected){
      this.target = e.target;
      this.targetWidth = this.target.offsetWidth;
      this.x = detectClient().isPC ? e.clientX : e.targetTouches[0].clientX;
      this.l = this.target.offsetLeft;
      if (detectClient().isPC){
        this.bigWarp.addEventListener('mousemove', this.addmouseM = event => {
          this.handleSpeedMouseMove(event);
        });
        this.bigWarp.addEventListener('mouseup', this.handleSpeedMouseUp);
        this.bigWarp.addEventListener('mouseleave', this.handleSpeedMouseleave);
      } else {
        this.target.addEventListener('touchmove', this.handleSpeedMouseMove);
        this.handleSlideMouseEnter();
      }
    } else {
      this.props.onHandleClickDeviceConnect(extensionId);
    }
  }
  handleSpeedMouseMove = e => {
    event.preventDefault();
    const mx = detectClient().isPC ? e.clientX : e.targetTouches[0].clientX;
    let ml = mx - (this.x - this.l);
    if (ml < 0){
      ml = 0;
    }
    if (ml > this.sliderWarpWidth){
      ml = (this.sliderWarpWidth);
    }
    this.speed = Math.round((ml / this.sliderWarpWidth) * 100);
    this.target.style.left = `${ml}px`;
    this.sliderBackground.style.width = `${ml + (this.smallPiecesWidth / 2)}px`;
    this.props.setVelocity({
      accelerationRatio: this.props.speedInfo.accelerationRatio,
      velocityRatio: this.speed
    });
  }
  handleSpeedMouseUp = () => {
    event.preventDefault();
    this.handleSetJOGCommonParams();
    if (detectClient().isPC){
      this.bigWarp.removeEventListener('mousemove', this.addmouseM);
      this.bigWarp.removeEventListener('mouseup', this.handleSpeedMouseUp);
      this.bigWarp.removeEventListener('mouseleave', this.handleSpeedMouseleave);
    } else {
      if (this.targe){
        this.target.removeEventListener('touchmove', this.handleSpeedMouseMove);
      }
      if (!isSpeedClick){
        this.handleSlideMouseLeave();
      }
      isSpeedClick = false;
    }
    
  }
  handleSpeedMouseleave = () => {
    this.handleSetJOGCommonParams();
    this.bigWarp.removeEventListener('mousemove', this.addmouseM);
    this.bigWarp.removeEventListener('mouseup', this.handleSpeedMouseUp);
    this.bigWarp.removeEventListener('mouseleave', this.handleSpeedMouseleave);
  }

  handleSetJOGCommonParams = () => {
    const { extensionId, speedInfo, vm } = this.props;
    const portName = this.props.vm.runtime.findKey(this.props.deviceId);
    if (portName){
      new Promise(() => {
        if (extensionId === 'magicianlite' || extensionId === 'controller') {
          return vm.runtime.peripheralExtensions.magicianlite.SetArmSpeedRatio(portName, this.speed, 0);
        }
        return vm.runtime.peripheralExtensions[extensionId].SetJOGCommonParams(speedInfo.accelerationRatio,
          this.speed, portName);
      })
        .catch(() => {
          vm.runtime.peripheralExtensions[extensionId].GetJOGCommonParams(portName).then(
            data => {
              const tempDate = {};
              if (data.velocityRatio){
                tempDate.velocityRatio = data.velocityRatio;
                tempDate.accelerationRatio = data.accelerationRatio;
              } else {
                tempDate.velocityRatio = data.value;
                tempDate.accelerationRatio = 50;
              }
              this.props.setSpeed(tempDate);
            }
          );
        });
    }
  }

  handleIconClick = () => {
    const { isConnected, extensionId } = this.props;
    if (isConnected) {
      const flag = this.state.isToolListShow;
      this.toolList.style.top = flag ? 0 : `${-this.toolList.offsetHeight}px`;
      this.setState({ isToolListShow: !flag });
    } else {
      this.props.onHandleClickDeviceConnect(extensionId);
    }
  }

  handleToolClick = e => {
    const { vm, extensionId, deviceId } = this.props;
    const isMagician = extensionId === 'magician';
    const selectionType = e.target.getAttribute('value');
    const selectionTool = initialToolList.filter(item => item.type === selectionType)[0];
    const portName = this.props.vm.runtime.findKey(deviceId);
    this.setState({
      selectionTool,
      isToolListShow: false,
      suckerChecked: 10,
      grabChecked: 10
    });
    this.toolList.style.top = 0;
    if (selectionType === 'sucker') {
      if (vm.runtime.peripheralExtensions[extensionId]) {
        if (isMagician){
          vm.runtime.peripheralExtensions[extensionId].SetEndEffectorParams(
            portName,
            59.7,
            0,
            0
          );
        } else {
          vm.runtime.peripheralExtensions[extensionId].SetEndEffectorParams(
            portName,
            1
          );
        }
        
      }
    } else if (selectionType === 'grab'){
      if (vm.runtime.peripheralExtensions[extensionId]) {
        if (isMagician){
          vm.runtime.peripheralExtensions[extensionId].SetEndEffectorParams(
            portName,
            59.7,
            0,
            0
          );
        } else {
          vm.runtime.peripheralExtensions[extensionId].SetEndEffectorParams(
            portName,
            2
          );
        }
        
      }
    } else if (vm.runtime.peripheralExtensions[extensionId]) {
      if (isMagician){
        vm.runtime.peripheralExtensions[extensionId].SetEndEffectorParams(
          portName,
          61,
          0,
          0
        );
      } else {
        vm.runtime.peripheralExtensions[extensionId].SetEndEffectorParams(
          portName,
          3
        );
      }
        
    }
    vm.runtime.peripheralExtensions[extensionId].SetEndEffectorSuctionCup(
      false,
      false,
      deviceId
    );
    vm.runtime.peripheralExtensions[extensionId].SetEndEffectorGripper(
      false,
      false,
      deviceId
    );
  };

  // 专用于 magic box 的离线模式
  handleOfflineSwitch = () => {
    if (this.props.mbOffline) {
      enableAllOnlineBlocks();
    } else {
      disableAllOnlineBlocks();
    }
    this.props.setMBOffline(!this.props.mbOffline);
    // 保存在线离线状态
    DeviceControlPane.magicBoxOnlineStatues[this.props.deviceId] = !this.props.mbOffline;
  };
  // 专用于 magic box 的上传模式
  handleUpload = () => {
    this.props.onHandleClickDeviceUpload();
  };

  render() {
    if (ClickHomeStates.SettingHomeList[this.props.deviceId]) {
      this.waitingHomeRes();
    } else if (!this.state.isEnable) {
      document.removeEventListener(
        ClickHomeStates.getSetHomeMsg,
        this.waitinHomeListener
      );
      this.setState({ isEnable: true });
    }
    const { isConnected, intl, handleDeviceConnect, extensionId } = this.props;
    const { poseData } = this.props;
    if (isConnected) {
      if (!this.timmer && this.state.timeoutCount < 3){
        this.getPoseData();
      }
      if (boxAndLite.includes(extensionId) && !this.alarmTimmer){
        this.getAlarm(extensionId);
      }
    }
    const isJoint = this.state.isUseJoint;
    const [x, y, z, r] = isJoint ?
      poseData.jointAngle :
      [poseData.x, poseData.y, poseData.z, poseData.r];
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%',
          height: '100%',
          position: 'relative',
          userSelect: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          zoom: this.scale,
          backgroundColor: '#e9f1fc',
          borderRadius: '0 4px 4px 0'
        }}
      >
        <DevicePane.FirstLine
          connectIcon={isConnected ? linkIcon : unlinkIcon}
          onHandleActionMenuClick={handleDeviceConnect}
          onHandleHomeClick={this.handleHomeClick}
          offline={this.props.mbOffline}
          handleOfflineSwitch={this.handleOfflineSwitch}
          handleUpload={this.handleUpload}
          isDisable={!this.state.isEnable || this.props.isRunning}
        />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '10px 20px',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '90%',
            borderBottom: '1px solid #209BFA',
            flex: '8'
          }}
        >
          <div style={{ flexBasis: '100%', display: 'flex', marginTop: '15px' }}>
            <SwitchJoint
              isJoint={this.state.isUseJoint}
              label={intl.formatMessage(messages.coordinate)}
              onClickAngle={this.handleSwitchJoint(true)}
              onClickDicar={this.handleSwitchJoint(false)}
            />
            <SpeedSlide
              speed={this.props.speedInfo}
              ref={this.sliderRef}
              sliderMouseDown={this.handleSliderMouseDown}
              slideMouseEnter={this.handleSlideMouseEnter}
              slideMouseLeave={this.handleSlideMouseLeave}
              sliderClick={this.handleSliderClick}
              sliderMouseUp={this.handleSpeedMouseUp}
              sliderTouchMove={this.sliderMouseUp}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <DevicePane.DeviceInfoDisplay
              info={
                this.state.isUseJoint ?
                  { J1: x, J2: y, J3: z, J4: r } :
                  { x, y, z, r }
              }
              isUseJoint={this.state.isUseJoint}
            />
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                flex: '0 1 50%',
                justifyContent: 'center'
              }}
            >
              <DevicePane.DeviceCircleControl
                isUseJoint={this.state.isUseJoint}
                onHandleMouseDown={this.handleMouseDown}
                onHandleMouseUp={this.handleMouseUp}
              />
              <DevicePane.AdditionalButtons
                isUseJoint={this.state.isUseJoint}
                onHandleGetPoseSwitch={this.handleSwitchGetPoseFlag}
                onHandleHomeClick={this.handleHomeClick}
                onHandleMouseDown={this.handleMouseDown}
                onHandleMouseUp={this.handleMouseUp}
              />
            </div>
          </div>
          {(this.props.extensionId === 'magician' || this.props.extensionId === 'controller') && <div>
            <DevicePane.SlideRail
              onHandleMouseDown={this.handleMouseDown}
              onHandleMouseUp={this.handleMouseUp}
              onHandleRailEnable={this.handleRailEnable}
              railEnable={this.state.railEnable}
            />
          </div>}
        </div>
        <DevicePane.BottomControl
          isToolListShow={this.state.isToolListShow}
          ref={this.bottomControlRef}
          iconClick={this.handleIconClick}
          toolList={this.state.toolList.filter(item => item.type !== this.state.selectionTool.type)}
          selectionTool={this.state.selectionTool}
          toolClick={this.handleToolClick}
          suckerChecked={this.state.suckerChecked}
          handleSuckerChecked={this.handleSuckerChecked}
          grabChecked={this.state.grabChecked}
          handleGrabChecked={this.handleGrabChecked}
        />
        {(!this.state.isEnable || this.props.isRunning) && <DevicePane.Loading />}
      </div>
    );
  }
}

DeviceControlPane.propTypes = {
  deviceId: PropTypes.string.isRequired,
  extensionId: PropTypes.string,
  handleDeviceConnect: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  isConnected: PropTypes.bool,
  onHandleClickDeviceConnect: PropTypes.func.isRequired,
  stageSizeMode: PropTypes.string,
  vm: PropTypes.instanceOf(VM).isRequired,
  isRunning: PropTypes.bool,
  onHandleSetPose: PropTypes.func,
  poseData: PropTypes.object,
  speedInfo: PropTypes.object,
  setVelocity: PropTypes.func,
  setSpeed: PropTypes.func,
  onHandleClickDeviceUpload: PropTypes.func,
  mbOffline: PropTypes.bool,
  setMBOffline: PropTypes.func,
  connectedList: PropTypes.array,
  isControllerMagicianLite: PropTypes.bool,
  isMagicianLitAralm: PropTypes.bool,
  handleSetIsmagicianLitAralm: PropTypes.func,
  handlsetAlarmType: PropTypes.func,
  handlSetIsconfirm: PropTypes.func,
  isConfirm: PropTypes.bool
};

const mapStatesToProps = (states, ownProps) => ({
  isConnected: states.scratchGui.connectedDeviceStatus.connectedList.includes(
    ownProps.deviceId
  ),
  stageSizeMode: states.scratchGui.stageSize.stageSize,
  isRunning: states.scratchGui.vmStatus.running,
  speedInfo: states.scratchGui.connectionModal.speedInfo,
  mbOffline: states.scratchGui.deviceControl.isOffline,
  poseData: states.scratchGui.connectionModal.poseData,
  connectedList: states.scratchGui.connectedDeviceStatus.connectedList,
  isControllerMagicianLite: states.scratchGui.connectionModal.isControllerMagicianLite,
  isMagicianLitAralm: states.scratchGui.alarm.isMagicianLitAralm,
  isConfirm: states.scratchGui.alarm.isMagicianLitAralm
});
const mapDispatchToProps = dispatch => ({
  onHandleClickDeviceConnect: extensionId => {
    dispatch(setDeviceConnectionModalExtensionId(extensionId));
    dispatch(openDeviceConnectionModal());
  },
  onHandleSetPose: poseData => {
    dispatch(setPose(poseData));
  },
  setVelocity: velovity => {
    dispatch(setVelocity(velovity));
  },
  setSpeed: speedInfo => {
    dispatch(setSpeedInfo(speedInfo));
  },
  onHandleClickDeviceUpload: () => {
    dispatch(openDeviceUploadModal());
  },
  setMBOffline: statue => dispatch(toggleMBOffline(statue)),
  handleSetIsmagicianLitAralm: flag => dispatch(setIsmagicianLitAralm(flag)),
  handlsetAlarmType: alarmType => dispatch(setAlarmType(alarmType)),
  handlSetIsconfirm: flag => dispatch(setIsconfirm(flag))
});

export default connect(mapStatesToProps, mapDispatchToProps)(
  injectIntl(DeviceControlPane)
);
