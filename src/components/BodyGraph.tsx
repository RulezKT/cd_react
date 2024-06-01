// import ShapeDrawer from "../ShapeDrawer/ShapeDrawer";
import { Body } from "./Body.js";
import { Numerology } from "./Numerology.js";
import { Fd } from "./Fd.js";

export const BodyGraph = (props) => {
  const graph_type = props.radiobutt;

  const cdInfo = props.data;

  // useEffect(() => {
  //   const drawFormula = new DrawFormulaClass(cdInfo, width, height);

  //   drawFormula.drawFormulaV2(graph_type);
  // });

  function renderSwitch(graph_type: string) {
    switch (graph_type) {
      case "bodygraph":
        return <Body data={cdInfo} radiobutt={graph_type} />;
      case "design":
        return <Body data={cdInfo} radiobutt={graph_type} />;
      case "personality":
        return <Body data={cdInfo} radiobutt={graph_type} />;
      case "bodytransits":
        return <Body data={cdInfo} />;
      case "mandala":
        return <Body data={cdInfo} />;
      case "composite":
        return <Body data={cdInfo} />;
      case "numerology":
        return <Numerology data={cdInfo} />;
      case "fd":
        return <Fd data={cdInfo} />;

      default:
        return <Body data={cdInfo} radiobutt={graph_type} />;
    }
  }

  return <div>{renderSwitch(graph_type)}</div>;
};
