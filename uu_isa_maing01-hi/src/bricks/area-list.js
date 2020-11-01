//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject } from "uu5g04-hooks";
import * as Uu5Tiles from "uu5tilesg02";
import Config from "./config/config";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "AreaList",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  heading: () => Config.Css.css`
    padding: 18px 0px 18px 18px;
    font-size: 24px;
    font-weight: bold;
    color: #3d3d3d;
  `,
};

export const AreaList = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    function redirectToAreaDetail(id) {
      let route = "areaDetail";
      let params = { id };
      UU5.Environment.getRouter().setRoute(route, params);
    }

    function getColumns() {
      return [
        {
          cell: (cellProps) => {
            return (
              <UU5.Bricks.Link
                onClick={() => redirectToAreaDetail(cellProps.data.id)}
                onCtrlClick={() => redirectToAreaDetail(cellProps.data.id)}
                onWheelClick={() => redirectToAreaDetail(cellProps.data.id)}
              >
                <UU5.Bricks.Span className={CLASS_NAMES.heading()}> {cellProps.data.name}</UU5.Bricks.Span>
              </UU5.Bricks.Link>
            );
          },
        },
      ];
    }
    //@@viewOff:private

    //@@viewOn:hooks
    const dataListResult = useDataObject({
      handlerMap: {
        load: areaList,
      },
    });

    function areaList() {
      return Calls.areaList();
    }

    const { state, data } = dataListResult;
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    switch (state) {
      case "pending":
      case "pendingNoData":
        return <UU5.Bricks.Loading />;
      case "ready":
        return (
          <div>
            <Uu5Tiles.Controller data={data.areaStructure.itemList}>
              <Uu5Tiles.List viewType={"table"} columns={getColumns()} rowHeight={80} />
            </Uu5Tiles.Controller>
          </div>
        );
    }

    //@@viewOff:render
  },
});

export default AreaList;
