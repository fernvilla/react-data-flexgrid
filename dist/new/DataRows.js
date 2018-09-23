"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("./../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataRows = function (_Component) {
  _inherits(DataRows, _Component);

  function DataRows() {
    _classCallCheck(this, DataRows);

    return _possibleConstructorReturn(this, (DataRows.__proto__ || Object.getPrototypeOf(DataRows)).apply(this, arguments));
  }

  _createClass(DataRows, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          columns = _props.columns,
          data = _props.data,
          currentPage = _props.currentPage,
          rowsPerPage = _props.rowsPerPage,
          searchText = _props.searchText,
          searchOptions = _props.searchOptions,
          searchKeys = _props.searchKeys,
          allowSearch = _props.allowSearch;

      //Use column ids as search keys if user doesnt provide any

      var keys = searchKeys.length ? searchKeys : columns.map(function (c) {
        return c.id;
      });

      // Filter text if prop set to true and there is search text - or use all data
      var filteredData = allowSearch && searchText.length ? (0, _utils.searchData)(data, searchText, searchOptions, keys) : data;

      // Paginate filtered data from above
      var paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

      return paginatedData.map(function (d, dIndex) {
        return _react2.default.createElement(
          "div",
          { className: "fg-row", key: "row-" + dIndex },
          columns.map(function (column) {
            var styles = column.style || null;

            return _react2.default.createElement(
              "div",
              {
                className: "fg-row-column",
                key: column.id + "-row-" + dIndex,
                style: styles
              },
              d[column.id]
            );
          })
        );
      });
    }
  }]);

  return DataRows;
}(_react.Component);

exports.default = DataRows;