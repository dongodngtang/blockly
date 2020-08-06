import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { defineMessages } from 'react-intl';
const indexPage = ({
  handleModeChange,
  intl,
  mode
}) => {
  const onButtonClick = index => () => handleModeChange(index);
  const messages = defineMessages({
    picSort: {
      id: 'gui.modal.calibration.picSort',
      defaultMessage: '图片分类'
    },
    autoCatch: {
      id: 'gui.modal.calibration.autoCatch',
      defaultMessage: '自动抓取'
    }
  });
  return (
    <div className={styles.indexPage}>
      {[
        { name: intl.formatMessage(messages.picSort),
          pic: require('./picSort.svg') },
        { name: intl.formatMessage(messages.autoCatch),
          pic: require('./autoCatch.svg') }
      ].map((item, index) => (
        <div
          className={styles.imageWrapper + (index === mode ? ` ${styles.selected}` : '')}
          key={item.name}
        >
          <img
            onClick={onButtonClick(index)}
            src={item.pic}
            height={200}
            width={200}
            draggable={false}
          />
          <div>
            {item.name}
          </div>
        </div>
      ))}

    </div>
  );
};
indexPage.propTypes = {
  handleModeChange: PropTypes.func,
  intl: PropTypes.any,
  mode: PropTypes.number
};

export default indexPage;
