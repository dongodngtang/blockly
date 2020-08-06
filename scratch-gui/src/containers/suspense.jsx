import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
export const SuspenseContainer = function (props) {
  return <Suspense fallback={<div style={{ display: 'none' }}>{'loading'}</div>}>{props.children}</Suspense>;
};
SuspenseContainer.propTypes = {
  children: PropTypes.element.isRequired
};
