"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { DbConnection } = require("uu_appg01_datastore");
const ObjectId = require("mongodb").ObjectID;

class BookingMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async insert(uuObjectList) {
    let db = await DbConnection.get(this.customUri);
    return await db.collection("booking").insert(uuObjectList);
  }

  async get(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }

  async getBookingCountStatistics(awid, id) {
    return await super.aggregate([
      {
        $group: {
          _id: "$workplaceId",
          bookingCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          workplaceId: "$_id",
          bookingCount: 1,
        },
      },
    ]);
  }

  async getAreaBookingTimeStatistics(datetimeFrom, datetimeTo, timeStep, workplaceId) {
    let boundaries = this._getTimeBoundaries(datetimeFrom, datetimeTo, timeStep);

    // TODO match by workpalceId if defined
    // let match = {};
    // if (workplaceId) {
    //   match.areaList = { $elemMatch: { workplaceId: ObjectId(workplaceId) } };
    // }

    return await super.aggregate([
      // { $match: match },
      {
        $facet: {
          startedBookingsStats: [
            {
              $bucket: {
                groupBy: "$datetimeFrom",
                boundaries: boundaries,
                default: "other",
              },
            },
          ],
          finishedBookingsStats: [
            {
              $bucket: {
                groupBy: "$datetimeTo",
                boundaries: boundaries,
                default: "other",
              },
            },
          ],
        },
      },
      {
        // add empty buckets
        $addFields: {
          startedBookingsStats: {
            $map: {
              input: boundaries,
              as: "i",
              in: {
                _id: "$$i",
                startedBookings: {
                  $cond: [
                    { $eq: [{ $indexOfArray: ["$startedBookingsStats._id", "$$i"] }, -1] },
                    0,
                    {
                      $arrayElemAt: [
                        "$startedBookingsStats.count",
                        { $indexOfArray: ["$startedBookingsStats._id", "$$i"] },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      },
      {
        // add empty buckets
        $addFields: {
          finishedBookingsStats: {
            $map: {
              input: boundaries,
              as: "i",
              in: {
                _id: "$$i",
                finishedBookings: {
                  $cond: [
                    { $eq: [{ $indexOfArray: ["$finishedBookingsStats._id", "$$i"] }, -1] },
                    0,
                    {
                      $arrayElemAt: [
                        "$finishedBookingsStats.count",
                        { $indexOfArray: ["$finishedBookingsStats._id", "$$i"] },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      },
      { $project: { statistics: { $concatArrays: ["$startedBookingsStats", "$finishedBookingsStats"] } } },
      { $unwind: "$statistics" },
      {
        $group: {
          _id: "$statistics._id",
          startedBookings: { $push: "$statistics.startedBookings" },
          finishedBookings: { $push: "$statistics.finishedBookings" },
        },
      },
      { $match: { _id: { $ne: datetimeTo } } }, // delete data from last bucket since it's exclusive
      { $sort: { _id: 1 } }, // sort by datetime timeStep
      {
        $project: {
          _id: 0,
          time: "$_id",
          startedBookings: { $sum: "$startedBookings" },
          finishedBookings: { $sum: "$finishedBookings" },
        },
      },
    ]);
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async remove(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.deleteOne(filter);
  }

  _getTimeBoundaries(datetimeFrom, datetimeTo, timeStep) {
    const dateDiffInMinutes = (datetimeTo - datetimeFrom) / 60000;

    let boundaries = [];
    for (let i = 0; i <= dateDiffInMinutes; i += timeStep) {
      let currBoundary = new Date(datetimeFrom);
      if (i !== 0) {
        currBoundary.setMinutes(currBoundary.getMinutes() + i);
      }
      boundaries.push(currBoundary);
    }

    return boundaries;
  }
}

module.exports = BookingMongo;
