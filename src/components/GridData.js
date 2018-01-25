import React from "react";

const GridData = props => {
  const {
    columns,
    currentPage,
    defaultPageSize,
    data,
    allowRowSelection,
    onRowSelect,
    onRowDeselect,
    handleCheckboxChange,
    selectedRows
  } = props;

  if (!data.length) return null;

  const pagedData = data.slice(
    (currentPage - 1) * defaultPageSize,
    currentPage * defaultPageSize
  );

  const onCheckboxClick = (e, data) => {
    const action = e.target.checked ? onRowSelect : onRowDeselect;

    action(data);
    handleCheckboxChange(data.rowIndex);
  };

  return (
    <div className="flexgrid-data-container">
      {pagedData.map((data, i) => (
        <div className="flexgrid-item-row" key={i}>
          {allowRowSelection && (
            <span className="flexgrid-item-col">
              <input
                type="checkbox"
                onClick={e => onCheckboxClick(e, data)}
                checked={selectedRows.indexOf(data.rowIndex) > -1}
              />
            </span>
          )}

          {columns.map((column, i) => {
            const style = column.style || null;

            return (
              <span className="flexgrid-item-col" key={i} style={style}>
                {data[column.columnName]}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GridData;
