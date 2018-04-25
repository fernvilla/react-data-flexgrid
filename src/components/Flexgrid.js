import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Pager, GridData, Search, Header } from '.';
import { getTotalPages, sortData, filterData } from './../utils';
import _intersection from 'lodash/intersection';
import _isEqual from 'lodash/isEqual';

export default class FlexGrid extends Component {
  static propTypes = {
    allowRowSelection: PropTypes.bool,
    filterColumns: PropTypes.array,
    columns: PropTypes.array.isRequired,
    currentPage: PropTypes.number,
    data: PropTypes.array.isRequired,
    defaultPageSize: PropTypes.number,
    gridClass: PropTypes.string,
    onRowDeselect: (props, propName) => {
      if (props['allowRowSelection'] === true && !props[propName].length) {
        return new Error('[allowRowSelection] needs to be set to true to use [onRowDeselect]');
      }
    },
    onRowSelect: (props, propName) => {
      if (props['allowRowSelection'] === true && !props[propName].length) {
        return new Error('[allowRowSelection] needs to be set to true to use [onRowSelect]');
      }
    },
    showPager: PropTypes.bool,
    sortColumns: PropTypes.array,
    subComponent: PropTypes.func
  };

  static defaultProps = {
    allowRowSelection: false,
    filterColumns: [],
    currentPage: 1,
    defaultPageSize: 10,
    gridClass: null,
    onRowDeselect: null,
    onRowSelect: null,
    showPager: true,
    sortColumns: [],
    subComponent: null
  };

  constructor(props) {
    super(props);

    const { currentPage, defaultPageSize, data } = props;

    this.state = {
      currentPage,
      defaultPageSize,
      totalPages: 1,
      sortDirection: null,
      sortColumn: null,
      data,
      selectedRows: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;

    if (!_isEqual(this.props.data, data)) {
      const { defaultPageSize, sortColumn, sortDirection } = this.state;
      const totalPages = getTotalPages(data.length, defaultPageSize);
      const indexedData = data.map((d, i) => {
        d.rowIndex = i;

        return d;
      });

      this.setState({ totalPages: totalPages, data: indexedData }, () => {
        this.sort(sortColumn, sortDirection);
      });

      if (totalPages < this.state.currentPage) {
        this.setPage(1);
      }
    }
  }

  filter = (text, column) => {
    const { data } = this.props;
    const filteredData = filterData(data, column, text);

    this.setState({
      currentPage: 1,
      data: !text.length ? this.props.data : filteredData
    });
  };

  sort = (column, direction) => {
    const { sortDirection, sortColumn } = this.state;

    if (direction === sortDirection && column === sortColumn) return;

    this.setState({
      data: sortData(this.props.data, column, direction),
      sortColumn: column,
      sortDirection: direction
    });
  };

  pageUp = () => {
    const { currentPage, totalPages } = this.state;

    if (currentPage === totalPages) return;

    this.setPage(currentPage + 1);
  };

  pageDown = () => {
    const { currentPage } = this.state;

    if (currentPage === 1) return;

    this.setPage(currentPage - 1);
  };

  setPage = page => {
    this.setState({ currentPage: page });
  };

  setdefaultPageSize = rows => {
    const defaultPageSize = rows === 'All' ? this.props.data.length : Number(rows);

    this.setState({ defaultPageSize }, () => this.setTotalPages());
  };

  setTotalPages() {
    this.setState({
      totalPages: getTotalPages(this.props.data.length, this.state.defaultPageSize)
    });
  }

  handleCheckboxChange = rowIndex => {
    const { selectedRows } = this.state;

    if (selectedRows.indexOf(rowIndex) < 0) {
      this.setState({ selectedRows: [...selectedRows, rowIndex] });
    } else {
      this.setState({
        selectedRows: selectedRows.filter(id => id !== rowIndex)
      });
    }
  };

  getVisibleGridRows() {
    const { currentPage, defaultPageSize, data } = this.state;

    return data
      .slice((currentPage - 1) * defaultPageSize, currentPage * defaultPageSize)
      .map(d => d.rowIndex);
  }

  checkAllBoxesSelected = () => {
    const visibleRows = this.getVisibleGridRows();

    if (!visibleRows.length) {
      return false;
    }

    return _intersection(visibleRows, this.state.selectedRows).length === visibleRows.length;
  };

  toggleAllCheckboxes = () => {
    const allChecked = this.checkAllBoxesSelected();
    const visibleRows = this.getVisibleGridRows();
    const { selectedRows } = this.state;

    if (!visibleRows.length) {
      return;
    }

    if (!allChecked) {
      const mergedArray = [...selectedRows, ...visibleRows];
      const uniqueArray = mergedArray.filter((item, pos) => mergedArray.indexOf(item) === pos);

      this.setState({ selectedRows: uniqueArray });
    } else {
      this.setState({
        selectedRows: selectedRows.filter(rowIndex => visibleRows.indexOf(rowIndex) === -1)
      });
    }
  };

  render() {
    const {
      currentPage,
      totalPages,
      defaultPageSize,
      sortColumn,
      sortDirection,
      data,
      selectedRows
    } = this.state;
    const {
      gridClass,
      columns,
      showPager,
      allowRowSelection,
      onRowSelect,
      onRowDeselect,
      subComponent,
      sortColumns,
      filterColumns
    } = this.props;

    return (
      <div className={classNames('flexgrid', { [gridClass]: gridClass })}>
        <Header
          columns={columns}
          sort={this.sort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          allowRowSelection={allowRowSelection}
          toggleAllCheckboxes={this.toggleAllCheckboxes}
          checkAllBoxesSelected={this.checkAllBoxesSelected}
          sortColumns={sortColumns}
          filterColumns={filterColumns}
          filter={this.filter}
        />

        {data.length > 0 && (
          <GridData
            columns={columns}
            data={data}
            defaultPageSize={defaultPageSize}
            currentPage={currentPage}
            allowRowSelection={allowRowSelection}
            onRowSelect={onRowSelect}
            onRowDeselect={onRowDeselect}
            handleCheckboxChange={this.handleCheckboxChange}
            selectedRows={selectedRows}
            subComponent={subComponent}
          />
        )}

        {showPager && (
          <Pager
            currentPage={currentPage}
            totalPages={totalPages}
            pageUp={this.pageUp}
            pageDown={this.pageDown}
            setPage={this.setPage}
            setdefaultPageSize={this.setdefaultPageSize}
            defaultPageSize={defaultPageSize}
          />
        )}
      </div>
    );
  }
}
