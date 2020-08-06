import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.css';


const Product = props => {
  const {
    products,
    changeActiveIndex,
    activeIndex
  } = props;
  const chooseItem = index => () => {
    changeActiveIndex(index);
  };
  return (
    <div className={styles.productContainer}>
      {
        products.map((item, index) =>
          (<div
            key={item.name}
            className={classNames(styles.productItem, {
              [styles.productItemActive]: activeIndex === index
            })}
            onClick={chooseItem(index)}
          >
            <img
              src={item.image}
              alt={item.name}
            />
            <span>
              {item.name}
            </span>
          </div>)
        )
      }
    </div>
  );

};

Product.propTypes = {
  products: PropTypes.array,
  changeActiveIndex: PropTypes.func,
  activeIndex: PropTypes.number
};

export default Product;
