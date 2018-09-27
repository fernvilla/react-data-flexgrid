import React, { Component } from 'react';
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

  render() {
    const {
      columns,
      data,
      currentPage,
      rowsPerPage,
      searchText,
      searchOptions,
      searchKeys,
      allowSearch,
      cells
    } = this.props;

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
          <div className="fg-row-data" onClick={() => this.setVisibileRow(data.rowIndex)}>
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
