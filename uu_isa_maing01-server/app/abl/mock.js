"use strict";

const ObjectId = require("mongodb").ObjectID;

const Constants = {
  areas: [
    {
      // root area
      _id: ObjectId("5f9d8abf90c33f61df36d95f"),
      areaType: "facility",
      name: "Facility1",
    },
    {
      _id: ObjectId("5f9714df62240b9cbf9c5af6"),
      parentArea: ObjectId("5f9d8abf90c33f61df36d95f"), // Facility1
      areaType: "zone",
      name: "Facility1-Zone1",
    },
    {
      _id: ObjectId("5f9714e7a88022e97252478b"),
      parentArea: ObjectId("5f9714df62240b9cbf9c5af6"), // Zone1
      areaType: "nest",
      name: "Facility1-Zone1-Nest1",
    },
    {
      _id: ObjectId("5f9714edb24f3e6b7c3007c8"),
      parentArea: ObjectId("5f9714df62240b9cbf9c5af6"), // Zone1
      areaType: "nest",
      name: "Facility1-Zone1-Nest2",
    },
    {
      _id: ObjectId("5f9712c5cae233bb8168282d"),
      parentArea: ObjectId("5f9714e7a88022e97252478b"), // Nest1
      areaType: "workplace",
      name: "Facility1-Zone1-Nest1-Workplace1",
    },
    {
      _id: ObjectId("5f9712d3d27594707d185c26"),
      parentArea: ObjectId("5f9714e7a88022e97252478b"), // Nest1
      areaType: "workplace",
      name: "Facility1-Zone1-Nest1-Workplace2",
    },
    {
      _id: ObjectId("5f9712d97dcb9d8f484cb92a"),
      parentArea: ObjectId("5f9714edb24f3e6b7c3007c8"), // Nest2
      areaType: "workplace",
      name: "Facility1-Zone1-Nest2-Workplace3",
    },
  ],
  bookings: [
    {
      duration: 60,
      datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
      datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
      areaList: [
        {
          id: ObjectId("5f9712c5cae233bb8168282d"),
          parentArea: ObjectId("5f9714e7a88022e97252478b"), // Nest1
          areaType: "workplace",
          name: "Facility1-Zone1-Nest1-Workplace1",
        },
        {
          id: ObjectId("5f9714e7a88022e97252478b"),
          parentArea: ObjectId("5f9714df62240b9cbf9c5af6"), // Zone1
          areaType: "nest",
          name: "Facility1-Zone1-Nest1",
        },
        {
          id: ObjectId("5f9714df62240b9cbf9c5af6"),
          areaType: "zone",
          name: "Facility1-Zone1",
        },
        {
          // root area
          _id: ObjectId("5f9d8abf90c33f61df36d95f"),
          areaType: "facility",
          name: "Facility1",
        },
      ],
    },
    {
      duration: 120,
      datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
      datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
      areaList: [
        {
          id: ObjectId("5f9712c5cae233bb8168282d"),
          parentArea: ObjectId("5f9714e7a88022e97252478b"), // Nest1
          areaType: "workplace",
          name: "Facility1-Zone1-Nest1-Workplace1",
        },
        {
          id: ObjectId("5f9714e7a88022e97252478b"),
          parentArea: ObjectId("5f9714df62240b9cbf9c5af6"), // Zone1
          areaType: "nest",
          name: "Facility1-Zone1-Nest1",
        },
        {
          id: ObjectId("5f9714df62240b9cbf9c5af6"),
          areaType: "zone",
          name: "Facility1-Zone1",
        },
        {
          // root area
          _id: ObjectId("5f9d8abf90c33f61df36d95f"),
          areaType: "facility",
          name: "Facility1",
        },
      ],
    },
    {
      duration: 120,
      datetimeFrom: new Date("2020-10-15T05:00:00.000Z"),
      datetimeTo: new Date("2020-10-15T07:00:00.000Z"),
      areaList: [
        {
          id: ObjectId("5f9712c5cae233bb8168282d"),
          parentArea: ObjectId("5f9714e7a88022e97252478b"), // Nest1
          areaType: "workplace",
          name: "Facility1-Zone1-Nest1-Workplace1",
        },
        {
          id: ObjectId("5f9714e7a88022e97252478b"),
          parentArea: ObjectId("5f9714df62240b9cbf9c5af6"), // Zone1
          areaType: "nest",
          name: "Facility1-Zone1-Nest1",
        },
        {
          id: ObjectId("5f9714df62240b9cbf9c5af6"),
          areaType: "zone",
          name: "Facility1-Zone1",
        },
        {
          // root area
          _id: ObjectId("5f9d8abf90c33f61df36d95f"),
          areaType: "facility",
          name: "Facility1",
        },
      ],
    },
    {
      duration: 60,
      datetimeFrom: new Date("2020-10-15T06:00:00.000Z"),
      datetimeTo: new Date("2020-10-15T07:00:00.000Z"),
      areaList: [
        {
          id: ObjectId("5f9712d3d27594707d185c26"),
          parentArea: ObjectId("5f9714e7a88022e97252478b"), // Nest1
          areaType: "workplace",
          name: "Facility1-Zone1-Nest1-Workplace2",
        },
        {
          id: ObjectId("5f9714e7a88022e97252478b"),
          parentArea: ObjectId("5f9714df62240b9cbf9c5af6"), // Zone1
          areaType: "nest",
          name: "Facility1-Zone1-Nest1",
        },
        {
          id: ObjectId("5f9714df62240b9cbf9c5af6"),
          areaType: "zone",
          name: "Facility1-Zone1",
        },
        {
          // root area
          _id: ObjectId("5f9d8abf90c33f61df36d95f"),
          areaType: "facility",
          name: "Facility1",
        },
      ],
    },
    {
      duration: 60,
      datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
      datetimeTo: new Date("2020-10-15T09:00:00.000Z"),
      areaList: [
        {
          id: ObjectId("5f9712d97dcb9d8f484cb92a"),
          parentArea: ObjectId("5f9714edb24f3e6b7c3007c8"), // Nest2
          areaType: "workplace",
          name: "Facility1-Zone1-Nest2-Workplace3",
        },
        {
          id: ObjectId("5f9714edb24f3e6b7c3007c8"),
          parentArea: ObjectId("5f9714df62240b9cbf9c5af6"), // Zone1
          areaType: "nest",
          name: "Facility1-Zone1-Nest2",
        },
        {
          id: ObjectId("5f9714df62240b9cbf9c5af6"),
          areaType: "zone",
          name: "Facility1-Zone1",
        },
        {
          // root area
          _id: ObjectId("5f9d8abf90c33f61df36d95f"),
          areaType: "facility",
          name: "Facility1",
        },
      ],
    },
    {
      duration: 60,
      datetimeFrom: new Date("2020-10-15T04:00:00.000Z"),
      datetimeTo: new Date("2020-10-15T06:00:00.000Z"),
      areaList: [
        {
          id: ObjectId("5f9712d97dcb9d8f484cb92a"),
          parentArea: ObjectId("5f9714edb24f3e6b7c3007c8"), // Nest2
          areaType: "workplace",
          name: "Facility1-Zone1-Nest2-Workplace3",
        },
        {
          id: ObjectId("5f9714edb24f3e6b7c3007c8"),
          parentArea: ObjectId("5f9714df62240b9cbf9c5af6"), // Zone1
          areaType: "nest",
          name: "Facility1-Zone1-Nest2",
        },
        {
          id: ObjectId("5f9714df62240b9cbf9c5af6"),
          areaType: "zone",
          name: "Facility1-Zone1",
        },
        {
          // root area
          _id: ObjectId("5f9d8abf90c33f61df36d95f"),
          areaType: "facility",
          name: "Facility1",
        },
      ],
    },
  ],
};

module.exports = Constants;
