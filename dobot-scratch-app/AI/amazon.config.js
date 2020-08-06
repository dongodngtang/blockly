const axios = require('axios');
const AWS = require('aws-sdk');
const atob = require('atob');

const tencentcloud = require('tencentcloud-sdk-nodejs');
// 腾讯语音识别部分
const Credential = tencentcloud.common.Credential;
const AsrClient = tencentcloud.asr.v20190614.Client;
const ASRModels = tencentcloud.asr.v20190614.Models;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;
let httpProfile = new HttpProfile();
httpProfile.endpoint = 'asr.tencentcloudapi.com';
let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
let callback;
const BUCKET = 'dobotvoice';
const VOICE_KEY = 'voice.wav';
axios.get('https://dobot.cc/Dobot-Scratch/cloud-authentication.json')
  .then(({data}) => {
    const amazonConfig = data.aws[0];
    const {SecretId, SecretKey} = data.tencent[0];
    let cred = new Credential(SecretId, SecretKey);
    const ASRClient = new AsrClient(cred, 'ap-guangzhou', clientProfile);
    AWS.config.credentials = new AWS.Credentials(
      amazonConfig.accessKeyId, 
      amazonConfig.secretAccessKey, 
    );
    AWS.config.region = amazonConfig.region;
    AWS.config.getCredentials(function(err) {
      if (err) console.log(err.stack);
      // credentials not loaded
      else {
        console.log('Access key:', AWS.config.credentials.accessKeyId);
        console.log('Secret access key:', AWS.config.credentials.secretAccessKey);
      }
    });
    const transcribeservice = new AWS.TranscribeService();
    const rekognition = new AWS.Rekognition();
    const s3 = new AWS.S3();
    function createCollection(name) {
      return new Promise((resolve, reject) => {
        rekognition.createCollection({CollectionId: name}, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      });
    
    }
    function toImageBase (base64) {
      const imageBase64 = atob(base64);
      const length = imageBase64.length;
      const imageBytes = new ArrayBuffer(length);
      const ua = new Uint8Array(imageBytes);
      for(let i = 0; i < length; i ++) {
        ua[i] = imageBase64.charCodeAt(i);
      }
      return imageBytes;
    }

    function addFace(collectionId, image, name) {
      const imgByte = toImageBase(image);
      return new Promise((resolve, reject) => {
        const params = {
          CollectionId: collectionId, 
          DetectionAttributes: [
          ], 
          ExternalImageId: name, 
          Image: {
            Bytes: imgByte
          }
        };
        rekognition.indexFaces(params, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      });
      
    }
    function checkFace(collectionId, image) {
      const imgByte = toImageBase(image);
      return new Promise((resolve, reject) => {
        const params = {
          CollectionId: collectionId, 
          FaceMatchThreshold: 80, 
          Image: {
            Bytes: imgByte
          }, 
          MaxFaces: 5
        };
        rekognition.searchFacesByImage(params, (err, data) => {
          if(err) return reject(err);
          if (data.FaceMatches.length) resolve(JSON.stringify({name: data.FaceMatches[0].Face.ExternalImageId, score: data.FaceMatches[0].Similarity.toFixed(2) }));
        });
      });
    }
    function compareFace(imageA, imageB) {
      const imageBytesA = toImageBase(imageA);
      const imageBytesB = toImageBase(imageB);
      const params = {
        SimilarityThreshold: 90, 
        SourceImage: {
          Bytes: imageBytesA
        }, 
        TargetImage: {
          Bytes: imageBytesB
        }
      };
      return new Promise((resolve, reject) => {
        rekognition.compareFaces(params, (err, res) => {
          if(err) reject(err);
          resolve(res);
        });
      });
    }
    function OCR(image) {
      const imageBytes = toImageBase(image);
      const params = {
        Image: {
          Bytes: imageBytes
        }
      };
      return new Promise((resolve, reject) => {
        rekognition.detectText(params, (err, res) => {
          if(err) reject(err);
          resolve(res);
        });
      });
    }
    function detectFace(image) {
      const imgBytes = toImageBase(image);
      return new Promise((resolve, reject) => {
        rekognition.detectFaces({
          Image: {
            Bytes: imgBytes
          },
          Attributes: ['ALL']
        }, (err, res) => {
          if(err) return reject(err);
          const faceDetail = res.FaceDetails[0];
          if (!faceDetail) reject('no face detect');
          const gender = faceDetail.Gender.Value === 'Male' ? 100 : 0;
          const expression = faceDetail.Smile.Value ? (faceDetail.MouthOpen.Value ? 99 : 80) : 30;
          resolve({FaceInfos: [{
            FaceAttributesInfo: {
              Gender: gender,
              Expression: expression
            }
          }]});
        });
      });
    }
    
    function deleteCollection(name) {
      rekognition.deleteCollection({CollectionId: name}, (err, data) => {
        console.log(err,data);
      });
    }

    function storeSound(sound) {
      const params = {
        Body: sound,
        Bucket: BUCKET,
        Key: VOICE_KEY
      };
      return new Promise((resolve) => {
        s3.putObject(params, (err, data) => {
          console.log(data);
          if(err) resolve(err);
          resolve(data.ETag);
        });
      });
    }
    function speechToText(name, lang) {
      
      const params = {
        LanguageCode: lang,
        Media: {
          MediaFileUri: 'https://dobotvoice.s3.us-east-2.amazonaws.com/voice.wav',
        },
        MediaFormat: 'wav',
        TranscriptionJobName: name,
        OutputBucketName: 'dobotvoice',
        MediaSampleRateHertz: 16000,
        Settings: {
          ChannelIdentification: false,
          ShowAlternatives: false,
          ShowSpeakerLabels: false,
        }
      };
      return new Promise(resolve => {
        transcribeservice.startTranscriptionJob(params, err => {
          if(err) return console.log(err);
          let timer;
          timer = setInterval(() => {
            transcribeservice.getTranscriptionJob({TranscriptionJobName: name}, (err, jobData) => {
              if(err) return console.log(err);
              console.log(jobData);
              if (jobData.TranscriptionJob.TranscriptionJobStatus === 'COMPLETED') {
                clearInterval(timer);
                transcribeservice.deleteTranscriptionJob({TranscriptionJobName: name},() => {
                  s3.getObject({
                    Bucket: BUCKET,
                    Key: `${name}.json`,
                  }, (err, s3data) => {
                    if(err) return resolve(null);
                    const result = JSON.parse(s3data.Body.toString()).results.transcripts;
                    resolve(result[0].transcript);
                    console.log(result[0].transcript);
                  });
                });
              }
            });
          }, 1000);
        });
      });
    }

    function getText(name) {
      transcribeservice.getTranscriptionJob({TranscriptionJobName: name}, console.log);
    }
    callback({
      getText,
      createCollection,
      OCR,
      compareFace, 
      deleteCollection, 
      checkFace, 
      addFace, 
      toImageBase, 
      detectFace,
      storeSound,
      speechToText,
      ASRClient,
      ASRModels
    });
  });
module.exports = function(cb){
  callback = cb;
};