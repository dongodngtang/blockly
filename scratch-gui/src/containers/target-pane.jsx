import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import {
  openSpriteLibrary,
  closeSpriteLibrary,
  openDeviceLibrary,
  closeDeviceLibrary,
  openDeviceConnectionModal
} from '../reducers/modals';
import { activateTab, COSTUMES_TAB_INDEX, BLOCKS_TAB_INDEX } from '../reducers/editor-tab';
import { setReceivedBlocks } from '../reducers/hovered-target';
import { showStandardAlert, closeAlertWithId } from '../reducers/alerts';
import { setRestore } from '../reducers/restore-deletion';
import DragConstants from '../lib/drag-constants';
import TargetPaneComponent from '../components/target-pane/target-pane.jsx';
import spriteLibraryContent from '../lib/libraries/custom-roles';
import { handleFileUpload, spriteUpload } from '../lib/file-uploader.js';
import sharedMessages from '../lib/shared-messages';
import { emptySprite } from '../lib/empty-assets';
import { highlightTarget } from '../reducers/targets';
import { fetchSprite, fetchCode } from '../lib/backpack-api';
import randomizeSpritePosition from '../lib/randomize-sprite-position';
import downloadBlob from '../lib/download-blob';
import { setTabType, setDeviceIndex, setSpriteIndex } from '../reducers/tab-type';
import { setDeviceConnectionModalExtensionId } from '../reducers/device-conenct-modal';
import { setSpeedInfo, setPose } from '../reducers/connection-modal';
import webSerial from '../lib/webSerial';
import { setConnectedDeviceList } from '../reducers/connect_status';

class TargetPane extends React.Component {
  constructor (props) {
    super(props);
    bindAll(this, [
      'handleActivateBlocksTab',
      'handleBlockDragEnd',
      'handleChangeSpriteRotationStyle',
      'handleChangeSpriteDirection',
      'handleChangeSpriteName',
      'handleChangeSpriteSize',
      'handleChangeSpriteVisibility',
      'handleChangeSpriteX',
      'handleChangeSpriteY',
      'handleDeleteSprite',
      'handleDrop',
      'handleDuplicateSprite',
      'handleExportSprite',
      'handleNewSprite',
      'handleSelectSprite',
      'handleSurpriseSpriteClick',
      'handlePaintSpriteClick',
      'handleFileUploadClick',
      'handleSpriteUpload',
      'setFileInput',
      'handleSelectTab',
      'handleDeviceConnect'
    ]);
  }
  componentDidMount () {
    this.props.vm.addListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
  }
  componentWillUnmount () {
    this.props.vm.removeListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
  }
  handleChangeSpriteDirection (direction) {
    this.props.vm.postSpriteInfo({ direction });
  }
  handleChangeSpriteRotationStyle (rotationStyle) {
    this.props.vm.postSpriteInfo({ rotationStyle });
  }
  handleChangeSpriteName (name) {
    this.props.vm.renameSprite(this.props.editingTarget, name);
  }
  handleChangeSpriteSize (size) {
    this.props.vm.postSpriteInfo({ size });
  }
  handleChangeSpriteVisibility (visible) {
    this.props.vm.postSpriteInfo({ visible });
  }
  handleChangeSpriteX (x) {
    this.props.vm.postSpriteInfo({ x });
  }
  handleChangeSpriteY (y) {
    this.props.vm.postSpriteInfo({ y });
  }
  handleDeleteSprite (id) {
    const restoreSprite = this.props.vm.deleteSprite(id);
    const restoreFun = () => restoreSprite().then(this.handleActivateBlocksTab);

    this.props.dispatchUpdateRestore({
      restoreFun: restoreFun,
      deletedItem: 'Sprite'
    });

  }
  handleDuplicateSprite (id) {
    this.props.vm.duplicateSprite(id);
  }
  handleExportSprite (id) {
    const spriteName = this.props.vm.runtime.getTargetById(id).getName();
    const saveLink = document.createElement('a');
    document.body.appendChild(saveLink);

    this.props.vm.exportSprite(id).then(content => {
      downloadBlob(`${spriteName}.sprite3`, content);
    });
  }
  handleSelectSprite (id) {
    this.props.vm.setEditingTarget(id);
    const renderTarget = this.props.vm.runtime.getTargetById(id);
    if (renderTarget.isDevice) {
      this.props.setDeviceTab(id);
    } else {
      this.props.setSpriteTab(id);
    }
    if (!renderTarget.isDevice && this.props.stage && id !== this.props.stage.id) {
      this.props.onHighlightTarget(id);
    }
    
    const isConnected = this.props.vm.editingTarget ?
      this.props.connectedList.includes(this.props.vm.editingTarget.id) : false;
    const portName = this.props.vm.runtime.findKey(this.props.vm.editingTarget.id);
    if (isConnected && portName){
      const extensionId = this.props.vm.editingTarget.deviceName;
      // 切换后获取速度信息
      this.props.vm.runtime.peripheralExtensions[extensionId].GetJOGCommonParams(portName).then(
        data => {
          const tempDate = {};
          if (data.velocityRatio){
            tempDate.velocityRatio = data.velocityRatio;
            tempDate.accelerationRatio = data.accelerationRatio;
          } else {
            tempDate.velocityRatio = data.value;
            tempDate.accelerationRatio = 50;
          }
          this.props.setSpeed(tempDate);
        }
      );
    } else {
      this.resetInfo();
    }
  }

  resetInfo(){
    // 置零速度调
    this.props.setSpeed({
      accelerationRatio: 0,
      velocityRatio: 0
    });
    
    // 置零pose
    this.props.onHandleSetPose(
      {
        x: '0',
        y: '0',
        z: '0',
        r: '0',
        jointAngle: ['0', '0', '0', '0']
      }
    );
  }

  handleSelectTab (tabType) {
    this.props.onSetTabType(tabType);
  }
  handleSurpriseSpriteClick () {
    const item = spriteLibraryContent[Math.floor(Math.random() * spriteLibraryContent.length)];
    randomizeSpritePosition(item);
    this.props.vm.addSprite(JSON.stringify(item.json))
      .then(this.handleActivateBlocksTab);
  }
  handlePaintSpriteClick () {
    const formatMessage = this.props.intl.formatMessage;
    const emptyItem = emptySprite(
      formatMessage(sharedMessages.sprite, { index: 1 }),
      formatMessage(sharedMessages.pop),
      formatMessage(sharedMessages.costume, { index: 1 })
    );
    this.props.vm.addSprite(JSON.stringify(emptyItem)).then(() => {
      setTimeout(() => { // Wait for targets update to propagate before tab switching
        this.props.onActivateTab(COSTUMES_TAB_INDEX);
      });
    });
  }
  handleActivateBlocksTab () {
    this.props.onActivateTab(BLOCKS_TAB_INDEX);
    // 重置速度，坐标等信息
    this.resetInfo();
  }
  handleNewSprite (spriteJSONString) {
    return this.props.vm.addSprite(spriteJSONString)
      .then(this.handleActivateBlocksTab);
  }
  handleFileUploadClick () {
    this.fileInput.click();
  }
  handleSpriteUpload (e) {
    const storage = this.props.vm.runtime.storage;
    this.props.onShowImporting();
    handleFileUpload(e.target, (buffer, fileType, fileName, fileIndex, fileCount) => {
      spriteUpload(buffer, fileType, fileName, storage, newSprite => {
        this.handleNewSprite(newSprite).then(() => {
          if (fileIndex === fileCount - 1) {
            this.props.onCloseImporting();
          }
        });
      }, this.props.onCloseImporting);
    }, this.props.onCloseImporting);
  }
  setFileInput (input) {
    this.fileInput = input;
  }
  handleBlockDragEnd (blocks) {
    if (this.props.hoveredTarget.sprite && this.props.hoveredTarget.sprite !== this.props.editingTarget) {
      this.props.vm.shareBlocksToTarget(blocks, this.props.hoveredTarget.sprite, this.props.editingTarget);
      this.props.onReceivedBlocks(true);
    }
  }
  handleDrop (dragInfo) {
    const { sprite: targetId } = this.props.hoveredTarget;
    if (dragInfo.dragType === DragConstants.SPRITE) {
      // Add one to both new and target index because we are not counting/moving the stage
      this.props.vm.reorderTarget(dragInfo.index + 1, dragInfo.newIndex + 1);
    } else if (dragInfo.dragType === DragConstants.BACKPACK_SPRITE) {
      // TODO storage does not have a way of loading zips right now, and may never need it.
      // So for now just grab the zip manually.
      fetchSprite(dragInfo.payload.bodyUrl)
        .then(sprite3Zip => this.props.vm.addSprite(sprite3Zip));
    } else if (targetId) {
      // Something is being dragged over one of the sprite tiles or the backdrop.
      // Dropping assets like sounds and costumes duplicate the asset on the
      // hovered target. Shared costumes also become the current costume on that target.
      // However, dropping does not switch the editing target or activate that editor tab.
      // This is based on 2.0 behavior, but seems like it keeps confusing switching to a minimum.
      // it allows the user to share multiple things without switching back and forth.
      if (dragInfo.dragType === DragConstants.COSTUME) {
        this.props.vm.shareCostumeToTarget(dragInfo.index, targetId);
      } else if (targetId && dragInfo.dragType === DragConstants.SOUND) {
        this.props.vm.shareSoundToTarget(dragInfo.index, targetId);
      } else if (dragInfo.dragType === DragConstants.BACKPACK_COSTUME) {
        // In scratch 2, this only creates a new sprite from the costume.
        // We may be able to handle both kinds of drops, depending on where
        // the drop happens. For now, just add the costume.
        this.props.vm.addCostume(dragInfo.payload.body, {
          name: dragInfo.payload.name
        }, targetId);
      } else if (dragInfo.dragType === DragConstants.BACKPACK_SOUND) {
        this.props.vm.addSound({
          md5: dragInfo.payload.body,
          name: dragInfo.payload.name
        }, targetId);
      } else if (dragInfo.dragType === DragConstants.BACKPACK_CODE) {
        fetchCode(dragInfo.payload.bodyUrl)
          .then(blocks => {
            this.props.vm.shareBlocksToTarget(blocks, targetId);
            this.props.vm.refreshWorkspace();
          });
      }
    }
  }
  handleDeviceConnect () {
    const extensionId = this.props.vm.editingTarget.deviceName;
    const deviceId = this.props.editingTarget;
    if (webSerial.needWebSerial) {
      webSerial.search().then(() => {
        const portName = 'COM1';
        this.props.vm.connectDobot(portName).then(res => {
          this.props.setConnectedDeviceListReducer(deviceId);
          this.props.vm.runtime.peripheralExtensions[extensionId].GetJOGCommonParams(portName).then(
            data => {
              const tempDate = {};
              if (data.velocityRatio){
                tempDate.velocityRatio = data.velocityRatio;
                tempDate.accelerationRatio = data.accelerationRatio;
              } else {
                tempDate.velocityRatio = data.value;
                tempDate.accelerationRatio = 50;
              }
              this.props.setSpeed(tempDate);
            }
          );
        });
      });
    } else {
      this.props.onHandleClickDeviceConnect(extensionId);
    }
  }
  render () {
    const {
      onActivateTab, // eslint-disable-line no-unused-vars
      onReceivedBlocks, // eslint-disable-line no-unused-vars
      onHighlightTarget, // eslint-disable-line no-unused-vars
      dispatchUpdateRestore, // eslint-disable-line no-unused-vars
      onShowImporting, // eslint-disable-line no-unused-vars
      onCloseImporting, // eslint-disable-line no-unused-vars
      onSetTabType, // eslint-disable-line no-unused-vars
      setDeviceTab, // eslint-disable-line no-unused-vars
      setSpriteTab, // eslint-disable-line no-unused-vars
      targetTab, // eslint-disable-line no-unused-vars
      tab, // eslint-disable-line no-unused-vars
      onHandleClickDeviceConnect, // eslint-disable-line no-unused-vars
      setSpeed,
      connectedList,
      onHandleSetPose,
      setConnectedDeviceListReducer,
      ...componentProps
    } = this.props;
    return (
      <TargetPaneComponent
        {...componentProps}
        fileInputRef={this.setFileInput}
        targetTab={this.props.targetTab}
        onActivateBlocksTab={this.handleActivateBlocksTab}
        onChangeSpriteDirection={this.handleChangeSpriteDirection}
        onChangeSpriteName={this.handleChangeSpriteName}
        onChangeSpriteRotationStyle={this.handleChangeSpriteRotationStyle}
        onChangeSpriteSize={this.handleChangeSpriteSize}
        onChangeSpriteVisibility={this.handleChangeSpriteVisibility}
        onChangeSpriteX={this.handleChangeSpriteX}
        onChangeSpriteY={this.handleChangeSpriteY}
        onClickDeviceConnect={this.handleDeviceConnect}
        onDeleteSprite={this.handleDeleteSprite}
        onDrop={this.handleDrop}
        onDuplicateSprite={this.handleDuplicateSprite}
        onExportSprite={this.handleExportSprite}
        onFileUploadClick={this.handleFileUploadClick}
        onPaintSpriteClick={this.handlePaintSpriteClick}
        onSelectSprite={this.handleSelectSprite}
        onSpriteUpload={this.handleSpriteUpload}
        onSurpriseSpriteClick={this.handleSurpriseSpriteClick}
        onTabSelect={this.handleSelectTab}
      />
    );
  }
}

const {
  onSelectSprite, // eslint-disable-line no-unused-vars
  onActivateBlocksTab, // eslint-disable-line no-unused-vars
  ...targetPaneProps
} = TargetPaneComponent.propTypes;

TargetPane.propTypes = {
  intl: intlShape.isRequired,
  onCloseImporting: PropTypes.func,
  onHandleClickDeviceConnect: PropTypes.func,
  onShowImporting: PropTypes.func,
  connectedList: PropTypes.array,
  setSpeed: PropTypes.func,
  onHandleSetPose: PropTypes.func,
  ...targetPaneProps
};

const mapStateToProps = state => ({
  editingTarget: state.scratchGui.targets.editingTarget,
  hoveredTarget: state.scratchGui.hoveredTarget,
  sprites: state.scratchGui.targets.sprites,
  stage: state.scratchGui.targets.stage,
  raiseSprites: state.scratchGui.blockDrag,
  spriteLibraryVisible: state.scratchGui.modals.spriteLibrary,
  deviceLibraryVisible: state.scratchGui.modals.deviceLibrary,
  targetTab: state.scratchGui.targetTab.tab_type,
  connectedList: state.scratchGui.connectedDeviceStatus.connectedList
});

const mapDispatchToProps = dispatch => ({
  onNewSpriteClick: e => {
    e.preventDefault();
    dispatch(openSpriteLibrary());
  },
  onNewDeviceClick: e => {
    e.preventDefault();
    dispatch(openDeviceLibrary());
  },
  onHandleClickDeviceConnect: extensionId => {
    dispatch(setDeviceConnectionModalExtensionId(extensionId));
    dispatch(openDeviceConnectionModal());
  },
  onRequestCloseSpriteLibrary: () => {
    dispatch(closeSpriteLibrary());
  },
  onRequestCloseDeviceLibrary: () => {
    dispatch(closeDeviceLibrary());
  },
  onActivateTab: tabIndex => {
    dispatch(activateTab(tabIndex));
  },
  onReceivedBlocks: receivedBlocks => {
    dispatch(setReceivedBlocks(receivedBlocks));
  },
  dispatchUpdateRestore: restoreState => {
    dispatch(setRestore(restoreState));
  },
  onSetTabType: tabType => {
    dispatch(setTabType(tabType));
  },
  setDeviceTab: id => {
    dispatch(setDeviceIndex(id));
  },
  setSpriteTab: id => {
    dispatch(setSpriteIndex(id));
  },
  onHighlightTarget: id => {
    dispatch(highlightTarget(id));
  },
  onCloseImporting: () => dispatch(closeAlertWithId('importingAsset')),
  onShowImporting: () => dispatch(showStandardAlert('importingAsset')),
  setSpeed: speedInfo => {
    dispatch(setSpeedInfo(speedInfo));
  },
  onHandleSetPose: poseData => {
    dispatch(setPose(poseData));
  },
  setConnectedDeviceListReducer: deviceId => {
    dispatch(setConnectedDeviceList(deviceId));
  }
});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(TargetPane));
