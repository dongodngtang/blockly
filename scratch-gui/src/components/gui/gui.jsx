import classNames from 'classnames';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import tabStyles from 'react-tabs/style/react-tabs.css';
import VM from 'scratch-vm';
import Renderer from 'scratch-render';

import Blocks from '../../containers/blocks.jsx';
import CostumeTab from '../../containers/costume-tab.jsx';
import TargetPane from '../../containers/target-pane.jsx';
const SoundTab = React.lazy(() => import('../../containers/sound-tab.jsx'));
const ArduinoCTab = React.lazy(() => import('../../containers/arduinoC-tab.jsx'));
import StageWrapper from '../../containers/stage-wrapper.jsx';
import Loader from '../loader/loader.jsx';
import Box from '../box/box.jsx';
import MenuBar from '../menu-bar/menu-bar.jsx';
const CostumeLibrary = React.lazy(() => import('../../containers/costume-library.jsx'));
const BackdropLibrary = React.lazy(() => import('../../containers/backdrop-library.jsx'));
import Watermark from '../../containers/watermark.jsx';

const WebGlModal = React.lazy(() => import('../../containers/webgl-modal.jsx'));
// import TipsLibrary from '../../containers/tips-library.jsx';
// import Cards from '../../containers/cards.jsx';
const ArduinoCards = React.lazy(() => import('../../containers/arduino-init-cards'));
const Alerts = React.lazy(() => import('../../containers/alerts.jsx'));
const UpdateAlert = React.lazy(() => import('../../containers/update-alert'));
const DragLayer = React.lazy(() => import('../../containers/drag-layer.jsx'));
const ConnectionModal = React.lazy(() => import('../../containers/connection-modal.jsx'));
const TelemetryModal = React.lazy('../telemetry-modal/telemetry-modal.jsx');
import layout, { STAGE_SIZE_MODES } from '../../lib/layout-constants';
import { resolveStageSize } from '../../lib/screen-utils';
import { OPEN_IMPORTPOPUP } from '../../lib/events';

import styles from './gui.css';
import addExtensionIcon from './icon--extensions.svg';
import codeIcon from './icon--code.svg';
import costumesIcon from './icon--costumes.svg';
import soundsIcon from './icon--sounds.svg';
import VoiceRecognitionContainer from '../../containers/voice-recognition';
const DeviceUploadModal = React.lazy(() => import('../../containers/device-upload-modal'));
import { SuspenseContainer } from '../../containers/suspense.jsx';
const LasyCaliComponent = React.lazy(() => import('../../containers/calibration.jsx'));
const DeviceConnectModal = React.lazy(() => import('../../containers/device-connect-modal.jsx'));
import VersionUpdateContainer from '../../containers/version-update.jsx';
import FirmwareUpdateContainer from '../../containers/firmwareUpdate.jsx';
import AI from '../../containers/ai';
import CoordinateCalibrationContainer from '../../containers/coordinate-calibration.jsx';
import { ImportPopup } from '../coordinate-calibration/tips.jsx';
import TutorialCenterContainer from '../../containers/tutorialCenter.jsx';
import TutorialsidebarContainer from '../../containers/tutorialSidebar.jsx';
import CodeTutorialBtnContainer from '../../containers/code-tutorial-btn';
import AlarmContainer from '../../containers/alarm';
const messages = defineMessages({
  addExtension: {
    id: 'gui.addExtension',
    description: 'Button to add an extension in the target pane',
    defaultMessage: 'Add Extension'
  }
});

// Cache this value to only retrieve it once the first time.
// Assume that it doesn't change for a session.
let isRendererSupported = null;

const GUIComponent = props => {
  const {
    accountNavOpen,
    activeTabIndex,
    alertsVisible,
    authorId,
    authorThumbnailUrl,
    authorUsername,
    basePath,
    backdropLibraryVisible,
    backpackHost,
    backpackVisible,
    blocksTabVisible,
    cardsVisible,
    canCreateNew,
    canEditTitle,
    canRemix,
    canSave,
    canCreateCopy,
    canShare,
    canUseCloud,
    children,
    connectionModalVisible,
    costumeLibraryVisible,
    costumesTabVisible,
    enableCommunity,
    intl,
    isCreating,
    isFullScreen,
    isPlayerOnly,
    isRtl,
    isShared,
    loading,
    renderLogin,
    onClickAccountNav,
    onCloseAccountNav,
    onLogOut,
    onOpenRegistration,
    onToggleLoginOpen,
    onUpdateProjectTitle,
    onActivateCostumesTab,
    onActivateSoundsTab,
    onActivateArduinoCTab,
    onActivateTab,
    onSeleceTargetTab,
    targetTab,
    onClickLogo,
    onExtensionButtonClick,
    onProjectTelemetryEvent,
    onRequestCloseBackdropLibrary,
    onRequestCloseCostumeLibrary,
    onRequestCloseTelemetryModal,
    onSeeCommunity,
    onShare,
    onTelemetryModalCancel,
    onTelemetryModalOptIn,
    onTelemetryModalOptOut,
    showComingSoon,
    soundsTabVisible,
    arduinoCTabVisible,
    stageSizeMode,
    targetIsStage,
    telemetryModalVisible,
    tipsLibraryVisible,
    vm,
    handleTargetTabClick,
    deviceConnectionModalVisible,
    deviceUploadModalVisible,
    isUpload,
    showUpdateAlert,
    onCloseHelpAlert,
    checkUpdate,
    isUpdated,
    arduinoCardVisible,
    isShowUpdate,
    onChangeIsAnupdate,
    onChangeIsCheck,
    onChangeIsNewest,
    updateInfo,
    isAutoUpdate,
    onChangeisAutoUpdate,
    checkFirmwareUpdate,
    isShowFirmwareUpdate,
    onChangeIsFirmwareCheck,
    onChangeIsAnFirmwareupdate,
    onChangeIsFirmwareNewest,
    isAutoFirmwareUpdate,
    firmwareUpdateInfo,
    oldFirmwaReversion,
    autoCheckFirmwareUpdate,
    closeCalibration,
    isShowCalibration,
    calibrationSetPTPCmd,
    isShowTutorialCenter,
    showTutorialCenter,
    isMagicianLitAralm,
    translateCode,
    code,
    showCodePane,
    toShowCodePane,
    toCloseCodePane,
    ...componentProps
  } = omit(props, 'dispatch');
  if (children) {
    return <Box {...componentProps}>{children}</Box>;
  }
  const tabClassNames = {
    tabs: styles.tabs,
    tab: classNames(tabStyles.reactTabsTab, styles.tab),
    codeTabList: classNames(tabStyles.reactTabsTabList, styles.tabList, styles.codeTabList),
    tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
    tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
    tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
    tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
  };

  if (isRendererSupported === null) {
    isRendererSupported = Renderer.isSupported();
  }

  const [isShowImportPopup, setisShowImportPopup] = useState(false);
  const [isImportSuccess, setisImportSuccess] = useState(true);
  useEffect(() => {
    document.addEventListener(OPEN_IMPORTPOPUP, ({ detail: { flag } }) => {
      setisImportSuccess(flag);
      if (flag){
        setisShowImportPopup(true);
        setTimeout(() => {
          setisShowImportPopup(false);
        }, 1000);
      } else {
        setisShowImportPopup(true);
      }
    
    });
  }, []);
  const closeImportPopup = () => {
    setisShowImportPopup(false);
  };
  const stageSize = resolveStageSize(stageSizeMode, isFullScreen);
  const isDeviceTab = targetTab === 'device';
  return (
    <Box
      className={styles.pageWrapper}
      dir={isRtl ? 'rtl' : 'ltr'}
      {...componentProps}
    >
      {telemetryModalVisible ? (
        <SuspenseContainer>
          <TelemetryModal
            onCancel={onTelemetryModalCancel}
            onOptIn={onTelemetryModalOptIn}
            onOptOut={onTelemetryModalOptOut}
            onRequestClose={onRequestCloseTelemetryModal}
          />
        </SuspenseContainer>
      ) : null}
      {loading ? (
        <Loader />
      ) : null}
      {isCreating ? (
        <Loader messageId="gui.loader.creating" />
      ) : null}
      {isRendererSupported ? null : (
        <SuspenseContainer><WebGlModal isRtl={isRtl} /></SuspenseContainer>
      )}
      {/* {tipsLibraryVisible ? (
                    <TipsLibrary />
                ) : null} */}
      {/* {cardsVisible ? (
          <Cards />
        ) : null} */}
      {arduinoCardVisible ? <SuspenseContainer><ArduinoCards intl={intl} /></SuspenseContainer> : null}
      <AI
        intl={intl}
      />
      {alertsVisible ? (
        <SuspenseContainer><Alerts className={styles.alertsContainer} /></SuspenseContainer>
      ) : null}
      <SuspenseContainer>
        <UpdateAlert
          isUpdated={isUpdated}
          showUpdateAlert={showUpdateAlert}
          onCloseHelpAlert={onCloseHelpAlert}
        />
      </SuspenseContainer>
      {connectionModalVisible ? (
        <SuspenseContainer><ConnectionModal vm={vm} /></SuspenseContainer>
      ) : null}
      {deviceConnectionModalVisible ? (
        <SuspenseContainer><DeviceConnectModal
          vm={vm}
          autoCheckFirmwareUpdate={autoCheckFirmwareUpdate}
        /></SuspenseContainer>
      ) : null}
      {deviceUploadModalVisible ? (
        <SuspenseContainer><DeviceUploadModal
          vm={vm}
          intl={intl}
        /></SuspenseContainer>
      ) : null}
      {costumeLibraryVisible ? (
        <SuspenseContainer>
          <CostumeLibrary
            vm={vm}
            onRequestClose={onRequestCloseCostumeLibrary}
          />
        </SuspenseContainer>
      ) : null}
        
      {backdropLibraryVisible ? (
        <SuspenseContainer>
          <BackdropLibrary
            vm={vm}
            onRequestClose={onRequestCloseBackdropLibrary}
          />
        </SuspenseContainer>
      ) : null}
      <SuspenseContainer>
        <LasyCaliComponent intl={intl} />
      </SuspenseContainer>
      <SuspenseContainer>
        <VoiceRecognitionContainer />
      </SuspenseContainer>
      <MenuBar
        accountNavOpen={accountNavOpen}
        authorId={authorId}
        authorThumbnailUrl={authorThumbnailUrl}
        authorUsername={authorUsername}
        canCreateCopy={canCreateCopy}
        canCreateNew={canCreateNew}
        canEditTitle={canEditTitle}
        canRemix={canRemix}
        canSave={canSave}
        canShare={canShare}
        className={styles.menuBarPosition}
        enableCommunity={enableCommunity}
        isShared={isShared}
        showComingSoon={showComingSoon}
        onCheckUpdate={checkUpdate}
        onCheckFirmwareUpdate={checkFirmwareUpdate}
        onClickAccountNav={onClickAccountNav}
        onClickLogo={onClickLogo}
        onCloseAccountNav={onCloseAccountNav}
        onLogOut={onLogOut}
        onOpenRegistration={onOpenRegistration}
        onProjectTelemetryEvent={onProjectTelemetryEvent}
        onSeeCommunity={onSeeCommunity}
        onShare={onShare}
        onToggleLoginOpen={onToggleLoginOpen}
        onUpdateProjectTitle={onUpdateProjectTitle}
        onShowTutorialCenter={showTutorialCenter}
      />
      <Box className={styles.bodyWrapper}>
        <Box className={styles.flexWrapper}>
          <Box className={classNames(styles.stageAndTargetWrapper, styles[stageSize])}>
            <StageWrapper
              isRendererSupported={isRendererSupported}
              isRtl={isRtl}
              stageSize={stageSize}
              vm={vm}
            />
            <Tabs
              forceRenderTabPanel
              className={tabClassNames.tabs}
              selectedIndex={targetTab === 'sprite' ? 1 : 0}
              selectedTabClassName={tabClassNames.tabSelected}
              selectedTabPanelClassName={tabClassNames.tabPanelSelected}
              onSelect={handleTargetTabClick}
            >
              <TabList className={tabClassNames.tabList}>
                <Tab className={tabClassNames.tab}>{<FormattedMessage
                  defaultMessage="Device"
                  description="Device"
                  id="gui.Device"
                />}</Tab>
                <Tab className={tabClassNames.tab}>{<FormattedMessage
                  defaultMessage="Sprite"
                  description="Sprite"
                  id="gui.Sprite"
                />}</Tab>
              </TabList>
              <TabPanel className={tabClassNames.tabPanel}>
                <Box className={styles.targetWrapper}>
                  {isDeviceTab && <TargetPane
                    stageSize={stageSize}
                    tab="device"
                    vm={vm}
                  />}
                </Box>
              </TabPanel>
              <TabPanel className={tabClassNames.tabPanel}>
                <Box className={styles.targetWrapper}>
                  {!isDeviceTab && <TargetPane
                    stageSize={stageSize}
                    tab="sprite"
                    vm={vm}
                  />}
                </Box>
              </TabPanel>
            </Tabs>

          </Box>
          <Box className={styles.editorWrapper}>
            <Tabs
              forceRenderTabPanel
              className={tabClassNames.tabs}
              selectedIndex={activeTabIndex}
              selectedTabClassName={tabClassNames.tabSelected}
              selectedTabPanelClassName={tabClassNames.tabPanelSelected}
              onSelect={onActivateTab}
            >
              <TabList className={tabClassNames.codeTabList}>
                <Tab className={tabClassNames.tab}>
                  <img
                    draggable={false}
                    src={codeIcon}
                  />
                  <FormattedMessage
                    defaultMessage="Code"
                    description="Button to get to the code panel"
                    id="gui.codeTab"
                  />
                </Tab>
                {!isDeviceTab && <Tab
                  className={tabClassNames.tab}
                  onClick={onActivateCostumesTab}
                >
                  <img
                    draggable={false}
                    src={costumesIcon}
                  />
                  {targetIsStage ? (
                    <FormattedMessage
                      defaultMessage="Backdrops"
                      description="Button to get to the backdrops panel"
                      id="gui.backdropsTab"
                    />
                  ) : (
                    <FormattedMessage
                      defaultMessage="Costumes"
                      description="Button to get to the costumes panel"
                      id="gui.costumesTab"
                    />
                  )}
                </Tab>}
                {!isDeviceTab && <Tab
                  className={tabClassNames.tab}
                  onClick={onActivateSoundsTab}
                >
                  <img
                    draggable={false}
                    src={soundsIcon}
                  />
                  <FormattedMessage
                    defaultMessage="Sounds"
                    description="Button to get to the sounds panel"
                    id="gui.soundsTab"
                  />
                </Tab>}
              </TabList>
              <TabPanel className={tabClassNames.tabPanel}>
                <CodeTutorialBtnContainer
                  translateCode={translateCode}
                  code={code}
                  showCodePane={showCodePane}
                  toShowCodePane={toShowCodePane}
                  toCloseCodePane={toCloseCodePane}
                />
                <Box className={styles.blocksWrapper}>
                  <TutorialsidebarContainer />
                  <Blocks
                    canUseCloud={canUseCloud}
                    grow={1}
                    isVisible={blocksTabVisible}
                    options={{
                      media: `${basePath}static/blocks-media/`
                    }}
                    stageSize={stageSize}
                    vm={vm}
                    translateCode={translateCode}
                    showCodePane={showCodePane}
                  />
                </Box>
                <Box className={styles.extensionButtonContainer}>
                  <button
                    className={styles.extensionButton}
                    title={intl.formatMessage(messages.addExtension)}
                    onClick={onExtensionButtonClick}
                  >
                    <img
                      className={styles.extensionButtonIcon}
                      draggable={false}
                      src={addExtensionIcon}
                    />
                  </button>
                </Box>
                <Box className={styles.watermark}>
                  <Watermark />
                </Box>
              </TabPanel>
              {!isDeviceTab && <TabPanel className={tabClassNames.tabPanel}>
                {costumesTabVisible ? <CostumeTab vm={vm} /> : null}
              </TabPanel>}
              {!isDeviceTab && <TabPanel className={tabClassNames.tabPanel}>
                {soundsTabVisible ? <SuspenseContainer><SoundTab vm={vm} /></SuspenseContainer> : null}
              </TabPanel>}
              {isUpload && <TabPanel className={tabClassNames.tabPanel}>
                {arduinoCTabVisible ? <SuspenseContainer><ArduinoCTab vm={vm} /></SuspenseContainer> : null}
              </TabPanel>}
            </Tabs>
          </Box>
        </Box>
      </Box>
      <SuspenseContainer>
        <DragLayer />
      </SuspenseContainer>
      {
        isShowUpdate ? <VersionUpdateContainer
          changeIsAnupdate={onChangeIsAnupdate}
          changeIsCheck={onChangeIsCheck}
          changeIsNewest={onChangeIsNewest}
          updateInfo={updateInfo}
          isAutoUpdate={isAutoUpdate}
          changeisAutoUpdate={onChangeisAutoUpdate}
          vm={vm}
        /> : ''
      }
      {
        isShowFirmwareUpdate ? <FirmwareUpdateContainer
          changeIsAnFirmwareupdate={onChangeIsAnFirmwareupdate}
          changeIsFirmwareCheck={onChangeIsFirmwareCheck}
          changeIsFirmwareNewest={onChangeIsFirmwareNewest}
          firmwareUpdateInfo={firmwareUpdateInfo}
          oldFirmwaReversion={oldFirmwaReversion}
          isAutoFirmwareUpdate={isAutoFirmwareUpdate}
          vm={vm}
        /> : ''
      }
      {
        isShowCalibration ? <CoordinateCalibrationContainer
          vm={vm}
          closeCalibration={closeCalibration}
          calibrationSetPTPCmd={calibrationSetPTPCmd}
        /> : ''
      }
      {
        isShowImportPopup ? <ImportPopup
          text={isImportSuccess ? <FormattedMessage
            defaultMessage="Import succeeded!"
            description="Import succeeded!"
            id="gui.coordinateCalibration.importSuccess"
          /> : <FormattedMessage
            defaultMessage="Import failed, please try again!"
            description="Import failed, please try again!"
            id="gui.coordinateCalibration.importFailure"
          />}
          isImportSuccess={isImportSuccess}
          closeImportPopup={closeImportPopup}
        /> : ''
      }
      <TutorialCenterContainer
        isShowTutorialCenter={isShowTutorialCenter}
        intl={intl}
        vm={vm}
        onUpdateProjectTitle={onUpdateProjectTitle}
        toCloseCodePane={toCloseCodePane}
      />
      {
        isMagicianLitAralm ? <AlarmContainer vm={vm} /> : ''
      }
    </Box>
  );
};

GUIComponent.propTypes = {
  accountNavOpen: PropTypes.bool,
  activeTabIndex: PropTypes.number,
  arduinoCTabVisible: PropTypes.bool, // can be false
  arduinoCardVisible: PropTypes.bool,
  authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // can be false
  authorThumbnailUrl: PropTypes.string,
  authorUsername: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  backdropLibraryVisible: PropTypes.bool,
  backpackHost: PropTypes.string,
  backpackVisible: PropTypes.bool,
  basePath: PropTypes.string,
  blocksTabVisible: PropTypes.bool,
  canCreateCopy: PropTypes.bool,
  canCreateNew: PropTypes.bool,
  canEditTitle: PropTypes.bool,
  canRemix: PropTypes.bool,
  canSave: PropTypes.bool,
  canShare: PropTypes.bool,
  //   cardsVisible: PropTypes.bool,
  canUseCloud: PropTypes.bool,
  children: PropTypes.node,
  costumeLibraryVisible: PropTypes.bool,
  costumesTabVisible: PropTypes.bool,
  enableCommunity: PropTypes.bool,
  intl: intlShape.isRequired,
  isCreating: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  isPlayerOnly: PropTypes.bool,
  isRtl: PropTypes.bool,
  isShared: PropTypes.bool,
  isUpload: PropTypes.bool,
  loading: PropTypes.bool,
  onActivateCostumesTab: PropTypes.func,
  onActivateSoundsTab: PropTypes.func,
  onActivateTab: PropTypes.func,
  onClickAccountNav: PropTypes.func,
  onClickLogo: PropTypes.func,
  onCloseAccountNav: PropTypes.func,
  onCloseHelpAlert: PropTypes.func,
  onExtensionButtonClick: PropTypes.func,
  onLogOut: PropTypes.func,
  onOpenRegistration: PropTypes.func,
  onRequestCloseBackdropLibrary: PropTypes.func,
  onRequestCloseCostumeLibrary: PropTypes.func,
  onRequestCloseTelemetryModal: PropTypes.func,
  onSeeCommunity: PropTypes.func,
  onSeleceTargetTab: PropTypes.func,
  onShare: PropTypes.func,
  onTabSelect: PropTypes.func,
  onTelemetryModalCancel: PropTypes.func,
  onTelemetryModalOptIn: PropTypes.func,
  onTelemetryModalOptOut: PropTypes.func,
  onToggleLoginOpen: PropTypes.func,
  onUpdateProjectTitle: PropTypes.func,
  renderLogin: PropTypes.func,
  showComingSoon: PropTypes.bool,
  showUpdateAlert: PropTypes.bool,
  soundsTabVisible: PropTypes.bool,
  stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
  targetIsStage: PropTypes.bool,
  targetTab: PropTypes.string,
  telemetryModalVisible: PropTypes.bool,
  tipsLibraryVisible: PropTypes.bool,
  vm: PropTypes.instanceOf(VM).isRequired,
  isShowUpdate: PropTypes.bool,
  onChangeIsAnupdate: PropTypes.func,
  onChangeIsCheck: PropTypes.func,
  onChangeIsNewest: PropTypes.func,
  updateInfo: PropTypes.object,
  onChangeisAutoUpdate: PropTypes.func,
  isAutoUpdate: PropTypes.bool,
  firmwareUpdateInfo: PropTypes.object,
  oldFirmwaReversion: PropTypes.object,
  autoCheckFirmwareUpdate: PropTypes.func,
  isShowCalibration: PropTypes.bool,
  closeCalibration: PropTypes.func,
  calibrationSetPTPCmd: PropTypes.func,
  showTutorialCenter: PropTypes.func
};
GUIComponent.defaultProps = {
  backpackHost: null,
  backpackVisible: false,
  basePath: './',
  canCreateNew: false,
  canEditTitle: false,
  canRemix: false,
  canSave: false,
  canCreateCopy: false,
  canShare: false,
  canUseCloud: false,
  enableCommunity: false,
  isCreating: false,
  isShared: false,
  loading: false,
  onUpdateProjectTitle: () => { },
  showComingSoon: false,
  stageSizeMode: STAGE_SIZE_MODES.large
};

const mapStateToProps = state => ({
  // This is the button's mode, as opposed to the actual current state
  stageSizeMode: state.scratchGui.stageSize.stageSize
});

export default injectIntl(connect(
  mapStateToProps
)(GUIComponent));
