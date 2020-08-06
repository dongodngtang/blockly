module.exports = function listenAWSAPI(backApp) {
  require('./amazon.config')(({ createCollection,compareFace, OCR, deleteCollection, checkFace, addFace ,detectFace, ASRModels, ASRClient}) => {
    backApp.post(/tencentPostApi/, (req, res) => {
      switch (req.body.funcName) {
      case 'AI_CreateGroup':
        createCollection(req.body.groupId).then(response => res.send(response), err => res.send(err));
        break;
      case 'AI_CreatePerson':
        addFace(req.body.groupId, req.body.image, req.body.PersonName).then(response => res.send(response), err => res.send(err));
        break;
      case 'AI_SearchFaces_Name':
        checkFace(req.body.groupId, req.body.image).then(response => res.send(response), err => res.send(err));
        break;
      case 'Face_Info':
        detectFace(req.body.image).then(response => res.send(response), err => res.send(err));
        break;
      case 'AI_CompareFace':
        compareFace(req.body.ImageA, req.body.ImageB).then(response => res.send(response), err => res.send(err));
        break;
      case 'OCR_GeneralAccurateOCR':
        OCR(req.body.image).then(response => {
          const temp = {TextDetections:[response.TextDetections[0]]};
          res.send(temp), err => res.send(err);
        });
        break;
      case 'AI_DeleteGroup':
        deleteCollection(req.body.groupId);
        break;
      case 'CH_SentenceRecognition': {
        const request = new ASRModels.SentenceRecognitionRequest();
        const params = `{"ProjectId":1,"SubServiceType":2,"EngSerViceType":"16k","SourceType":1,"VoiceFormat":"wav","UsrAudioKey":"scratchVoice","Data":"${req.body.voice}","DataLen":${req.body.size}}`;
        request.from_json_string(params);
        ASRClient.SentenceRecognition(request, function (errMsg, response) {
          if (errMsg) {
            console.log(errMsg);
            return;
          }
          console.log(response.to_json_string());
          res.send(response.to_json_string());
        });
        break;
      }
      case 'EN_SentenceRecognition': {
        let request = new ASRModels.SentenceRecognitionRequest();
        let params = `{"ProjectId":1,"SubServiceType":2,"EngSerViceType":"16k_en","SourceType":1,"VoiceFormat":"wav","UsrAudioKey":"scratchVoice","Data":"${req.body.voice}","DataLen":${req.body.size}}`;
        request.from_json_string(params);
        ASRClient.SentenceRecognition(request, function (errMsg, response) {
          if (errMsg) {
            console.log(errMsg);
            return;
          }
          console.log(response.to_json_string());
          res.send(response.to_json_string());
        });
        break;
      }
      default:
        break;
      }
    });
  });
};
