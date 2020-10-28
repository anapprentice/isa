"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;

class AreaAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("area");
  }

  /**
   * This method returns bookingCount for every workplace
   * @returns {statistics}
   */
  async getAreaStructure(dtoIn) {
    let areaStructure = await this.dao.getAreaStructureWithBasicInfo(dtoIn.id);

    return { areaStructure };
  }
}

module.exports = new AreaAbl();
