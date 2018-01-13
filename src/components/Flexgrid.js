import React, { Component } from "react";
import PropTypes from "prop-types";
import Pager from "./Pager";
import Header from "./Header";
import Filter from "./Filter";
import GridData from "./GridData";
import { getTotalPages, sortData, filterData } from "./../utils";

export default class Flexflexgrid extends Component {
  static propTypes = {
    columnMetadata: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    rowsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    sortableCols: PropTypes.array,
    gridClass: PropTypes.string,
    filterable: PropTypes.bool
  };

  static defaultProps = {
    rowsPerPage: 10,
    currentPage: 1,
    sortableCols: [],
    gridClass: "",
    filterable: false
  };

  constructor(props) {
    super(props);

    this.state = {
      page: props.currentPage,
      rowsPerPage: props.rowsPerPage,
      totalPages: getTotalPages(props.data.length, props.rowsPerPage),
      sortDirection: null,
      sortColumn: null,
      data: props.data
    };

    this.pageUp = this.pageUp.bind(this);
    this.pageDown = this.pageDown.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setRowsPerPage = this.setRowsPerPage.bind(this);
    this.sort = this.sort.bind(this);
    this.filter = this.filter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    const { rowsPerPage, sortColumn, sortDirection } = this.state;
    const totalPages = getTotalPages(data.length, rowsPerPage);

    this.setState({ totalPages: totalPages, data }, () => {
      this.sort(sortColumn, sortDirection);
    });

    if (totalPages < this.state.page) {
      this.setPage(1);
    }
  }

  filter(column, text) {
    const data = filterData(this.props.data, column, text);

    this.setState({ data: !text.length ? this.props.data : data });
  }

  sort(column, direction) {
    if (!column || !direction || direction === this.state.sortDirection) return;

    const data = sortData(this.props.data, column, direction);

    this.setState({
      data,
      sortColumn: column,
      sortDirection: direction
    });
  }

  pageUp() {
    const { page, totalPages } = this.state;

    if (page === totalPages) return;

    this.setPage(page + 1);
  }

  pageDown() {
    const { page } = this.state;

    if (page === 1) return;

    this.setPage(page - 1);
  }

  setPage(page) {
    this.setState({ page });
  }

  setRowsPerPage(rows) {
    const rowsPerPage = rows === "All" ? this.props.data.length : Number(rows);

    this.setState({ rowsPerPage }, () => this.setTotalPages());
  }

  setTotalPages() {
    this.setState({
      totalPages: getTotalPages(this.props.data.length, this.state.rowsPerPage)
    });
  }

  render() {
    const {
      page,
      totalPages,
      rowsPerPage,
      sortColumn,
      sortDirection,
      data
    } = this.state;
    const { gridClass, columnMetadata, filterable } = this.props;

    return (
      <div className={`flexgrid ${gridClass}`}>
        <Header
          columnMetadata={columnMetadata}
          sort={this.sort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />

        {filterable && (
          <Filter columnMetadata={columnMetadata} filter={this.filter} />
        )}

        <GridData
          columnMetadata={columnMetadata}
          data={data}
          rowsPerPage={rowsPerPage}
          page={page}
        />

        <Pager
          page={page}
          totalPages={totalPages}
          pageUp={this.pageUp}
          pageDown={this.pageDown}
          setPage={this.setPage}
          setRowsPerPage={this.setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  }
}
