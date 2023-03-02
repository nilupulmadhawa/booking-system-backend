"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("./auth.routes"));
var _user = _interopRequireDefault(require("./user.routes"));
var _booking = _interopRequireDefault(require("./booking.routes"));
var _auth2 = require("../middleware/auth");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.use('/auth', _auth["default"]);
router.use('/user', _auth2.protect, _user["default"]);
router.use('/booking', _auth2.protect, _booking["default"]);
var _default = router;
exports["default"] = _default;