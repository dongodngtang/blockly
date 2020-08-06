import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import Draggable from 'react-draggable';

import styles from './arduino-card.css';

import rightArrow from './icon--next.svg';
import leftArrow from './icon--prev.svg';

import helpIcon from '../../lib/assets/icon--tutorials.svg';
import closeIcon from './icon--close.svg';
import { GuidePage, Step1, Step3, Step2, Step4, SubStep4, Step5, Step6 } from './content/content';

const CardHeader = ({ onCloseCards, totalSteps, step }) => (
  <div className={styles.headerButtons}>
    <div
      className={styles.allButton}
    >
      <img
        className={styles.helpIcon}
        src={helpIcon}
      />
      <FormattedMessage
        defaultMessage="Init Visual Sorting"
        id="gui.ardino.card.initVisual"
      />
    </div>
    {totalSteps > 1 ? (
      <div className={styles.stepsList}>
        {Array(totalSteps).fill(0)
          .map((_, i) => (
            <div
              className={i === step ? styles.activeStepPip : styles.inactiveStepPip}
              key={`pip-step-${i}`}
            />
          ))}
      </div>
    ) : null}
    <div
      className={styles.removeButton}
      onClick={onCloseCards}
    >
      <FormattedMessage
        defaultMessage="Close"
        description="Title for button to close how-to card"
        id="gui.cards.close"
      />
      <img
        className={styles.closeIcon}
        src={closeIcon}
      />
    </div>
  </div>
);

const NextPrevButtons = ({ isRtl, onNextStep, onPrevStep }) => (
  <Fragment>
    {onNextStep ? (
      <div>
        <div className={isRtl ? styles.leftCard : styles.rightCard} />
        <div
          className={isRtl ? styles.leftButton : styles.rightButton}
          onClick={onNextStep}
        >
          <img
            draggable={false}
            src={isRtl ? leftArrow : rightArrow}
          />
        </div>
      </div>
    ) : null}
    {onPrevStep ? (
      <div>
        <div className={isRtl ? styles.rightCard : styles.leftCard} />
        <div
          className={isRtl ? styles.rightButton : styles.leftButton}
          onClick={onPrevStep}
        >
          <img
            draggable={false}
            src={isRtl ? rightArrow : leftArrow}
          />
        </div>
      </div>
    ) : null}
  </Fragment>
);

NextPrevButtons.propTypes = {
  isRtl: PropTypes.bool,
  onNextStep: PropTypes.func,
  onPrevStep: PropTypes.func
};
CardHeader.propTypes = {
  onCloseCards: PropTypes.func.isRequired,
  step: PropTypes.number,
  totalSteps: PropTypes.number
};

const StepComponent = ({ currentStep, intl, onFunctions, poseData, scanCOMs, step5FreshBlocks }) => {
  switch (currentStep) {
  case 0:
    return (<GuidePage
      handleSelect={onFunctions.onCOMSelected}
      scanCOMs={scanCOMs}
    />);
  case 1:
    return (<Step1
      handleRecord={onFunctions.onStep1Record}
      poseData={poseData}
    />);
  case 2:
    return (<Step2
      handleRecord={onFunctions.onStep2Record}
      intl={intl}
    />);
  case 3:
    return (<Step3
      handleRecord={onFunctions.onStep3Record}
      poseData={poseData}
    />);
  case 4:
    return <Step4 />;
  case 5:
    // 中间插了一行子步骤, 所以跟 step 错开了一个
    return (<SubStep4
      handleRecord={onFunctions.onStep4Record}
    />);
  case 6:
    return (<Step5
      freshBlocks={step5FreshBlocks}
      handleRecord={onFunctions.onStep5Record}
      poseData={poseData}
    />);
  case 7:
    return (<Step6
      handleFinish={onFunctions.onFinish}
      handleRecord={onFunctions.onStep6Record}
      intl={intl}
    />);
  }
};
StepComponent.propTypes = {
  currentStep: PropTypes.string,
  intl: PropTypes.object,
  onFunctions: PropTypes.object,
  poseData: PropTypes.object,
  scanCOMs: PropTypes.array,
  step5FreshBlocks: PropTypes.shape({
    block1: PropTypes.bool,
    block2: PropTypes.bool,
    block3: PropTypes.bool
  })
};
const Cards = props => {
  const {
    isRtl,
    onCloseCards,
    onDrag,
    onStartDrag,
    onEndDrag,
    onNextStep,
    onPrevStep,
    step,
    totalSteps,
    intl,
    onFinish,
    onStep1Record,
    onStep2Record,
    onStep3Record,
    onStep4Record,
    onStep5Record,
    onStep6Record,
    magicianFn,
    scanCOMs,
    poseData,
    onCOMSelected,
    step5FreshBlocks,
    ...posProps
  } = props;
  let { x, y } = posProps;

  if (x === 0 && y === 0) {
    // initialize positions
    const widthCard = 600;
    x = (window.innerWidth - widthCard) / 2;
    y = window.innerHeight / 4;
  }
  return (
    <Draggable
      bounds="parent"
      position={{ x: x, y: y }}
      onDrag={onDrag}
      onStart={onStartDrag}
      onStop={onEndDrag}
      cancel="input,button"
    >
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <CardHeader
            step={step}
            totalSteps={totalSteps}
            onCloseCards={onCloseCards}
          />
          <div className={styles.stepBody} >
            <StepComponent
              currentStep={step}
              intl={intl}
              onFunctions={{
                onStep1Record,
                onStep2Record,
                onStep3Record,
                onStep4Record,
                onStep5Record,
                onStep6Record,
                onFinish,
                onCOMSelected
              }}
              poseData={poseData}
              scanCOMs={scanCOMs}
              step5FreshBlocks={step5FreshBlocks}

            />
          </div>
          <NextPrevButtons
            isRtl={isRtl}
            onNextStep={step < totalSteps - 1 ? onNextStep : null}
            onPrevStep={step > 0 ? onPrevStep : null}
          />
        </div>
      </div>
    </Draggable>
  );
};

Cards.propTypes = {
  dragging: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  isRtl: PropTypes.bool.isRequired,
  magicianFn: PropTypes.shape({
    onStep1Record: PropTypes.func,
    onStep2Record: PropTypes.func,
    onStep3Record: PropTypes.func,
    onStep4Record: PropTypes.func,
    onStep5Record: PropTypes.func,
    onStep6Record: PropTypes.func
  }).isRequired,
  onCOMSelected: PropTypes.func,
  onCloseCards: PropTypes.func.isRequired,
  onDrag: PropTypes.func,
  onEndDrag: PropTypes.func,
  onFinish: PropTypes.func,
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired,
  onStartDrag: PropTypes.func,
  onStep1Record: PropTypes.func,
  onStep2Record: PropTypes.func,
  onStep3Record: PropTypes.func,
  onStep4Record: PropTypes.func,
  onStep5Record: PropTypes.func,
  onStep6Record: PropTypes.func,
  poseData: PropTypes.shape({
    jointAngle: PropTypes.array,
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
    r: PropTypes.number
  }),
  scanCOMs: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  step5FreshBlocks: PropTypes.shape({
    block1: PropTypes.bool,
    block2: PropTypes.bool,
    block3: PropTypes.bool
  }),
  totalSteps: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

export default Cards;
