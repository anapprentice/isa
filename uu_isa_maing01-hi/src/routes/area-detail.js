//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import "uu5amchartsg01";

import Config from "./config/config.js";
import AreaBookingStatistics from "../bricks/area/area-booking-statistics";
import AreaDetail from "../bricks/area/area-detail";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Home",
  //@@viewOff:statics
};

export const AreaList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    let [areaId, setAreaId] = useState(props.params.id);

    function handleUpdate(id) {
      setAreaId(id);
      let route = "areaDetail";
      let params = { areaId };
      UU5.Environment.getRouter().setRoute(route, params);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <UU5.Bricks.Heading
          content={"Area structure"}
          style={{
            padding: "10px",
            backgroundColor: "darkseagreen",
          }}
        />
        <AreaDetail data={areaId} handleUpdate={handleUpdate} />
        <UU5.Bricks.Heading
          content={"Area Booking statistics"}
          style={{
            padding: "10px",
            backgroundColor: "lightskyblue",
          }}
        />
        <AreaBookingStatistics data={areaId} handleUpdate={handleUpdate} />
      </div>
    );
  },
  //@@viewOff:render
});

export default AreaList;
