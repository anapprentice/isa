//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "AreaBookingStatistics",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  main: () => Config.Css.css`
   padding: 18px 0px 18px 18px;
    font-size: 16px;
    color: #3d3d3d;
  `,
  props: () => Config.Css.css`
    font-weight: bold;
  `,
};

export const AreaBookingStatistics = createComponent({
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

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:hooks
    const dataListResult = useDataObject({
      handlerMap: {
        load: getAreaBookingStatistics,
      },
      initialDtoIn: {
        id: props.data,
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
            <UU5.Bricks.Row className={CLASS_NAMES.main()}>
              <UU5.Bricks.Column>
                <UU5.Bricks.Span className={CLASS_NAMES.props()} content={"Workplace with booking count : "} />
                <UU5.Bricks.Span content={data.statistics.workplaceWithBookingCount} />
              </UU5.Bricks.Column>
              <UU5.Bricks.Column>
                <UU5.Bricks.Span className={CLASS_NAMES.props()} content={"Booking count : " } />
                <UU5.Bricks.Span content={data.statistics.bookingCount} />
              </UU5.Bricks.Column>
              <UU5.Bricks.Column>
                <UU5.Bricks.Span className={CLASS_NAMES.props()} content={"Total booking duration  : "} />
                <UU5.Bricks.Span content={data.statistics.totalBookingDuration} />
              </UU5.Bricks.Column>
            </UU5.Bricks.Row>
          </div>
        );
    }

    //@@viewOff:render
  },
});

export default AreaBookingStatistics;
