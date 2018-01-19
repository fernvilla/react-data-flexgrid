import React from "react";
import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import solid from "@fortawesome/fontawesome-free-solid";
import faSortUp from "@fortawesome/fontawesome-free-solid/faSortUp";
import faSortDown from "@fortawesome/fontawesome-free-solid/faSortDown";
import classNames from "classnames";

fontawesome.library.add(solid, faSortUp, faSortDown);

const Row = props => {
  const { columns, sortColumn, sortDirection, sort } = props;

  return (
    <div className="flexgrid-header-row">
      {columns.map((column, i) => {
        const style = column.style || null;
        const { columnName, displayName } = column;

        return (
          <span className="flexgrid-header-col" key={i} style={style}>
            {displayName}

            {column.sortable && (
              <span>
                <div
                  className={classNames("flexgrid-header-sort-icon", {
                    active: sortColumn === columnName && sortDirection === "ASC"
                  })}
                  onClick={() => sort(columnName, "ASC")}
                >
                  <FontAwesomeIcon icon="sort-up" />
                </div>

                <div
                  className={classNames("flexgrid-header-sort-icon", {
                    active:
                      sortColumn === columnName && sortDirection === "DESC"
                  })}
                  onClick={() => sort(columnName, "DESC")}
                >
                  <FontAwesomeIcon icon="sort-down" />
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
