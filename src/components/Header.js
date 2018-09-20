import React from 'react';

const Header = ({ sortData, columns }) => {
  const renderColumns = () => {
    return columns.map((column, i) => {
      const styles = column.style || null;

      return (
        <div
          className="flexgrid-header-column"
          key={`${column.id}-${i}`}
          style={styles}
          onClick={() => sortData(column.id)}>
          {column.display}
        </div>
      );
    });
  };

  return <div className="flexgrid-header">{renderColumns()}</div>;
};

export default Header;
