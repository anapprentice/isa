"use strict";

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { DbConnection } = require("uu_appg01_datastore");
const ObjectId = require("mongodb").ObjectID;

class BookingMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }

  async insert(uuObjectList) {
    let db = await DbConnection.get(this.customUri);
    return await db.collection("booking").insert(uuObjectList);
  }

  async getWorkplacesBookingCount() {
    return await super.aggregate([
      { $unwind: "$areaList" },
      { $match: { "areaList.areaType": "workplace" } },
      {
        $group: {
          _id: "$areaList.id",
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

  async getBookingTimeStatistics(datetimeFrom, datetimeTo, timeStep) {
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
          datetime: "$_id",
          startedBookings: { $sum: "$startedBookings" },
          finishedBookings: { $sum: "$finishedBookings" },
        },
      },
    ]);
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

  async listAreaBookingStatistics(areaId) {
    let result = await super.aggregate([
      { $match: { "areaList.id": ObjectId(areaId) } },
      { $unwind: "$areaList" },
      { $match: { "areaList.id": ObjectId(areaId) } },
      {
        $group: {
          _id: "$areaList.id", // group areas in areaList by id
          bookingCount: { $sum: 1 }, // count bookings for every area
          totalBookingDuration: { $sum: "$duration" }, // count totalBookingDuration for every area
        },
      },
      {
        $group: {
          _id: "$_id", // group by _id of previous grouping (no collisions)
          bookingCount: { $first: "$bookingCount" }, // take first bookingCount since it was counted in previous grouping
          totalBookingDuration: { $first: "$totalBookingDuration" }, // take first totalBookingDuration since it was counted in previous grouping
          workplaceWithBookingCount: { $sum: 1 }, // previous grouping grouped areas by id so this sum should return number of areas (workplaces) with booking
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          bookingCount: 1,
          totalBookingDuration: 1,
          workplaceWithBookingCount: 1,
        },
      },
    ]);

    return result[0];
  }
}

module.exports = BookingMongo;
