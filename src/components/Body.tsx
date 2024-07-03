import { DrawFormulaClass } from "./body_formula.js";

import { useEffect } from "react";

const width = 340;
const height = 490;

export const Body = (props) => {
  const cdInfo = props.data;
  // const graph_type = props.calc;

  useEffect(() => {
    // console.log(formula);

    const drawFormula = new DrawFormulaClass(cdInfo, width, height);

    drawFormula.drawFormulaV2(props.calc);
    // console.log("drawFormula was called");
  });

  return (
    <>
      <div className="formula_chart" id="formula_chart"></div>
    </>
  );
};
