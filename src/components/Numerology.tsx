import React from "react";
import { DrawFormulaClass } from "./body_formula.js";
import { useEffect } from "react";

// const full_width = 3 * 800;
// const full_height = 2 * 750;

const width = 800;
const height = 750;

export const Numerology = (props) => {
  const cdInfo = props.data;

  useEffect(() => {
    // console.log(formula);

    const drawFormula = new DrawFormulaClass(cdInfo, width, height);

    drawFormula.drawFormulaV2("numerology");
    // console.log("drawFormula was called");
  });

  return (
    <>
      <div className="formula_chart" id="formula_chart"></div>
    </>
  );
};
