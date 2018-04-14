import React from 'react';
import { GridRow } from '.';

const GridData = props => {
  const {
    columns,
    currentPage,
    defaultPageSize,
    data,
    allowRowSelection,
    selectedRows,
    subComponent,
    onRowSelect,
    onRowDeselect,
    handleCheckboxChange
  } = props;
  const pagedData = data.slice((currentPage - 1) * defaultPageSize, currentPage * defaultPageSize);

  return (
    <div className="flexgrid-data-container">
      {pagedData.map((data, i) => (
        <GridRow
          key={i}
          data={data}
          allowRowSelection={allowRowSelection}
          selectedRows={selectedRows}
          columns={columns}
          subComponent={subComponent}
          onRowSelect={onRowSelect}
          onRowDeselect={onRowDeselect}
          handleCheckboxChange={handleCheckboxChange}
        />
      ))}
    </div>
  );
};

export default GridData;
