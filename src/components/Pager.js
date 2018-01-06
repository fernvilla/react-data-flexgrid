import React from "react";
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
  const { page, totalPages, setPage, pageDown, pageUp } = props;
  return (
    <div className="flexgrid-footer">
      <div>
        <span className="page-toggle" onClick={() => setPage(1)}>
          <FontAwesomeIcon icon="angle-double-left" />
        </span>
        <span className="page-toggle" onClick={() => pageDown()}>
          <FontAwesomeIcon icon="angle-left" />
        </span>
        <span className="page-count">
          Page {page} of {totalPages}
        </span>
        <span className="page-toggle" onClick={() => pageUp()}>
          <FontAwesomeIcon icon="angle-right" />
        </span>
        <span className="page-toggle" onClick={() => setPage(totalPages)}>
          <FontAwesomeIcon icon="angle-double-right" />
        </span>
      </div>
    </div>
  );
};

export default Pager;
