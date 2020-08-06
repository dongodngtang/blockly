import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {

} from '../reducers/modals';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CoordinateCalibration from '../components/coordinate-calibration';
import VM from 'scratch-vm';
import calibrationWs from '../lib/calibration';
import { setRobotPoint } from '../reducers/coordinate-calibration';

let isInit = false;
let stopBtnDisable = false;
let tempRobotPoint = [];

const addRobotPoint = (poseData => {
  const tempPoint = new Array(2);
  tempPoint[0] = Number(poseData.x);
  tempPoint[1] = Number(poseData.y);
  if (tempRobotPoint.length >= 4) return;
  tempRobotPoint.push(tempPoint);
});

class CoordinateCalibrationContainer extends React.Component {

    state = {
      step: 0,
      stopFlag: true,
      nextBtnDisable: false, // 下一步按钮是否可用
      isShowCardContainer: true,
      isShowSuccessPopup: false,
      isErr: false
    }
    componentDidMount(){
      // 在首次加载时才 new websocket
      if (!isInit) {
        this.caliWs = calibrationWs.getSingleInstace();
        isInit = true;
      }
    }
    
    componentWillUnmount(){
      isInit = false;
      tempRobotPoint = [];
      isInit = false;
    }


    calibrationValidateImg = image => new Promise(resolve => {
      if (image && this.caliWs){
        this.caliWs.calidrationData(image).then(data => {
          resolve(data);
        });
      }
    })

    changeStopFlag = flag => {
      this.setState({
        stopFlag: flag
      });
    }

    changeNextBtnDisable = flag => {
      if (!stopBtnDisable){
        this.setState({
          nextBtnDisable: flag
        });
      }
    }

    recalibration = () => {
      this.props.calibrationSetPTPCmd(this.props);
      this.setState({
        step: 2,
        stopFlag: false,
        nextBtnDisable: true,
        isShowSuccessPopup: false,
        isShowCardContainer: true,
        isErr: false
      });
    }

    nextStep = () => {
      let { step, nextBtnDisable } = this.state;
      stopBtnDisable = step === 2;
      switch (step){
      case 1:
        this.props.calibrationSetPTPCmd(this.props);
        break;
      case 3:
        addRobotPoint(this.props.poseData);
        break;
      case 4:
        addRobotPoint(this.props.poseData);
        break;
      case 5:
        addRobotPoint(this.props.poseData);
        break;
      case 6:
        addRobotPoint(this.props.poseData);
        this.props.onHandleSetRootPoint(tempRobotPoint);
        this.caliWs.calibrationCalculation(this.props.imagePoint, tempRobotPoint).then(res => {
          if (res){
            this.setState({
              isShowSuccessPopup: true,
              isShowCardContainer: false
            });
            setTimeout(() => {
              this.setState({
                isShowSuccessPopup: false
              });
              this.props.closeCalibration();
            }, 1000);
          } else {
            this.setState({
              isShowSuccessPopup: true,
              isShowCardContainer: false,
              isErr: true
            });
          }
        });
        return;
      }
      
      if (nextBtnDisable){
        return;
      }
      step++;
      this.setState({
        step,
        stopFlag: step !== 2,
        nextBtnDisable: step === 2
      });
    }

    prveStep = () => {
      let { step } = this.state;
      stopBtnDisable = step === 2;
      if (step === 3){
        this.props.calibrationSetPTPCmd(this.props);
      }
      if (step < 0){
        return;
      }
      step--;
      this.setState({
        step,
        stopFlag: step !== 2,
        nextBtnDisable: step === 2
      });
    }

  render = () => {
    const tempProps = {
      ...this.state
    };
    return (
      <Fragment>
        <CoordinateCalibration
          onDrag={this.handleOnDrag}
          onStartDrag={this.handleStartDrag}
          onEndDrag={this.handleEndDrag}
          nextStep={this.nextStep}
          prveStep={this.prveStep}
          vm={this.props.vm}
          calibrationValidateImg={this.calibrationValidateImg}
          changeStopFlag={this.changeStopFlag}
          changeNextBtnDisable={this.changeNextBtnDisable}
          closeCalibration={this.props.closeCalibration}
          recalibration={this.recalibration}
          {...tempProps}
        />
      </Fragment>
    );
    
   
  }
}
CoordinateCalibrationContainer.propTypes = {
  vm: PropTypes.instanceOf(VM).isRequired,
  closeCalibration: PropTypes.func,
  calibrationSetPTPCmd: PropTypes.func,
  poseData: PropTypes.object,
  imagePoint: PropTypes.array,
  onHandleSetRootPoint: PropTypes.func
};
const mapStatesToProps = states => ({
  poseData: states.scratchGui.connectionModal.poseData,
  imagePoint: states.scratchGui.calibration.imagePoint,
  robotPoint: states.scratchGui.calibration.robotPoint
});
const mapDispatchToProps = dispatch => ({
  onHandleSetRootPoint: robotPoint => {
    dispatch(setRobotPoint(robotPoint));
  }
});

export default connect(mapStatesToProps, mapDispatchToProps)(CoordinateCalibrationContainer);
