/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './index.css';


const CloseTipsPopup = ({ closeClosePopup }) => (
  <div className={styles.mask}>
    <div className={styles.popupWarp}>
      <p>
        <FormattedMessage
          defaultMessage="You need to recalibrate the camera if closing the pop-up window before finishing the calibration process."
          description="You need to recalibrate the camera if closing the pop-up window before finishing the calibration process."
          id="gui.coordinateCalibration.closeTips"
        />
      </p>
      <div className={styles.btnWarp}>
        <button onClick={closeClosePopup}>
          <FormattedMessage
            defaultMessage="OK"
            description="OK"
            id="gui.prompt.ok"
          />
        </button>
      </div>
    </div>
  </div>
  
);

CloseTipsPopup.propTypes = {
  closeClosePopup: PropTypes.func
};


const SuccessPopup = ({ isErr, recalibration, closeCalibration }) => (
  <div className={styles.successPopupWarp}>
    <p>
      {
        isErr ? <FormattedMessage
          defaultMessage="Coordinate calibration failed, do you need to recalibrate?"
          description="Coordinate calibration failed, do you need to recalibrate?"
          id="gui.coordinateCalibration.failure"
        /> : <FormattedMessage
          defaultMessage="Coordinate calibration completed!"
          description="Coordinate calibration completed!"
          id="gui.coordinateCalibration.success"
        />
      }
    </p>
    {
      isErr ? (<div className={styles.btnWarp} >
        <button onClick={recalibration}>
          <FormattedMessage
            defaultMessage="Try Again"
            description="Try Again"
            id="gui.alerts.tryAgain"
          />
        </button>
        <button onClick={closeCalibration}>
          <FormattedMessage
            defaultMessage="Cancel"
            description="Cancel"
            id="gui.customProcedures.cancel"
          />
        </button>
      </div>) : ''
    }
  </div>
);

SuccessPopup.propTypes = {
  isErr: PropTypes.bool,
  recalibration: PropTypes.func,
  closeCalibration: PropTypes.func
};

const ImportPopup = ({ text, isImportSuccess, closeImportPopup }) => (
  <div className={styles.mask}>
    <div className={styles.popupWarp}>
      <p>
        {text}
      </p>
      {
        isImportSuccess ? '' : (<div className={styles.btnWarp} >
          <button onClick={closeImportPopup}>
            <FormattedMessage
              defaultMessage="OK"
              description="OK"
              id="gui.prompt.ok"
            />
          </button>
        </div>)
      }
    </div>
  </div>
);
ImportPopup.propTypes = {
  text: PropTypes.string,
  isImportSuccess: PropTypes.bool,
  closeImportPopup: PropTypes.func
};

export {
  CloseTipsPopup,
  SuccessPopup,
  ImportPopup
};
