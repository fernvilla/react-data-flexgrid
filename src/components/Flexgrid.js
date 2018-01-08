import React, { Component } from "react";
import PropTypes from "prop-types";
import Pager from "./Pager";
import Header from "./Header";
import { getTotalPages } from "./../utils";

export default class Flexflexgrid extends Component {
  static propTypes = {
    columnMetadata: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    rowsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    sort: PropTypes.array,
    className: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    rowsPerPage: 10,
    currentPage: 1,
    sort: [],
    className: "",
    style: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      page: props.currentPage,
      rowsPerPage: props.rowsPerPage,
      totalPages: getTotalPages(props.data.length, props.rowsPerPage)
    };

    this.pageUp = this.pageUp.bind(this);
    this.pageDown = this.pageDown.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setRowsPerPage = this.setRowsPerPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    const totalPages = getTotalPages(data.length, this.state.rowsPerPage);

    this.setState({ totalPages: totalPages });

    if (totalPages < this.state.page) {
      this.setPage(1);
    }
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
    const { page, totalPages, rowsPerPage } = this.state;
    const { className, style, columnMetadata } = this.props;

    return (
      <div className={`flexgrid ${className}`} style={style}>
        <Header columnMetadata={columnMetadata} />

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
