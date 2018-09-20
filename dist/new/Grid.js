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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

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
      sortColumn: null
    };
    return _this;
  }

  _createClass(Grid, [{
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
          allowSearch = _props.allowSearch;
      var _state = this.state,
          rowsPerPage = _state.rowsPerPage,
          currentPage = _state.currentPage,
          totalPages = _state.totalPages;


      return _react2.default.createElement(
        'div',
        { className: 'flexgrid' },
        _react2.default.createElement(
          'div',
          { className: 'flexgrid-attached-header' },
          _react2.default.createElement(_.RowsToggle, { setRowsPerPage: this.setRowsPerPage, rowsPerPage: rowsPerPage }),
          allowSearch && _react2.default.createElement(_.Search, { setSearchText: this.setSearchText })
        ),
        _react2.default.createElement(
          'div',
          { className: 'flexgrid-grid' },
          _react2.default.createElement(_.Header, { columns: columns, sortData: this.sortData }),
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

  return Grid;
}(_react.Component);

Grid.propTypes = {
  columns: _propTypes2.default.array.isRequired,
  allowSearch: _propTypes2.default.bool,
  rowsPerPage: _propTypes2.default.number,
  searchOptions: _propTypes2.default.object,
  searchKeys: _propTypes2.default.array
};
Grid.defaultProps = {
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
  var _this2 = this;

  this.setSearchText = function (text) {
    _this2.setState({ searchText: text });
  };

  this.setCurrentPage = function (page) {
    _this2.setState({ currentPage: page });
  };

  this.setRowsPerPage = function (rows) {
    var data = _this2.props.data;

    var rowsPerPage = rows === 'All' ? data.length : Number(rows);

    _this2.setState({ rowsPerPage: rowsPerPage }, function () {
      return _this2.setTotalPages();
    });
  };

  this.sortData = function (column) {
    var data = _this2.props.data;


    _this2.setState(function (prevState) {
      var sortDirection = prevState.sortDirection,
          sortColumn = prevState.sortColumn;

      var direction = function direction() {
        //Set initial sort direction when new column selected or changed
        if (!sortDirection || column !== sortColumn) return _constants.ascendString;

        return sortDirection === _constants.ascendString ? _constants.descendString : null;
      };

      return {
        data: !direction() ? _this2.initialData : (0, _utils.sortData)(data, column, direction()),
        sortColumn: column,
        sortDirection: direction()
      };
    });
  };

  this.setPageUp = function () {
    var _state2 = _this2.state,
        currentPage = _state2.currentPage,
        totalPages = _state2.totalPages;


    if (currentPage === totalPages) return;

    _this2.setCurrentPage(currentPage + 1);
  };

  this.setPageDown = function () {
    var currentPage = _this2.state.currentPage;


    if (currentPage === 1) return;

    _this2.setCurrentPage(currentPage - 1);
  };
};

exports.default = Grid;