import React from "react";

const Filter = props => {
  const { columnMetadata, filter } = props;

  return (
    <div className="flexgrid-filter-row">
      {columnMetadata.map((column, i) => {
        const style = column.style || null;

        return (
          <span className="flexgrid-filter-col" key={i} style={style}>
            <input
              type="text"
              onChange={e => filter(column.columnName, e.target.value)}
            />
          </span>
        );
      })}
    </div>
  );
};

export default Filter;
