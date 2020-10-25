/* eslint-disable */

const getAreaBookingTimeStatisticsDtoInType = shape({
  datetimeFrom: date().isRequired(),
  datetimeTo: date().isRequired(),
  timeStep: integer().isRequired()
});
