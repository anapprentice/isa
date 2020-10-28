"use strict";
const AreaAbl = require("../../abl/area-abl.js");

class AreaController {
  getAreaStructure(ucEnv) {
    return AreaAbl.getAreaStructure(ucEnv.getDtoIn());
  }
}

module.exports = new AreaController();
