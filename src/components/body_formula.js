import * as d3 from "d3";
import { lineFunction, appendText, appendTextPlanets, defShorten, typeShorten } from "@/lib/auxiliary_fns.ts";


export const SSB = 0;
export const MERCURY = 1;
export const VENUS = 2;
export const EARTH = 3;
export const MARS = 4;
export const JUPITER = 5;
export const SATURN = 6;
export const URANUS = 7;
export const NEPTUNE = 8;
export const PLUTO = 9;
export const SUN = 10;
export const MOON = 11;
export const NORTHNODE = 12;
export const SOUTHNODE = 13;
export const HIRON = 14;


// let width;
// let height;

let svg;

export function DrawFormulaClass(data_formula, view_width, view_height) {
  // formula = data_formula;

  this.data_formula = data_formula;
  // console.log(data_formula.hd.personality);

  this.width = view_width;
  this.height = view_height;

  //x - посередине
  this.x = this.width / 2 - 130;
  //делаем сверху отступ на 10%
  this.y = (this.height / 100) * 10 - 70;

  this.spInfo = data_formula.hd.specialInfo;

  this.pers_utc = data_formula.time.pers_time_utc;
  this.pers_local = data_formula.time.pers_time_local;

  this.design_short = data_formula.hd.design.planets_data;
  this.pers_short = data_formula.hd.personality.planets_data;

  this.pers_sun_short = data_formula.hd.personality.planets_data[SUN];
  this.pers_earth_short = data_formula.hd.personality.planets_data[EARTH];
  this.pers_moon_short = data_formula.hd.personality.planets_data[MOON];
  this.pers_nnode_short = data_formula.hd.personality.planets_data[NORTHNODE];
  this.pers_snode_short = data_formula.hd.personality.planets_data[SOUTHNODE];
  this.pers_mercury_short = data_formula.hd.personality.planets_data[MERCURY];
  this.pers_venus_short = data_formula.hd.personality.planets_data[VENUS];
  this.pers_mars_short = data_formula.hd.personality.planets_data[MARS];
  this.pers_jupiter_short = data_formula.hd.personality.planets_data[JUPITER];
  this.pers_saturn_short = data_formula.hd.personality.planets_data[SATURN];
  this.pers_neptune_short = data_formula.hd.personality.planets_data[NEPTUNE];
  this.pers_uranus_short = data_formula.hd.personality.planets_data[URANUS];
  this.pers_pluto_short = data_formula.hd.personality.planets_data[PLUTO];

  this.des_sun_short = data_formula.hd.design.planets_data[SUN];
  this.des_earth_short = data_formula.hd.design.planets_data[EARTH];
  this.des_moon_short = data_formula.hd.design.planets_data[MOON];
  this.des_nnode_short = data_formula.hd.design.planets_data[NORTHNODE];
  this.des_snode_short = data_formula.hd.design.planets_data[SOUTHNODE];
  this.des_mercury_short = data_formula.hd.design.planets_data[MERCURY];
  this.des_venus_short = data_formula.hd.design.planets_data[VENUS];
  this.des_mars_short = data_formula.hd.design.planets_data[MARS];
  this.des_jupiter_short = data_formula.hd.design.planets_data[JUPITER];
  this.des_saturn_short = data_formula.hd.design.planets_data[SATURN];
  this.des_neptune_short = data_formula.hd.design.planets_data[NEPTUNE];
  this.des_uranus_short = data_formula.hd.design.planets_data[URANUS];
  this.des_pluto_short = data_formula.hd.design.planets_data[PLUTO];

  //удаляем старый график before drawing a new one
  svg = d3.select("#svg_formula_chart").remove();

  svg = d3
    .select("#formula_chart")
    .append("svg")
    .attr("id", "svg_formula_chart")
    // .attr("viewBox", `0 0 340 ${this.height}`)
    .attr("width", this.width)
    .attr("height", this.height);

  svg.append("g").attr("transform", "translate(" + 0 + "," + 0 + ")");

  //окантовка
  svg
    .append("rect")
    .attr("height", `${this.height}`)
    .attr("width", `${this.width}`)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "#D3D3D3")
    .attr("stroke", "#000000");

  //рисуем планеты

  this.radius = 25;

  this.styles = {
    family: "futura, sans-serif",
    size: 12,
    leading: 50,
    weight: 700,
  };

  //ширина 1 центра 10%
  this.width_of_1_centre = (this.width / 100) * 10;

  //высота 1 центра 10%
  this.height_of_1_centre = (this.height / 100) * 10;

  //делаем начальный промежуток между центрами 3%
  this.gap_between_centres = (this.height / 100) * 3;

  this.headCentreCoord = {};
  this.ajnaCentreCoord = {};
  this.throatCentreCoord = {};
  this.gCentreCoord = {};
  this.sacralCentreCoord = {};
  this.rootCentreCoord = {};
  this.egoCentreCoord = {};
  this.spleenCentreCoord = {};
  this.emoCentreCoord = {};

  //размер, которым рисуется планета
  this.size_of_the_planet_to_draw = 14;

  this.init();
}

//Определяет начальные координаты и размеры рисунка
// Надо сюда так-же засунуть все надписи
DrawFormulaClass.prototype.init = function () {
  //координаты для текста
  this.pers_x = this.x - this.width / 2;
  this.pers_y = this.y;

  //находим координаты всех ворот, каналов и центров
  let x = this.x;
  let y = this.y;


  // console.log(x, y);

  this.headCentreCoord = {
    x: x,
    y: y,

    text64coordinates: {
      x: x - this.width_of_1_centre / 2 + this.styles.size,
      y: y + this.height_of_1_centre - this.styles.size / 2,
    },

    text61coordinates: {
      x: x - this.styles.size / 2,
      y: y + this.height_of_1_centre - this.styles.size / 2,
    },

    text63coordinates: {
      x: x + this.width_of_1_centre / 2 - this.styles.size * 2,
      y: y + this.height_of_1_centre - this.styles.size / 2,
    },
  };

  const vertical_x_1 = this.headCentreCoord.text64coordinates.x;
  const vertical_x_2 = this.headCentreCoord.text61coordinates.x;
  const vertical_x_3 = this.headCentreCoord.text63coordinates.x;

  y += this.height_of_1_centre * 2 + this.gap_between_centres;


  // console.log(x, y);

  this.ajnaCentreCoord = {
    x: x,
    y: y,

    text47coordinates: {
      x: vertical_x_1,
      y: y - this.height_of_1_centre + this.styles.size,
    },

    text24coordinates: {
      x: vertical_x_2,
      y: y - this.height_of_1_centre + this.styles.size,
    },

    text4coordinates: {
      x: vertical_x_3,
      y: y - this.height_of_1_centre + this.styles.size,
    },

    text17coordinates: {
      x: vertical_x_1,
      y: y - this.height_of_1_centre / 2 - this.styles.size / 2,
    },

    text43coordinates: {
      x: vertical_x_2,
      y: y - this.styles.size * 1.2,
    },

    text11coordinates: {
      x: vertical_x_3,
      y: y - this.height_of_1_centre / 2 - this.styles.size / 2,
    },
  };

  x -= this.width_of_1_centre / 2;
  y += this.gap_between_centres;

  // console.log(x, y)

  this.throatCentreCoord = {
    x: x,
    y: y,

    text62coordinates: {
      x: vertical_x_1,
      y: y + this.styles.size,
    },

    text23coordinates: {
      x: vertical_x_2,
      y: y + this.styles.size,
    },

    text56coordinates: {
      x: vertical_x_3,
      y: y + this.styles.size,
    },

    text31coordinates: {
      x: vertical_x_1,
      y: y + this.height_of_1_centre + this.styles.size / 2,
    },

    text8coordinates: {
      x: vertical_x_2,
      y: y + this.height_of_1_centre + this.styles.size / 2,
    },

    text33coordinates: {
      x: vertical_x_3,
      y: y + this.height_of_1_centre + this.styles.size / 2,
    },

    text16coordinates: {
      x: x,
      y: y + this.styles.size * 2.5,
    },

    text20coordinates: {
      x: x,
      y: y + this.styles.size * 4.5,
    },

    text35coordinates: {
      x: x + this.width_of_1_centre - this.styles.size,
      y: y + this.styles.size * 2,
    },

    text12coordinates: {
      x: x + this.width_of_1_centre - this.styles.size,
      y: y + this.styles.size * 3.5,
    },

    text45coordinates: {
      x: x + this.width_of_1_centre - this.styles.size,
      y: y + this.height_of_1_centre - this.styles.size,
    },
  };

  x += this.width_of_1_centre / 2;
  y += this.height_of_1_centre + this.gap_between_centres * 1.2;

  let x_for_ego = x;
  let y_for_ego = y;

  // console.log(x, y)

  this.gCentreCoord = {
    x: x,
    y: y,

    text7coordinates: {
      x: vertical_x_1,
      y: y + this.styles.size * 3,
    },

    text1coordinates: {
      x: vertical_x_2,
      y: y + this.styles.size,
    },

    text13coordinates: {
      x: vertical_x_3,
      y: y + this.styles.size * 3,
    },

    text10coordinates: {
      x: x - (this.width_of_1_centre * 1.5) / 2 + this.styles.size,
      y: y + (this.height_of_1_centre * 1.4) / 2,
    },

    text25coordinates: {
      x: x + (this.width_of_1_centre * 1.5) / 2 - this.styles.size * 2,
      y: y + (this.height_of_1_centre * 1.4) / 2,
    },

    text15coordinates: {
      x: vertical_x_1,
      y: y + this.height_of_1_centre * 1.25 - this.styles.size * 2,
    },

    text2coordinates: {
      x: vertical_x_2,
      y: y + this.height_of_1_centre * 1.25 - this.styles.size / 2,
    },

    text46coordinates: {
      x: vertical_x_3,
      y: y + this.height_of_1_centre * 1.25 - this.styles.size * 2,
    },
  };

  x -= this.width_of_1_centre / 2;
  y += this.height_of_1_centre * 1.25 + this.gap_between_centres * 4;

  let x_for_spleen = x;
  let y_for_spleen = y;

  let x_for_emo = x;
  let y_for_emo = y;

  // console.log(x, y)

  this.sacralCentreCoord = {
    x: x,
    y: y,
    width: this.radius * 3,
    height: this.radius * 3,

    text5coordinates: {
      x: vertical_x_1,
      y: y + this.styles.size,
    },

    text14coordinates: {
      x: vertical_x_2,
      y: y + this.styles.size,
    },

    text29coordinates: {
      x: vertical_x_3,
      y: y + this.styles.size,
    },

    text42coordinates: {
      x: vertical_x_1,
      y: y + this.height_of_1_centre - this.styles.size / 2,
    },

    text3coordinates: {
      x: vertical_x_2,
      y: y + this.height_of_1_centre - this.styles.size / 2,
    },

    text9coordinates: {
      x: vertical_x_3,
      y: y + this.height_of_1_centre - this.styles.size / 2,
    },

    text34coordinates: {
      x: x + this.styles.size / 4,
      y: y + this.styles.size * 2,
    },

    text27coordinates: {
      x: x + this.styles.size / 4,
      y: y + this.styles.size * 4,
    },

    text59coordinates: {
      x: x + this.width_of_1_centre - this.styles.size * 1.5,
      y: y + this.styles.size * 4,
    },
  };

  y += this.height_of_1_centre + this.gap_between_centres * 1.2;
  // console.log(x, y)
  this.rootCentreCoord = {
    x: x,
    y: y,
    width: this.radius * 3,
    height: this.radius * 3,

    text53coordinates: {
      x: vertical_x_1,
      y: y + this.styles.size,
    },

    text60coordinates: {
      x: vertical_x_2,
      y: y + this.styles.size,
    },

    text52coordinates: {
      x: vertical_x_3,
      y: y + this.styles.size,
    },

    text54coordinates: {
      x: x + this.styles.size / 2,
      y: y + this.styles.size * 2.5,
    },

    text38coordinates: {
      x: x + this.styles.size / 2,
      y: y + this.styles.size * 4,
    },

    text58coordinates: {
      x: x + this.styles.size / 2,
      y: y + this.styles.size * 6,
    },

    text19coordinates: {
      x: x + this.width_of_1_centre - this.styles.size * 1.5,
      y: y + this.styles.size * 2.2,
    },

    text39coordinates: {
      x: x + this.width_of_1_centre - this.styles.size * 1.5,
      y: y + this.styles.size * 3.5,
    },

    text41coordinates: {
      x: x + this.width_of_1_centre - this.styles.size * 1.5,
      y: y + this.styles.size * 6,
    },

    gate53coordinates: {
      x: x - this.radius,
      y: y - this.radius - this.styles.size / 2,
    },

    gate60coordinates: {
      x: x,
      y: y - this.radius - this.styles.size / 2,
    },

    gate52coordinates: {
      x: x + this.radius,
      y: y - this.radius - this.styles.size / 2,
    },

    gate54coordinates: {
      x: x - this.radius,
      y: y - this.radius + this.styles.size,
    },

    gate58coordinates: {
      x: x - this.radius,
      y: y + this.radius + this.styles.size / 2,
    },

    gate38coordinates: {
      x: x - this.radius,
      y: y - this.radius + this.styles.size * 3,
    },

    gate19coordinates: {
      x: x + this.radius,
      y: y - this.radius + this.styles.size,
    },

    gate39coordinates: {
      x: x + this.radius,
      y: y - this.radius + this.styles.size * 3,
    },

    gate41coordinates: {
      x: x + this.radius,
      y: y + this.radius + this.styles.size / 2,
    },
  };

  x = x_for_ego + this.width_of_1_centre * 1.2 + this.gap_between_centres;
  y = y_for_ego + this.height_of_1_centre / 2 + this.gap_between_centres;

  // console.log(x, y);
  this.egoCentreCoord = {
    x: x,
    y: y,

    text21coordinates: {
      x: x - this.styles.size,
      y: y + this.styles.size * 1.4,
    },

    text51coordinates: {
      x: x - this.styles.size * 2.5,
      y: y + this.styles.size * 2.5,
    },

    text26coordinates: {
      x: x - this.styles.size * 4 - this.styles.size / 4,
      y: y + this.styles.size * 4,
    },

    text40coordinates: {
      x: x - this.styles.size / 4,
      y: y + this.styles.size * 5,
    },
  };

  x = x_for_spleen - this.gap_between_centres * 10;
  y = y_for_spleen - this.height_of_1_centre / 2;

  // console.log(x, y);

  this.spleenCentreCoord = {
    x: 5,
    y: 448.25,

    text48coordinates: {
      x: x,
      y: y + this.styles.size * 1.5,
    },

    text57coordinates: {
      x: x + this.styles.size * 1.5,
      y: y + this.styles.size * 2.5,
    },

    text44coordinates: {
      x: x + this.styles.size * 4,
      y: y + this.styles.size * 4,
    },

    text50coordinates: {
      x: x + this.styles.size * 6,
      y: y + this.styles.size * 5,
    },

    text32coordinates: {
      x: x + this.styles.size * 3.7,
      y: y + this.height_of_1_centre * 1.5 - this.styles.size * 3,
    },

    text28coordinates: {
      x: x + this.styles.size * 2,
      y: y + this.height_of_1_centre * 1.5 - this.styles.size * 2,
    },

    text18coordinates: {
      x: x,
      y: y + this.height_of_1_centre * 1.5 - this.styles.size,
    },
  };






  x = x_for_emo + this.gap_between_centres * 14;
  y = y_for_emo - this.height_of_1_centre / 2;

  // console.log(x, y);

  this.emoCentreCoord = {
    x: x,
    y: y,

    text6coordinates: {
      x: x - this.width_of_1_centre - this.styles.size,
      y: y + this.styles.size * 5,
    },

    text37coordinates: {
      x: x - this.styles.size * 5,
      y: y + this.styles.size * 4,
    },

    text22coordinates: {
      x: x - this.styles.size * 3,
      y: y + this.styles.size * 2 + this.styles.size / 2,
    },

    text36coordinates: {
      x: x - this.styles.size * 1.4,
      y: y + this.styles.size + this.styles.size / 2,
    },

    text49coordinates: {
      x: x - this.width_of_1_centre + this.styles.size,
      y: y + this.height_of_1_centre - this.styles.size / 4,
    },

    text55coordinates: {
      x: x - this.width_of_1_centre + this.styles.size * 3,
      y: y + this.height_of_1_centre * 1.2 - this.styles.size / 2,
    },

    text30coordinates: {
      x: x - this.styles.size * 1.4,
      y: y + this.height_of_1_centre * 1.5 - this.styles.size,
    },
  };
};


DrawFormulaClass.prototype.drawWhiteIntegration = function () {

  const x = 128;
  const y = 246;

  let points = [
    {
      x: x,
      y: y,
    },
    {
      x: x - 103,
      y: y + 230,
    },
    {
      x: x - 93,
      y: y + 236,
    },
    {
      x: x - 67,
      y: y + 175,
    },
    {
      x: x - 3,
      y: y + 261.8,
    },

    {
      x: x + 7,
      y: y + 258,
    },
    {
      x: x - 61,
      y: y + 160,
    },
    {
      x: x - 37,
      y: y + 110,
    },
    {
      x: x - 33,
      y: y + 102,
    },
    {
      x: x + 8,
      y: y + 118,
    },


    {
      x: x - 31,
      y: y + 92,
    },

    {
      x: x - 4,
      y: y + 30,
    },
    {
      x: x,
      y: y,
    },
  ];



  svg
    .append("path")
    .attr("d", lineFunction(points))
    .attr("stroke", "black")
    .attr("fill", "white");
};

// DrawFormulaClass.prototype.draw_20_57_Integration = function (data) {
//   let points = [];
//   let mixed_line = NaN;

//   //drawing the whole channel
//   if (data.gate === "both") {
//     points = [
//       {
//         x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
//         y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
//       },
//       {
//         x: this.spleenCentreCoord.text57coordinates.x,
//         y: this.spleenCentreCoord.text57coordinates.y,
//       },

//       {
//         x: this.spleenCentreCoord.text57coordinates.x + data.width,
//         y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
//       },

//       {
//         x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
//         y: this.throatCentreCoord.text20coordinates.y,
//       },
//       {
//         x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
//         y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
//       },
//     ];

//     if (data.type === "both") {
//       mixed_line = svg.append("g");
//       mixed_line
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", "red");

//       points = [
//         {
//           x:
//             this.throatCentreCoord.text20coordinates.x +
//             this.styles.size / 2 +
//             data.half_width * 1.4,
//           y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
//         },
//         {
//           x: this.spleenCentreCoord.text57coordinates.x + data.half_width * 1.4,
//           y: this.spleenCentreCoord.text57coordinates.y,
//         },

//         {
//           x: this.spleenCentreCoord.text57coordinates.x + data.width,
//           y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
//         },

//         {
//           x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
//           y: this.throatCentreCoord.text20coordinates.y,
//         },

//         {
//           x:
//             this.throatCentreCoord.text20coordinates.x +
//             this.styles.size / 2 +
//             data.half_width,
//           y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
//         },
//       ];

//       mixed_line
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", "black");

//       mixed_line.attr(
//         "transform",
//         `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//       );
//     } else {
//       svg
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", data.type)
//         .attr(
//           "transform",
//           `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//         );
//     }
//   }

//   if (data.gate === "top") {
//     points = [
//       {
//         x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
//         y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.temp_height / 2 +
//           data.temp_height / 7.5,
//         y:
//           this.spleenCentreCoord.text57coordinates.y +
//           data.temp_width / 3 -
//           data.width -
//           (data.temp_height * 2) / 7 -
//           data.width,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.temp_height / 2 +
//           data.temp_height / 5,
//         y:
//           this.spleenCentreCoord.text57coordinates.y +
//           data.temp_width / 3 -
//           data.width -
//           (data.temp_height * 2) / 7 -
//           data.width,
//       },

//       {
//         x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
//         y: this.throatCentreCoord.text20coordinates.y,
//       },
//       {
//         x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
//         y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
//       },
//     ];

//     if (data.type === "both") {
//       mixed_line = svg.append("g");
//       mixed_line
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", "red");

//       points = [
//         {
//           x:
//             this.throatCentreCoord.text20coordinates.x +
//             this.styles.size / 2 +
//             data.half_width * 1.4,
//           y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
//         },

//         {
//           x:
//             this.spleenCentreCoord.text57coordinates.x +
//             data.temp_height / 2 +
//             data.temp_height / 7.5 +
//             data.half_width * 1.4,
//           y:
//             this.spleenCentreCoord.text57coordinates.y +
//             data.temp_width / 3 -
//             data.width -
//             (data.temp_height * 2) / 7 -
//             data.width,
//         },

//         {
//           x:
//             this.spleenCentreCoord.text57coordinates.x +
//             data.temp_height / 2 +
//             data.temp_height / 5,
//           y:
//             this.spleenCentreCoord.text57coordinates.y +
//             data.temp_width / 3 -
//             data.width -
//             (data.temp_height * 2) / 7 -
//             data.width,
//         },

//         {
//           x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
//           y: this.throatCentreCoord.text20coordinates.y,
//         },
//         {
//           x:
//             this.throatCentreCoord.text20coordinates.x +
//             this.styles.size / 2 +
//             data.half_width * 1.4,
//           y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
//         },
//       ];

//       mixed_line
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", "black");

//       mixed_line.attr(
//         "transform",
//         `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//       );
//     } else {
//       svg
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", data.type)
//         .attr(
//           "transform",
//           `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//         );
//     }
//   }

//   if (data.gate === "bottom") {
//     points = [
//       {
//         x: this.spleenCentreCoord.text57coordinates.x,
//         y: this.spleenCentreCoord.text57coordinates.y,
//       },

//       {
//         x: this.spleenCentreCoord.text57coordinates.x + data.width,
//         y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.width +
//           data.temp_height / 3.7,
//         y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3.5,
//       },

//       {
//         x: this.spleenCentreCoord.text57coordinates.x + data.temp_height / 4,
//         y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3.5,
//       },

//       {
//         x: this.spleenCentreCoord.text57coordinates.x,
//         y: this.spleenCentreCoord.text57coordinates.y,
//       },
//     ];

//     if (data.type === "both") {
//       mixed_line = svg.append("g");
//       mixed_line
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", "red");

//       points = [
//         {
//           x: this.spleenCentreCoord.text57coordinates.x + data.half_width * 1.4,
//           y: this.spleenCentreCoord.text57coordinates.y,
//         },

//         {
//           x: this.spleenCentreCoord.text57coordinates.x + data.width,
//           y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
//         },

//         {
//           x:
//             this.spleenCentreCoord.text57coordinates.x +
//             data.width +
//             data.temp_height / 3.7,
//           y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3.5,
//         },

//         {
//           x:
//             this.spleenCentreCoord.text57coordinates.x +
//             data.temp_height / 4 +
//             data.half_width * 1.4,
//           y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3.5,
//         },

//         {
//           x: this.spleenCentreCoord.text57coordinates.x + data.half_width * 1.4,
//           y: this.spleenCentreCoord.text57coordinates.y,
//         },
//       ];

//       mixed_line
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", "black");

//       mixed_line.attr(
//         "transform",
//         `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//       );
//     } else {
//       svg
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", data.type)
//         .attr(
//           "transform",
//           `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//         );
//     }
//   }
// };

// DrawFormulaClass.prototype.draw_57_34_Integration = function (data) {
//   let points = [];
//   let mixed_line = NaN;

//   //drawing the whole channel

//   points = [
//     {
//       x: this.sacralCentreCoord.text34coordinates.x,
//       y: this.sacralCentreCoord.text34coordinates.y,
//     },
//     {
//       x: this.sacralCentreCoord.text34coordinates.x + data.width,
//       y: this.sacralCentreCoord.text34coordinates.y - data.width,
//     },

//     {
//       x:
//         this.spleenCentreCoord.text57coordinates.x +
//         data.temp_height / 3.2 +
//         data.width,
//       y:
//         this.spleenCentreCoord.text57coordinates.y +
//         data.temp_width / 2.7 -
//         data.width,
//     },

//     {
//       x: this.spleenCentreCoord.text57coordinates.x,
//       y: this.spleenCentreCoord.text57coordinates.y,
//     },
//     {
//       x: this.spleenCentreCoord.text57coordinates.x + data.width,
//       y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
//     },
//     {
//       x:
//         this.spleenCentreCoord.text57coordinates.x +
//         data.width +
//         data.temp_height / 3.2,
//       y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3,
//     },

//     {
//       x: this.sacralCentreCoord.text34coordinates.x,
//       y: this.sacralCentreCoord.text34coordinates.y,
//     },
//   ];

//   if (data.type === "both") {
//     mixed_line = svg.append("g");
//     mixed_line
//       .append("path")
//       .attr("d", lineFunction(points))
//       .attr("stroke", "black")
//       .attr("fill", "red");

//     points = [
//       {
//         x: this.sacralCentreCoord.text34coordinates.x,
//         y: this.sacralCentreCoord.text34coordinates.y,
//       },
//       {
//         x: this.sacralCentreCoord.text34coordinates.x + data.width,
//         y: this.sacralCentreCoord.text34coordinates.y - data.half_width * 0.8,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.temp_height / 3.2 +
//           data.width,
//         y:
//           this.spleenCentreCoord.text57coordinates.y +
//           data.temp_width / 2.7 -
//           data.half_width * 0.8,
//       },

//       {
//         x: this.spleenCentreCoord.text57coordinates.x + data.half_width * 1.4,
//         y: this.spleenCentreCoord.text57coordinates.y,
//       },

//       {
//         x: this.spleenCentreCoord.text57coordinates.x + data.width,
//         y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
//       },
//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.width +
//           data.temp_height / 3.2,
//         y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3,
//       },

//       {
//         x: this.sacralCentreCoord.text34coordinates.x,
//         y: this.sacralCentreCoord.text34coordinates.y,
//       },
//     ];

//     mixed_line
//       .append("path")
//       .attr("d", lineFunction(points))
//       .attr("stroke", "black")
//       .attr("fill", "black");

//     mixed_line.attr(
//       "transform",
//       `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//     );
//   } else {
//     svg
//       .append("path")
//       .attr("d", lineFunction(points))
//       .attr("stroke", "black")
//       .attr("fill", data.type)
//       .attr(
//         "transform",
//         `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//       );
//   }
// };

// DrawFormulaClass.prototype.draw_57_10_Integration = function (data) {
//   let points = [];
//   let mixed_line = NaN;

//   //drawing the whole channel

//   points = [
//     {
//       x: this.gCentreCoord.text10coordinates.x,
//       y: this.gCentreCoord.text10coordinates.y,
//     },
//     {
//       x: this.gCentreCoord.text10coordinates.x,
//       y: this.gCentreCoord.text10coordinates.y - data.width,
//     },

//     {
//       x:
//         this.spleenCentreCoord.text57coordinates.x +
//         data.temp_height / 2 +
//         data.temp_height / 8 -
//         data.width * 1.6,
//       y:
//         this.spleenCentreCoord.text57coordinates.y +
//         data.temp_width / 3 -
//         data.width -
//         (data.temp_height * 2) / 10 -
//         data.width,
//     },

//     {
//       x: this.spleenCentreCoord.text57coordinates.x,
//       y: this.spleenCentreCoord.text57coordinates.y,
//     },
//     {
//       x: this.spleenCentreCoord.text57coordinates.x + data.width,
//       y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
//     },

//     {
//       x:
//         this.spleenCentreCoord.text57coordinates.x +
//         data.temp_height / 2 +
//         data.temp_height / 12,
//       y:
//         this.spleenCentreCoord.text57coordinates.y +
//         data.temp_width / 3 -
//         data.width -
//         (data.temp_height * 2) / 10,
//     },

//     {
//       x: this.gCentreCoord.text10coordinates.x,
//       y: this.gCentreCoord.text10coordinates.y,
//     },
//   ];

//   if (data.type === "both") {
//     mixed_line = svg.append("g");
//     mixed_line
//       .append("path")
//       .attr("d", lineFunction(points))
//       .attr("stroke", "black")
//       .attr("fill", "red");

//     points = [
//       {
//         x: this.gCentreCoord.text10coordinates.x,
//         y: this.gCentreCoord.text10coordinates.y,
//       },
//       {
//         x: this.gCentreCoord.text10coordinates.x,
//         y: this.gCentreCoord.text10coordinates.y - data.half_width * 0.8,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.temp_height / 2 +
//           data.temp_height / 8 -
//           data.width * 1.6,
//         y:
//           this.spleenCentreCoord.text57coordinates.y +
//           data.temp_width / 3 -
//           data.width -
//           (data.temp_height * 2) / 10 -
//           data.half_width * 0.8,
//       },

//       {
//         x: this.spleenCentreCoord.text57coordinates.x + data.half_width * 1.4,
//         y: this.spleenCentreCoord.text57coordinates.y,
//       },

//       {
//         x: this.spleenCentreCoord.text57coordinates.x + data.width,
//         y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.temp_height / 2 +
//           data.temp_height / 12,
//         y:
//           this.spleenCentreCoord.text57coordinates.y +
//           data.temp_width / 3 -
//           data.width -
//           (data.temp_height * 2) / 10,
//       },

//       {
//         x: this.gCentreCoord.text10coordinates.x,
//         y: this.gCentreCoord.text10coordinates.y,
//       },
//     ];

//     mixed_line
//       .append("path")
//       .attr("d", lineFunction(points))
//       .attr("stroke", "black")
//       .attr("fill", "black");

//     mixed_line.attr(
//       "transform",
//       `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//     );
//   } else {
//     svg
//       .append("path")
//       .attr("d", lineFunction(points))
//       .attr("stroke", "black")
//       .attr("fill", data.type)
//       .attr(
//         "transform",
//         `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//       );
//   }
// };

// DrawFormulaClass.prototype.draw_10_34_Integration = function (data) {
//   let points = [];
//   let mixed_line = NaN;

//   //drawing the whole channel
//   if (data.gate === "both") {
//     points = [
//       {
//         x: this.sacralCentreCoord.text34coordinates.x,
//         y: this.sacralCentreCoord.text34coordinates.y,
//       },
//       {
//         x: this.sacralCentreCoord.text34coordinates.x + data.width,
//         y: this.sacralCentreCoord.text34coordinates.y - data.width,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.temp_height / 2 -
//           data.width * 2.3,
//         y:
//           this.spleenCentreCoord.text57coordinates.y +
//           data.temp_width / 3 -
//           data.width,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.temp_height / 2 +
//           data.temp_height / 12,
//         y:
//           this.spleenCentreCoord.text57coordinates.y +
//           data.temp_width / 3 -
//           data.width -
//           (data.temp_height * 2) / 10,
//       },

//       {
//         x: this.gCentreCoord.text10coordinates.x,
//         y: this.gCentreCoord.text10coordinates.y,
//       },
//       {
//         x: this.gCentreCoord.text10coordinates.x,
//         y: this.gCentreCoord.text10coordinates.y - data.width,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.temp_height / 2 +
//           data.temp_height / 18,
//         y:
//           this.spleenCentreCoord.text57coordinates.y +
//           data.temp_width / 3 -
//           data.width -
//           (data.temp_height * 2) / 10 -
//           data.width,
//       },

//       {
//         x: this.spleenCentreCoord.text57coordinates.x + data.temp_height / 3.2,
//         y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 2.7,
//       },

//       {
//         x: this.sacralCentreCoord.text34coordinates.x,
//         y: this.sacralCentreCoord.text34coordinates.y,
//       },
//     ];

//     if (data.type === "both") {
//       mixed_line = svg.append("g");
//       mixed_line
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", "red");

//       points = [
//         {
//           x: this.sacralCentreCoord.text34coordinates.x + data.half_width,
//           y: this.sacralCentreCoord.text34coordinates.y - data.half_width,
//         },
//         {
//           x: this.sacralCentreCoord.text34coordinates.x + data.width,
//           y: this.sacralCentreCoord.text34coordinates.y - data.width,
//         },

//         {
//           x:
//             this.spleenCentreCoord.text57coordinates.x +
//             data.temp_height / 2 -
//             data.width * 2.3,
//           y:
//             this.spleenCentreCoord.text57coordinates.y +
//             data.temp_width / 3 -
//             data.width,
//         },

//         {
//           x:
//             this.spleenCentreCoord.text57coordinates.x +
//             data.temp_height / 2 +
//             data.temp_height / 12,
//           y:
//             this.spleenCentreCoord.text57coordinates.y +
//             data.temp_width / 3 -
//             data.width -
//             (data.temp_height * 2) / 10,
//         },

//         {
//           x: this.gCentreCoord.text10coordinates.x,
//           y: this.gCentreCoord.text10coordinates.y,
//         },
//         {
//           x: this.gCentreCoord.text10coordinates.x,
//           y:
//             this.gCentreCoord.text10coordinates.y -
//             data.width +
//             data.half_width,
//         },

//         {
//           x:
//             this.spleenCentreCoord.text57coordinates.x +
//             data.temp_height / 2 +
//             data.temp_height / 18 +
//             data.half_width,
//           y:
//             this.spleenCentreCoord.text57coordinates.y +
//             data.temp_width / 3 -
//             data.width -
//             (data.temp_height * 2) / 10 -
//             data.width +
//             data.half_width,
//         },

//         {
//           x:
//             this.spleenCentreCoord.text57coordinates.x +
//             data.temp_height / 3.2 +
//             data.half_width * 2,
//           y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 2.7,
//         },

//         {
//           x: this.sacralCentreCoord.text34coordinates.x + data.half_width,
//           y: this.sacralCentreCoord.text34coordinates.y - data.half_width,
//         },
//       ];

//       mixed_line
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", "black");

//       mixed_line.attr(
//         "transform",
//         `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//       );
//     } else {
//       svg
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", data.type)
//         .attr(
//           "transform",
//           `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//         );
//     }
//   }

//   if (data.gate === "top") {
//     points = [
//       {
//         x: this.gCentreCoord.text10coordinates.x,
//         y: this.gCentreCoord.text10coordinates.y,
//       },
//       {
//         x: this.gCentreCoord.text10coordinates.x,
//         y: this.gCentreCoord.text10coordinates.y - data.width,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.temp_height / 2 +
//           data.temp_height / 5,
//         y:
//           this.spleenCentreCoord.text57coordinates.y +
//           data.temp_width / 3 -
//           data.width -
//           (data.temp_height * 2) / 10 -
//           data.width,
//       },
//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.temp_height / 2 +
//           data.temp_height / 5,
//         y:
//           this.spleenCentreCoord.text57coordinates.y +
//           data.temp_width / 3 -
//           data.width -
//           (data.temp_height * 2) / 10,
//       },

//       {
//         x: this.gCentreCoord.text10coordinates.x,
//         y: this.gCentreCoord.text10coordinates.y,
//       },
//     ];

//     if (data.type === "both") {
//       mixed_line = svg.append("g");
//       mixed_line
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", "red");

//       points = [
//         {
//           x: this.gCentreCoord.text10coordinates.x,
//           y: this.gCentreCoord.text10coordinates.y,
//         },
//         {
//           x: this.gCentreCoord.text10coordinates.x,
//           y:
//             this.gCentreCoord.text10coordinates.y -
//             data.width +
//             data.half_width,
//         },

//         {
//           x:
//             this.spleenCentreCoord.text57coordinates.x +
//             data.temp_height / 2 +
//             data.temp_height / 5,
//           y:
//             this.spleenCentreCoord.text57coordinates.y +
//             data.temp_width / 3 -
//             data.width -
//             (data.temp_height * 2) / 10 -
//             data.width +
//             data.half_width,
//         },
//         {
//           x:
//             this.spleenCentreCoord.text57coordinates.x +
//             data.temp_height / 2 +
//             data.temp_height / 5,
//           y:
//             this.spleenCentreCoord.text57coordinates.y +
//             data.temp_width / 3 -
//             data.width -
//             (data.temp_height * 2) / 10,
//         },

//         {
//           x: this.gCentreCoord.text10coordinates.x,
//           y: this.gCentreCoord.text10coordinates.y,
//         },
//       ];

//       mixed_line
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", "black");

//       mixed_line.attr(
//         "transform",
//         `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//       );
//     } else {
//       svg
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", data.type)
//         .attr(
//           "transform",
//           `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//         );
//     }
//   }

//   if (data.gate === "bottom") {
//     points = [
//       {
//         x: this.sacralCentreCoord.text34coordinates.x,
//         y: this.sacralCentreCoord.text34coordinates.y,
//       },
//       {
//         x: this.sacralCentreCoord.text34coordinates.x + data.width,
//         y: this.sacralCentreCoord.text34coordinates.y - data.width,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.temp_height / 2 -
//           data.width * 2.3,
//         y:
//           this.spleenCentreCoord.text57coordinates.y +
//           data.temp_width / 3 -
//           data.width,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.width +
//           data.temp_height / 3.2,
//         y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3,
//       },

//       {
//         x: this.sacralCentreCoord.text34coordinates.x,
//         y: this.sacralCentreCoord.text34coordinates.y,
//       },
//     ];

//     if (data.type === "both") {
//       mixed_line = svg.append("g");
//       mixed_line
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", "red");

//       points = [
//         {
//           x: this.sacralCentreCoord.text34coordinates.x,
//           y: this.sacralCentreCoord.text34coordinates.y,
//         },
//         {
//           x:
//             this.sacralCentreCoord.text34coordinates.x +
//             data.width -
//             data.half_width,
//           y:
//             this.sacralCentreCoord.text34coordinates.y -
//             data.width +
//             data.half_width,
//         },

//         {
//           x:
//             this.spleenCentreCoord.text57coordinates.x +
//             data.temp_height / 2 -
//             data.width * 2.3 -
//             data.half_width,
//           y:
//             this.spleenCentreCoord.text57coordinates.y +
//             data.temp_width / 3 -
//             data.width +
//             data.half_width,
//         },

//         {
//           x:
//             this.spleenCentreCoord.text57coordinates.x +
//             data.width +
//             data.temp_height / 3.2,
//           y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3,
//         },

//         {
//           x: this.sacralCentreCoord.text34coordinates.x,
//           y: this.sacralCentreCoord.text34coordinates.y,
//         },
//       ];

//       mixed_line
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", "black");

//       mixed_line.attr(
//         "transform",
//         `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//       );
//     } else {
//       svg
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", data.type)
//         .attr(
//           "transform",
//           `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//         );
//     }
//   }
// };

// DrawFormulaClass.prototype.draw_20_34_Integration = function (data) {
//   let points = [];
//   let mixed_line = NaN;

//   // console.log("inside")

//   //drawing the whole channel
//   if (data.gate === "both") {
//     points = [
//       {
//         x: this.sacralCentreCoord.text34coordinates.x,
//         y: this.sacralCentreCoord.text34coordinates.y,
//       },
//       {
//         x: this.sacralCentreCoord.text34coordinates.x + data.width,
//         y: this.sacralCentreCoord.text34coordinates.y - data.width,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.temp_height / 2 -
//           data.width * 2.3,
//         y:
//           this.spleenCentreCoord.text57coordinates.y +
//           data.temp_width / 3 -
//           data.width,
//       },

//       {
//         x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
//         y: this.throatCentreCoord.text20coordinates.y,
//       },
//       {
//         x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
//         y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
//       },

//       {
//         x: this.spleenCentreCoord.text57coordinates.x + data.temp_height / 3.2,
//         y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 2.7,
//       },

//       {
//         x: this.sacralCentreCoord.text34coordinates.x,
//         y: this.sacralCentreCoord.text34coordinates.y,
//       },
//     ];

//     // console.log(points)
//     if (data.type === "both") {
//       mixed_line = svg.append("g");
//       mixed_line
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", "red");

//       points = [
//         {
//           x: this.sacralCentreCoord.text34coordinates.x + data.half_width,
//           y: this.sacralCentreCoord.text34coordinates.y - data.half_width,
//         },
//         {
//           x: this.sacralCentreCoord.text34coordinates.x + data.width,
//           y: this.sacralCentreCoord.text34coordinates.y - data.width,
//         },

//         {
//           x:
//             this.spleenCentreCoord.text57coordinates.x +
//             data.temp_height / 2 -
//             data.width * 2.3,
//           y:
//             this.spleenCentreCoord.text57coordinates.y +
//             data.temp_width / 3 -
//             data.width,
//         },

//         {
//           x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
//           y: this.throatCentreCoord.text20coordinates.y,
//         },
//         {
//           x:
//             this.throatCentreCoord.text20coordinates.x +
//             this.styles.size / 2 +
//             data.half_width / 2,
//           y:
//             this.throatCentreCoord.text20coordinates.y -
//             this.styles.size / 2 +
//             data.half_width,
//         },

//         {
//           x:
//             this.spleenCentreCoord.text57coordinates.x +
//             data.temp_height / 3.2 +
//             data.half_width * 2,
//           y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 2.7,
//         },

//         {
//           x: this.sacralCentreCoord.text34coordinates.x + data.half_width,
//           y: this.sacralCentreCoord.text34coordinates.y - data.half_width,
//         },
//       ];

//       mixed_line
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", "black");

//       mixed_line.attr(
//         "transform",
//         `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//       );
//     } else {
//       svg
//         .append("path")
//         .attr("d", lineFunction(points))
//         .attr("stroke", "black")
//         .attr("fill", data.type)
//         .attr(
//           "transform",
//           `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//         );
//     }
//   }
// };

// DrawFormulaClass.prototype.draw_20_10_Integration = function (data) {
//   let points = [];
//   let mixed_line = NaN;

//   //drawing the whole channel

//   points = [
//     {
//       x: this.gCentreCoord.text10coordinates.x,
//       y: this.gCentreCoord.text10coordinates.y,
//     },
//     {
//       x: this.gCentreCoord.text10coordinates.x,
//       y: this.gCentreCoord.text10coordinates.y - data.width,
//     },

//     {
//       x:
//         this.spleenCentreCoord.text57coordinates.x +
//         data.temp_height / 2 +
//         data.temp_height / 8,
//       y:
//         this.spleenCentreCoord.text57coordinates.y +
//         data.temp_width / 3 -
//         data.width -
//         (data.temp_height * 2) / 10 -
//         data.width,
//     },

//     {
//       x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
//       y: this.throatCentreCoord.text20coordinates.y,
//     },
//     {
//       x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
//       y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
//     },

//     {
//       x:
//         this.spleenCentreCoord.text57coordinates.x +
//         data.temp_height / 2 +
//         data.temp_height / 12 -
//         data.width * 1.6,
//       y:
//         this.spleenCentreCoord.text57coordinates.y +
//         data.temp_width / 3 -
//         data.width -
//         (data.temp_height * 2) / 10,
//     },

//     {
//       x: this.gCentreCoord.text10coordinates.x,
//       y: this.gCentreCoord.text10coordinates.y,
//     },
//   ];

//   if (data.type === "both") {
//     mixed_line = svg.append("g");
//     mixed_line
//       .append("path")
//       .attr("d", lineFunction(points))
//       .attr("stroke", "black")
//       .attr("fill", "red");

//     points = [
//       {
//         x: this.gCentreCoord.text10coordinates.x,
//         y: this.gCentreCoord.text10coordinates.y,
//       },
//       {
//         x: this.gCentreCoord.text10coordinates.x,
//         y: this.gCentreCoord.text10coordinates.y - data.half_width,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.temp_height / 2 +
//           data.temp_height / 8 -
//           data.width * 1.4,
//         y:
//           this.spleenCentreCoord.text57coordinates.y +
//           data.temp_width / 3 -
//           data.width -
//           (data.temp_height * 2) / 10 -
//           data.half_width,
//       },

//       {
//         x:
//           this.throatCentreCoord.text20coordinates.x +
//           data.width * 1.5 -
//           data.half_width * 0.8,
//         y: this.throatCentreCoord.text20coordinates.y - data.half_width * 0.8,
//       },
//       {
//         x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
//         y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
//       },

//       {
//         x:
//           this.spleenCentreCoord.text57coordinates.x +
//           data.temp_height / 2 +
//           data.temp_height / 12 -
//           data.width * 1.6,
//         y:
//           this.spleenCentreCoord.text57coordinates.y +
//           data.temp_width / 3 -
//           data.width -
//           (data.temp_height * 2) / 10,
//       },

//       {
//         x: this.gCentreCoord.text10coordinates.x,
//         y: this.gCentreCoord.text10coordinates.y,
//       },
//     ];

//     mixed_line
//       .append("path")
//       .attr("d", lineFunction(points))
//       .attr("stroke", "black")
//       .attr("fill", "black");

//     mixed_line.attr(
//       "transform",
//       `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//     );
//   } else {
//     svg
//       .append("path")
//       .attr("d", lineFunction(points))
//       .attr("stroke", "black")
//       .attr("fill", data.type)
//       .attr(
//         "transform",
//         `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//       );
//   }
// };

// DrawFormulaClass.prototype.draw_20_Integration = function (type, variation) {

//   // console.log("inside 20 integration")
//   let points = [];
//   let mixed_line = NaN;

//   const data = {
//     top_left_x: this.throatCentreCoord.text20coordinates.x,
//     top_left_y: this.throatCentreCoord.text20coordinates.y,

//     bottom_left_x: this.spleenCentreCoord.text57coordinates.x,
//     bottom_left_y: this.spleenCentreCoord.text57coordinates.y,

//     width: 10,
//   };
//   data.temp_width = data.bottom_left_x - data.top_left_x;
//   data.temp_height = data.bottom_left_y - data.top_left_y;

//   data.half_width = data.width / 2;

//   data.type = type;

//   let i = variation;

//   let rectangle20_var = [
//     //empty for the future
//     {},
//     //variation - 1.drawing to 34th
//     {
//       top_left_x:
//         this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
//       top_left_y:
//         this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,

//       bottom_left_x:
//         this.spleenCentreCoord.text57coordinates.x +
//         data.temp_height / 3.2 +
//         this.styles.size / 12,
//       bottom_left_y:
//         this.spleenCentreCoord.text57coordinates.y + data.temp_width / 2.7,

//       bottom_right_x:
//         this.spleenCentreCoord.text57coordinates.x +
//         data.temp_height / 3.2 +
//         data.width +
//         this.styles.size / 20,
//       bottom_right_y:
//         this.spleenCentreCoord.text57coordinates.y +
//         data.temp_width / 2.7 +
//         data.width * 0.7 +
//         this.styles.size / 20,

//       top_right_x:
//         this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
//       top_right_y: this.throatCentreCoord.text20coordinates.y,
//     },

//     //variation - 2.drawing to 10th
//     {
//       top_left_x:
//         this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
//       top_left_y:
//         this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,

//       bottom_left_x:
//         this.spleenCentreCoord.text57coordinates.x +
//         data.temp_height / 2 +
//         data.temp_height / 8 -
//         data.width * 2.6,
//       bottom_left_y:
//         this.spleenCentreCoord.text57coordinates.y +
//         data.temp_width / 3 -
//         data.width -
//         (data.temp_height * 2) / 10,

//       bottom_right_x:
//         this.spleenCentreCoord.text57coordinates.x +
//         data.temp_height / 2 +
//         data.temp_height / 12,
//       bottom_right_y:
//         this.spleenCentreCoord.text57coordinates.y +
//         data.temp_width / 3 -
//         data.width -
//         (data.temp_height * 2) / 10,

//       top_right_x:
//         this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
//       top_right_y: this.throatCentreCoord.text20coordinates.y,
//     },
//   ];

//   //variation - 1.drawing half to 34th
//   rectangle20_var[1].top_left_half_x =
//     rectangle20_var[1].top_left_x + data.half_width * 0.7;
//   rectangle20_var[1].top_left_half_y =
//     rectangle20_var[1].top_left_y + data.half_width * 0.7;
//   rectangle20_var[1].bottom_left_half_x =
//     rectangle20_var[1].bottom_left_x + data.half_width * 0.7;
//   rectangle20_var[1].bottom_left_half_y =
//     rectangle20_var[1].bottom_left_y + data.half_width * 0.5;
//   rectangle20_var[1].bottom_right_half_x = rectangle20_var[1].bottom_right_x;
//   rectangle20_var[1].bottom_right_half_y = rectangle20_var[1].bottom_right_y;
//   rectangle20_var[1].top_right_half_x = rectangle20_var[1].top_right_x;
//   rectangle20_var[1].top_right_half_y = rectangle20_var[1].top_right_y;

//   //variation - 2.drawing half to 10th
//   rectangle20_var[2].top_left_half_x =
//     rectangle20_var[2].top_left_x + data.half_width * 0.7;
//   rectangle20_var[2].top_left_half_y =
//     rectangle20_var[2].top_left_y + data.half_width * 0.7;
//   rectangle20_var[2].bottom_left_half_x =
//     rectangle20_var[2].bottom_left_x + data.half_width * 1.2;
//   rectangle20_var[2].bottom_left_half_y = rectangle20_var[2].bottom_left_y;
//   rectangle20_var[2].bottom_right_half_x = rectangle20_var[2].bottom_right_x;
//   rectangle20_var[2].bottom_right_half_y = rectangle20_var[2].bottom_right_y;
//   rectangle20_var[2].top_right_half_x = rectangle20_var[2].top_right_x;
//   rectangle20_var[2].top_right_half_y = rectangle20_var[2].top_right_y;


//   console.log(rectangle20_var)


//   points = [
//     {
//       x: rectangle20_var[i].top_left_x,
//       y: rectangle20_var[i].top_left_y,
//     },

//     {
//       x: rectangle20_var[i].bottom_left_x,
//       y: rectangle20_var[i].bottom_left_y,
//     },

//     {
//       x: rectangle20_var[i].bottom_right_x,
//       y: rectangle20_var[i].bottom_right_y,
//     },

//     {
//       x: rectangle20_var[i].top_right_x,
//       y: rectangle20_var[i].top_right_y,
//     },
//     {
//       x: rectangle20_var[i].top_left_x,
//       y: rectangle20_var[i].top_left_y,
//     },
//   ];

//   if (data.type === "both") {
//     mixed_line = svg.append("g");
//     mixed_line
//       .append("path")
//       .attr("d", lineFunction(points))
//       .attr("stroke", "black")
//       .attr("fill", "red");

//     points = [
//       {
//         x: rectangle20_var[i].top_left_half_x,
//         y: rectangle20_var[i].top_left_half_y,
//       },

//       {
//         x: rectangle20_var[i].bottom_left_half_x,
//         y: rectangle20_var[i].bottom_left_half_y,
//       },

//       {
//         x: rectangle20_var[i].bottom_right_half_x,
//         y: rectangle20_var[i].bottom_right_half_y,
//       },

//       {
//         x: rectangle20_var[i].top_right_half_x,
//         y: rectangle20_var[i].top_right_half_y,
//       },
//       {
//         x: rectangle20_var[i].top_left_half_x,
//         y: rectangle20_var[i].top_left_half_y,
//       },
//     ];

//     mixed_line
//       .append("path")
//       .attr("d", lineFunction(points))
//       .attr("stroke", "black")
//       .attr("fill", "black");

//     mixed_line.attr(
//       "transform",
//       `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//     );
//   } else {
//     svg
//       .append("path")
//       .attr("d", lineFunction(points))
//       .attr("stroke", "black")
//       .attr("fill", data.type)
//       .attr(
//         "transform",
//         `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
//       );
//   }
// };

//type - black, red or 'both'
// variation - 1.drawing to 34th 2.drawing to 10th
DrawFormulaClass.prototype.draw_20_Integration = function (type, variation) {

  // console.log("inside 20 integration")
  let points = [];
  let mixed_line = NaN;

  let rectangle20_var = [
    //empty for the future
    {},
    //variation - 1.drawing to 34th
    {

    },

    //variation - 2.drawing to 10th
    {

    },
  ];

  let rotation = -18.5;



  const x = 127;
  const y = 248;

  const length1 = 126;
  const length2 = 76;

  const width = 10;

  let i = variation;


  let top_left_half_x = x + 3.5;
  let top_left_half_y = y + 3.5;

  //variation - 1.drawing half to 34th
  rectangle20_var[1].bottom_right_x = x - 118;
  rectangle20_var[1].bottom_right_y = y + length1 + 18;
  rectangle20_var[1].bottom_left_x = x - 122;
  rectangle20_var[1].bottom_left_y = y + length1 + 6;
  rectangle20_var[1].bottom_left_half_x = x - 120;
  rectangle20_var[1].bottom_left_half_y = y + length1 + 12;


  //variation - 2.drawing half to 10th
  rectangle20_var[2].bottom_right_x = x - 62;
  rectangle20_var[2].bottom_right_y = y + length2 + 8;

  rectangle20_var[2].bottom_left_half_x = x - 66
  rectangle20_var[2].bottom_left_half_y = y + length2 + 4;


  rectangle20_var[2].bottom_left_x = x - 70 + 1;
  rectangle20_var[2].bottom_left_y = y + length2;





  points = [
    {
      x: x,
      y: y,
    },

    {
      x: rectangle20_var[i].bottom_left_x,
      y: rectangle20_var[i].bottom_left_y,
    },

    {
      x: rectangle20_var[i].bottom_right_x,
      y: rectangle20_var[i].bottom_right_y,
    },

    {
      x: x + width + 5,
      y: y,
    },
    {
      x: x,
      y: y,
    },
  ];

  if (type === "both") {
    mixed_line = svg.append("g");
    mixed_line
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "red");

    points = [
      {
        x: top_left_half_x,
        y: top_left_half_y,
      },

      {
        x: rectangle20_var[i].bottom_left_half_x,
        y: rectangle20_var[i].bottom_left_half_y,
      },

      {
        x: rectangle20_var[i].bottom_right_x,
        y: rectangle20_var[i].bottom_right_y,
      },

      {
        x: x + 9,
        y: y + 6,
      },
      {
        x: top_left_half_x,
        y: top_left_half_y,
      },
    ];

    mixed_line
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "black");

    mixed_line.attr(
      "transform",
      `rotate(${rotation || 0}, ${x},${y})`
    );
  } else {
    svg
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", type)
      .attr(
        "transform",
        `rotate(${rotation || 0}, ${x},${y})`
      );
  }
};


function draw34short(type) {
  //variation - 1.drawing from start to the end of 34th
  let rotation = 17;
  let x = 54
  let y = 410

  let points = [
    {
      x: x + 1,
      y: y,
    },
    {
      x: x + 139,
      y: y + 108.5,
    },
    {
      x: x + 144,
      y: y + 96.5,
    },
    {
      x: x + 2 + 1,
      y: y - 15,
    },
    {
      x: x,
      y: y,
    },
  ];

  if (type === "both") {
    let mixed_line = svg.append("g");
    mixed_line
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "red");

    points = [
      {
        x: x + 1 + 1,
        y: y - 8,
      },


      {
        x: x + 144,
        y: y + 103.5,
      },

      {
        x: x + 144,
        y: y + 96.5,
      },


      {
        x: x + 2 + 1,
        y: y - 15,
      },

      {
        x: x + 1,
        y: y - 8,
      },

    ];

    mixed_line
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "black");

    mixed_line.attr(
      "transform",
      `rotate(${rotation || 0}, ${x},${y})`
    );
  } else {
    svg
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", type)
      .attr(
        "transform",
        `rotate(${rotation || 0}, ${x},${y})`
      );
  }

}

function draw34long(type) {
  //variation - 1.drawing from start to the 10th
  let rotation = 17;
  let x = 54
  let y = 410

  let points = [
    {
      x: x,
      y: y,
    },
    {
      x: x + 139,
      y: y + 108.5,
    },
    {
      x: x + 144,
      y: y + 96.5,
    },
    {
      x: x + 12,
      y: y - 15,
    },
    // long part
    {

      x: x + 22,
      y: y - 81,

    },

    {
      x: x + 12,
      y: y - 84,

    },


    // end of long part
    {
      x: x,
      y: y,
    },
  ];

  if (type === "both") {
    let mixed_line = svg.append("g");
    mixed_line
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "red");

    points = [
      {
        x: x + 6,
        y: y - 6,
      },


      {
        x: x + 144,
        y: y + 105,
      },

      {
        x: x + 144,
        y: y + 94,
      },


      {
        x: x + 12,
        y: y - 15,
      },
      // long part

      {

        x: x + 21,
        y: y - 81,

      },


      {
        x: x + 17,
        y: y - 82,

      },

      // end of long part
      {
        x: x + 6,
        y: y - 6,
      },

    ];

    mixed_line
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "black");

    mixed_line.attr(
      "transform",
      `rotate(${rotation || 0}, ${x},${y})`
    );
  } else {
    svg
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", type)
      .attr(
        "transform",
        `rotate(${rotation || 0}, ${x},${y})`
      );
  }

}

//type - black, red or 'both'
// variation - 1.drawing to 34th 2.drawing to 10th
DrawFormulaClass.prototype.draw_34_Integration = function (type, variation) {

  if (variation === 1) {
    draw34short(type)
    return
  }

  if (variation === 2) {
    draw34long(type)
    return
  }

};

function draw57short(type) {
  //variation - 1.drawing to the end of 57th

  let points = [];
  let rotation = 30

  const x = 32;
  const y = 463;

  const width = 10;
  const half_width = width / 2;

  const length1 = 68;

  points = [
    {
      x: x,
      y: y,
    },

    {
      x: x - 7,
      y: y - length1 - 2,
    },

    {
      x: x + 3,
      y: y - length1 + 2,
    },

    {
      x: x + width + 1,
      y: y + 6,
    },
    {
      x: x,
      y: y,
    },
  ];

  if (type === "both") {
    let mixed_line = svg.append("g");
    mixed_line
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "red");



    points = [
      {
        x: x + 5,
        y: y,
      },

      {
        x: x - 7 + 5,
        y: y - length1 - 2,
      },

      {
        x: x - 2 + 5,
        y: y - length1,
      },

      {
        x: x + half_width + 5,
        y: y + 2,
      },
      {
        x: x + 5,
        y: y,
      },
    ];



    mixed_line
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "black");

    mixed_line.attr(
      "transform",
      `rotate(${rotation || 0}, ${x},${y})`
    );
  } else {
    svg
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", type)
      .attr(
        "transform",
        `rotate(${rotation || 0}, ${x},${y})`
      );
  }
}
function draw57long(type) {
  //variation - 2.drawing to 10th

  let points = [];
  let rotation = 27

  const x = 32;
  const y = 463;

  const width = 10;
  const half_width = width / 2;

  const length1 = 141;

  points = [
    {
      x: x,
      y: y,
    },

    {
      x: x - 7,
      y: y - length1,
    },

    {
      x: x + 3,
      y: y - length1 + 2,
    },

    {
      x: x + width + 1,
      y: y + 6,
    },
    {
      x: x,
      y: y,
    },
  ];

  if (type === "both") {
    let mixed_line = svg.append("g");
    mixed_line
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "red");


    points = [
      {
        x: x + 5,
        y: y + 2,
      },

      {
        x: x - 7 + 5,
        y: y - length1,
      },

      {
        x: x - 2 + 5,
        y: y - length1 + 2,
      },

      {
        x: x + half_width + 5,
        y: y + 2,
      },
      {
        x: x + 5,
        y: y + 2,
      },
    ];



    mixed_line
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "black");

    mixed_line.attr(
      "transform",
      `rotate(${rotation || 0}, ${x},${y})`
    );
  } else {
    svg
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", type)
      .attr(
        "transform",
        `rotate(${rotation || 0}, ${x},${y})`
      );
  }
}

//type - black, red or 'both'
// variation - 1.drawing to 34th 2.drawing to 10th
DrawFormulaClass.prototype.draw_57_Integration = function (type, variation) {


  if (variation === 1) {
    draw57short(type)
    return
  }

  if (variation === 2) {
    draw57long(type)
    return
  }
};

//type - black, red or 'both'
// variation always drawing to 10th
DrawFormulaClass.prototype.draw_10_Integration = function (type) {

  const x = 116.5
  const y = 357

  const width = 10;
  const half_width = width / 2;
  const length = 35;
  const rotation = 22;

  let points = [
    {
      x: x,
      y: y,
    },

    {
      x: x - length,
      y: y,
    },

    {
      x: x - length,
      y: y - width,
    },

    {
      x: x,
      y: y - width,
    },
    {
      x: x,
      y: y,
    },
  ];

  if (type === "both") {
    let mixed_line = svg.append("g");
    mixed_line
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "red");

    points[2].y = y - half_width
    points[3].y = y - half_width

    mixed_line
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "black");

    mixed_line.attr(
      "transform",
      `rotate(${rotation || 0}, ${x},${y})`
    );
  } else {
    svg
      .append("path")
      .attr("d", lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", type)
      .attr(
        "transform",
        `rotate(${rotation || 0}, ${x},${y})`
      );
  }
};


//Если в контуре интеграции активизировано больше чем 1 ворота, то там будут только каналы, ворота рисовать не надо
//type - 'both', 'red', 'black'
DrawFormulaClass.prototype.drawIntegration = function (int_gates) {

  const data = {
    top_left_x: this.throatCentreCoord.text20coordinates.x,
    top_left_y: this.throatCentreCoord.text20coordinates.y,

    bottom_left_x: this.spleenCentreCoord.text57coordinates.x,
    bottom_left_y: this.spleenCentreCoord.text57coordinates.y,

    width: 10,
  };
  data.temp_width = data.bottom_left_x - data.top_left_x;
  data.temp_height = data.bottom_left_y - data.top_left_y;

  data.half_width = data.width / 2;

  //const length = Math.sqrt(Math.pow(data.temp_width,2) + Math.pow(data.temp_height,2))/3;

  let count = 0;

  for (let key in int_gates) {
    if (int_gates[key]) count++;
  }

  // console.log(int_gates);
  // console.log(`we have ${count} gates in Intgr. activated`);

  //ворот нет, выходим
  if (!count) return;

  //одни ворота, рисуем и выходим
  if (count === 1) {
    for (let key in int_gates) {
      if (int_gates[key]) {
        if (key === "57") {
          this.draw_57_Integration(int_gates[key], 1);
        }

        if (key === "10") {
          this.draw_10_Integration(int_gates[key], 1);
        }

        if (key === "20") {
          this.draw_20_Integration(int_gates[key], 1);
        }

        if (key === "34") {
          this.draw_34_Integration(int_gates[key], 1);
        }
      }
    }

    return;
  }

  //больше одних ворот, значит рисуем каналы,
  //так как если в интеграции больше одних ворот, то там
  //будут только каналы

  //делаем массив из 4 элементов
  // 0 - 20 ворота
  // 1 - 10 ворота
  // 2 - 34 ворота
  // 3 - 57 ворота
  let int_gates_arr = [];
  int_gates_arr[0] = int_gates["20"];
  int_gates_arr[1] = int_gates["10"];
  int_gates_arr[2] = int_gates["34"];
  int_gates_arr[3] = int_gates["57"];

  //console.log(int_gates_arr);

  //один канал
  if (count === 2) {
    //20-10
    if (int_gates_arr[0] && int_gates_arr[1]) {
      this.draw_10_Integration(int_gates["10"], 1);
      this.draw_20_Integration(int_gates["20"], 2);
    }

    //20-34
    if (int_gates_arr[0] && int_gates_arr[2]) {
      this.draw_34_Integration(int_gates["34"], 1);
      this.draw_20_Integration(int_gates["20"], 1);
    }

    //20-57
    if (int_gates_arr[0] && int_gates_arr[3]) {
      this.draw_57_Integration(int_gates["57"], 1);
      this.draw_20_Integration(int_gates["20"], 1);
    }

    //10-34
    if (int_gates_arr[1] && int_gates_arr[2]) {
      this.draw_10_Integration(int_gates["10"], 1);
      this.draw_34_Integration(int_gates["34"], 2);
    }

    //10-57
    if (int_gates_arr[1] && int_gates_arr[3]) {
      this.draw_10_Integration(int_gates["10"], 1);
      this.draw_57_Integration(int_gates["57"], 2);
    }

    //34-57
    if (int_gates_arr[2] && int_gates_arr[3]) {
      this.draw_34_Integration(int_gates["34"], 1);
      this.draw_57_Integration(int_gates["57"], 1);
    }

    return;
  }

  //3 ворот
  if (count === 3) {
    //нет 20 ворот
    if (!int_gates_arr[0]) {
      this.draw_10_Integration(int_gates["10"], 1);
      this.draw_34_Integration(int_gates["34"], 1);
      this.draw_57_Integration(int_gates["57"], 2);
    }

    //нет 10 ворот
    if (!int_gates_arr[1]) {
      this.draw_34_Integration(int_gates["34"], 1);
      this.draw_57_Integration(int_gates["57"], 1);
      this.draw_20_Integration(int_gates["20"], 1);
    }

    //нет 34 ворот
    if (!int_gates_arr[2]) {
      this.draw_10_Integration(int_gates["10"], 1);
      this.draw_57_Integration(int_gates["57"], 1);
      this.draw_20_Integration(int_gates["20"], 1);
    }

    //нет 57 ворот
    if (!int_gates_arr[3]) {
      this.draw_10_Integration(int_gates["10"], 1);
      this.draw_34_Integration(int_gates["34"], 1);
      this.draw_20_Integration(int_gates["20"], 1);
    }

    return;
  }

  //весь контур
  if (count === 4) {
    this.draw_10_Integration(int_gates["10"], 1);
    this.draw_34_Integration(int_gates["34"], 1);
    this.draw_57_Integration(int_gates["57"], 1);
    this.draw_20_Integration(int_gates["20"], 1);
  }
};


DrawFormulaClass.prototype.draw_vertical_channel_with_rotation = function (
  data
) {
  let points = [];
  let mixed_line = NaN;

  data.bottom_right_x = data.bottom_left_x + data.width;
  data.bottom_right_y = data.bottom_left_y;

  data.top_right_x = data.top_left_x + data.width;
  data.top_right_y = data.top_left_y;

  data.half_width = data.width / 2;

  data.half_way_y = (data.bottom_left_y - data.top_left_y) / 2;

  //drawing the whole channel
  if (data.gate === "both") {
    points = [
      { x: data.top_left_x, y: data.top_left_y },
      { x: data.bottom_left_x, y: data.bottom_left_y },
      { x: data.bottom_right_x, y: data.bottom_right_y },
      { x: data.top_right_x, y: data.top_right_y },
      { x: data.top_left_x, y: data.top_left_y },
    ];

    if (data.type === "both") {
      mixed_line = svg.append("g");
      mixed_line
        .append("path")
        .attr("d", lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "red");

      points = [
        { x: data.top_left_x + data.half_width, y: data.top_left_y },
        { x: data.bottom_left_x + data.half_width, y: data.bottom_left_y },
        { x: data.bottom_right_x, y: data.bottom_right_y },
        { x: data.top_right_x, y: data.top_right_y },
        { x: data.top_left_x + data.half_width, y: data.top_left_y },
      ];

      mixed_line
        .append("path")
        .attr("d", lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "black");

      mixed_line.attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
    } else {
      svg
        .append("path")
        .attr("d", lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", data.type)
        .attr(
          "transform",
          `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
        );
    }
  }

  if (data.gate === "top") {
    points = [
      { x: data.top_left_x, y: data.top_left_y },
      { x: data.top_left_x, y: data.top_left_y + data.half_way_y },
      { x: data.top_right_x, y: data.top_right_y + data.half_way_y },
      { x: data.top_right_x, y: data.top_right_y },
      { x: data.top_left_x, y: data.top_left_y },
    ];

    if (data.type === "both") {
      mixed_line = svg.append("g");
      mixed_line
        .append("path")
        .attr("d", lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "red");

      points = [
        { x: data.top_left_x + data.half_width, y: data.top_left_y },
        {
          x: data.top_left_x + data.half_width,
          y: data.top_left_y + data.half_way_y,
        },
        { x: data.top_right_x, y: data.top_right_y + data.half_way_y },
        { x: data.top_right_x, y: data.top_right_y },
        { x: data.top_left_x + data.half_width, y: data.top_left_y },
      ];

      mixed_line
        .append("path")
        .attr("d", lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "black");

      mixed_line.attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
    } else {
      svg
        .append("path")
        .attr("d", lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", data.type)
        .attr(
          "transform",
          `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
        );
    }
  }

  if (data.gate === "bottom") {
    points = [
      { x: data.bottom_left_x, y: data.bottom_left_y },
      { x: data.top_left_x, y: data.top_left_y + data.half_way_y },
      { x: data.top_right_x, y: data.top_right_y + data.half_way_y },
      { x: data.bottom_right_x, y: data.bottom_right_y },
      { x: data.bottom_left_x, y: data.bottom_left_y },
    ];

    if (data.type === "both") {
      mixed_line = svg.append("g");
      mixed_line
        .append("path")
        .attr("d", lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "red");

      points = [
        { x: data.bottom_left_x + data.half_width, y: data.bottom_left_y },
        {
          x: data.top_left_x + data.half_width,
          y: data.top_left_y + data.half_way_y,
        },
        { x: data.top_right_x, y: data.top_right_y + data.half_way_y },
        { x: data.bottom_right_x, y: data.bottom_right_y },
        { x: data.bottom_left_x + data.half_width, y: data.bottom_left_y },
      ];

      mixed_line
        .append("path")
        .attr("d", lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "black");

      mixed_line.attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
    } else {
      svg
        .append("path")
        .attr("d", lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", data.type)
        .attr(
          "transform",
          `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
        );
    }
  }
};

DrawFormulaClass.prototype.draw_64_47 = function (gate, type) {
  const x = 140;
  const y = 35;

  const length = 24

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };
  if (gate === 0) data.gate = "both";
  if (gate === 64) data.gate = "top";
  if (gate === 47) data.gate = "bottom";



  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_61_24 = function (gate, type) {
  const x = 160
  const y = 35
  const length = 24;

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,
    type: type,
  };


  if (gate === 0) data.gate = "both";
  if (gate === 61) data.gate = "top";
  if (gate === 24) data.gate = "bottom";



  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_63_4 = function (gate, type) {
  const x = 182
  const y = 35
  const length = 24;

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,
    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 63) data.gate = "top";
  if (gate === 4) data.gate = "bottom";

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_17_62 = function (gate, type) {


  const x = 140;
  const y = 99;

  const length = 30

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 17) data.gate = "top";
  if (gate === 62) data.gate = "bottom";

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_43_23 = function (gate, type) {
  const x = 160
  const y = 99
  const length = 30;

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,
    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 43) data.gate = "top";
  if (gate === 23) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_11_56 = function (gate, type) {
  const x = 182;
  const y = 99;

  const length = 30

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 11) data.gate = "top";
  if (gate === 56) data.gate = "bottom";


  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_18_58 = function (gate, type) {

  const x = 5;
  const y = 555;

  const length = 160

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };


  if (gate === 0) data.gate = "both";
  if (gate === 18) data.gate = "top";
  if (gate === 58) data.gate = "bottom";


  data.rotation = -49;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_28_38 = function (gate, type) {
  const x = 20;
  const y = 535;

  const length = 160

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 28) data.gate = "top";
  if (gate === 38) data.gate = "bottom";

  data.rotation = -46;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_32_54 = function (gate, type) {
  const x = 30;
  const y = 500;

  const length = 160

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };


  if (gate === 0) data.gate = "both";
  if (gate === 32) data.gate = "top";
  if (gate === 54) data.gate = "bottom";

  data.rotation = -42;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_50_27 = function (gate, type) {
  const x = 85;
  const y = 510;

  const length = 50

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 50) data.gate = "top";
  if (gate === 27) data.gate = "bottom";


  data.rotation = -59;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_30_41 = function (gate, type) {

  const x = 330;
  const y = 550;

  const length = 170


  const data = {
    top_left_x: x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 30) data.gate = "top";
  if (gate === 41) data.gate = "bottom";

  data.rotation = 52;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_55_39 = function (gate, type) {
  const x = 310;
  const y = 535;

  const length = 150


  const data = {
    top_left_x: x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };
  if (gate === 0) data.gate = "both";
  if (gate === 55) data.gate = "top";
  if (gate === 39) data.gate = "bottom";

  data.rotation = 48;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_49_19 = function (gate, type) {
  const x = 310;
  const y = 505;

  const length = 150


  const data = {
    top_left_x: x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 49) data.gate = "top";
  if (gate === 19) data.gate = "bottom";


  data.rotation = 48;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_6_59 = function (gate, type) {
  const x = 248;
  const y = 502;

  const length = 70


  const data = {
    top_left_x: x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 6) data.gate = "top";
  if (gate === 59) data.gate = "bottom";


  data.rotation = 60;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_40_37 = function (gate, type) {
  const x = 258
  const y = 315
  const length = 30;

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,
    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 40) data.gate = "top";
  if (gate === 37) data.gate = "bottom";

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = -30;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_12_22 = function (gate, type) {
  const x = 210
  const y = 160
  const length = 200;

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,
    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 12) data.gate = "top";
  if (gate === 22) data.gate = "bottom";

  data.rotation = -32;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_35_36 = function (gate, type) {
  const x = 210
  const y = 135
  const length = 206;

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,
    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 35) data.gate = "top";
  if (gate === 36) data.gate = "bottom";


  data.rotation = -32;
  this.draw_vertical_channel_with_rotation(data);
}; 0
DrawFormulaClass.prototype.draw_45_21 = function (gate, type) {
  const x = 204
  const y = 180
  const length = 86;

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,
    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 45) data.gate = "top";
  if (gate === 21) data.gate = "bottom";

  data.rotation = -24;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_25_51 = function (gate, type) {
  const x = 206
  const y = 250
  const length = 34;

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,
    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 25) data.gate = "top";
  if (gate === 51) data.gate = "bottom";

  data.rotation = -30;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_26_44 = function (gate, type) {
  const x = 210;
  const y = 414;

  const length = 160


  const data = {
    top_left_x: x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };


  if (gate === 0) data.gate = "both";
  if (gate === 26) data.gate = "top";
  if (gate === 44) data.gate = "bottom";

  data.rotation = 64;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_16_48 = function (gate, type) {

  const x = 129;
  const y = 200;

  let length = 280;

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };


  if (gate === 0) data.gate = "both";
  if (gate === 16) data.gate = "top";
  if (gate === 48) data.gate = "bottom";

  data.rotation = 26;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_42_53 = function (gate, type) {
  let x = 140
  let y = 551
  let length = 47;

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 42) data.gate = "top";
  if (gate === 53) data.gate = "bottom";


  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_3_60 = function (gate, type) {

  let x = 161
  let y = 551
  let length = 47;

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 3) data.gate = "top";
  if (gate === 60) data.gate = "bottom";


  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_9_52 = function (gate, type) {

  let x = 182
  let y = 551
  let length = 47;

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 9) data.gate = "top";
  if (gate === 52) data.gate = "bottom";

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_15_5 = function (gate, type) {

  const x = 140
  const y = 263
  const length = 57;

  const data = {
    top_left_x: x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 15) data.gate = "top";
  if (gate === 5) data.gate = "bottom";


  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_2_14 = function (gate, type) {

  const x = 160
  const y = 263
  const length = 57;

  const data = {
    top_left_x: x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 2) data.gate = "top";
  if (gate === 14) data.gate = "bottom";


  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_46_29 = function (gate, type) {

  let x = 180
  let y = 263

  let length = 57;

  const data = {
    top_left_x: x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 46) data.gate = "top";
  if (gate === 29) data.gate = "bottom";

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_31_7 = function (gate, type) {

  const x = 140;
  const y = 183;

  const length = 30

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 31) data.gate = "top";
  if (gate === 7) data.gate = "bottom";


  data.rotation = NaN;

  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_8_1 = function (gate, type) {

  const x = 161
  const y = 183
  const length = 30;

  const data = {
    top_left_x:
      x,
    top_left_y: y,

    bottom_left_x: x,
    bottom_left_y: y + length,

    width: 10,
    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 8) data.gate = "top";
  if (gate === 1) data.gate = "bottom";


  data.rotation = NaN;


  this.draw_vertical_channel_with_rotation(data);
};

DrawFormulaClass.prototype.draw_33_13 = function (gate, type) {

  let x = 182
  let y = 183
  let length = 30;
  const data = {
    top_left_x: x,
    top_left_y: y,
    bottom_left_x: x,
    bottom_left_y: y + length,
    width: 10,
    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 33) data.gate = "top";
  if (gate === 13) data.gate = "bottom";

  data.rotation = NaN;

  // console.log(data)
  this.draw_vertical_channel_with_rotation(data);
};

DrawFormulaClass.prototype.drawGenerator = function (
  centre_group,
  centre_data,
  text_data,
  fill,
  stroke
) {
  //Если центр определен, сделать черную окантовку
  let tmp_stroke = fill !== "white" ? "black" : stroke;

  centre_group
    .append("path")
    .attr("d", lineFunction(centre_data))
    .attr("stroke", tmp_stroke)
    .attr("fill", fill || stroke);

  centre_group
    .append("g")
    .selectAll("text")
    .data(text_data)
    .enter()
    .append("text")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .text((d) => d.text)
    .attr("font-family", this.styles.family)
    .attr("font-size", this.styles.size)
    .attr("font-weight", this.styles.weight)
    .attr("fill", "black")
    .attr("text-anchor", "start");
};

DrawFormulaClass.prototype.drawHead340 = function (fill) {
  let x = 142
  let y = 10

  const headCentreData = [
    { x: x, y: y },
    {
      x: x + 52,
      y: y
    },
    {
      x: x + 73,
      y: y + 25,
    },
    {
      x: x - 21,
      y: y + 25,
    },
    { x: x, y: y },
  ];

  const headTextData = [
    {
      x: x - 5,
      y: y + 20,
      text: "64",
    },
    {
      x: x + 17,
      y: y + 20,
      text: "61",
    },
    {
      x: x + 39,
      y: y + 20,
      text: "63",
    },
  ];



  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    headCentreData,
    headTextData,
    fill,
    "#9400D3"
  );
};
DrawFormulaClass.prototype.drawAjna340 = function (fill) {
  let x = 125
  let y = 99
  const ajnaCentreData = [
    { x: x, y: y },
    {
      x: x + 88,
      y: y,
    },
    {
      x: x + 88,
      y: y - 40,
    },

    {
      x: x,
      y: y - 40,
    },
    { x: x, y: y },
  ];

  const ajnaTextData = [
    {
      x: x + 12,
      y: y - 28,
      text: "47",
    },
    {
      x: x + 34,
      y: y - 28,
      text: "24",
    },
    {
      x: x + 59,
      y: y - 28,
      text: "4",
    },
    {
      x: x + 12,
      y: y - 4,
      text: `17`,
    },


    {
      x: x + 34,
      y: y - 4,
      text: "43",
    },
    {
      x: x + 58,
      y: y - 4,
      text: "11",
    },
  ];

  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    ajnaCentreData,
    ajnaTextData,
    fill,
    "#0000FF"
  );
};
DrawFormulaClass.prototype.drawThroat340 = function (fill) {

  let x = 119
  let y = 129


  const throatCentreData = [
    { x: x, y: y },
    {
      x: x + 100,
      y: y,
    },
    {
      x: x + 100,
      y: y + 54,
    },
    {
      x: x,
      y: y + 54,
    },
    { x: x, y: y },
  ];

  const throatTextData = [
    {
      x: x + 18,
      y: y + 11,
      text: "62",
    },
    {
      x: x + 39,
      y: y + 11,
      text: "23",
    },
    {
      x: x + 62,
      y: y + 11,
      text: `56`,
    },

    {
      x: x + 18,
      y: y + 51,
      text: "31",
    },
    {
      x: x + 43,
      y: y + 51,
      text: "8",
    },
    {
      x: x + 64,
      y: y + 51,
      text: "33",
    },

    {
      x: x + 82,
      y: y + 11,
      text: "35",
    },
    {
      x: x + 82,
      y: y + 34,
      text: "12",
    },
    {
      x: x + 82,
      y: y + 51,
      text: "45",
    },

    {
      x: x + 1,
      y: y + 11,
      text: "16",
    },
    {
      x: x + 1,
      y: y + 34,
      text: "20",
    },
  ];



  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    throatCentreData,
    throatTextData,
    fill,
    "#40E0D0"
  );
};
DrawFormulaClass.prototype.drawG340 = function (fill) {

  let x = 126
  let y = 213
  const gCentreData = [
    { x: x, y: y },

    {
      x: x + 80,
      y: y,
    },

    {
      x: x + 90,
      y: y + 25,
    },

    {
      x: x + 80,
      y: y + 50,
    },

    {
      x: x,
      y: y + 50,
    },
    {
      x: x - 10,
      y: y + 25,
    },
    { x: x, y: y },
  ];
  const gTextData = [
    {
      x: x + 15,
      y: y + 12,
      text: "7",
    },
    {
      x: x + 36,
      y: y + 12,
      text: "1",
    },
    {
      x: x + 54,
      y: y + 12,
      text: `13`,
    },

    {
      x: x - 4,
      y: y + 30,
      text: "10",
    },
    {
      x: x + 70,
      y: y + 30,
      text: "25",
    },
    {
      x: x + 12,
      y: y + 48,
      text: "15",
    },

    {
      x: x + 52,
      y: y + 48,
      text: "46",
    },
    {
      x: x + 34,
      y: y + 48,
      text: "2",
    },
  ];


  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    gCentreData,
    gTextData,
    fill,
    "#64E811"
  );
};
DrawFormulaClass.prototype.drawSacral340 = function (fill) {
  let x = 125
  let y = 320
  const sacralCentreData = [
    { x: x, y: y },
    {
      x: x + 80,
      y: y,
    },
    {
      x: x + 80,
      y: y + 60,
    },
    {
      x: x,
      y: y + 60,
    },
    { x: x, y: y },
  ];
  const sacralTextData = [
    {
      x: x + 15,
      y: y + 11.5,
      text: "5",
    },
    {
      x: x + 34,
      y: y + 11.5,
      text: "14",
    },
    {
      x: x + 54,
      y: y + 11.5,
      text: `29`,
    },

    {
      x: x + 12,
      y: y + 58,
      text: "42",
    },
    {
      x: x + 37,
      y: y + 58,
      text: "3",
    },
    {
      x: x + 59,
      y: y + 58,
      text: "9",
    },

    {
      x: x + 3,
      y: y + 24,
      text: "34",
    },
    {
      x: x + 3,
      y: y + 44,
      text: "27",
    },
    {
      x: x + 62,
      y: y + 44,
      text: "59",
    },
  ];


  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    sacralCentreData,
    sacralTextData,
    fill,
    "#F59713"
  );
};
DrawFormulaClass.prototype.drawRoot340 = function (fill) {
  let x = 125
  let y = 410
  const rootCentreData = [
    { x: x, y: y },
    {
      x: x + 80,
      y: y,
    },
    {
      x: x + 80,
      y: y + 75.5,
    },
    {
      x: x,
      y: y + 75.5,
    },
    { x: x, y: y },
  ];
  const rootTextData = [
    {
      x: x + 12,
      y: y + 12.5,
      text: "53",
    },
    {
      x: x + 36,
      y: y + 12.5,
      text: "60",
    },
    {
      x: x + 56,
      y: y + 12.5,
      text: `52`,
    },

    {
      x: x + 6,
      y: y + 28.5,
      text: "54",
    },
    {
      x: x + 6,
      y: y + 54.5,
      text: "38",
    },
    {
      x: x + 6,
      y: y + 73.5,
      text: "58",
    },

    {
      x: x + 62,
      y: y + 28.5,
      text: "19",
    },
    {
      x: x + 62,
      y: y + 50,
      text: "39",
    },
    {
      x: x + 62,
      y: y + 72.5,
      text: "41",
    },
  ];



  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    rootCentreData,
    rootTextData,
    fill,
    "#F20C0C"
  );
};

DrawFormulaClass.prototype.drawSpleen340 = function (fill) {
  const x = 5
  const y = 300
  const spleenCentreData = [
    { x: x, y: y },
    {
      x: x + 96,
      y: y + 56.25,
    },
    {
      x: x,
      y: y + 112.5,
    },
    { x: x, y: y },
  ];
  const spleenTextData = [
    {
      x: x,
      y: y + 18,
      text: "48",
    },
    {
      x: x + 18,
      y: y + 30,
      text: "57",
    },
    {
      x: x + 48,
      y: y + 48,
      text: "44",
    },

    {
      x: x + 72,
      y: y + 60,
      text: "50",
    },
    {
      x: x + 44.4,
      y: y + 76.5,
      text: "32",
    },
    {
      x: x + 24,
      y: y + 88.5,
      text: "28",
    },

    {
      x: x,
      y: y + 100.5,
      text: "18",
    },
  ];

  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    spleenCentreData,
    spleenTextData,
    fill,
    "#F20C0C"
  );
};
DrawFormulaClass.prototype.drawEmo340 = function (fill) {
  let x = 335
  let y = 300
  const emoCentreData = [
    { x: x, y: y },
    {
      x: x - 96,
      y: y + 56.25,
    },
    {
      x: x,
      y: y + 111.75,
    },
    { x: x, y },
  ];

  const emoTextData = [
    {
      x: x - 89,
      y: y + 60,
      text: "6",
    },
    {
      x: x - 60,
      y: y + 48,
      text: "37",
    },
    {
      x: x - 26,
      y: y + 28,
      text: "22",
    },

    {
      x: x - 15,
      y: y + 18,
      text: "36",
    },
    {
      x: x - 54,
      y: y + 80,
      text: "49",
    },
    {
      x: x - 30,
      y: y + 95,
      text: "55",
    },

    {
      x: x - 14,
      y: y + 104,
      text: "30",
    },
  ];


  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    emoCentreData,
    emoTextData,
    fill,
    "#F59713"
  );
};
DrawFormulaClass.prototype.drawEgo340 = function (fill) {
  let x = 250
  let y = 250
  const egoCentreData = [
    { x: x, y: y },
    {
      x: x + 20,
      y: y + 68,
    },
    {
      x: x - 57,
      y: y + 50,
    },
    { x: x, y: y },
  ];



  const egoTextData = [
    {
      x: x - 12,
      y: y + 18.8,
      text: "21",
    },
    {
      x: x - 28,
      y: y + 34,
      text: "51",
    },
    {
      x: x - 40,
      y: y + 48,
      text: "26",
    },

    {
      x: x - 3,
      y: y + 60,
      text: "40",
    },
  ];

  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    egoCentreData,
    egoTextData,
    fill,
    "#F2F477"
  );
};

DrawFormulaClass.prototype.drawWhiteFormula = function () {
  this.draw_64_47(0, "white");
  this.draw_61_24(0, "white");
  this.draw_63_4(0, "white");

  this.draw_17_62(0, "white");
  this.draw_43_23(0, "white");
  this.draw_11_56(0, "white");

  this.draw_31_7(0, "white");
  this.draw_8_1(0, "white");
  this.draw_33_13(0, "white");

  this.draw_26_44(0, "white");

  this.draw_15_5(0, "white");
  this.draw_2_14(0, "white");
  this.draw_46_29(0, "white");

  this.draw_42_53(0, "white");
  this.draw_3_60(0, "white");
  this.draw_9_52(0, "white");

  this.draw_18_58(0, "white");
  this.draw_28_38(0, "white");
  this.draw_32_54(0, "white");

  this.draw_50_27(0, "white");
  this.draw_6_59(0, "white");

  this.draw_30_41(0, "white");
  this.draw_55_39(0, "white");
  this.draw_49_19(0, "white");

  this.draw_12_22(0, "white");
  this.draw_35_36(0, "white");
  this.draw_40_37(0, "white");

  this.draw_45_21(0, "white");
  this.draw_25_51(0, "white");

  this.draw_16_48(0, "white");

  this.drawWhiteIntegration();

  this.drawHead340("white");
  this.drawAjna340("white");
  this.drawThroat340("white");
  this.drawG340("white");
  this.drawSacral340("white");
  this.drawRoot340("white");
  this.drawSpleen340("white");
  this.drawEmo340("white");
  this.drawEgo340("white");
};

//PERSONALITY texts on screen
DrawFormulaClass.prototype.draw_pers_text = function () {
  let planet_text = "";

  let pers_x = 335;
  let pers_y = 15;

  // console.log(pers_x, pers_y);


  planet_text = `${this.pers_sun_short.hex}-.${this.pers_sun_short.line} - ${this.pers_sun_short.direction}${this.pers_sun_short.power}- -☀️`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_earth_short.hex}-.${this.pers_earth_short.line} - ${this.pers_earth_short.direction}${this.pers_earth_short.power}- -🌎`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 25;

  planet_text = `${this.pers_nnode_short.hex}-.${this.pers_nnode_short.line} - ${this.pers_nnode_short.direction
    }${this.pers_nnode_short.power}- --☊`;
  appendTextPlanets(svg, pers_x - 4, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_snode_short.hex}-.${this.pers_snode_short.line} - ${this.pers_snode_short.direction
    }${this.pers_snode_short.power}- --☋`;
  appendTextPlanets(svg, pers_x - 4, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_moon_short.hex}-.${this.pers_moon_short.line} - ${this.pers_moon_short.direction
    }${this.pers_moon_short.power}- -🌕`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 25;

  planet_text = `${this.pers_mercury_short.hex}-.${this.pers_mercury_short.line} - ${this.pers_mercury_short.direction
    }${this.pers_mercury_short.power}- ☿️`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_venus_short.hex}-.${this.pers_venus_short.line} - ${this.pers_venus_short.direction
    }${this.pers_venus_short.power}- ♀️`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_mars_short.hex}-.${this.pers_mars_short.line} - ${this.pers_mars_short.direction
    }${this.pers_mars_short.power}- ♂️`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_jupiter_short.hex}-.${this.pers_jupiter_short.line} - ${this.pers_jupiter_short.direction
    }${this.pers_jupiter_short.power}- ♃`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_saturn_short.hex}-.${this.pers_saturn_short.line} - ${this.pers_saturn_short.direction
    }${this.pers_saturn_short.power}- ♄`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_uranus_short.hex}-.${this.pers_uranus_short.line} - ${this.pers_uranus_short.direction
    }${this.pers_uranus_short.power}- ♅`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_neptune_short.hex}-.${this.pers_neptune_short.line} - ${this.pers_neptune_short.direction
    }${this.pers_neptune_short.power}- ♆`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_pluto_short.hex}.-${this.pers_pluto_short.line} - ${this.pers_pluto_short.direction
    }${this.pers_pluto_short.power}- ♇`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;
};
//DESIGN texts on screen
DrawFormulaClass.prototype.draw_des_text = function () {
  //DESIGN
  let des_x = 70;
  let des_y = 15;

  // console.log(des_x, des_y)



  let planet_text = "";


  planet_text = `${this.des_sun_short.hex}-.${this.des_sun_short.line} - ${this.des_sun_short.direction}${this.des_sun_short.power}- -☀️`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;


  planet_text = `${this.des_earth_short.hex}-.${this.des_earth_short.line} - ${this.des_earth_short.direction}${this.des_earth_short.power}- -🌎`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 25;

  planet_text = `${this.des_nnode_short.hex}-.${this.des_nnode_short.line} - ${this.des_nnode_short.direction}${this.des_nnode_short.power}- --☊`;
  appendTextPlanets(svg, des_x - 4, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_snode_short.hex}-.${this.des_snode_short.line
    } - ${this.des_snode_short.direction}${this.des_snode_short.power}- --☋`;
  appendTextPlanets(svg, des_x - 4, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_moon_short.hex}-.${this.des_moon_short.line} - ${this.des_moon_short.direction}${this.des_moon_short.power}- -🌕`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 25;

  planet_text = `${this.des_mercury_short.hex}-.${this.des_mercury_short.line} - ${this.des_mercury_short.direction
    }${this.des_mercury_short.power}- ☿️`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_venus_short.hex}-.${this.des_venus_short.line

    } - ${this.des_venus_short.direction
    }${this.des_venus_short.power}- ♀️`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_mars_short.hex}-.${this.des_mars_short.line

    } - ${this.des_mars_short.direction}${this.des_mars_short.power
    }- ♂️`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_jupiter_short.hex}-.${this.des_jupiter_short.line

    } - ${this.des_jupiter_short.direction
    }${this.des_jupiter_short.power}- ♃`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_saturn_short.hex}-.${this.des_saturn_short.line

    } - ${this.des_saturn_short.direction
    }${this.des_saturn_short.power}- ♄`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_uranus_short.hex}-.${this.des_uranus_short.line

    } - ${this.des_uranus_short.direction
    }${this.des_uranus_short.power}- ♅`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_neptune_short.hex}-.${this.des_neptune_short.line
    } - ${this.des_neptune_short.direction
    }${this.des_neptune_short.power}- ♆`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_pluto_short.hex}-.${this.des_pluto_short.line
    } - ${this.des_pluto_short.direction
    }${this.des_pluto_short.power}- ♇`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;
};

//V2 2024
DrawFormulaClass.prototype.drawFormulaV2 = function (graph_type) {
  this.init();
  this.drawWhiteFormula();

  this.x = this.width / 2;
  this.y = (this.height / 100) * 10;

  switch (graph_type) {
    case "full":
      //рисуем Полную Формулу
      this.draw_Body();
      break;

    case "design":
      //рисуем Красное
      this.draw_Des();
      break;

    case "personality":
      //рисуем Личность

      this.draw_Pers();
      break;

    default:
      console.log(`Sorry, some error in drawFormulaV2.`);
  }
};

DrawFormulaClass.prototype.draw_Body = function () {
  //console.log(formula);
  //console.log(for_data);
  //console.log(formula.centers_connections);

  this.draw_pers_text();
  this.draw_des_text();

  let pers_x = 100;
  let pers_y = 15;

  // console.log(pers_x, pers_y);
  let planet_text = `${this.data_formula.name.slice(0, 10)}`;
  appendText(svg, pers_x, pers_y, planet_text, "blue", "start", 12);
  pers_x += 75;

  const loc = this.data_formula.time.pers_time_utc;
  const loc_time_str = `${loc.day}.${loc.month}.${loc.year} ${loc.hours}:${loc.minutes}`
  appendText(svg, pers_x, pers_y, loc_time_str, "blue", "start", 10);



  pers_x = 270;
  pers_y = 640;
  let cross_text = `${this.data_formula.hd.specialInfo.cross.first}/${this.data_formula.hd.specialInfo.cross.second}|${this.data_formula.hd.specialInfo.cross.third}/${this.data_formula.hd.specialInfo.cross.fourth}`;
  appendText(svg, pers_x, pers_y, cross_text, "blue", "start", 12);

  pers_y = 660;
  pers_x = 280;
  let variable = `${this.data_formula.hd.specialInfo.variable}`;
  appendText(svg, pers_x, pers_y, variable, "blue", "start", 12);


  pers_y = 660;
  pers_x = 2;
  let type_text = typeShorten(this.data_formula.hd.generalInfo.type);
  let definition = defShorten(this.data_formula.hd.generalInfo.definition);
  let typeProfDef = `${type_text}.${this.data_formula.hd.specialInfo.profile}.${this.data_formula.hd.generalInfo.authority}.${definition}`;
  appendText(svg, pers_x, pers_y, typeProfDef, "black", "start", 12);


  // let typeProfDef = "";
  // let type_text = ""
  // let definition = ""
  // if (calc === "full") {
  //   type_text = typeShorten(this.data_formula.hd.generalInfo.type);
  //   definition = defShorten(this.data_formula.hd.generalInfo.definition);
  //   typeProfDef = `${type_text}.${this.data_formula.hd.specialInfo.profile}.${this.data_formula.hd.generalInfo.authority}.${definition}`;
  // } else if (calc === "personality") {
  //   type_text = typeShorten(this.data_formula.hd.personality.generalInfo.type);
  //   definition = defShorten(this.data_formula.hd.personality.generalInfo.definition);
  //   typeProfDef = `${type_text}.${this.data_formula.hd.specialInfo.profile}.${this.data_formula.hd.personality.generalInfo.authority}.${definition}`;
  // } else if (calc === "design") {

  //   type_text = typeShorten(this.data_formula.hd.design.generalInfo.type);
  //   definition = defShorten(this.data_formula.hd.design.generalInfo.definition);
  //   typeProfDef = `${type_text}.${this.data_formula.hd.specialInfo.profile}.${this.data_formula.hd.design.generalInfo.authority}.${definition}`

  // }




  let gates = [];

  //инициализируем центры
  let centres = {
    head: false,
    ajna: false,
    throat: false,
    g: false,
    sacral: false,
    root: false,
    ego: false,
    spleen: false,
    emo: false,
  };

  //инициализируем ворота, отсчет от 1
  for (let i = 1; i <= 64; i++) {
    gates[i] = NaN;
  }

  for (let key in this.design_short) {
    gates[this.design_short[key].hex] = "red";
  }

  for (let key in this.pers_short) {
    if (
      gates[this.pers_short[key].hex] === "red" ||
      gates[this.pers_short[key].hex] === "both"
    ) {
      gates[this.pers_short[key].hex] = "both";
    } else {
      gates[this.pers_short[key].hex] = "black";
    }
  }

  //console.log(gates);

  //пока рисуем воротами, каналами пока не рисуем

  //HEAD && AJNA
  if (gates[64] || gates[47]) {
    if (gates[64] && gates[47]) {
      centres.head = true;
      centres.ajna = true;
    }
    if (gates[64]) this.draw_64_47(64, gates[64]);
    if (gates[47]) this.draw_64_47(47, gates[47]);
  }

  if (gates[61] || gates[24]) {
    if (gates[61] && gates[24]) {
      centres.head = true;
      centres.ajna = true;
    }

    if (gates[61]) this.draw_61_24(61, gates[61]);
    if (gates[24]) this.draw_61_24(24, gates[24]);
  }

  if (gates[63] || gates[4]) {
    if (gates[63] && gates[4]) {
      centres.head = true;
      centres.ajna = true;
    }

    if (gates[63]) this.draw_63_4(63, gates[63]);
    if (gates[4]) this.draw_63_4(4, gates[4]);
  }

  //AJNA && THROAT

  if (gates[17] || gates[62]) {
    if (gates[17] && gates[62]) {
      centres.throat = true;
      centres.ajna = true;
    }
    if (gates[17]) this.draw_17_62(17, gates[17]);
    if (gates[62]) this.draw_17_62(62, gates[62]);
  }

  if (gates[43] || gates[23]) {
    if (gates[43] && gates[23]) {
      centres.throat = true;
      centres.ajna = true;
    }

    if (gates[43]) this.draw_43_23(43, gates[43]);
    if (gates[23]) this.draw_43_23(23, gates[23]);
  }

  if (gates[11] || gates[56]) {
    if (gates[11] && gates[56]) {
      centres.throat = true;
      centres.ajna = true;
    }

    if (gates[11]) this.draw_11_56(11, gates[11]);
    if (gates[56]) this.draw_11_56(56, gates[56]);
  }

  //THROAT && G

  if (gates[31] || gates[7]) {
    if (gates[31] && gates[7]) {
      centres.throat = true;
      centres.g = true;
    }
    if (gates[31]) this.draw_31_7(31, gates[31]);
    if (gates[7]) this.draw_31_7(7, gates[7]);
  }

  if (gates[8] || gates[1]) {
    if (gates[8] && gates[1]) {
      centres.throat = true;
      centres.g = true;
    }

    if (gates[8]) this.draw_8_1(8, gates[8]);
    if (gates[1]) this.draw_8_1(1, gates[1]);
  }

  if (gates[33] || gates[13]) {
    if (gates[33] && gates[13]) {
      centres.throat = true;
      centres.g = true;
    }

    if (gates[33]) this.draw_33_13(33, gates[33]);
    if (gates[13]) this.draw_33_13(13, gates[13]);
  }

  //G && SACRAL

  if (gates[15] || gates[5]) {
    if (gates[15] && gates[5]) {
      centres.g = true;
      centres.sacral = true;
    }
    if (gates[15]) this.draw_15_5(15, gates[15]);
    if (gates[5]) this.draw_15_5(5, gates[5]);
  }

  if (gates[2] || gates[14]) {
    if (gates[2] && gates[14]) {
      centres.g = true;
      centres.sacral = true;
    }

    if (gates[2]) this.draw_2_14(2, gates[2]);
    if (gates[14]) this.draw_2_14(14, gates[14]);
  }

  if (gates[46] || gates[29]) {
    if (gates[46] && gates[29]) {
      centres.g = true;
      centres.sacral = true;
    }

    if (gates[46]) this.draw_46_29(46, gates[46]);
    if (gates[29]) this.draw_46_29(29, gates[29]);
  }

  //SACRAL && ROOT
  if (gates[42] || gates[53]) {
    if (gates[42] && gates[53]) {
      centres.sacral = true;
      centres.root = true;
    }
    if (gates[42]) this.draw_42_53(42, gates[42]);
    if (gates[53]) this.draw_42_53(53, gates[53]);
  }

  if (gates[3] || gates[60]) {
    if (gates[3] && gates[60]) {
      centres.sacral = true;
      centres.root = true;
    }

    if (gates[3]) this.draw_3_60(3, gates[3]);
    if (gates[60]) this.draw_3_60(60, gates[60]);
  }

  if (gates[9] || gates[52]) {
    if (gates[9] && gates[52]) {
      centres.sacral = true;
      centres.root = true;
    }

    if (gates[9]) this.draw_9_52(9, gates[9]);
    if (gates[52]) this.draw_9_52(52, gates[52]);
  }

  //ROOT && EMO
  if (gates[19] || gates[49]) {
    if (gates[19] && gates[49]) {
      centres.root = true;
      centres.emo = true;
    }
    if (gates[19]) this.draw_49_19(19, gates[19]);
    if (gates[49]) this.draw_49_19(49, gates[49]);
  }

  if (gates[39] || gates[55]) {
    if (gates[39] && gates[55]) {
      centres.root = true;
      centres.emo = true;
    }

    if (gates[39]) this.draw_55_39(39, gates[39]);
    if (gates[55]) this.draw_55_39(55, gates[55]);
  }

  if (gates[41] || gates[30]) {
    if (gates[41] && gates[30]) {
      centres.root = true;
      centres.emo = true;
    }

    if (gates[41]) this.draw_30_41(41, gates[41]);
    if (gates[30]) this.draw_30_41(30, gates[30]);
  }

  //ROOT && SPLEEN
  if (gates[18] || gates[58]) {
    if (gates[18] && gates[58]) {
      centres.root = true;
      centres.spleen = true;
    }
    if (gates[18]) this.draw_18_58(18, gates[18]);
    if (gates[58]) this.draw_18_58(58, gates[58]);
  }

  if (gates[28] || gates[38]) {
    if (gates[28] && gates[38]) {
      centres.root = true;
      centres.spleen = true;
    }

    if (gates[28]) this.draw_28_38(28, gates[28]);
    if (gates[38]) this.draw_28_38(38, gates[38]);
  }

  if (gates[32] || gates[54]) {
    if (gates[32] && gates[54]) {
      centres.root = true;
      centres.spleen = true;
    }

    if (gates[32]) this.draw_32_54(32, gates[32]);
    if (gates[54]) this.draw_32_54(54, gates[54]);
  }

  //EMO && SACRAL, EGO, THROAT
  if (gates[59] || gates[6]) {
    if (gates[59] && gates[6]) {
      centres.emo = true;
      centres.sacral = true;
    }
    if (gates[59]) this.draw_6_59(59, gates[59]);
    if (gates[6]) this.draw_6_59(6, gates[6]);
  }

  if (gates[37] || gates[40]) {
    if (gates[37] && gates[40]) {
      centres.emo = true;
      centres.ego = true;
    }

    if (gates[37]) this.draw_40_37(37, gates[37]);
    if (gates[40]) this.draw_40_37(40, gates[40]);
  }

  if (gates[22] || gates[12]) {
    if (gates[22] && gates[12]) {
      centres.emo = true;
      centres.throat = true;
    }

    if (gates[22]) this.draw_12_22(22, gates[22]);
    if (gates[12]) this.draw_12_22(12, gates[12]);
  }

  if (gates[35] || gates[36]) {
    if (gates[35] && gates[36]) {
      centres.emo = true;
      centres.throat = true;
    }

    if (gates[35]) this.draw_35_36(35, gates[35]);
    if (gates[36]) this.draw_35_36(36, gates[36]);
  }

  //EGO && SPLEEN, G, THROAT
  if (gates[44] || gates[26]) {
    if (gates[44] && gates[26]) {
      centres.ego = true;
      centres.spleen = true;
    }
    if (gates[44]) this.draw_26_44(44, gates[44]);
    if (gates[26]) this.draw_26_44(26, gates[26]);
  }

  if (gates[51] || gates[25]) {
    if (gates[51] && gates[25]) {
      centres.ego = true;
      centres.g = true;
    }

    if (gates[51]) this.draw_25_51(51, gates[51]);
    if (gates[25]) this.draw_25_51(25, gates[25]);
  }

  if (gates[21] || gates[45]) {
    if (gates[21] && gates[45]) {
      centres.ego = true;
      centres.throat = true;
    }

    if (gates[21]) this.draw_45_21(21, gates[21]);
    if (gates[45]) this.draw_45_21(45, gates[45]);
  }

  //SACRAL && SPLEEN
  if (gates[27] || gates[50]) {
    if (gates[27] && gates[50]) {
      centres.spleen = true;
      centres.sacral = true;
    }
    if (gates[27]) this.draw_50_27(27, gates[27]);
    if (gates[50]) this.draw_50_27(50, gates[50]);
  }

  //THROAT && SPLEEN
  if (gates[48] || gates[16]) {
    if (gates[48] && gates[16]) {
      centres.spleen = true;
      centres.throat = true;
    }
    if (gates[48]) this.draw_16_48(48, gates[48]);
    if (gates[16]) this.draw_16_48(16, gates[16]);
  }

  //INTEGRATION
  if (gates[20] || gates[57] || gates[10] || gates[34]) {
    if (gates[20] && gates[57]) {
      centres.spleen = true;
      centres.throat = true;
    }

    if (gates[20] && gates[10]) {
      centres.g = true;
      centres.throat = true;
    }

    if (gates[20] && gates[34]) {
      centres.sacral = true;
      centres.throat = true;
    }

    if (gates[10] && gates[57]) {
      centres.spleen = true;
      centres.g = true;
    }

    if (gates[34] && gates[57]) {
      centres.spleen = true;
      centres.sacral = true;
    }

    if (gates[34] && gates[10]) {
      centres.g = true;
      centres.sacral = true;
    }

    let int_gates = {};
    gates[20] ? (int_gates["20"] = gates[20]) : (int_gates["20"] = NaN);
    gates[57] ? (int_gates["57"] = gates[57]) : (int_gates["57"] = NaN);
    gates[10] ? (int_gates["10"] = gates[10]) : (int_gates["10"] = NaN);
    gates[34] ? (int_gates["34"] = gates[34]) : (int_gates["34"] = NaN);

    this.drawIntegration(int_gates);
  }

  centres.head ? this.drawHead340() : this.drawHead340("white");
  centres.ajna ? this.drawAjna340() : this.drawAjna340("white");
  centres.throat ? this.drawThroat340() : this.drawThroat340("white");
  centres.g ? this.drawG340() : this.drawG340("white");
  centres.sacral ? this.drawSacral340() : this.drawSacral340("white");
  centres.root ? this.drawRoot340() : this.drawRoot340("white");
  centres.spleen ? this.drawSpleen340() : this.drawSpleen340("white");
  centres.ego ? this.drawEgo340() : this.drawEgo340("white");
  centres.emo ? this.drawEmo340() : this.drawEmo340("white");

  //document.getElementById("img_button").disabled = false;
};

DrawFormulaClass.prototype.draw_Pers = function () {
  //this.draw_pers_text();
  this.draw_pers_text();

  let gates = [];

  //инициализируем центры
  let centres = {
    head: false,
    ajna: false,
    throat: false,
    g: false,
    sacral: false,
    root: false,
    ego: false,
    spleen: false,
    emo: false,
  };

  //инициализируем ворота, отсчет от 1
  for (let i = 1; i <= 64; i++) {
    gates[i] = NaN;
  }

  for (let key in this.pers_short) {
    gates[this.pers_short[key].hex] = "black";
  }

  //HEAD && AJNA
  if (gates[64] || gates[47]) {
    if (gates[64] && gates[47]) {
      centres.head = true;
      centres.ajna = true;
    }
    if (gates[64]) this.draw_64_47(64, gates[64]);
    if (gates[47]) this.draw_64_47(47, gates[47]);
  }

  if (gates[61] || gates[24]) {
    if (gates[61] && gates[24]) {
      centres.head = true;
      centres.ajna = true;
    }

    if (gates[61]) this.draw_61_24(61, gates[61]);
    if (gates[24]) this.draw_61_24(24, gates[24]);
  }

  if (gates[63] || gates[4]) {
    if (gates[63] && gates[4]) {
      centres.head = true;
      centres.ajna = true;
    }

    if (gates[63]) this.draw_63_4(63, gates[63]);
    if (gates[4]) this.draw_63_4(4, gates[4]);
  }

  //AJNA && THROAT

  if (gates[17] || gates[62]) {
    if (gates[17] && gates[62]) {
      centres.throat = true;
      centres.ajna = true;
    }
    if (gates[17]) this.draw_17_62(17, gates[17]);
    if (gates[62]) this.draw_17_62(62, gates[62]);
  }

  if (gates[43] || gates[23]) {
    if (gates[43] && gates[23]) {
      centres.throat = true;
      centres.ajna = true;
    }

    if (gates[43]) this.draw_43_23(43, gates[43]);
    if (gates[23]) this.draw_43_23(23, gates[23]);
  }

  if (gates[11] || gates[56]) {
    if (gates[11] && gates[56]) {
      centres.throat = true;
      centres.ajna = true;
    }

    if (gates[11]) this.draw_11_56(11, gates[11]);
    if (gates[56]) this.draw_11_56(56, gates[56]);
  }

  //THROAT && G

  if (gates[31] || gates[7]) {
    if (gates[31] && gates[7]) {
      centres.throat = true;
      centres.g = true;
    }
    if (gates[31]) this.draw_31_7(31, gates[31]);
    if (gates[7]) this.draw_31_7(7, gates[7]);
  }

  if (gates[8] || gates[1]) {
    if (gates[8] && gates[1]) {
      centres.throat = true;
      centres.g = true;
    }

    if (gates[8]) this.draw_8_1(8, gates[8]);
    if (gates[1]) this.draw_8_1(1, gates[1]);
  }

  if (gates[33] || gates[13]) {
    if (gates[33] && gates[13]) {
      centres.throat = true;
      centres.g = true;
    }

    if (gates[33]) this.draw_33_13(33, gates[33]);
    if (gates[13]) this.draw_33_13(13, gates[13]);
  }

  //G && SACRAL

  if (gates[15] || gates[5]) {
    if (gates[15] && gates[5]) {
      centres.g = true;
      centres.sacral = true;
    }
    if (gates[15]) this.draw_15_5(15, gates[15]);
    if (gates[5]) this.draw_15_5(5, gates[5]);
  }

  if (gates[2] || gates[14]) {
    if (gates[2] && gates[14]) {
      centres.g = true;
      centres.sacral = true;
    }

    if (gates[2]) this.draw_2_14(2, gates[2]);
    if (gates[14]) this.draw_2_14(14, gates[14]);
  }

  if (gates[46] || gates[29]) {
    if (gates[46] && gates[29]) {
      centres.g = true;
      centres.sacral = true;
    }

    if (gates[46]) this.draw_46_29(46, gates[46]);
    if (gates[29]) this.draw_46_29(29, gates[29]);
  }

  //SACRAL && ROOT
  if (gates[42] || gates[53]) {
    if (gates[42] && gates[53]) {
      centres.sacral = true;
      centres.root = true;
    }
    if (gates[42]) this.draw_42_53(42, gates[42]);
    if (gates[53]) this.draw_42_53(53, gates[53]);
  }

  if (gates[3] || gates[60]) {
    if (gates[3] && gates[60]) {
      centres.sacral = true;
      centres.root = true;
    }

    if (gates[3]) this.draw_3_60(3, gates[3]);
    if (gates[60]) this.draw_3_60(60, gates[60]);
  }

  if (gates[9] || gates[52]) {
    if (gates[9] && gates[52]) {
      centres.sacral = true;
      centres.root = true;
    }

    if (gates[9]) this.draw_9_52(9, gates[9]);
    if (gates[52]) this.draw_9_52(52, gates[52]);
  }

  //ROOT && EMO
  if (gates[19] || gates[49]) {
    if (gates[19] && gates[49]) {
      centres.root = true;
      centres.emo = true;
    }
    if (gates[19]) this.draw_49_19(19, gates[19]);
    if (gates[49]) this.draw_49_19(49, gates[49]);
  }

  if (gates[39] || gates[55]) {
    if (gates[39] && gates[55]) {
      centres.root = true;
      centres.emo = true;
    }

    if (gates[39]) this.draw_55_39(39, gates[39]);
    if (gates[55]) this.draw_55_39(55, gates[55]);
  }

  if (gates[41] || gates[30]) {
    if (gates[41] && gates[30]) {
      centres.root = true;
      centres.emo = true;
    }

    if (gates[41]) this.draw_30_41(41, gates[41]);
    if (gates[30]) this.draw_30_41(30, gates[30]);
  }

  //ROOT && SPLEEN
  if (gates[18] || gates[58]) {
    if (gates[18] && gates[58]) {
      centres.root = true;
      centres.spleen = true;
    }
    if (gates[18]) this.draw_18_58(18, gates[18]);
    if (gates[58]) this.draw_18_58(58, gates[58]);
  }

  if (gates[28] || gates[38]) {
    if (gates[28] && gates[38]) {
      centres.root = true;
      centres.spleen = true;
    }

    if (gates[28]) this.draw_28_38(28, gates[28]);
    if (gates[38]) this.draw_28_38(38, gates[38]);
  }

  if (gates[32] || gates[54]) {
    if (gates[32] && gates[54]) {
      centres.root = true;
      centres.spleen = true;
    }

    if (gates[32]) this.draw_32_54(32, gates[32]);
    if (gates[54]) this.draw_32_54(54, gates[54]);
  }

  //EMO && SACRAL, EGO, THROAT
  if (gates[59] || gates[6]) {
    if (gates[59] && gates[6]) {
      centres.emo = true;
      centres.sacral = true;
    }
    if (gates[59]) this.draw_6_59(59, gates[59]);
    if (gates[6]) this.draw_6_59(6, gates[6]);
  }

  if (gates[37] || gates[40]) {
    if (gates[37] && gates[40]) {
      centres.emo = true;
      centres.ego = true;
    }

    if (gates[37]) this.draw_40_37(37, gates[37]);
    if (gates[40]) this.draw_40_37(40, gates[40]);
  }

  if (gates[22] || gates[12]) {
    if (gates[22] && gates[12]) {
      centres.emo = true;
      centres.throat = true;
    }

    if (gates[22]) this.draw_12_22(22, gates[22]);
    if (gates[12]) this.draw_12_22(12, gates[12]);
  }

  if (gates[35] || gates[36]) {
    if (gates[35] && gates[36]) {
      centres.emo = true;
      centres.throat = true;
    }

    if (gates[35]) this.draw_35_36(35, gates[35]);
    if (gates[36]) this.draw_35_36(36, gates[36]);
  }

  //EGO && SPLEEN, G, THROAT
  if (gates[44] || gates[26]) {
    if (gates[44] && gates[26]) {
      centres.ego = true;
      centres.spleen = true;
    }
    if (gates[44]) this.draw_26_44(44, gates[44]);
    if (gates[26]) this.draw_26_44(26, gates[26]);
  }

  if (gates[51] || gates[25]) {
    if (gates[51] && gates[25]) {
      centres.ego = true;
      centres.g = true;
    }

    if (gates[51]) this.draw_25_51(51, gates[51]);
    if (gates[25]) this.draw_25_51(25, gates[25]);
  }

  if (gates[21] || gates[45]) {
    if (gates[21] && gates[45]) {
      centres.ego = true;
      centres.throat = true;
    }

    if (gates[21]) this.draw_45_21(21, gates[21]);
    if (gates[45]) this.draw_45_21(45, gates[45]);
  }

  //SACRAL && SPLEEN
  if (gates[27] || gates[50]) {
    if (gates[27] && gates[50]) {
      centres.spleen = true;
      centres.sacral = true;
    }
    if (gates[27]) this.draw_50_27(27, gates[27]);
    if (gates[50]) this.draw_50_27(50, gates[50]);
  }

  //THROAT && SPLEEN
  if (gates[48] || gates[16]) {
    if (gates[48] && gates[16]) {
      centres.spleen = true;
      centres.throat = true;
    }
    if (gates[48]) this.draw_16_48(48, gates[48]);
    if (gates[16]) this.draw_16_48(16, gates[16]);
  }

  //INTEGRATION
  if (gates[20] || gates[57] || gates[10] || gates[34]) {
    if (gates[20] && gates[57]) {
      centres.spleen = true;
      centres.throat = true;
    }

    if (gates[20] && gates[10]) {
      centres.g = true;
      centres.throat = true;
    }

    if (gates[20] && gates[34]) {
      centres.sacral = true;
      centres.throat = true;
    }

    if (gates[10] && gates[57]) {
      centres.spleen = true;
      centres.g = true;
    }

    if (gates[34] && gates[57]) {
      centres.spleen = true;
      centres.sacral = true;
    }

    if (gates[34] && gates[10]) {
      centres.g = true;
      centres.sacral = true;
    }

    let int_gates = {};
    gates[20] ? (int_gates["20"] = gates[20]) : (int_gates["20"] = NaN);
    gates[57] ? (int_gates["57"] = gates[57]) : (int_gates["57"] = NaN);
    gates[10] ? (int_gates["10"] = gates[10]) : (int_gates["10"] = NaN);
    gates[34] ? (int_gates["34"] = gates[34]) : (int_gates["34"] = NaN);

    this.drawIntegration(int_gates);
  }

  centres.head ? this.drawHead340() : this.drawHead340("white");
  centres.ajna ? this.drawAjna340() : this.drawAjna340("white");
  centres.throat ? this.drawThroat340() : this.drawThroat340("white");
  centres.g ? this.drawG340() : this.drawG340("white");
  centres.sacral ? this.drawSacral340() : this.drawSacral340("white");
  centres.root ? this.drawRoot340() : this.drawRoot340("white");
  centres.spleen ? this.drawSpleen340() : this.drawSpleen340("white");
  centres.ego ? this.drawEgo340() : this.drawEgo340("white");
  centres.emo ? this.drawEmo340() : this.drawEmo340("white");

  //document.getElementById("img_button").disabled = false;
};

DrawFormulaClass.prototype.draw_Des = function () {
  //this.draw_des_text();
  this.draw_des_text();

  let gates = [];

  //инициализируем центры
  let centres = {
    head: false,
    ajna: false,
    throat: false,
    g: false,
    sacral: false,
    root: false,
    ego: false,
    spleen: false,
    emo: false,
  };

  //инициализируем ворота, отсчет от 1
  for (let i = 1; i <= 64; i++) {
    gates[i] = NaN;
  }

  for (let key in this.design_short) {
    gates[this.design_short[key].hex] = "red";
  }

  //HEAD && AJNA
  if (gates[64] || gates[47]) {
    if (gates[64] && gates[47]) {
      centres.head = true;
      centres.ajna = true;
    }
    if (gates[64]) this.draw_64_47(64, gates[64]);
    if (gates[47]) this.draw_64_47(47, gates[47]);
  }

  if (gates[61] || gates[24]) {
    if (gates[61] && gates[24]) {
      centres.head = true;
      centres.ajna = true;
    }

    if (gates[61]) this.draw_61_24(61, gates[61]);
    if (gates[24]) this.draw_61_24(24, gates[24]);
  }

  if (gates[63] || gates[4]) {
    if (gates[63] && gates[4]) {
      centres.head = true;
      centres.ajna = true;
    }

    if (gates[63]) this.draw_63_4(63, gates[63]);
    if (gates[4]) this.draw_63_4(4, gates[4]);
  }

  //AJNA && THROAT

  if (gates[17] || gates[62]) {
    if (gates[17] && gates[62]) {
      centres.throat = true;
      centres.ajna = true;
    }
    if (gates[17]) this.draw_17_62(17, gates[17]);
    if (gates[62]) this.draw_17_62(62, gates[62]);
  }

  if (gates[43] || gates[23]) {
    if (gates[43] && gates[23]) {
      centres.throat = true;
      centres.ajna = true;
    }

    if (gates[43]) this.draw_43_23(43, gates[43]);
    if (gates[23]) this.draw_43_23(23, gates[23]);
  }

  if (gates[11] || gates[56]) {
    if (gates[11] && gates[56]) {
      centres.throat = true;
      centres.ajna = true;
    }

    if (gates[11]) this.draw_11_56(11, gates[11]);
    if (gates[56]) this.draw_11_56(56, gates[56]);
  }

  //THROAT && G

  if (gates[31] || gates[7]) {
    if (gates[31] && gates[7]) {
      centres.throat = true;
      centres.g = true;
    }
    if (gates[31]) this.draw_31_7(31, gates[31]);
    if (gates[7]) this.draw_31_7(7, gates[7]);
  }

  if (gates[8] || gates[1]) {
    if (gates[8] && gates[1]) {
      centres.throat = true;
      centres.g = true;
    }

    if (gates[8]) this.draw_8_1(8, gates[8]);
    if (gates[1]) this.draw_8_1(1, gates[1]);
  }

  if (gates[33] || gates[13]) {
    if (gates[33] && gates[13]) {
      centres.throat = true;
      centres.g = true;
    }

    if (gates[33]) this.draw_33_13(33, gates[33]);
    if (gates[13]) this.draw_33_13(13, gates[13]);
  }

  //G && SACRAL

  if (gates[15] || gates[5]) {
    if (gates[15] && gates[5]) {
      centres.g = true;
      centres.sacral = true;
    }
    if (gates[15]) this.draw_15_5(15, gates[15]);
    if (gates[5]) this.draw_15_5(5, gates[5]);
  }

  if (gates[2] || gates[14]) {
    if (gates[2] && gates[14]) {
      centres.g = true;
      centres.sacral = true;
    }

    if (gates[2]) this.draw_2_14(2, gates[2]);
    if (gates[14]) this.draw_2_14(14, gates[14]);
  }

  if (gates[46] || gates[29]) {
    if (gates[46] && gates[29]) {
      centres.g = true;
      centres.sacral = true;
    }

    if (gates[46]) this.draw_46_29(46, gates[46]);
    if (gates[29]) this.draw_46_29(29, gates[29]);
  }

  //SACRAL && ROOT
  if (gates[42] || gates[53]) {
    if (gates[42] && gates[53]) {
      centres.sacral = true;
      centres.root = true;
    }
    if (gates[42]) this.draw_42_53(42, gates[42]);
    if (gates[53]) this.draw_42_53(53, gates[53]);
  }

  if (gates[3] || gates[60]) {
    if (gates[3] && gates[60]) {
      centres.sacral = true;
      centres.root = true;
    }

    if (gates[3]) this.draw_3_60(3, gates[3]);
    if (gates[60]) this.draw_3_60(60, gates[60]);
  }

  if (gates[9] || gates[52]) {
    if (gates[9] && gates[52]) {
      centres.sacral = true;
      centres.root = true;
    }

    if (gates[9]) this.draw_9_52(9, gates[9]);
    if (gates[52]) this.draw_9_52(52, gates[52]);
  }

  //ROOT && EMO
  if (gates[19] || gates[49]) {
    if (gates[19] && gates[49]) {
      centres.root = true;
      centres.emo = true;
    }
    if (gates[19]) this.draw_49_19(19, gates[19]);
    if (gates[49]) this.draw_49_19(49, gates[49]);
  }

  if (gates[39] || gates[55]) {
    if (gates[39] && gates[55]) {
      centres.root = true;
      centres.emo = true;
    }

    if (gates[39]) this.draw_55_39(39, gates[39]);
    if (gates[55]) this.draw_55_39(55, gates[55]);
  }

  if (gates[41] || gates[30]) {
    if (gates[41] && gates[30]) {
      centres.root = true;
      centres.emo = true;
    }

    if (gates[41]) this.draw_30_41(41, gates[41]);
    if (gates[30]) this.draw_30_41(30, gates[30]);
  }

  //ROOT && SPLEEN
  if (gates[18] || gates[58]) {
    if (gates[18] && gates[58]) {
      centres.root = true;
      centres.spleen = true;
    }
    if (gates[18]) this.draw_18_58(18, gates[18]);
    if (gates[58]) this.draw_18_58(58, gates[58]);
  }

  if (gates[28] || gates[38]) {
    if (gates[28] && gates[38]) {
      centres.root = true;
      centres.spleen = true;
    }

    if (gates[28]) this.draw_28_38(28, gates[28]);
    if (gates[38]) this.draw_28_38(38, gates[38]);
  }

  if (gates[32] || gates[54]) {
    if (gates[32] && gates[54]) {
      centres.root = true;
      centres.spleen = true;
    }

    if (gates[32]) this.draw_32_54(32, gates[32]);
    if (gates[54]) this.draw_32_54(54, gates[54]);
  }

  //EMO && SACRAL, EGO, THROAT
  if (gates[59] || gates[6]) {
    if (gates[59] && gates[6]) {
      centres.emo = true;
      centres.sacral = true;
    }
    if (gates[59]) this.draw_6_59(59, gates[59]);
    if (gates[6]) this.draw_6_59(6, gates[6]);
  }

  if (gates[37] || gates[40]) {
    if (gates[37] && gates[40]) {
      centres.emo = true;
      centres.ego = true;
    }

    if (gates[37]) this.draw_40_37(37, gates[37]);
    if (gates[40]) this.draw_40_37(40, gates[40]);
  }

  if (gates[22] || gates[12]) {
    if (gates[22] && gates[12]) {
      centres.emo = true;
      centres.throat = true;
    }

    if (gates[22]) this.draw_12_22(22, gates[22]);
    if (gates[12]) this.draw_12_22(12, gates[12]);
  }

  if (gates[35] || gates[36]) {
    if (gates[35] && gates[36]) {
      centres.emo = true;
      centres.throat = true;
    }

    if (gates[35]) this.draw_35_36(35, gates[35]);
    if (gates[36]) this.draw_35_36(36, gates[36]);
  }

  //EGO && SPLEEN, G, THROAT
  if (gates[44] || gates[26]) {
    if (gates[44] && gates[26]) {
      centres.ego = true;
      centres.spleen = true;
    }
    if (gates[44]) this.draw_26_44(44, gates[44]);
    if (gates[26]) this.draw_26_44(26, gates[26]);
  }

  if (gates[51] || gates[25]) {
    if (gates[51] && gates[25]) {
      centres.ego = true;
      centres.g = true;
    }

    if (gates[51]) this.draw_25_51(51, gates[51]);
    if (gates[25]) this.draw_25_51(25, gates[25]);
  }

  if (gates[21] || gates[45]) {
    if (gates[21] && gates[45]) {
      centres.ego = true;
      centres.throat = true;
    }

    if (gates[21]) this.draw_45_21(21, gates[21]);
    if (gates[45]) this.draw_45_21(45, gates[45]);
  }

  //SACRAL && SPLEEN
  if (gates[27] || gates[50]) {
    if (gates[27] && gates[50]) {
      centres.spleen = true;
      centres.sacral = true;
    }
    if (gates[27]) this.draw_50_27(27, gates[27]);
    if (gates[50]) this.draw_50_27(50, gates[50]);
  }

  //THROAT && SPLEEN
  if (gates[48] || gates[16]) {
    if (gates[48] && gates[16]) {
      centres.spleen = true;
      centres.throat = true;
    }
    if (gates[48]) this.draw_16_48(48, gates[48]);
    if (gates[16]) this.draw_16_48(16, gates[16]);
  }

  //INTEGRATION
  if (gates[20] || gates[57] || gates[10] || gates[34]) {
    if (gates[20] && gates[57]) {
      centres.spleen = true;
      centres.throat = true;
    }

    if (gates[20] && gates[10]) {
      centres.g = true;
      centres.throat = true;
    }

    if (gates[20] && gates[34]) {
      centres.sacral = true;
      centres.throat = true;
    }

    if (gates[10] && gates[57]) {
      centres.spleen = true;
      centres.g = true;
    }

    if (gates[34] && gates[57]) {
      centres.spleen = true;
      centres.sacral = true;
    }

    if (gates[34] && gates[10]) {
      centres.g = true;
      centres.sacral = true;
    }

    let int_gates = {};
    gates[20] ? (int_gates["20"] = gates[20]) : (int_gates["20"] = NaN);
    gates[57] ? (int_gates["57"] = gates[57]) : (int_gates["57"] = NaN);
    gates[10] ? (int_gates["10"] = gates[10]) : (int_gates["10"] = NaN);
    gates[34] ? (int_gates["34"] = gates[34]) : (int_gates["34"] = NaN);

    this.drawIntegration(int_gates);
  }

  centres.head ? this.drawHead340() : this.drawHead340("white");
  centres.ajna ? this.drawAjna340() : this.drawAjna340("white");
  centres.throat ? this.drawThroat340() : this.drawThroat340("white");
  centres.g ? this.drawG340() : this.drawG340("white");
  centres.sacral ? this.drawSacral340() : this.drawSacral340("white");
  centres.root ? this.drawRoot340() : this.drawRoot340("white");
  centres.spleen ? this.drawSpleen340() : this.drawSpleen340("white");
  centres.ego ? this.drawEgo340() : this.drawEgo340("white");
  centres.emo ? this.drawEmo340() : this.drawEmo340("white");

  //document.getElementById("img_button").disabled = false;
};
