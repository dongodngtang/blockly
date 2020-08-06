import React from 'react';
import styles from './index.css';
import classNames from 'classnames';

const Loading = () => (
  <div className={styles.loadWrapp}>
    <div className={classNames(styles.lettera, styles.letter)}>{'L'}</div>
    <div className={classNames(styles.letterb, styles.letter)}>{'o'}</div>
    <div className={classNames(styles.letterc, styles.letter)}>{'a'}</div>
    <div className={classNames(styles.letterd, styles.letter)}>{'d'}</div>
    <div className={classNames(styles.lettere, styles.letter)}>{'i'}</div>
    <div className={classNames(styles.letterf, styles.letter)}>{'n'}</div>
    <div className={classNames(styles.letterg, styles.letter)}>{'g'}</div>
    <div className={classNames(styles.letterh, styles.letter)}>{'.'}</div>
    <div className={classNames(styles.letteri, styles.letter)}>{'.'}</div>
    <div className={classNames(styles.letterj, styles.letter)}>{'.'}</div>
  </div>
);

export default Loading;
