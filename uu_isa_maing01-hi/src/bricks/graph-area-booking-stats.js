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
      initialDtoIn: {
        id: "5f9714e7a88022e97252478b",
      },
    });

    function getAreaBookingStatistics(dtoIn) {
      return Calls.getAreaBookingStatistics(dtoIn);
    }

    const { state, data } = dataListResult;
    //@@viewOff:hooks

    //@@viewOn:render
    switch (state) {
      case "pending":
      case "pendingNoData":
        return <UU5.Bricks.Loading />;
      case "ready":
        return (
          <div>
            {JSON.stringify(data)}
          </div>
        );
    }
    //@@viewOff:render
  },
});

export default GraphAreaBookingStats;
