import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const countdown = (<FormattedMessage
  defaultMessage="Countdown"
  id="gui.AI.countdown"
/>);

// eslint-disable-next-line react/display-name
export const CountComponent = React.memo(props => {
  if (props.current > 0) {
    setTimeout(props.decreaseTimeout, 1000);
  }
  return (
    <div>
      <h3>{countdown}</h3>
      <span>{props.current}</span>
    </div>
  );
});
CountComponent.propTypes = {
  current: PropTypes.number.isRequired,
  decreaseTimeout: PropTypes.func.isRequired
};
