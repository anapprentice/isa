"use strict";
const BookingAbl = require("../../abl/booking-abl.js");

class BookingController {
  createMockData(ucEnv) {
    return BookingAbl.createMockData();
  }
  getBookingCountStatistics(ucEnv) {
    return BookingAbl.getBookingCountStatistics();
  }
  getBookingTimeStatistics(ucEnv) {
    return BookingAbl.getBookingTimeStatistics(ucEnv.getDtoIn());
  }
}

module.exports = new BookingController();
