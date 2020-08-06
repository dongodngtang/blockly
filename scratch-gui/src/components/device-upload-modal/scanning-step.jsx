import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import VM from 'scratch-vm';

import Box from '../box/box.jsx';
import PeripheralTile from './peripheral-tile.jsx';

import radarIcon from '../connection-modal/icons/searching.png';
import uploadIcon from '../action-menu/upload.svg';
import refreshIcon from '../connection-modal/icons/refresh.svg';

import styles from '../connection-modal/connection-modal.css';
import uploadStyles from './device-upload-modal.css';
import { ProgressBar, ControllerProgressBar } from '../progress-bar/progress-bar.jsx';


const ScanningStep = props => {
  const isProgressing = props.progress > 0;
  const isController = props.vm.editingTarget.deviceName === 'controller';
  const [choosePort, setChoosePort] = useState(null);
  const [isClickUpload, setIsClickUpload] = useState(false);
  const handleChose = function (port) {
    setChoosePort(port);
    props.onHandleChoose(port);
  };
  const onUploadHandle = () => {
    setIsClickUpload(true);
    props.onUpload();
  };
  useEffect(() => {
    if ([-1, -2].includes(props.progress)){
      setIsClickUpload(false);
    }
  });
  return (
    <Box className={styles.body}>
      <Box className={styles.activityArea}>
        {props.scanning ? (
          props.peripheralList.length === 0 ? (
            <div className={styles.activityAreaInfo}>
              <div className={styles.centeredRow}>
                <img
                  className={classNames(styles.radarSmall, styles.radarSpin)}
                  src={radarIcon}
                />
                <FormattedMessage
                  defaultMessage="Looking for devices"
                  description="Text shown while scanning for devices"
                  id="gui.connection.scanning.lookingforperipherals"
                />
              </div>
            </div>
          ) : (
            <div className={styles.peripheralTilePane}>
              {props.peripheralList.map(peripheral =>
                (<PeripheralTile
                  choosePort={choosePort}
                  description={peripheral.description}
                  key={peripheral.portName}
                  name={peripheral.portName}
                  onHandleChoose={handleChose}
                />)
              )}
            </div>
          )
        ) : (
          <Box className={styles.instructions}>
            <FormattedMessage
              defaultMessage="No devices found"
              description="Text shown when no devices could be found"
              id="gui.connection.scanning.noPeripheralsFound"
            />
          </Box>
        )}
      </Box>
      {
        isController ? <ControllerProgressBar
          progress={props.progress}
          isClickUpload={isClickUpload}
        /> : <ProgressBar progress={props.progress} />
      }
      <Box className={classNames(uploadStyles.bottomArea, styles.cornerButtons)}>
        <button
          className={classNames(uploadStyles.yellowButton, styles.connectionButton)}
          onClick={props.onRefresh}
          disabled={isClickUpload}
          style={{ cursor: isClickUpload ? 'wait' : 'pointer' }}
        >
          <FormattedMessage
            defaultMessage="Refresh"
            description="Button to refresh ports"
            id="gui.connection.deviceUploadRefresh"
          />
          <img
            className={styles.buttonIconRight}
            src={refreshIcon}
          />
        </button>
        <button
          className={classNames(styles.bottomAreaItem, styles.connectionButton)}
          disabled={isClickUpload}
          style={{ cursor: isClickUpload ? 'wait' : 'pointer' }}
          onClick={onUploadHandle}
        >   {
            isProgressing ?
              <FormattedMessage
                defaultMessage="Uploading"
                description="Button to uploading Code to device"
                id="gui.connection.deviceUploading"
              /> :
              <FormattedMessage
                defaultMessage="Upload"
                description="Button to upload Code to device"
                id="gui.connection.deviceUpload"
              />
          }
          <img
            className={styles.buttonIconRight}
            src={uploadIcon}
            style={{
              height: '20px'
            }}
          />
        </button>
      </Box>
    </Box>
  );
};

ScanningStep.propTypes = {
  onHandleChoose: PropTypes.func,
  onRefresh: PropTypes.func,
  onUpload: PropTypes.func,
  peripheralList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    rssi: PropTypes.number,
    peripheralId: PropTypes.string
  })),
  progress: PropTypes.number.isRequired,
  scanning: PropTypes.bool.isRequired,
  vm: PropTypes.instanceOf(VM).isRequired
};

ScanningStep.defaultProps = {
  peripheralList: [],
  scanning: true
};


export default ScanningStep;
