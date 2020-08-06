import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './index.css';

import helpIcon from '../../lib/assets/icon--tutorials.svg';
import closeIcon from './icon--close.svg';

export const CardHeader = ({ onCloseCards, totalSteps, step, headTitle }) => (
  <div className={styles.headerButtons}>
    <div
      className={styles.allButton}
    >
      <img
        className={styles.helpIcon}
        src={helpIcon}
      />
      {headTitle}
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
    <button
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
    </button>
  </div>
);
CardHeader.propTypes = {
  onCloseCards: PropTypes.func.isRequired,
  step: PropTypes.number,
  totalSteps: PropTypes.number,
  headTitle: PropTypes.object
};


export const PageHeader = ({ step }) => (
  <div className={styles.title}>
    <div className={styles.subtitle + (step === 0 ? ` ${styles.selected}` : '')}>
      <span className={styles.index + (step === 0 ? ` ${styles.selected}` : '')}>{'1'}</span>
      <FormattedMessage
        defaultMessage="Adding features and data"
        description="Adding features and data"
        id="gui.ardino.card.AddClass"
      />
    </div>
    <span className={styles.betweenSubtitle} />
    <div className={styles.subtitle + (step === 1 ? ` ${styles.selected}` : '')}>
      <span className={styles.index + (step === 1 ? ` ${styles.selected}` : '')}>{'2'}</span>
      <FormattedMessage
        defaultMessage="Test classification model"
        description="Test classification model"
        id="gui.ardino.card.TestClassificationModel"
      />
    </div>
  </div>
);
PageHeader.propTypes = {
  step: PropTypes.number
};
