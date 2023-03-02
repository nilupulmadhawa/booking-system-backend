"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _winston = _interopRequireDefault(require("winston"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var stacktrace = _winston["default"].format(function (info) {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message
    });
  }
  return info;
});
var logger = _winston["default"].createLogger({
  format: _winston["default"].format.combine(stacktrace(), _winston["default"].format.timestamp(), _winston["default"].format.json()),
  transports: [new _winston["default"].transports.File({
    filename: "logs/error/".concat(new Date().toISOString().slice(0, 10), ".log"),
    level: 'error'
  }), new _winston["default"].transports.File({
    filename: "logs/info/".concat(new Date().toISOString().slice(0, 10), ".log"),
    level: 'info'
  })]
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(new _winston["default"].transports.Console({
    format: _winston["default"].format.combine(stacktrace(), _winston["default"].format.timestamp(), _winston["default"].format.json())
  }));
}
var _default = logger;
exports["default"] = _default;