import React from "react";
import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import solid from "@fortawesome/fontawesome-free-solid";
import faCaretUp from "@fortawesome/fontawesome-free-solid/faCaretUp";
import faCaretDown from "@fortawesome/fontawesome-free-solid/faCaretDown";
import classNames from "classnames";

fontawesome.library.add(solid, faCaretUp, faCaretDown);

const Row = props => {
  const { columnMetadata, sortableCols, sortName, sortDirection, sort } = props;
  console.log(sortName, sortDirection);
  return (
    <div className="flexgrid-header">
      {columnMetadata.map((column, i) => {
        const style = column.style || null;
        const { columnName, displayName } = column;
        const isSortable = sortableCols.includes(columnName);

        return (
          <span className="flexgrid-header-item" key={i} style={style}>
            {displayName}

            {isSortable && (
              <span>
                <div
                  className={classNames("flexgrid-header-sort", {
                    active: sortName === columnName && sortDirection === "ASC"
                  })}
                  onClick={() => sort(columnName, "ASC")}
                >
                  <FontAwesomeIcon icon="caret-up" />
                </div>

                <div
                  className={classNames("flexgrid-header-sort", {
                    active: sortName === columnName && sortDirection === "DESC"
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
