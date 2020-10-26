"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { DbConnection } = require("uu_appg01_datastore");
const ObjectId = require("mongodb").ObjectID;

class AreaMongo extends UuObjectDao {
  async createSchema() {}

  async insert(uuObjectList) {
    let db = await DbConnection.get(this.customUri);
    let result = await db.collection("area").insert(uuObjectList);

    return result.ops;
  }

  async listByWorkplaceIdList(areaIdList, pageInfo = {}) {
    // areaIdList = areaIdList && areaIdList.map(areaId => ObjectId(areaId));
    return await super.find({ id: { $in: areaIdList } }, pageInfo);
  }
}

module.exports = AreaMongo;
