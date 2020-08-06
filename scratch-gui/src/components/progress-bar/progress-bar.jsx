import React from 'react';
import PropTypes from 'prop-types';
import style from './progress-bar.css';
import { FormattedMessage } from 'react-intl';
const ProgressBar = ({ progress, type }) => (
  <div className={style.progressBar}>
    {progress > 0 && <div className={style.progressOutline}>
      <span
        className={style.progressInline}
        style={{
          width: `${progress}%`
        }}
      >{`${progress}%`}</span>
    </div>}
    {progress === 0 && <span>{type === 'controlPane' ?
      <FormattedMessage
        defaultMessage="Click upload icon to choose port"
        description="Click upload icon to choose port"
        id="gui.spriteSelector.choosePortTip"
      /> :
      <FormattedMessage
        defaultMessage="Waiting for upload"
        description="Waiting for upload"
        id="gui.spriteSelector.waitingUpload"
      />}</span>}
    {progress === -1 && <span><FormattedMessage
      defaultMessage="Upload Successfully!"
      description="Upload Successfully"
      id="gui.spriteSelector.UploadSuccessfully"
    /></span>}
    {progress === -2 && <span><FormattedMessage
      defaultMessage="Upload Failed!"
      description="Upload FailedFailed"
      id="gui.spriteSelector.UploadFailed"
    /></span>}
  </div>
);

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  type: PropTypes.string
};

const ControllerProgressBar = ({ progress, isClickUpload }) => (
  <div className={style.progressBar}>
    {progress === 0 && <span>{isClickUpload ?
      <FormattedMessage
        defaultMessage="Uploading"
        description="Uploading"
        id="gui.connection.deviceUploading"
      /> :
      <FormattedMessage
        defaultMessage="Waiting for upload"
        description="Waiting for upload"
        id="gui.spriteSelector.waitingUpload"
      />}</span>}
    {progress === -1 && <span><FormattedMessage
      defaultMessage="Upload Successfully!"
      description="Upload Successfully"
      id="gui.spriteSelector.UploadSuccessfully"
    /></span>}
    {progress === -2 && <span><FormattedMessage
      defaultMessage="Upload Failed!"
      description="Upload FailedFailed"
      id="gui.spriteSelector.UploadFailed"
    /></span>}
  </div>
);

ControllerProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  isClickUpload: PropTypes.bool
};

const AIProgressBar = props => (
  <div className={style.mask}>
    <div className={style.barWarp}>
      <p className={style.text}> {props.text}</p>
      <div
        className={style.inside}
      />
    </div>
  </div>
);

AIProgressBar.propTypes = {
  text: PropTypes.object.isRequired
};

const AISavePopup = () => (
  <div className={style.mask}>
    <div className={style.popupWarp}>
      <FormattedMessage
        defaultMessage="Saved successfully"
        description="Saved successfully"
        id="gui.ardino.card.SavedSuccessfully"
      />
    </div>
  </div>
);

export {
  ProgressBar,
  AIProgressBar,
  AISavePopup,
  ControllerProgressBar
};
