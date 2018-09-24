import React from 'react';
import { searchData } from './../utils';

const DataRows = ({
  columns,
  data,
  currentPage,
  rowsPerPage,
  searchText,
  searchOptions,
  searchKeys,
  allowSearch,
  cells
}) => {
  //Use column ids as search keys if user doesnt provide any
  const keys = searchKeys.length ? searchKeys : columns.map(c => c.name);

  // Filter text if prop set to true and there is search text - or use all data
  const filteredData =
    allowSearch && searchText.length ? searchData(data, searchText, searchOptions, keys) : data;

  // Paginate filtered data from above
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return paginatedData.map((data, dataIndex) => {
    return (
      <div className="fg-row" key={`row-${dataIndex}`}>
        {columns.map((column, columnIndex) => {
          const { style, name } = column;
          const styles = style || null;
          const cellData = { columnName: name, data: data[name], columnIndex };

          return (
            <div className="fg-row-column" key={`${name}-row-${dataIndex}`} style={styles}>
              {cells(cellData)}
            </div>
          );
        })}
      </div>
    );
  });
};

export default DataRows;
