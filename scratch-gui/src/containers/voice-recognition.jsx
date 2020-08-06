import React, { Fragment } from 'react';
import VoiceRecognition from '../components/voice-recognition';
import { connect } from 'react-redux';
import {
  closeSpeechRecognition,
  openAutoRecogition,
  closeAutoRecognition
} from '../reducers/modals';
import {
  changeIsShowLoading,
  setRecognitionContent,
  changeIsRecordingFinish,
  changeLanguages,
  changeIsManualVoice,
  changeIsRecordingBtnDisable,
  changeIsRecording
} from '../reducers/voiceRecognition';
import {
  manualFinish,
  closeAutoReacoging
} from '../lib/events';
import PropTypes from 'prop-types';
import { soundRecord } from '../lib/audiojs/soundRecording';
import { SentenceRecognitionZH, SentenceRecognitionEN } from '../lib/audiojs/SentenceRecognition';

const showWidth = 400;
const initPos = {
  x: (window.innerWidth - showWidth) / 2,
  y: window.innerHeight / 4
};

class VoiceRecognitionContainer extends React.Component {
  constructor(props){
    super(props);
    this.canRef = React.createRef();
  }

  state = {
    x: initPos.x,
    y: initPos.y,
    isShoWPlayBtn: false,
    draging: false
  }
  
  componentDidMount() {
    this.canvasNode = this.canRef.current;
    // 初始化 将canvas传入保存
    soundRecord.initCanvasBg(this.canvasNode);
  }
  init = callback => {
    callback();
  }

  handleVoiceResult = text => {
    window.recognitionContent = text;
    this.props.handleChangeIsShowLoading(false);
    this.props.handleSetRecognitionContent(text);
    this.props.handleChangeIsRecordingBtnDisable(false);
    document.dispatchEvent(manualFinish);
  }
  // 开始或停止录音
  toggleRecording = () => {
    const isRecordingStatus = this.props.isRecording;
    const languages = this.props.languages;
    if (isRecordingStatus){
      // 停止录音
      soundRecord.stopRecording();
      this.props.handleChangeIsRecordingFinish(true);
      this.props.handleChangeIsRecordingBtnDisable(true);
    } else {
      // 开始录音  手动录音默认60s
      this.props.handleChangeIsShowLoading(true);
      this.props.handleSetRecognitionContent('');
      this.props.handleChangeIsRecordingFinish(false);
      this.setState({
        isShoWPlayBtn: false
      });
      soundRecord.startRecording(60, this.canvasNode).then(blob => {
        // 保存录音
        window.voice = blob;
        // 语音识别
        let SentenceRecognition;
        if (languages === 'ZH'){
          SentenceRecognition = SentenceRecognitionZH;
        } else if (languages === 'EN'){
          SentenceRecognition = SentenceRecognitionEN;
        }
        SentenceRecognition().then(text => {
          window.recognitionContent = text;
          this.handleVoiceResult(text);
            
        });
        this.setState({
          isShoWPlayBtn: true
        });
      });
      // 绘制波纹图
      // soundRecord.visualize(this.canvasNode);
    }
    this.props.handleChangeIsRecording(!isRecordingStatus);
  }
  // 播放录音
  playRecording = () => {
    soundRecord.playRecord(window.voice, this.canvasNode);
  }

  // 关闭弹窗
  closePopup = () => {
    if (this.props.isRecording) soundRecord.stopRecording();
    this.props.handleCloseSpeechRecognition();
    this.props.handleCloseAutoRecognition();
    document.dispatchEvent(manualFinish);
    document.dispatchEvent(closeAutoReacoging);
    this.props.handleSetRecognitionContent('');
    this.props.handleChangeIsRecordingFinish(false);
    this.props.handleChangeIsManualVoice(false);
    this.props.handleChangeIsRecordingBtnDisable(false);
    this.props.handleChangeIsRecording(false);
    this.setState({
      recognitionContent: ''
    });
  }

  // 测试窗口语言选择
  choiselanguages = e => {
    this.props.handleChangeLanguages(e.target.value);
  }

  handleOnDrag = (e_, { x, y }) => {
    if (y < 40 || y > window.innerHeight - 40) return;
    if (x < 0 || x > window.innerWidth - showWidth) return;
    this.setState({
      x,
      y
    });
  }

  handleStartDrag = e_ => {
    if (e_.target.className.includes('header-buttons')) {
      this.setState({ dragging: true });
    } else {
      e_.preventDefault();
      e_.stopPropagation();
      return false;
    }
  };

  handleEndDrag = () => this.setState({ dragging: false });

  render = () => (
    <Fragment >
      <div
        style={{
          display: (this.props.isOpen ? 'block' : 'none')
        }}
      >
        <VoiceRecognition
          ref={this.canRef}
          {...this.state}
          isManualVoice={this.props.isManualVoice}
          isRecordingBtnDisable={this.props.isRecordingBtnDisable}
          isRecording={this.props.isRecording}
          languages={this.props.languages}
          isRecordingFinish={this.props.isRecordingFinish}
          recognitionContent={this.props.recognitionContent}
          isShowLoading={this.props.isShowLoading}
          toggleRecording={this.toggleRecording}
          closePopup={this.closePopup}
          playRecording={this.playRecording}
          isAutoOpen={this.props.isAutoOpen}
          recogingTime={this.props.recogingTime}
          choiselanguages={this.choiselanguages}
          onStartDrag={this.handleStartDrag}
          onDrag={this.handleOnDrag}
          onEndDrag={this.handleEndDrag}
        />
      </div>
    </Fragment>)
}
VoiceRecognitionContainer.propTypes = {
  isOpen: PropTypes.bool,
  isAutoOpen: PropTypes.bool,
  recogingTime: PropTypes.any,
  handleCloseSpeechRecognition: PropTypes.func,
  handleOpenSpeechRecognition: PropTypes.func,
  handleOpenAutoRecogition: PropTypes.func,
  handleCloseBackdropLibrary: PropTypes.func,
  handlesetRecogingTime: PropTypes.func,
  handleCloseAutoRecognition: PropTypes.func,
  handleChangeIsShowLoading: PropTypes.func,
  handleChangeIsRecordingFinish: PropTypes.func,
  handleSetRecognitionContent: PropTypes.func,
  handleChangeLanguages: PropTypes.func,
  handleChangeIsManualVoice: PropTypes.func,
  isShowLoading: PropTypes.bool,
  recognitionContent: PropTypes.any,
  isRecordingFinish: PropTypes.bool,
  isManualVoice: PropTypes.bool,
  languages: PropTypes.string,
  handleChangeIsRecordingBtnDisable: PropTypes.func,
  handleChangeIsRecording: PropTypes.func,
  isRecordingBtnDisable: PropTypes.bool,
  isRecording: PropTypes.bool
};
const mapStatesToProps = states => ({
  isOpen: states.scratchGui.modals.speech_recognition,
  isAutoOpen: states.scratchGui.modals.auto_recognition,
  recogingTime: states.scratchGui.voiceRecognition.recogingTime,
  isShowLoading: states.scratchGui.voiceRecognition.isShowLoading,
  recognitionContent: states.scratchGui.voiceRecognition.recognitionContent,
  isRecordingFinish: states.scratchGui.voiceRecognition.isRecordingFinish,
  languages: states.scratchGui.voiceRecognition.languages,
  isManualVoice: states.scratchGui.voiceRecognition.isManualVoice,
  isRecordingBtnDisable: states.scratchGui.voiceRecognition.isRecordingBtnDisable,
  isRecording: states.scratchGui.voiceRecognition.isRecording
});
const mapDispatchToProps = dispatch => ({
  handleCloseSpeechRecognition: () => dispatch(closeSpeechRecognition()),
  handleOpenAutoRecogition: () => dispatch(openAutoRecogition()),
  handleCloseAutoRecognition: () => dispatch(closeAutoRecognition()),
  handleChangeIsShowLoading: flag => dispatch(changeIsShowLoading(flag)),
  handleChangeIsRecordingFinish: flag => dispatch(changeIsRecordingFinish(flag)),
  handleSetRecognitionContent: text => dispatch(setRecognitionContent(text)),
  handleChangeLanguages: languages => dispatch(changeLanguages(languages)),
  handleChangeIsManualVoice: flag => dispatch(changeIsManualVoice(flag)),
  handleChangeIsRecordingBtnDisable: flag => dispatch(changeIsRecordingBtnDisable(flag)),
  handleChangeIsRecording: flag => dispatch(changeIsRecording(flag))
});
export default connect(mapStatesToProps, mapDispatchToProps)(VoiceRecognitionContainer);
