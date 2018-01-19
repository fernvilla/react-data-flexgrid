import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Pager, GridData, Search, Header } from ".";
import { getTotalPages, sortData, filterData } from "./../utils";

export default class FlexGrid extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    defaultPageSize: PropTypes.number,
    currentPage: PropTypes.number,
    sortableCols: PropTypes.array,
    gridClass: PropTypes.string,
    filterable: PropTypes.bool,
    showPager: PropTypes.bool,
    columnFilters: (props, propName) => {
      if (props["filterable"] === true && !props[propName].length) {
        return new Error(
          "[columnFilters] array prop required when [filterable] prop is set to true."
        );
      }
    }
  };

  static defaultProps = {
    defaultPageSize: 10,
    currentPage: 1,
    sortableCols: [],
    gridClass: null,
    filterable: false,
    showPager: true,
    columnFilters: []
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
      data
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;

    if (this.props.data !== data) {
      const { defaultPageSize, sortColumn, sortDirection } = this.state;
      const totalPages = getTotalPages(data.length, defaultPageSize);

      this.setState({ totalPages: totalPages, data }, () => {
        this.sort(sortColumn, sortDirection);
      });

      if (totalPages < this.state.currentPage) {
        this.setPage(1);
      }
    }
  }

  filter = text => {
    const { data, columnFilters } = this.props;
    const filteredData = filterData(data, columnFilters, text);

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
    const defaultPageSize =
      rows === "All" ? this.props.data.length : Number(rows);

    this.setState({ defaultPageSize }, () => this.setTotalPages());
  };

  setTotalPages() {
    this.setState({
      totalPages: getTotalPages(
        this.props.data.length,
        this.state.defaultPageSize
      )
    });
  }

  render() {
    const {
      currentPage,
      totalPages,
      defaultPageSize,
      sortColumn,
      sortDirection,
      data
    } = this.state;

    const { gridClass, columns, filterable, showPager } = this.props;

    return (
      <div className={classNames("flexgrid", { [gridClass]: gridClass })}>
        <Search filter={this.filter} filterable={filterable} />

        <Header
          columns={columns}
          sort={this.sort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />

        <GridData
          columns={columns}
          data={data}
          defaultPageSize={defaultPageSize}
          currentPage={currentPage}
        />

        <Pager
          currentPage={currentPage}
          totalPages={totalPages}
          pageUp={this.pageUp}
          pageDown={this.pageDown}
          setPage={this.setPage}
          setdefaultPageSize={this.setdefaultPageSize}
          defaultPageSize={defaultPageSize}
          showPager={showPager}
        />
      </div>
    );
  }
}
