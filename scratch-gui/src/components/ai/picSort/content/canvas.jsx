import React, { useRef, Fragment } from 'react';
import PropTypes from 'prop-types';

const Canvas = props => {
  const handleClick = e => {
    const canvas = props.canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 4;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const { top, left } = canvas.getBoundingClientRect();

    const filteredRects = props.storeRect.filter(rect => (
      rect[0] < (mouseX - left) &&
      rect[1] < (mouseY - top) &&
      (rect[0] + rect[2]) > (mouseX - left) &&
      (rect[1] + rect[3]) > (mouseY - top)));
    if (filteredRects[0]){
      const temptempArr = filteredRects[0].slice(0, 4);
      ctx.clearRect(...temptempArr);
      ctx.strokeStyle = '#FF0000';
      ctx.strokeRect(...temptempArr);
      props.generateClip(...filteredRects[0]);
    }
  };
  return (
    <Fragment>
      <canvas
        height={props.height}
        id="canvas"
        ref={props.canvasRef}
        style={{
          position: 'absolute',
          top: '0',
          left: '0'
        }}
        width={props.width}
        onClick={handleClick}
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
