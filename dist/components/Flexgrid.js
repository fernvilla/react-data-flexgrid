'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require('.');

var _utils = require('./../utils');

var _constants = require('./../constants');

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _debounce2 = require('lodash/debounce');

var _debounce3 = _interopRequireDefault(_debounce2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlexGrid = function (_Component) {
  _inherits(FlexGrid, _Component);

  function FlexGrid(props) {
    _classCallCheck(this, FlexGrid);

    var _this = _possibleConstructorReturn(this, (FlexGrid.__proto__ || Object.getPrototypeOf(FlexGrid)).call(this, props));

    _initialiseProps.call(_this);

    var data = props.data,
        rowsPerPage = props.rowsPerPage;

    //Keep copy to reset sorting

    _this.initialData = [].concat(_toConsumableArray(data));

    _this.state = {
      currentPage: 1,
      totalPages: (0, _utils.calcualteTotalPages)(data.length, rowsPerPage),
      searchText: '',
      rowsPerPage: Number(rowsPerPage),
      sortDirection: null,
      sortedColumn: null,
      data: data
    };

    _this.setSearchText = (0, _debounce3.default)(_this.setSearchText, 250);
    return _this;
  }

  _createClass(FlexGrid, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var data = nextProps.data;


      if (!(0, _isEqual3.default)(this.props.data, data)) {
        this.initialData = [].concat(_toConsumableArray(data));
        var _state = this.state,
            rowsPerPage = _state.rowsPerPage,
            currentPage = _state.currentPage;

        var totalPages = (0, _utils.calcualteTotalPages)(data.length, rowsPerPage);

        this.setState({ totalPages: totalPages, data: data }, function () {
          return _this2.resetSort();
        });

        if (totalPages < currentPage) this.setCurrentPage(1);
      }
    }
  }, {
    key: 'resetSort',
    value: function resetSort() {
      this.setState({ sortedColumn: null, sortDirection: null, data: this.initialData });
    }
  }, {
    key: 'setTotalPages',
    value: function setTotalPages() {
      var data = this.props.data;
      var rowsPerPage = this.state.rowsPerPage;


      this.setState({
        totalPages: (0, _utils.calcualteTotalPages)(data.length, rowsPerPage)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          columns = _props.columns,
          data = _props.data,
          allowSearch = _props.allowSearch,
          sort = _props.sort;
      var _state2 = this.state,
          rowsPerPage = _state2.rowsPerPage,
          currentPage = _state2.currentPage,
          totalPages = _state2.totalPages,
          sortedColumn = _state2.sortedColumn,
          sortDirection = _state2.sortDirection;


      return _react2.default.createElement(
        'div',
        { className: 'fg' },
        _react2.default.createElement(
          'div',
          { className: 'fg-attached-header' },
          _react2.default.createElement(_.RowsToggle, { setRowsPerPage: this.setRowsPerPage, rowsPerPage: rowsPerPage }),
          allowSearch && _react2.default.createElement(_.Search, { setSearchText: this.setSearchText })
        ),
        _react2.default.createElement(
          'div',
          { className: 'fg-grid' },
          _react2.default.createElement(_.Header, {
            columns: columns,
            sortData: this.sortData,
            sortedColumn: sortedColumn,
            sortDirection: sortDirection,
            sort: sort
          }),
          _react2.default.createElement(_.DataRows, _extends({}, this.props, this.state))
        ),
        _react2.default.createElement(_.Footer, {
          currentPage: currentPage,
          dataLength: data.length,
          rowsPerPage: rowsPerPage,
          totalPages: totalPages,
          setPageUp: this.setPageUp,
          setPageDown: this.setPageDown,
          setCurrentPage: this.setCurrentPage
        })
      );
    }
  }]);

  return FlexGrid;
}(_react.Component);

FlexGrid.propTypes = {
  columns: _propTypes2.default.array.isRequired,
  sort: _propTypes2.default.object.isRequired,
  allowSearch: _propTypes2.default.bool,
  rowsPerPage: _propTypes2.default.number,
  searchOptions: _propTypes2.default.object,
  searchKeys: _propTypes2.default.array,
  cells: _propTypes2.default.func.isRequired
};
FlexGrid.defaultProps = {
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
  searchKeys: []
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.setSearchText = function (text) {
    _this3.setState({ searchText: text });
  };

  this.setCurrentPage = function (page) {
    _this3.setState({ currentPage: page });
  };

  this.setRowsPerPage = function (rows) {
    var data = _this3.props.data;

    var rowsPerPage = rows === 'All' ? data.length : Number(rows);

    _this3.setState({ rowsPerPage: rowsPerPage }, function () {
      return _this3.setTotalPages();
    });
  };

  this.sortData = function (column) {
    var _props2 = _this3.props,
        data = _props2.data,
        sort = _props2.sort;


    _this3.setState(function (prevState) {
      var sortDirection = prevState.sortDirection,
          sortedColumn = prevState.sortedColumn;

      var direction = function direction() {
        //Set initial sort direction when new column selected or changed
        if (!sortDirection || column !== sortedColumn) return _constants.ascendString;

        return sortDirection === _constants.ascendString ? _constants.descendString : null;
      };

      return {
        data: !direction() ? _this3.initialData : (0, _utils.sortData)(data, column, direction(), sort),
        sortedColumn: column,
        sortDirection: direction()
      };
    });
  };

  this.setPageUp = function () {
    var _state3 = _this3.state,
        currentPage = _state3.currentPage,
        totalPages = _state3.totalPages;


    if (currentPage === totalPages) return;

    _this3.setCurrentPage(currentPage + 1);
  };

  this.setPageDown = function () {
    var currentPage = _this3.state.currentPage;


    if (currentPage === 1) return;

    _this3.setCurrentPage(currentPage - 1);
  };
};

exports.default = FlexGrid;