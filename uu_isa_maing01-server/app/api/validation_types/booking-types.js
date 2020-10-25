/* eslint-disable */

const getBookingTimeStatisticsDtoInType = shape({
  datetimeFrom: date().isRequired(),
  datetimeTo: date().isRequired(),
  timeStep: integer().isRequired()
});
