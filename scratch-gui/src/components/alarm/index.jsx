import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styles from './index.css';
import aralmImg from './alarmImg.svg';

const CardHeader = props => (
  <div className={styles.headerButtons}>
    <div className={styles.title}>
      <FormattedMessage
        defaultMessage="warning"
        description="warning"
        id="gui.alarm.warning"
      />
    </div>
  </div>
);

const AlarmPopups = props => {
  const { alarmType, btnCLick } = props;

  const handleBtnCLick = type => () => {
    btnCLick(type);
  };
   
  return (
    <div className={styles.mask}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <CardHeader />
          <div className={styles.alarmContainer}>
            <p className={styles.alarmContent}>
              {alarmType.content}
            </p>
            {
              alarmType.type === 0 ?
                (<div className={styles.tip}>
                  <p style={{ padding: '0 60px' }}>
                    <FormattedMessage
                      defaultMessage="Please hold down the unlock button and move the robat arm to clear the alarm"
                      description="Please hold down the unlock button and move the robat arm to clear the alarm"
                      id="gui.aralmType.errorTip"
                    />
                  </p>
                  <img src={aralmImg} />
                </div>) : ''
            }
            <button
              className={styles.btn}
              onClick={handleBtnCLick(alarmType.type)}
            >
              <FormattedMessage
                defaultMessage="OK"
                description="OK"
                id="gui.prompt.ok"
              />
            </button>
          </div>
        </div>
      </div>
    </div>


  );
};

AlarmPopups.propTypes = {
  alarmType: PropTypes.object,
  btnCLick: PropTypes.func
};

export default AlarmPopups;
