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
  allowSearch
}) => {
  //Use column ids as search keys if user doesnt provide any
  const keys = searchKeys.length ? searchKeys : columns.map(c => c.id);

  // Filter text if prop set to true and there is search text - or use all data
  const filteredData =
    allowSearch && searchText.length ? searchData(data, searchText, searchOptions, keys) : data;

  // Paginate filtered data from above
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return paginatedData.map((d, dIndex) => {
    return (
      <div className="flexgrid-row" key={`row-${dIndex}`}>
        {columns.map(column => {
          const styles = column.style || null;

          return (
            <div className="flexgrid-row-column" key={`${column.id}-row-${dIndex}`} style={styles}>
              {d[column.id]}
            </div>
          );
        })}
      </div>
    );
  });
};

export default DataRows;
