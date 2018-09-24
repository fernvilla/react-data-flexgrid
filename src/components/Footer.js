import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';

library.add(faAngleDoubleLeft);
library.add(faAngleLeft);
library.add(faAngleRight);
library.add(faAngleDoubleRight);

const Footer = ({
  dataLength,
  rowsPerPage,
  currentPage,
  totalPages,
  setCurrentPage,
  setPageDown,
  setPageUp
}) => {
  const pageStartPosition = (currentPage - 1) * rowsPerPage + 1;
  const pageEndPosition = rowsPerPage * currentPage;

  return (
    <div className="fg-footer">
      <div className="fg-footer-left">
        Showing {pageStartPosition} to {pageEndPosition} of {dataLength} entries
      </div>

      <div className="fg-footer-toggle-container">
        <span className="fg-page-toggle" onClick={() => setCurrentPage(1)}>
          <FontAwesomeIcon icon="angle-double-left" />
        </span>

        <span className="fg-page-toggle" onClick={setPageDown}>
          <FontAwesomeIcon icon="angle-left" />
        </span>

        <span className="page-count">
          Page {currentPage} of {totalPages}
        </span>

        <span className="fg-page-toggle" onClick={setPageUp}>
          <FontAwesomeIcon icon="angle-right" />
        </span>

        <span className="fg-page-toggle" onClick={() => setCurrentPage(totalPages)}>
          <FontAwesomeIcon icon="angle-double-right" />
        </span>
      </div>
    </div>
  );
};

export default Footer;
