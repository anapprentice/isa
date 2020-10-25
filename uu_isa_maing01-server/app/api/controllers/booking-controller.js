"use strict";
const BookingAbl = require("../../abl/booking-abl.js");

class BookingController {
  createMockData(ucEnv) {
    return BookingAbl.createMockData();
  }
  getBookingCountStatistics(ucEnv) {
    return BookingAbl.getBookingCountStatistics();
  }
  getAreaBookingTimeStatistics(ucEnv) {
    return BookingAbl.getAreaBookingTimeStatistics(ucEnv.getDtoIn());
  }
}

module.exports = new BookingController();
