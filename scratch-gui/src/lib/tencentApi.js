import axios from 'axios';
import uuid from 'uuid';
const makeRequest = data => axios({
  method: 'post',
  url: 'http://localhost:9991/tencentPostApi',
  data
});
const handleImage = image => {
  if (image){
    const img = image.split(',')[1];
    return img;
  }
  
};
const groupId = localStorage ? localStorage.getItem('userID') : 0;
export default {
  /**
   * 创建人员库
   * @returns {Promise} 请求结果
   */
  createGroup() {
    return makeRequest({
      funcName: 'AI_CreateGroup',
      groupId
    });
  },
  /**
   * 添加人员
   * @param {string} personName 添加人员姓名
   * @param {string} image 添加人员的照片
   * @returns {Promise} 返回创建状态
   */
  createPerson(personName, image) {
    return makeRequest({
      funcName: 'AI_CreatePerson',
      PersonName: personName,
      PersonId: uuid.v4(),
      Gender: 0,
      groupId,
      image: handleImage(image)
    });
  },
  faceNameSearch(image) {
    return makeRequest({
      funcName: 'AI_SearchFaces_Name',
      image: handleImage(image),
      groupId
    });
  },
  ocrText(resolve) {
    return makeRequest({
      funcName: 'OCR_GeneralAccurateOCR',
      image: handleImage(window.photo)
    })
      .then(res => {
        let textList = res.data.TextDetections;
        console.log(res);
        if (textList) {
          textList = textList.map(obj => obj.DetectedText);
          resolve(textList.join(','));
        }
        resolve('识别错误');
      });
  },
  /**
   *
   * @param {Promise.resolve} resolve Promise resolve func
   * @param {'male'|'female'} testGender 待检测的性别
   * @returns {Promise} 请求结果
   */
  faceGender(resolve, testGender) {
    return makeRequest({
      funcName: 'Face_Info',
      image: handleImage(window.photo)
    })
      .then(res => {
        const faceInfo = res.data.FaceInfos;
        if (faceInfo) {
          const gender = faceInfo[0].FaceAttributesInfo.Gender > 50 ? 'male' : 'female';
          if (gender === testGender) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
        resolve('error');
      });
  },
  /**
   *
   * @param {any} resolve promise resolve func
   * @param {'normal'|'smile'|'laugh'} testExpression 待检测的表情
   * @returns {Promise} 请求结果
   */
  faceExpression(resolve, testExpression) {
    return makeRequest({
      funcName: 'Face_Info',
      image: handleImage(window.photo)
    })
      .then(res => {
        const faceInfo = res.data.FaceInfos;
        if (faceInfo) {
          const expressionValue = faceInfo[0].FaceAttributesInfo.Expression;
          // 小于 50 为正常
          let expression = 'normal';
          if (expressionValue > 50 && expressionValue < 85) {
            expression = 'smile';
          } else if (expressionValue > 85){
            expression = 'laugh';
          }
          resolve(expression === testExpression);
        }
        resolve('error');
      });
  },
  faceName(resolve) {
    return makeRequest({
      funcName: 'AI_SearchFaces_Name',
      image: handleImage(window.photo),
      groupId
    })
      .then(res => {
        if (res.data.name) {
          resolve(res.data.name);
        }
        resolve('error');
      });
  },
  faceNamePercent(resolve, Class) {
    return makeRequest({
      funcName: 'AI_SearchFaces_Name',
      image: handleImage(window.photo),
      groupId
    })
      .then(res => {
        if (res.data.score) {
          if (res.data.name === Class) {
            resolve(res.data.score);
          } else {
            resolve(0);
          }
        }
        resolve('error');
      });
  },
  deleteGroup() {
    return makeRequest({
      funcName: 'AI_DeleteGroup',
      groupId
    });
  }
};
