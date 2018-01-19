import React from "react";

const GridData = props => {
  const { columns, currentPage, defaultPageSize, data } = props;

  if (!data.length) return null;

  const pagedData = data.slice(
    (currentPage - 1) * defaultPageSize,
    currentPage * defaultPageSize
  );

  return (
    <div className="flexgrid-data-container">
      {pagedData.map((d, i) => (
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
      ))}
    </div>
  );
};

export default GridData;
