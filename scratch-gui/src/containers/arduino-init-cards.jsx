import { connect } from 'react-redux';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  closeCards,
  nextStep,
  prevStep,
  dragCard,
  startDrag,
  endDrag,
  setTotalSteps,
  setInitData,
  resetStep
} from '../reducers/arduino-init-cards';

import CardsComponent from '../components/ArduinoKitVisualInit/arduino-cards';
import { intlShape } from 'react-intl';
import { addedVisualSort } from '../lib/events';
export const dataDefault = {
  step5block: { block1: { x: 0, y: 0, z: 0 }, block2: { x: 0, y: 0, z: 0 }, block3: { x: 0, y: 0, z: 0 } },
  step3location: { x: 0, y: 0, z: 0 },
  step4point: {
    point1: { x: 0, y: 0, h: 0, w: 0 },
    point2: { x: 0, y: 0, h: 0, w: 0 },
    point3: { x: 0, y: 0, h: 0, w: 0 } },
  step6colortosig: { red: 0, blue: 0, yellow: 0, green: 0 },
  step1Z: 0,
  step2rgby: { red: 0, blue: 0, yellow: 0, green: 0 } };
// eslint-disable-next-line react/prefer-stateless-function
class Cards extends React.Component {
  state = {
    scanCOMs: [],
    COM: null,
    poseData: {}
  }
  componentDidMount () {
    this.scan();
  }

  componentWillUnmount () {
    clearInterval(this.timer);
    this.timer = null;
    this.props.toResetStep();
  }

  data = {
    step5block: { block1: { x: 0, y: 0, z: 0 }, block2: { x: 0, y: 0, z: 0 }, block3: { x: 0, y: 0, z: 0 } },
    step3location: { x: 0, y: 0, z: 0 },
    step4point: {
      point1: { x: 0, y: 0, h: 0, w: 0 },
      point2: { x: 0, y: 0, h: 0, w: 0 },
      point3: { x: 0, y: 0, h: 0, w: 0 } },
    step6colortosig: { red: 0, blue: 0, yellow: 0, green: 0 },
    step1Z: 0,
    step2rgby: { red: 0, blue: 0, yellow: 0, green: 0 } }

  timer = null

  handleFinish = () => {
    this.props.onCloseCards();
    this.props.toResetStep();
    document.dispatchEvent(addedVisualSort);
    console.log(this.data);
    window.data = this.data;
    this.props.toSetData(this.data);
  }

  magician = this.props.vm.runtime.peripheralExtensions.magician;

  getPose = () => {
    // this.timer = setInterval(() => {
    //   this.magician.getPose(null, this.state.COM).then(data => {
    //     if (JSON.stringify(data) !== JSON.stringify(this.state.poseData)) {
    //       console.log(data);
    //       this.setState({
    //         poseData: {
    //           x: data.x.toFixed(1),
    //           y: data.y.toFixed(1),
    //           z: data.z.toFixed(1),
    //           r: data.r.toFixed(1)
    //         }
    //       });
    //     }
    //   });
    // }, 1000);
  }

  scan = () => {
    this.magician.scan().then(datas => {
      this.setState({
        scanCOMs: datas.map(data => data.portName)
      });
    });
  }

  handleCOMSelected = COM => {
    this.setState({
      COM
    }, this.getPose);
  }

  handleStep1Record = () => {
    this.data.step1Z = this.state.poseData.z;
  }

  handleStep2Record = ({ red, yellow, blue, green }) => {
    console.log({ red, yellow, blue, green });
    this.data.step2rgby = { red, yellow, blue, green };
  }

  handleStep3Record = data => {
    const { x, y, z } = data ? data : this.state.poseData;

    this.data.step3location = { x, y, z };
    console.log(this.data);
  }
  handleStep4Record = ({ point1, point2, point3 }) => {
    this.data.step4point = { point1, point2, point3 };
    console.log(this.data);
  }
  handleStep5Record = data => {
    console.log(data);
    if (data.block1) {
      this.data.step5block.block1 = data.block1;
    }
    if (data.block2) {
      this.data.step5block.block2 = data.block2;
    }
    if (data.block3) {
      this.data.step5block.block3 = data.block3;
    }
    // this.data.step5block = { block1, block2, block3 };
  }

  handleStep6Record = colorToSignatureMap => {
    this.data.step6colortosig = colorToSignatureMap;
  }
  
  render () {
    const totalSteps = 8;
    this.props.toSetTotalSteps(totalSteps);
    return (<CardsComponent
      {...this.props}
      magicianFn={{ getPose: this.getPose }}
      poseData={this.state.poseData}
      scanCOMs={this.state.scanCOMs}
      step5FreshBlocks={{
        block1: this.data.step5block.block1,
        block2: this.data.step5block.block2,
        block3: this.data.step5block.block3
      }}
      totalSteps={totalSteps}
      onCOMSelected={this.handleCOMSelected}
      onFinish={this.handleFinish}
      onStep1Record={this.handleStep1Record}
      onStep2Record={this.handleStep2Record}
      onStep3Record={this.handleStep3Record}
      onStep4Record={this.handleStep4Record}
      onStep5Record={this.handleStep5Record}
      onStep6Record={this.handleStep6Record}
    />);
  }
}

Cards.propTypes = {
  intl: intlShape.isRequired,
  toResetStep: PropTypes.func,
  onCloseCards: PropTypes.func,
  vm: PropTypes.object,
  toSetData: PropTypes.func,
  toSetTotalSteps: PropTypes.func
};

const mapStateToProps = state => ({
  content: state.scratchGui.arduinoInitCards.content,
  step: state.scratchGui.arduinoInitCards.step,
  x: state.scratchGui.arduinoInitCards.x,
  y: state.scratchGui.arduinoInitCards.y,
  isRtl: state.locales.isRtl,
  locale: state.locales.locale,
  dragging: state.scratchGui.arduinoInitCards.dragging,
  vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
  onCloseCards: () => dispatch(closeCards()),
  onNextStep: () => dispatch(nextStep()),
  onPrevStep: () => dispatch(prevStep()),
  onDrag: (e_, data) => dispatch(dragCard(data.x, data.y)),
  onStartDrag: () => dispatch(startDrag()),
  onEndDrag: () => dispatch(endDrag()),
  toSetTotalSteps: num => dispatch(setTotalSteps(num)),
  toSetData: data => dispatch(setInitData(data)),
  toResetStep: () => dispatch(resetStep())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards);
