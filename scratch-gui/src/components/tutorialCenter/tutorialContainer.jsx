import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import styles from './index.css';

const TutorialContent = props => {
  const {
    chooseproduct,
    tutorialDbckick
  } = props;
  const doubleClick = e => {
    const index = e.target.getAttribute('value');
    tutorialDbckick(index);
  };
  return (
    <div
      className={styles.tutorialContainer}
      onDoubleClick={doubleClick}
    >
      {
        chooseproduct.tutorialContent ? chooseproduct.tutorialContent.map((item, index) => (
          <div
            key={index}
            className={styles.tutorialItem}
          >
            <div
              className={styles.tutorialImg}
             
            >
              <div
                className={styles.detailsMask}
                value={index}
              >
                <p
                  className={styles.maskTitle}
                  value={index}
                >
                  {item.title}
                </p>
                <p
                  className={styles.detailText}
                  value={index}
                >
                  {item.details}
                </p>
              </div>
              <img
                src={item.tutorialImage}
                alt={item.title}
                value={index}
              />
            </div>
            <div className={styles.tutorialTitle}>
              {item.title}
            </div>
          </div>
        )) : (
          <div>
            <p style={{ fontSize: '20px' }}>
              <FormattedMessage
                defaultMessage="Coming soon"
                description="Coming soon"
                id="gui.tutorialCenter.noExtension"
              />
            </p>
          </div>
        )
      }
    </div>
  );

};

TutorialContent.propTypes = {
  chooseproduct: PropTypes.object,
  tutorialDbckick: PropTypes.func
};

export default TutorialContent;
