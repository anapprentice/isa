"use strict";

const ObjectId = require("mongodb").ObjectID;

const Constants = {
  areas: [
    {
      // root area
      _id: new ObjectId("5f9714df62240b9cbf9c5af6"),
      areaType: "zone",
      name: "Zone1",
    },
    {
      _id: new ObjectId("5f9714e7a88022e97252478b"),
      parentArea: new ObjectId("5f9714df62240b9cbf9c5af6"), // Zone1
      areaType: "nest",
      name: "Zone1-Nest1",
    },
    {
      _id: new ObjectId("5f9714edb24f3e6b7c3007c8"),
      parentArea: new ObjectId("5f9714df62240b9cbf9c5af6"), // Zone1
      areaType: "nest",
      name: "Zone1-Nest2",
    },
    {
      _id: new ObjectId("5f9712c5cae233bb8168282d"),
      parentArea: ObjectId("5f9714e7a88022e97252478b"), // Nest1
      areaType: "workplace",
      name: "Zone1-Nest1-Workplace1",
    },
    {
      _id: new ObjectId("5f9712d3d27594707d185c26"),
      parentArea: ObjectId("5f9714e7a88022e97252478b"), // Nest1
      areaType: "workplace",
      name: "Zone1-Nest1-Workplace2",
    },
    {
      _id: new ObjectId("5f9712d97dcb9d8f484cb92a"),
      parentArea: ObjectId("5f9714edb24f3e6b7c3007c8"), // Nest2
      areaType: "workplace",
      name: "Zone1-Nest2-Workplace3",
    },
  ],
  bookings: [
    {
      workplaceId: new ObjectId("5f9712c5cae233bb8168282d"), // Workplace1
      duration: 60,
      datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
      datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
    },
    {
      workplaceId: new ObjectId("5f9712c5cae233bb8168282d"), // Workplace1
      duration: 120,
      datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
      datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
    },
    {
      workplaceId: new ObjectId("5f9712c5cae233bb8168282d"), // Workplace1
      duration: 120,
      datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
      datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
    },
    {
      workplaceId: new ObjectId("5f9712d3d27594707d185c26"), // Workplace2
      duration: 60,
      datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
      datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
    },
    {
      workplaceId: new ObjectId("5f9712d97dcb9d8f484cb92a"), // Workplace3
      duration: 60,
      datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
      datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
    },
    {
      workplaceId: new ObjectId("5f9712d97dcb9d8f484cb92a"), // Workplace3
      duration: 60,
      datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
      datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
    },
  ],
};

module.exports = Constants;
