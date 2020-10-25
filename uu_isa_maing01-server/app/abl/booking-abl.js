"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;

const MOCKED_BOOKINGS = [
  {
    workplaceId: 1,
    duration: 60,
    datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
    datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
  },
  {
    workplaceId: 1,
    duration: 120,
    datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
    datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
  },
  {
    workplaceId: 1,
    duration: 120,
    datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
    datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
  },
  {
    workplaceId: 2,
    duration: 60,
    datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
    datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
  },
  {
    workplaceId: 3,
    duration: 60,
    datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
    datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
  },
  {
    workplaceId: 3,
    duration: 60,
    datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
    datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
  },
];

class BookingAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("booking");
  }

  async createMockData() {
    let bookings = await this.dao.insert(MOCKED_BOOKINGS);

    return { bookings };
  }

  async getBookingCountStatistics() {
    // TODO: create workplace collection and load additional data from it
    let statistics = await this.dao.getBookingCountStatistics();

    return { statistics };
  }

  async getAreaBookingTimeStatistics() {
    // TODO: take datetimeFrom, datetimeTo from dtoIn
    let datetimeFrom = new Date("2020-10-15T03:00:00.000Z");
    let datetimeTo = new Date("2020-10-15T07:00:00.000Z");

    let statistics = await this.dao.getAreaBookingTimeStatistics(datetimeFrom, datetimeTo, 60);

    return { statistics };
  }
}

module.exports = new BookingAbl();
