/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Alert from '../components/alerts/alert';

const updateAlert = ({ onCloseHelpAlert, showUpdateAlert, isUpdated }) => {
  const handleDownload = () => {
    window.open('https://cn.dobot.cc/');
  };
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: '10000',
        top: showUpdateAlert ? '0' : '-100px',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <Alert
        closeButton
        onCloseAlert={onCloseHelpAlert}
        onDownload={handleDownload}
        updateInfo
        isUpdated={isUpdated}
      />
    </div>);
};

updateAlert.propTypes = {
  isUpdated: PropTypes.bool,
  onCloseHelpAlert: PropTypes.func,
  showUpdateAlert: PropTypes.bool
};

export default updateAlert;
