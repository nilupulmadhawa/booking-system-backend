"use strict";

var _express = _interopRequireDefault(require("express"));
var _helmet = _interopRequireDefault(require("helmet"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _database = _interopRequireDefault(require("./database"));
var _index = _interopRequireDefault(require("./routes/index.routes"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var multer = require('multer');
var upload = multer({
  dest: 'uploads/'
});
var _require = require('celebrate'),
  errors = _require.errors;
_dotenv["default"].config();
var app = (0, _express["default"])();
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])());
app.use(_express["default"].json({
  limit: '1mb'
}));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  return res.status(200).json({
    message: 'Booking Server Up and Running'
  });
});
app.use('/api', _index["default"]);
app.use(errors());
app.use('/images', _express["default"]["static"](_path["default"].join(__dirname, '../public')));
(0, _database["default"])();
var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log("Booking server successfully started on port ".concat(port));
});