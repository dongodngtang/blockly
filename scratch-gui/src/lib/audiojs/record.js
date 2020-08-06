require('./WebAudioRecorder.min');
let gumStream; // stream from getUserMedia()
let recorder; // WebAudioRecorder object
let input; // MediaStreamAudioSourceNode  we'll be recording
const encodingType = 'wav'; // holds selected encoding for resulting audio (file)
const encodeAfterRecord = false; // when to encode

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext; // new audio context to help us record
export const startRecording = function (time, index) {
  return new Promise(resolve => {
    const constraints = {
      audio: true,
      video: false
    };
  
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      audioContext = new AudioContext({ sampleRate: 8000 });
      gumStream = stream;
      input = audioContext.createMediaStreamSource(stream);
      // eslint-disable-next-line no-undef
      recorder = new WebAudioRecorder(input, {
        workerDir: `./blockjs/`, // must end with slash
        encoding: encodingType,
        numChannels: 1, // 2 is the default, mp3 encoding supports only 2
        onEncoderLoading: function(rec, encoding) {
          // show "loading encoder..." display
          console.log(`Loading ${encoding} encoder...`);
        },
        onEncoderLoaded: function(rec, encoding) {
          // hide "loading encoder..." display
          console.log(`${encoding} encoder loaded`);
          setTimeout(() => {
            // eslint-disable-next-line no-use-before-define
            stopRecording();
          }, time * 1000);
        }
      });
  
      recorder.onComplete = function(rec, blob) {
        window.storeAICollection.recordDict[index] = blob;
        console.log('Encoding complete:', blob);
        resolve(blob);
      };
  
      recorder.setOptions({
        timeLimit: 120,
        encodeAfterRecord: encodeAfterRecord,
        ogg: { quality: 0.0 },
        mp3: { bitRate: 64 }
      });
  
      // start the recording process
      recorder.startRecording();
  
      console.log('Recording started');
  
    })
      .catch(err => {
        console.log(err);
      });
  });
  
};

export const playRecord = blob => new Promise(resolve => {
  const audio = document.createElement('audio');
  const recordSrc = window.URL.createObjectURL(blob);
  audio.src = recordSrc;
  audio.play();
  audio.onended = resolve;
});

export const stopRecording = function() {
  console.log('stopRecording() called');
  
  // stop microphone access
  gumStream.getAudioTracks()[0].stop();

  
  // tell the recorder to finish the recording (stop recording + encode the recorded audio)
  recorder.finishRecording();

  console.log('Recording stopped');
};

export const recordAudio = (time, index) => startRecording(time, index);
