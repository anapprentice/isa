"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { DbConnection } = require("uu_appg01_datastore");

class WorkplaceMongo extends UuObjectDao {
  async createSchema() {}

  async insert(uuObjectList) {
    let db = await DbConnection.get(this.customUri);
    let result = await db.collection("workplace").insert(uuObjectList);

    return result.ops;
  }

  async listByWorkplaceIdList(workplaceIdList, pageInfo = {}) {
    // workplaceIdList = workplaceIdList && workplaceIdList.map(workplaceId => ObjectId(workplaceId));
    return await super.find({ id: { $in: workplaceIdList } }, pageInfo);
  }
}

module.exports = WorkplaceMongo;
