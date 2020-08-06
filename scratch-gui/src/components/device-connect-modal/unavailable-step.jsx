import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import Box from '../box/box.jsx';
import Dots from '../connection-modal/dots.jsx';
import helpIcon from '../connection-modal/icons/help.svg';
import backIcon from '../connection-modal/icons/back.svg';
import usbIcon from '../connection-modal/icons/usbicon.svg';
import dobotLinkIcon from '../connection-modal/icons/dobotlogo.svg';

import styles from '../connection-modal/connection-modal.css';

const UnavailableStep = props => (
  <Box className={styles.body}>
    <Box className={styles.activityArea}>
      <div className={styles.scratchLinkHelp}>
        <div className={styles.scratchLinkHelpStep}>
          <div className={styles.helpStepNumber}>
            {'1'}
          </div>
          <div className={styles.helpStepImage}>
            <img
              className={styles.deviecIcon}
              src={dobotLinkIcon}
            />
          </div>
          <div className={styles.helpStepText}>
            <FormattedMessage
              defaultMessage="Make sure you have DobotLink installed and running"
              description="Message for getting Dobot Link installed"
              id="gui.connection.unavailable.installdobotlink"
            />
          </div>
        </div>
        <div className={styles.scratchLinkHelpStep}>
          <div className={styles.helpStepNumber}>
            {'2'}
          </div>
          <div className={styles.helpStepImage}>
            <img
              className={styles.deviecIcon}
              src={usbIcon}
            />
          </div>
          <div className={styles.helpStepText}>
            <FormattedMessage
              defaultMessage="Check if you connect with USB"
              description="Message for making sure USB is connected"
              id="gui.connection.unavailable.connected USB"
            />
          </div>
        </div>
      </div>
    </Box>
    <Box className={styles.bottomArea}>
      <Dots
        error
        className={styles.bottomAreaItem}
        total={3}
      />
      <Box className={classNames(styles.bottomAreaItem, styles.buttonRow)}>
        <button
          className={styles.connectionButton}
          onClick={props.onScanning}
        >
          <img
            className={classNames(styles.buttonIconLeft, styles.buttonIconBack)}
            src={backIcon}
          />
          <FormattedMessage
            defaultMessage="Try again"
            description="Button to initiate trying the device connection again after an error"
            id="gui.connection.unavailable.tryagainbutton"
          />
        </button>
        {/* <button
          className={styles.connectionButton}
          onClick={props.onHelp}
        >
          <img
            className={styles.buttonIconLeft}
            src={helpIcon}
          />
          <FormattedMessage
            defaultMessage="Help"
            description="Button to view help content"
            id="gui.connection.unavailable.helpbutton"
          />
        </button> */}
      </Box>
    </Box>
  </Box>
);

UnavailableStep.propTypes = {
  // onHelp: PropTypes.func,
  onScanning: PropTypes.func
};

export default UnavailableStep;
