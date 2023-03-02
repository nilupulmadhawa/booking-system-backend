"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongooseAggregatePaginateV = _interopRequireDefault(require("mongoose-aggregate-paginate-v2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var BookingSchema = new _mongoose["default"].Schema({
  user_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  booking_data: {
    type: Date,
    required: true
  },
  confirmed: {
    type: Boolean,
    required: true,
    "default": false
  },
  description: {
    type: String,
    required: false
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
BookingSchema.plugin(_mongooseAggregatePaginateV["default"]);
BookingSchema.index({
  createdAt: 1
});
var Booking = _mongoose["default"].model('Booking', BookingSchema);
Booking.syncIndexes();
var _default = Booking;
exports["default"] = _default;