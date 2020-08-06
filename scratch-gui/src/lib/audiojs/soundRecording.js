require('./WebAudioRecorder.min');
import { store } from '../app-state-hoc';
import {
  changeIsRecordingFinish,
  changeIsRecordingBtnDisable,
  changeIsRecording,
  setRecogingTime
} from '../../reducers/voiceRecognition';
const { dispatch } = store;


class SoundRecord {
  constructor(){
    this.gumStream = null; // stream from getUserMedia()
    this.recorder = null; // WebAudioRecorder object
    this.input = null; // MediaStreamAudioSourceNode  we'll be recording
    this.analyser = null;
    this.timeId = null;
    this.encodingType = 'wav'; // holds selected encoding for resulting audio (file)
    this.encodeAfterRecord = false; // when to encode
    this.audioContext = null; // new audio context to help us record
    this.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.video = document.createElement('video');
    this.canvas = document.createElement('canvas');
    this.timer = null;
  }
  // 获取录音设备头列表
  getCameraList = () => new Promise(resolve => {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        resolve(devices.filter(device => device.kind === 'audioinput').map(device => [device.label, device.deviceId]));
      })
      .catch(e => {
        console.error(e);
      });
  });
  // 获取USB录音设备
  usbAudio = arr => {
    for (let i = 0; i < arr.length; i++){
      const item = arr[i];
      for (let j = 0; j < item.length; j++){
        if (item[j].toLowerCase().includes('usb')){
          return item[1];
        }
      }
    }
  };

  
  startRecording = (time = 60, countDownNum = false, canvas = this.canvas) => {
    clearTimeout(this.timeId);
    if (this.timer){
      clearInterval(this.timer);
    }
    return new Promise(resolve => {
      const constraints = {
        audio: true,
        video: false
      };
      this.getCameraList().then(res => {
        const usbAudioId = this.usbAudio(res);
        if (usbAudioId){
          constraints.audio = { deviceId: { exact: usbAudioId } };
        }

        this.audioContext = new AudioContext({ sampleRate: 16000 });
  
        const distortion = this.audioContext.createWaveShaper();
        const gainNode = this.audioContext.createGain();
        const biquadFilter = this.audioContext.createBiquadFilter();
        const convolver = this.audioContext.createConvolver();
        // 绘制波纹图配置
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.minDecibels = -90;
        this.analyser.maxDecibels = -10;
        this.analyser.smoothingTimeConstant = 0.85;

        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
          if (countDownNum){
            // 倒计时
            this.timer = setInterval(() => {
              countDownNum--;
              dispatch(setRecogingTime(countDownNum));
         
              if (countDownNum < 1){
                // 自动录音结束
                dispatch(changeIsRecordingFinish(true));
                clearInterval(this.timer);
  
              }
            }, 1000);
          }
          this.gumStream = stream;
          this.input = this.audioContext.createMediaStreamSource(stream);
    
          // 波纹图连接音频分析等配置配置
          this.input.connect(distortion);
          distortion.connect(biquadFilter);
          biquadFilter.connect(gainNode);
          convolver.connect(gainNode);
          gainNode.connect(this.analyser);
          // analyser.connect(audioContext.destination); 连接扬声器
          this.drawSine(canvas);
    
          // eslint-disable-next-line no-undef
          this.recorder = new WebAudioRecorder(this.input, {
            workerDir: `./blockjs/`, // must end with slash
            encoding: this.encodingType,
            numChannels: 1, // 2 is the default, mp3 encoding supports only 2
            onEncoderLoading: (rec, encoding) => {
              // show "loading encoder..." display
            },
            onEncoderLoaded: (rec, encoding) => {
              // hide "loading encoder..." display
              this.timeId = setTimeout(() => {
                const { isRecording } = store.getState().scratchGui.voiceRecognition;
                // eslint-disable-next-line no-use-before-define
                this.stopRecording();
                dispatch(changeIsRecordingFinish(true));
                dispatch(changeIsRecordingBtnDisable(true));
                dispatch(changeIsRecording(!isRecording));
              }, time * 1000);
            }
          });
      
          this.recorder.onComplete = (rec, blob) => {
            window.storeAICollection.recordDict = blob;
            resolve(blob);
          };
      
          this.recorder.setOptions({
            timeLimit: 120,
            encodeAfterRecord: this.encodeAfterRecord,
            ogg: { quality: 0.0 },
            mp3: { bitRate: 64 }
          });
          
          // start the recording process
          this.recorder.startRecording();
        })
          .catch(err => {
            console.log(err);
          });
      });
    });
  };

  // canvas背景初始化
  initCanvasBg = canvas => {
    this.canvas = canvas;
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.fillStyle = 'rgb(200,200,200)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  };
  
  // 绘制正弦图
  drawSine = (canvas = this.canvas) => {
    this.analyser.fftSize = 2048;
    const bufferLength = this.analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  
    const draw = () => {
  
      requestAnimationFrame(draw);
  
      this.analyser.getByteTimeDomainData(dataArray);
      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
  
      canvasCtx.beginPath();
  
      const sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;
  
      for (let i = 0; i < bufferLength; i++) {
  
        const v = dataArray[i] / 128.0;
        const y = v * HEIGHT / 2;
  
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
  
        x += sliceWidth;
      }
  
      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };
    draw();
  };
  
  // 播放录音
  playRecord = (blob, canvas = this.canvas) => new Promise(resolve => {
    const audio = document.createElement('audio');
    const recordSrc = window.URL.createObjectURL(blob);
    audio.src = recordSrc;
  
    // 播放时显示正弦图配置
    const playAudioContext = new AudioContext();
    const gainNode = playAudioContext.createGain();
    gainNode.gain.value = 1;
    const mediaElementSource = playAudioContext.createMediaElementSource(audio);
    const playAnalyser = playAudioContext.createAnalyser();
    mediaElementSource.connect(playAnalyser);
    mediaElementSource.connect(gainNode);
    gainNode.connect(playAudioContext.destination);
  
    playAnalyser.fftSize = 2048;
    const bufferLength = playAnalyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
  
    // 播放时绘制正弦图
    this.drawSine(canvas, playAnalyser, dataArray, bufferLength);
    playAudioContext.destination.context.resume();
    audio.play();
    audio.onended = resolve;
  });

  stopRecording = () => {
    clearTimeout(this.timeId);
    // stop microphone accessz
    if (this.gumStream){
      this.gumStream.getAudioTracks()[0].stop();
    }
    if (this.recorder){
      this.recorder.finishRecording();
    }
    // tell the recorder to finish the recording (stop recording + encode the recorded audio)
   
  };

 recordAudio = (time, index) => this.startRecording(time, index);
}

export const soundRecord = new SoundRecord();
