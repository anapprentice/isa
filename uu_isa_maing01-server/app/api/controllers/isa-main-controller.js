"use strict";
const IsaMainAbl = require("../../abl/isa-main-abl.js");

class IsaMainController {
  init(ucEnv) {
    return IsaMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new IsaMainController();
