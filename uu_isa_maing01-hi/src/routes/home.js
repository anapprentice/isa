//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useEffect, useRef, useState } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";
import "uu5amchartsg01";

import Config from "./config/config.js";
import Lsi from "../config/lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Home",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  welcomeRow: () => Config.Css.css`
    padding: 56px 0 20px;
    max-width: 624px;
    margin: 0 auto;
    text-align: center;

    ${UU5.Utils.ScreenSize.getMinMediaQueries("s", `text-align: left;`)}

    .uu5-bricks-header {
      margin-top: 8px;
    }

    .plus4u5-bricks-user-photo {
      margin: 0 auto;
    }
  `,
};

export const Home = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <div {...attrs}>
        <UU5.AmCharts.Chart
          type="PieChart"
          config={{
            series: [
              {
                type: "PieSeries",
                dataFields: {
                  value: "litres",
                  category: "country",
                },
              },
            ],
            data: [
              {
                country: "Lithuania",
                litres: 501.9,
              },
              {
                country: "Czech Republic",
                litres: 301.9,
              },
              {
                country: "Ireland",
                litres: 201.1,
              },
              {
                country: "Germany",
                litres: 165.8,
              },
              {
                country: "Australia",
                litres: 139.9,
              },
              {
                country: "Austria",
                litres: 128.3,
              },
              {
                country: "UK",
                litres: 99,
              },
              {
                country: "Belgium",
                litres: 60,
              },
              {
                country: "The Netherlands",
                litres: 50,
              },
            ],
            legend: {},
          }}
          height="512px"
        />
      </div>
    );
    //@@viewOff:render
  },
});

export default Home;
