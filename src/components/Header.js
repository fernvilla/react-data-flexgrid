import React from 'react';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { descendString, ascendString } from './../constants';

library.add(faChevronUp);
library.add(faChevronDown);

const Header = ({ sortData, columns, sortColumn, sortDirection }) => {
  const renderColumns = () => {
    return columns.map((column, i) => {
      const { name } = column;
      const styles = column.style || null;

      return (
        <div
          className="fg-header-column"
          key={`${name}-${i}`}
          style={styles}
          onClick={() => sortData(name)}>
          {column.displayText}

          <div className="fg-header-sort-container">
            <FontAwesomeIcon
              icon="chevron-up"
              className={classNames('fg-sort-icon', {
                active: name === sortColumn && sortDirection === ascendString
              })}
            />

            <FontAwesomeIcon
              icon="chevron-down"
              className={classNames('fg-sort-icon', {
                active: name === sortColumn && sortDirection === descendString
              })}
            />
          </div>
        </div>
      );
    });
  };

  return <div className="fg-header">{renderColumns()}</div>;
};

export default Header;
