import PropTypes from 'prop-types';
import React from 'react';
import keyMirror from 'keymirror';

import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';

import ScanningStep from '../../containers/scanning-step.jsx';
import ErrorStep from './error-step.jsx';
import UnavailableStep from './unavailable-step';

import styles from '../connection-modal/connection-modal.css';

const DEVICEPHASES = keyMirror({
  scanning: null,
  uploading: null,
  error: null,
  unavailable: null
});

const DeviceUploadModalComponent = props => (
  <Modal
    className={styles.modalContent}
    contentLabel={props.title}
    headerClassName={styles.header}
    headerImage={props.connectionSmallIconURL}
    id="deviceUploadModal"
    onHelp={props.onHelp}
    onRequestClose={props.onCancel}
  >
    <Box className={styles.body}>
      {props.phase === DEVICEPHASES.scanning && <ScanningStep
        isUpload
        {...props}
      />}
      {props.phase === DEVICEPHASES.error && <ErrorStep {...props} />}
      {props.phase === DEVICEPHASES.unavailable && <UnavailableStep {...props} />}
    </Box>
  </Modal>
);

DeviceUploadModalComponent.propTypes = {
  choosePort: PropTypes.string,
  name: PropTypes.node,
  onCancel: PropTypes.func.isRequired,
  onHandleChoose: PropTypes.func,
  onHelp: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  phase: PropTypes.oneOf(Object.keys(DEVICEPHASES)).isRequired,
  progress: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  connectionSmallIconURL: PropTypes.string
};

export {
  DeviceUploadModalComponent as default,
  DEVICEPHASES
};
