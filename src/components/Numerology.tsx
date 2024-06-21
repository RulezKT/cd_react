import React from "react";
import { DrawFormulaClass } from "./body_formula.js";
import { useEffect } from "react";
import * as d3 from "d3";

import { drawNumerology } from "./numerology.js";

// const full_width = 3 * 800;
// const full_height = 2 * 750;

const width = 800;
const height = 750;

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
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");



    switch (graph_type) {
      case "full":
        //рисуем Полную Формулу
        drawNumerology(
          svg,
          width / 2,
          (height / 100) * 10,
          width,
          height,
          cdInfo.numerologyInfo.Personality
        );
        break
      case "design":
        //рисуем Красное


        drawNumerology(
          svg,
          width / 2,
          (height / 100) * 10,
          width,
          height,
          cdInfo.numerologyInfo.Design
        );
        break;

      case "personality":
        //рисуем Личность



        drawNumerology(
          svg,
          width / 2,
          (height / 100) * 10,
          width,
          height,
          cdInfo.numerologyInfo.Personality
        );
        break;

      default:
        drawNumerology(
          svg,
          width / 2,
          (height / 100) * 10,
          width,
          height,
          cdInfo.numerologyInfo.Personality
        );
    }





  });

  return (
    <>
      <div className="formula_chart" id="formula_chart"></div>
    </>
  );
};



