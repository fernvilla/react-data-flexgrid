import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import faSortUp from '@fortawesome/fontawesome-free-solid/faSortUp';
import faSortDown from '@fortawesome/fontawesome-free-solid/faSortDown';
import classNames from 'classnames';
import { Search } from '.';

fontawesome.library.add(solid, faSortUp, faSortDown);

const Row = props => {
  const {
    columns,
    sortColumn,
    sortDirection,
    sort,
    allowRowSelection,
    toggleAllCheckboxes,
    checkAllBoxesSelected,
    sortColumns,
    filterColumns,
    filter
  } = props;

  return (
    <div className="flexgrid-header-row">
      {allowRowSelection && (
        <span className="flexgrid-header-col">
          <input type="checkbox" onClick={toggleAllCheckboxes} checked={checkAllBoxesSelected()} />
        </span>
      )}

      {columns.map((column, i) => {
        const style = column.style || null;
        const { columnName, displayName } = column;
        const isSortable =
          sortColumns && sortColumns.length > 0 ? sortColumns.includes(columnName) : false;
        const isFilterable =
          filterColumns && filterColumns.length > 0 ? filterColumns.includes(columnName) : false;

        return (
          <span className="flexgrid-header-col" key={i} style={style}>
            {displayName}

            {isFilterable && <Search filter={text => filter(text, columnName)} />}

            {isSortable && (
              <span>
                <div
                  className={classNames('flexgrid-header-sort-icon', {
                    active: sortColumn === columnName && sortDirection === 'ASC'
                  })}
                  onClick={() => sort(columnName, 'ASC')}>
                  <FontAwesomeIcon icon="sort-up" />
                </div>

                <div
                  className={classNames('flexgrid-header-sort-icon', {
                    active: sortColumn === columnName && sortDirection === 'DESC'
                  })}
                  onClick={() => sort(columnName, 'DESC')}>
                  <FontAwesomeIcon icon="sort-down" />
                </div>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Row;
