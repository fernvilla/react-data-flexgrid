"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flexflexgrid = function (_Component) {
  _inherits(Flexflexgrid, _Component);

  function Flexflexgrid(props) {
    _classCallCheck(this, Flexflexgrid);

    var _this = _possibleConstructorReturn(this, (Flexflexgrid.__proto__ || Object.getPrototypeOf(Flexflexgrid)).call(this, props));

    _this.state = { page: props.currentPage, rowsPerPage: props.rowsPerPage };
    _this.totalPages = Math.ceil(props.data.length / props.rowsPerPage);
    return _this;
  }

  _createClass(Flexflexgrid, [{
    key: "pageUp",
    value: function pageUp() {
      var page = this.state.page;


      if (page === this.totalPages) return null;

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
    key: "renderPagination",
    value: function renderPagination() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        { className: "flexgrid-footer" },
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "span",
            { className: "page-toggle", onClick: function onClick() {
                return _this2.setPage(1);
              } },
            "\xAB"
          ),
          _react2.default.createElement(
            "span",
            { className: "page-toggle", onClick: function onClick() {
                return _this2.pageDown();
              } },
            "\u2039"
          ),
          "Page ",
          this.state.page,
          " of ",
          this.totalPages,
          _react2.default.createElement(
            "span",
            { className: "page-toggle", onClick: function onClick() {
                return _this2.pageUp();
              } },
            "\u203A"
          ),
          _react2.default.createElement(
            "span",
            {
              className: "page-toggle",
              onClick: function onClick() {
                return _this2.setPage(_this2.totalPages);
              }
            },
            "\xBB"
          )
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "flexgrid" },
        this.renderHeader(),
        this.renderData(),
        this.renderPagination()
      );
    }
  }]);

  return Flexflexgrid;
}(_react.Component);

Flexflexgrid.propTypes = {
  columnMetadata: _propTypes2.default.array,
  data: _propTypes2.default.array,
  rowsPerPage: _propTypes2.default.number,
  currentPage: _propTypes2.default.number
};
Flexflexgrid.defaultProps = {
  columnMetadata: [],
  data: [],
  rowsPerPage: 10,
  currentPage: 1
};
exports.default = Flexflexgrid;