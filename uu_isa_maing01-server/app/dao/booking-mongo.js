"use strict";

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { DbConnection } = require("uu_appg01_datastore");
const ObjectId = require("mongodb").ObjectID;

class BookingMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ "areaList.id": 1 });
    await super.createIndex({ datetimeFrom: 1 });
    await super.createIndex({ datetimeTo: 1 });
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

  async getBookingTimeStatistics(id, datetimeFrom, datetimeTo, timeStep) {
    // this method creates intervals (using timeStep) necessary for mongodb $bucket
    let boundaries = this._getTimeBoundaries(datetimeFrom, datetimeTo, timeStep);

    let match = {};
    if (id) {
      match.areaList = { $elemMatch: { id: ObjectId(id) } };
    }

    return await super.aggregate([
      { $match: match }, // match only relevant bookings
      {
        /*
            the facet defined below returns the following data set for startedBookingsStats & finishedBookingsStats:
            [
              {
                "_id": "2020-10-15T04:00:00.000Z",
                _id represents starting point of interval <_id, _id + timeStep)
                "count": 4
                count of bookings that have either datetimeFrom (startedBookingsStats) or
                datetimeTo (finishedBookingsStats) attribute within <_id, _id + timeStep)
              },
              ...
            ]

            !! it is important to note that buckets with count === 0 are not included !!
        */
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
        /*
          since buckets with count === 0 are not included we have to add them
          the way this works is by mapping the initial boundaries (intervals for buckets) to a new field
          within mapping loop we check if currently iterated interval is defined in (started, finished) bookingsStats
          if true adds count from $startedBookingsStats.count if false sets to count: 0

          created data sets after adding empty buckets:

          "startedBookingsStats": [
            {
              "_id": "2020-10-15T04:00:00.000Z",
              "startedBookings": 4
            },
            ... // every interval from boundaries
          ]
          "finishedBookingsStats": [
            {
              "_id": "2020-10-15T05:00:00.000Z",
              "finishedBookings": 4
            },
            ... // every interval from boundaries
          ]
        */
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
      /*
        since startedBookingsStats and finishedBookingsStats share the same intervals
        we connect them to the one array. The created array is immediately unwind-ed so
        we can group by interval (_id) and calculate both startedBookings and finishedBookings for said interval
      */
      { $project: { statistics: { $concatArrays: ["$startedBookingsStats", "$finishedBookingsStats"] } } },
      { $unwind: "$statistics" },
      /*
        data set after grouping:
        statistics": [
          {
            "_id": "2020-10-15T07:00:00.000Z",
            "startedBookings": [ 4 ],
            "finishedBookings": [ 0 ]
          },
          ...
        ]
      */
      {
        $group: {
          _id: "$statistics._id",
          startedBookings: { $push: "$statistics.startedBookings" },
          finishedBookings: { $push: "$statistics.finishedBookings" },
        },
      },
      // delete data from last bucket since it's exclusive
      { $match: { _id: { $ne: datetimeTo } } },
      // sort by datetime timeStep
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          // return time in minutes (UTC)
          time: { $add: [{ $multiply: [{ $hour: "$_id" }, 60] }, { $minute: "$_id" }] },
          startedBookings: { $arrayElemAt: ["$startedBookings", 0] },
          finishedBookings: { $arrayElemAt: ["$finishedBookings", 0] },
        },
      },
    ]);
  }

  _getTimeBoundaries(datetimeFrom, datetimeTo, timeStep) {
    timeStep = parseInt(timeStep);
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
