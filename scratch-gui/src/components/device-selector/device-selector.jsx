/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import Box from '../box/box.jsx';
import DeviceList from './device-list.jsx';
import ActionMenu from '../action-menu/action-menu.jsx';
import VM from 'scratch-vm';

import styles from './device-selector.css';

import deviceIcon from '../action-menu/icon--device.svg';

const messages = defineMessages({
  addSpriteFromLibrary: {
    id: 'gui.deviceSelector.addDeviceFromLibrary',
    description: 'Button to add a device in the target pane from library',
    defaultMessage: 'Choose a Device'
  }
});


const DeviceSelectorComponent = function (props) {
  const {
    editingTarget,
    hoveredTarget,
    intl,
    onChangeSpriteDirection,
    onChangeSpriteName,
    onChangeSpriteRotationStyle,
    onChangeSpriteSize,
    onChangeSpriteVisibility,
    onChangeSpriteX,
    onChangeSpriteY,
    onDrop,
    onDeleteSprite,
    onDuplicateSprite,
    onExportSprite,
    onFileUploadClick,
    onNewDeviceClick,
    onPaintSpriteClick,
    onSelectSprite,
    onSpriteUpload,
    onSurpriseSpriteClick,
    raised,
    selectedId,
    spriteFileInput,
    sprites,
    stageSize,
    isJogControl,
    isUpload,
    protocol,
    model,
    vm,
    isPort,
    connectStatus,
    onConnectDevice,
    getCurrentPort,
    searchList,
    ...componentProps
  } = props;


  return (
    <Box
      className={styles.spriteSelector}
      {...componentProps}
    >
      <Box
        className={styles.scrollWrapper}
      >
        <DeviceList
          editingTarget={editingTarget}
          hoveredTarget={hoveredTarget}
          items={Object.keys(sprites).map(id => sprites[id])}
          raised={raised}
          selectedId={selectedId}
          onDeleteSprite={onDeleteSprite}
          onDrop={onDrop}
          onDuplicateSprite={onDuplicateSprite}
          onExportSprite={onExportSprite}
          onSelectSprite={onSelectSprite}
        />
      </Box>
      <ActionMenu
        className={styles.addButton}
        img={deviceIcon}
        title={intl.formatMessage(messages.addSpriteFromLibrary)}
        tooltipPlace="right"
        onClick={onNewDeviceClick}
      />
    </Box>
        
  );
};

DeviceSelectorComponent.propTypes = {
  connectStatus: PropTypes.bool,
  editingTarget: PropTypes.string,
  getCurrentPort: PropTypes.func,
  hoveredTarget: PropTypes.shape({
    hoveredSprite: PropTypes.string,
    receivedBlocks: PropTypes.bool
  }),
  stageSize: PropTypes.string,
  intl: intlShape.isRequired,
  isJogControl: PropTypes.bool,
  isPort: PropTypes.bool,
  isUpload: PropTypes.bool,
  model: PropTypes.bool,
  onChangeSpriteDirection: PropTypes.func,
  onChangeSpriteName: PropTypes.func,
  onChangeSpriteRotationStyle: PropTypes.func,
  onChangeSpriteSize: PropTypes.func,
  onChangeSpriteVisibility: PropTypes.func,
  onChangeSpriteX: PropTypes.func,
  onChangeSpriteY: PropTypes.func,
  onConnectDevice: PropTypes.func,
  onDeleteSprite: PropTypes.func,
  onDrop: PropTypes.func,
  onDuplicateSprite: PropTypes.func,
  onExportSprite: PropTypes.func,
  onFileUploadClick: PropTypes.func,
  onNewDeviceClick: PropTypes.func,
  onPaintSpriteClick: PropTypes.func,
  onSelectSprite: PropTypes.func,
  onSpriteUpload: PropTypes.func,
  onSurpriseSpriteClick: PropTypes.func,
  protocol: PropTypes.array,
  raised: PropTypes.bool,
  searchList: PropTypes.any,
  selectedId: PropTypes.string,
  spriteFileInput: PropTypes.func,
  sprites: PropTypes.shape({
    id: PropTypes.shape({
      costume: PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string.isRequired,
        bitmapResolution: PropTypes.number.isRequired,
        rotationCenterX: PropTypes.number.isRequired,
        rotationCenterY: PropTypes.number.isRequired
      }),
      name: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired
    })
  }),
  vm: PropTypes.instanceOf(VM)
};

export default injectIntl(DeviceSelectorComponent);
