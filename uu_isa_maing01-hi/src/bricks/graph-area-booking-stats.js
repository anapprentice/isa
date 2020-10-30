//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "GraphAreaBookingStats",
  //@@viewOff:statics
};

export const GraphAreaBookingStats = createComponent({
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
        load: getAreaBookingStatistics,
      },
    });

    function getAreaBookingStatistics() {
      return Calls.getAreaBookingStatistics();
    }

    const { state, data } = dataListResult;
    //@@viewOff:hooks

    //@@viewOn:render
    let graphData = { bookingCount: 1, workplace: "Nothing" };
    switch (state) {
      case "pending":
      case "pendingNoData":
        return <UU5.Bricks.Loading />;
      case "ready":
        console.log(data);
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
                      category: "workplace",
                    },
                  },
                ],
                data: graphData,
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

export default GraphAreaBookingStats;
