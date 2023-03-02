"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _booking = require("../controllers/booking");
var _auth = require("../middleware/auth");
var _celebrate7 = require("celebrate");
var _booking2 = require("../validations/booking");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var bookingRouter = _express["default"].Router();
bookingRouter.post('/', (0, _celebrate7.celebrate)(_defineProperty({}, _celebrate7.Segments.BODY, _booking2.addBookingSchema)), _booking.create);
bookingRouter.get('/', (0, _celebrate7.celebrate)(_defineProperty({}, _celebrate7.Segments.QUERY, _booking2.bookingViewSchema)), _auth.adminProtect, _booking.getAll);
bookingRouter.get('/my', (0, _celebrate7.celebrate)(_defineProperty({}, _celebrate7.Segments.QUERY, _booking2.bookingViewSchema)), _booking.getMyBooking);
bookingRouter.get('/:id', (0, _celebrate7.celebrate)(_defineProperty({}, _celebrate7.Segments.PARAMS, _booking2.bookingIdSchema)), _booking.getById);
bookingRouter.patch('/:id', (0, _celebrate7.celebrate)(_defineProperty({}, _celebrate7.Segments.PARAMS, _booking2.bookingIdSchema)), _booking.update);
bookingRouter["delete"]('/:id', (0, _celebrate7.celebrate)(_defineProperty({}, _celebrate7.Segments.PARAMS, _booking2.bookingIdSchema)), _booking.remove);
var _default = bookingRouter;
exports["default"] = _default;