"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongooseAggregatePaginateV = _interopRequireDefault(require("mongoose-aggregate-paginate-v2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var UserSchema = new _mongoose["default"].Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  is_active: {
    type: Boolean,
    required: true,
    "default": true
  },
  profile_pic: {
    type: String,
    required: false,
    "default": 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
  },
  is_admin: {
    type: Boolean,
    required: true,
    "default": false
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
UserSchema.plugin(_mongooseAggregatePaginateV["default"]);
UserSchema.index({
  createdAt: 1
});
var User = _mongoose["default"].model('User', UserSchema);
User.syncIndexes();
var _default = User;
exports["default"] = _default;