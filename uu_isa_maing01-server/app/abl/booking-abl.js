"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;

const Mock = require("./mock");

class BookingAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("booking");
    this.workplaceDao = DaoFactory.getDao("workplace");
  }

  /**
   * This method creates data structure for demo
   * @returns {workplaces, bookings}
   */
  async createMockData() {
    // 1. create workplaces
    let workplaces = await this.workplaceDao.insert(Mock.workplaces);

    // 2. map workplace ids to bookings
    let bookings = Mock.bookings.map((booking) => {
      return {
        workplaceId: workplaces[booking.workplace]._id,
        duration: booking.duration,
        datetimeFrom: booking.datetimeFrom,
        datetimeTo: booking.datetimeTo,
      };
    });

    // 3. create bookings
    await this.dao.insert(bookings);

    // 4. return
    return { workplaces, bookings };
  }

  /**
   *
   * @returns {any}
   */
  async getBookingCountStatistics() {
    let statistics = await this.dao.getBookingCountStatistics();
    let workplaceMap = {};

    if (statistics.length) {
      let bookingWorkplaces = await this.workplaceDao.listByWorkplaceIdList(statistics.map((stat) => stat.workplaceId));
      bookingWorkplaces.itemList.forEach((workplace) => (workplaceMap[workplace.id.toString()] = workplace));
      statistics = statistics.map((booking) => {
        return { bookingCount: booking.bookingCount, workplace: workplaceMap[booking.workplaceId].name };
      });
    }

    return { statistics };
  }

  /**
   *
   * @param dtoIn
   * @returns {any}
   */
  async getAreaBookingTimeStatistics(dtoIn) {
    let datetimeFrom = new Date(dtoIn.datetimeFrom);
    let datetimeTo = new Date(dtoIn.datetimeTo);

    let statistics = await this.dao.getAreaBookingTimeStatistics(
      datetimeFrom,
      datetimeTo,
      dtoIn.timeStep,
      dtoIn.workplaceId
    );

    return { statistics };
  }
}

module.exports = new BookingAbl();
