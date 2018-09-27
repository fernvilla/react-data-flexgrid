import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, DataRows, Footer, Search, RowsToggle } from '.';
import { calcualteTotalPages, sortData } from './../utils';
import { descendString, ascendString } from './../constants';
import _isEqual from 'lodash/isEqual';
import _debounce from 'lodash/debounce';

export default class FlexGrid extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    cells: PropTypes.func.isRequired,
    sort: PropTypes.object,
    allowSearch: PropTypes.bool,
    rowsPerPage: PropTypes.number,
    searchOptions: PropTypes.object,
    searchKeys: PropTypes.array,
    subComponent: PropTypes.func
  };

  static defaultProps = {
    rowsPerPage: 10,
    allowSearch: true,
    searchOptions: {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1
    },
    searchKeys: [],
    sort: null,
    subComponent: null
  };

  constructor(props) {
    super(props);

    const { data, rowsPerPage } = props;

    //Keep copy to reset sorting
    this.initialData = [...data];

    this.state = {
      currentPage: 1,
      totalPages: calcualteTotalPages(data.length, rowsPerPage),
      searchText: '',
      rowsPerPage: Number(rowsPerPage),
      sortDirection: null,
      sortedColumn: null,
      data
    };

    this.setSearchText = _debounce(this.setSearchText, 250);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;

    if (!_isEqual(this.props.data, data)) {
      this.initialData = [...data];
      const { rowsPerPage, currentPage } = this.state;
      const totalPages = calcualteTotalPages(data.length, rowsPerPage);
      const indexedData = data.map((d, i) => (d.rowIndex = i));

      this.setState({ totalPages, indexedData }, () => this.resetSort());

      if (totalPages < currentPage) this.setCurrentPage(1);
    }
  }

  resetSort() {
    this.setState({ sortedColumn: null, sortDirection: null, data: this.initialData });
  }

  setSearchText = text => {
    this.setState({ searchText: text });
  };

  setCurrentPage = page => {
    this.setState({ currentPage: page });
  };

  setRowsPerPage = rows => {
    const { data } = this.props;
    const rowsPerPage = rows === 'All' ? data.length : Number(rows);

    this.setState({ rowsPerPage }, () => this.setTotalPages());
  };

  setTotalPages() {
    const { data } = this.props;
    const { rowsPerPage } = this.state;

    this.setState({
      totalPages: calcualteTotalPages(data.length, rowsPerPage)
    });
  }

  sortData = column => {
    const { data, sort } = this.props;

    this.setState(prevState => {
      const { sortDirection, sortedColumn } = prevState;
      const direction = () => {
        //Set initial sort direction when new column selected or changed
        if (!sortDirection || column !== sortedColumn) return ascendString;

        return sortDirection === ascendString ? descendString : null;
      };

      return {
        data: !direction() ? this.initialData : sortData(data, column, direction(), sort),
        sortedColumn: column,
        sortDirection: direction()
      };
    });
  };

  setPageUp = () => {
    const { currentPage, totalPages } = this.state;

    if (currentPage === totalPages) return;

    this.setCurrentPage(currentPage + 1);
  };

  setPageDown = () => {
    const { currentPage } = this.state;

    if (currentPage === 1) return;

    this.setCurrentPage(currentPage - 1);
  };

  render() {
    const { columns, data, allowSearch, sort } = this.props;
    const { rowsPerPage, currentPage, totalPages, sortedColumn, sortDirection } = this.state;

    return (
      <div className="fg">
        <div className="fg-attached-header">
          <RowsToggle setRowsPerPage={this.setRowsPerPage} rowsPerPage={rowsPerPage} />

          {allowSearch && <Search setSearchText={this.setSearchText} />}
        </div>

        <div className="fg-grid">
          <Header
            columns={columns}
            sortData={this.sortData}
            sortedColumn={sortedColumn}
            sortDirection={sortDirection}
            sort={sort}
          />

          <DataRows {...this.props} {...this.state} />
        </div>

        <Footer
          currentPage={currentPage}
          dataLength={data.length}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setPageUp={this.setPageUp}
          setPageDown={this.setPageDown}
          setCurrentPage={this.setCurrentPage}
        />
      </div>
    );
  }
}
