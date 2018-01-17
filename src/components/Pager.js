import React from "react";
import PropTypes, { number } from "prop-types";
import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import solid from "@fortawesome/fontawesome-free-solid";
import faAngleRight from "@fortawesome/fontawesome-free-solid/faAngleRight";
import faAngleLeft from "@fortawesome/fontawesome-free-solid/faAngleLeft";
import faAngleDoubleLeft from "@fortawesome/fontawesome-free-solid/faAngleDoubleLeft";
import faAngleDoubleRight from "@fortawesome/fontawesome-free-solid/faAngleDoubleRight";

fontawesome.library.add(
  solid,
  faAngleRight,
  faAngleLeft,
  faAngleDoubleRight,
  faAngleDoubleLeft
);

const Pager = props => {
  const {
    currentPage,
    totalPages,
    setPage,
    pageDown,
    pageUp,
    setRowsPerPage,
    rowsPerPage,
    showPager
  } = props;
  const rows = [1, 2, 3, 4, 5, 10, 25, 50, 100, 500, 1000, "All"];

  if (!showPager) return null;

  return (
    <div className="flexgrid-footer">
      <div className="flexgrid-footer-left">
        <span className="page-toggle" onClick={() => setPage(1)}>
          <FontAwesomeIcon icon="angle-double-left" />
        </span>

        <span className="page-toggle" onClick={() => pageDown()}>
          <FontAwesomeIcon icon="angle-left" />
        </span>

        <span className="page-count">
          Page {currentPage} of {totalPages}
        </span>

        <span className="page-toggle" onClick={() => pageUp()}>
          <FontAwesomeIcon icon="angle-right" />
        </span>

        <span className="page-toggle" onClick={() => setPage(totalPages)}>
          <FontAwesomeIcon icon="angle-double-right" />
        </span>
      </div>

      <div className="flexgrid-footer-right">
        Rows per page:
        <select
          onChange={e => setRowsPerPage(e.target.value)}
          defaultValue={rowsPerPage}
        >
          {rows.map((row, i) => (
            <option value={row} key={i}>
              {row}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

Pager.propType = {
  showPager: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequirede,
  pageDown: PropTypes.func.isRequired,
  pageUp: PropTypes.func.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

export default Pager;
