//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

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
  content: () => Config.Css.css`
      margin-left: auto;
      margin-right: auto;
      width: 60vw;
  `,
};

export const Structure = createVisualComponent({
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

        <UU5.Bricks.Div className={CLASS_NAMES.content()}>
          <UU5.Bricks.Span className={CLASS_NAMES.heading()} content={"Diagram #1 - Object diagram"} />
          <UU5.Bricks.Image src="../assets/structure.png" />
          <UU5.Bricks.Span className={CLASS_NAMES.heading()} content={"Schema #1 - Area schema"} />
          <UU5.Bricks.Image src="../assets/area_schema.png" width={"800px"}/>
          <UU5.Bricks.Span className={CLASS_NAMES.heading()} content={"Schema #2 - Booking schema"} />
          <UU5.Bricks.Image src="../assets/booking_schema.png" />
        </UU5.Bricks.Div>
      </div>
    );
  },
  //@@viewOff:render
});

export default Structure;
