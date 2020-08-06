import React from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import { delConfirm } from '../../../lib/events';
import { FormattedMessage } from 'react-intl';

const handleDelConfirm = flag => function() {
  document.dispatchEvent(delConfirm(flag));
};
const AIDlePopup = () => (
  <div className={style.mask}>
    <div className={style.popupWarp}>
      <p>
        <FormattedMessage
          defaultMessage="Delete data? The original data will disappear!"
          id="gui.AI.Tips.DeleteData"
        />
      </p>
      <div className={style.btnWarp}>
        <button onClick={handleDelConfirm(true)}>
          <FormattedMessage
            defaultMessage="OK"
            id="gui.prompt.ok"
          />
        </button>
        <button onClick={handleDelConfirm(false)}>
          <FormattedMessage
            defaultMessage="Cancel"
            id="gui.prompt.cancel"
          />
        </button>
      </div>
    </div>
  </div>
);

const AIOfflinePopup = props => (
  <div className={style.mask}>
    <div className={style.linePopupWarp}>
      <p>
        <FormattedMessage
          defaultMessage="This function requires internet connection, please check the internet connection"
          id="gui.AI.Tips.CheckInterne"
        />
      </p>
      <div className={style.btnWarp}>
        <button onClick={props.handleCloseOnlinePop}>
          <FormattedMessage
            defaultMessage="OK"
            id="gui.prompt.ok"
          />
        </button>
      </div>
    </div>
  </div>
);
AIOfflinePopup.propTypes = {
  handleCloseOnlinePop: PropTypes.func
};

export {
  AIDlePopup,
  AIOfflinePopup
};
