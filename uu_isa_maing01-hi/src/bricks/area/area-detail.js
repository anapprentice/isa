//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject, useState } from "uu5g04-hooks";
import * as Uu5Tiles from "uu5tilesg02";
import Config from "./config/config";
import Calls from "../../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "AreaDetail",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  areaName: () => Config.Css.css`
   padding: 18px 0px 18px 18px;
    font-size: 18px;
    color: #3d3d3d;
  `,
  currentAreaName: () => Config.Css.css`
    padding: 18px 0px 18px 18px;
    font-size: 24px;
    font-weight: bold;
    color: black;
  `,
};
export const AreaDetail = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:interface
    let [areaId, setAreaId] = useState(props.data);
    //@@viewOff:interface

    //@@viewOn:hooks
    const dataListResult = useDataObject({
      handlerMap: {
        load: areaStructure,
      },
      initialDtoIn: {
        id: areaId,
      },
    });

    function areaStructure(dtoIn) {
      return Calls.areaStructure(dtoIn);
    }

    const { state, data, handlerMap } = dataListResult;

    //@@viewOff:hooks

    //@@viewOn:private

    function handleUpdate(id) {
      setAreaId(id);
      props.handleUpdate(id);
      handlerMap.load(id);
    }

    function getContent(cellProps) {
      let content;
      if (cellProps.data.id !== props.data) {
        content = (
          <UU5.Bricks.Link
            onClick={() => handleUpdate(cellProps.data.id)}
            onCtrlClick={() => handleUpdate(cellProps.data.id)}
            onWheelClick={() => handleUpdate(cellProps.data.id)}
          >
            <UU5.Bricks.Span className={CLASS_NAMES.areaName()}> {cellProps.data.name}</UU5.Bricks.Span>
          </UU5.Bricks.Link>
        );
      } else {
        content = <UU5.Bricks.Span className={CLASS_NAMES.currentAreaName()}> {cellProps.data.name}</UU5.Bricks.Span>;
      }

      return content;
    }

    function getColumns() {
      return [
        {
          cell: (cellProps) => {
            return getContent(cellProps);
          },
        },
      ];
    }
    //@@viewOff:private

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
            <Uu5Tiles.Controller data={data.areaStructure}>
              <Uu5Tiles.List viewType={"table"} columns={getColumns()} rowHeight={80} />
            </Uu5Tiles.Controller>
          </div>
        );
    }
    //@@viewOff:render
  },
});

export default AreaDetail;
