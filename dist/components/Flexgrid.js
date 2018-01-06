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
      totalPages: Math.ceil(props.data.length / props.rowsPerPage)
    };

    _this.pageUp = _this.pageUp.bind(_this);
    _this.pageDown = _this.pageDown.bind(_this);
    _this.setPage = _this.setPage.bind(_this);
    return _this;
  }

  _createClass(Flexflexgrid, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var data = nextProps.data,
          rowsPerPage = nextProps.rowsPerPage;


      this.setState({ totalPages: Math.ceil(data.length / rowsPerPage) });
    }
  }, {
    key: "pageUp",
    value: function pageUp() {
      var _state = this.state,
          page = _state.page,
          totalPages = _state.totalPages;


      if (page === totalPages) return null;

      this.setPage(page + 1);
    }
  }, {
    key: "pageDown",
    value: function pageDown() {
      var page = this.state.page;


      if (page === 1) return null;

      this.setPage(page - 1);
    }
  }, {
    key: "setPage",
    value: function setPage(page) {
      this.setState({ page: page });
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var columnMetadata = this.props.columnMetadata;


      return _react2.default.createElement(
        "div",
        { className: "flexgrid-header" },
        columnMetadata.map(function (column, i) {
          var style = column.style || null;

          return _react2.default.createElement(
            "span",
            { className: "flexgrid-header-item", key: i, style: style },
            column.displayName
          );
        })
      );
    }
  }, {
    key: "renderData",
    value: function renderData() {
      var _props = this.props,
          columnMetadata = _props.columnMetadata,
          data = _props.data,
          rowsPerPage = _props.rowsPerPage;
      var page = this.state.page;


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
      var _state2 = this.state,
          page = _state2.page,
          totalPages = _state2.totalPages;


      return _react2.default.createElement(
        "div",
        { className: "flexgrid" },
        this.renderHeader(),
        this.renderData(),
        _react2.default.createElement(_Pager2.default, {
          page: page,
          totalPages: totalPages,
          pageUp: this.pageUp,
          pageDown: this.pageDown,
          setPage: this.setPage
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
  currentPage: _propTypes2.default.number
};
Flexflexgrid.defaultProps = {
  rowsPerPage: 10,
  currentPage: 1
};
exports.default = Flexflexgrid;