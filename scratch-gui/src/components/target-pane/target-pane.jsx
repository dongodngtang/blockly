import PropTypes from 'prop-types';
import React from 'react';

import VM from 'scratch-vm';

import SpriteLibrary from '../../containers/sprite-library.jsx';
import SpriteSelectorComponent from '../sprite-selector/sprite-selector.jsx';
import DeviceSelectorComponent from '../device-selector/device-selector.jsx';
import StageSelector from '../../containers/stage-selector.jsx';
import { STAGE_DISPLAY_SIZES } from '../../lib/layout-constants';

import styles from './target-pane.css';
import DeviceControlPane from '../../containers/device-control-pane.jsx';
import DeviceUploadPane from '../../containers/device-upload-pane.jsx';

/*
 * Pane that contains the sprite selector, sprite info, stage selector,
 * and the new sprite, costume and backdrop buttons
 * @param {object} props Props for the component
 * @returns {React.Component} rendered component
 */
const TargetPane = ({
  editingTarget,
  fileInputRef,
  hoveredTarget,
  spriteLibraryVisible,
  deviceLibraryVisible,
  onActivateBlocksTab,
  onChangeSpriteDirection,
  onChangeSpriteName,
  onChangeSpriteRotationStyle,
  onChangeSpriteSize,
  onChangeSpriteVisibility,
  onChangeSpriteX,
  onChangeSpriteY,
  onDeleteSprite,
  onDrop,
  onDuplicateSprite,
  onExportSprite,
  onFileUploadClick,
  onNewSpriteClick,
  onNewDeviceClick,
  onPaintSpriteClick,
  onRequestCloseSpriteLibrary,
  onRequestCloseDeviceLibrary,
  onSelectSprite,
  onSpriteUpload,
  onSurpriseSpriteClick,
  onTabSelect,
  raiseSprites,
  stage,
  stageSize,
  sprites,
  vm,
  targetTab,
  onClickDeviceConnect,
  ...componentProps
}) => {
  const props = {
    editingTarget,
    hoveredTarget,
    raised: raiseSprites,
    selectedId: editingTarget,
    spriteFileInput: fileInputRef,
    sprites,
    stageSize,
    onChangeSpriteDirection,
    onChangeSpriteName,
    onChangeSpriteRotationStyle,
    onChangeSpriteSize,
    onChangeSpriteVisibility,
    onChangeSpriteX,
    onChangeSpriteY,
    onDeleteSprite,
    onDrop,
    onDuplicateSprite,
    onExportSprite,
    onFileUploadClick,
    onPaintSpriteClick,
    onSelectSprite,
    onSpriteUpload,
    onSurpriseSpriteClick
  };
  const getLibrary = function (deviceVisible, spriteVisible) {
    if (deviceVisible || spriteVisible) {
      return (
        <SpriteLibrary
          isDevice={targetTab === 'device'}
          vm={vm}
          onActivateBlocksTab={onActivateBlocksTab}
          onRequestClose={targetTab === 'device' ? onRequestCloseDeviceLibrary : onRequestCloseSpriteLibrary}
        />
      );
    }
    return null;
        
  };
  return (
    <div
      className={styles.targetPane}
      {...componentProps}
    >
    
      {targetTab === 'sprite' ? <SpriteSelectorComponent
        {...props}
        onNewSpriteClick={onNewSpriteClick}
      /> : <DeviceSelectorComponent
        {...props}
        onNewDeviceClick={onNewDeviceClick}
      />}
      {targetTab === 'sprite' ? <div className={styles.stageSelectorWrapper}>
        {stage.id && <StageSelector
          asset={
            stage.costume &&
                        stage.costume.asset
          }
          backdropCount={stage.costumeCount}
          id={stage.id}
          selected={stage.id === editingTarget}
          onSelect={onSelectSprite}
        />}
      </div> : <div className={styles.deviceSelectorWrapper}>
        {vm.editingTarget && vm.editingTarget.deviceName && (vm.editingTarget.isUpload ?
          <DeviceUploadPane vm={vm} /> :
          <DeviceControlPane
            deviceId={vm.editingTarget.id}
            extensionId={vm.editingTarget.deviceName}
            handleDeviceConnect={onClickDeviceConnect}
            intl={componentProps.intl}
            vm={vm}
          />)}
      </div>}
      {getLibrary(deviceLibraryVisible, spriteLibraryVisible)}
    </div>
  );
};

const spriteShape = PropTypes.shape({
  costume: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string.isRequired,
    // The following are optional because costumes uploaded from disk
    // will not have these properties available
    bitmapResolution: PropTypes.number,
    rotationCenterX: PropTypes.number,
    rotationCenterY: PropTypes.number
  }),
  direction: PropTypes.number,
  id: PropTypes.string,
  name: PropTypes.string,
  order: PropTypes.number,
  size: PropTypes.number,
  visibility: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number
});

TargetPane.propTypes = {
  deviceLibraryVisible: PropTypes.bool,
  editingTarget: PropTypes.string,
  extensionLibraryVisible: PropTypes.bool,
  fileInputRef: PropTypes.func,
  hoveredTarget: PropTypes.shape({
    hoveredSprite: PropTypes.string,
    receivedBlocks: PropTypes.bool
  }),
  onActivateBlocksTab: PropTypes.func.isRequired,
  onChangeSpriteDirection: PropTypes.func,
  onChangeSpriteName: PropTypes.func,
  onChangeSpriteRotationStyle: PropTypes.func,
  onChangeSpriteSize: PropTypes.func,
  onChangeSpriteVisibility: PropTypes.func,
  onChangeSpriteX: PropTypes.func,
  onChangeSpriteY: PropTypes.func,
  onClickDeviceConnect: PropTypes.func,
  onDeleteSprite: PropTypes.func,
  onDrop: PropTypes.func,
  onDuplicateSprite: PropTypes.func,
  onExportSprite: PropTypes.func,
  onFileUploadClick: PropTypes.func,
  onNewDeviceClick: PropTypes.func,
  onNewSpriteClick: PropTypes.func,
  onPaintSpriteClick: PropTypes.func,
  onRequestCloseDeviceLibrary: PropTypes.func,
  onRequestCloseExtensionLibrary: PropTypes.func,
  onRequestCloseSpriteLibrary: PropTypes.func,
  onSelectSprite: PropTypes.func,
  onSpriteUpload: PropTypes.func,
  onSurpriseSpriteClick: PropTypes.func,
  onTabSelect: PropTypes.func,
  raiseSprites: PropTypes.bool,
  spriteLibraryVisible: PropTypes.bool,
  sprites: PropTypes.objectOf(spriteShape),
  stage: spriteShape,
  stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
  targetTab: PropTypes.string,
  vm: PropTypes.instanceOf(VM)
};

export default TargetPane;
