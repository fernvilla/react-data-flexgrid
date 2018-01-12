import React, { Component } from "react";
import PropTypes from "prop-types";
import Pager from "./Pager";
import Header from "./Header";
import { getTotalPages, sortData } from "./../utils";

export default class Flexflexgrid extends Component {
  static propTypes = {
    columnMetadata: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    rowsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    sortableCols: PropTypes.array,
    className: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    rowsPerPage: 10,
    currentPage: 1,
    sortableCols: [],
    className: "",
    data: []
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

  sort(column, direction) {
    if (!column || !direction || direction === this.state.sortDirection) return;

    this.setState({
      data: sortData(this.props.data, column, direction),
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

  renderData() {
    const { columnMetadata, data } = this.props;
    const { page, rowsPerPage } = this.state;

    if (!data.length) return null;

    const pagedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return pagedData.map((d, i) => (
      <div className="flexgrid-row" key={i}>
        {columnMetadata.map((column, i) => {
          const style = column.style || null;

          return (
            <span className="flexgrid-header-item" key={i} style={style}>
              {d[column.columnName]}
            </span>
          );
        })}
      </div>
    ));
  }

  render() {
    const {
      page,
      totalPages,
      rowsPerPage,
      sortColumn,
      sortDirection
    } = this.state;
    const { className, columnMetadata, sortableCols } = this.props;

    return (
      <div className={`flexgrid ${className}`}>
        <Header
          columnMetadata={columnMetadata}
          sort={this.sort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />

        {this.renderData()}

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
