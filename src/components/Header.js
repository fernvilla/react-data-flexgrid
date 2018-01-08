import React from "react";

const Row = props => {
  const { columnMetadata, style } = props;
  return (
    <div className="flexgrid-header">
      {columnMetadata.map((column, i) => {
        const style = column.style || null;

        return (
          <span className="flexgrid-header-item" key={i} style={style}>
            {column.displayName}
          </span>
        );
      })}
    </div>
  );
};

export default Row;
