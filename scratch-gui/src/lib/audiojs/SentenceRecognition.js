const axios = require('axios');
 
// 一句话识别
export const SentenceRecognitionZH = () => new Promise(resolve => {
  const blob = window.voice;
  if (!blob) return 'no record';
  const size = blob.size;
  const fr = new FileReader();
  fr.readAsDataURL(blob);
  fr.onloadend = () => {
    axios({
      method: 'post',
      url: 'http://localhost:9991/tencentPostApi',
      data: {
        funcName: 'CH_SentenceRecognition',
        voice: fr.result.split(',')[1],
        size
      }
    })
      .then(response => {
        if (response.status !== 200) {
          return alert(response.data.code);
        }
        resolve(response.data.Result);
      })
      .catch(error => {
        console.log('error:', error);
      });
  };
});

export const SentenceRecognitionEN = () => new Promise(resolve => {
  const blob = window.voice;
  if (!blob) return 'no record';
  const size = blob.size;
  const fr = new FileReader();
  fr.readAsDataURL(blob);
  fr.onloadend = () => {
    axios({
      method: 'post',
      url: 'http://localhost:9991/tencentPostApi',
      data: {
        funcName: 'EN_SentenceRecognition',
        voice: fr.result.split(',')[1],
        size
      }
    })
      .then(response => {
        if (response.status !== 200) {
          return alert(response.data.code);
        }
        resolve(response.data.Result);
      })
      .catch(error => {
        console.log('error:', error);
      });
  };
});
