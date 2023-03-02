"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookingViewSchema = exports.bookingIdSchema = exports.addBookingSchema = void 0;
var _celebrate = require("celebrate");
var addBookingSchema = _celebrate.Joi.object({
  booking_data: _celebrate.Joi.date().required(),
  description: _celebrate.Joi.string().required()
});
exports.addBookingSchema = addBookingSchema;
var bookingViewSchema = {
  filter: _celebrate.Joi.object().keys({
    created_at: _celebrate.Joi.string().hex().length(24).optional(),
    user_id: _celebrate.Joi.string().hex().length(24).optional(),
    updated_at: _celebrate.Joi.string().hex().length(24).optional()
  }).optional(),
  sort: _celebrate.Joi.object().keys({
    created_at: _celebrate.Joi.any().valid('asc', 'desc', '1', '-1', 1, -1).optional(),
    updated_at: _celebrate.Joi.any().valid('asc', 'desc', '1', '-1', 1, -1).optional()
  }).optional(),
  page: _celebrate.Joi.number().optional(),
  limit: _celebrate.Joi.number().optional()
};
exports.bookingViewSchema = bookingViewSchema;
var bookingIdSchema = {
  id: _celebrate.Joi.string().hex().length(24).required()
};
exports.bookingIdSchema = bookingIdSchema;