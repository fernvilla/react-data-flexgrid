"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var Grid = (function(_Component) {
  _inherits(Grid, _Component);

  function Grid() {
    _classCallCheck(this, Grid);

    return _possibleConstructorReturn(
      this,
      (Grid.__proto__ || Object.getPrototypeOf(Grid)).apply(this, arguments)
    );
  }

  _createClass(Grid, [
    {
      key: "renderHeader",
      value: function renderHeader() {
        var columns = this.props.columns;

        return _react2.default.createElement(
          "div",
          { className: "grid-header" },
          columns.map(function(column, i) {
            var style = column.style || null;

            return _react2.default.createElement(
              "span",
              { className: "grid-header-item", key: i, style: style },
              column.displayName
            );
          })
        );
      }
    },
    {
      key: "renderData",
      value: function renderData() {
        var _props = this.props,
          columns = _props.columns,
          data = _props.data;

        return data.map(function(d, i) {
          return _react2.default.createElement(
            "div",
            { className: "grid-row", key: i },
            columns.map(function(column, i) {
              var style = column.style || null;

              return _react2.default.createElement(
                "span",
                { className: "grid-header-item", key: i, style: style },
                d[column.columnName]
              );
            })
          );
        });
      }
    },
    {
      key: "render",
      value: function render() {
        return _react2.default.createElement(
          "div",
          { className: "grid" },
          this.renderHeader(),
          this.renderData()
        );
      }
    }
  ]);

  return Grid;
})(_react.Component);

Grid.propTypes = {
  columns: _propTypes2.default.array,
  data: _propTypes2.default.array,
  resultsPerPage: _propTypes2.default.number
};
Grid.defaultProps = {
  columns: [],
  data: [],
  resultsPerPage: 10
};
exports.default = Grid;
