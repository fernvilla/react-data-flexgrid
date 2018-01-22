import React from "react";
import PropTypes from "prop-types";
import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import solid from "@fortawesome/fontawesome-free-solid";
import faAngleRight from "@fortawesome/fontawesome-free-solid/faAngleRight";
import faAngleLeft from "@fortawesome/fontawesome-free-solid/faAngleLeft";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleDoubleLeft from "@fortawesome/fontawesome-free-solid/faAngleDoubleLeft";
import faAngleDoubleRight from "@fortawesome/fontawesome-free-solid/faAngleDoubleRight";

fontawesome.library.add(
  solid,
  faAngleRight,
  faAngleLeft,
  faAngleDown,
  faAngleDoubleRight,
  faAngleDoubleLeft
);

const Pager = ({
  currentPage,
  totalPages,
  setPage,
  pageDown,
  pageUp,
  setdefaultPageSize,
  defaultPageSize,
  showPager
}) => {
  if (!showPager) return null;

  const rows = [1, 2, 3, 4, 5, 10, 25, 50, 100, 500, 1000, "All"];

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
        <span className="flexgrid-select-wrapper">
          <select
            onChange={e => setdefaultPageSize(e.target.value)}
            defaultValue={defaultPageSize}
          >
            {rows.map((row, i) => (
              <option value={row} key={i}>
                {row}
              </option>
            ))}
          </select>

          <FontAwesomeIcon className="select-icon" icon="angle-down" />
        </span>
      </div>
    </div>
  );
};

Pager.propType = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequirede,
  pageDown: PropTypes.func.isRequired,
  pageUp: PropTypes.func.isRequired,
  setdefaultPageSize: PropTypes.func.isRequired,
  defaultPageSize: PropTypes.number.isRequired,
  showPager: PropTypes.bool.isRequired
};

export default Pager;
