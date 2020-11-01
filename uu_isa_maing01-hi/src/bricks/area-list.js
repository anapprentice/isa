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
    function getColumns() {
      return [
        {
          cell: (cellProps) => {
            let content;
            if(cellProps.data.areaType === "zone") content += <UU5.Bricks.Span style={{color:"red", fontSize:"24px"}}>{cellProps.data.name}</UU5.Bricks.Span>
            return JSON.stringify(cellprops)
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
            )
          </div>
        );
    }

    //@@viewOff:render
  },
});

export default AreaList;
