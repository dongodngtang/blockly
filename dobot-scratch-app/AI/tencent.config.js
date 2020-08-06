const tencentcloud = require('tencentcloud-sdk-nodejs');
const axios = require('axios');
// 人脸识别部分
const IaiClient = tencentcloud.iai.v20180301.Client;
const AIModels = tencentcloud.iai.v20180301.Models;
// OCR 部分
const OcrClient = tencentcloud.ocr.v20181119.Client;
const OCRModels = tencentcloud.ocr.v20181119.Models;
// 自然语言处理部分
const NlpClient = tencentcloud.nlp.v20190408.Client;
const NLPModels = tencentcloud.nlp.v20190408.Models;

// 语音识别部分
const AsrClient = tencentcloud.asr.v20190614.Client;
const ASRModels = tencentcloud.asr.v20190614.Models;


const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;
const GROUPID = '1';
let OCRClient;
let AIClient;
let NLPClient;
let ASRClient;
let callback;
axios.get('https://cn.dobot.cc/Dobot-Scratch/cloud-authentication.json')
  .then(({data}) => {
    const {SecretId, SecretKey} = data.tencent[0];
    let cred = new Credential(SecretId, SecretKey);
    let httpProfile;
    let clientProfile;
    
    httpProfile = new HttpProfile();
    httpProfile.endpoint = 'iai.tencentcloudapi.com';
    clientProfile = new ClientProfile();
    clientProfile.httpProfile = httpProfile;
    AIClient = new IaiClient(cred, 'ap-guangzhou', clientProfile);
    httpProfile = new HttpProfile();
    httpProfile.endpoint = 'ocr.tencentcloudapi.com';
    clientProfile = new ClientProfile();
    clientProfile.httpProfile = httpProfile;
    OCRClient = new OcrClient(cred, 'ap-guangzhou', clientProfile);
    httpProfile = new HttpProfile();
    httpProfile.endpoint = 'ai.tencentcloudapi.com';
    clientProfile = new ClientProfile();
    clientProfile.httpProfile = httpProfile;
    NLPClient = new NlpClient(cred, 'ap-guangzhou', clientProfile);
    
    httpProfile = new HttpProfile();
    httpProfile.endpoint = 'asr.tencentcloudapi.com';
    clientProfile = new ClientProfile();
    clientProfile.httpProfile = httpProfile;
    ASRClient = new AsrClient(cred, 'ap-guangzhou', clientProfile);
    if(callback) {
      callback({
        AIModels,
        AIClient,
        OCRModels,
        OCRClient,
        NLPModels,
        NLPClient,
        ASRModels,
        ASRClient,
        GROUPID
      });
    }
  });


module.exports = function(cb){
  callback = cb;
};