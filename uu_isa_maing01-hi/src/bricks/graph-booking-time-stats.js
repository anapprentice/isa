//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
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

  render() {
    //@@viewOn:private
    function convertMinsToHrsMins(inputMinutes) {
      let hours = Math.floor(inputMinutes / 60);
      let minutes = inputMinutes % 60;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let outputString = hours + ":" + minutes + `:00`;
      if (outputString === "24:00:00") {
        return "23:59:59";
      } else {
        return outputString;
      }
    }
    //@@viewOff:private

    //@@viewOn:hooks
    const dataListResult = useDataObject({
      handlerMap: {
        load: getBookingTimeStatistics,
      },
      initialDtoIn: {
        datetimeFrom: "2020-10-15T00:00:00.000Z",
        datetimeTo: "2020-10-15T23:59:59.999Z",
        timeStep: 60,
      },
    });

    function getBookingTimeStatistics(dtoIn) {
      return Calls.getBookingTimeStatistics(dtoIn);
    }

    const { state, data } = dataListResult;
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    let preparedData = [];
    switch (state) {
      case "pending":
      case "pendingNoData":
        return <UU5.Bricks.Loading />;
      case "ready":
        preparedData = data.statistics.map((stat) => {
          return {
            ...stat,
            time: convertMinsToHrsMins(stat.time),
          };
        });
        console.log(preparedData);
        return (
          <div>
            <UU5.AmCharts.Chart
              type="XYChart"
              config={{
                series: [
                  {
                    id: "series1",
                    type: "ColumnSeries",
                    dataFields: {
                      valueY: "startedBookings",
                      categoryX: "time",
                    },
                    columns: {
                      strokeWidth: 2,
                      fill: UU5.Environment.colors.green.c500,
                      fillOpacity: 0.3,
                      states: {
                        hover: {
                          properties: {
                            fill: UU5.Environment.colors.green.c500,
                            fillOpacity: 0.8,
                          },
                        },
                      },
                    },
                    sequencedInterpolation: true,
                    tooltipText: "[{categoryX}: bold]{valueY}[/]",
                    tooltip: {
                      pointerOrientation: "vertical",
                    },
                  },
                  {
                    id: "series2",
                    type: "ColumnSeries",
                    dataFields: {
                      valueY: "finishedBookings",
                      categoryX: "time",
                    },
                    columns: {
                      strokeWidth: 2,
                      fill: UU5.Environment.colors.red.c500,
                      fillOpacity: 0.3,
                      states: {
                        hover: {
                          properties: {
                            fill: UU5.Environment.colors.red.c500,
                            fillOpacity: 0.8,
                          },
                        },
                      },
                    },
                    sequencedInterpolation: true,
                    tooltipText: "[{categoryX}: bold]{valueY}[/]",
                    tooltip: {
                      pointerOrientation: "vertical",
                    },
                  },
                ],
                cursor: {
                  type: "XYCursor",
                  behaviour: "zoomY",
                  lineX: { disabled: true },
                },
                xAxes: [{ type: "CategoryAxis", dataFields: { category: "time" } }],
                yAxes: [{ type: "ValueAxis" }],
                scrollbarX: {
                  type: "Scrollbar",
                },
                data: preparedData,
              }}
              height="512px"
            />
          </div>
        );
    }
    //@@viewOff:render
  },
});

export default GraphBookingTimeStats;
