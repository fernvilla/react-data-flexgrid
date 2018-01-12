import React from "react";
import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import solid from "@fortawesome/fontawesome-free-solid";
import faCaretUp from "@fortawesome/fontawesome-free-solid/faCaretUp";
import faCaretDown from "@fortawesome/fontawesome-free-solid/faCaretDown";
import classNames from "classnames";

fontawesome.library.add(solid, faCaretUp, faCaretDown);

const Row = props => {
  const { columnMetadata, sortColumn, sortDirection, sort } = props;

  return (
    <div className="flexgrid-header">
      {columnMetadata.map((column, i) => {
        const style = column.style || null;
        const { columnName, displayName } = column;

        return (
          <span className="flexgrid-header-item" key={i} style={style}>
            {displayName}

            {column.sortable && (
              <span>
                <div
                  className={classNames("flexgrid-header-sort", {
                    active: sortColumn === columnName && sortDirection === "ASC"
                  })}
                  onClick={() => sort(columnName, "ASC")}
                >
                  <FontAwesomeIcon icon="caret-up" />
                </div>

                <div
                  className={classNames("flexgrid-header-sort", {
                    active:
                      sortColumn === columnName && sortDirection === "DESC"
                  })}
                  onClick={() => sort(columnName, "DESC")}
                >
                  <FontAwesomeIcon icon="caret-down" />
                </div>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Row;
