import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

import closeIcon from './image/icon--close.svg';
import PropTypes from 'prop-types';
import * as pkg from '../../../package.json';

import magicican from './image/magician.png';
import infoIcon from './image/warning-b.png';
import warningIcon from './image/warning-y.png';
import successIcon from './image/chenggong.png';
import { RadioInput } from '../customInput';

import styles from './index.css';

const closeMessage = (<FormattedMessage
  defaultMessage="Close"
  description="Title for button to close how-to card"
  id="gui.cards.close"
/>);
const checkupdate = (<FormattedMessage
  defaultMessage="Firmware update tips"
  id="gui.menuBar.checkupdate"
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
const versionIsLatest = (<FormattedMessage
  defaultMessage="The current version is already the latest version."
  id="gui.updated.VersionIsLatest"
/>);

const error = (<FormattedMessage
  defaultMessage="Network anomalies, please try again later!"
  id="gui.updated.Error"
/>);
const ignoreThisUpdate = (<FormattedMessage
  defaultMessage="Ignore this update"
  id="gui.updated.IgnoreThisUpdate"
/>);
const startupdate = (<FormattedMessage
  defaultMessage="Start Update"
  id="gui.updated.Startupdate"
/>);
const autoCheckAndUpdate = (<FormattedMessage
  defaultMessage="Automatically check for updates and downloads"
  id="gui.updated.AutoCheckAndUpdate"
/>);
const ok = (<FormattedMessage
  defaultMessage="OK"
  id="gui.prompt.ok"
/>);

const CardHeader = props => (
  <div className={styles.headerButtons}>
    <div className={styles.title}>
      {checkupdate}
    </div>
    <button
      className={styles.removeButton}
      onClick={props.closeUpdate}
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
  const { updateInfo } = props;
  let oldVersionTime;
  if (updateInfo.history){
    for (const key in updateInfo.history){
      if (key === pkg.version){
        oldVersionTime = updateInfo.history[key];
      }
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.bodyTop}>
        <img src={magicican} />
        <div className={styles.versionInfoContainer}>
          <div className={styles.versionInfo}>
            <p>
              <span>{currentVersion}</span>
              <span>{ pkg.version}</span>
            </p>
            <p>
              <span>{newVersion}</span>
              <span>{updateInfo.version}</span>
            </p>
          </div>
          <div className={styles.versionInfo}>
            
            <p>
              <span>{releaseDate}</span>
              <span>{oldVersionTime}</span>
            </p>
            <p>
              <span>{releaseDate}</span>
              <span>{updateInfo.time}</span>
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
              updateInfo.updateContent && updateInfo.updateContent.map((item, index) => <li key={index}>{item}</li>)
            }
          </ul>
        </div>
      </div>
    </div>
  );
};


const CheckUpdate = props => {
  const { isCheck, isNewest } = props;
  return (
    <div className={styles.newestBody} >
      <p>
        <span>{currentVersion}</span>
        <span>{pkg.version}</span>
      </p>
      <div className={styles.newestTips}>
        <img
          src={isNewest ? successIcon : warningIcon}
          alt=""
          style={{ display: isCheck ? 'none' : 'block' }}
        />
        <p> {isCheck ? inInspection : isNewest ? versionIsLatest : error}</p>
      </div>
    </div>
  );
};

const VersionUpdate = props => {
  const {
    hideUpdate,
    isAnUpdate,
    isCheck,
    isNewest,
    updateBtn,
    updateInfo,
    isAutoUpdate,
    changeAutoUpdate
  } = props;
  return (
    <div className={styles.versionMask}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <CardHeader
            closeUpdate={hideUpdate}
          />
          {
            isAnUpdate ? <UpdateInfo updateInfo={updateInfo} /> : <CheckUpdate
              isCheck={isCheck}
              isNewest={isNewest}
            />
          }
          <div className={styles.updateFoot}>
            <div className={styles.ipt}>
              <RadioInput
                isChecked={isAutoUpdate}
                onClickFunc={changeAutoUpdate}
              />
              {autoCheckAndUpdate}
            </div>
            <div className={styles.btnContainer}>
              <button
                className={styles.updateBtn}
                onClick={updateBtn}
              >{isAnUpdate ? startupdate : ok}</button>
              <span
                className={styles.ignore}
                onClick={props.closeUpdate}
                style={{ visibility: isAnUpdate ? 'visible' : 'hidden' }}
              >{ignoreThisUpdate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateInfo.propTypes = {
  updateInfo: PropTypes.object
};

CardHeader.propTypes = {
  closeUpdate: PropTypes.func
};

CheckUpdate.propTypes = {
  isCheck: PropTypes.bool,
  isNewest: PropTypes.bool
};

VersionUpdate.propTypes = {
  hideUpdate: PropTypes.func,
  isAnUpdate: PropTypes.bool,
  isCheck: PropTypes.bool,
  isNewest: PropTypes.bool,
  updateBtn: PropTypes.func,
  updateInfo: PropTypes.object,
  closeUpdate: PropTypes.func,
  isAutoUpdate: PropTypes.bool,
  changeAutoUpdate: PropTypes.func
};

export default VersionUpdate;
