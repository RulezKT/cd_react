import * as d3 from "d3";
import { appendText } from "../lib/auxiliary_fns.ts";

export const drawNumerology = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,

  width: number,
  height: number,
  formula
) => {
  // console.log("drawNumerology was called");
  // console.log(formula);

  svg
    .append("rect")
    .attr("height", `${height}`)
    .attr("width", `${width}`)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "#D3D3D3")
    .attr("stroke", "#000000");

  //координаты для текста
  let num_x = 0;
  let num_y = 0;

  num_x += 10;
  num_y += 30;

  let numerology_text = `Pifagor numbers: ${formula.pifagor_number_1} , ${formula.pifagor_number_2} , ${formula.pifagor_number_3} 
      , ${formula.pifagor_number_4} , ${formula.pifagor_number_5} , ${formula.pifagor_number_6}  `;
  if (formula.keeper) numerology_text += `    -Keeper-`;
  if (formula.white_mage) numerology_text += `    -White Mage-`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Matrix code: ${formula.matrix_code}.`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Soul level now/past life: ${formula.soul_level}/${formula.soul_level_past_life}.`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Planetary task: ${formula.planetary_task}.`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Social task: ${formula.social_task}.`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Karmic task: ${formula.karmicTask}.`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Meta Cycles: [${formula.mc1}].[${formula.mc2}].[${formula.mc3}].`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Meta tasks: [${formula.mc1_task}].[${formula.mc2_task}].[${formula.mc3_task}].`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Whole life task: ${formula.mc_whole_life_task}. Mc2 optional task: ${formula.mc2_optional_task}`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Opv: ${formula.opv}. Tp: ${formula.tp}. `;
  if (formula.opv2) numerology_text += ` Opv2: ${formula.opv2}.`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;
};
