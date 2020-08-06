const coordinateIcon = require('./images/coordinateIcon.png');

let currentR = 6;
let direction = '-';

let repeat;

const calibrationText = [
  'A',
  'B',
  'C',
  'D'
];


const clearCanvas = function(canvasNode) {
  if (canvasNode.current){
    const context = canvasNode.current.getContext('2d');
    context.clearRect(0, 0, canvasNode.current.width, canvasNode.current.height);
  }
};

const drawInnerCircle = function (context, r, rect, step, color) {
  context.beginPath();
  context.arc(...rect[step - 3], r, 0, 2 * Math.PI, true);
  context.fillStyle = color;
  context.fill();
};
const strokeCanvas = function(canvasNode, rectArray, step, isInit = true, color = 'red', clear = true) {
  if (repeat) repeat = null;
  setTimeout(() => {
    if (canvasNode.current){
      const context = canvasNode.current.getContext('2d');
      if (clear) clearCanvas(canvasNode);
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.font = '20px bold';
      rectArray.forEach((arr, index) => {
        context.fillText(calibrationText[index], arr[0] - 5, arr[1] - 15);
        if (isInit){
          context.beginPath();
          context.arc(...arr, 8, 0, 2 * Math.PI, true);
          context.fillStyle = color;
          context.fill();
          context.stroke();
        } else {
          context.beginPath();
          context.arc(...arr, 10, 0, 2 * Math.PI, true);
          context.stroke();
          repeat = () => window.requestAnimationFrame(() => {
            if (repeat) {
              context.clearRect(rectArray[step - 3][0] - 6.5, rectArray[step - 3][1] - 6.5, 13, 13);
              drawInnerCircle(context, currentR, rectArray, step, color);
              if (currentR <= 0) {
                direction = '+';
              } else if (currentR >= 6) {
                direction = '-';
              }
              if (direction === '-') {
                currentR = Number((currentR - 0.1).toFixed(1));
              } else {
                currentR = Number((currentR + 0.1).toFixed(1));
              }
              repeat();
            }
          });
          repeat();
        }
      });
    }
  }, 16);
};
  
const strokeBorderCanvas = function(canvasNode, color = '#209BFA', clear = true) {
  if (repeat) repeat = null;
  if (canvasNode.current){
    const context = canvasNode.current.getContext('2d');
    if (clear) clearCanvas(canvasNode);
    context.strokeStyle = color;
    context.lineWidth = 4;
    context.font = '20px bold';
    context.beginPath();
    // left top
    context.moveTo(99, 15);
    context.lineTo(49, 15);
    context.lineTo(49, 65);
    // left bottom
    context.moveTo(99, 185);
    context.lineTo(49, 185);
    context.lineTo(49, 135);
    // right top
    context.moveTo(169, 15);
    context.lineTo(219, 15);
    context.lineTo(219, 65);
    // right bottom
    context.moveTo(219, 135);
    context.lineTo(219, 185);
    context.lineTo(169, 185);
    // center
    context.moveTo(134, 80);
    context.lineTo(134, 120);
    context.moveTo(114, 100);
    context.lineTo(154, 100);
  
    context.stroke();
    const imgNode = document.createElement('img');
    imgNode.src = coordinateIcon;
    imgNode.onload = () => {
      context.drawImage(imgNode, 0, 160);
    };
   
  }
};

export {
  clearCanvas,
  strokeCanvas,
  strokeBorderCanvas
};
