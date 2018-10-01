import React, { Component } from 'react';
import classNames from 'classnames';
import { searchData } from './../utils';

class DataRows extends Component {
  state = {
    visibleRowId: null
  };

  setVisibileRow = rowIndex => {
    if (rowIndex === this.state.visibleRowId) {
      return this.setState({ visibleRowId: null });
    }

    this.setState({ visibleRowId: rowIndex });
  };

  renderSubcomponent = data => {
    const { visibleRowId } = this.state;
    const { subComponent } = this.props;

    if (subComponent && visibleRowId !== null && data.rowIndex === visibleRowId) {
      return subComponent({ data });
    }

    return null;
  };

  onRowClick = data => {
    const { subComponent } = this.props;
    const clickable = typeof subComponent !== 'undefined';

    if (!clickable) return;

    this.setVisibileRow(data.rowIndex);
  };

  onCheckboxChange = (e, data) => {
    const {
      rowSelection: { onRowSelected, onRowDeselected }
    } = this.props;
    const action = e.target.checked ? onRowSelected : onRowDeselected;

    action(data);
  };

  renderCheckbox(data) {
    const { rowSelection } = this.props;
    const { showCheckbox } = rowSelection;

    if (!showCheckbox) return null;

    const {
      selectBy: { rowKey, values }
    } = rowSelection;

    return (
      <span className="fg-row-column fg-checkbox-container">
        <input
          type="checkbox"
          onClick={e => e.stopPropagation()}
          onChange={e => this.onCheckboxChange(e, data)}
          checked={values.indexOf(data[rowKey]) > -1}
        />
      </span>
    );
  }

  render() {
    const {
      columns,
      data,
      currentPage,
      rowsPerPage,
      searchText,
      searchOptions,
      searchKeys,
      searchable,
      cells,
      subComponent
    } = this.props;

    //Use column ids as search keys if user doesnt provide any
    const dataSeachKeys = searchKeys.length ? searchKeys : columns.map(c => c.name);

    // Filter text if prop set to true and there is search text - or use all data
    const filteredData =
      searchable && searchText.length
        ? searchData(data, searchText, searchOptions, dataSeachKeys)
        : data;

    // Paginate filtered data from above
    const paginatedData = filteredData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );

    const clickable = typeof subComponent !== 'undefined';

    return paginatedData.map((data, dataIndex) => {
      return (
        <div className="fg-row" key={`row-${dataIndex}`}>
          <div
            className={classNames('fg-row-data', { clickable })}
            onClick={() => this.onRowClick(data)}>
            {this.renderCheckbox(data)}

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

          {this.renderSubcomponent(data)}
        </div>
      );
    });
  }
}

export default DataRows;
