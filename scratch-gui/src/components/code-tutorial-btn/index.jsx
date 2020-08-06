import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';


const CodeTutorialBtn = props => {
  const {
    shwoTutorialSidebar,
    isShowTutorialSidebar,
    isSelectedTutorial,
    showCodePane,
    isShowCodePane,
    deviceName
  } = props;
  const pythonDevices = ['magician', 'magicianlite', 'controller'];
  return (
    <div
      className={classNames(styles.btnContainer, {
        [styles.hiddBtnContainer]: isShowTutorialSidebar || isShowCodePane
      })}
    >
      {
        isSelectedTutorial ? (
          <div
            className={classNames(styles.tutorialBtn)}
            onMouseUp={shwoTutorialSidebar}
          >
            <p>
              <FormattedMessage
                defaultMessage="Tutorial Description"
                description="Tutorial Description"
                id="gui.tutorialDescription"
              />
            </p>
          </div>) : ''
      }
      <div
        className={classNames(styles.codeBtn)}
        onMouseUp={showCodePane}
      >
        <p>
          {pythonDevices.includes(deviceName) ? 'Python' : 'Arduino'}
        </p>
      </div>
    </div>
  );
};

CodeTutorialBtn.propTypes = {
  shwoTutorialSidebar: PropTypes.func,
  isShowTutorialSidebar: PropTypes.bool,
  isSelectedTutorial: PropTypes.bool,
  showCodePane: PropTypes.func,
  isShowCodePane: PropTypes.bool,
  deviceName: PropTypes.string
};

export default CodeTutorialBtn;
