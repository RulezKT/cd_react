// import ShapeDrawer from "../ShapeDrawer/ShapeDrawer";
import { Body } from "./Body.js";
import { Numerology } from "./Numerology.tsx";
import { Fd } from "./Fd.tsx";

export const BodyGraph = (props) => {
  const graph_type = props.chart;
  // const calcType = props.calc;

  const cdInfo = props.data;
  // console.log(cdInfo);

  // useEffect(() => {
  //   const drawFormula = new DrawFormulaClass(cdInfo, width, height);

  //   drawFormula.drawFormulaV2(graph_type);
  // });

  function renderSwitch(graph_type: string) {
    switch (graph_type) {
      case "bodygraph":
        return <Body data={cdInfo} calc={props.calc} />;

      // case "bodytransits":
      //   return <Body data={cdInfo} />;
      // case "mandala":
      //   return <Body data={cdInfo} />;
      // case "composite":
      //   return <Body data={cdInfo} />;
      case "numerology":
        return <Numerology data={cdInfo} calc={props.calc} />;
      case "fd":
        return <Fd data={cdInfo} calc={props.calc} />;

      default:
        return <Body data={cdInfo} calc={"full"} />;
    }
  }

  return <div>{renderSwitch(graph_type)}</div>;
};
