import PropTypes from 'prop-types';
import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-solarized_light';
import styles from './index.css';
import backIcon from './close.png';
const corsorStyle = {
  max: 'e-resize',
  min: 'w-resize',
  default: 'col-resize'
};
const maxWidth = 600;
const minWidth = 300;

export const codeLanguage = {
  python: 'python',
  C: 'c_cpp'
};
// eslint-disable-next-line react/no-multi-comp
class ButtonComponent extends React.Component{
  state = {
    width: 424,
    cursor: corsorStyle.default
  }


  startX = 0
  onMouseDown = e => {
    this.startX = e.clientX;
    document.addEventListener('mousemove', this.onMouseDrag);
    document.addEventListener('mouseup', this.onMouseUp);
  }
  onMouseUp = e => {
    document.removeEventListener('mousemove', this.onMouseDrag);
  }
  onMouseDrag = e => {
    if (this.draging || !e.clientX) return;
    const offsetX = this.startX - e.clientX;
    this.startX = e.clientX;
    this.draging = true;
    requestAnimationFrame(() => {
      let toSetWidth = offsetX + this.state.width;
      let toSetCursor = corsorStyle.default;
      if (toSetWidth >= maxWidth) {
        toSetCursor = corsorStyle.max;
        toSetWidth = maxWidth;
      } else if (toSetWidth <= minWidth) {
        toSetWidth = minWidth;
        toSetCursor = corsorStyle.min;
      }
      this.setState({
        width: toSetWidth,
        cursor: toSetCursor
      }, () => {
        this.draging = false;
      });
    });
    e.preventDefault();
  }
  closeCodePane = () => {
    this.props.onChangeIsShowTutorialSidebar(false);
    this.props.closeCodePane();

  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          width: `${this.state.width}px`,
          right: '0px',
          height: '100%',
          zIndex: '100',
          boxShadow: 'rgba(0,0,0,0.05) -9px 0px 28px 8px',
          display: this.props.showCodePane ? 'block' : 'none',
          backgroundColor: '#FFF'
        }}
      >
        <div
          style={{
            height: '70px',
            background: 'white',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              height: '30px',
              width: '80px',
              borderRadius: '15px',
              background: '#fa931f',
              marginLeft: '15px',
              lineHeight: '30px',
              textAlign: 'center',
              color: 'white',
              fontSize: '16px'
            }}
          >
            {this.props.codeType}
          </div>
          <img
            src={backIcon}
            alt="收起"
            style={{
              position: 'absolute',
              right: this.props.showCodePane ? '-1px' : `-${this.state.width}px`,
              zIndex: 2,
              transition: 'right .3s ease-in-out'
            }}
            onClick={this.props.closeCodePane}
          />
        </div>
        <div style={{ height: '100%', overflow: 'hidden' }}>
          <AceEditor
            theme={'solarized_light'}
            fontSize={14}
            mode={this.props.codeType || 'python'}
            readOnly
            scrollPastEnd
            highlightActiveLine
            style={
              {
                height: 'calc(100% - 70px)',
                transition: 'right .3s ease-in-out'
              }
            }
            value={this.props.ArduinoCode}
          />
        </div>
        
        <div
          className={styles.rightHolder}
          style={{
            cursor: this.state.cursor,
            right: this.props.showCodePane ? `${this.state.width - 5}px` : `-${this.state.width}px`,
            width: '6px',
            background: `url(${require('./scroll.png')}) center/contain white no-repeat`
          }}
          onMouseDown={this.onMouseDown}
        />
      </div>
    );
  }

}
ButtonComponent.propTypes = {
  ArduinoCode: PropTypes.string,
  closeCodePane: PropTypes.func,
  showCodePane: PropTypes.bool,
  onChangeIsShowTutorialSidebar: PropTypes.func,
  codeType: PropTypes.string
};

export default ButtonComponent;
