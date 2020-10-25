//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "GraphBookingStats",
  //@@viewOff:statics
};

export const GraphBookingStats = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    let graphData = props.data.map(data=>data.data)
    console.log(graphData);

    return (
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
    );
    //@@viewOff:render
  },
});

export default GraphBookingStats;
