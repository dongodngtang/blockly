import React, { useRef, Fragment } from 'react';
import PropTypes from 'prop-types';

const Canvas = props => {
  const tempCanvasRef = useRef(null);
  let startPoint = {};
  const handleCanvasMouseMove = e => {
    const canvas = tempCanvasRef.current;
    const width = e.x - startPoint.x;
    const height = e.y - startPoint.y;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, props.width, props.height);
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 4;
    ctx.strokeRect(startPoint.x - startPoint.left, startPoint.y - startPoint.top, width, height);
    e.stopPropagation();
  };
  const handleCanvasMouseDown = e => {
    const canvas = tempCanvasRef.current;
    const { top, left } = canvas.getBoundingClientRect();
    canvas.addEventListener('mousemove', handleCanvasMouseMove);
    startPoint = { x: e.clientX, y: e.clientY, top, left };
    e.stopPropagation();
  };
  const handleCanvasMouseUp = e => {
    tempCanvasRef.current.removeEventListener('mousemove', handleCanvasMouseMove);
    tempCanvasRef.current.height = 0;
    const canvas = props.canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 4;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const posArray = [
      startPoint.x - startPoint.left,
      startPoint.y - startPoint.top,
      mouseX - startPoint.x,
      mouseY - startPoint.y
    ];
    // 如果移动小于 10 判断为点选
    if (posArray[2] > 10 && posArray[3] > 10) {
      props.storeRect.push(posArray);
      ctx.strokeRect(...posArray);
      props.generateClip(...posArray);
    } else {
      // 找出所有包含点的矩形
      const filteredRects = props.storeRect.filter(rect => (
        rect[0] < (mouseX - startPoint.left) &&
        rect[1] < (mouseY - startPoint.top) &&
        (rect[0] + rect[2]) > (mouseX - startPoint.left) &&
        (rect[1] + rect[3]) > (mouseY - startPoint.top)));
      ctx.clearRect(...filteredRects[0]);
      ctx.strokeStyle = '#FF0000';
      ctx.strokeRect(...filteredRects[0]);
      props.generateClip(...filteredRects[0]);
    }
    e.stopPropagation();
  };
  const showTempCanvas = e => {
    tempCanvasRef.current.height = props.height;
    handleCanvasMouseDown(e);
  };
  return (
    <Fragment>
      <canvas
        height={props.height}
        id="canvas"
        onMouseDown={showTempCanvas}
        ref={props.canvasRef}
        style={{
          position: 'absolute',
          top: '0',
          left: '0'
        }}
        width={props.width}
      />
      <canvas
        height={props.height}
        id="tempCanvas"
        onMouseDown={handleCanvasMouseDown}
        onMouseUp={handleCanvasMouseUp}
        ref={tempCanvasRef}
        style={{
          position: 'absolute',
          top: '0',
          left: '0'
        }}
        width={props.width}
      />
    </Fragment>
  );
};
Canvas.propTypes = {
  canvasRef: PropTypes.any,
  generateClip: PropTypes.func,
  height: PropTypes.number,
  storeRect: PropTypes.array,
  width: PropTypes.number
};

export default Canvas;
