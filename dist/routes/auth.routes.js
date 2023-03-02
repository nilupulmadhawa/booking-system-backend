"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("../controllers/auth");
var _celebrate3 = require("celebrate");
var _user = require("../validations/user");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './public');
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    req.body.profile_pic = uniqueSuffix + file.originalname;
    cb(null, uniqueSuffix + file.originalname);
  }
});
var upload = multer({
  storage: storage
});
var authRouter = _express["default"].Router();
authRouter.post('/login', (0, _celebrate3.celebrate)(_defineProperty({}, _celebrate3.Segments.BODY, _user.loginSchema)), _auth.login);
authRouter.post('/register', upload.single('profile_pic'), (0, _celebrate3.celebrate)(_defineProperty({}, _celebrate3.Segments.BODY, _user.registerSchema)), _auth.register);
var _default = authRouter;
exports["default"] = _default;