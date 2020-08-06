// const url = 'ws://192.168.2.99:9092';
// const url = 'ws://192.168.53.100:9092';
import { store } from './app-state-hoc';
import { setImagePoint } from '../reducers/coordinate-calibration';
const ipcRenderer = window.require && window.require('electron').ipcRenderer;
let aiPort = 10001;
let url = `ws://localhost:${aiPort}`;
if (ipcRenderer){
  ipcRenderer.send('getAIPort');
  ipcRenderer.on('senAIPort', (event, arg) => {
    aiPort = arg;
    url = `ws://localhost:${aiPort}`;
  });
}


let singleInstace;
export class CalibrationWs {
  constructor() {
    this.contentWs();
    this.promiseObj = {};
    this.id = 0;
    this.lables = [];
    singleInstace = this;
    this.isConnect = false;
  }

  contentWs = () => {
    this.ws = new WebSocket(url);
    if (this.isConnect){
      clearTimeout(this.timerId);
    } else {
      this.timerId = setTimeout(() => {
        this.contentWs();
      }, 1000);
    }
    this.ws.onopen = () => {
      this.isConnect = true;
      this.ws.onmessage = data => this.onSocketMessage(JSON.parse(data.data));
    };
  }

  quit() {
    this.ws.send(JSON.stringify({
      id: this.id++,
      jsonrpc: '2.0',
      method: 'quit'
    }));
  }
  send({ params, method }) {
    const sendData = JSON.stringify({
      jsonrpc: '2.0',
      method,
      id: this.id,
      params
    });

    this.ws.send(sendData);
    return new Promise(resolve => {
      this.promiseObj[this.id] = resolve;
      this.id++;
    });
  }
  sliceImageStr(imageStr) {
    return imageStr.slice(22);
  }
  /**
   *
   * @param {string} imageData 图片数据
   * @param {boolean} needRatio 是否需要缩放
   * @returns {Promise} 切割数据
   */
  cutImage(imageData, needRatio = true) {
    if (imageData){
      const tempImage = imageData.split(',')[1];
      return this.send({
        params: {
          imgBase64: tempImage
        },
        method: 'imageCut'
      }).then(res => {
        if (!res || res.length === 0) {
          return [];
        }
        const tempArray = [];
        if (Array.isArray(res[0])) {
          res.forEach(arr => {
            let temptempArray = [];
            // 宽
            arr[4] = arr[4] - arr[2];
            // 高
            arr[5] = arr[5] - arr[3];
            // [左上角 x, 左上角 y, 宽, 高]
            temptempArray.push(...arr.slice(2));
            if (needRatio) {
              temptempArray = temptempArray.map(p => p / 2.4);
            }
            tempArray.push(temptempArray);
          });
        } else {
          res[4] = res[4] - res[2];
          res[5] = res[5] - res[3];
          if (needRatio) {
            res = res.map(p => p / 2.4);
          }
          tempArray.push(...res.slice(2));
        }
        return tempArray;
      });
    }
   
  }
  /**
   *
   * @param {string} imageData 图片数据
   * @param {boolean} needRatio 是否需要缩放
   * @returns {Promise} 切割数据
   */
  // 返回img为Mat类型原始图像,tups为包含元组的数组，每个元组顺序为截取图中心cx, cy；分割框左上角rec_origin_x,rec_origin_y；
  // 分割框右下角 rec_corner_x, rec_corner_y,颜色提取框左上color_origin_x,color_origin_y，颜色提取框右下color_corner_x,color_corner_y
  // 前端显示矩形框及分割图像使用矩形框坐标（rec_origin_x,rec_origin_y）（rec_corner_x, rec_corner_y）
  // 传给算法训练及预测图像需使用矩形框坐标（color_origin_x,color_origin_y）（color_corner_x,color_corner_y）
  colorImageCut(imageData, needRatio = true) {
    if (imageData){
      const tempImage = imageData.split(',')[1];
      return this.send({
        params: {
          imgBase64: tempImage
        },
        method: 'colorImageCut'
      }).then(res => {
        if (!res || res.length === 0) {
          return [];
        }
        const tempArray = [];
        if (Array.isArray(res[0])) {
          res.forEach(arr => {
            let temptempArray = [];
            // 显示宽
            arr[4] = arr[4] - arr[2];
            // 显示高
            arr[5] = arr[5] - arr[3];
            // 计算宽
            arr[8] = arr[8] - arr[6];
            // 计算高
            arr[9] = arr[9] - arr[7];
            // [左上角 x, 左上角 y, 宽, 高]
            temptempArray.push(...arr.slice(2));
            if (needRatio) {
              temptempArray = temptempArray.map(p => p / 2.4);
            }
            tempArray.push(temptempArray);
          });
        } else {
          res[4] = res[4] - res[2];
          res[5] = res[5] - res[3];
          res[8] = res[8] - res[6];
          res[9] = res[9] - res[7];
          if (needRatio) {
            res = res.map(p => p / 2.4);
          }
          tempArray.push(...res.slice(2));
        }
        return tempArray;
      });
    }
   
  }


  imagePointToRobotPoint(x, y) {
    return this.send({
      params: {
        image_x: x, image_y: y
      },
      method: 'imagePointToRobotPoint'
    });
  }
  getCutImages(imageData) {
    return new Promise(resolve =>
      this.cutImage(imageData).then(pointsList => {
        const imageList = [];
        const canvas = document.createElement('canvas');
        const img = new Image();
        img.src = imageData;
        img.onload = () => {
          pointsList.forEach(points => {
            canvas.getContext('2d')
              .drawImage(img, points[0], points[1], points[2], points[3], 0, 0, points[2], points[3]);
            imageList.push(canvas.toDataURL());
          });
          resolve(imageList);
        };
      }));
  }
  // 形状分割训练
  classifyImage(images, lables, size, flag) {
    images = images.map(image => {
      const split = image.split(',')[1];
      return split;
    });
    lables.forEach((label, index) => {
      this.lables[index] = label;
    });
    return this.send({
      params: {
        imgBase64s: images,
        lables,
        class_num: size,
        flag
      },
      method: 'featureImageClassify'
    });
  }
  // 颜色分割训练
  colorImageClassify(images, lables, size, flag) {
    images = images.map(image => {
      const split = image.split(',')[1];
      return split;
    });
    lables.forEach((label, index) => {
      this.lables[index] = label;
    });
    return this.send({
      params: {
        imgBase64s: images,
        lables,
        class_num: size,
        flag
      },
      method: 'colorImageClassify'
    });
  }
  // 形状分割与图片识别
  groupImage(imageData) {
    const tempImage = imageData.split(',')[1];
    return this.send({
      params: {
        imgBase64: tempImage
      },
      method: 'featureImageGroup'
    });
  }
  // 颜色分割与图片识别
  colorImageGroup(imageData) {
    const tempImage = imageData.split(',')[1];
    return this.send({
      params: {
        imgBase64: tempImage
      },
      method: 'colorImageGroup'
    });
  }
  onSocketMessage(data) {
    if (this.promiseObj[data.id]) {
      this.promiseObj[data.id](data.result);
      delete this.promiseObj[data.id];
    }
  }

  calidrationData(imageData){
    if (imageData){
      const tempImage = imageData.split(',')[1];
      return new Promise(resolve => {
        this.send({
          method: 'findChessboardCorners',
          params: {
            imageBase64: tempImage
          }
        }).then(data => {
          if (data && data.length){
            store.dispatch(setImagePoint(data));
            resolve(data.map(d => d.map(dd => Math.floor(dd / 2.3))));
          } else {
            resolve(data);
          }
        });
      });
    }
  }

  calibrationCalculation(imagePoint, robotPoint){
    return new Promise(resolve => {
      this.send({
        method: 'calibration',
        params: {
          imagePoint,
          robotPoint
        }
      }).then(res => {
        resolve(res);
      });
    });
  }

  calibrationImport(matrix){
    return new Promise(resolve => {
      this.send({
        method: 'loadMatrixData',
        params: {
          matrix
        }
      }).then(res => {
        resolve(res);
      });
    });
  }

  calibrationExport(){
    return new Promise(resolve => {
      this.send({
        method: 'exportMatrixData'
      }).then(res => {
        if (res){
          resolve(res);
        }
      });
    });
  }

  setBackground(imageData){
    if (imageData){
      const tempImage = imageData.split(',')[1];
      return new Promise(resolve => {
        this.send({
          method: 'setBackground',
          params: {
            imgBase64: tempImage
          }
        }).then(res => {
          resolve(res);
        });
      });
    }
  }
}
export default {
  CalibrationWs,
  getSingleInstace: () => {
    if (singleInstace) return singleInstace;
    return new CalibrationWs();
  }
};
