import React from 'react';
import { FormattedMessage } from 'react-intl';
import closeIcon from '../../lib/assets/icon--close.svg';
import PropTypes from 'prop-types';
import styles from './index.css';
import Product from './product.jsx';
import TutorialContent from './tutorialContainer.jsx';

const closeMessage = (<FormattedMessage
  defaultMessage="Close"
  description="Title for button to close how-to card"
  id="gui.cards.close"
/>);
const tutorialCenter = (<FormattedMessage
  defaultMessage="Tutorial center"
  description="Tutorial center"
  id="gui.tutorialCenter"
/>);

const CardHeader = props => (
  <div className={styles.headerButtons}>
    <div className={styles.title}>
      {tutorialCenter}
    </div>
    <button
      className={styles.removeButton}
      onClick={props.hideTutorialCenter}
    >
      {closeMessage}
      <img
        className={styles.closeIcon}
        src={closeIcon}
      />
    </button>
  </div>
);

const TutorialCenter = props => {
  const {
    hideTutorialCenter,
    products,
    changeActiveIndex,
    activeIndex,
    chooseproduct,
    tutorialDbckick
  } = props;
  return (
    <div className={styles.mask}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <CardHeader
            hideTutorialCenter={hideTutorialCenter}
          />
          <div className={styles.tutorialCenterBody}>
            <Product
              products={products}
              changeActiveIndex={changeActiveIndex}
              activeIndex={activeIndex}
            />
            <TutorialContent
              chooseproduct={chooseproduct}
              tutorialDbckick={tutorialDbckick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


CardHeader.propTypes = {
  hideTutorialCenter: PropTypes.func
};


TutorialCenter.propTypes = {
  hideTutorialCenter: PropTypes.func,
  products: PropTypes.array,
  changeActiveIndex: PropTypes.func,
  activeIndex: PropTypes.number,
  chooseproduct: PropTypes.object,
  tutorialDbckick: PropTypes.func
};

export default TutorialCenter;
