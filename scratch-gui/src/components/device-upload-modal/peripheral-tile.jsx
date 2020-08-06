import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import Box from '../box/box.jsx';

import styles from '../connection-modal/connection-modal.css';
import uploadStyles from './device-upload-modal.css';

class PeripheralTile extends React.Component {
    handleChoose = clickEvent => {
      const port = clickEvent.currentTarget.id;
      this.props.onHandleChoose(port);
    }
    render () {
      return (
        <Box className={styles.peripheralTile}>
          <Box className={styles.peripheralTileName}>
            <Box className={styles.peripheralTileNameWrapper}>
              <Box className={styles.peripheralTileNameLabel}>
                <FormattedMessage
                  defaultMessage="Port Name"
                  description="port for device field showing the device name"
                  id="gui.connection.device-peripheral-name-label"
                />
              </Box>
              <Box className={styles.peripheralTileNameText}>
                {`${this.props.name}: ${this.props.description}`}
                            
              </Box>
            </Box>
          </Box>
          <Box
            className={styles.peripheralTileWidgets}
          >
            <button
              id={this.props.name}
              onClick={this.handleChoose}
              className={(this.props.choosePort === this.props.name ? uploadStyles.choosedPort : null)}
            >
              <FormattedMessage
                defaultMessage="Choose"
                description="Button to choose Port"
                id="gui.connection.device-upload-choose-port"
              />
            </button>
          </Box>
        </Box>
      );
    }
}

PeripheralTile.propTypes = {
  choosePort: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  onHandleChoose: PropTypes.func.isRequired
};

export default PeripheralTile;
