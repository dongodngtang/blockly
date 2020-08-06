import getUserMedia from 'get-user-media-promise';

// Single Setup For All Video Streams used by the GUI
// While VideoProvider uses a private _singleSetup
// property to ensure that each instance of a VideoProvider
// use the same setup, this ensures that all instances
// of VideoProviders use a single stream. This way, closing a camera modal
// does not affect the video on the stage, and a program running and disabling
// video on the stage will not affect the camera modal's video.
const requestStack = [];
const requestVideoStream = videoDesc => {
  let streamPromise;
  if (requestStack.length === 0) {
    streamPromise = getUserMedia({
      audio: false,
      video: videoDesc
    });
    requestStack.push(streamPromise);
  } else if (requestStack.length > 0) {
    streamPromise = requestStack[0];
    requestStack.push(true);
  }
  return streamPromise;
};

const requestDisableVideo = () => {
  requestStack.pop();
  if (requestStack.length > 0) return false;
  return true;
};

export {
  requestVideoStream,
  requestDisableVideo
};
/** 以上是scratch 原有的, 需求满足不了才在下面写了自己的实现, 但为保持原有接口的调用保留了代码 */
class Camera {
  constructor() {
    this.constraint = { video: true, audio: false };
    this.stream = null;
    this.track = null;
    this.video = document.createElement('video');
    this.canvas = document.createElement('canvas');
    // 用于选择摄像头积木
    this.cameraList = [];
  }
  // 获取摄像头列表
  getCameraList = () => new Promise(resolve => {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const cameraList = devices.filter(device => device.kind === 'videoinput')
          .map(device => [device.label, device.deviceId]);
        this.cameraList = cameraList;
        resolve(cameraList);
      })
      .catch(e => {
        console.error(e);
      });
  });
  // 根据视频生成对应的截图,  isSmallSize 是为了缩小图片体积, 人脸识别云端请求对图片大小有限制
  captureImageGenerator = (video = this.video, isSmallSize) => {
    if (video){
      const bestHeight = isSmallSize ? video.videoHeight / 5 : video.videoHeight;
      const bestWidth = isSmallSize ? video.videoWidth / 5 : video.videoWidth;
      this.canvas.height = bestHeight;
      this.canvas.width = bestWidth;
      this.canvas.getContext('2d').drawImage(video, 0, 0, bestWidth, bestHeight);
      const imgBase64 = this.canvas.toDataURL('image/jpeg');
      return imgBase64;
    }
   
  };
  stop = () => {
    if (this.track) {
      this.track.stop();
    }
  }
  // 请求视频流并自动播放
  requestStream(constraint = this.constraint, video = this.video) {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia(constraint)
        .then(stream => {
          const newTrack = stream.getVideoTracks()[0];
          if (this.stream) {
            this.stream.removeTrack(this.track);
            this.stream.addTrack(newTrack);
          } else {
            this.stream = stream;
          }
          this.track = newTrack;
          const cameraSettings = this.track.getSettings();
          if (video === this.video) {
            video.height = cameraSettings.height;
            video.width = cameraSettings.width;
          }
          video.srcObject = this.stream;
          video.onloadedmetadata = () => {
            video.play();
            resolve();
          };
        })
        .catch(e => reject(e));
    });
  }
  // 暂停视频
  videoPause = (video = this.video) => {
    video.pause();
  }
  // 继续播放视频
  videoResume = (video = this.video) => {
    video.play();
  }
  // 生成对应位置的截图
  generateClipCanvas = (x, y, width, height, videoRef, VIDEOHEIGHT, VIDEOWIDTH) => {
    const tempCanvas = document.createElement('canvas');
    const video = videoRef.current;
    tempCanvas.height = height;
    tempCanvas.width = width;
    const scaleX = video.videoWidth / VIDEOWIDTH;
    const scaleY = video.videoHeight / VIDEOHEIGHT;
    const ctx = tempCanvas.getContext('2d');
    ctx.drawImage(video, x * scaleX, y * scaleY, width * scaleX, height * scaleY, 0, 0, width, height);
    return tempCanvas;
  };
  // 生成 base64 的图片
  generateClipImageBase64 = (x, y, width, height, imageData) => new Promise(resolve => {
    const image = document.createElement('img');
    image.src = imageData;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.height = height;
    tempCanvas.width = width;
    const ctx = tempCanvas.getContext('2d');
    image.onload = () => {
      ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
      resolve(tempCanvas.toDataURL('image/png'));
    };
  });
}

export const camera = new Camera();
