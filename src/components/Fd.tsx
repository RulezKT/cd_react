import React from "react";
import { useEffect } from "react";
import { Draw_Fd } from "./fd.ts";
import * as d3 from "d3";

const width = 800;
const height = 750;

export const Fd = (props) => {
  const cdInfo = props.data;

  useEffect(() => {
    let svg = d3.select("#svg_formula_chart").remove();

    svg = d3
      .select("#formula_chart")
      .append("svg")
      .attr("id", "svg_formula_chart")
      .attr("width", width)
      .attr("height", height);

    svg.append("g").attr("transform", "translate(" + 0 + "," + 0 + ")");

    //окантовка
    svg
      .append("rect")
      .attr("height", `${height}`)
      .attr("width", `${width}`)
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill", "#D3D3D3")
      .attr("stroke", "#000000");

    Draw_Fd(svg, 0, 0, width, height, "pers", cdInfo);
  });

  return (
    <>
      <div className="formula_chart" id="formula_chart"></div>
    </>
  );
};
