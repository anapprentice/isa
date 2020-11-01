"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;

const Mock = require("./mock");

class BookingAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("booking");
    this.areaDao = DaoFactory.getDao("area");
  }

  /**
   * This method creates data structure for demo
   * @returns {areas, bookings}
   */
  async createMockData() {
    let areas = await this.areaDao.insert(Mock.areas);
    let bookings = await this.dao.insert(Mock.bookings);

    return { areas, bookings };
  }

  /**
   * This method returns bookingCount for every workplace
   * @returns {statistics}
   */
  async getBookingCountStatistics() {
    // TODO: LOOKUP
    // List statistics
    let statistics = await this.dao.getWorkplacesBookingCount();

    // List all workplaces associated with statistics
    let workplacesIdList = statistics.map((stat) => stat.workplaceId);
    let bookingWorkplaces = await this.areaDao.listByWorkplaceIdList(workplacesIdList);

    // Create areaMap to optimize searching
    let areaMap = {};
    bookingWorkplaces.itemList.forEach((area) => (areaMap[area.id.toString()] = area));

    // Map booking info to statistics
    statistics = statistics.map((booking) => {
      return { bookingCount: booking.bookingCount, area: areaMap[booking.workplaceId.toString()].name };
    });

    return { statistics };
  }

  /**
   * This method returns data for histogram (for every timeStep within datetimeFrom and datetimeTo returns info
   * about started and finished statistics)
   * @param dtoIn
   * @returns {statistics}
   */
  async getBookingTimeStatistics(dtoIn) {
    let datetimeFrom = new Date(dtoIn.datetimeFrom);
    let datetimeTo = new Date(dtoIn.datetimeTo);

    let statistics = await this.dao.getBookingTimeStatistics(dtoIn.id, datetimeFrom, datetimeTo, dtoIn.timeStep);

    return { statistics };
  }

  async getAreaBookingStatistics(dtoIn) {
    let statistics = await this.dao.listAreaBookingStatistics(dtoIn.id);

    return { statistics };
  }
}

module.exports = new BookingAbl();
