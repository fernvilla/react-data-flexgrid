import React from "react";

const GridData = props => {
  const { columns, currentPage, rowsPerPage, data } = props;

  if (!data.length) return null;

  const pagedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return pagedData.map((d, i) => (
    <div className="flexgrid-item-row" key={i}>
      {columns.map((column, i) => {
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
