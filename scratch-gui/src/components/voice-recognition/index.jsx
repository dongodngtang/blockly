import React from 'react';
import { FormattedMessage } from 'react-intl';

import closeIcon from './icon--close.svg';
import PropTypes from 'prop-types';

import Draggable from 'react-draggable';
import styles from './index.css';
import Loading from './loading';

const recoMessage = (<FormattedMessage
  defaultMessage="Speech recognition"
  id="gui.ardino.card.voice-recogintion"
/>);
const selectLanguageMessage = (<FormattedMessage
  defaultMessage="Please select a language: "
  id="gui.ardino.card.select-language"
/>);
const closeMessage = (<FormattedMessage
  defaultMessage="Close"
  description="Title for button to close how-to card"
  id="gui.cards.close"
/>);
const startRecordingMessage = (<FormattedMessage
  defaultMessage="Start recording"
  id="gui.ardino.card.start-recording"
/>);
const stopRecrdingMessage = (<FormattedMessage
  defaultMessage="Stop recording"
  id="gui.ardino.card.stop-recording"
/>);
const playRecrdingMessage = (<FormattedMessage
  defaultMessage="Play recording"
  id="gui.ardino.card.play-recording"
/>);
const recrdingEndedMessage = (<FormattedMessage
  defaultMessage="Recording ended"
  id="gui.ardino.card.recording-ended"
/>);
const recrdingMessage = (<FormattedMessage
  defaultMessage="Recording"
  id="gui.ardino.card.recording"
/>);
const speechRecognitionMessage = (<FormattedMessage
  defaultMessage="Recognition result"
  id="gui.ardino.card.Speech-recognition"
/>);

const CardHeader = ({ closePopup, isAutoOpen }) => (
  <div className={styles.headerButtons}>
    <div
      className={styles.allButton}
    >
      {recoMessage}
    </div>
    <button
      className={styles.removeButton}
      onClick={closePopup}
    >
      {closeMessage}
      <img
        className={styles.closeIcon}
        src={closeIcon}
      />
    </button>
  </div>
);

// eslint-disable-next-line react/display-name
const VoiceRecogition = React.forwardRef((props, canRef) => {
  const {
    isRecording,
    isShoWPlayBtn,
    toggleRecording,
    closePopup,
    playRecording,
    recognitionContent,
    isAutoOpen,
    recogingTime,
    isManualVoice,
    choiselanguages,
    onDrag,
    onStartDrag,
    onEndDrag,
    isRecordingBtnDisable,
    x,
    y,
    isRecordingFinish,
    isShowLoading
  } = props;
  return (
    <Draggable
      cancel="input,button,canvas,svg,select"
      onDrag={onDrag}
      onStart={onStartDrag}
      onStop={onEndDrag}
      position={{ x: x, y: y }}
    >
      <div style={{ position: 'absolute', zIndex: '6000' }}>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <CardHeader
              closePopup={closePopup}
              isAutoOpen={isAutoOpen}
            />

            <div
              className={styles.cardBody}
            >
              <div className={styles.cardContainer}>
                <canvas
                  width="350"
                  height="84"
                  ref={canRef}
                />
                <div className={styles.operation}>
                  <label style={{ display: isManualVoice || isAutoOpen ? 'none' : 'block' }}>
                    {selectLanguageMessage}
                    <select
                      name="Languages"
                      id="Languages"
                      onChange={choiselanguages}
                      defaultValue={navigator.language === 'zh-CN' ? 'ZH' : 'EN'}
                    >
                      <option value="ZH">{'中文'}</option>
                      <option value="EN">{'English'}</option>
                    </select>
                  </label>
                  <button
                    style={{ display: isAutoOpen ? 'none' : 'block' }}
                    className={styles.btnRecording}
                    onClick={toggleRecording}
                    disabled={isRecordingBtnDisable}
                  >{isRecording ? stopRecrdingMessage : startRecordingMessage}</button>
                  <button
                    className={styles.palyRecording}
                    onClick={playRecording}
                    style={{ display: isShoWPlayBtn ? 'block' : 'none' }}
                  >{playRecrdingMessage}</button>
                  <p
                    className={styles.recording}
                    style={{ display: isAutoOpen ? 'block' : 'none' }}
                  >
                    {recogingTime < 1 ? recrdingEndedMessage : recrdingMessage}
                    {recogingTime < 1 ? '' : `${recogingTime} s `}
                  </p>
                </div>
              
                <div
                  className={styles.recordingText}
                  style={{ display: isRecordingFinish ? 'block' : 'none' }}
                >
                  {
                    isShowLoading ? <Loading /> : <span>{speechRecognitionMessage} {recognitionContent}</span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
});

CardHeader.propTypes = {
  closePopup: PropTypes.func,
  isAutoOpen: PropTypes.bool
};

VoiceRecogition.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  isRecording: PropTypes.bool,
  isShoWPlayBtn: PropTypes.bool,
  toggleRecording: PropTypes.func,
  closePopup: PropTypes.func,
  playRecording: PropTypes.func,
  recognitionContent: PropTypes.string,
  isAutoOpen: PropTypes.bool,
  recogingTime: PropTypes.any,
  isManualVoice: PropTypes.bool,
  choiselanguages: PropTypes.func,
  onDrag: PropTypes.func,
  onEndDrag: PropTypes.func,
  onStartDrag: PropTypes.func,
  isRecordingFinish: PropTypes.bool,
  isRecordingBtnDisable: PropTypes.bool,
  isShowLoading: PropTypes.bool
};

export default VoiceRecogition;
