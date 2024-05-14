import * as d3 from "d3";
import { appendText, appendTextPlanets } from "./auxiliary_fns.ts";
import { drawNumerology } from "./numerology.ts";

import { environment, motivation, nutrition } from "./phs.ts";

let formula = NaN;

let for_name = "";

let width;
let height;

let svg;

export function DrawFormulaClass(data_formula, view_width, view_height) {
  formula = data_formula;

  width = view_width;
  height = view_height;

  //x - посередине
  this.x = view_width / 2;
  //делаем сверху отступ на 10%
  this.y = (view_height / 100) * 10;

  //   //координаты для текста
  //   this.pers_x = this.x - width / 2;
  //   this.pers_y = 0;

  //удаляем старый график before drawing a new one
  svg = d3.select("#svg_formula_chart").remove();

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

  this.lineFunction = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);

  this.radius = 25;

  this.styles = {
    family: "futura, sans-serif",
    size: 12,
    leading: 50,
    weight: 700,
  };

  //ширина 1 центра 10%
  this.width_of_1_centre = (width / 100) * 10;

  //высота 1 центра 10%
  this.height_of_1_centre = (height / 100) * 10;

  //делаем начальный промежуток между центрами 3%
  this.gap_between_centres = (height / 100) * 3;

  this.headCentreCoord = {};
  this.ajnaCentreCoord = {};
  this.throatCentreCoord = {};
  this.gCentreCoord = {};
  this.sacralCentreCoord = {};
  this.rootCentreCoord = {};
  this.egoCentreCoord = {};
  this.spleenCentreCoord = {};
  this.emoCentreCoord = {};

  //название как ключ,
  // координаты планеты на графике + флаг нарисовали мы ее или еще нет
  this.planets_full_info = {
    mercury: {
      x: NaN,
      y: NaN,
      drawn: false,
    },
    venus: {
      x: NaN,
      y: NaN,
      drawn: false,
    },
    earth: {
      x: NaN,
      y: NaN,
      drawn: false,
    },
    mars: {
      x: NaN,
      y: NaN,
      drawn: false,
    },
    jupiter: {
      x: NaN,
      y: NaN,
      drawn: false,
    },
    saturn: {
      x: NaN,
      y: NaN,
      drawn: false,
    },
    uranus: {
      x: NaN,
      y: NaN,
      drawn: false,
    },
    neptune: {
      x: NaN,
      y: NaN,
      drawn: false,
    },
    pluto: {
      x: NaN,
      y: NaN,
      drawn: false,
    },
    sun: {
      x: NaN,
      y: NaN,
      drawn: false,
    },
    moon: {
      x: NaN,
      y: NaN,
      drawn: false,
    },
    north_node: {
      x: NaN,
      y: NaN,
      drawn: false,
    },
    south_node: {
      x: NaN,
      y: NaN,
      drawn: false,
    },
  };

  //размер, которым рисуется планета
  this.size_of_the_planet_to_draw = 14;

  this.init();
}

//Определяет начальные координаты и размеры рисунка
// Надо сюда так-же засунуть все надписи
DrawFormulaClass.prototype.init = function () {
  //координаты для текста
  this.pers_x = this.x - width / 2;
  this.pers_y = this.y;

  //находим координаты всех ворот, каналов и центров
  let x = this.x;
  let y = this.y;

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
  this.spleenCentreCoord = {
    x: x,
    y: y,

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
  const data = {
    top_left_x: this.throatCentreCoord.text20coordinates.x,
    top_left_y: this.throatCentreCoord.text20coordinates.y,

    bottom_left_x: this.spleenCentreCoord.text57coordinates.x,
    bottom_left_y: this.spleenCentreCoord.text57coordinates.y,

    width: 10,
  };

  data.temp_width = data.bottom_left_x - data.top_left_x;
  data.temp_height = data.bottom_left_y - data.top_left_y;

  let points = [
    {
      x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
      y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
    },
    {
      x: this.spleenCentreCoord.text57coordinates.x,
      y: this.spleenCentreCoord.text57coordinates.y,
    },
    {
      x: this.spleenCentreCoord.text57coordinates.x + data.width,
      y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
    },
    {
      x:
        this.spleenCentreCoord.text57coordinates.x +
        data.width +
        data.temp_height / 3.2,
      y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3,
    },

    {
      x: this.sacralCentreCoord.text34coordinates.x,
      y: this.sacralCentreCoord.text34coordinates.y,
    },
    {
      x: this.sacralCentreCoord.text34coordinates.x + data.width,
      y: this.sacralCentreCoord.text34coordinates.y - data.width,
    },

    {
      x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 -
        data.width * 2.3,
      y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width,
    },

    {
      x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 +
        data.temp_height / 12,
      y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width -
        (data.temp_height * 2) / 10,
    },

    {
      x: this.gCentreCoord.text10coordinates.x,
      y: this.gCentreCoord.text10coordinates.y,
    },
    {
      x: this.gCentreCoord.text10coordinates.x,
      y: this.gCentreCoord.text10coordinates.y - data.width,
    },

    {
      x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 +
        data.temp_height / 8,
      y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width -
        (data.temp_height * 2) / 10 -
        data.width,
    },

    {
      x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
      y: this.throatCentreCoord.text20coordinates.y,
    },
    {
      x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
      y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
    },
  ];

  svg
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", "black")
    .attr("fill", "white");
};

DrawFormulaClass.prototype.draw_20_57_Integration = function (data) {
  let points = [];
  let mixed_line = NaN;

  //drawing the whole channel
  if (data.gate === "both") {
    points = [
      {
        x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
        y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
      },
      {
        x: this.spleenCentreCoord.text57coordinates.x,
        y: this.spleenCentreCoord.text57coordinates.y,
      },

      {
        x: this.spleenCentreCoord.text57coordinates.x + data.width,
        y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
      },

      {
        x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
        y: this.throatCentreCoord.text20coordinates.y,
      },
      {
        x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
        y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
      },
    ];

    if (data.type === "both") {
      mixed_line = svg.append("g");
      mixed_line
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "red");

      points = [
        {
          x:
            this.throatCentreCoord.text20coordinates.x +
            this.styles.size / 2 +
            data.half_width * 1.4,
          y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
        },
        {
          x: this.spleenCentreCoord.text57coordinates.x + data.half_width * 1.4,
          y: this.spleenCentreCoord.text57coordinates.y,
        },

        {
          x: this.spleenCentreCoord.text57coordinates.x + data.width,
          y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
        },

        {
          x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
          y: this.throatCentreCoord.text20coordinates.y,
        },

        {
          x:
            this.throatCentreCoord.text20coordinates.x +
            this.styles.size / 2 +
            data.half_width,
          y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
        },
      ];

      mixed_line
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "black");

      mixed_line.attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
    } else {
      svg
        .append("path")
        .attr("d", this.lineFunction(points))
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
      {
        x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
        y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.temp_height / 2 +
          data.temp_height / 7.5,
        y:
          this.spleenCentreCoord.text57coordinates.y +
          data.temp_width / 3 -
          data.width -
          (data.temp_height * 2) / 7 -
          data.width,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.temp_height / 2 +
          data.temp_height / 5,
        y:
          this.spleenCentreCoord.text57coordinates.y +
          data.temp_width / 3 -
          data.width -
          (data.temp_height * 2) / 7 -
          data.width,
      },

      {
        x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
        y: this.throatCentreCoord.text20coordinates.y,
      },
      {
        x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
        y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
      },
    ];

    if (data.type === "both") {
      mixed_line = svg.append("g");
      mixed_line
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "red");

      points = [
        {
          x:
            this.throatCentreCoord.text20coordinates.x +
            this.styles.size / 2 +
            data.half_width * 1.4,
          y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
        },

        {
          x:
            this.spleenCentreCoord.text57coordinates.x +
            data.temp_height / 2 +
            data.temp_height / 7.5 +
            data.half_width * 1.4,
          y:
            this.spleenCentreCoord.text57coordinates.y +
            data.temp_width / 3 -
            data.width -
            (data.temp_height * 2) / 7 -
            data.width,
        },

        {
          x:
            this.spleenCentreCoord.text57coordinates.x +
            data.temp_height / 2 +
            data.temp_height / 5,
          y:
            this.spleenCentreCoord.text57coordinates.y +
            data.temp_width / 3 -
            data.width -
            (data.temp_height * 2) / 7 -
            data.width,
        },

        {
          x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
          y: this.throatCentreCoord.text20coordinates.y,
        },
        {
          x:
            this.throatCentreCoord.text20coordinates.x +
            this.styles.size / 2 +
            data.half_width * 1.4,
          y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
        },
      ];

      mixed_line
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "black");

      mixed_line.attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
    } else {
      svg
        .append("path")
        .attr("d", this.lineFunction(points))
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
      {
        x: this.spleenCentreCoord.text57coordinates.x,
        y: this.spleenCentreCoord.text57coordinates.y,
      },

      {
        x: this.spleenCentreCoord.text57coordinates.x + data.width,
        y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.width +
          data.temp_height / 3.7,
        y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3.5,
      },

      {
        x: this.spleenCentreCoord.text57coordinates.x + data.temp_height / 4,
        y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3.5,
      },

      {
        x: this.spleenCentreCoord.text57coordinates.x,
        y: this.spleenCentreCoord.text57coordinates.y,
      },
    ];

    if (data.type === "both") {
      mixed_line = svg.append("g");
      mixed_line
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "red");

      points = [
        {
          x: this.spleenCentreCoord.text57coordinates.x + data.half_width * 1.4,
          y: this.spleenCentreCoord.text57coordinates.y,
        },

        {
          x: this.spleenCentreCoord.text57coordinates.x + data.width,
          y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
        },

        {
          x:
            this.spleenCentreCoord.text57coordinates.x +
            data.width +
            data.temp_height / 3.7,
          y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3.5,
        },

        {
          x:
            this.spleenCentreCoord.text57coordinates.x +
            data.temp_height / 4 +
            data.half_width * 1.4,
          y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3.5,
        },

        {
          x: this.spleenCentreCoord.text57coordinates.x + data.half_width * 1.4,
          y: this.spleenCentreCoord.text57coordinates.y,
        },
      ];

      mixed_line
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "black");

      mixed_line.attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
    } else {
      svg
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", data.type)
        .attr(
          "transform",
          `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
        );
    }
  }
};

DrawFormulaClass.prototype.draw_57_34_Integration = function (data) {
  let points = [];
  let mixed_line = NaN;

  //drawing the whole channel

  points = [
    {
      x: this.sacralCentreCoord.text34coordinates.x,
      y: this.sacralCentreCoord.text34coordinates.y,
    },
    {
      x: this.sacralCentreCoord.text34coordinates.x + data.width,
      y: this.sacralCentreCoord.text34coordinates.y - data.width,
    },

    {
      x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 3.2 +
        data.width,
      y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 2.7 -
        data.width,
    },

    {
      x: this.spleenCentreCoord.text57coordinates.x,
      y: this.spleenCentreCoord.text57coordinates.y,
    },
    {
      x: this.spleenCentreCoord.text57coordinates.x + data.width,
      y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
    },
    {
      x:
        this.spleenCentreCoord.text57coordinates.x +
        data.width +
        data.temp_height / 3.2,
      y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3,
    },

    {
      x: this.sacralCentreCoord.text34coordinates.x,
      y: this.sacralCentreCoord.text34coordinates.y,
    },
  ];

  if (data.type === "both") {
    mixed_line = svg.append("g");
    mixed_line
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "red");

    points = [
      {
        x: this.sacralCentreCoord.text34coordinates.x,
        y: this.sacralCentreCoord.text34coordinates.y,
      },
      {
        x: this.sacralCentreCoord.text34coordinates.x + data.width,
        y: this.sacralCentreCoord.text34coordinates.y - data.half_width * 0.8,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.temp_height / 3.2 +
          data.width,
        y:
          this.spleenCentreCoord.text57coordinates.y +
          data.temp_width / 2.7 -
          data.half_width * 0.8,
      },

      {
        x: this.spleenCentreCoord.text57coordinates.x + data.half_width * 1.4,
        y: this.spleenCentreCoord.text57coordinates.y,
      },

      {
        x: this.spleenCentreCoord.text57coordinates.x + data.width,
        y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
      },
      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.width +
          data.temp_height / 3.2,
        y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3,
      },

      {
        x: this.sacralCentreCoord.text34coordinates.x,
        y: this.sacralCentreCoord.text34coordinates.y,
      },
    ];

    mixed_line
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "black");

    mixed_line.attr(
      "transform",
      `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
    );
  } else {
    svg
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", data.type)
      .attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
  }
};

DrawFormulaClass.prototype.draw_57_10_Integration = function (data) {
  let points = [];
  let mixed_line = NaN;

  //drawing the whole channel

  points = [
    {
      x: this.gCentreCoord.text10coordinates.x,
      y: this.gCentreCoord.text10coordinates.y,
    },
    {
      x: this.gCentreCoord.text10coordinates.x,
      y: this.gCentreCoord.text10coordinates.y - data.width,
    },

    {
      x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 +
        data.temp_height / 8 -
        data.width * 1.6,
      y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width -
        (data.temp_height * 2) / 10 -
        data.width,
    },

    {
      x: this.spleenCentreCoord.text57coordinates.x,
      y: this.spleenCentreCoord.text57coordinates.y,
    },
    {
      x: this.spleenCentreCoord.text57coordinates.x + data.width,
      y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
    },

    {
      x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 +
        data.temp_height / 12,
      y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width -
        (data.temp_height * 2) / 10,
    },

    {
      x: this.gCentreCoord.text10coordinates.x,
      y: this.gCentreCoord.text10coordinates.y,
    },
  ];

  if (data.type === "both") {
    mixed_line = svg.append("g");
    mixed_line
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "red");

    points = [
      {
        x: this.gCentreCoord.text10coordinates.x,
        y: this.gCentreCoord.text10coordinates.y,
      },
      {
        x: this.gCentreCoord.text10coordinates.x,
        y: this.gCentreCoord.text10coordinates.y - data.half_width * 0.8,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.temp_height / 2 +
          data.temp_height / 8 -
          data.width * 1.6,
        y:
          this.spleenCentreCoord.text57coordinates.y +
          data.temp_width / 3 -
          data.width -
          (data.temp_height * 2) / 10 -
          data.half_width * 0.8,
      },

      {
        x: this.spleenCentreCoord.text57coordinates.x + data.half_width * 1.4,
        y: this.spleenCentreCoord.text57coordinates.y,
      },

      {
        x: this.spleenCentreCoord.text57coordinates.x + data.width,
        y: this.spleenCentreCoord.text57coordinates.y + data.width / 1.7,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.temp_height / 2 +
          data.temp_height / 12,
        y:
          this.spleenCentreCoord.text57coordinates.y +
          data.temp_width / 3 -
          data.width -
          (data.temp_height * 2) / 10,
      },

      {
        x: this.gCentreCoord.text10coordinates.x,
        y: this.gCentreCoord.text10coordinates.y,
      },
    ];

    mixed_line
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "black");

    mixed_line.attr(
      "transform",
      `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
    );
  } else {
    svg
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", data.type)
      .attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
  }
};

DrawFormulaClass.prototype.draw_10_34_Integration = function (data) {
  let points = [];
  let mixed_line = NaN;

  //drawing the whole channel
  if (data.gate === "both") {
    points = [
      {
        x: this.sacralCentreCoord.text34coordinates.x,
        y: this.sacralCentreCoord.text34coordinates.y,
      },
      {
        x: this.sacralCentreCoord.text34coordinates.x + data.width,
        y: this.sacralCentreCoord.text34coordinates.y - data.width,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.temp_height / 2 -
          data.width * 2.3,
        y:
          this.spleenCentreCoord.text57coordinates.y +
          data.temp_width / 3 -
          data.width,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.temp_height / 2 +
          data.temp_height / 12,
        y:
          this.spleenCentreCoord.text57coordinates.y +
          data.temp_width / 3 -
          data.width -
          (data.temp_height * 2) / 10,
      },

      {
        x: this.gCentreCoord.text10coordinates.x,
        y: this.gCentreCoord.text10coordinates.y,
      },
      {
        x: this.gCentreCoord.text10coordinates.x,
        y: this.gCentreCoord.text10coordinates.y - data.width,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.temp_height / 2 +
          data.temp_height / 18,
        y:
          this.spleenCentreCoord.text57coordinates.y +
          data.temp_width / 3 -
          data.width -
          (data.temp_height * 2) / 10 -
          data.width,
      },

      {
        x: this.spleenCentreCoord.text57coordinates.x + data.temp_height / 3.2,
        y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 2.7,
      },

      {
        x: this.sacralCentreCoord.text34coordinates.x,
        y: this.sacralCentreCoord.text34coordinates.y,
      },
    ];

    if (data.type === "both") {
      mixed_line = svg.append("g");
      mixed_line
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "red");

      points = [
        {
          x: this.sacralCentreCoord.text34coordinates.x + data.half_width,
          y: this.sacralCentreCoord.text34coordinates.y - data.half_width,
        },
        {
          x: this.sacralCentreCoord.text34coordinates.x + data.width,
          y: this.sacralCentreCoord.text34coordinates.y - data.width,
        },

        {
          x:
            this.spleenCentreCoord.text57coordinates.x +
            data.temp_height / 2 -
            data.width * 2.3,
          y:
            this.spleenCentreCoord.text57coordinates.y +
            data.temp_width / 3 -
            data.width,
        },

        {
          x:
            this.spleenCentreCoord.text57coordinates.x +
            data.temp_height / 2 +
            data.temp_height / 12,
          y:
            this.spleenCentreCoord.text57coordinates.y +
            data.temp_width / 3 -
            data.width -
            (data.temp_height * 2) / 10,
        },

        {
          x: this.gCentreCoord.text10coordinates.x,
          y: this.gCentreCoord.text10coordinates.y,
        },
        {
          x: this.gCentreCoord.text10coordinates.x,
          y:
            this.gCentreCoord.text10coordinates.y -
            data.width +
            data.half_width,
        },

        {
          x:
            this.spleenCentreCoord.text57coordinates.x +
            data.temp_height / 2 +
            data.temp_height / 18 +
            data.half_width,
          y:
            this.spleenCentreCoord.text57coordinates.y +
            data.temp_width / 3 -
            data.width -
            (data.temp_height * 2) / 10 -
            data.width +
            data.half_width,
        },

        {
          x:
            this.spleenCentreCoord.text57coordinates.x +
            data.temp_height / 3.2 +
            data.half_width * 2,
          y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 2.7,
        },

        {
          x: this.sacralCentreCoord.text34coordinates.x + data.half_width,
          y: this.sacralCentreCoord.text34coordinates.y - data.half_width,
        },
      ];

      mixed_line
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "black");

      mixed_line.attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
    } else {
      svg
        .append("path")
        .attr("d", this.lineFunction(points))
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
      {
        x: this.gCentreCoord.text10coordinates.x,
        y: this.gCentreCoord.text10coordinates.y,
      },
      {
        x: this.gCentreCoord.text10coordinates.x,
        y: this.gCentreCoord.text10coordinates.y - data.width,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.temp_height / 2 +
          data.temp_height / 5,
        y:
          this.spleenCentreCoord.text57coordinates.y +
          data.temp_width / 3 -
          data.width -
          (data.temp_height * 2) / 10 -
          data.width,
      },
      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.temp_height / 2 +
          data.temp_height / 5,
        y:
          this.spleenCentreCoord.text57coordinates.y +
          data.temp_width / 3 -
          data.width -
          (data.temp_height * 2) / 10,
      },

      {
        x: this.gCentreCoord.text10coordinates.x,
        y: this.gCentreCoord.text10coordinates.y,
      },
    ];

    if (data.type === "both") {
      mixed_line = svg.append("g");
      mixed_line
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "red");

      points = [
        {
          x: this.gCentreCoord.text10coordinates.x,
          y: this.gCentreCoord.text10coordinates.y,
        },
        {
          x: this.gCentreCoord.text10coordinates.x,
          y:
            this.gCentreCoord.text10coordinates.y -
            data.width +
            data.half_width,
        },

        {
          x:
            this.spleenCentreCoord.text57coordinates.x +
            data.temp_height / 2 +
            data.temp_height / 5,
          y:
            this.spleenCentreCoord.text57coordinates.y +
            data.temp_width / 3 -
            data.width -
            (data.temp_height * 2) / 10 -
            data.width +
            data.half_width,
        },
        {
          x:
            this.spleenCentreCoord.text57coordinates.x +
            data.temp_height / 2 +
            data.temp_height / 5,
          y:
            this.spleenCentreCoord.text57coordinates.y +
            data.temp_width / 3 -
            data.width -
            (data.temp_height * 2) / 10,
        },

        {
          x: this.gCentreCoord.text10coordinates.x,
          y: this.gCentreCoord.text10coordinates.y,
        },
      ];

      mixed_line
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "black");

      mixed_line.attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
    } else {
      svg
        .append("path")
        .attr("d", this.lineFunction(points))
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
      {
        x: this.sacralCentreCoord.text34coordinates.x,
        y: this.sacralCentreCoord.text34coordinates.y,
      },
      {
        x: this.sacralCentreCoord.text34coordinates.x + data.width,
        y: this.sacralCentreCoord.text34coordinates.y - data.width,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.temp_height / 2 -
          data.width * 2.3,
        y:
          this.spleenCentreCoord.text57coordinates.y +
          data.temp_width / 3 -
          data.width,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.width +
          data.temp_height / 3.2,
        y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3,
      },

      {
        x: this.sacralCentreCoord.text34coordinates.x,
        y: this.sacralCentreCoord.text34coordinates.y,
      },
    ];

    if (data.type === "both") {
      mixed_line = svg.append("g");
      mixed_line
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "red");

      points = [
        {
          x: this.sacralCentreCoord.text34coordinates.x,
          y: this.sacralCentreCoord.text34coordinates.y,
        },
        {
          x:
            this.sacralCentreCoord.text34coordinates.x +
            data.width -
            data.half_width,
          y:
            this.sacralCentreCoord.text34coordinates.y -
            data.width +
            data.half_width,
        },

        {
          x:
            this.spleenCentreCoord.text57coordinates.x +
            data.temp_height / 2 -
            data.width * 2.3 -
            data.half_width,
          y:
            this.spleenCentreCoord.text57coordinates.y +
            data.temp_width / 3 -
            data.width +
            data.half_width,
        },

        {
          x:
            this.spleenCentreCoord.text57coordinates.x +
            data.width +
            data.temp_height / 3.2,
          y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 3,
        },

        {
          x: this.sacralCentreCoord.text34coordinates.x,
          y: this.sacralCentreCoord.text34coordinates.y,
        },
      ];

      mixed_line
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "black");

      mixed_line.attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
    } else {
      svg
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", data.type)
        .attr(
          "transform",
          `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
        );
    }
  }
};

DrawFormulaClass.prototype.draw_20_34_Integration = function (data) {
  let points = [];
  let mixed_line = NaN;

  //drawing the whole channel
  if (data.gate === "both") {
    points = [
      {
        x: this.sacralCentreCoord.text34coordinates.x,
        y: this.sacralCentreCoord.text34coordinates.y,
      },
      {
        x: this.sacralCentreCoord.text34coordinates.x + data.width,
        y: this.sacralCentreCoord.text34coordinates.y - data.width,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.temp_height / 2 -
          data.width * 2.3,
        y:
          this.spleenCentreCoord.text57coordinates.y +
          data.temp_width / 3 -
          data.width,
      },

      {
        x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
        y: this.throatCentreCoord.text20coordinates.y,
      },
      {
        x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
        y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
      },

      {
        x: this.spleenCentreCoord.text57coordinates.x + data.temp_height / 3.2,
        y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 2.7,
      },

      {
        x: this.sacralCentreCoord.text34coordinates.x,
        y: this.sacralCentreCoord.text34coordinates.y,
      },
    ];

    if (data.type === "both") {
      mixed_line = svg.append("g");
      mixed_line
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "red");

      points = [
        {
          x: this.sacralCentreCoord.text34coordinates.x + data.half_width,
          y: this.sacralCentreCoord.text34coordinates.y - data.half_width,
        },
        {
          x: this.sacralCentreCoord.text34coordinates.x + data.width,
          y: this.sacralCentreCoord.text34coordinates.y - data.width,
        },

        {
          x:
            this.spleenCentreCoord.text57coordinates.x +
            data.temp_height / 2 -
            data.width * 2.3,
          y:
            this.spleenCentreCoord.text57coordinates.y +
            data.temp_width / 3 -
            data.width,
        },

        {
          x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
          y: this.throatCentreCoord.text20coordinates.y,
        },
        {
          x:
            this.throatCentreCoord.text20coordinates.x +
            this.styles.size / 2 +
            data.half_width / 2,
          y:
            this.throatCentreCoord.text20coordinates.y -
            this.styles.size / 2 +
            data.half_width,
        },

        {
          x:
            this.spleenCentreCoord.text57coordinates.x +
            data.temp_height / 3.2 +
            data.half_width * 2,
          y: this.spleenCentreCoord.text57coordinates.y + data.temp_width / 2.7,
        },

        {
          x: this.sacralCentreCoord.text34coordinates.x + data.half_width,
          y: this.sacralCentreCoord.text34coordinates.y - data.half_width,
        },
      ];

      mixed_line
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "black");

      mixed_line.attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
    } else {
      svg
        .append("path")
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", data.type)
        .attr(
          "transform",
          `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
        );
    }
  }
};

DrawFormulaClass.prototype.draw_20_10_Integration = function (data) {
  let points = [];
  let mixed_line = NaN;

  //drawing the whole channel

  points = [
    {
      x: this.gCentreCoord.text10coordinates.x,
      y: this.gCentreCoord.text10coordinates.y,
    },
    {
      x: this.gCentreCoord.text10coordinates.x,
      y: this.gCentreCoord.text10coordinates.y - data.width,
    },

    {
      x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 +
        data.temp_height / 8,
      y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width -
        (data.temp_height * 2) / 10 -
        data.width,
    },

    {
      x: this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
      y: this.throatCentreCoord.text20coordinates.y,
    },
    {
      x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
      y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
    },

    {
      x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 +
        data.temp_height / 12 -
        data.width * 1.6,
      y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width -
        (data.temp_height * 2) / 10,
    },

    {
      x: this.gCentreCoord.text10coordinates.x,
      y: this.gCentreCoord.text10coordinates.y,
    },
  ];

  if (data.type === "both") {
    mixed_line = svg.append("g");
    mixed_line
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "red");

    points = [
      {
        x: this.gCentreCoord.text10coordinates.x,
        y: this.gCentreCoord.text10coordinates.y,
      },
      {
        x: this.gCentreCoord.text10coordinates.x,
        y: this.gCentreCoord.text10coordinates.y - data.half_width,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.temp_height / 2 +
          data.temp_height / 8 -
          data.width * 1.4,
        y:
          this.spleenCentreCoord.text57coordinates.y +
          data.temp_width / 3 -
          data.width -
          (data.temp_height * 2) / 10 -
          data.half_width,
      },

      {
        x:
          this.throatCentreCoord.text20coordinates.x +
          data.width * 1.5 -
          data.half_width * 0.8,
        y: this.throatCentreCoord.text20coordinates.y - data.half_width * 0.8,
      },
      {
        x: this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
        y: this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,
      },

      {
        x:
          this.spleenCentreCoord.text57coordinates.x +
          data.temp_height / 2 +
          data.temp_height / 12 -
          data.width * 1.6,
        y:
          this.spleenCentreCoord.text57coordinates.y +
          data.temp_width / 3 -
          data.width -
          (data.temp_height * 2) / 10,
      },

      {
        x: this.gCentreCoord.text10coordinates.x,
        y: this.gCentreCoord.text10coordinates.y,
      },
    ];

    mixed_line
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "black");

    mixed_line.attr(
      "transform",
      `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
    );
  } else {
    svg
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", data.type)
      .attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
  }
};

//type - black, red or 'both'
// variation - 1.drawing to 34th 2.drawing to 10th
DrawFormulaClass.prototype.draw_20_Integration = function (type, variation) {
  let points = [];
  let mixed_line = NaN;

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

  data.type = type;

  let i = variation;

  let rectangle20_var = [
    //empty for the future
    {},
    //variation - 1.drawing to 34th
    {
      top_left_x:
        this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
      top_left_y:
        this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,

      bottom_left_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 3.2 +
        this.styles.size / 12,
      bottom_left_y:
        this.spleenCentreCoord.text57coordinates.y + data.temp_width / 2.7,

      bottom_right_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 3.2 +
        data.width +
        this.styles.size / 20,
      bottom_right_y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 2.7 +
        data.width * 0.7 +
        this.styles.size / 20,

      top_right_x:
        this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
      top_right_y: this.throatCentreCoord.text20coordinates.y,
    },

    //variation - 2.drawing to 10th
    {
      top_left_x:
        this.throatCentreCoord.text20coordinates.x + this.styles.size / 2,
      top_left_y:
        this.throatCentreCoord.text20coordinates.y - this.styles.size / 2,

      bottom_left_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 +
        data.temp_height / 8 -
        data.width * 2.6,
      bottom_left_y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width -
        (data.temp_height * 2) / 10,

      bottom_right_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 +
        data.temp_height / 12,
      bottom_right_y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width -
        (data.temp_height * 2) / 10,

      top_right_x:
        this.throatCentreCoord.text20coordinates.x + data.width * 1.5,
      top_right_y: this.throatCentreCoord.text20coordinates.y,
    },
  ];

  //variation - 1.drawing half to 34th
  rectangle20_var[1].top_left_half_x =
    rectangle20_var[1].top_left_x + data.half_width * 0.7;
  rectangle20_var[1].top_left_half_y =
    rectangle20_var[1].top_left_y + data.half_width * 0.7;
  rectangle20_var[1].bottom_left_half_x =
    rectangle20_var[1].bottom_left_x + data.half_width * 0.7;
  rectangle20_var[1].bottom_left_half_y =
    rectangle20_var[1].bottom_left_y + data.half_width * 0.5;
  rectangle20_var[1].bottom_right_half_x = rectangle20_var[1].bottom_right_x;
  rectangle20_var[1].bottom_right_half_y = rectangle20_var[1].bottom_right_y;
  rectangle20_var[1].top_right_half_x = rectangle20_var[1].top_right_x;
  rectangle20_var[1].top_right_half_y = rectangle20_var[1].top_right_y;

  //variation - 2.drawing half to 10th
  rectangle20_var[2].top_left_half_x =
    rectangle20_var[2].top_left_x + data.half_width * 0.7;
  rectangle20_var[2].top_left_half_y =
    rectangle20_var[2].top_left_y + data.half_width * 0.7;
  rectangle20_var[2].bottom_left_half_x =
    rectangle20_var[2].bottom_left_x + data.half_width * 1.2;
  rectangle20_var[2].bottom_left_half_y = rectangle20_var[2].bottom_left_y;
  rectangle20_var[2].bottom_right_half_x = rectangle20_var[2].bottom_right_x;
  rectangle20_var[2].bottom_right_half_y = rectangle20_var[2].bottom_right_y;
  rectangle20_var[2].top_right_half_x = rectangle20_var[2].top_right_x;
  rectangle20_var[2].top_right_half_y = rectangle20_var[2].top_right_y;

  points = [
    {
      x: rectangle20_var[i].top_left_x,
      y: rectangle20_var[i].top_left_y,
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
      x: rectangle20_var[i].top_right_x,
      y: rectangle20_var[i].top_right_y,
    },
    {
      x: rectangle20_var[i].top_left_x,
      y: rectangle20_var[i].top_left_y,
    },
  ];

  if (data.type === "both") {
    mixed_line = svg.append("g");
    mixed_line
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "red");

    points = [
      {
        x: rectangle20_var[i].top_left_half_x,
        y: rectangle20_var[i].top_left_half_y,
      },

      {
        x: rectangle20_var[i].bottom_left_half_x,
        y: rectangle20_var[i].bottom_left_half_y,
      },

      {
        x: rectangle20_var[i].bottom_right_half_x,
        y: rectangle20_var[i].bottom_right_half_y,
      },

      {
        x: rectangle20_var[i].top_right_half_x,
        y: rectangle20_var[i].top_right_half_y,
      },
      {
        x: rectangle20_var[i].top_left_half_x,
        y: rectangle20_var[i].top_left_half_y,
      },
    ];

    mixed_line
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "black");

    mixed_line.attr(
      "transform",
      `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
    );
  } else {
    svg
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", data.type)
      .attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
  }
};

//type - black, red or 'both'
// variation - 1.drawing to 34th 2.drawing to 10th
DrawFormulaClass.prototype.draw_57_Integration = function (type, variation) {
  let points = [];
  let mixed_line = NaN;

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

  data.type = type;

  let i = variation;

  //variation - 1.drawing to 34th
  let rectangle20_var = [
    //empty for the future
    {},
    //variation - 1.drawing to 34th
    {
      top_left_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 3.2 +
        this.styles.size / 12,
      top_left_y:
        this.spleenCentreCoord.text57coordinates.y + data.temp_width / 2.7,

      top_right_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 3.2 +
        data.width +
        this.styles.size / 20,
      top_right_y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 2.7 +
        data.width * 0.7 +
        this.styles.size / 20,

      bottom_left_x: this.spleenCentreCoord.text57coordinates.x,
      bottom_left_y: this.spleenCentreCoord.text57coordinates.y,

      bottom_right_x:
        this.spleenCentreCoord.text57coordinates.x + data.half_width * 3,
      bottom_right_y: this.spleenCentreCoord.text57coordinates.y,
    },

    //variation - 2.drawing to 10th
    {
      top_left_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 +
        data.temp_height / 8 -
        data.width * 2.5,
      top_left_y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width -
        (data.temp_height * 2) / 10,

      top_right_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 +
        data.temp_height / 12,
      top_right_y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width -
        (data.temp_height * 2) / 10,

      bottom_left_x: this.spleenCentreCoord.text57coordinates.x,
      bottom_left_y: this.spleenCentreCoord.text57coordinates.y,

      bottom_right_x:
        this.spleenCentreCoord.text57coordinates.x + data.half_width * 3,
      bottom_right_y: this.spleenCentreCoord.text57coordinates.y,
    },
  ];

  //variation - 1.drawing half to 34th
  rectangle20_var[1].top_left_half_x =
    rectangle20_var[1].top_left_x + data.half_width * 0.7;
  rectangle20_var[1].top_left_half_y =
    rectangle20_var[1].top_left_y + data.half_width * 0.7;
  rectangle20_var[1].bottom_left_half_x =
    rectangle20_var[1].bottom_left_x + data.half_width * 0.7;
  rectangle20_var[1].bottom_left_half_y =
    rectangle20_var[1].bottom_left_y + data.half_width * 0.5;
  rectangle20_var[1].bottom_right_half_x = rectangle20_var[1].bottom_right_x;
  rectangle20_var[1].bottom_right_half_y = rectangle20_var[1].bottom_right_y;
  rectangle20_var[1].top_right_half_x = rectangle20_var[1].top_right_x;
  rectangle20_var[1].top_right_half_y = rectangle20_var[1].top_right_y;

  //variation - 2.drawing half to 10th
  rectangle20_var[2].top_left_half_x =
    rectangle20_var[2].top_left_x + data.half_width;
  rectangle20_var[2].top_left_half_y =
    rectangle20_var[2].top_left_y + data.half_width * 0.2;
  rectangle20_var[2].bottom_left_half_x =
    rectangle20_var[2].bottom_left_x + data.half_width * 1.2;
  rectangle20_var[2].bottom_left_half_y = rectangle20_var[2].bottom_left_y;
  rectangle20_var[2].bottom_right_half_x = rectangle20_var[2].bottom_right_x;
  rectangle20_var[2].bottom_right_half_y = rectangle20_var[2].bottom_right_y;
  rectangle20_var[2].top_right_half_x = rectangle20_var[2].top_right_x;
  rectangle20_var[2].top_right_half_y = rectangle20_var[2].top_right_y;

  points = [
    {
      x: rectangle20_var[i].top_left_x,
      y: rectangle20_var[i].top_left_y,
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
      x: rectangle20_var[i].top_right_x,
      y: rectangle20_var[i].top_right_y,
    },
    {
      x: rectangle20_var[i].top_left_x,
      y: rectangle20_var[i].top_left_y,
    },
  ];

  if (data.type === "both") {
    mixed_line = svg.append("g");
    mixed_line
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "red");

    points = [
      {
        x: rectangle20_var[i].top_left_half_x,
        y: rectangle20_var[i].top_left_half_y,
      },

      {
        x: rectangle20_var[i].bottom_left_half_x,
        y: rectangle20_var[i].bottom_left_half_y,
      },

      {
        x: rectangle20_var[i].bottom_right_half_x,
        y: rectangle20_var[i].bottom_right_half_y,
      },

      {
        x: rectangle20_var[i].top_right_half_x,
        y: rectangle20_var[i].top_right_half_y,
      },
      {
        x: rectangle20_var[i].top_left_half_x,
        y: rectangle20_var[i].top_left_half_y,
      },
    ];

    mixed_line
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "black");

    mixed_line.attr(
      "transform",
      `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
    );
  } else {
    svg
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", data.type)
      .attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
  }
};

//type - black, red or 'both'
// variation always drawing to 10th
DrawFormulaClass.prototype.draw_10_Integration = function (type) {
  let points = [];
  let mixed_line = NaN;

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

  data.type = type;

  let i = 1;

  //variation - 1.drawing to 34th
  let rectangle20_var = [
    //empty for the future
    {},

    //drawing to 10th
    {
      top_left_x: this.gCentreCoord.text10coordinates.x,
      top_left_y: this.gCentreCoord.text10coordinates.y,

      top_right_x: this.gCentreCoord.text10coordinates.x,
      top_right_y: this.gCentreCoord.text10coordinates.y - data.width,

      bottom_left_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 +
        data.width / 3,
      bottom_left_y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width -
        (data.temp_height * 2) / 10,

      bottom_right_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 +
        data.temp_height / 18,
      bottom_right_y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width -
        (data.temp_height * 2) / 10 -
        data.width,
    },
  ];
  //drawing half to 10th
  rectangle20_var[1].top_left_half_x = rectangle20_var[1].top_left_x;
  rectangle20_var[1].top_left_half_y = rectangle20_var[1].top_left_y;
  rectangle20_var[1].top_right_half_x = rectangle20_var[1].top_right_x;
  rectangle20_var[1].top_right_half_y =
    rectangle20_var[1].top_right_y + data.half_width;

  rectangle20_var[1].bottom_right_half_x =
    rectangle20_var[1].bottom_right_x - data.half_width;
  rectangle20_var[1].bottom_right_half_y =
    rectangle20_var[1].bottom_right_y + data.half_width;
  rectangle20_var[1].bottom_left_half_x = rectangle20_var[1].bottom_left_x;
  rectangle20_var[1].bottom_left_half_y = rectangle20_var[1].bottom_left_y;

  points = [
    {
      x: rectangle20_var[i].top_left_x,
      y: rectangle20_var[i].top_left_y,
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
      x: rectangle20_var[i].top_right_x,
      y: rectangle20_var[i].top_right_y,
    },
    {
      x: rectangle20_var[i].top_left_x,
      y: rectangle20_var[i].top_left_y,
    },
  ];

  if (data.type === "both") {
    mixed_line = svg.append("g");
    mixed_line
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "red");

    points = [
      {
        x: rectangle20_var[i].top_left_half_x,
        y: rectangle20_var[i].top_left_half_y,
      },

      {
        x: rectangle20_var[i].bottom_left_half_x,
        y: rectangle20_var[i].bottom_left_half_y,
      },

      {
        x: rectangle20_var[i].bottom_right_half_x,
        y: rectangle20_var[i].bottom_right_half_y,
      },

      {
        x: rectangle20_var[i].top_right_half_x,
        y: rectangle20_var[i].top_right_half_y,
      },
      {
        x: rectangle20_var[i].top_left_half_x,
        y: rectangle20_var[i].top_left_half_y,
      },
    ];

    mixed_line
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "black");

    mixed_line.attr(
      "transform",
      `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
    );
  } else {
    svg
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", data.type)
      .attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
  }
};

//type - black, red or 'both'
// variation - 1.drawing to 34th 2.drawing to 10th
DrawFormulaClass.prototype.draw_34_Integration = function (type, variation) {
  let points = [];
  let mixed_line = NaN;

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

  data.type = type;

  let i = variation;

  let rectangle20_var = [
    //empty for the future
    {},

    //variation - 1.drawing to 34th
    {
      top_left_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 3.2 +
        this.styles.size / 12,
      top_left_y:
        this.spleenCentreCoord.text57coordinates.y + data.temp_width / 2.7,

      top_right_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 3.2 +
        data.width +
        this.styles.size / 20,
      top_right_y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 2.7 +
        data.width * 0.7 +
        this.styles.size / 20 -
        data.width * 1.8,

      bottom_left_x: this.sacralCentreCoord.text34coordinates.x,
      bottom_left_y: this.sacralCentreCoord.text34coordinates.y,

      bottom_right_x: this.sacralCentreCoord.text34coordinates.x + data.width,
      bottom_right_y: this.sacralCentreCoord.text34coordinates.y - data.width,
    },

    //variation - 2.drawing to 10th
    {
      top_left_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 +
        data.temp_height / 8 -
        data.width * 2.6,
      top_left_y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width -
        (data.temp_height * 2) / 10,

      top_right_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 2 +
        data.temp_height / 12,
      top_right_y:
        this.spleenCentreCoord.text57coordinates.y +
        data.temp_width / 3 -
        data.width -
        (data.temp_height * 2) / 10,

      middle_right_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 3.2 +
        this.styles.size / 12 +
        data.width * 2,
      middle_right_y:
        this.spleenCentreCoord.text57coordinates.y + data.temp_width / 2.7,

      middle_left_x:
        this.spleenCentreCoord.text57coordinates.x +
        data.temp_height / 3.2 +
        this.styles.size / 12,
      middle_left_y:
        this.spleenCentreCoord.text57coordinates.y + data.temp_width / 2.7,

      bottom_left_x: this.sacralCentreCoord.text34coordinates.x,
      bottom_left_y: this.sacralCentreCoord.text34coordinates.y,

      bottom_right_x: this.sacralCentreCoord.text34coordinates.x + data.width,
      bottom_right_y: this.sacralCentreCoord.text34coordinates.y - data.width,
    },
  ];

  //variation - 1.drawing half to 34th
  rectangle20_var[1].top_left_half_x = rectangle20_var[1].top_left_x;
  rectangle20_var[1].top_left_half_y = rectangle20_var[1].top_left_y;

  rectangle20_var[1].middle_left_x = rectangle20_var[1].top_left_x;
  rectangle20_var[1].middle_left_y = rectangle20_var[1].top_left_y;
  rectangle20_var[1].middle_left_half_x = rectangle20_var[1].top_left_half_x;
  rectangle20_var[1].middle_left_half_y = rectangle20_var[1].top_left_half_y;

  rectangle20_var[1].bottom_left_half_x =
    rectangle20_var[1].bottom_left_x + data.half_width * 0.7;
  rectangle20_var[1].bottom_left_half_y =
    rectangle20_var[1].bottom_left_y + data.half_width * 0.5;
  rectangle20_var[1].bottom_right_half_x =
    rectangle20_var[1].bottom_right_x - data.half_width;
  rectangle20_var[1].bottom_right_half_y =
    rectangle20_var[1].bottom_right_y + data.half_width;

  rectangle20_var[1].middle_right_x = rectangle20_var[1].bottom_right_x;
  rectangle20_var[1].middle_right_y = rectangle20_var[1].bottom_right_y;
  rectangle20_var[1].middle_right_half_x =
    rectangle20_var[1].bottom_right_half_x;
  rectangle20_var[1].middle_right_half_y =
    rectangle20_var[1].bottom_right_half_y;

  rectangle20_var[1].top_right_half_x =
    rectangle20_var[1].top_right_x - data.half_width;
  rectangle20_var[1].top_right_half_y =
    rectangle20_var[1].top_right_y + data.half_width;

  //variation - 2.drawing half to 10th
  rectangle20_var[2].top_left_half_x =
    rectangle20_var[2].top_left_x + data.half_width * 1.4;
  rectangle20_var[2].top_left_half_y = rectangle20_var[2].top_left_y;
  rectangle20_var[2].middle_left_half_x =
    rectangle20_var[2].middle_left_x + data.half_width * 1.8;
  rectangle20_var[2].middle_left_half_y = rectangle20_var[2].middle_left_y;
  rectangle20_var[2].bottom_left_half_x =
    rectangle20_var[2].bottom_left_x + data.half_width;
  rectangle20_var[2].bottom_left_half_y =
    rectangle20_var[2].bottom_left_y - data.half_width;
  rectangle20_var[2].bottom_right_half_x = rectangle20_var[2].bottom_right_x;
  rectangle20_var[2].bottom_right_half_y = rectangle20_var[2].bottom_right_y;
  rectangle20_var[2].middle_right_half_x = rectangle20_var[2].middle_right_x;
  rectangle20_var[2].middle_right_half_y = rectangle20_var[2].middle_right_y;
  rectangle20_var[2].top_right_half_x = rectangle20_var[2].top_right_x;
  rectangle20_var[2].top_right_half_y = rectangle20_var[2].top_right_y;

  points = [
    {
      x: rectangle20_var[i].top_left_x,
      y: rectangle20_var[i].top_left_y,
    },

    {
      x: rectangle20_var[i].middle_left_x,
      y: rectangle20_var[i].middle_left_y,
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
      x: rectangle20_var[i].middle_right_x,
      y: rectangle20_var[i].middle_right_y,
    },

    {
      x: rectangle20_var[i].top_right_x,
      y: rectangle20_var[i].top_right_y,
    },
    {
      x: rectangle20_var[i].top_left_x,
      y: rectangle20_var[i].top_left_y,
    },
  ];

  if (data.type === "both") {
    mixed_line = svg.append("g");
    mixed_line
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "red");

    points = [
      {
        x: rectangle20_var[i].top_left_half_x,
        y: rectangle20_var[i].top_left_half_y,
      },

      {
        x: rectangle20_var[i].middle_left_half_x,
        y: rectangle20_var[i].middle_left_half_y,
      },

      {
        x: rectangle20_var[i].bottom_left_half_x,
        y: rectangle20_var[i].bottom_left_half_y,
      },

      {
        x: rectangle20_var[i].bottom_right_half_x,
        y: rectangle20_var[i].bottom_right_half_y,
      },

      {
        x: rectangle20_var[i].middle_right_half_x,
        y: rectangle20_var[i].middle_right_half_y,
      },

      {
        x: rectangle20_var[i].top_right_half_x,
        y: rectangle20_var[i].top_right_half_y,
      },

      {
        x: rectangle20_var[i].top_left_half_x,
        y: rectangle20_var[i].top_left_half_y,
      },
    ];

    mixed_line
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "black");

    mixed_line.attr(
      "transform",
      `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
    );
  } else {
    svg
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", data.type)
      .attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
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
        .attr("d", this.lineFunction(points))
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
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "black");

      mixed_line.attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
    } else {
      svg
        .append("path")
        .attr("d", this.lineFunction(points))
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
        .attr("d", this.lineFunction(points))
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
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "black");

      mixed_line.attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
    } else {
      svg
        .append("path")
        .attr("d", this.lineFunction(points))
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
        .attr("d", this.lineFunction(points))
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
        .attr("d", this.lineFunction(points))
        .attr("stroke", "black")
        .attr("fill", "black");

      mixed_line.attr(
        "transform",
        `rotate(${data.rotation || 0}, ${data.top_left_x},${data.top_left_y})`
      );
    } else {
      svg
        .append("path")
        .attr("d", this.lineFunction(points))
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
  const data = {
    top_left_x: this.headCentreCoord.text64coordinates.x + 2,
    top_left_y: this.headCentreCoord.text64coordinates.y - 5,

    bottom_left_x: this.ajnaCentreCoord.text47coordinates.x + 2,
    bottom_left_y: this.ajnaCentreCoord.text47coordinates.y - 5,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 64) data.gate = "top";
  if (gate === 47) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_61_24 = function (gate, type) {
  const data = {
    top_left_x: this.headCentreCoord.text61coordinates.x,
    top_left_y: this.headCentreCoord.text61coordinates.y - 5,

    bottom_left_x: this.ajnaCentreCoord.text24coordinates.x,
    bottom_left_y: this.ajnaCentreCoord.text24coordinates.y - 5,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 61) data.gate = "top";
  if (gate === 24) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_63_4 = function (gate, type) {
  const data = {
    top_left_x: this.headCentreCoord.text63coordinates.x,
    top_left_y: this.headCentreCoord.text63coordinates.y - 5,

    bottom_left_x: this.ajnaCentreCoord.text4coordinates.x,
    bottom_left_y: this.ajnaCentreCoord.text4coordinates.y - 5,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 63) data.gate = "top";
  if (gate === 4) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_17_62 = function (gate, type) {
  const data = {
    top_left_x: this.ajnaCentreCoord.text17coordinates.x + this.styles.size / 4,
    top_left_y: this.ajnaCentreCoord.text17coordinates.y,

    bottom_left_x: this.throatCentreCoord.text62coordinates.x,
    bottom_left_y: this.throatCentreCoord.text62coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 17) data.gate = "top";
  if (gate === 62) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_43_23 = function (gate, type) {
  const data = {
    top_left_x: this.ajnaCentreCoord.text43coordinates.x + this.styles.size / 8,
    top_left_y: this.ajnaCentreCoord.text43coordinates.y,

    bottom_left_x: this.throatCentreCoord.text23coordinates.x,
    bottom_left_y: this.throatCentreCoord.text23coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 43) data.gate = "top";
  if (gate === 23) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_11_56 = function (gate, type) {
  const data = {
    top_left_x: this.ajnaCentreCoord.text11coordinates.x + this.styles.size / 4,
    top_left_y: this.ajnaCentreCoord.text11coordinates.y,

    bottom_left_x: this.throatCentreCoord.text56coordinates.x,
    bottom_left_y: this.throatCentreCoord.text56coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 11) data.gate = "top";
  if (gate === 56) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_18_58 = function (gate, type) {
  const data = {
    top_left_x: this.spleenCentreCoord.text18coordinates.x,
    top_left_y: this.spleenCentreCoord.text18coordinates.y,

    bottom_left_x: this.rootCentreCoord.text58coordinates.x,
    bottom_left_y: this.rootCentreCoord.text58coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 18) data.gate = "top";
  if (gate === 58) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = -65;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_28_38 = function (gate, type) {
  const data = {
    top_left_x: this.spleenCentreCoord.text28coordinates.x,
    top_left_y: this.spleenCentreCoord.text28coordinates.y,

    bottom_left_x: this.rootCentreCoord.text38coordinates.x,
    bottom_left_y: this.rootCentreCoord.text38coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 28) data.gate = "top";
  if (gate === 38) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = -65;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_32_54 = function (gate, type) {
  const data = {
    top_left_x: this.spleenCentreCoord.text32coordinates.x,
    top_left_y: this.spleenCentreCoord.text32coordinates.y,

    bottom_left_x: this.rootCentreCoord.text54coordinates.x,
    bottom_left_y: this.rootCentreCoord.text54coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 32) data.gate = "top";
  if (gate === 54) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = -65;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_50_27 = function (gate, type) {
  const data = {
    top_left_x: this.spleenCentreCoord.text50coordinates.x,
    top_left_y: this.spleenCentreCoord.text50coordinates.y,

    bottom_left_x: this.sacralCentreCoord.text27coordinates.x,
    bottom_left_y: this.sacralCentreCoord.text27coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 50) data.gate = "top";
  if (gate === 27) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = -80;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_30_41 = function (gate, type) {
  const data = {
    top_left_x: this.emoCentreCoord.text30coordinates.x + this.styles.size,
    top_left_y: this.emoCentreCoord.text30coordinates.y - this.styles.size,

    bottom_left_x: this.rootCentreCoord.text41coordinates.x,
    bottom_left_y: this.rootCentreCoord.text41coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 30) data.gate = "top";
  if (gate === 41) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length =
    Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) - this.styles.size;

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = 65;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_55_39 = function (gate, type) {
  const data = {
    top_left_x: this.emoCentreCoord.text55coordinates.x + this.styles.size,
    top_left_y: this.emoCentreCoord.text55coordinates.y - this.styles.size / 2,

    bottom_left_x: this.rootCentreCoord.text39coordinates.x,
    bottom_left_y: this.rootCentreCoord.text39coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 55) data.gate = "top";
  if (gate === 39) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length =
    Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) - this.styles.size;

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = 65;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_49_19 = function (gate, type) {
  const data = {
    top_left_x: this.emoCentreCoord.text49coordinates.x + this.styles.size,
    top_left_y: this.emoCentreCoord.text49coordinates.y - this.styles.size / 2,

    bottom_left_x: this.rootCentreCoord.text19coordinates.x,
    bottom_left_y: this.rootCentreCoord.text19coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 49) data.gate = "top";
  if (gate === 19) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length =
    Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) - this.styles.size;

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = 65;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_6_59 = function (gate, type) {
  const data = {
    top_left_x: this.emoCentreCoord.text6coordinates.x + this.styles.size,
    top_left_y: this.emoCentreCoord.text6coordinates.y - this.styles.size / 2,

    bottom_left_x: this.sacralCentreCoord.text59coordinates.x,
    bottom_left_y: this.sacralCentreCoord.text59coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 6) data.gate = "top";
  if (gate === 59) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = 80;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_40_37 = function (gate, type) {
  const data = {
    top_left_x: this.egoCentreCoord.text40coordinates.x + this.styles.size / 2,
    top_left_y: this.egoCentreCoord.text40coordinates.y,

    bottom_left_x: this.emoCentreCoord.text37coordinates.x,
    bottom_left_y: this.emoCentreCoord.text37coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 40) data.gate = "top";
  if (gate === 37) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = -52;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_12_22 = function (gate, type) {
  const data = {
    top_left_x:
      this.throatCentreCoord.text12coordinates.x + this.styles.size / 2,
    top_left_y: this.throatCentreCoord.text12coordinates.y,

    bottom_left_x: this.emoCentreCoord.text22coordinates.x,
    bottom_left_y: this.emoCentreCoord.text22coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 12) data.gate = "top";
  if (gate === 22) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = -42;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_35_36 = function (gate, type) {
  const data = {
    top_left_x:
      this.throatCentreCoord.text35coordinates.x + this.styles.size / 2,
    top_left_y: this.throatCentreCoord.text35coordinates.y - this.styles.size,

    bottom_left_x: this.emoCentreCoord.text36coordinates.x,
    bottom_left_y: this.emoCentreCoord.text36coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 35) data.gate = "top";
  if (gate === 36) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = -42;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_45_21 = function (gate, type) {
  const data = {
    top_left_x: this.throatCentreCoord.text45coordinates.x,
    top_left_y: this.throatCentreCoord.text45coordinates.y,

    bottom_left_x: this.egoCentreCoord.text21coordinates.x,
    bottom_left_y: this.egoCentreCoord.text21coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 45) data.gate = "top";
  if (gate === 21) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = -35;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_25_51 = function (gate, type) {
  const data = {
    top_left_x: this.gCentreCoord.text25coordinates.x,
    top_left_y: this.gCentreCoord.text25coordinates.y,

    bottom_left_x: this.egoCentreCoord.text51coordinates.x,
    bottom_left_y: this.egoCentreCoord.text51coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 25) data.gate = "top";
  if (gate === 51) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = -55;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_26_44 = function (gate, type) {
  const data = {
    top_left_x: this.egoCentreCoord.text26coordinates.x + this.styles.size / 2,
    top_left_y: this.egoCentreCoord.text26coordinates.y - this.styles.size / 2,

    bottom_left_x: this.spleenCentreCoord.text44coordinates.x,
    bottom_left_y: this.spleenCentreCoord.text44coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 26) data.gate = "top";
  if (gate === 44) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = 73;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_16_48 = function (gate, type) {
  const data = {
    top_left_x:
      this.throatCentreCoord.text16coordinates.x + this.styles.size / 2,
    top_left_y: this.throatCentreCoord.text16coordinates.y - this.styles.size,

    bottom_left_x: this.spleenCentreCoord.text48coordinates.x,
    bottom_left_y: this.spleenCentreCoord.text48coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 16) data.gate = "top";
  if (gate === 48) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length =
    Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) - this.styles.size;

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = 44;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_42_53 = function (gate, type) {
  const data = {
    top_left_x:
      this.sacralCentreCoord.text42coordinates.x + this.styles.size / 4,
    top_left_y: this.sacralCentreCoord.text42coordinates.y,

    bottom_left_x: this.rootCentreCoord.text53coordinates.x,
    bottom_left_y: this.rootCentreCoord.text53coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 42) data.gate = "top";
  if (gate === 53) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_3_60 = function (gate, type) {
  const data = {
    top_left_x:
      this.sacralCentreCoord.text3coordinates.x + this.styles.size / 4,
    top_left_y: this.sacralCentreCoord.text3coordinates.y,

    bottom_left_x: this.rootCentreCoord.text60coordinates.x,
    bottom_left_y: this.rootCentreCoord.text60coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 3) data.gate = "top";
  if (gate === 60) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_9_52 = function (gate, type) {
  const data = {
    top_left_x:
      this.sacralCentreCoord.text9coordinates.x + this.styles.size / 4,
    top_left_y: this.sacralCentreCoord.text9coordinates.y,

    bottom_left_x: this.rootCentreCoord.text52coordinates.x,
    bottom_left_y: this.rootCentreCoord.text52coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 9) data.gate = "top";
  if (gate === 52) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_15_5 = function (gate, type) {
  const data = {
    top_left_x: this.gCentreCoord.text15coordinates.x + this.styles.size / 4,
    top_left_y: this.gCentreCoord.text15coordinates.y,

    bottom_left_x: this.sacralCentreCoord.text5coordinates.x,
    bottom_left_y: this.sacralCentreCoord.text5coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 15) data.gate = "top";
  if (gate === 5) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_2_14 = function (gate, type) {
  const data = {
    top_left_x: this.gCentreCoord.text2coordinates.x + this.styles.size / 4,
    top_left_y: this.gCentreCoord.text2coordinates.y,

    bottom_left_x: this.sacralCentreCoord.text14coordinates.x,
    bottom_left_y: this.sacralCentreCoord.text14coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 2) data.gate = "top";
  if (gate === 14) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_46_29 = function (gate, type) {
  const data = {
    top_left_x: this.gCentreCoord.text46coordinates.x + this.styles.size / 4,
    top_left_y: this.gCentreCoord.text46coordinates.y,

    bottom_left_x: this.sacralCentreCoord.text29coordinates.x,
    bottom_left_y: this.sacralCentreCoord.text29coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 46) data.gate = "top";
  if (gate === 29) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_31_7 = function (gate, type) {
  const data = {
    top_left_x:
      this.throatCentreCoord.text31coordinates.x + this.styles.size / 4,
    top_left_y: this.throatCentreCoord.text31coordinates.y,

    bottom_left_x: this.gCentreCoord.text7coordinates.x,
    bottom_left_y: this.gCentreCoord.text7coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 31) data.gate = "top";
  if (gate === 7) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_8_1 = function (gate, type) {
  const data = {
    top_left_x:
      this.throatCentreCoord.text8coordinates.x + this.styles.size / 4,
    top_left_y: this.throatCentreCoord.text8coordinates.y,

    bottom_left_x: this.gCentreCoord.text1coordinates.x,
    bottom_left_y: this.gCentreCoord.text1coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 8) data.gate = "top";
  if (gate === 1) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_33_13 = function (gate, type) {
  const data = {
    top_left_x:
      this.throatCentreCoord.text33coordinates.x + this.styles.size / 4,
    top_left_y: this.throatCentreCoord.text33coordinates.y,

    bottom_left_x: this.gCentreCoord.text13coordinates.x,
    bottom_left_y: this.gCentreCoord.text13coordinates.y,

    width: 10,

    type: type,
  };

  if (gate === 0) data.gate = "both";
  if (gate === 33) data.gate = "top";
  if (gate === 13) data.gate = "bottom";

  const width = data.bottom_left_x - data.top_left_x;
  const height = data.bottom_left_y - data.top_left_y;

  const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  data.bottom_left_x = data.top_left_x;
  data.bottom_left_y = data.top_left_y + length;

  data.rotation = NaN;
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
    .attr("d", this.lineFunction(centre_data))
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

DrawFormulaClass.prototype.drawHeadCentre = function (fill) {
  const headCentreData = [
    { x: this.headCentreCoord.x, y: this.headCentreCoord.y },
    {
      x: this.headCentreCoord.x + (this.width_of_1_centre * 1.2) / 2,
      y: this.headCentreCoord.y + this.height_of_1_centre,
    },
    {
      x: this.headCentreCoord.x - (this.width_of_1_centre * 1.2) / 2,
      y: this.headCentreCoord.y + this.height_of_1_centre,
    },
    { x: this.headCentreCoord.x, y: this.headCentreCoord.y },
  ];

  const headTextData = [
    {
      x: this.headCentreCoord.text64coordinates.x,
      y: this.headCentreCoord.text64coordinates.y,
      text: "64",
    },
    {
      x: this.headCentreCoord.text61coordinates.x,
      y: this.headCentreCoord.text61coordinates.y,
      text: "61",
    },
    {
      x: this.headCentreCoord.text63coordinates.x,
      y: this.headCentreCoord.text63coordinates.y,
      text: "63",
    },
  ];

  this.headCentreCoord.centreGroup = svg.append("g");
  this.drawGenerator(
    this.headCentreCoord.centreGroup,
    headCentreData,
    headTextData,
    fill,
    "#9400D3"
  );
};

DrawFormulaClass.prototype.drawAjnaCentre = function (fill) {
  const ajnaCentreData = [
    { x: this.ajnaCentreCoord.x, y: this.ajnaCentreCoord.y },
    {
      x: this.ajnaCentreCoord.x + (this.width_of_1_centre * 1.3) / 2,
      y: this.ajnaCentreCoord.y - this.height_of_1_centre,
    },
    {
      x: this.ajnaCentreCoord.x - (this.width_of_1_centre * 1.2) / 2,
      y: this.ajnaCentreCoord.y - this.height_of_1_centre,
    },
    { x: this.ajnaCentreCoord.x, y: this.ajnaCentreCoord.y },
  ];

  const ajnaTextData = [
    {
      x: this.ajnaCentreCoord.text47coordinates.x,
      y: this.ajnaCentreCoord.text47coordinates.y,
      text: "47",
    },
    {
      x: this.ajnaCentreCoord.text24coordinates.x,
      y: this.ajnaCentreCoord.text24coordinates.y,
      text: "24",
    },
    {
      x: this.ajnaCentreCoord.text4coordinates.x + this.styles.size / 4,
      y: this.ajnaCentreCoord.text4coordinates.y,
      text: `4`,
    },

    {
      x: this.ajnaCentreCoord.text17coordinates.x,
      y: this.ajnaCentreCoord.text17coordinates.y,
      text: "17",
    },
    {
      x: this.ajnaCentreCoord.text43coordinates.x,
      y: this.ajnaCentreCoord.text43coordinates.y,
      text: "43",
    },
    {
      x: this.ajnaCentreCoord.text11coordinates.x,
      y: this.ajnaCentreCoord.text11coordinates.y,
      text: "11",
    },
  ];

  this.ajnaCentreCoord.centreGroup = svg.append("g");
  this.drawGenerator(
    this.ajnaCentreCoord.centreGroup,
    ajnaCentreData,
    ajnaTextData,
    fill,
    "#0000FF"
  );
};

DrawFormulaClass.prototype.drawThroatCentre = function (fill) {
  const throatCentreData = [
    { x: this.throatCentreCoord.x, y: this.throatCentreCoord.y },
    {
      x: this.throatCentreCoord.x + this.width_of_1_centre * 1.1,
      y: this.throatCentreCoord.y,
    },
    {
      x: this.throatCentreCoord.x + this.width_of_1_centre * 1.1,
      y: this.throatCentreCoord.y + this.height_of_1_centre * 1.1,
    },
    {
      x: this.throatCentreCoord.x,
      y: this.throatCentreCoord.y + this.height_of_1_centre * 1.1,
    },
    { x: this.throatCentreCoord.x, y: this.throatCentreCoord.y },
  ];

  const throatTextData = [
    {
      x: this.throatCentreCoord.text62coordinates.x,
      y: this.throatCentreCoord.text62coordinates.y,
      text: "62",
    },
    {
      x: this.throatCentreCoord.text23coordinates.x,
      y: this.throatCentreCoord.text23coordinates.y,
      text: "23",
    },
    {
      x: this.throatCentreCoord.text56coordinates.x,
      y: this.throatCentreCoord.text56coordinates.y,
      text: `56`,
    },

    {
      x: this.throatCentreCoord.text31coordinates.x,
      y: this.throatCentreCoord.text31coordinates.y,
      text: "31",
    },
    {
      x: this.throatCentreCoord.text8coordinates.x + this.styles.size / 4,
      y: this.throatCentreCoord.text8coordinates.y,
      text: "8",
    },
    {
      x: this.throatCentreCoord.text33coordinates.x,
      y: this.throatCentreCoord.text33coordinates.y,
      text: "33",
    },

    {
      x: this.throatCentreCoord.text35coordinates.x,
      y: this.throatCentreCoord.text35coordinates.y,
      text: "35",
    },
    {
      x: this.throatCentreCoord.text12coordinates.x,
      y: this.throatCentreCoord.text12coordinates.y,
      text: "12",
    },
    {
      x: this.throatCentreCoord.text45coordinates.x,
      y: this.throatCentreCoord.text45coordinates.y,
      text: "45",
    },

    {
      x: this.throatCentreCoord.text16coordinates.x,
      y: this.throatCentreCoord.text16coordinates.y,
      text: "16",
    },
    {
      x: this.throatCentreCoord.text20coordinates.x,
      y: this.throatCentreCoord.text20coordinates.y,
      text: "20",
    },
  ];

  this.throatCentreCoord.centreGroup = svg.append("g");
  this.drawGenerator(
    this.throatCentreCoord.centreGroup,
    throatCentreData,
    throatTextData,
    fill,
    "#40E0D0"
  );
};

DrawFormulaClass.prototype.drawGCentre = function (fill) {
  const gCentreData = [
    { x: this.gCentreCoord.x, y: this.gCentreCoord.y },
    {
      x: this.gCentreCoord.x + (this.width_of_1_centre * 1.5) / 2,
      y: this.gCentreCoord.y + (this.height_of_1_centre * 1.3) / 2,
    },
    {
      x: this.gCentreCoord.x,
      y: this.gCentreCoord.y + this.height_of_1_centre * 1.3,
    },
    {
      x: this.gCentreCoord.x - (this.width_of_1_centre * 1.5) / 2,
      y: this.gCentreCoord.y + (this.height_of_1_centre * 1.3) / 2,
    },
    { x: this.gCentreCoord.x, y: this.gCentreCoord.y },
  ];

  const gTextData = [
    {
      x: this.gCentreCoord.text7coordinates.x + this.styles.size / 4,
      y: this.gCentreCoord.text7coordinates.y,
      text: "7",
    },
    {
      x: this.gCentreCoord.text1coordinates.x + this.styles.size / 4,
      y: this.gCentreCoord.text1coordinates.y,
      text: "1",
    },
    {
      x: this.gCentreCoord.text13coordinates.x,
      y: this.gCentreCoord.text13coordinates.y,
      text: `13`,
    },

    {
      x: this.gCentreCoord.text10coordinates.x,
      y: this.gCentreCoord.text10coordinates.y,
      text: "10",
    },
    {
      x: this.gCentreCoord.text25coordinates.x,
      y: this.gCentreCoord.text25coordinates.y,
      text: "25",
    },
    {
      x: this.gCentreCoord.text15coordinates.x,
      y: this.gCentreCoord.text15coordinates.y,
      text: "15",
    },

    {
      x: this.gCentreCoord.text46coordinates.x,
      y: this.gCentreCoord.text46coordinates.y,
      text: "46",
    },
    {
      x: this.gCentreCoord.text2coordinates.x + this.styles.size / 4,
      y: this.gCentreCoord.text2coordinates.y,
      text: "2",
    },
  ];

  this.gCentreCoord.centreGroup = svg.append("g");
  this.drawGenerator(
    this.gCentreCoord.centreGroup,
    gCentreData,
    gTextData,
    fill,
    "#64E811"
  );
};

DrawFormulaClass.prototype.drawSacralCentre = function (fill) {
  const sacralCentreData = [
    { x: this.sacralCentreCoord.x, y: this.sacralCentreCoord.y },
    {
      x: this.sacralCentreCoord.x + this.width_of_1_centre,
      y: this.sacralCentreCoord.y,
    },
    {
      x: this.sacralCentreCoord.x + this.width_of_1_centre,
      y: this.sacralCentreCoord.y + this.height_of_1_centre,
    },
    {
      x: this.sacralCentreCoord.x,
      y: this.sacralCentreCoord.y + this.height_of_1_centre,
    },
    { x: this.sacralCentreCoord.x, y: this.sacralCentreCoord.y },
  ];

  const sacralTextData = [
    {
      x: this.sacralCentreCoord.text5coordinates.x + this.styles.size / 4,
      y: this.sacralCentreCoord.text5coordinates.y,
      text: "5",
    },
    {
      x: this.sacralCentreCoord.text14coordinates.x,
      y: this.sacralCentreCoord.text14coordinates.y,
      text: "14",
    },
    {
      x: this.sacralCentreCoord.text29coordinates.x,
      y: this.sacralCentreCoord.text29coordinates.y,
      text: `29`,
    },

    {
      x: this.sacralCentreCoord.text42coordinates.x,
      y: this.sacralCentreCoord.text42coordinates.y,
      text: "42",
    },
    {
      x: this.sacralCentreCoord.text3coordinates.x + this.styles.size / 4,
      y: this.sacralCentreCoord.text3coordinates.y,
      text: "3",
    },
    {
      x: this.sacralCentreCoord.text9coordinates.x + this.styles.size / 4,
      y: this.sacralCentreCoord.text9coordinates.y,
      text: "9",
    },

    {
      x: this.sacralCentreCoord.text34coordinates.x,
      y: this.sacralCentreCoord.text34coordinates.y,
      text: "34",
    },
    {
      x: this.sacralCentreCoord.text27coordinates.x,
      y: this.sacralCentreCoord.text27coordinates.y,
      text: "27",
    },
    {
      x: this.sacralCentreCoord.text59coordinates.x,
      y: this.sacralCentreCoord.text59coordinates.y,
      text: "59",
    },
  ];

  this.sacralCentreCoord.centreGroup = svg.append("g");
  this.drawGenerator(
    this.sacralCentreCoord.centreGroup,
    sacralCentreData,
    sacralTextData,
    fill,
    "#F59713"
  );
};

DrawFormulaClass.prototype.drawRootCentre = function (fill) {
  const rootCentreData = [
    { x: this.rootCentreCoord.x, y: this.rootCentreCoord.y },
    {
      x: this.rootCentreCoord.x + this.width_of_1_centre,
      y: this.rootCentreCoord.y,
    },
    {
      x: this.rootCentreCoord.x + this.width_of_1_centre,
      y: this.rootCentreCoord.y + this.height_of_1_centre,
    },
    {
      x: this.rootCentreCoord.x,
      y: this.rootCentreCoord.y + this.height_of_1_centre,
    },
    { x: this.rootCentreCoord.x, y: this.rootCentreCoord.y },
  ];

  const rootTextData = [
    {
      x: this.rootCentreCoord.text53coordinates.x,
      y: this.rootCentreCoord.text53coordinates.y,
      text: "53",
    },
    {
      x: this.rootCentreCoord.text60coordinates.x,
      y: this.rootCentreCoord.text60coordinates.y,
      text: "60",
    },
    {
      x: this.rootCentreCoord.text52coordinates.x,
      y: this.rootCentreCoord.text52coordinates.y,
      text: `52`,
    },

    {
      x: this.rootCentreCoord.text54coordinates.x,
      y: this.rootCentreCoord.text54coordinates.y,
      text: "54",
    },
    {
      x: this.rootCentreCoord.text38coordinates.x,
      y: this.rootCentreCoord.text38coordinates.y,
      text: "38",
    },
    {
      x: this.rootCentreCoord.text58coordinates.x,
      y: this.rootCentreCoord.text58coordinates.y,
      text: "58",
    },

    {
      x: this.rootCentreCoord.text19coordinates.x,
      y: this.rootCentreCoord.text19coordinates.y,
      text: "19",
    },
    {
      x: this.rootCentreCoord.text39coordinates.x,
      y: this.rootCentreCoord.text39coordinates.y,
      text: "39",
    },
    {
      x: this.rootCentreCoord.text41coordinates.x,
      y: this.rootCentreCoord.text41coordinates.y,
      text: "41",
    },
  ];

  this.rootCentreCoord.centreGroup = svg.append("g");
  this.drawGenerator(
    this.rootCentreCoord.centreGroup,
    rootCentreData,
    rootTextData,
    fill,
    "#F20C0C"
  );
};

DrawFormulaClass.prototype.drawSpleenCentre = function (fill) {
  const spleenCentreData = [
    { x: this.spleenCentreCoord.x, y: this.spleenCentreCoord.y },
    {
      x: this.spleenCentreCoord.x + this.width_of_1_centre * 1.2,
      y: this.spleenCentreCoord.y + (this.height_of_1_centre * 1.5) / 2,
    },
    {
      x: this.spleenCentreCoord.x,
      y: this.spleenCentreCoord.y + this.height_of_1_centre * 1.5,
    },
    { x: this.spleenCentreCoord.x, y: this.spleenCentreCoord.y },
  ];

  const spleenTextData = [
    {
      x: this.spleenCentreCoord.text48coordinates.x,
      y: this.spleenCentreCoord.text48coordinates.y,
      text: "48",
    },
    {
      x: this.spleenCentreCoord.text57coordinates.x,
      y: this.spleenCentreCoord.text57coordinates.y,
      text: "57",
    },
    {
      x: this.spleenCentreCoord.text44coordinates.x,
      y: this.spleenCentreCoord.text44coordinates.y,
      text: "44",
    },

    {
      x: this.spleenCentreCoord.text50coordinates.x,
      y: this.spleenCentreCoord.text50coordinates.y,
      text: "50",
    },
    {
      x: this.spleenCentreCoord.text32coordinates.x,
      y: this.spleenCentreCoord.text32coordinates.y,
      text: "32",
    },
    {
      x: this.spleenCentreCoord.text28coordinates.x,
      y: this.spleenCentreCoord.text28coordinates.y,
      text: "28",
    },

    {
      x: this.spleenCentreCoord.text18coordinates.x,
      y: this.spleenCentreCoord.text18coordinates.y,
      text: "18",
    },
  ];

  this.spleenCentreCoord.centreGroup = svg.append("g");
  this.drawGenerator(
    this.spleenCentreCoord.centreGroup,
    spleenCentreData,
    spleenTextData,
    fill,
    "#F20C0C"
  );
};

DrawFormulaClass.prototype.drawEmoCentre = function (fill) {
  const emoCentreData = [
    { x: this.emoCentreCoord.x, y: this.emoCentreCoord.y },
    {
      x: this.emoCentreCoord.x - this.width_of_1_centre * 1.2,
      y: this.emoCentreCoord.y + (this.height_of_1_centre * 1.5) / 2,
    },
    {
      x: this.emoCentreCoord.x,
      y: this.emoCentreCoord.y + this.height_of_1_centre * 1.5,
    },
    { x: this.emoCentreCoord.x, y: this.emoCentreCoord.y },
  ];

  const emoTextData = [
    {
      x: this.emoCentreCoord.text6coordinates.x + this.styles.size / 4,
      y: this.emoCentreCoord.text6coordinates.y,
      text: "6",
    },
    {
      x: this.emoCentreCoord.text37coordinates.x,
      y: this.emoCentreCoord.text37coordinates.y,
      text: "37",
    },
    {
      x: this.emoCentreCoord.text22coordinates.x,
      y: this.emoCentreCoord.text22coordinates.y,
      text: "22",
    },

    {
      x: this.emoCentreCoord.text36coordinates.x,
      y: this.emoCentreCoord.text36coordinates.y,
      text: "36",
    },
    {
      x: this.emoCentreCoord.text49coordinates.x,
      y: this.emoCentreCoord.text49coordinates.y,
      text: "49",
    },
    {
      x: this.emoCentreCoord.text55coordinates.x,
      y: this.emoCentreCoord.text55coordinates.y,
      text: "55",
    },

    {
      x: this.emoCentreCoord.text30coordinates.x,
      y: this.emoCentreCoord.text30coordinates.y,
      text: "30",
    },
  ];

  this.emoCentreCoord.centreGroup = svg.append("g");
  this.drawGenerator(
    this.emoCentreCoord.centreGroup,
    emoCentreData,
    emoTextData,
    fill,
    "#F59713"
  );
};

DrawFormulaClass.prototype.drawEgoCentre = function (fill) {
  const egoCentreData = [
    { x: this.egoCentreCoord.x, y: this.egoCentreCoord.y },
    {
      x: this.egoCentreCoord.x + this.width_of_1_centre / 4,
      y: this.egoCentreCoord.y + this.height_of_1_centre / 1.1,
    },
    {
      x: this.egoCentreCoord.x - this.width_of_1_centre / 1.2,
      y: this.egoCentreCoord.y + this.height_of_1_centre / 1.5,
    },
    { x: this.egoCentreCoord.x, y: this.egoCentreCoord.y },
  ];

  const egoTextData = [
    {
      x: this.egoCentreCoord.text21coordinates.x,
      y: this.egoCentreCoord.text21coordinates.y,
      text: "21",
    },
    {
      x: this.egoCentreCoord.text51coordinates.x,
      y: this.egoCentreCoord.text51coordinates.y,
      text: "51",
    },
    {
      x: this.egoCentreCoord.text26coordinates.x,
      y: this.egoCentreCoord.text26coordinates.y,
      text: "26",
    },

    {
      x: this.egoCentreCoord.text40coordinates.x,
      y: this.egoCentreCoord.text40coordinates.y,
      text: "40",
    },
  ];

  this.egoCentreCoord.centreGroup = svg.append("g");
  this.drawGenerator(
    this.egoCentreCoord.centreGroup,
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

  this.drawHeadCentre("white");
  this.drawAjnaCentre("white");
  this.drawThroatCentre("white");
  this.drawGCentre("white");
  this.drawSacralCentre("white");
  this.drawRootCentre("white");
  this.drawSpleenCentre("white");
  this.drawEmoCentre("white");
  this.drawEgoCentre("white");
};

DrawFormulaClass.prototype.draw_body_text = function () {
  let pers_x = this.pers_x + 10;
  let pers_y = this.pers_y - 40;

  //Name
  appendText(svg, pers_x, pers_y, `Name: ${for_name}`);
  pers_y += 20;

  //PERSONALITY
  let [d_year, d_month, d_day, d_hour, d_minute, d_second] =
    formula.personality_time_UTC;
  let date_text = `${d_hour}:${d_minute}:${d_second} ${d_day}.${d_month}.${d_year}`;
  appendText(svg, pers_x, pers_y, `UTC: ${date_text}`);
  pers_y += 20;

  if (formula.personality_time_local) {
    [d_year, d_month, d_day, d_hour, d_minute, d_second] =
      formula.personality_time_local;
    date_text = `${d_hour}:${d_minute}:${d_second} ${d_day}.${d_month}.${d_year}`;
    appendText(svg, pers_x, pers_y, `Loc.: ${date_text}`);
  }
  pers_y += 20;

  let type_text = `${formula.type}`;
  appendText(svg, pers_x, pers_y, `Type: ${type_text}`);
  pers_y += 20;

  let profile_text = `${formula.profile}`;
  appendText(svg, pers_x, pers_y, `Profile: ${profile_text}`);
  pers_y += 20;

  let authority_text = `${formula.authority}`;
  appendText(svg, pers_x, pers_y, `Authority: ${authority_text}`);
  pers_y += 20;

  //   let definition_text = `${formula.definition}`;

  pers_y = this.pers_y - 40 + height - 60;
  let variables_text = `${formula.variable}`;
  appendText(svg, pers_x, pers_y, `Variable: ${variables_text}`);

  pers_y = this.pers_y - 40 + height - 60;
  pers_x = this.pers_x + width - 200;
  let cross_text = `${formula.cross[0]}/${formula.cross[1]}|${formula.cross[2]}/${formula.cross[3]}`;
  appendText(svg, pers_x, pers_y, `Inc.cross: ${cross_text}`);

  pers_x = this.x + width / 2 - 330;
  pers_y = this.pers_y + 100;

  let pers_sun_color = Math.ceil(formula.personality.sun.color);
  let pers_sun_tone = Math.ceil(formula.personality.sun.tone);

  let pers_node_color = Math.ceil(formula.personality.north_node.color);
  let pers_node_tone = Math.ceil(formula.personality.north_node.tone);

  appendText(
    svg,
    pers_x,
    pers_y,
    `P.Sun c/t: ${pers_sun_color}.${pers_sun_tone}`,
    "black"
  );
  pers_y += 20;
  let text_arr = motivation(pers_sun_color, pers_sun_tone);
  appendText(svg, pers_x, pers_y, `Motiv.:${text_arr[0]}`);
  pers_y += 20;
  appendText(svg, pers_x, pers_y, text_arr[1]);
  pers_y += 20;
  appendText(
    svg,
    pers_x,
    pers_y,
    `P.Nodes c/t: ${pers_node_color}.${pers_node_tone}`,
    "black"
  );
  pers_y += 20;
  // text_arr = this.perspective(pers_sun_color, pers_sun_tone);

  pers_y += 20;

  //DESIGN
  let des_x = this.pers_x + width - 200;
  let des_y = this.pers_y - 40;

  [d_year, d_month, d_day, d_hour, d_minute, d_second] =
    formula.design_time_UTC;
  date_text = `${d_hour}:${d_minute}:${d_second}`;
  appendText(svg, des_x, des_y, `D.UTC: ${date_text}`);
  des_y += 20;
  date_text = `${d_day}.${d_month}.${d_year}`;
  appendText(svg, des_x, des_y, `D.Date: ${date_text}`);

  des_x = this.pers_x + width - 500;
  des_y = this.pers_y - 40;
  appendText(svg, des_x, des_y, `eps_per: ${formula.eps_pers.toFixed(5)}`);
  des_y += 20;
  appendText(svg, des_x, des_y, `eps_des: ${formula.eps_des.toFixed(5)}`);

  des_x = this.pers_x + 190;
  des_y = this.pers_y + 100;

  let des_sun_color = Math.ceil(formula.design.sun.color);
  let des_sun_tone = Math.ceil(formula.design.sun.tone);

  let des_node_color = Math.ceil(formula.design.north_node.color);
  let des_node_tone = Math.ceil(formula.design.north_node.tone);

  appendText(
    svg,
    des_x,
    des_y,
    `D.Sun c/t: ${des_sun_color}.${des_sun_tone}`,
    "red"
  );
  des_y += 20;
  text_arr = nutrition(des_sun_color, des_sun_tone);
  appendText(svg, des_x, des_y, text_arr[0]);
  des_y += 20;
  appendText(svg, des_x, des_y, text_arr[1]);
  des_y += 20;
  appendText(svg, des_x, des_y, text_arr[2]);
  des_y += 20;
  appendText(
    svg,
    des_x,
    des_y,
    `D.Nodes c/t: ${des_node_color}.${des_node_tone}`,
    "red"
  );
  des_y += 20;
  appendText(
    svg,
    des_x,
    des_y,
    `Env.: ${environment(des_node_color, des_node_tone)}`
  );
};

//PERSONALITY texts on screen
DrawFormulaClass.prototype.draw_pers_text = function () {
  let planet_text = "";

  let pers_x = this.x + width / 2 - 10;
  let pers_y = this.pers_y + 100;

  appendText(svg, pers_x, pers_y, `Personality:`, "black", "end");
  pers_y += 30;

  planet_text = `Sun: ${formula.personality.sun.hex}.${Math.ceil(
    formula.personality.sun.line
  )}-.${Math.ceil(formula.personality.sun.color)}-.${Math.ceil(
    formula.personality.sun.tone
  )}-.${Math.ceil(formula.personality.sun.base)}-.${
    formula.personality.sun.direction
  }${formula.personality.sun.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Earth: ${formula.personality.earth.hex}.${Math.ceil(
    formula.personality.earth.line
  )}-.${Math.ceil(formula.personality.earth.color)}-.${Math.ceil(
    formula.personality.earth.tone
  )}-.${Math.ceil(formula.personality.earth.base)}-.${
    formula.personality.earth.direction
  }${formula.personality.earth.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Moon: ${formula.personality.moon.hex}.${Math.ceil(
    formula.personality.moon.line
  )}-.${Math.ceil(formula.personality.moon.color)}-.${Math.ceil(
    formula.personality.moon.tone
  )}-.${Math.ceil(formula.personality.moon.base)}-.${
    formula.personality.moon.direction
  }${formula.personality.moon.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `N.Node ${formula.personality.north_node.hex}.${Math.ceil(
    formula.personality.north_node.line
  )}-.${Math.ceil(formula.personality.north_node.color)}-.${Math.ceil(
    formula.personality.north_node.tone
  )}-.${Math.ceil(formula.personality.north_node.base)}-.${
    formula.personality.north_node.direction
  }${formula.personality.north_node.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `S.Node: ${formula.personality.south_node.hex}.${Math.ceil(
    formula.personality.south_node.line
  )}-.${Math.ceil(formula.personality.south_node.color)}-.${Math.ceil(
    formula.personality.south_node.tone
  )}-.${Math.ceil(formula.personality.south_node.base)}-.${
    formula.personality.south_node.direction
  }${formula.personality.south_node.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Mercury: ${formula.personality.mercury.hex}.${Math.ceil(
    formula.personality.mercury.line
  )}-.${Math.ceil(formula.personality.mercury.color)}-.${Math.ceil(
    formula.personality.mercury.tone
  )}-.${Math.ceil(formula.personality.mercury.base)}-.${
    formula.personality.mercury.direction
  }${formula.personality.mercury.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Venus: ${formula.personality.venus.hex}.${Math.ceil(
    formula.personality.venus.line
  )}-.${Math.ceil(formula.personality.venus.color)}-.${Math.ceil(
    formula.personality.venus.tone
  )}-.${Math.ceil(formula.personality.venus.base)}-.${
    formula.personality.venus.direction
  }${formula.personality.venus.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Mars: ${formula.personality.mars.hex}.${Math.ceil(
    formula.personality.mars.line
  )}-.${Math.ceil(formula.personality.mars.color)}-.${Math.ceil(
    formula.personality.mars.tone
  )}-.${Math.ceil(formula.personality.mars.base)}-.${
    formula.personality.mars.direction
  }${formula.personality.mars.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Jupiter: ${formula.personality.jupiter.hex}.${Math.ceil(
    formula.personality.jupiter.line
  )}-.${Math.ceil(formula.personality.jupiter.color)}-.${Math.ceil(
    formula.personality.jupiter.tone
  )}-.${Math.ceil(formula.personality.jupiter.base)}-.${
    formula.personality.jupiter.direction
  }${formula.personality.jupiter.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Saturn: ${formula.personality.saturn.hex}.${Math.ceil(
    formula.personality.saturn.line
  )}-.${Math.ceil(formula.personality.saturn.color)}-.${Math.ceil(
    formula.personality.saturn.tone
  )}-.${Math.ceil(formula.personality.saturn.base)}-.${
    formula.personality.saturn.direction
  }${formula.personality.saturn.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Uranus: ${formula.personality.uranus.hex}.${Math.ceil(
    formula.personality.uranus.line
  )}-.${Math.ceil(formula.personality.uranus.color)}-.${Math.ceil(
    formula.personality.uranus.tone
  )}-.${Math.ceil(formula.personality.uranus.base)}-.${
    formula.personality.uranus.direction
  }${formula.personality.uranus.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Neptune: ${formula.personality.neptune.hex}.${Math.ceil(
    formula.personality.neptune.line
  )}-.${Math.ceil(formula.personality.neptune.color)}-.${Math.ceil(
    formula.personality.neptune.tone
  )}-.${Math.ceil(formula.personality.neptune.base)}-.${
    formula.personality.neptune.direction
  }${formula.personality.neptune.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Pluto: ${formula.personality.pluto.hex}.${Math.ceil(
    formula.personality.pluto.line
  )}-.${Math.ceil(formula.personality.pluto.color)}-.${Math.ceil(
    formula.personality.pluto.tone
  )}-.${Math.ceil(formula.personality.pluto.base)}-.${
    formula.personality.pluto.direction
  }${formula.personality.pluto.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;
};

//PERSONALITY texts on screen + transference
DrawFormulaClass.prototype.draw_pers_text_extended = function () {
  let pers_x = this.x + width / 2 - 330;
  let pers_y = this.pers_y + 100;

  let pers_sun_color = Math.ceil(formula.personality.sun.color);
  let pers_sun_tone = Math.ceil(formula.personality.sun.tone);

  let pers_node_color = Math.ceil(formula.personality.north_node.color);
  let pers_node_tone = Math.ceil(formula.personality.north_node.tone);

  appendText(
    svg,
    pers_x,
    pers_y,
    `P.Sun c/t: ${pers_sun_color}.${pers_sun_tone}`,
    "black"
  );
  pers_y += 20;
  let text_arr = motivation(pers_sun_color, pers_sun_tone);
  appendText(svg, pers_x, pers_y, `Motiv.:${text_arr[0]}`);
  pers_y += 20;
  appendText(svg, pers_x, pers_y, text_arr[1]);
  pers_y += 20;
  appendText(
    svg,
    pers_x,
    pers_y,
    `P.Nodes c/t: ${pers_node_color}.${pers_node_tone}`,
    "black"
  );
  pers_y += 20;
  // text_arr = this.perspective(pers_sun_color, pers_sun_tone);

  pers_y += 20;

  //add transference
  pers_x = this.pers_x + 10;
  pers_y = this.pers_y + 100;

  pers_sun_color = pers_sun_color > 3 ? pers_sun_color - 3 : pers_sun_color + 3;
  pers_sun_tone = pers_sun_tone > 3 ? pers_sun_tone - 3 : pers_sun_tone + 3;
  pers_node_color =
    pers_node_color > 3 ? pers_node_color - 3 : pers_node_color + 3;
  pers_node_tone = pers_node_tone > 3 ? pers_node_tone - 3 : pers_node_tone + 3;

  appendText(
    svg,
    pers_x,
    pers_y,
    `P.Sun transference: ${pers_sun_color}.${pers_sun_tone}`,
    "black"
  );
  pers_y += 20;
  text_arr = motivation(pers_sun_color, pers_sun_tone);
  appendText(svg, pers_x, pers_y, `Motiv.transference:${text_arr[0]}`);
  pers_y += 20;
  appendText(svg, pers_x, pers_y, text_arr[1]);
  pers_y += 20;
  appendText(
    svg,
    pers_x,
    pers_y,
    `P.Nodes transference: ${pers_node_color}.${pers_node_tone}`,
    "black"
  );
  pers_y += 20;
  // text_arr = this.perspective(pers_sun_color, pers_sun_tone);

  pers_y += 20;

  this.draw_pers_text();
};

//DESIGN texts on screen
DrawFormulaClass.prototype.draw_des_text = function () {
  //DESIGN
  let des_x = this.pers_x + 165;
  let des_y = this.pers_y + 100;

  let planet_text = "";

  appendText(svg, des_x, des_y, `Design:`, "red", "end");
  des_y += 30;

  planet_text = `Sun: ${formula.design.sun.hex}.${Math.ceil(
    formula.design.sun.line
  )}-.${Math.ceil(formula.design.sun.color)}-.${Math.ceil(
    formula.design.sun.tone
  )}-.${Math.ceil(formula.design.sun.base)}-.${formula.design.sun.direction}${
    formula.design.sun.power
  }`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Earth: ${formula.design.earth.hex}.${Math.ceil(
    formula.design.earth.line
  )}-.${Math.ceil(formula.design.earth.color)}-.${Math.ceil(
    formula.design.earth.tone
  )}-.${Math.ceil(formula.design.earth.base)}-.${
    formula.design.earth.direction
  }${formula.design.earth.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Moon: ${formula.design.moon.hex}.${Math.ceil(
    formula.design.moon.line
  )}-.${Math.ceil(formula.design.moon.color)}-.${Math.ceil(
    formula.design.moon.tone
  )}-.${Math.ceil(formula.design.moon.base)}-.${formula.design.moon.direction}${
    formula.design.moon.power
  }`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `N.Node ${formula.design.north_node.hex}.${Math.ceil(
    formula.design.north_node.line
  )}-.${Math.ceil(formula.design.north_node.color)}-.${Math.ceil(
    formula.design.north_node.tone
  )}-.${Math.ceil(formula.design.north_node.base)}-.${
    formula.design.north_node.direction
  }${formula.design.north_node.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `S.Node: ${formula.design.south_node.hex}.${Math.ceil(
    formula.design.south_node.line
  )}-.${Math.ceil(formula.design.south_node.color)}-.${Math.ceil(
    formula.design.south_node.tone
  )}-.${Math.ceil(formula.design.south_node.base)}-.${
    formula.design.south_node.direction
  }${formula.design.south_node.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Mercury: ${formula.design.mercury.hex}.${Math.ceil(
    formula.design.mercury.line
  )}-.${Math.ceil(formula.design.mercury.color)}-.${Math.ceil(
    formula.design.mercury.tone
  )}-.${Math.ceil(formula.design.mercury.base)}-.${
    formula.design.mercury.direction
  }${formula.design.mercury.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Venus: ${formula.design.venus.hex}.${Math.ceil(
    formula.design.venus.line
  )}-.${Math.ceil(formula.design.venus.color)}-.${Math.ceil(
    formula.design.venus.tone
  )}-.${Math.ceil(formula.design.venus.base)}-.${
    formula.design.venus.direction
  }${formula.design.venus.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Mars: ${formula.design.mars.hex}.${Math.ceil(
    formula.design.mars.line
  )}-.${Math.ceil(formula.design.mars.color)}-.${Math.ceil(
    formula.design.mars.tone
  )}-.${Math.ceil(formula.design.mars.base)}-.${formula.design.mars.direction}${
    formula.design.mars.power
  }`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Jupiter: ${formula.design.jupiter.hex}.${Math.ceil(
    formula.design.jupiter.line
  )}-.${Math.ceil(formula.design.jupiter.color)}-.${Math.ceil(
    formula.design.jupiter.tone
  )}-.${Math.ceil(formula.design.jupiter.base)}-.${
    formula.design.jupiter.direction
  }${formula.design.jupiter.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Saturn: ${formula.design.saturn.hex}.${Math.ceil(
    formula.design.saturn.line
  )}-.${Math.ceil(formula.design.saturn.color)}-.${Math.ceil(
    formula.design.saturn.tone
  )}-.${Math.ceil(formula.design.saturn.base)}-.${
    formula.design.saturn.direction
  }${formula.design.saturn.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Uranus: ${formula.design.uranus.hex}.${Math.ceil(
    formula.design.uranus.line
  )}-.${Math.ceil(formula.design.uranus.color)}-.${Math.ceil(
    formula.design.uranus.tone
  )}-.${Math.ceil(formula.design.uranus.base)}-.${
    formula.design.uranus.direction
  }${formula.design.uranus.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Neptune: ${formula.design.neptune.hex}.${Math.ceil(
    formula.design.neptune.line
  )}-.${Math.ceil(formula.design.neptune.color)}-.${Math.ceil(
    formula.design.neptune.tone
  )}-.${Math.ceil(formula.design.neptune.base)}-.${
    formula.design.neptune.direction
  }${formula.design.neptune.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Pluto: ${formula.design.pluto.hex}.${Math.ceil(
    formula.design.pluto.line
  )}-.${Math.ceil(formula.design.pluto.color)}-.${Math.ceil(
    formula.design.pluto.tone
  )}-.${Math.ceil(formula.design.pluto.base)}-.${
    formula.design.pluto.direction
  }${formula.design.pluto.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;
};

//DESIGN texts on screen + nutrition + environment + transference
DrawFormulaClass.prototype.draw_des_text_extended = function () {
  // дублируем питание и пишем переносы
  let des_x = this.pers_x + 190;
  let des_y = this.pers_y + 100;

  let des_sun_color = Math.ceil(formula.design.sun.color);
  let des_sun_tone = Math.ceil(formula.design.sun.tone);

  let des_node_color = Math.ceil(formula.design.north_node.color);
  let des_node_tone = Math.ceil(formula.design.north_node.tone);

  appendText(
    svg,
    des_x,
    des_y,
    `D.Sun c/t: ${des_sun_color}.${des_sun_tone}`,
    "red"
  );
  des_y += 20;
  let text_arr = nutrition(des_sun_color, des_sun_tone);
  appendText(svg, des_x, des_y, text_arr[0]);
  des_y += 20;
  appendText(svg, des_x, des_y, text_arr[1]);
  des_y += 20;
  appendText(svg, des_x, des_y, text_arr[2]);
  des_y += 20;
  appendText(
    svg,
    des_x,
    des_y,
    `D.Nodes c/t: ${des_node_color}.${des_node_tone}`,
    "red"
  );
  des_y += 20;
  appendText(
    svg,
    des_x,
    des_y,
    `Env.: ${environment(des_node_color, des_node_tone)}`
  );

  //add transference
  des_x = this.pers_x + width - 10;
  des_y = this.pers_y + 100;

  des_sun_color = des_sun_color > 3 ? des_sun_color - 3 : des_sun_color + 3;
  des_sun_tone = des_sun_tone > 3 ? des_sun_tone - 3 : des_sun_tone + 3;

  des_node_color = des_node_color > 3 ? des_node_color - 3 : des_node_color + 3;
  des_node_tone = des_node_tone > 3 ? des_node_tone - 3 : des_node_tone + 3;

  appendText(
    svg,
    des_x,
    des_y,
    `D.Sun transference: ${des_sun_color}.${des_sun_tone}`,
    "red",
    "end"
  );
  des_y += 20;

  text_arr = nutrition(des_sun_color, des_sun_tone);
  appendText(svg, des_x, des_y, text_arr[0], "black", "end");
  des_y += 20;
  appendText(svg, des_x, des_y, text_arr[1], "black", "end");
  des_y += 20;
  appendText(svg, des_x, des_y, text_arr[2], "black", "end");
  des_y += 20;

  appendText(
    svg,
    des_x,
    des_y,
    `D.Nodes transference: ${des_node_color}.${des_node_tone}`,
    "red",
    "end"
  );
  des_y += 20;
  appendText(
    svg,
    des_x,
    des_y,
    `Env. transference: ${environment(des_node_color, des_node_tone)}`,
    "black",
    "end"
  );

  this.draw_des_text();
};

//V2 2024
DrawFormulaClass.prototype.drawFormulaV2 = function (graph_type) {
  this.init();
  this.drawWhiteFormula();

  this.x = width / 2;
  this.y = (height / 100) * 10;

  switch (graph_type) {
    case "bodygraph":
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

    case "numerology":
      drawNumerology(svg, this.x, this.y, width, height, formula);
      break;

    default:
      console.log(`Sorry, some error in drawFormulaV2.`);
  }

  //рисуем Формулу Души
  //   this.draw_Fd(formula.personality, formula.per_centers);

  // рисуем Формулу Тела
  //   this.draw_Fd(formula.design, formula.des_centers);

  //console.log(formula);

  //включаем кнопку на сохранение фото
  //document.getElementById("img_button").disabled = false;
  //document.getElementById("calc_button").disabled = true;
};

DrawFormulaClass.prototype.draw_Body = function () {
  //console.log(formula);
  //console.log(for_data);
  //console.log(formula.centers_connections);

  this.draw_pers_text();
  this.draw_des_text();
  this.draw_body_text();

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

  delete formula.design.north_node_swe;
  delete formula.design.south_node_swe;
  delete formula.personality.north_node_swe;
  delete formula.personality.south_node_swe;

  for (let key in formula.design) {
    gates[formula.design[key].hex] = "red";
  }

  for (let key in formula.personality) {
    if (
      gates[formula.personality[key].hex] === "red" ||
      gates[formula.personality[key].hex] === "both"
    ) {
      gates[formula.personality[key].hex] = "both";
    } else {
      gates[formula.personality[key].hex] = "black";
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

  centres.head ? this.drawHeadCentre() : this.drawHeadCentre("white");
  centres.ajna ? this.drawAjnaCentre() : this.drawAjnaCentre("white");
  centres.throat ? this.drawThroatCentre() : this.drawThroatCentre("white");
  centres.g ? this.drawGCentre() : this.drawGCentre("white");
  centres.sacral ? this.drawSacralCentre() : this.drawSacralCentre("white");
  centres.root ? this.drawRootCentre() : this.drawRootCentre("white");
  centres.spleen ? this.drawSpleenCentre() : this.drawSpleenCentre("white");
  centres.ego ? this.drawEgoCentre() : this.drawEgoCentre("white");
  centres.emo ? this.drawEmoCentre() : this.drawEmoCentre("white");

  //document.getElementById("img_button").disabled = false;
};

DrawFormulaClass.prototype.draw_Pers = function () {
  //this.draw_pers_text();
  this.draw_pers_text_extended();

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

  delete formula.design.north_node_swe;
  delete formula.design.south_node_swe;
  delete formula.personality.north_node_swe;
  delete formula.personality.south_node_swe;

  for (let key in formula.personality) {
    gates[formula.personality[key].hex] = "black";
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

  centres.head ? this.drawHeadCentre() : this.drawHeadCentre("white");
  centres.ajna ? this.drawAjnaCentre() : this.drawAjnaCentre("white");
  centres.throat ? this.drawThroatCentre() : this.drawThroatCentre("white");
  centres.g ? this.drawGCentre() : this.drawGCentre("white");
  centres.sacral ? this.drawSacralCentre() : this.drawSacralCentre("white");
  centres.root ? this.drawRootCentre() : this.drawRootCentre("white");
  centres.spleen ? this.drawSpleenCentre() : this.drawSpleenCentre("white");
  centres.ego ? this.drawEgoCentre() : this.drawEgoCentre("white");
  centres.emo ? this.drawEmoCentre() : this.drawEmoCentre("white");

  //document.getElementById("img_button").disabled = false;
};

DrawFormulaClass.prototype.draw_Des = function () {
  //this.draw_des_text();
  this.draw_des_text_extended();

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

  delete formula.design.north_node_swe;
  delete formula.design.south_node_swe;
  delete formula.personality.north_node_swe;
  delete formula.personality.south_node_swe;

  for (let key in formula.design) {
    gates[formula.design[key].hex] = "red";
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

  centres.head ? this.drawHeadCentre() : this.drawHeadCentre("white");
  centres.ajna ? this.drawAjnaCentre() : this.drawAjnaCentre("white");
  centres.throat ? this.drawThroatCentre() : this.drawThroatCentre("white");
  centres.g ? this.drawGCentre() : this.drawGCentre("white");
  centres.sacral ? this.drawSacralCentre() : this.drawSacralCentre("white");
  centres.root ? this.drawRootCentre() : this.drawRootCentre("white");
  centres.spleen ? this.drawSpleenCentre() : this.drawSpleenCentre("white");
  centres.ego ? this.drawEgoCentre() : this.drawEgoCentre("white");
  centres.emo ? this.drawEmoCentre() : this.drawEmoCentre("white");

  //document.getElementById("img_button").disabled = false;
};
