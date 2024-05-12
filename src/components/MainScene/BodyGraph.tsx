// import ShapeDrawer from "../ShapeDrawer/ShapeDrawer";
import { DrawFormulaClass } from "../body_formula.js";
import { formula } from "../formula_object.js";
import { useEffect } from "react";

const full_width = 3 * 800;
const full_height = 2 * 750;

const width = 800;
const height = 750;

export const BodyGraph = (props) => {
  // console.log(props);

  // const cd_data = props.data.data;
  const graph_type = props.data.radiobutt;

  // const centers = props.data.Centers.Center;

  //formula.personality.sun.hex
  useEffect(() => {
    // console.log(formula);

    const drawFormula = new DrawFormulaClass(
      formula,
      width,
      height,
      full_width,
      full_height
    );

    drawFormula.drawFormulaV2(graph_type);
    // console.log("drawFormula was called");
  });

  // console.log(centers.Throat);
  return (
    <>
      <div className="formula_chart" id="formula_chart"></div>

      <div>{/* <ShapeDrawer /> */}</div>
      {/* 
      <div className="flex flex-col">
        <div className="div">Head : {centers.Head}</div>
        <div className="div">Ajna : {centers.Ajna} </div>

        <div className="div">Throat : {centers.Throat}</div>

        <div className="div">G : {centers.G}</div>

        <div className="div">Ego : {centers.Ego}</div>

        <div className="div">
          Spleen : {centers.Spleen} Sacral : {centers.Sacral} Emo :{" "}
          {centers.Emo}{" "}
        </div>

        <div className="div">Root : {centers.Root}</div>
      </div> */}

      {/* <div className="div">{JSON.stringify(props.data)}</div> */}
    </>
  );
};
