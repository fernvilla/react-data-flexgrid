"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require(".");

var _utils = require("./../utils");

var _intersection2 = require("lodash/intersection");

var _intersection3 = _interopRequireDefault(_intersection2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlexGrid = function (_Component) {
  _inherits(FlexGrid, _Component);

  function FlexGrid(props) {
    _classCallCheck(this, FlexGrid);

    var _this = _possibleConstructorReturn(this, (FlexGrid.__proto__ || Object.getPrototypeOf(FlexGrid)).call(this, props));

    _initialiseProps.call(_this);

    var currentPage = props.currentPage,
        defaultPageSize = props.defaultPageSize,
        data = props.data;


    _this.state = {
      currentPage: currentPage,
      defaultPageSize: defaultPageSize,
      totalPages: 1,
      sortDirection: null,
      sortColumn: null,
      data: data,
      selectedRows: []
    };
    return _this;
  }

  _createClass(FlexGrid, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var data = nextProps.data;


      if (this.props.data !== data) {
        var _state = this.state,
            defaultPageSize = _state.defaultPageSize,
            sortColumn = _state.sortColumn,
            sortDirection = _state.sortDirection;

        var totalPages = (0, _utils.getTotalPages)(data.length, defaultPageSize);
        var indexedData = data.map(function (d, i) {
          d.rowIndex = i;

          return d;
        });

        this.setState({ totalPages: totalPages, data: indexedData }, function () {
          _this2.sort(sortColumn, sortDirection);
        });

        if (totalPages < this.state.currentPage) {
          this.setPage(1);
        }
      }
    }
  }, {
    key: "setTotalPages",
    value: function setTotalPages() {
      this.setState({
        totalPages: (0, _utils.getTotalPages)(this.props.data.length, this.state.defaultPageSize)
      });
    }
  }, {
    key: "getVisibleGridRows",
    value: function getVisibleGridRows() {
      var _state2 = this.state,
          currentPage = _state2.currentPage,
          defaultPageSize = _state2.defaultPageSize,
          data = _state2.data;


      return data.slice((currentPage - 1) * defaultPageSize, currentPage * defaultPageSize).map(function (d) {
        return d.rowIndex;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _state3 = this.state,
          currentPage = _state3.currentPage,
          totalPages = _state3.totalPages,
          defaultPageSize = _state3.defaultPageSize,
          sortColumn = _state3.sortColumn,
          sortDirection = _state3.sortDirection,
          data = _state3.data,
          selectedRows = _state3.selectedRows;
      var _props = this.props,
          gridClass = _props.gridClass,
          columns = _props.columns,
          filterable = _props.filterable,
          showPager = _props.showPager,
          allowRowSelection = _props.allowRowSelection,
          onRowSelect = _props.onRowSelect,
          onRowDeselect = _props.onRowDeselect,
          subComponent = _props.subComponent;


      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)("flexgrid", _defineProperty({}, gridClass, gridClass)) },
        filterable && _react2.default.createElement(_.Search, { filter: this.filter }),
        _react2.default.createElement(_.Header, {
          columns: columns,
          sort: this.sort,
          sortColumn: sortColumn,
          sortDirection: sortDirection,
          allowRowSelection: allowRowSelection,
          toggleAllCheckboxes: this.toggleAllCheckboxes,
          checkAllBoxesSelected: this.checkAllBoxesSelected
        }),
        data.length > 0 && _react2.default.createElement(_.GridData, {
          columns: columns,
          data: data,
          defaultPageSize: defaultPageSize,
          currentPage: currentPage,
          allowRowSelection: allowRowSelection,
          onRowSelect: onRowSelect,
          onRowDeselect: onRowDeselect,
          handleCheckboxChange: this.handleCheckboxChange,
          selectedRows: selectedRows,
          subComponent: subComponent
        }),
        showPager && _react2.default.createElement(_.Pager, {
          currentPage: currentPage,
          totalPages: totalPages,
          pageUp: this.pageUp,
          pageDown: this.pageDown,
          setPage: this.setPage,
          setdefaultPageSize: this.setdefaultPageSize,
          defaultPageSize: defaultPageSize
        })
      );
    }
  }]);

  return FlexGrid;
}(_react.Component);

FlexGrid.propTypes = {
  columns: _propTypes2.default.array.isRequired,
  data: _propTypes2.default.array.isRequired,
  defaultPageSize: _propTypes2.default.number,
  currentPage: _propTypes2.default.number,
  sortableCols: _propTypes2.default.array,
  gridClass: _propTypes2.default.string,
  filterable: _propTypes2.default.bool,
  showPager: _propTypes2.default.bool,
  subComponent: _propTypes2.default.func,
  columnFilters: function columnFilters(props, propName) {
    if (props["filterable"] === true && !props[propName].length) {
      return new Error("[columnFilters] array prop required when [filterable] prop is set to true.");
    }
  },
  allowRowSelection: _propTypes2.default.bool,
  onRowSelect: function onRowSelect(props, propName) {
    if (props["allowRowSelection"] === true && !props[propName].length) {
      return new Error("[allowRowSelection] needs to be set to true to use [onRowSelect]");
    }
  },
  onRowDeselect: function onRowDeselect(props, propName) {
    if (props["allowRowSelection"] === true && !props[propName].length) {
      return new Error("[allowRowSelection] needs to be set to true to use [onRowDeselect]");
    }
  }
};
FlexGrid.defaultProps = {
  defaultPageSize: 10,
  currentPage: 1,
  sortableCols: [],
  gridClass: null,
  filterable: false,
  showPager: true,
  columnFilters: [],
  allowRowSelection: false,
  onRowSelect: null,
  onRowDeselect: null,
  subComponent: null
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.filter = function (text) {
    var _props2 = _this3.props,
        data = _props2.data,
        columnFilters = _props2.columnFilters;

    var filteredData = (0, _utils.filterData)(data, columnFilters, text);

    _this3.setState({
      currentPage: 1,
      data: !text.length ? _this3.props.data : filteredData
    });
  };

  this.sort = function (column, direction) {
    var _state4 = _this3.state,
        sortDirection = _state4.sortDirection,
        sortColumn = _state4.sortColumn;


    if (direction === sortDirection && column === sortColumn) return;

    _this3.setState({
      data: (0, _utils.sortData)(_this3.props.data, column, direction),
      sortColumn: column,
      sortDirection: direction
    });
  };

  this.pageUp = function () {
    var _state5 = _this3.state,
        currentPage = _state5.currentPage,
        totalPages = _state5.totalPages;


    if (currentPage === totalPages) return;

    _this3.setPage(currentPage + 1);
  };

  this.pageDown = function () {
    var currentPage = _this3.state.currentPage;


    if (currentPage === 1) return;

    _this3.setPage(currentPage - 1);
  };

  this.setPage = function (page) {
    _this3.setState({ currentPage: page });
  };

  this.setdefaultPageSize = function (rows) {
    var defaultPageSize = rows === "All" ? _this3.props.data.length : Number(rows);

    _this3.setState({ defaultPageSize: defaultPageSize }, function () {
      return _this3.setTotalPages();
    });
  };

  this.handleCheckboxChange = function (rowIndex) {
    var selectedRows = _this3.state.selectedRows;


    if (selectedRows.indexOf(rowIndex) < 0) {
      _this3.setState({ selectedRows: [].concat(_toConsumableArray(selectedRows), [rowIndex]) });
    } else {
      _this3.setState({
        selectedRows: selectedRows.filter(function (id) {
          return id !== rowIndex;
        })
      });
    }
  };

  this.checkAllBoxesSelected = function () {
    var visibleRows = _this3.getVisibleGridRows();

    if (!visibleRows.length) {
      return false;
    }

    return (0, _intersection3.default)(visibleRows, _this3.state.selectedRows).length === visibleRows.length;
  };

  this.toggleAllCheckboxes = function () {
    var allChecked = _this3.checkAllBoxesSelected();
    var visibleRows = _this3.getVisibleGridRows();
    var selectedRows = _this3.state.selectedRows;


    if (!visibleRows.length) {
      return;
    }

    if (!allChecked) {
      var mergedArray = [].concat(_toConsumableArray(selectedRows), _toConsumableArray(visibleRows));
      var uniqueArray = mergedArray.filter(function (item, pos) {
        return mergedArray.indexOf(item) === pos;
      });

      _this3.setState({ selectedRows: uniqueArray });
    } else {
      _this3.setState({
        selectedRows: selectedRows.filter(function (rowIndex) {
          return visibleRows.indexOf(rowIndex) === -1;
        })
      });
    }
  };
};

exports.default = FlexGrid;