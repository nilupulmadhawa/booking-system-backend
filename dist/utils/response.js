"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeResponse = void 0;
var makeResponse = function makeResponse(_ref) {
  var res = _ref.res,
    _ref$status = _ref.status,
    status = _ref$status === void 0 ? 200 : _ref$status,
    data = _ref.data,
    message = _ref.message;
  var responseData = {
    data: data,
    message: message
  };
  if (!data) delete responseData.data;
  res.status(status).json(responseData);
};
exports.makeResponse = makeResponse;