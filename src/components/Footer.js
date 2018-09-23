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
    <div className="fg-footer">
      <div className="fg-footer-left">
        Showing {pageStartPosition} to {pageEndPosition} of {dataLength} entries
      </div>

      <div className="fg-footer-toggle-container">
        <span className="fg-page-toggle left-all" onClick={() => setCurrentPage(1)} />
        <span className="fg-page-toggle left" onClick={setPageDown} />
        <span className="page-count">
          Page {currentPage} of {totalPages}
        </span>
        <span className="fg-page-toggle right" onClick={setPageUp} />
        <span className="fg-page-toggle right-all" onClick={() => setCurrentPage(totalPages)} />
      </div>
    </div>
  );
};

export default Footer;
