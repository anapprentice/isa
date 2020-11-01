//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "GraphBookingStats",
  //@@viewOff:statics
};

export const GraphBookingStats = createComponent({
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

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:hooks
    const dataListResult = useDataObject({
      handlerMap: {
        load: getBookingCountStatistics,
      },
    });

    function getBookingCountStatistics() {
      return Calls.getBookingCountStatistics();
    }

    const { state, data } = dataListResult;

    //@@viewOff:hooks

    //@@viewOn:render
    switch (state) {
      case "pending":
      case "pendingNoData":
      default:
        return <UU5.Bricks.Loading />;
      case "ready":
        return (
          <div>
            <UU5.AmCharts.Chart
              type="PieChart"
              config={{
                series: [
                  {
                    type: "PieSeries",
                    dataFields: {
                      value: "bookingCount",
                      category: "area",
                    },
                  },
                ],
                data: data.statistics,
                legend: {},
              }}
              height="512px"
            />
          </div>
        );
    }
    //@@viewOff:render
  },
});

export default GraphBookingStats;
