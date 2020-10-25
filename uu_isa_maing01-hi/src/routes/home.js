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

    let chartComponent = useRef();
    let chartData = useState(null);
    function onChartDidMount(chart) {
      console.log("Chart : ", chart);
      chartData = chart;
    }

    if (chartData != null) {
      console.log(chartData);
      useEffect(() => {
        const chart = chartComponent.chart;
        const am4core = chartComponent.am4core;
        const am4charts = chartComponent.am4charts;

        chart.data = [
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
        ];

        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;
      });
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <div {...attrs}>
        <UU5.Bricks.Row className={CLASS_NAMES.welcomeRow()}>
          <UU5.Bricks.Column colWidth="x-12 s-3">
            <Plus4U5.Bricks.UserPhoto width="100px" />
          </UU5.Bricks.Column>
          <UU5.Bricks.Column colWidth="x-12 s-9">
            <UU5.Bricks.Header level="2" content={<UU5.Bricks.Lsi lsi={Lsi.auth.welcome} />} />
            <UU5.Common.Identity>
              {({ identity }) => <UU5.Bricks.Header level="2" content={identity.name} />}
            </UU5.Common.Identity>
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>
        <UU5.Bricks.Row className={CLASS_NAMES.welcomeRow()}>
          <UU5.AmCharts.Chart type={"PieChart"} onMount={onChartDidMount} ref={chartComponent} />
        </UU5.Bricks.Row>
      </div>
    );
    //@@viewOff:render
  },
});

export default Home;
