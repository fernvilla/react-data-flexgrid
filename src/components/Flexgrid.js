import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Pager from "./Pager";
import Header from "./Header";
import Filter from "./Filter";
import GridData from "./GridData";
import { getTotalPages, sortData, filterData } from "./../utils";

export default class Flexflexgrid extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    defaultPageSize: PropTypes.number,
    currentPage: PropTypes.number,
    sortableCols: PropTypes.array,
    gridClass: PropTypes.string,
    filterable: PropTypes.bool,
    showPager: PropTypes.bool
  };

  static defaultProps = {
    defaultPageSize: 10,
    currentPage: 1,
    sortableCols: [],
    gridClass: null,
    filterable: false,
    showPager: true
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

  filter = (column, text) => {
    const data = filterData(this.props.data, column, text);

    this.setState({
      currentPage: 1,
      data: !text.length ? this.props.data : data
    });
  };

  sort = (column, direction) => {
    if (!column || !direction || direction === this.state.sortDirection) return;

    const data = sortData(this.props.data, column, direction);

    this.setState({
      data,
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
        <Header
          columns={columns}
          sort={this.sort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />

        {filterable && <Filter columns={columns} filter={this.filter} />}

        <GridData
          columns={columns}
          data={data}
          defaultPageSize={defaultPageSize}
          currentPage={currentPage}
        />

        {showPager && (
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
        )}
      </div>
    );
  }
}
