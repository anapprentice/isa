"use strict";
const AreaAbl = require("../../abl/area-abl.js");

class AreaController {
  getAreaStructure(ucEnv) {
    return AreaAbl.getAreaStructure(ucEnv.getDtoIn());
  }
  list() {
    return AreaAbl.list();
  }
}

module.exports = new AreaController();
