//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import GraphBookingStats from "./graph-booking-stats";
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

  render(props) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:hooks
    const dataObjectResult = useDataObject({
      initialDtoIn: {
        dateTimeFrom: "2020-10-15T04:00:00.000+00:00",
        dateTimeTo: "2020-10-15T05:00:00.000+00:00",
        timeStep: 30,
      },
      handlerMap: {
        load: getBookingTimeStatistics,
      },
    });

    function getBookingTimeStatistics(dtoInData) {
      return Calls.getBookingTimeStatistics(dtoInData);
    }

    const { state, data } = dataObjectResult;
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    console.log(data);
    // switch (state) {
    //   case "pending":
    //   case "pendingNoData":
    //     return <UU5.Bricks.Loading />;
    //   case "ready":
    //     return (
    //       <div {...attrs}>
    //         <UU5.Bricks.Row className={CLASS_NAMES.heading()}>Chart #1 - booking count statistics</UU5.Bricks.Row>
    //         <GraphBookingStats data={data.statistics} />
    //         <UU5.Bricks.Row className={CLASS_NAMES.heading()}>Chart #2 - booking statistics by time</UU5.Bricks.Row>
    //         <GraphBookingTimeStats data={null} />
    //       </div>
    //     );
    //
    //   case "default":
    //
    // }

    return "BLYAAAT";
    //@@viewOff:render
  },
});

export default GraphBookingTimeStats;
