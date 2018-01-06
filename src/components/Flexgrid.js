import React, { Component } from "react";
import PropTypes from "prop-types";
import Pager from "./Pager";

export default class Flexflexgrid extends Component {
  static propTypes = {
    columnMetadata: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    rowsPerPage: PropTypes.number,
    currentPage: PropTypes.number
  };

  static defaultProps = {
    rowsPerPage: 10,
    currentPage: 1
  };

  constructor(props) {
    super(props);

    this.state = {
      page: props.currentPage,
      rowsPerPage: props.rowsPerPage,
      totalPages: Math.ceil(props.data.length / props.rowsPerPage)
    };

    this.pageUp = this.pageUp.bind(this);
    this.pageDown = this.pageDown.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { data, rowsPerPage } = nextProps;

    this.setState({ totalPages: Math.ceil(data.length / rowsPerPage) });
  }

  pageUp() {
    const { page, totalPages } = this.state;

    if (page === totalPages) return null;

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
    const { page, totalPages } = this.state;

    return (
      <div className="flexgrid">
        {this.renderHeader()}
        {this.renderData()}
        <Pager
          page={page}
          totalPages={totalPages}
          pageUp={this.pageUp}
          pageDown={this.pageDown}
          setPage={this.setPage}
        />
      </div>
    );
  }
}
