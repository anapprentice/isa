//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "GraphBookingTimeStats",
  //@@viewOff:statics
};

export const GraphBookingTimeStats = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:hooks
    const dataListResult = useDataObject({
      handlerMap: {
        load: getBookingTimeStatistics,
      },
    });

    function getBookingTimeStatistics() {
      let dtoIn = {
        datetimeFrom: "2020-10-15T04:00:00.000+00:00",
        datetimeTo: "2020-10-15T08:00:00.000+00:00",
        timeStep: 30,
      };
      return Calls.getBookingTimeStatistics(dtoIn);
    }

    const { state, data } = dataListResult;
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    let datas = [];
    switch (state) {
      case "pending":
      case "pendingNoData":
        return <UU5.Bricks.Loading />;
      default:
        console.log(data);
        for (let handleData of data.statistics) {
          let date = new Date(handleData.datetime);
          let datetime =
            // date.getFullYear() +
            // `-` +
            // date.getMonth() +
            // `-` +
            // date.getDate() +
            // ` ` +
            `0` + date.getHours() + `:` + date.getMinutes() + `0`;
          datas.push({ startedBookings: handleData.startedBookings, datetime: datetime });
        }
        console.log(datas);
        return (
          <div>
            <UU5.AmCharts.Chart
              type="XYChart"
              config={{
                config: {
                  series: [
                    {
                      id: "serie1",
                      type: "LineSeries",
                      dataFields: {
                        valueY: "startedBookings",
                        dateX: "datetime",
                      },
                      strokeWidth: 2,
                      fillOpacity: 0.5,
                    },
                  ],
                  xAxes: [
                    {
                      type: "DateAxis",
                      dateFormatter: {
                        dateFormat: "HH:mm",
                      },
                    },
                  ],
                  yAxes: [
                    {
                      type: "ValueAxis",
                      dataFields: {
                        category: "time",
                      },
                    },
                  ],
                  data: datas,
                },
              }}
              height="512px"
            />
          </div>
        );
    }
    //@@viewOff:render
  },
});

export default GraphBookingTimeStats;
