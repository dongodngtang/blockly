import React, { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import PropTypes from 'prop-types';
import styles from './index.css';
import classNames from 'classnames';
import backIcon from '../../lib/assets/icon-back.png';
import { FormattedMessage } from 'react-intl';

const TutorialSidebar = props => {
  const {
    isShowTutorialSidebar,
    closeTutorialSidebar,
    pdfData,
    pageNumber,
    onChangePagenumber
  } = props;

  const containerRef = useRef();
  const [isShowBtn, setisShowBtn] = useState(false);
  const [pages, setpages] = useState(1);
  const onDocumentLoadSuccess = obj => {
    setpages(obj.numPages);
  };

  const onPageLoafSuccess = () => {
    setisShowBtn(true);
  };

  const nextStep = () => {
    onChangePagenumber(pageNumber + 1);
  };

  const prevStep = () => {
    onChangePagenumber(pageNumber - 1);
  };
  useEffect(() => {
    containerRef.current.scrollTop = 0;
  }, [pageNumber]);
  
  return (
    <div
      className={classNames(styles.sidebarContainer, {
        [styles.showSidebarContainer]: isShowTutorialSidebar
      })}
      ref={containerRef}
    >
      <div
        className={styles.sidebarHead}
      >
        <p>
          <FormattedMessage
            defaultMessage="Tutorial Description"
            description="Tutorial Description"
            id="gui.tutorialDescription"
          />
        </p>
        <div
          className={styles.sidebarHeadBackIcon}
          onClick={closeTutorialSidebar}
        >
          <img
            src={backIcon}
            alt="收起"
          />
        </div>
       
      </div>
      {
        isShowTutorialSidebar ? (<div
          className={styles.sidebarBody}
        >
          <Document
            file={{ data: pdfData }}
            page={pageNumber}
            renderMode="svg"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={pageNumber}
              scale={1}
              onLoadSuccess={onPageLoafSuccess}
              width={400}
            />
          </Document>
          <div
            className={styles.buttonContainer}
            style={{ display: isShowBtn ? 'flex' : 'none' }}
          >
            <button
              onMouseUp={prevStep}
              style={{ visibility: pageNumber === 1 ? 'hidden' : 'visible' }}
            >
              {'上一页'}
            </button>
            <button
              onMouseUp={nextStep}
              style={{ visibility: pageNumber === pages ? 'hidden' : 'visible' }}
            >
              {'下一页'}
            </button>
          </div>
        </div>) : ''
      }
      
    </div>
  );
};

TutorialSidebar.propTypes = {
  isShowTutorialSidebar: PropTypes.bool,
  closeTutorialSidebar: PropTypes.func,
  pdfData: PropTypes.any,
  onChangePagenumber: PropTypes.func,
  pageNumber: PropTypes.number
};

export default TutorialSidebar;
