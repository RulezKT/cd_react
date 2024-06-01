import { DrawFormulaClass } from "./body_formula.js";

import { useEffect } from "react";

const width = 800;
const height = 750;

export const Body = (props) => {
  const cdInfo = props.data;
  const graph_type = props.radiobutt;

  useEffect(() => {
    // console.log(formula);

    const drawFormula = new DrawFormulaClass(cdInfo, width, height);

    drawFormula.drawFormulaV2(graph_type);
    // console.log("drawFormula was called");
  });

  return (
    <>
      <div className="formula_chart" id="formula_chart"></div>
    </>
  );
};
