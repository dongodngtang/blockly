import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import styles from './speed-slider.css';

const speedMessage = (<FormattedMessage
  defaultMessage="Velocity"
  id="gui.device_control_speed"
/>);
// eslint-disable-next-line react/display-name
export const SpeedSlide = React.forwardRef((props, sliderRef) => {
  const {
    sliderMouseDown,
    slideMouseEnter,
    slideMouseLeave,
    sliderClick,
    speed,
    sliderMouseUp
  } = props;
  return (
    <div
      className={styles.speedSliderWarp}
      onMouseEnter={slideMouseEnter}
      onMouseLeave={slideMouseLeave}
    >
      <p className={styles.speedText}>
        {speedMessage}
      </p>
      <div
        className={styles.sliderWarp}
        ref={sliderRef}
        onMouseDown={sliderClick}
        onTouchStart={sliderClick}
        onTouchEnd={sliderMouseUp}
      >
        <i
          className={styles.smallPieces}
          id="smallPieces"
          onClick={e => {
            e.stopPropagation();
          }}
          onMouseDown={sliderMouseDown}
          onTouchStart={sliderMouseDown}
          onTouchEnd={sliderMouseUp}
        />
        <div className={styles.sliderBackground} />
      </div>
      <div className={styles.tipsWarp}>
        <p className={styles.tipsContent}>
          <span className={styles.tipsText}>{speed.velocityRatio}{' %'}</span>
          <i className={styles.tipsArrow} />
        </p>
      </div>
    </div>
  );
    
});

SpeedSlide.propTypes = {
  sliderMouseDown: PropTypes.func,
  slideMouseEnter: PropTypes.func,
  slideMouseLeave: PropTypes.func,
  sliderClick: PropTypes.func,
  speed: PropTypes.object,
  sliderMouseUp: PropTypes.func
};
