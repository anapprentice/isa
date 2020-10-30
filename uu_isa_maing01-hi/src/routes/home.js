//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import "uu5amchartsg01";
import GraphBookingStats from "../bricks/graph-booking-stats";
import GraphBookingTimeStats from "../bricks/graph-booking-time-stats";
import GraphAreaBookingStats from "../bricks/graph-area-booking-stats";

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
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <div {...attrs}>
        <UU5.Bricks.Row className={CLASS_NAMES.heading()}>Chart #1 - booking count statistics</UU5.Bricks.Row>
        <GraphBookingStats />
        <UU5.Bricks.Row className={CLASS_NAMES.heading()}>Chart #2 - booking time stats</UU5.Bricks.Row>
        <GraphBookingTimeStats />
        <UU5.Bricks.Row className={CLASS_NAMES.heading()}>Chart #3 - area booking stats</UU5.Bricks.Row>
        <GraphAreaBookingStats />
      </div>
    );
  },
  //@@viewOff:render
});

export default Home;
