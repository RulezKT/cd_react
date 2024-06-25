import { useEffect } from "react";
import * as d3 from "d3";

import { drawNumerology } from "./numerology.js";

// const full_width = 3 * 800;
// const full_height = 2 * 750;

const width = 440; //800;
const height = 750; //750

export const Numerology = (props) => {
  const cdInfo = props.data;
  const graph_type = props.calc;


  useEffect(() => {
    // console.log(formula);

    // const drawFormula = new DrawFormulaClass(cdInfo, width, height);

    // drawFormula.drawFormulaV2("numerology");
    // console.log("drawFormula was called");



    d3.select("#svg_formula_chart").remove();

    const svg = d3
      .select("#formula_chart")
      .append("svg")
      .attr("id", "svg_formula_chart")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", "0 0 " + width + " " + height)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");


    let info;

    switch (graph_type) {
      case "full":

        //рисуем Полную Формулу
        info = cdInfo.numerologyInfo.Personality;

        break
      case "design":
        //рисуем Красное
        info = cdInfo.numerologyInfo.Design;

        break;

      case "personality":
        //рисуем Личность
        info = cdInfo.numerologyInfo.Personality;

        break;

      default:
        info = cdInfo.numerologyInfo.Personality;

    }

    drawNumerology(
      svg,
      width,
      height,
      info
    );


  });

  return (
    <>
      <div className="formula_chart" id="formula_chart"></div>
    </>
  );
};



