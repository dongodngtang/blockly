import React, { useState, Fragment } from 'react';
import Styles from './index.css';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
const onMouseEnter = () => {

};
const onMouseOut = () => {

};
export const ButtonComponent = ({
  iconSrc,
  onClick,
  tooltip,
  isDisable
}) => {
  const icon = iconSrc && (
    <img
      className={Styles.icon}
      src={iconSrc}
    />
  );
  const tooltipId = `tooltip-${Math.random()}`;
  return (
    <Fragment>
      <span
        style={{ background: isDisable ? '#999' : '' }}
        className={Styles.outlineButton}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseOut={onMouseOut}
        data-tip
        data-for={tooltipId}
      >
        {icon}
      </span>
      <ReactTooltip
        className={Styles.tooltip}
        effect="solid"
        id={tooltipId}
        place="bottom"
        type="info"
      >
        {tooltip}
      </ReactTooltip>
    </Fragment>

  );
};
ButtonComponent.propTypes = {
  iconSrc: PropTypes.string,
  onClick: PropTypes.func,
  tooltip: PropTypes.object,
  isDisable: PropTypes.bool
};
