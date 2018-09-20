import React from 'react';

const rows = [1, 2, 3, 4, 5, 10, 25, 50, 100, 500, 1000, 'All'];

const RowsToggle = ({ setRowsPerPage, rowsPerPage }) => {
  return (
    <div>
      <span className="flexgrid-toggle-container">
        Show
        <select onChange={e => setRowsPerPage(e.target.value)} value={rowsPerPage}>
          {rows.map((row, i) => (
            <option value={row} key={i}>
              {row}
            </option>
          ))}
        </select>
        entries
      </span>
    </div>
  );
};

export default RowsToggle;
