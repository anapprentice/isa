//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import "uu5amchartsg01";
import Calls from "../calls";
import GraphBookingStats from "../bricks/graph-booking-stats";

import Config from "./config/config.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Home",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  heading: () => Config.Css.css`
    padding: 56px 0 20px;
    max-width: 624px;
    margin: 0 auto;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  `,
  graph: () => Config.Css.css`
    width: 75%;
    margin: 0 auto;
  `,
};

export const Home = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:hooks
    const dataListResult = useDataList({
      handlerMap: {
        load: getBookingCountStatistics,
      },
    });

    function getBookingCountStatistics() {
      return Calls.getBookingCountStatistics();
    }

    const { state, data, handlerMap } = dataListResult;
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    switch (state) {
      case "pending":
      case "pendingNoData":
        return <UU5.Bricks.Loading />;
      case "ready":
        return (
          <div {...attrs}>
            <UU5.Bricks.Row className={CLASS_NAMES.heading()}>Chart #1 - booking count statistics</UU5.Bricks.Row>
            <GraphBookingStats data={data} />
          </div>
        );
    }
    //@@viewOff:render
  },
});

export default Home;
