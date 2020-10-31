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

  async list(pageInfo) {
    return await super.find({}, pageInfo);
  }

  async listByWorkplaceIdList(areaIdList, pageInfo = {}) {
    // areaIdList = areaIdList && areaIdList.map(areaId => ObjectId(areaId));
    return await super.find({ id: { $in: areaIdList } }, pageInfo);
  }

  /**
   * This method lists unique list of areas in areaIdList
   * including their parent areas up to the root area.
   * @param areaId
   */
  async getAreaStructureWithBasicInfo(areaId) {
    return await super.aggregate([
      { $match: { _id: ObjectId(areaId) } },
      {
        $graphLookup: {
          from: "area",
          startWith: "$parentArea",
          connectFromField: "parentArea",
          connectToField: "_id",
          as: "parentAreaStructure",
        },
      },
      {
        $addFields: {
          parentAreaStructure: {
            $concatArrays: [
              "$parentAreaStructure",
              [
                {
                  _id: "$_id",
                  areaType: "$areaType",
                  parentArea: "$parentArea",
                  name: "$name",
                },
              ],
            ],
          },
        },
      },
      { $unwind: "$parentAreaStructure" },
      {
        $group: {
          _id: "$parentAreaStructure._id",
          parentArea: { $first: "$parentAreaStructure.parentArea" },
          areaType: { $first: "$parentAreaStructure.areaType" },
          name: { $first: "$parentAreaStructure.name" },
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          parentArea: 1,
          areaType: 1,
          name: 1,
        },
      },
    ]);
  }
}

module.exports = AreaMongo;
