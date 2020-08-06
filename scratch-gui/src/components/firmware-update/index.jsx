import React from 'react';
import { FormattedMessage } from 'react-intl';

import closeIcon from './image/icon--close.svg';
import PropTypes from 'prop-types';

import magician from './image/magician.png';
import magicianlite from './image/magician_lite.png';
import controller from './image/controller.png';
import infoIcon from './image/warning-b.png';
import warningIcon from './image/warning-y.png';
import successIcon from './image/chenggong.png';

import styles from './index.css';

const closeMessage = (<FormattedMessage
  defaultMessage="Close"
  description="Title for button to close how-to card"
  id="gui.cards.close"
/>);
const firmwareUpdateTip = (<FormattedMessage
  defaultMessage="Firmware update tips"
  id="gui.updated.FirmwareUpdateTip"
/>);

const currentVersion = (<FormattedMessage
  defaultMessage="Current Version: "
  id="gui.updated.CurrentVersion"
/>);
const newVersion = (<FormattedMessage
  defaultMessage="New version: "
  id="gui.updated.NewVersion"
/>);
const releaseDate = (<FormattedMessage
  defaultMessage="Release date: "
  id="gui.updated.ReleaseDate"
/>);
const updateContent = (<FormattedMessage
  defaultMessage="update content: "
  id="gui.updated.UpdateContent"
/>);
const inInspection = (<FormattedMessage
  defaultMessage="In inspection..."
  id="gui.updated.InInspection"
/>);
const displayName = {
  magician: 'Magician',
  magicianLite: 'Magician Lite',
  controller: 'Magic Box'
};
const isLatest = (extensionId, version) => (<p style={{ margin: 0 }}>
  <FormattedMessage
    defaultMessage="Current "
    id="gui.updated.Current"
  /> {displayName[extensionId]} <FormattedMessage
    id="gui.updated.IsLatest"
  /> {version}
  <p>
    <FormattedMessage
      defaultMessage="The current firmware is up-to-date, no need to update"
      id="gui.updated.Noupdate"
    />
  </p>
</p>
);

const needUpdate = (extensionId, oldVersion, newestVersion) => (<p style={{ margin: 0 }}>
  <FormattedMessage
    defaultMessage="Current "
    id="gui.updated.Current"
  /> {displayName[extensionId]} <FormattedMessage
    id="gui.updated.IsLatest"
  /> {oldVersion}  <FormattedMessage
    id="gui.updated.NeedUpdate"
  />{newestVersion}
</p>
);

const gotoStudio = (<FormattedMessage
  defaultMessage="For updates, use up to date DobotStudio to upgrade."
  id="gui.updated.GotoStudio"
/>);
const gotoDownload = (<FormattedMessage
  defaultMessage="Click here to download"
  id="gui.updated.GotoDownload"
/>);

const error = (<FormattedMessage
  defaultMessage="Network anomalies, please try again later!"
  id="gui.updated.Error"
/>);
const ignoreThisUpdate = (<FormattedMessage
  defaultMessage="Ignore this update"
  id="gui.updated.IgnoreThisUpdate"
/>);

const CardHeader = props => (
  <div className={styles.headerButtons}>
    <div className={styles.title}>
      {firmwareUpdateTip}
    </div>
    <button
      className={styles.removeButton}
      onClick={props.closeFirmwareUpdate}
    >
      {closeMessage}
      <img
        className={styles.closeIcon}
        src={closeIcon}
      />
    </button>
  </div>
);

const UpdateInfo = props => {
  const { firmwareUpdateInfo, oldFirmwaReversion } = props;
  let imgSrc = magician;
  let oldVersionTime;
  if (firmwareUpdateInfo.history){
    for (const key in firmwareUpdateInfo.history){
      if (key === oldFirmwaReversion.version){
        oldVersionTime = firmwareUpdateInfo.history[key];
      }
    }
  }

  if (oldFirmwaReversion.name === 'magician'){
    imgSrc = magician;
  } else if (oldFirmwaReversion.name === 'magicianlite'){
    imgSrc = magicianlite;
  } else if (oldFirmwaReversion.name === 'controller'){
    imgSrc = controller;
  }

  return (
    <div className={styles.body}>
      <div className={styles.bodyTop}>
        <div className={styles.deviceImg}>
          <img src={imgSrc} />
          <p>{oldFirmwaReversion.portName}</p>
        </div>
        
        <div className={styles.versionInfoContainer}>
          <div className={styles.versionInfo}>
            <p>
              <span>{currentVersion}</span>
              <span>{oldFirmwaReversion.version}</span>
            </p>
            <p>
              <span>{newVersion}</span>
              <span>{firmwareUpdateInfo.version}</span>
            </p>
          </div>
          <div className={styles.versionInfo}>
            
            <p>
              <span>{releaseDate}</span>
              <span>{oldVersionTime}</span>
            </p>
            <p>
              <span>{releaseDate}</span>
              <span>{firmwareUpdateInfo.time}</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.bodyMiddle}>
        <div className={styles.updateTitle}>
          <img
            src={infoIcon}
            alt=""
            srcSet=""
          />
          <span>{updateContent}</span>
        </div>
        <div className={styles.updateContent}>
          <ul>
            {
              firmwareUpdateInfo.updateContent &&
                  firmwareUpdateInfo.updateContent.map((item, index) => <li key={index}>{item}</li>)
            }
          </ul>
        </div>
      </div>
    </div>
  );
};


const CheckUpdate = props => {
  const { isFirmwareCheck, isFirmwareNewest, extensionId, oldFirmwaReversion } = props;
  return (
    <div className={styles.newestBody} >
      <div className={styles.newestTips}>
        <img
          src={isFirmwareNewest ? successIcon : warningIcon}
          alt=""
          style={{ display: isFirmwareCheck ? 'none' : 'block' }}
        />
        <p className={styles.tips}> {isFirmwareCheck ? inInspection :
          isFirmwareNewest ? isLatest(extensionId, oldFirmwaReversion.version) : error}</p>
      </div>
    </div>
  );
};

const FirmwareUpdate = props => {
  const {
    hideFirmwareUpdate,
    isAnFirmwareUpdate,
    isFirmwareCheck,
    isFirmwareNewest,
    updateBtn,
    firmwareUpdateInfo,
    oldFirmwaReversion,
    extensionId
  } = props;
  return (
    <div className={styles.firmwareMask}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <CardHeader
            closeFirmwareUpdate={hideFirmwareUpdate}
          />
          {
            isAnFirmwareUpdate ? <UpdateInfo
              firmwareUpdateInfo={firmwareUpdateInfo}
              oldFirmwaReversion={oldFirmwaReversion}
              extensionId={extensionId}
            /> : <CheckUpdate
              extensionId={extensionId}
              isFirmwareCheck={isFirmwareCheck}
              isFirmwareNewest={isFirmwareNewest}
              oldFirmwaReversion={oldFirmwaReversion}
            />
          }
          <div className={styles.updateFoot}>
            <div className={styles.btnContainer}>
              {
                isAnFirmwareUpdate ? (
                  <div>
                    {needUpdate(extensionId, oldFirmwaReversion.version, firmwareUpdateInfo.version)}
                    <p>
                      {gotoStudio}
                      <a
                        href="https://cn.dobot.cc/downloadcenter.html"
                        rel="noopener noreferrer"
                        target="_blank"
                      >{gotoDownload}
                      </a>
                    </p>
                  </div>) :
                  (<button
                    className={styles.updateBtn}
                    onClick={updateBtn}
                  >
                    <FormattedMessage
                      defaultMessage="OK"
                      id="gui.prompt.ok"
                    />
                  </button>)
                
              }
              <span
                className={styles.ignore}
                onClick={props.hideFirmwareUpdate}
                style={{ visibility: 'hidden' }}
              >{ignoreThisUpdate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateInfo.propTypes = {
  firmwareUpdateInfo: PropTypes.object,
  oldFirmwaReversion: PropTypes.object
};

CardHeader.propTypes = {
  closeFirmwareUpdate: PropTypes.func
};

CheckUpdate.propTypes = {
  isFirmwareCheck: PropTypes.bool,
  isFirmwareNewest: PropTypes.bool,
  oldFirmwaReversion: PropTypes.object,
  extensionId: PropTypes.string
};

FirmwareUpdate.propTypes = {
  hideFirmwareUpdate: PropTypes.func,
  isAnFirmwareUpdate: PropTypes.bool,
  isFirmwareCheck: PropTypes.bool,
  isFirmwareNewest: PropTypes.bool,
  updateBtn: PropTypes.func,
  firmwareUpdateInfo: PropTypes.object,
  oldFirmwaReversion: PropTypes.object,
  extensionId: PropTypes.string
};

export default FirmwareUpdate;
