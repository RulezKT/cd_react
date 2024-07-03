import { useEffect } from "react";
import { FD } from "./fdNew.ts";
import * as d3 from "d3";

const width = 800;
const height = 750;

export const FdNew = (props) => {
  const cdInfo = props.data;
  const calc = props.calc;

  useEffect(() => {
    d3.select("#svg_formula_chart").remove();

    const svg = d3
      .select("#formula_chart")
      .append("svg")
      .attr("id", "svg_formula_chart")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    const fd = new FD(svg, width, height);

    fd.draw(cdInfo, calc);
  });

  return (
    <>
      <div className="formula_chart" id="formula_chart"></div>
    </>
  );
};
