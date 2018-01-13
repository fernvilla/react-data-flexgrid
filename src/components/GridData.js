import React from "react";

const GridData = props => {
  const { columnMetadata, page, rowsPerPage, data } = props;

  if (!data.length) return null;

  const pagedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return pagedData.map((d, i) => (
    <div className="flexgrid-item-row" key={i}>
      {columnMetadata.map((column, i) => {
        const style = column.style || null;

        return (
          <span className="flexgrid-item-col" key={i} style={style}>
            {d[column.columnName]}
          </span>
        );
      })}
    </div>
  ));
};

export default GridData;
