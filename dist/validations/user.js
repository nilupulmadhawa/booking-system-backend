"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userIdSchema = exports.resetPasswordSchema = exports.registerSchema = exports.loginSchema = void 0;
var _celebrate = require("celebrate");
var registerSchema = {
  first_name: _celebrate.Joi.string().required(),
  last_name: _celebrate.Joi.string().required(),
  email: _celebrate.Joi.string().email().required(),
  password: _celebrate.Joi.string().required(),
  profile_pic: _celebrate.Joi.string()
};
exports.registerSchema = registerSchema;
var loginSchema = {
  email: _celebrate.Joi.string().required(),
  password: _celebrate.Joi.string().required()
};
exports.loginSchema = loginSchema;
var resetPasswordSchema = _celebrate.Joi.object({
  old_password: _celebrate.Joi.string().required(),
  new_password: _celebrate.Joi.string().required()
});
exports.resetPasswordSchema = resetPasswordSchema;
var userIdSchema = {
  id: _celebrate.Joi.string().required()
};
exports.userIdSchema = userIdSchema;