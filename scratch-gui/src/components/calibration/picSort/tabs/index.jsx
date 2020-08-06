import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
const XShadow = props => (
  <div
    className={styles.xShadow}
    onClick={props.handleDelete}
  >
    <img
      src={require('./x.svg')}
      title="delete it"
    />
  </div>
);
XShadow.propTypes = {
  handleDelete: PropTypes.func
};
export const CalibrationTab = props => {
  const [deleteMode, switchDeleteMode] = useState(false);
  const changeIndex = index => props.changeIndex.bind(null, index);
  const onDelete = index => e => {
    e.stopPropagation();
    props.handleDeleteTab(index);
  };
  const switchDelete = e => {
    e.stopPropagation();
    if (props.tabList.length > 1) {
      switchDeleteMode(!deleteMode);
    } else {
      return;
    }
  };
  useEffect(() => {
    if (props.tabList.length === 1) {
      switchDeleteMode(false);
    }
  }, [props.tabList]);
  return (
    <div className={styles.tabsWrapper}>
      <div>
        {props.tabList.map((tab, index) => (
          <div
            className={styles.tabWrapper +
            (index === props.selectTabIndex ? ` ${styles.tabSelected}` : '') +
            (index === 0 ? ` ${styles.firstTab}` : '')}
            key={index}
            onClick={changeIndex(index)}
          >
            <span>{index + 1}</span>
            {deleteMode && <XShadow handleDelete={onDelete(index)} />}
          </div>
        ))}
        {props.tabList.length < 5 && <button
          className={styles.addButton}
          onClick={props.handleTabAdd}
        >
          {'+'}
        </button>}
      </div>
      <div
        className={styles.deleteIcon + (deleteMode ? ` ${styles.active}` : '')}
        onClick={switchDelete}
      />

    </div>
  )
  ;
};
CalibrationTab.propTypes = {
  changeIndex: PropTypes.func,
  handleDeleteTab: PropTypes.func,
  handleTabAdd: PropTypes.func,
  selectTabIndex: PropTypes.number,
  tabList: PropTypes.array
};
