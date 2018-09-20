import React from 'react';

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
    <div className="flexgrid-footer">
      <div className="flexgrid-footer-left">
        Showing {pageStartPosition} to {pageEndPosition} of {dataLength} entries
      </div>

      <div>
        <span className="page-toggle" onClick={() => setCurrentPage(1)}>
          &laquo;
        </span>

        <span className="page-toggle" onClick={setPageDown}>
          &lsaquo;
        </span>

        <span className="page-count">
          Page {currentPage} of {totalPages}
        </span>

        <span className="page-toggle" onClick={setPageUp}>
          &rsaquo;
        </span>

        <span className="page-toggle" onClick={() => setCurrentPage(totalPages)}>
          &raquo;
        </span>
      </div>
    </div>
  );
};

export default Footer;
