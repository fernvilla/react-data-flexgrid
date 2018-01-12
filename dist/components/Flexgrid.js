"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Pager = require("./Pager");

var _Pager2 = _interopRequireDefault(_Pager);

var _Header = require("./Header");

var _Header2 = _interopRequireDefault(_Header);

var _utils = require("./../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flexflexgrid = function (_Component) {
  _inherits(Flexflexgrid, _Component);

  function Flexflexgrid(props) {
    _classCallCheck(this, Flexflexgrid);

    var _this = _possibleConstructorReturn(this, (Flexflexgrid.__proto__ || Object.getPrototypeOf(Flexflexgrid)).call(this, props));

    _this.state = {
      page: props.currentPage,
      rowsPerPage: props.rowsPerPage,
      totalPages: (0, _utils.getTotalPages)(props.data.length, props.rowsPerPage),
      sortDirection: null,
      sortColumn: null,
      data: props.data
    };

    _this.pageUp = _this.pageUp.bind(_this);
    _this.pageDown = _this.pageDown.bind(_this);
    _this.setPage = _this.setPage.bind(_this);
    _this.setRowsPerPage = _this.setRowsPerPage.bind(_this);
    _this.sort = _this.sort.bind(_this);
    return _this;
  }

  _createClass(Flexflexgrid, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var data = nextProps.data;
      var _state = this.state,
          rowsPerPage = _state.rowsPerPage,
          sortColumn = _state.sortColumn,
          sortDirection = _state.sortDirection;

      var totalPages = (0, _utils.getTotalPages)(data.length, rowsPerPage);

      this.setState({ totalPages: totalPages, data: data }, function () {
        _this2.sort(sortColumn, sortDirection);
      });

      if (totalPages < this.state.page) {
        this.setPage(1);
      }
    }
  }, {
    key: "sort",
    value: function sort(column, direction) {
      if (!column || !direction || direction === this.state.sortDirection) return;

      this.setState({
        data: (0, _utils.sortData)(this.props.data, column, direction),
        sortColumn: column,
        sortDirection: direction
      });
    }
  }, {
    key: "pageUp",
    value: function pageUp() {
      var _state2 = this.state,
          page = _state2.page,
          totalPages = _state2.totalPages;


      if (page === totalPages) return;

      this.setPage(page + 1);
    }
  }, {
    key: "pageDown",
    value: function pageDown() {
      var page = this.state.page;


      if (page === 1) return;

      this.setPage(page - 1);
    }
  }, {
    key: "setPage",
    value: function setPage(page) {
      this.setState({ page: page });
    }
  }, {
    key: "setRowsPerPage",
    value: function setRowsPerPage(rows) {
      var _this3 = this;

      var rowsPerPage = rows === "All" ? this.props.data.length : Number(rows);

      this.setState({ rowsPerPage: rowsPerPage }, function () {
        return _this3.setTotalPages();
      });
    }
  }, {
    key: "setTotalPages",
    value: function setTotalPages() {
      this.setState({
        totalPages: (0, _utils.getTotalPages)(this.props.data.length, this.state.rowsPerPage)
      });
    }
  }, {
    key: "renderData",
    value: function renderData() {
      var _props = this.props,
          columnMetadata = _props.columnMetadata,
          data = _props.data;
      var _state3 = this.state,
          page = _state3.page,
          rowsPerPage = _state3.rowsPerPage;


      if (!data.length) return null;

      var pagedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

      return pagedData.map(function (d, i) {
        return _react2.default.createElement(
          "div",
          { className: "flexgrid-row", key: i },
          columnMetadata.map(function (column, i) {
            var style = column.style || null;

            return _react2.default.createElement(
              "span",
              { className: "flexgrid-header-item", key: i, style: style },
              d[column.columnName]
            );
          })
        );
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _state4 = this.state,
          page = _state4.page,
          totalPages = _state4.totalPages,
          rowsPerPage = _state4.rowsPerPage,
          sortColumn = _state4.sortColumn,
          sortDirection = _state4.sortDirection;
      var _props2 = this.props,
          className = _props2.className,
          columnMetadata = _props2.columnMetadata,
          sortableCols = _props2.sortableCols;


      return _react2.default.createElement(
        "div",
        { className: "flexgrid " + className },
        _react2.default.createElement(_Header2.default, {
          columnMetadata: columnMetadata,
          sort: this.sort,
          sortColumn: sortColumn,
          sortDirection: sortDirection
        }),
        this.renderData(),
        _react2.default.createElement(_Pager2.default, {
          page: page,
          totalPages: totalPages,
          pageUp: this.pageUp,
          pageDown: this.pageDown,
          setPage: this.setPage,
          setRowsPerPage: this.setRowsPerPage,
          rowsPerPage: rowsPerPage
        })
      );
    }
  }]);

  return Flexflexgrid;
}(_react.Component);

Flexflexgrid.propTypes = {
  columnMetadata: _propTypes2.default.array.isRequired,
  data: _propTypes2.default.array.isRequired,
  rowsPerPage: _propTypes2.default.number,
  currentPage: _propTypes2.default.number,
  sortableCols: _propTypes2.default.array,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};
Flexflexgrid.defaultProps = {
  rowsPerPage: 10,
  currentPage: 1,
  sortableCols: [],
  className: "",
  data: []
};
exports.default = Flexflexgrid;