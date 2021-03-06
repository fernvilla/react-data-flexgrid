'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataRows = function (_Component) {
  _inherits(DataRows, _Component);

  function DataRows() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DataRows);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DataRows.__proto__ || Object.getPrototypeOf(DataRows)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      visibleRowId: null
    }, _this.setVisibileRow = function (rowIndex) {
      if (rowIndex === _this.state.visibleRowId) {
        return _this.setState({ visibleRowId: null });
      }

      _this.setState({ visibleRowId: rowIndex });
    }, _this.renderSubcomponent = function (data) {
      var visibleRowId = _this.state.visibleRowId;
      var subComponent = _this.props.subComponent;


      if (subComponent && visibleRowId !== null && data.rowIndex === visibleRowId) {
        return subComponent({ data: data });
      }

      return null;
    }, _this.onRowClick = function (data) {
      var subComponent = _this.props.subComponent;

      var clickable = typeof subComponent !== 'undefined';

      if (!clickable) return;

      _this.setVisibileRow(data.rowIndex);
    }, _this.onCheckboxChange = function (e, data) {
      var _this$props$rowSelect = _this.props.rowSelection,
          onRowSelected = _this$props$rowSelect.onRowSelected,
          onRowDeselected = _this$props$rowSelect.onRowDeselected;

      var action = e.target.checked ? onRowSelected : onRowDeselected;

      action(data);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DataRows, [{
    key: 'renderCheckbox',
    value: function renderCheckbox(data) {
      var _this2 = this;

      var rowSelection = this.props.rowSelection;
      var showCheckbox = rowSelection.showCheckbox;


      if (!showCheckbox) return null;

      var _rowSelection$selectB = rowSelection.selectBy,
          rowKey = _rowSelection$selectB.rowKey,
          values = _rowSelection$selectB.values;


      return _react2.default.createElement(
        'span',
        { className: 'fg-row-column fg-checkbox-container' },
        _react2.default.createElement('input', {
          type: 'checkbox',
          onClick: function onClick(e) {
            return e.stopPropagation();
          },
          onChange: function onChange(e) {
            return _this2.onCheckboxChange(e, data);
          },
          checked: values.indexOf(data[rowKey]) > -1
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          columns = _props.columns,
          data = _props.data,
          currentPage = _props.currentPage,
          rowsPerPage = _props.rowsPerPage,
          searchText = _props.searchText,
          searchOptions = _props.searchOptions,
          searchKeys = _props.searchKeys,
          searchable = _props.searchable,
          cells = _props.cells,
          subComponent = _props.subComponent;

      //Use column ids as search keys if user doesnt provide any

      var dataSeachKeys = searchKeys.length ? searchKeys : columns.map(function (c) {
        return c.name;
      });

      // Filter text if prop set to true and there is search text - or use all data
      var filteredData = searchable && searchText.length ? (0, _utils.searchData)(data, searchText, searchOptions, dataSeachKeys) : data;

      // Paginate filtered data from above
      var paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

      var clickable = typeof subComponent !== 'undefined';

      return paginatedData.map(function (data, dataIndex) {
        return _react2.default.createElement(
          'div',
          { className: 'fg-row', key: 'row-' + dataIndex },
          _react2.default.createElement(
            'div',
            {
              className: (0, _classnames2.default)('fg-row-data', { clickable: clickable }),
              onClick: function onClick() {
                return _this3.onRowClick(data);
              } },
            _this3.renderCheckbox(data),
            columns.map(function (column, columnIndex) {
              var style = column.style,
                  name = column.name;

              var styles = style || null;
              var cellData = { columnName: name, data: data[name], columnIndex: columnIndex };

              return _react2.default.createElement(
                'div',
                { className: 'fg-row-column', key: name + '-row-' + dataIndex, style: styles },
                cells(cellData)
              );
            })
          ),
          _this3.renderSubcomponent(data)
        );
      });
    }
  }]);

  return DataRows;
}(_react.Component);

exports.default = DataRows;