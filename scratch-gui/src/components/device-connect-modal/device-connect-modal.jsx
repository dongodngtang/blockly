import PropTypes from 'prop-types';
import React from 'react';
import keyMirror from 'keymirror';

import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';

import ScanningStep from '../../containers/scanning-step.jsx';
import ConnectingStep from './connecting-step.jsx';
import ConnectedStep from './connected-step.jsx';
import ErrorStep from './error-step.jsx';
import UnavailableStep from './unavailable-step';

import styles from '../connection-modal/connection-modal.css';

const DEVICEPHASES = keyMirror({
  scanning: null,
  connecting: null,
  connected: null,
  error: null,
  unavailable: null
});

const DeviceConnectionModalComponent = props => (
  <Modal
    className={styles.modalContent}
    contentLabel={props.name}
    headerClassName={styles.header}
    headerImage={props.connectionSmallIconURL}
    id="connectionModal"
    onHelp={props.onHelp}
    onRequestClose={props.onCancel}
  >
    <Box className={styles.body}>
      {props.phase === DEVICEPHASES.scanning && <ScanningStep
        isDevice
        {...props}
      />}
      {props.phase === DEVICEPHASES.connecting && <ConnectingStep {...props} />}
      {props.phase === DEVICEPHASES.connected && <ConnectedStep {...props} />}
      {props.phase === DEVICEPHASES.error && <ErrorStep {...props} />}
      {props.phase === DEVICEPHASES.unavailable && <UnavailableStep {...props} />}
    </Box>
  </Modal>
);

DeviceConnectionModalComponent.propTypes = {
  connectingMessage: PropTypes.node,
  connectionSmallIconURL: PropTypes.string,
  connectionTipIconURL: PropTypes.string,
  name: PropTypes.node,
  onCancel: PropTypes.func.isRequired,
  onHelp: PropTypes.func.isRequired,
  phase: PropTypes.oneOf(Object.keys(DEVICEPHASES)).isRequired,
  title: PropTypes.string.isRequired
};

export {
  DeviceConnectionModalComponent as default,
  DEVICEPHASES
};
