import React from 'react';
import classNames from 'classnames';
import { descendString, ascendString } from './../constants';

const Header = ({ sortData, columns, sortColumn, sortDirection }) => {
  const renderColumns = () => {
    return columns.map((column, i) => {
      const { id } = column;
      const styles = column.style || null;

      return (
        <div
          className="fg-header-column"
          key={`${id}-${i}`}
          style={styles}
          onClick={() => sortData(id)}>
          {column.displayText}

          <div className="fg-header-sort-container">
            <span
              className={classNames('fg-sort-icon up-arrow', {
                active: id === sortColumn && sortDirection === ascendString
              })}>
              &uarr;
            </span>

            <span
              className={classNames('fg-sort-icon down-arrow', {
                active: id === sortColumn && sortDirection === descendString
              })}>
              &darr;
            </span>
          </div>
        </div>
      );
    });
  };

  return <div className="fg-header">{renderColumns()}</div>;
};

export default Header;
