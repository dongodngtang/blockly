import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import Box from '../box/box.jsx';
import classNames from 'classnames';

import styles from '../connection-modal/connection-modal.css';

class PeripheralTile extends React.Component {
  constructor (props) {
    super(props);
    bindAll(this, [
      'handleConnecting',
      'handleDisconnecting'
    ]);
  }
  handleConnecting () {
    this.props.onConnecting(this.props.portName);
  }
  handleDisconnecting () {
    this.props.onDisconnect(this.props.portName);
  }
  render () {
    return (
      <Box className={styles.peripheralTile}>
        <Box className={styles.peripheralTileName}>
          <img
            className={styles.peripheralTileImage}
            src={this.props.connectionSmallIconURL}
          />
          <Box className={styles.peripheralTileNameWrapper}>
            <Box className={styles.peripheralTileNameLabel}>
              <FormattedMessage
                defaultMessage="Port Name"
                description="port for device field showing the device name"
                id="gui.connection.device-peripheral-name-label"
              />
            </Box>
            <Box className={styles.peripheralTileNameText}>
              {this.props.portName}
            </Box>
          </Box>
        </Box>
        <Box className={styles.peripheralTileWidgets}>
          <button
            className={styles.connectionButton}
            style={{ cursor: this.props.status === 'connected' ? 'not-allowed' : '' }}
            onClick={this.props.isConnected ? this.handleDisconnecting : this.handleConnecting}
            disabled={this.props.status === 'connected'}
          >
            {this.props.status === 'connected' ? <FormattedMessage
              defaultMessage="connected"
              id="gui.connection.connected"
            /> : <FormattedMessage
              defaultMessage="Connect"
              description="Button to start connecting to a specific device"
              id="gui.connection.device-connect"
            /> }
          </button>
        </Box>
      </Box>
    );
  }
}

PeripheralTile.propTypes = {
  connectionSmallIconURL: PropTypes.string,
  isConnected: PropTypes.bool.isRequired,
  onConnecting: PropTypes.func,
  onDisconnect: PropTypes.func,
  portName: PropTypes.string,
  status: PropTypes.string
};

export default PeripheralTile;
