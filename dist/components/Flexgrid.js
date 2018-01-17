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

var _Pager = require("./Pager");

var _Pager2 = _interopRequireDefault(_Pager);

var _Header = require("./Header");

var _Header2 = _interopRequireDefault(_Header);

var _Filter = require("./Filter");

var _Filter2 = _interopRequireDefault(_Filter);

var _GridData = require("./GridData");

var _GridData2 = _interopRequireDefault(_GridData);

var _utils = require("./../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flexflexgrid = function (_Component) {
  _inherits(Flexflexgrid, _Component);

  function Flexflexgrid(props) {
    _classCallCheck(this, Flexflexgrid);

    var _this = _possibleConstructorReturn(this, (Flexflexgrid.__proto__ || Object.getPrototypeOf(Flexflexgrid)).call(this, props));

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
      data: data
    };
    return _this;
  }

  _createClass(Flexflexgrid, [{
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

        this.setState({ totalPages: totalPages, data: data }, function () {
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
    key: "render",
    value: function render() {
      var _state2 = this.state,
          currentPage = _state2.currentPage,
          totalPages = _state2.totalPages,
          defaultPageSize = _state2.defaultPageSize,
          sortColumn = _state2.sortColumn,
          sortDirection = _state2.sortDirection,
          data = _state2.data;
      var _props = this.props,
          gridClass = _props.gridClass,
          columns = _props.columns,
          filterable = _props.filterable,
          showPager = _props.showPager;


      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)("flexgrid", _defineProperty({}, gridClass, gridClass)) },
        _react2.default.createElement(_Header2.default, {
          columns: columns,
          sort: this.sort,
          sortColumn: sortColumn,
          sortDirection: sortDirection
        }),
        filterable && _react2.default.createElement(_Filter2.default, { columns: columns, filter: this.filter }),
        _react2.default.createElement(_GridData2.default, {
          columns: columns,
          data: data,
          defaultPageSize: defaultPageSize,
          currentPage: currentPage
        }),
        showPager && _react2.default.createElement(_Pager2.default, {
          currentPage: currentPage,
          totalPages: totalPages,
          pageUp: this.pageUp,
          pageDown: this.pageDown,
          setPage: this.setPage,
          setdefaultPageSize: this.setdefaultPageSize,
          defaultPageSize: defaultPageSize,
          showPager: showPager
        })
      );
    }
  }]);

  return Flexflexgrid;
}(_react.Component);

Flexflexgrid.propTypes = {
  columns: _propTypes2.default.array.isRequired,
  data: _propTypes2.default.array.isRequired,
  defaultPageSize: _propTypes2.default.number,
  currentPage: _propTypes2.default.number,
  sortableCols: _propTypes2.default.array,
  gridClass: _propTypes2.default.string,
  filterable: _propTypes2.default.bool,
  showPager: _propTypes2.default.bool
};
Flexflexgrid.defaultProps = {
  defaultPageSize: 10,
  currentPage: 1,
  sortableCols: [],
  gridClass: null,
  filterable: false,
  showPager: true
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.filter = function (column, text) {
    var data = (0, _utils.filterData)(_this3.props.data, column, text);

    _this3.setState({
      currentPage: 1,
      data: !text.length ? _this3.props.data : data
    });
  };

  this.sort = function (column, direction) {
    if (!column || !direction || direction === _this3.state.sortDirection) return;

    var data = (0, _utils.sortData)(_this3.props.data, column, direction);

    _this3.setState({
      data: data,
      sortColumn: column,
      sortDirection: direction
    });
  };

  this.pageUp = function () {
    var _state3 = _this3.state,
        currentPage = _state3.currentPage,
        totalPages = _state3.totalPages;


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
};

exports.default = Flexflexgrid;