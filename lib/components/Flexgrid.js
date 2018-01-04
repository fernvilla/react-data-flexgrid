import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Flexflexgrid extends Component {
  static propTypes = {
    columnMetadata: PropTypes.array,
    data: PropTypes.array,
    rowsPerPage: PropTypes.number,
    currentPage: PropTypes.number
  };

  static defaultProps = {
    columnMetadata: [],
    data: [],
    rowsPerPage: 10,
    currentPage: 1
  };

  constructor(props) {
    super(props);

    this.state = { page: props.currentPage, rowsPerPage: props.rowsPerPage };
    this.totalPages = Math.ceil(props.data.length / props.rowsPerPage);
  }

  pageUp() {
    const { page } = this.state;

    if (page === this.totalPages) return null;

    this.setPage(page + 1);
  }

  pageDown() {
    const { page } = this.state;

    if (page === 1) return null;

    this.setPage(page - 1);
  }

  setPage(page) {
    this.setState({ page });
  }

  renderHeader() {
    const { columnMetadata } = this.props;

    return (
      <div className="flexgrid-header">
        {columnMetadata.map((column, i) => {
          const style = column.style || null;

          return (
            <span className="flexgrid-header-item" key={i} style={style}>
              {column.displayName}
            </span>
          );
        })}
      </div>
    );
  }

  renderData() {
    const { columnMetadata, data, rowsPerPage } = this.props;
    const { page } = this.state;
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

  renderPagination() {
    return (
      <div className="flexgrid-footer">
        <div>
          <span className="page-toggle" onClick={() => this.setPage(1)}>
            &laquo;
          </span>
          <span className="page-toggle" onClick={() => this.pageDown()}>
            &lsaquo;
          </span>
          Page {this.state.page} of {this.totalPages}
          <span className="page-toggle" onClick={() => this.pageUp()}>
            &rsaquo;
          </span>
          <span
            className="page-toggle"
            onClick={() => this.setPage(this.totalPages)}
          >
            &raquo;
          </span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="flexgrid">
        {this.renderHeader()}
        {this.renderData()}
        {this.renderPagination()}
      </div>
    );
  }
}
