const UUID = require('uuid');
module.exports = function listenTencentAPI(backApp) {
  require('./tencent.config')(({ AIClient, AIModels, OCRClient, OCRModels, NLPClient, NLPModels, ASRClient, ASRModels }) => {
    backApp.post(/tencentPostApi/, (req, res) => {
      if (req.body.funcName === 'AI_CreateGroup') {
        let request = new AIModels.CreateGroupRequest();
        let params = `{"GroupName":"${req.body.groupId}","GroupId":"${req.body.groupId}"}`;
        request.from_json_string(params);
        AIClient.CreateGroup(request, function (errMsg, response) {
          if (errMsg) {
            res.send(errMsg);
            return;
          }
          res.send(response.to_json_string());
        });
      }
      else if (req.body.funcName === 'AI_CreatePerson') {
        let request = new AIModels.CreatePersonRequest();
        let params = `{
            "PersonName":"${req.body.PersonName}",
            "PersonId":"${UUID.v1()}",
            "Gender": 0,
            "Image":"${req.body.image}",
            "GroupId":"${req.body.groupId}"
        }`;
        request.from_json_string(params);
        AIClient.CreatePerson(request, function (errMsg, response) {
          if (errMsg) {
            res.send(errMsg);
            return;
          }
          res.send(response.to_json_string());
        });
      }
      else if (req.body.funcName === 'AI_DetectFace') {
        let request = new AIModels.DetectFaceRequest();
        let params = `{
            "Image":"${req.body.Image}",
            "NeedFaceAttributes":1,
            "FaceModelVersion":"3.0"
        }`;
        request.from_json_string(params);
        AIClient.DetectFace(request, function (errMsg, response) {
          if (errMsg) {
            res.send(errMsg);
            return;
          }
          res.send(response.to_json_string());
        });
      }
      else if (req.body.funcName === 'AI_DeletePerson') {
        let request = new AIModels.DeletePersonRequest();
        let params = `{
            "PersonId":"${req.body.PersonId}"
        }`;
        request.from_json_string(params);
        AIClient.DeletePerson(request, function (errMsg, response) {
          if (errMsg) {
            res.send(errMsg);
            return;
          }
          res.send(response.to_json_string());
        });
      }
      else if (req.body.funcName === 'AI_GetGroupList') {
        let request = new AIModels.GetGroupListRequest();
        let params = `{
        }`;
        request.from_json_string(params);
        AIClient.GetGroupList(request, function (errMsg, response) {
          if (errMsg) {
            res.send(errMsg);
            return;
          }
          res.send(response.to_json_string());
        });
      }
      // else if (req.body.funcName === 'AI_GetPersonList') {
      //   let request = new AIModels.GetPersonListRequest();
      //   let params = `{
      //     "GroupId":"${GROUPID}"
      //   }`;
      //   request.from_json_string(params);
      //   AIClient.GetPersonList(request, function (errMsg, response) {
      //     if (errMsg) {
      //       res.send(errMsg);
      //       return;
      //     }
      //     res.send(response.to_json_string());
      //   });
      // }
      else if (req.body.funcName === 'Face_Info') {
        let request = new AIModels.DetectFaceRequest();
        let params = `{
            "Image":"${req.body.image}",
            "NeedFaceAttributes":"1"
        }`;
        request.from_json_string(params);
        AIClient.DetectFace(request, function (errMsg, response) {
          if (errMsg) {
            res.send(errMsg);
            return;
          }
          res.send(response.to_json_string());
        });
      }
      else if (req.body.funcName === 'AI_CompareFace' ||
        req.body.funcName === 'AI_Confidence') {
        let params = `{
          "ImageA":"${req.body.ImageA}",
          "ImageB":"${req.body.ImageB}"
        }`;
        let request = new AIModels.CompareFaceRequest();
        request.from_json_string(params);
        AIClient.CompareFace(request, function (errMsg, response) {
          if (errMsg) {
            res.send(errMsg);
            return;
          }
          res.send(response.to_json_string());
        });
      }
      else if (req.body.funcName === 'AI_SearchFaces_Name') {
        let params = `{"GroupIds":["${req.body.groupId}"],"Image":"${req.body.image}", "MaxPersonNum":1, "NeedPersonInfo":1}`;
        let request = new AIModels.SearchFacesRequest();
        request.from_json_string(params);
        AIClient.SearchFaces(request, function (errMsg, response) {
          if (errMsg) {
            res.send(errMsg);
            return;
          }
          const candidate = response.Results[0].Candidates[0];
  
          request = new AIModels.GetPersonBaseInfoRequest();
          params = `{"PersonId":"${candidate.PersonId}"}`;
          request.from_json_string(params);
          AIClient.GetPersonBaseInfo(request, function (errMsg, response) {
            if (errMsg) {
              res.send(errMsg);
              return;
            }
            res.send({name: response.PersonName, score: candidate.Score});
          });
        });
      }
      // else if (req.body.funcName === 'AI_DeletePersonFromGroup') {
      //   let request = new AIModels.DeletePersonFromGroupRequest();
      //   let params = `{"PersonId":"${req.body.PersonId}","GroupId":"${GROUPID}"}`;
      //   request.from_json_string(params);
      //   AIClient.DeletePersonFromGroup(request, function (errMsg, response) {
      //     if (errMsg) {
      //       res.send(errMsg);
      //       return;
      //     }
      //     res.send(response.to_json_string());
      //   });
      // }
      else if (req.body.funcName === 'AI_DeleteGroup') {
        let request = new AIModels.DeleteGroupRequest();
        let params = `{"GroupId":"${req.body.groupId}"}`;
        request.from_json_string(params);
        AIClient.DeleteGroup(request, function (errMsg, response) {
          if (errMsg) {
            res.send(errMsg);
            return;
          }
          res.send(response.to_json_string());
        });
      }
      else if (req.body.funcName === 'OCR_GeneralAccurateOCR') {
        let request = new OCRModels.GeneralEfficientOCRRequest();
        const img = req.body.image;
        let params = `{
            "ImageBase64":"${img}"
        }`;
        request.from_json_string(params);
        OCRClient.GeneralEfficientOCR(request, function (errMsg, response) {
          if (errMsg) {
            res.send(errMsg);
            return;
          }
          res.send(response.to_json_string());
        });
      }
      else if (req.body.funcName === 'SR_LexicalAnalysis') {
        let request = new NLPModels.LexicalAnalysisRequest();
        let params = `{"Text":"${req.body.Text}"}`;
        request.from_json_string(params);
        NLPClient.LexicalAnalysis(request, function (errMsg, response) {
          if (errMsg) {
            console.log(errMsg);
            return;
          }
          console.log(response.to_json_string());
          res.send(response.to_json_string());
        });
      }
      else if (req.body.funcName === 'SR_SimilarWords') {
        let request = new NLPModels.SimilarWordsRequest();
        let params = `{"Text":"${req.body.Text}"}`;
        request.from_json_string(params);
        NLPClient.SimilarWords(request, function (errMsg, response) {
          if (errMsg) {
            console.log(errMsg);
            return;
          }
          console.log(response.to_json_string());
          res.send(response.to_json_string());
        });
      }
      else if (req.body.funcName === 'CH_SentenceRecognition') {
        let request = new ASRModels.SentenceRecognitionRequest();
        let params = `{"ProjectId":1,"SubServiceType":2,"EngSerViceType":"16k","SourceType":1,"VoiceFormat":"wav","UsrAudioKey":"scratchVoice","Data":"${req.body.voice}","DataLen":${req.body.size}}`;
        request.from_json_string(params);
        ASRClient.SentenceRecognition(request, function (errMsg, response) {
          if (errMsg) {
            console.log(errMsg);
            return;
          }
          console.log(response.to_json_string());
          res.send(response.to_json_string());
        });
      }
      else if (req.body.funcName === 'EN_SentenceRecognition') {
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
      }
      else if (req.body.funcName === 'VR_TextToVoice') {
        let request = new NLPModels.TextToVoiceRequest();
        let params = `{"Text":"${req.body.Text}","SessionId":"${UUID.v1()}","ModelType":1,"VoiceType":${req.body.Tune}}`;
        request.from_json_string(params);
        NLPClient.TextToVoice(request, function (errMsg, response) {
          if (errMsg) {
            console.log(errMsg);
            return;
          }
          console.log(response.to_json_string());
          res.send(response.to_json_string());
        });
      }
    });
  });
};
