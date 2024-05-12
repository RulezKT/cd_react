import * as d3 from "d3";

const verText = `Zero Design, ver.: 0.21, created by R.R.`;

//массив с названиями планет в том порядке, в котором они находятся в файле de430.bsp
//+после 11 номера идут дополнительные планеты
const planets_arr = [
  "ssb",
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "pluto",
  "sun",
  "moon",
  "north_node",
  "south_node",
  "hiron",
];

let formula = NaN; ///!!!
let transits = NaN;
// let for_data = NaN;
let for_name = "";

let full_width;
let full_height;

let width;
let height;

/*
const svg = d3.select("#formula_chart").append("svg")
    .attr('width', width)
    .attr('height', height);
*/

let svg;

export function DrawFormulaClass(
  data_formula,
  view_width,
  view_height,
  view_full_width,
  view_full_height
) {
  width = view_width;
  height = view_height;
  full_width = view_full_width;
  full_height = view_full_height;

  formula = data_formula;

  svg = d3
    .select("#formula_chart")
    .append("svg")
    .attr("width", full_width)
    .attr("height", full_height);

  svg.append("g").attr("transform", "translate(" + 0 + "," + 0 + ")");

  //окантовка, чтобы видеть полный квадрат формулы
  svg
    .append("rect")
    .attr("height", `${full_width}`)
    .attr("width", `${full_height}`)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "#D3D3D3")
    .attr("stroke", "red");

  //окантовка, чтобы видеть квадрат общей формулы
  svg
    .append("rect")
    .attr("height", `${height}`)
    .attr("width", `${width}`)
    .attr("x", width)
    .attr("y", 0)
    .attr("fill", "#D3D3D3")
    .attr("stroke", "#5367d3");

  //окантовка, чтобы видеть квадрат черного
  svg
    .append("rect")
    .attr("height", `${height}`)
    .attr("width", `${width}`)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "#D3D3D3")
    .attr("stroke", "#000000");

  //окантовка, чтобы видеть квадрат красного
  svg
    .append("rect")
    .attr("height", `${height}`)
    .attr("width", `${width}`)
    .attr("x", width * 2)
    .attr("y", 0)
    .attr("fill", "#D3D3D3")
    .attr("stroke", "red");

  svg
    .append("text")
    .attr("x", `${full_width - 300}`)
    .attr("y", `${full_height - 10}`)
    .text(verText)
    .attr("font-family", "futura, sans-serif")
    .attr("font-size", 14)
    .attr("font-weight", 700)
    .attr("fill", "black")
    .attr("text-anchor", "start");

  this.lineFunction = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);

  this.radius = 25;

  //x - посередине
  this.x = width / 2;

  //делаем сверху отступ на 10%
  this.y = (height / 100) * 10;

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

  //координаты для текста
  this.pers_x = this.x - width / 2;
  this.pers_y = 0;

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

DrawFormulaClass.prototype.draw_mercury = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  y += 15;

  let points = [];

  radius /= 2;

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("stroke", color)
    .style("fill", "none");

  points = [
    { x: x, y: y + radius },
    { x: x, y: y + radius + radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x - radius / 1.5, y: y + radius + Math.trunc((radius * 1.5) / 2) },
    { x: x + radius / 1.5, y: y + radius + Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [{ x: x, y: y - radius }];

  let arc = d3.arc();
  //полукруг
  svg_planet
    .append("path")
    .attr(
      "transform",
      "translate(" + [points[0].x, points[0].y - Math.trunc(radius / 1.5)] + ")"
    )
    .attr("stroke", color)
    .attr(
      "d",
      arc({
        innerRadius: Math.trunc(radius / 1.5) - 1,
        outerRadius: Math.trunc(radius / 1.5),
        startAngle: -Math.PI / 2,
        endAngle: -(Math.PI + Math.PI / 2),
      })
    );
};
DrawFormulaClass.prototype.draw_venus = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  y += 15;

  radius /= 2;

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("stroke", color)
    .style("fill", "none");

  points = [
    { x: x, y: y + radius },
    { x: x, y: y + radius + radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x - radius / 1.5, y: y + radius + Math.trunc((radius * 1.5) / 2) },
    { x: x + radius / 1.5, y: y + radius + Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");
};
DrawFormulaClass.prototype.draw_earth = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  y += 20;
  radius -= 3;

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("stroke", color)
    .style("fill", "none");

  points = [
    { x: x - radius, y: y },
    { x: x + radius, y: y },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x, y: y + radius },
    { x: x, y: y - radius },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");
};
DrawFormulaClass.prototype.draw_mars = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  y += 20;

  radius /= 2;

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("stroke", color)
    .style("fill", "none");

  points = [
    { x: x + radius - 5, y: y - radius / 2 },
    { x: x + radius * 3, y: y - radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x + radius * 3, y: y - radius * 1.5 },
    { x: x + radius * 2, y: y - radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x + radius * 3, y: y - radius * 1.5 },
    { x: x + radius * 3, y: y - radius / 2 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");
};
DrawFormulaClass.prototype.draw_jupiter = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  points = [
    { x: x, y: y + radius },
    { x: x, y: y + radius + radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x - radius, y: y + radius + Math.trunc((radius * 1.5) / 2) },
    { x: x + radius / 2, y: y + radius + Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [{ x: x, y: y }];

  let arc = d3.arc();

  //полукруг
  svg_planet
    .append("path")
    .attr(
      "transform",
      "translate(" +
        [points[0].x - radius, points[0].y + Math.trunc(radius)] +
        ")"
    )
    .attr("stroke", color)
    .attr("fill", "none")
    .attr(
      "d",
      arc({
        innerRadius: radius / 1.5 - 1,
        outerRadius: radius / 1.5,
        startAngle: -Math.PI,
        endAngle: -Math.PI * 2,
      })
    );
};
DrawFormulaClass.prototype.draw_saturn = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  y -= 15;

  points = [
    { x: x, y: y + radius },
    { x: x, y: y + radius + radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x - radius / 2, y: y + radius + Math.trunc((radius * 1.5) / 2) },
    { x: x + radius / 2, y: y + radius + Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [{ x: x + radius, y: y + radius + Math.trunc((radius * 1.5) / 2) }];

  let arc = d3.arc();

  //полукруг
  svg_planet
    .append("path")
    .attr(
      "transform",
      "translate(" +
        [points[0].x - radius, points[0].y + Math.trunc(radius)] +
        ")"
    )
    .attr("stroke", color)
    .attr("fill", "none")
    .attr(
      "d",
      arc({
        innerRadius: radius / 1.5 - 1,
        outerRadius: radius / 1.5,
        startAngle: -Math.PI,
        endAngle: -Math.PI * 2,
      })
    );
};
DrawFormulaClass.prototype.draw_neptune = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  y += 23;

  let points = [];

  points = [
    { x: x, y: y - radius },
    { x: x, y: y - radius + radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [{ x: x, y: y - radius }];

  let arc = d3.arc();
  //полукруг
  svg_planet
    .append("path")
    .attr("transform", "translate(" + [points[0].x, points[0].y] + ")")
    .attr("stroke", color)
    .attr(
      "d",
      arc({
        innerRadius: Math.trunc(radius / 1.5) - 1,
        outerRadius: Math.trunc(radius / 1.5),
        startAngle: -Math.PI / 2,
        endAngle: -(Math.PI + Math.PI / 2),
      })
    );
};
DrawFormulaClass.prototype.draw_uranus = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  y += 23;

  radius /= 2;

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("stroke", color)
    .style("fill", "none");

  points = [
    { x: x, y: y - radius },
    { x: x, y: y - radius - radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x - radius / 1.5, y: y - radius - Math.trunc((radius * 1.5) / 2) },
    { x: x + radius / 1.5, y: y - radius - Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x - radius / 1.5, y: y - radius },
    { x: x - radius / 1.5, y: y - radius - 2 * Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x + radius / 1.5, y: y - radius },
    { x: x + radius / 1.5, y: y - radius - 2 * Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");
};
DrawFormulaClass.prototype.draw_pluto = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y + radius - radius / 3 - 3)
    .attr("r", radius / 3)
    .attr("stroke", color)
    .style("fill", "none");

  points = [
    { x: x, y: y + radius },
    { x: x, y: y + radius + radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x - radius / 1.5, y: y + radius + Math.trunc((radius * 1.5) / 2) },
    { x: x + radius / 1.5, y: y + radius + Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [{ x: x, y: y + radius }];

  let arc = d3.arc();
  //полукруг
  svg_planet
    .append("path")
    .attr(
      "transform",
      "translate(" + [points[0].x, points[0].y - Math.trunc(radius / 1.5)] + ")"
    )
    .attr("stroke", color)
    .attr(
      "d",
      arc({
        innerRadius: Math.trunc(radius / 1.5) - 1,
        outerRadius: Math.trunc(radius / 1.5),
        startAngle: -Math.PI / 2,
        endAngle: -(Math.PI + Math.PI / 2),
      })
    );
};
DrawFormulaClass.prototype.draw_sun = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  //   let points = [];

  y += 20;
  radius -= 3;

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("stroke", color)
    .style("fill", "none");

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 1)
    .attr("stroke", color)
    .style("fill", color);
};
DrawFormulaClass.prototype.draw_moon = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  y += 20;
  radius -= 3;

  points = [{ x: x, y: y }];

  let arc = d3.arc();

  //полукруг
  svg_planet
    .append("path")
    .attr("transform", "translate(" + [points[0].x, points[0].y] + ")")
    .attr("stroke", color)
    .attr("fill", "none")
    .attr(
      "d",
      arc({
        innerRadius: radius - 5,
        outerRadius: radius,
        startAngle: -Math.PI,
        endAngle: -Math.PI * 2,
      })
    );
};
DrawFormulaClass.prototype.draw_north_node = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  y += 15;

  let points = [];

  svg_planet
    .append("circle")
    .attr("cx", x - radius / 1.5)
    .attr("cy", y + radius - radius / 2)
    .attr("r", radius / 3)
    .attr("stroke", color)
    .style("fill", "none");

  svg_planet
    .append("circle")
    .attr("cx", x + radius / 1.5)
    .attr("cy", y + radius - radius / 2)
    .attr("r", radius / 3)
    .attr("stroke", color)
    .style("fill", "none");

  points = [{ x: x, y: y + radius }];

  let arc = d3.arc();
  //полукруг
  svg_planet
    .append("path")
    .attr(
      "transform",
      "translate(" + [points[0].x, points[0].y - Math.trunc(radius)] + ")"
    )
    .attr("stroke", color)
    .attr(
      "d",
      arc({
        innerRadius: Math.trunc(radius / 1.5) - 1,
        outerRadius: Math.trunc(radius / 1.5),
        startAngle: -Math.PI / 2,
        endAngle: Math.PI / 2,
      })
    );
};
DrawFormulaClass.prototype.draw_south_node = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  y += 20;

  svg_planet
    .append("circle")
    .attr("cx", x - radius / 1.5)
    .attr("cy", y + radius - radius * 1.5)
    .attr("r", radius / 3)
    .attr("stroke", color)
    .style("fill", "none");

  svg_planet
    .append("circle")
    .attr("cx", x + radius / 1.5)
    .attr("cy", y + radius - radius * 1.5)
    .attr("r", radius / 3)
    .attr("stroke", color)
    .style("fill", "none");

  points = [{ x: x, y: y + radius }];

  let arc = d3.arc();
  //полукруг
  svg_planet
    .append("path")
    .attr(
      "transform",
      "translate(" + [points[0].x, points[0].y - Math.trunc(radius)] + ")"
    )
    .attr("stroke", color)
    .attr(
      "d",
      arc({
        innerRadius: Math.trunc(radius / 1.5) - 1,
        outerRadius: Math.trunc(radius / 1.5),
        startAngle: -Math.PI / 2,
        endAngle: -(Math.PI + Math.PI / 2),
      })
    );
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

DrawFormulaClass.prototype.appendText = function (
  x,
  y,
  text,
  color,
  text_anchor,
  size
) {
  svg
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .text(text)
    .attr("font-family", "futura, sans-serif")
    .attr("font-size", size || 14)
    .attr("font-weight", 700)
    .attr("fill", color || "black")
    .attr("text-anchor", text_anchor || "start");
};

//Здесь используется техника разделения текста тире для определения разного цвета для разных данных
DrawFormulaClass.prototype.appendTextPlanets = function (
  x,
  y,
  text,
  color,
  text_anchor
) {
  svg
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .text(text.split("-")[0])
    .attr("font-family", "futura, sans-serif")
    .attr("font-size", 14)
    .attr("font-weight", 700)
    .attr("fill", color || "black")
    .attr("text-anchor", text_anchor || "start")

    .append("tspan")
    .style("fill", "blue")
    .text(text.split("-")[1])
    .attr("font-size", 10)

    .append("tspan")
    .style("fill", "green")
    .text(text.split("-")[2])
    .attr("font-size", 8)
    .append("tspan")
    .style("fill", "grey")
    .text(text.split("-")[3])
    .attr("font-size", 6)

    .append("tspan")
    .style("fill", "#8064FF")
    .text(text.split("-")[4])
    .attr("font-size", 14);
};

DrawFormulaClass.prototype.environment = function (color, tone) {
  /*
    Среда обитания – цвет лунных узлов дизайна.
1 – Пещеры (выборочные/смешанные)
2 – Рынки (внутренние/внешние)
3 – кухни (мокрые/сухие)
4 – горы (активные/пассивные)
5 – долины (узкие/широкие)
6 – берега (природные,естественные/искусственные)
     */

  //6 colors, 0 element is reserved
  //6 tones, 0 element is reserved
  let colors = [
    [],
    //1st color
    [
      NaN,
      "Сaves Sel.",
      "Сaves Sel.",
      "Сaves Sel.",
      "Сaves Blend.",
      "Сaves Blend.",
      "Сaves Blend.",
    ],

    //2nd color
    [
      NaN,
      "Markets Int.",
      "Markets Int.",
      "Markets Int.",
      "Markets Ext.",
      "Markets Ext.",
      "Markets Ext.",
    ],

    //3rd color
    [
      NaN,
      "Kitchens Wet",
      "Kitchens Wet",
      "Kitchens Wet",
      "Kitchens Dry",
      "Kitchens Dry",
      "Kitchens Dry",
    ],

    //4th color
    [
      NaN,
      "Mount. Active",
      "Mount. Active",
      "Mount. Active",
      "Mount. Passive",
      "Mount. Passive",
      "Mount. Passive",
    ],

    //5th color
    [
      NaN,
      "Valleys Narrow",
      "Valleys Narrow",
      "Valleys Narrow",
      "Valleys Wide",
      "Valleys Wide",
      "Valleys Wide",
    ],

    //6th color
    [
      NaN,
      "Shores Nat.",
      "Shores Nat.",
      "Shores Nat.",
      "Shores Artif.",
      "Shores Artif.",
      "Shores Artif.",
    ],
  ];

  return colors[color][tone];
};

DrawFormulaClass.prototype.nutrition = function (color, tone) {
  //6 colors, 0 element is reserved
  //6 tones, 0 element is reserved
  let colors = [
    [],
    //1st color
    [NaN, "Consec.", "Consec.", "Consec.", "Alter.", "Alter.", "Alter."],

    //2nd color
    [NaN, "Open", "Open", "Open", "Closed", "Closed", "Closed"],

    //3rd color
    [NaN, "Hot", "Hot", "Hot", "Cold", "Cold", "Cold"],

    //4th color
    [NaN, "Calm", "Calm", "Calm", "Nervous", "Nervous", "Nervous"],

    //5th color
    [NaN, "High", "High", "High", "Low", "Low", "Low"],

    //6th color
    [NaN, "Direct", "Direct", "Direct", "Indirect", "Indirect", "Indirect"],
  ];

  //theme of nutrition
  let colors_theme = [
    NaN,
    "Apetite",
    "Taste",
    "Thirst",
    "Touch",
    "Sound",
    "Light",
  ];

  //cognition
  let cognition = [
    NaN,
    "Smell",
    "Taste",
    "Out.Vis.",
    "Inn.Vis.",
    "Feel.",
    "Touch",
  ];

  return [
    [`Theme: ${colors_theme[color]}`],
    [`Type: ${colors[color][tone]}`],
    [`Cogn.: ${cognition[tone]}`],
  ];
};

DrawFormulaClass.prototype.motivation = function (color, tone) {
  let colors = [
    [],
    //1st color
    [
      "Fear",
      "Communalist",
      "Communalist",
      "Communalist",
      "Separatist",
      "Separatist",
      "Separatist",
    ],

    //2nd color
    [
      "Hope",
      "Theist",
      "Theist",
      "Theist",
      "Anti-Theist",
      "Anti-Theist",
      "Anti-Theist",
    ],

    //3rd color
    [
      "Desire",
      "Leader",
      "Leader",
      "Leader",
      "Follower",
      "Follower",
      "Follower",
    ],

    //4th color
    ["Need", "Master", "Master", "Master", "Novice", "Novice", "Novice"],

    //5th color
    [
      "Guilt",
      "Conditioner",
      "Conditioner",
      "Conditioner",
      "Conditioned",
      "Conditioned",
      "Conditioned",
    ],

    //6th color
    [
      "Innocence",
      "Observer",
      "Observer",
      "Observer",
      "Observed",
      "Observed",
      "Observed",
    ],
  ];

  return [colors[color][0], colors[color][tone]];
};

DrawFormulaClass.prototype.perspective = function (color, tone) {
  let colors = [
    [],
    //1st color
    [
      "Fear",
      "Communalist",
      "Communalist",
      "Communalist",
      "Separatist",
      "Separatist",
      "Separatist",
    ],

    //2nd color
    [
      "Hope",
      "Theist",
      "Theist",
      "Theist",
      "Anti-Theist",
      "Anti-Theist",
      "Anti-Theist",
    ],

    //3rd color
    [
      "Desire",
      "Leader",
      "Leader",
      "Leader",
      "Follower",
      "Follower",
      "Follower",
    ],

    //4th color
    ["Need", "Master", "Master", "Master", "Novice", "Novice", "Novice"],

    //5th color
    [
      "Guilt",
      "Conditioner",
      "Conditioner",
      "Conditioner",
      "Conditioned",
      "Conditioned",
      "Conditioned",
    ],

    //6th color
    [
      "Innocence",
      "Observer",
      "Observer",
      "Observer",
      "Observed",
      "Observed",
      "Observed",
    ],
  ];

  return [colors[color][0], colors[color][tone]];
};

DrawFormulaClass.prototype.draw_body_text = function () {
  let pers_x = this.pers_x + 10;
  let pers_y = this.pers_y - 40;

  //Name
  this.appendText(pers_x, pers_y, `Name: ${for_name}`);
  pers_y += 20;

  //PERSONALITY
  let [d_year, d_month, d_day, d_hour, d_minute, d_second] =
    formula.personality_time_UTC;
  let date_text = `${d_hour}:${d_minute}:${d_second} ${d_day}.${d_month}.${d_year}`;
  this.appendText(pers_x, pers_y, `UTC: ${date_text}`);
  pers_y += 20;

  if (formula.personality_time_local) {
    [d_year, d_month, d_day, d_hour, d_minute, d_second] =
      formula.personality_time_local;
    date_text = `${d_hour}:${d_minute}:${d_second} ${d_day}.${d_month}.${d_year}`;
    this.appendText(pers_x, pers_y, `Loc.: ${date_text}`);
  }
  pers_y += 20;

  let type_text = `${formula.type}`;
  this.appendText(pers_x, pers_y, `Type: ${type_text}`);
  pers_y += 20;

  let profile_text = `${formula.profile}`;
  this.appendText(pers_x, pers_y, `Profile: ${profile_text}`);
  pers_y += 20;

  let authority_text = `${formula.authority}`;
  this.appendText(pers_x, pers_y, `Authority: ${authority_text}`);
  pers_y += 20;

  //   let definition_text = `${formula.definition}`;
  // this.appendText(pers_x,pers_y,`Definition: ${definition_text}`);

  pers_y = this.pers_y - 40 + height - 60;
  let variables_text = `${formula.variable}`;
  this.appendText(pers_x, pers_y, `Variable: ${variables_text}`);

  pers_y = this.pers_y - 40 + height - 60;
  pers_x = this.pers_x + width - 200;
  let cross_text = `${formula.cross[0]}/${formula.cross[1]}|${formula.cross[2]}/${formula.cross[3]}`;
  this.appendText(pers_x, pers_y, `Inc.cross: ${cross_text}`);

  pers_x = this.x + width / 2 - 330;
  pers_y = this.pers_y + 100;

  let pers_sun_color = Math.ceil(formula.personality.sun.color);
  let pers_sun_tone = Math.ceil(formula.personality.sun.tone);

  let pers_node_color = Math.ceil(formula.personality.north_node.color);
  let pers_node_tone = Math.ceil(formula.personality.north_node.tone);

  this.appendText(
    pers_x,
    pers_y,
    `P.Sun c/t: ${pers_sun_color}.${pers_sun_tone}`,
    "black"
  );
  pers_y += 20;
  let text_arr = this.motivation(pers_sun_color, pers_sun_tone);
  this.appendText(pers_x, pers_y, `Motiv.:${text_arr[0]}`);
  pers_y += 20;
  this.appendText(pers_x, pers_y, text_arr[1]);
  pers_y += 20;
  this.appendText(
    pers_x,
    pers_y,
    `P.Nodes c/t: ${pers_node_color}.${pers_node_tone}`,
    "black"
  );
  pers_y += 20;
  // text_arr = this.perspective(pers_sun_color, pers_sun_tone);
  // this.appendText(pers_x,pers_y,`Persp.: ${text_arr[0]}`);
  pers_y += 20;
  // this.appendText(pers_x,pers_y,text_arr[1]);

  //DESIGN
  let des_x = this.pers_x + width - 200;
  let des_y = this.pers_y - 40;

  [d_year, d_month, d_day, d_hour, d_minute, d_second] =
    formula.design_time_UTC;
  date_text = `${d_hour}:${d_minute}:${d_second}`;
  this.appendText(des_x, des_y, `D.UTC: ${date_text}`);
  des_y += 20;
  date_text = `${d_day}.${d_month}.${d_year}`;
  this.appendText(des_x, des_y, `D.Date: ${date_text}`);

  des_x = this.pers_x + width - 500;
  des_y = this.pers_y - 40;
  this.appendText(des_x, des_y, `eps_per: ${formula.eps_pers.toFixed(5)}`);
  des_y += 20;
  this.appendText(des_x, des_y, `eps_des: ${formula.eps_des.toFixed(5)}`);

  des_x = this.pers_x + 190;
  des_y = this.pers_y + 100;

  let des_sun_color = Math.ceil(formula.design.sun.color);
  let des_sun_tone = Math.ceil(formula.design.sun.tone);

  let des_node_color = Math.ceil(formula.design.north_node.color);
  let des_node_tone = Math.ceil(formula.design.north_node.tone);

  this.appendText(
    des_x,
    des_y,
    `D.Sun c/t: ${des_sun_color}.${des_sun_tone}`,
    "red"
  );
  des_y += 20;
  text_arr = this.nutrition(des_sun_color, des_sun_tone);
  this.appendText(des_x, des_y, text_arr[0]);
  des_y += 20;
  this.appendText(des_x, des_y, text_arr[1]);
  des_y += 20;
  this.appendText(des_x, des_y, text_arr[2]);
  des_y += 20;
  this.appendText(
    des_x,
    des_y,
    `D.Nodes c/t: ${des_node_color}.${des_node_tone}`,
    "red"
  );
  des_y += 20;
  this.appendText(
    des_x,
    des_y,
    `Env.: ${this.environment(des_node_color, des_node_tone)}`
  );
};

//PERSONALITY texts on screen
DrawFormulaClass.prototype.draw_pers_text = function () {
  let planet_text = "";

  let pers_x = this.x + width / 2 - 10;
  let pers_y = this.pers_y + 100;

  this.appendText(pers_x, pers_y, `Personality:`, "black", "end");
  pers_y += 30;

  planet_text = `Sun: ${formula.personality.sun.hex}.${Math.ceil(
    formula.personality.sun.line
  )}-.${Math.ceil(formula.personality.sun.color)}-.${Math.ceil(
    formula.personality.sun.tone
  )}-.${Math.ceil(formula.personality.sun.base)}-.${
    formula.personality.sun.direction
  }${formula.personality.sun.power}`;
  this.appendTextPlanets(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Earth: ${formula.personality.earth.hex}.${Math.ceil(
    formula.personality.earth.line
  )}-.${Math.ceil(formula.personality.earth.color)}-.${Math.ceil(
    formula.personality.earth.tone
  )}-.${Math.ceil(formula.personality.earth.base)}-.${
    formula.personality.earth.direction
  }${formula.personality.earth.power}`;
  this.appendTextPlanets(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Moon: ${formula.personality.moon.hex}.${Math.ceil(
    formula.personality.moon.line
  )}-.${Math.ceil(formula.personality.moon.color)}-.${Math.ceil(
    formula.personality.moon.tone
  )}-.${Math.ceil(formula.personality.moon.base)}-.${
    formula.personality.moon.direction
  }${formula.personality.moon.power}`;
  this.appendTextPlanets(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `N.Node ${formula.personality.north_node.hex}.${Math.ceil(
    formula.personality.north_node.line
  )}-.${Math.ceil(formula.personality.north_node.color)}-.${Math.ceil(
    formula.personality.north_node.tone
  )}-.${Math.ceil(formula.personality.north_node.base)}-.${
    formula.personality.north_node.direction
  }${formula.personality.north_node.power}`;
  this.appendTextPlanets(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `S.Node: ${formula.personality.south_node.hex}.${Math.ceil(
    formula.personality.south_node.line
  )}-.${Math.ceil(formula.personality.south_node.color)}-.${Math.ceil(
    formula.personality.south_node.tone
  )}-.${Math.ceil(formula.personality.south_node.base)}-.${
    formula.personality.south_node.direction
  }${formula.personality.south_node.power}`;
  this.appendTextPlanets(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Mercury: ${formula.personality.mercury.hex}.${Math.ceil(
    formula.personality.mercury.line
  )}-.${Math.ceil(formula.personality.mercury.color)}-.${Math.ceil(
    formula.personality.mercury.tone
  )}-.${Math.ceil(formula.personality.mercury.base)}-.${
    formula.personality.mercury.direction
  }${formula.personality.mercury.power}`;
  this.appendTextPlanets(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Venus: ${formula.personality.venus.hex}.${Math.ceil(
    formula.personality.venus.line
  )}-.${Math.ceil(formula.personality.venus.color)}-.${Math.ceil(
    formula.personality.venus.tone
  )}-.${Math.ceil(formula.personality.venus.base)}-.${
    formula.personality.venus.direction
  }${formula.personality.venus.power}`;
  this.appendTextPlanets(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Mars: ${formula.personality.mars.hex}.${Math.ceil(
    formula.personality.mars.line
  )}-.${Math.ceil(formula.personality.mars.color)}-.${Math.ceil(
    formula.personality.mars.tone
  )}-.${Math.ceil(formula.personality.mars.base)}-.${
    formula.personality.mars.direction
  }${formula.personality.mars.power}`;
  this.appendTextPlanets(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Jupiter: ${formula.personality.jupiter.hex}.${Math.ceil(
    formula.personality.jupiter.line
  )}-.${Math.ceil(formula.personality.jupiter.color)}-.${Math.ceil(
    formula.personality.jupiter.tone
  )}-.${Math.ceil(formula.personality.jupiter.base)}-.${
    formula.personality.jupiter.direction
  }${formula.personality.jupiter.power}`;
  this.appendTextPlanets(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Saturn: ${formula.personality.saturn.hex}.${Math.ceil(
    formula.personality.saturn.line
  )}-.${Math.ceil(formula.personality.saturn.color)}-.${Math.ceil(
    formula.personality.saturn.tone
  )}-.${Math.ceil(formula.personality.saturn.base)}-.${
    formula.personality.saturn.direction
  }${formula.personality.saturn.power}`;
  this.appendTextPlanets(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Uranus: ${formula.personality.uranus.hex}.${Math.ceil(
    formula.personality.uranus.line
  )}-.${Math.ceil(formula.personality.uranus.color)}-.${Math.ceil(
    formula.personality.uranus.tone
  )}-.${Math.ceil(formula.personality.uranus.base)}-.${
    formula.personality.uranus.direction
  }${formula.personality.uranus.power}`;
  this.appendTextPlanets(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Neptune: ${formula.personality.neptune.hex}.${Math.ceil(
    formula.personality.neptune.line
  )}-.${Math.ceil(formula.personality.neptune.color)}-.${Math.ceil(
    formula.personality.neptune.tone
  )}-.${Math.ceil(formula.personality.neptune.base)}-.${
    formula.personality.neptune.direction
  }${formula.personality.neptune.power}`;
  this.appendTextPlanets(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Pluto: ${formula.personality.pluto.hex}.${Math.ceil(
    formula.personality.pluto.line
  )}-.${Math.ceil(formula.personality.pluto.color)}-.${Math.ceil(
    formula.personality.pluto.tone
  )}-.${Math.ceil(formula.personality.pluto.base)}-.${
    formula.personality.pluto.direction
  }${formula.personality.pluto.power}`;
  this.appendTextPlanets(pers_x, pers_y, planet_text, "black", "end");
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

  this.appendText(
    pers_x,
    pers_y,
    `P.Sun c/t: ${pers_sun_color}.${pers_sun_tone}`,
    "black"
  );
  pers_y += 20;
  let text_arr = this.motivation(pers_sun_color, pers_sun_tone);
  this.appendText(pers_x, pers_y, `Motiv.:${text_arr[0]}`);
  pers_y += 20;
  this.appendText(pers_x, pers_y, text_arr[1]);
  pers_y += 20;
  this.appendText(
    pers_x,
    pers_y,
    `P.Nodes c/t: ${pers_node_color}.${pers_node_tone}`,
    "black"
  );
  pers_y += 20;
  // text_arr = this.perspective(pers_sun_color, pers_sun_tone);
  // this.appendText(pers_x,pers_y,`Persp.: ${text_arr[0]}`);
  pers_y += 20;

  //add transference
  pers_x = this.pers_x + 10;
  pers_y = this.pers_y + 100;

  pers_sun_color = pers_sun_color > 3 ? pers_sun_color - 3 : pers_sun_color + 3;
  pers_sun_tone = pers_sun_tone > 3 ? pers_sun_tone - 3 : pers_sun_tone + 3;
  pers_node_color =
    pers_node_color > 3 ? pers_node_color - 3 : pers_node_color + 3;
  pers_node_tone = pers_node_tone > 3 ? pers_node_tone - 3 : pers_node_tone + 3;

  this.appendText(
    pers_x,
    pers_y,
    `P.Sun transference: ${pers_sun_color}.${pers_sun_tone}`,
    "black"
  );
  pers_y += 20;
  text_arr = this.motivation(pers_sun_color, pers_sun_tone);
  this.appendText(pers_x, pers_y, `Motiv.transference:${text_arr[0]}`);
  pers_y += 20;
  this.appendText(pers_x, pers_y, text_arr[1]);
  pers_y += 20;
  this.appendText(
    pers_x,
    pers_y,
    `P.Nodes transference: ${pers_node_color}.${pers_node_tone}`,
    "black"
  );
  pers_y += 20;
  // text_arr = this.perspective(pers_sun_color, pers_sun_tone);
  // this.appendText(pers_x,pers_y,`Persp.: ${text_arr[0]}`);
  pers_y += 20;

  this.draw_pers_text();
};

//DESIGN texts on screen
DrawFormulaClass.prototype.draw_des_text = function () {
  //DESIGN
  let des_x = this.pers_x + 165;
  let des_y = this.pers_y + 100;

  let planet_text = "";

  this.appendText(des_x, des_y, `Design:`, "red", "end");
  des_y += 30;

  planet_text = `Sun: ${formula.design.sun.hex}.${Math.ceil(
    formula.design.sun.line
  )}-.${Math.ceil(formula.design.sun.color)}-.${Math.ceil(
    formula.design.sun.tone
  )}-.${Math.ceil(formula.design.sun.base)}-.${formula.design.sun.direction}${
    formula.design.sun.power
  }`;
  this.appendTextPlanets(des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Earth: ${formula.design.earth.hex}.${Math.ceil(
    formula.design.earth.line
  )}-.${Math.ceil(formula.design.earth.color)}-.${Math.ceil(
    formula.design.earth.tone
  )}-.${Math.ceil(formula.design.earth.base)}-.${
    formula.design.earth.direction
  }${formula.design.earth.power}`;
  this.appendTextPlanets(des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Moon: ${formula.design.moon.hex}.${Math.ceil(
    formula.design.moon.line
  )}-.${Math.ceil(formula.design.moon.color)}-.${Math.ceil(
    formula.design.moon.tone
  )}-.${Math.ceil(formula.design.moon.base)}-.${formula.design.moon.direction}${
    formula.design.moon.power
  }`;
  this.appendTextPlanets(des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `N.Node ${formula.design.north_node.hex}.${Math.ceil(
    formula.design.north_node.line
  )}-.${Math.ceil(formula.design.north_node.color)}-.${Math.ceil(
    formula.design.north_node.tone
  )}-.${Math.ceil(formula.design.north_node.base)}-.${
    formula.design.north_node.direction
  }${formula.design.north_node.power}`;
  this.appendTextPlanets(des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `S.Node: ${formula.design.south_node.hex}.${Math.ceil(
    formula.design.south_node.line
  )}-.${Math.ceil(formula.design.south_node.color)}-.${Math.ceil(
    formula.design.south_node.tone
  )}-.${Math.ceil(formula.design.south_node.base)}-.${
    formula.design.south_node.direction
  }${formula.design.south_node.power}`;
  this.appendTextPlanets(des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Mercury: ${formula.design.mercury.hex}.${Math.ceil(
    formula.design.mercury.line
  )}-.${Math.ceil(formula.design.mercury.color)}-.${Math.ceil(
    formula.design.mercury.tone
  )}-.${Math.ceil(formula.design.mercury.base)}-.${
    formula.design.mercury.direction
  }${formula.design.mercury.power}`;
  this.appendTextPlanets(des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Venus: ${formula.design.venus.hex}.${Math.ceil(
    formula.design.venus.line
  )}-.${Math.ceil(formula.design.venus.color)}-.${Math.ceil(
    formula.design.venus.tone
  )}-.${Math.ceil(formula.design.venus.base)}-.${
    formula.design.venus.direction
  }${formula.design.venus.power}`;
  this.appendTextPlanets(des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Mars: ${formula.design.mars.hex}.${Math.ceil(
    formula.design.mars.line
  )}-.${Math.ceil(formula.design.mars.color)}-.${Math.ceil(
    formula.design.mars.tone
  )}-.${Math.ceil(formula.design.mars.base)}-.${formula.design.mars.direction}${
    formula.design.mars.power
  }`;
  this.appendTextPlanets(des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Jupiter: ${formula.design.jupiter.hex}.${Math.ceil(
    formula.design.jupiter.line
  )}-.${Math.ceil(formula.design.jupiter.color)}-.${Math.ceil(
    formula.design.jupiter.tone
  )}-.${Math.ceil(formula.design.jupiter.base)}-.${
    formula.design.jupiter.direction
  }${formula.design.jupiter.power}`;
  this.appendTextPlanets(des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Saturn: ${formula.design.saturn.hex}.${Math.ceil(
    formula.design.saturn.line
  )}-.${Math.ceil(formula.design.saturn.color)}-.${Math.ceil(
    formula.design.saturn.tone
  )}-.${Math.ceil(formula.design.saturn.base)}-.${
    formula.design.saturn.direction
  }${formula.design.saturn.power}`;
  this.appendTextPlanets(des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Uranus: ${formula.design.uranus.hex}.${Math.ceil(
    formula.design.uranus.line
  )}-.${Math.ceil(formula.design.uranus.color)}-.${Math.ceil(
    formula.design.uranus.tone
  )}-.${Math.ceil(formula.design.uranus.base)}-.${
    formula.design.uranus.direction
  }${formula.design.uranus.power}`;
  this.appendTextPlanets(des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Neptune: ${formula.design.neptune.hex}.${Math.ceil(
    formula.design.neptune.line
  )}-.${Math.ceil(formula.design.neptune.color)}-.${Math.ceil(
    formula.design.neptune.tone
  )}-.${Math.ceil(formula.design.neptune.base)}-.${
    formula.design.neptune.direction
  }${formula.design.neptune.power}`;
  this.appendTextPlanets(des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `Pluto: ${formula.design.pluto.hex}.${Math.ceil(
    formula.design.pluto.line
  )}-.${Math.ceil(formula.design.pluto.color)}-.${Math.ceil(
    formula.design.pluto.tone
  )}-.${Math.ceil(formula.design.pluto.base)}-.${
    formula.design.pluto.direction
  }${formula.design.pluto.power}`;
  this.appendTextPlanets(des_x, des_y, planet_text, "red", "end");
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

  this.appendText(
    des_x,
    des_y,
    `D.Sun c/t: ${des_sun_color}.${des_sun_tone}`,
    "red"
  );
  des_y += 20;
  let text_arr = this.nutrition(des_sun_color, des_sun_tone);
  this.appendText(des_x, des_y, text_arr[0]);
  des_y += 20;
  this.appendText(des_x, des_y, text_arr[1]);
  des_y += 20;
  this.appendText(des_x, des_y, text_arr[2]);
  des_y += 20;
  this.appendText(
    des_x,
    des_y,
    `D.Nodes c/t: ${des_node_color}.${des_node_tone}`,
    "red"
  );
  des_y += 20;
  this.appendText(
    des_x,
    des_y,
    `Env.: ${this.environment(des_node_color, des_node_tone)}`
  );

  //add transference
  des_x = this.pers_x + width - 10;
  des_y = this.pers_y + 100;

  des_sun_color = des_sun_color > 3 ? des_sun_color - 3 : des_sun_color + 3;
  des_sun_tone = des_sun_tone > 3 ? des_sun_tone - 3 : des_sun_tone + 3;

  des_node_color = des_node_color > 3 ? des_node_color - 3 : des_node_color + 3;
  des_node_tone = des_node_tone > 3 ? des_node_tone - 3 : des_node_tone + 3;

  this.appendText(
    des_x,
    des_y,
    `D.Sun transference: ${des_sun_color}.${des_sun_tone}`,
    "red",
    "end"
  );
  des_y += 20;

  text_arr = this.nutrition(des_sun_color, des_sun_tone);
  this.appendText(des_x, des_y, text_arr[0], "black", "end");
  des_y += 20;
  this.appendText(des_x, des_y, text_arr[1], "black", "end");
  des_y += 20;
  this.appendText(des_x, des_y, text_arr[2], "black", "end");
  des_y += 20;

  this.appendText(
    des_x,
    des_y,
    `D.Nodes transference: ${des_node_color}.${des_node_tone}`,
    "red",
    "end"
  );
  des_y += 20;
  this.appendText(
    des_x,
    des_y,
    `Env. transference: ${this.environment(des_node_color, des_node_tone)}`,
    "black",
    "end"
  );

  this.draw_des_text();
};

DrawFormulaClass.prototype.drawNumerology = function () {
  //координаты для текста
  this.pers_x = this.x - width / 2;
  this.pers_y = this.y;

  let num_x = this.pers_x;
  let num_y = this.pers_y + height - 199;

  svg
    .append("rect")
    .attr("height", 199)
    .attr("width", width)
    .attr("x", num_x)
    .attr("y", num_y)
    .attr("fill", "none")
    .attr("stroke", "red");

  num_x += 10;
  num_y += 30;

  let numerology_text = `Pifagor numbers: ${formula.numerology.pifagor_number_1} , ${formula.numerology.pifagor_number_2} , ${formula.numerology.pifagor_number_3} 
    , ${formula.numerology.pifagor_number_4} , ${formula.numerology.pifagor_number_5} , ${formula.numerology.pifagor_number_6}  `;
  if (formula.numerology.keeper) numerology_text += `    -Keeper-`;
  if (formula.numerology.white_mage) numerology_text += `    -White Mage-`;
  this.appendText(num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Matrix code: ${formula.numerology.matrix_code}. Soul level now/past life: ${formula.numerology.soul_level}/${formula.numerology.soul_level_past_life}.`;
  this.appendText(num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Planetary task: ${formula.numerology.planetary_task}. Social task: ${formula.numerology.social_task}. Karmic task: ${formula.numerology.karmic_task}.`;
  this.appendText(num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Meta Cycles: [${formula.numerology.mc1}].[${formula.numerology.mc2}].[${formula.numerology.mc3}].`;
  this.appendText(num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Meta tasks: [${formula.numerology.mc1_task}].[${formula.numerology.mc2_task}].[${formula.numerology.mc3_task}].Whole life task: ${formula.numerology.mc_whole_life_task}. Mc2 optional task: ${formula.numerology.mc2_optional_task}`;
  this.appendText(num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Opv: ${formula.numerology.opv}. Tp: ${formula.numerology.tp}. `;
  if (formula.numerology.opv2)
    numerology_text += ` Opv2: ${formula.numerology.opv2}.`;
  this.appendText(num_x, num_y, numerology_text, "black", "start");
  num_y += 30;
};

//функция висит на кнопке Calculate
DrawFormulaClass.prototype.drawFormula = function () {
  //console.log(formula);

  //сначала рисуем Полную Формулу
  this.x = width + width / 2;
  this.y = (height / 100) * 10;
  this.init();
  this.draw_Body();

  //теперь рисуем Личность
  this.x = width / 2;
  this.y = (height / 100) * 10;
  this.init();
  this.draw_Pers();

  //теперь рисуем Красное
  this.x = 2 * width + width / 2;
  this.y = (height / 100) * 10;
  this.init();
  this.draw_Des();

  //теперь рисуем Формулу Души
  this.x = width / 2;
  this.y = height;
  this.init();
  //   this.draw_Fd(formula.personality, formula.per_centers);
  this.drawNumerology();

  //теперь рисуем Формулу Тела
  this.x = 2 * width + width / 2;
  this.y = height;
  this.init();
  //   this.draw_Fd(formula.design, formula.des_centers);

  //console.log(formula);

  //включаем кнопку на сохранение фото
  //document.getElementById("img_button").disabled = false;
  //document.getElementById("calc_button").disabled = true;
};

//V2 2024
DrawFormulaClass.prototype.drawFormula = function (graph_type: string) {
  //console.log(formula);

  //сначала рисуем Полную Формулу
  this.x = width + width / 2;
  this.y = (height / 100) * 10;
  this.init();
  this.draw_Body();

  //теперь рисуем Личность
  this.x = width / 2;
  this.y = (height / 100) * 10;
  this.init();
  this.draw_Pers();

  //теперь рисуем Красное
  this.x = 2 * width + width / 2;
  this.y = (height / 100) * 10;
  this.init();
  this.draw_Des();

  //теперь рисуем Формулу Души
  this.x = width / 2;
  this.y = height;
  this.init();
  //   this.draw_Fd(formula.personality, formula.per_centers);
  this.drawNumerology();

  //теперь рисуем Формулу Тела
  this.x = 2 * width + width / 2;
  this.y = height;
  this.init();
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

DrawFormulaClass.prototype.draw_planet = function (planet, x, y, size, color) {
  switch (planet) {
    case "mercury":
      this.draw_mercury(x, y, size, color);
      break;
    case "venus":
      this.draw_venus(x, y, size, color);
      break;
    case "earth":
      this.draw_earth(x, y, size, color);
      break;
    case "mars":
      this.draw_mars(x, y, size, color);
      break;
    case "jupiter":
      this.draw_jupiter(x, y, size, color);
      break;
    case "saturn":
      this.draw_saturn(x, y, size, color);
      break;
    case "uranus":
      this.draw_uranus(x, y, size, color);
      break;
    case "neptune":
      this.draw_neptune(x, y, size, color);
      break;
    case "pluto":
      this.draw_pluto(x, y, size, color);
      break;
    case "sun":
      this.draw_sun(x, y, size, color);
      break;
    case "moon":
      this.draw_moon(x, y, size, color);
      break;
    case "north_node":
      this.draw_north_node(x, y, size, color);
      break;
    case "south_node":
      this.draw_south_node(x, y, size, color);
      break;

    default:
      break;
  }
};

//draw arrow from x,y to x1,y1 and orientation (vertical, horizontal, inclined)
DrawFormulaClass.prototype.draw_arrow = function (
  x,
  y,
  x1,
  y1,
  mutual_reception = false
) {
  let corr_x1,
    corr_x2,
    corr_y1,
    corr_y2 = NaN;

  //на каком конце рисовать стрелку
  // 0 - x,y
  // 1 - x1,y1
  // 2 - both ends
  let arrow_point = 1;

  let orientation = NaN;

  if (x === x1) {
    orientation = "vertical";
  } else if (y === y1) {
    orientation = "horizontal";
  } else {
    orientation = "inclined";
  }

  if (orientation === "vertical") {
    //всегда рисуем сверху вниз
    if (y > y1) {
      let temp = y;
      y = y1;
      y1 = temp;

      arrow_point = 0;
    }

    corr_x1 = 0;
    corr_x2 = 0;
    corr_y1 = 40;
    corr_y2 = 0;
  } else if (orientation === "horizontal") {
    //всегда рисуем справа налево
    if (x < x1) {
      let temp = x;
      x = x1;
      x1 = temp;

      arrow_point = 0;
    }

    corr_x1 = -17;
    corr_x2 = 20;
    corr_y1 = 20;
    corr_y2 = 20;
  } else {
    //всегда рисуем справа налево
    if (x < x1) {
      let temp = x;
      x = x1;
      x1 = temp;

      temp = y;
      y = y1;
      y1 = temp;

      arrow_point = 0;
    }

    if (y > y1) {
      corr_x1 = -10;
      corr_x2 = 20;
      corr_y1 = 15;
      corr_y2 = 30;
    } else {
      corr_x1 = -10;
      corr_x2 = 15;
      corr_y1 = 20;
      corr_y2 = 10;
    }
  }

  let points = [
    { x: x + corr_x1, y: y + corr_y1 },
    { x: x1 + corr_x2, y: y1 + corr_y2 },
  ];

  svg
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", "#1411ff")
    .attr("fill", "none");

  //стрелки

  if (mutual_reception) arrow_point = 2;

  if (arrow_point === 2 || arrow_point === 1) {
    points = [
      { x: x1 + corr_x2 - 3, y: y1 + corr_y2 - 3 },
      { x: x1 + corr_x2, y: y1 + corr_y2 },
      { x: x1 + corr_x2 + 3, y: y1 + corr_y2 - 3 },
    ];

    svg
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "#1411ff")
      .attr("fill", "none");
  }

  if (arrow_point === 2 || arrow_point === 0) {
    points = [
      { x: x + corr_x1 - 3, y: y + corr_y1 + 3 },
      { x: x + corr_x1, y: y + corr_y1 },
      { x: x + corr_x1 + 3, y: y + corr_y1 + 3 },
    ];

    svg
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "#1411ff")
      .attr("fill", "none");
  }
};

//рисуем силу и ретроградность
DrawFormulaClass.prototype.draw_power_and_retro = function (
  planet,
  planets_coords,
  color,
  formula_array
) {
  //рисуем силу и ретроградность
  this.appendText(
    planets_coords[0] + 7,
    planets_coords[1] + 17,
    `${formula_array[planet].direction}`,
    color,
    "start",
    10
  );
  this.appendText(
    planets_coords[0] + 7,
    planets_coords[1] + 29,
    `${formula_array[planet].power}`,
    color,
    "start",
    10
  );
};

//рисование Центра
DrawFormulaClass.prototype.draw_many_planets = function (
  number,
  planets,
  planets_coords,
  formula_array
) {
  for (let i = 0; i < number; i++) {
    this.draw_planet(
      planets[i],
      planets_coords[i][0],
      planets_coords[i][1],
      this.size_of_the_planet_to_draw,
      "black"
    );

    this.planets_full_info[planets[i]].x = planets_coords[i][0];
    this.planets_full_info[planets[i]].y = planets_coords[i][1];
    this.planets_full_info[planets[i]].drawn = true;

    //рисуем силу и ретроградность
    this.draw_power_and_retro(
      planets[i],
      planets_coords[i],
      "black",
      formula_array
    );
  }
};

//рисование стрелок между планетами
DrawFormulaClass.prototype.draw_arrows = function (number, planets_coords) {
  //для двухпланетных центров
  if (number === 2) {
    this.draw_arrow(
      planets_coords[0][0],
      planets_coords[0][1],
      planets_coords[1][0],
      planets_coords[1][1],
      true
    );
    return;
  }

  for (let i = 0; i < number - 1; i++) {
    this.draw_arrow(
      planets_coords[i][0],
      planets_coords[i][1],
      planets_coords[i + 1][0],
      planets_coords[i + 1][1]
    );
  }

  this.draw_arrow(
    planets_coords[number - 1][0],
    planets_coords[number - 1][1],
    planets_coords[0][0],
    planets_coords[0][1]
  );
};

DrawFormulaClass.prototype.draw_contour = function (
  number,
  planets_coords,
  height,
  width
) {
  let x, y;

  switch (number) {
    case 1:
      x = planets_coords[0][0] - 15;
      y = planets_coords[0][1] - 10;
      break;

    case 2:
      x = planets_coords[1][0] - 15;
      y = planets_coords[0][1] - 10;
      break;

    case 3:
      x = planets_coords[2][0] - 15;
      y =
        (planets_coords[2][1] < planets_coords[0][1]
          ? planets_coords[2][1]
          : planets_coords[0][1]) - 20;
      break;

    case 4:
      x = planets_coords[3][0] - 15;
      y = planets_coords[3][1] - 10;
      break;

    case 5:
      x = planets_coords[4][0] - 15;
      y =
        (planets_coords[4][1] < planets_coords[0][1]
          ? planets_coords[4][1]
          : planets_coords[0][1]) - 20;
      break;

    case 6:
      x = planets_coords[5][0] - 10;
      y = planets_coords[5][1] - 20;
      break;

    case 7:
      x = planets_coords[6][0] - 15;
      y =
        (planets_coords[6][1] < planets_coords[0][1]
          ? planets_coords[6][1]
          : planets_coords[0][1]) - 20;
      break;

    case 8:
      x = planets_coords[7][0] - 10;
      y = planets_coords[7][1] - 20;
      break;

    case 9:
      x = planets_coords[8][0] - 10;
      y = planets_coords[0][1] - 20;
      break;

    case 10:
      x = planets_coords[8][0] - 10;
      y = planets_coords[0][1] - 20;
      break;

    default:
      x = NaN;
      y = NaN;
  }

  //обводим цетр
  svg
    .append("rect")
    .attr("height", height + 20)
    .attr("width", width + 15)
    .attr("x", x)
    .attr("y", y)
    .attr("rx", 15)
    .attr("ry", 15)
    .attr("fill", "none")
    .attr("stroke", "black");
};

//Циклический сдвиг массива
//принимает на вход массив с количеством элементов от 2 до 10
//второй параметр  - на сколько элементов сдвинуть
//движение производится вперед по часовой стрелке по кругу
//если элемента 2, то они просто меняются местами
//возвращает измененный массив
DrawFormulaClass.prototype.move_array = function (array, number_to_move) {
  /*
a=a.splice(-k).concat(a);

The splice() method changes the contents of an array by removing existing elements and/or adding new elements.

start
Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to
the length of the array. If negative, will begin that many elements from the end of the array (with origin -1)

The concat() method is used to merge two or more arrays. This method does not change the existing arrays,
but instead returns a new array.and will be set to 0 if absolute value is greater than the length of the array.

so for example
let a =[1,2,3];
a.splice(-1) === 3
a=a.splice(-1).concat(a) === 3 + 1,2
*/

  if (array.length < 2) {
    console.log("array is to small");
    throw "093";
  }

  //insurance against error in 2 elements array
  if (array.length === 2) number_to_move = 1;

  return array.splice(-number_to_move).concat(array);
};

//ищет в массиве центров планеты, на которые указывает максимум 1 планета,
//для того чтобы можно было съэкономить место на орбитах и рисовать такую планету слева на формуле.
DrawFormulaClass.prototype.find_horizontal = function (array, formula_array) {
  let planet_horizontal = [];

  //изначально устанавливаем на все планеты, что они могут рисоваться слева
  for (let i = 0; i < array.length; i++) {
    planet_horizontal[i] = true;
  }

  //теперь отсекаем варианты
  for (let key in formula_array) {
    for (let i = 0; i < array.length; i++) {
      //console.log(formula_array[key].point_to_planet);

      if (
        array[i] === formula_array[key].point_to_planet &&
        formula_array[key].orbit === 1 &&
        planet_horizontal[i]
      ) {
        for (let key2 in formula_array) {
          if (
            key === formula_array[key2].point_to_planet &&
            formula_array[key2].orbit === 2 &&
            planet_horizontal[i]
          ) {
            // console.log(key);
            // console.log(formula_array[key2].point_to_planet);
            planet_horizontal[i] = false;
          }
        }
      }
    }
  }

  return planet_horizontal;
};

//находит следующую планету, которая указывает на текущую
//либо возвращает false
DrawFormulaClass.prototype.find_next_planet = function (planet, formula_array) {
  for (let key in formula_array) {
    if (
      planet === formula_array[key].point_to_planet &&
      !this.planets_full_info[key].drawn &&
      formula_array[planet].orbit === formula_array[key].orbit - 1
    ) {
      return key;
    }
  }
  return false;
};

//находит предыдущую планету, на которую указывает текущая
//либо возвращает false если планета, на которую она указывает, находится в центре формулы
DrawFormulaClass.prototype.find_prev_planet = function (planet, formula_array) {
  let points_to = formula_array[planet].point_to_planet;

  if (formula_array[points_to].orbit !== 0) {
    //console.log(`points_to = ${points_to}`);
    return points_to;
  }

  return false;
};

//рисуем формулу души и тела
//входные аргументы
//formula.personality и formula.per_centers
//или
//formula.design и formula.des_centers
DrawFormulaClass.prototype.draw_Fd = function (formula_array, centers_array) {
  //y - левый верхний край планеты
  //x - точно посередине

  //   console.log("this.draw_Fd");
  //   console.log(formula_array);
  //   console.log(centers_array);

  for (let key in this.planets_full_info) {
    //console.log(key);
    this.planets_full_info[key].x = NaN;
    this.planets_full_info[key].y = NaN;
    this.planets_full_info[key].drawn = false;
  }

  let pers_x = this.pers_x;
  let pers_y = this.pers_y;

  //окантовка для Формулы Души
  svg
    .append("rect")
    .attr("height", height - 200) //550
    .attr("width", width)
    .attr("x", pers_x)
    .attr("y", pers_y)
    .attr("fill", "none")
    .attr("stroke", "black");

  let temp_y = pers_y + 60;

  let temp_x = 0;

  let points = [
    { x: pers_x, y: temp_y },
    { x: pers_x + width, y: temp_y },
  ];

  svg
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", "black")
    .attr("fill", "none");

  temp_x += 60;

  points = [
    { x: pers_x + temp_x, y: pers_y },
    { x: pers_x + temp_x, y: pers_y + height - 200 },
  ];

  svg
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", "black")
    .attr("fill", "none");

  temp_x += 120;

  points = [
    { x: pers_x + temp_x, y: pers_y },
    { x: pers_x + temp_x, y: pers_y + height - 200 },
  ];

  svg
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", "black")
    .attr("fill", "none");

  this.draw_planet(
    "mercury",
    pers_x + 30,
    pers_y + 15,
    this.size_of_the_planet_to_draw,
    "blue"
  );
  //рисуем силу и ретроградность
  this.draw_power_and_retro(
    "mercury",
    [pers_x + 30, pers_y + 15],
    "blue",
    formula_array
  );
  this.draw_planet(
    "mercury",
    pers_x + temp_x + 30,
    pers_y + 15,
    this.size_of_the_planet_to_draw,
    "blue"
  );
  //рисуем силу и ретроградность
  this.draw_power_and_retro(
    "mercury",
    [pers_x + temp_x + 30, pers_y + 15],
    "blue",
    formula_array
  );
  let temp_i = 2;
  for (let i = 2; i <= 8; i++) {
    temp_x += 60;

    points = [
      { x: pers_x + temp_x, y: pers_y },
      { x: pers_x + temp_x, y: pers_y + height - 200 },
    ];

    svg
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "none");

    //пропускаем Землю
    if (i === 3) temp_i++;
    this.draw_planet(
      planets_arr[temp_i],
      pers_x + temp_x + 30,
      pers_y + 15,
      this.size_of_the_planet_to_draw,
      "blue"
    );
    //рисуем силу и ретроградность
    this.draw_power_and_retro(
      planets_arr[temp_i],
      [pers_x + temp_x + 30, pers_y + 15],
      "blue",
      formula_array
    );

    temp_i++;
  }

  temp_x += 60;

  points = [
    { x: pers_x + temp_x, y: pers_y },
    { x: pers_x + temp_x, y: pers_y + height - 200 },
  ];

  svg
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", "black")
    .attr("fill", "none");

  //устанавливаем минимальную занимаемую высоту центра
  // и его ориентацию
  //для одиночных центров это всегда константа

  for (let i = 0; i < centers_array.length; i++) {
    if (centers_array[i][1] === 1) {
      centers_array[i][2] = [40, "horizontal"];
    }

    //2 планеты рисуются либо вертикально, либо горизонтально
    // и от этого зависит высота 40 или 80
    //если горизонтально, то первая планета будет нарисована слева
    if (centers_array[i][1] === 2) {
      let planet_horizontal = this.find_horizontal(
        centers_array[i][0],
        formula_array
      );

      if (!planet_horizontal[0] && !planet_horizontal[1]) {
        centers_array[i][2] = [80, "vertical"];
      } else {
        centers_array[i][2] = [40, "horizontal"];
        //меняем местами
        if (planet_horizontal[0]) {
          centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          // console.log(centers_array[i][0]);
        }
      }
    }

    //3 планеты рисуются либо квадратно, либо левая выше
    // и от этого зависит высота 80 (horizontal) или
    // 120 (vertical)
    if (centers_array[i][1] === 3) {
      let planet_horizontal = this.find_horizontal(
        centers_array[i][0],
        formula_array
      );

      if (
        !planet_horizontal[0] &&
        !planet_horizontal[1] &&
        !planet_horizontal[2]
      ) {
        centers_array[i][2] = [120, "vertical"];
      } else {
        centers_array[i][2] = [80, "horizontal"];

        //меняем местами
        //1 справа наверху,2 справа внизу, 3 слева внизу
        if (!planet_horizontal[2]) {
          if (planet_horizontal[0]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[1]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          }
        }
      }
    }

    //4 планеты рисуются либо квадратно, либо левые выше и ниже
    // и от этого зависит высота 80 или 120 или 160
    // 120 одна сзади рисуется вверх
    if (centers_array[i][1] === 4) {
      //console.log(centers_array[i][0]);

      let planet_horizontal = this.find_horizontal(
        centers_array[i][0],
        formula_array
      );

      //console.log(planet_horizontal);

      if (
        !planet_horizontal[0] &&
        !planet_horizontal[1] &&
        !planet_horizontal[2] &&
        !planet_horizontal[3]
      ) {
        centers_array[i][2] = [160, "vertical"];
      } else if (
        (planet_horizontal[0] && planet_horizontal[1]) ||
        (planet_horizontal[1] && planet_horizontal[2]) ||
        (planet_horizontal[2] && planet_horizontal[3]) ||
        (planet_horizontal[3] && planet_horizontal[0])
      ) {
        //2 подряд горизонтальны, переводим их назад
        centers_array[i][2] = [80, "horizontal"];

        if (!(planet_horizontal[2] && planet_horizontal[3])) {
          if (planet_horizontal[0] && planet_horizontal[1]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[1] && planet_horizontal[2]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          }
        }
      } else if (
        planet_horizontal[0] ||
        planet_horizontal[1] ||
        planet_horizontal[2] ||
        planet_horizontal[3]
      ) {
        //одна горизонтальная ставим ее сзади внизу
        centers_array[i][2] = [120, "vertical"];

        if (!planet_horizontal[2]) {
          if (planet_horizontal[0]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[1]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          }
        }
      } else {
        //все горизонтальны, порядок не имеет значения
        centers_array[i][2] = [80, "horizontal"];
      }
    }

    //5 планет рисуются либо прямоугольно, 3 спереди 2 сзади внизу 120
    // либо 3 спереди одна сзади и одна сзади вверх 160
    // либо 3 спереди и 2 сзади вверху и внизу 200
    if (centers_array[i][1] === 5) {
      let planet_horizontal = this.find_horizontal(
        centers_array[i][0],
        formula_array
      );

      if (
        !planet_horizontal[0] &&
        !planet_horizontal[1] &&
        !planet_horizontal[2] &&
        !planet_horizontal[3] &&
        !planet_horizontal[4]
      ) {
        centers_array[i][2] = [200, "vertical"];
      } else if (
        (planet_horizontal[0] && planet_horizontal[1]) ||
        (planet_horizontal[1] && planet_horizontal[2]) ||
        (planet_horizontal[2] && planet_horizontal[3]) ||
        (planet_horizontal[3] && planet_horizontal[4]) ||
        (planet_horizontal[4] && planet_horizontal[0])
      ) {
        //2 подряд горизонтальны, переводим их назад
        centers_array[i][2] = [120, "horizontal"];

        if (!(planet_horizontal[3] && planet_horizontal[4])) {
          if (planet_horizontal[0] && planet_horizontal[1]) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (planet_horizontal[1] && planet_horizontal[2]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[2] && planet_horizontal[3]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          }
        }
      } else if (
        planet_horizontal[0] ||
        planet_horizontal[1] ||
        planet_horizontal[2] ||
        planet_horizontal[3] ||
        planet_horizontal[4]
      ) {
        //одна горизонтальная ставим ее сзади внизу
        centers_array[i][2] = [160, "vertical"];

        if (!planet_horizontal[3]) {
          if (planet_horizontal[0]) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (planet_horizontal[1]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[2]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          }
        }
      } else {
        //все горизонтальны, порядок не имеет значения
        centers_array[i][2] = [120, "horizontal"];
      }
    }

    //6 планет рисуются либо прямоугольно,
    // для орбит остается всего 4 планеты +Земля и узлы = 7
    // 3 спереди 3 сзади = 120
    // либо 3 спереди две сзади,  и  одна сзади вверх 160
    // либо 3 спереди  одна сзади, и 2 сзади вверху и внизу 200
    if (centers_array[i][1] === 6) {
      let planet_horizontal = this.find_horizontal(
        centers_array[i][0],
        formula_array
      );

      if (
        !planet_horizontal[0] &&
        !planet_horizontal[1] &&
        !planet_horizontal[2] &&
        !planet_horizontal[3] &&
        !planet_horizontal[4] &&
        !planet_horizontal[5]
      ) {
        centers_array[i][2] = [200, "vertical"];
        //такой ситуации даже гипотетически не должно возникнуть
        //6 планет в центре и все с длинными орбитами ?
        console.log(`draw_Fd 6 planets in Center`);
        throw 63333333333333;
      } else if (
        (planet_horizontal[0] &&
          planet_horizontal[1] &&
          planet_horizontal[2]) ||
        (planet_horizontal[1] &&
          planet_horizontal[2] &&
          planet_horizontal[3]) ||
        (planet_horizontal[2] &&
          planet_horizontal[3] &&
          planet_horizontal[4]) ||
        (planet_horizontal[3] &&
          planet_horizontal[4] &&
          planet_horizontal[5]) ||
        (planet_horizontal[4] &&
          planet_horizontal[5] &&
          planet_horizontal[0]) ||
        (planet_horizontal[5] && planet_horizontal[0] && planet_horizontal[1])
      ) {
        //3 подряд горизонтальны, переводим их назад
        centers_array[i][2] = [120, "horizontal"];

        if (
          !(
            planet_horizontal[3] &&
            planet_horizontal[4] &&
            planet_horizontal[5]
          )
        ) {
          if (
            planet_horizontal[0] &&
            planet_horizontal[1] &&
            planet_horizontal[2]
          ) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (
            planet_horizontal[1] &&
            planet_horizontal[2] &&
            planet_horizontal[3]
          ) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (
            planet_horizontal[2] &&
            planet_horizontal[3] &&
            planet_horizontal[4]
          ) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else if (
            planet_horizontal[4] &&
            planet_horizontal[5] &&
            planet_horizontal[0]
          ) {
            //двигаем на 5 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 5);
          } else {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          }
        }
      } else if (
        (planet_horizontal[0] && planet_horizontal[1]) ||
        (planet_horizontal[1] && planet_horizontal[2]) ||
        (planet_horizontal[2] && planet_horizontal[3]) ||
        (planet_horizontal[3] && planet_horizontal[4]) ||
        (planet_horizontal[4] && planet_horizontal[5]) ||
        (planet_horizontal[5] && planet_horizontal[0])
      ) {
        //2 подряд горизонтальны, переводим их назад
        centers_array[i][2] = [160, "horizontal"];

        if (!(planet_horizontal[3] && planet_horizontal[4])) {
          if (planet_horizontal[0] && planet_horizontal[1]) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (planet_horizontal[1] && planet_horizontal[2]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[2] && planet_horizontal[3]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else if (planet_horizontal[4] && planet_horizontal[5]) {
            //двигаем на 5 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 5);
          } else {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          }
        }
      } else if (
        planet_horizontal[0] ||
        planet_horizontal[1] ||
        planet_horizontal[2] ||
        planet_horizontal[3] ||
        planet_horizontal[4] ||
        planet_horizontal[5]
      ) {
        //одна горизонтальная ставим ее сзади по центру
        centers_array[i][2] = [200, "vertical"];

        if (!planet_horizontal[4]) {
          if (planet_horizontal[0]) {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          } else if (planet_horizontal[1]) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (planet_horizontal[2]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[3]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else {
            //двигаем на 5 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 5);
          }
        }
      } else {
        //все горизонтальны, порядок не имеет значения
        centers_array[i][2] = [120, "horizontal"];
      }
    }

    //7 планет рисуются либо прямоугольно,
    //4 планеты спереди, 3 сзади
    // для орбит остается всего 3 планеты +Земля и узлы = 6
    // 4 спереди 3 сзади = 160
    // либо 4 спереди две сзади,  и  одна сзади вверх 200
    // либо 4 спереди  одна сзади, и 2 сзади вверху и внизу 240
    if (centers_array[i][1] === 7) {
      let planet_horizontal = this.find_horizontal(
        centers_array[i][0],
        formula_array
      );

      if (
        !planet_horizontal[0] &&
        !planet_horizontal[1] &&
        !planet_horizontal[2] &&
        !planet_horizontal[3] &&
        !planet_horizontal[4] &&
        !planet_horizontal[5] &&
        !planet_horizontal[6]
      ) {
        centers_array[i][2] = [240, "vertical"];
        //такой ситуации даже гипотетически не должно возникнуть
        //7 планет в центре и все с длинными орбитами ?
        console.log(`draw_Fd 7 planets in Center`);
        throw 73333333333333;
      } else if (
        (planet_horizontal[0] &&
          planet_horizontal[1] &&
          planet_horizontal[2]) ||
        (planet_horizontal[1] &&
          planet_horizontal[2] &&
          planet_horizontal[3]) ||
        (planet_horizontal[2] &&
          planet_horizontal[3] &&
          planet_horizontal[4]) ||
        (planet_horizontal[3] &&
          planet_horizontal[4] &&
          planet_horizontal[5]) ||
        (planet_horizontal[4] &&
          planet_horizontal[5] &&
          planet_horizontal[6]) ||
        (planet_horizontal[5] &&
          planet_horizontal[6] &&
          planet_horizontal[0]) ||
        (planet_horizontal[6] && planet_horizontal[0] && planet_horizontal[1])
      ) {
        //3 подряд горизонтальны, переводим их назад
        centers_array[i][2] = [160, "horizontal"];

        if (
          !(
            planet_horizontal[4] &&
            planet_horizontal[5] &&
            planet_horizontal[6]
          )
        ) {
          if (
            planet_horizontal[0] &&
            planet_horizontal[1] &&
            planet_horizontal[2]
          ) {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          } else if (
            planet_horizontal[1] &&
            planet_horizontal[2] &&
            planet_horizontal[3]
          ) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (
            planet_horizontal[2] &&
            planet_horizontal[3] &&
            planet_horizontal[4]
          ) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (
            planet_horizontal[3] &&
            planet_horizontal[4] &&
            planet_horizontal[5]
          ) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else if (
            planet_horizontal[5] &&
            planet_horizontal[6] &&
            planet_horizontal[0]
          ) {
            //двигаем на 6 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 6);
          } else {
            //двигаем на 5 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 5);
          }
        }
      } else if (
        (planet_horizontal[0] && planet_horizontal[1]) ||
        (planet_horizontal[1] && planet_horizontal[2]) ||
        (planet_horizontal[2] && planet_horizontal[3]) ||
        (planet_horizontal[3] && planet_horizontal[4]) ||
        (planet_horizontal[4] && planet_horizontal[5]) ||
        (planet_horizontal[5] && planet_horizontal[6]) ||
        (planet_horizontal[6] && planet_horizontal[0])
      ) {
        //2 подряд горизонтальны, переводим их назад
        centers_array[i][2] = [200, "vertical"];

        if (!(planet_horizontal[4] && planet_horizontal[5])) {
          if (planet_horizontal[0] && planet_horizontal[1]) {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          } else if (planet_horizontal[1] && planet_horizontal[2]) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (planet_horizontal[2] && planet_horizontal[3]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[3] && planet_horizontal[4]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else if (planet_horizontal[5] && planet_horizontal[6]) {
            //двигаем на 6 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 6);
          } else {
            //двигаем на 5 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 5);
          }
        }
      } else if (
        planet_horizontal[0] ||
        planet_horizontal[1] ||
        planet_horizontal[2] ||
        planet_horizontal[3] ||
        planet_horizontal[4] ||
        planet_horizontal[5] ||
        planet_horizontal[6]
      ) {
        //одна горизонтальная ставим ее сзади по центру
        centers_array[i][2] = [240, "vertical"];

        if (!planet_horizontal[5]) {
          if (planet_horizontal[0]) {
            //двигаем на 5 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 5);
          } else if (planet_horizontal[1]) {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          } else if (planet_horizontal[2]) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (planet_horizontal[3]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[4]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else {
            //двигаем на 6 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 6);
          }
        }
      } else {
        //все горизонтальны, порядок не имеет значения
        centers_array[i][2] = [160, "horizontal"];
      }
    }

    //8 планет рисуются либо прямоугольно,
    //4 планеты спереди, 4 сзади
    // для орбит остается всего 2 планеты +Земля и узлы = 5
    // то есть в любом случае есть минимум 3 горизонтальные подряд
    // если 4 горизонтальные, что имеет огромную вероятность то 160
    // если 4 спереди и одна сзади наверх то 200
    if (centers_array[i][1] === 8) {
      let planet_horizontal = this.find_horizontal(
        centers_array[i][0],
        formula_array
      );

      if (
        !planet_horizontal[0] &&
        !planet_horizontal[1] &&
        !planet_horizontal[2] &&
        !planet_horizontal[3] &&
        !planet_horizontal[4] &&
        !planet_horizontal[5] &&
        !planet_horizontal[6] &&
        !planet_horizontal[7]
      ) {
        centers_array[i][2] = [200, "vertical"];
        //такой ситуации даже гипотетически не должно возникнуть
        //7 планет в центре и все с длинными орбитами ?
        console.log(`draw_Fd 8 planets in Center`);
        throw 83333333333333;
      } else if (
        (planet_horizontal[0] &&
          planet_horizontal[1] &&
          planet_horizontal[2] &&
          planet_horizontal[3]) ||
        (planet_horizontal[1] &&
          planet_horizontal[2] &&
          planet_horizontal[3] &&
          planet_horizontal[4]) ||
        (planet_horizontal[2] &&
          planet_horizontal[3] &&
          planet_horizontal[4] &&
          planet_horizontal[5]) ||
        (planet_horizontal[3] &&
          planet_horizontal[4] &&
          planet_horizontal[5] &&
          planet_horizontal[6]) ||
        (planet_horizontal[4] &&
          planet_horizontal[5] &&
          planet_horizontal[6] &&
          planet_horizontal[7]) ||
        (planet_horizontal[5] &&
          planet_horizontal[6] &&
          planet_horizontal[7] &&
          planet_horizontal[0]) ||
        (planet_horizontal[6] &&
          planet_horizontal[7] &&
          planet_horizontal[0] &&
          planet_horizontal[1])
      ) {
        //4 подряд горизонтальны, переводим их назад
        centers_array[i][2] = [160, "horizontal"];

        if (
          !(
            planet_horizontal[4] &&
            planet_horizontal[5] &&
            planet_horizontal[6] &&
            planet_horizontal[7]
          )
        ) {
          if (
            planet_horizontal[0] &&
            planet_horizontal[1] &&
            planet_horizontal[2] &&
            planet_horizontal[3]
          ) {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          } else if (
            planet_horizontal[1] &&
            planet_horizontal[2] &&
            planet_horizontal[3] &&
            planet_horizontal[4]
          ) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (
            planet_horizontal[2] &&
            planet_horizontal[3] &&
            planet_horizontal[4] &&
            planet_horizontal[5]
          ) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (
            planet_horizontal[3] &&
            planet_horizontal[4] &&
            planet_horizontal[5] &&
            planet_horizontal[6]
          ) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else if (
            planet_horizontal[5] &&
            planet_horizontal[6] &&
            planet_horizontal[7] &&
            planet_horizontal[0]
          ) {
            //двигаем на 7 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 7);
          } else {
            //двигаем на 6 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 6);
          }
        }
      } else {
        //3 подряд горизонтальные есть в любом случае , переводим их назад
        centers_array[i][2] = [200, "vertical"];

        if (
          !(
            planet_horizontal[4] &&
            planet_horizontal[5] &&
            planet_horizontal[6]
          )
        ) {
          if (
            planet_horizontal[0] &&
            planet_horizontal[1] &&
            planet_horizontal[2]
          ) {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          } else if (
            planet_horizontal[1] &&
            planet_horizontal[2] &&
            planet_horizontal[3]
          ) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (
            planet_horizontal[2] &&
            planet_horizontal[3] &&
            planet_horizontal[4]
          ) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (
            planet_horizontal[3] &&
            planet_horizontal[4] &&
            planet_horizontal[5]
          ) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else if (
            planet_horizontal[5] &&
            planet_horizontal[6] &&
            planet_horizontal[0]
          ) {
            //двигаем на 6 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 6);
          } else {
            //двигаем на 5 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 5);
          }
        }
      }
    }

    //9 планет, рисуются 5 спереди 4 сзади
    //смысла что-то искать и перестраивать нет
    if (centers_array[i][1] === 9) {
      centers_array[i][2] = [200, "horizontal"];
    }

    //10 планет, рисуются 5 спереди 5 сзади
    //смысла что-то искать и перестраивать нет
    if (centers_array[i][1] === 10) {
      centers_array[i][2] = [200, "horizontal"];
    }
  }
  //console.log(centers_array);

  pers_x = this.pers_x;
  pers_y = this.pers_y;

  //две колонки рисования для многопланетных центров
  const first_column_x = pers_x + 60 + 30;
  const second_column_x = pers_x + 60 + 10 + 40 + 30;

  const start_center_y = pers_y + 60 + 5;
  const end_center_y = pers_y + height - 200 - 5;

  //750-200   - 60 - 10 = 480 /40 = 12 планет помещается по вертикали
  //60 - верхняя кромка с орбитами,
  //10 - запас по 5 с каждой стороны
  const vertical_size = end_center_y - start_center_y;

  const center_center = start_center_y + vertical_size / 2;

  //границы занятой высоты, изменяются по мере заполнения центрами
  let upper_y_border = Math.trunc(start_center_y + vertical_size / 2);
  let lower_y_border = Math.trunc(start_center_y + vertical_size / 2);

  /*
    есть массив centers_array
    он отсортирован по убыванию величины центров
    в каждом центре планеты осортированы по куруг указания друг на друга
    так же отсортированы по расположению планет для рисования длинных орбит вправо
    а без орбит - влево

    [0]-ой элемент - список планет
    [1]-ый элемент - количество планет в центре
    [2]-ой элемент - минимальный размер и горизонтальное/вертикальное расположение


    минимальный размер по итогу надо сделать в каких-то условных единицах и затем масштабировать при рисовании
    размер планет в центре и расстояние между ними также сделать в условных единицах


    теперь корректируем расстояния между центрами и между планетами в центрах, отталкиваясь
    от
    //высота
    //750-200   - 60 - 10 = 480 /40 = 12 планет помещается по вертикали
    //60 - верхняя кромка с орбитами,
    //10 - запас по 5 с каждой стороны
     */

  let sum_of_planets_heights = 0;

  //промежуток по вертикали между центрами
  let gap_between_centers = 40;

  //промежуток по вертикали между планетами
  let gap_between_planets = 0;

  //количество центров centers_array.length
  // количество промежутков между центрами centers_array.length +1
  //так как у первого цетра промежутки с двух сторон и у крайних тоже должны быть промежутки вверху и внизу соответственно
  // в расчет не надо брать одиночные центры, так как их нет смысла увеличивать, но надо брать в расчет промежутки между ними.
  let number_of_centers_to_increase_space = 0;

  const number_of_gaps_between = centers_array.length + 1;

  for (let i = 0; i < centers_array.length; i++) {
    //суммируем все цифры того, сколько занимает каждый центр по вертикали.
    sum_of_planets_heights += centers_array[i][2][0];

    //добавляем промежутки между центрами
    if (i === 0) {
      sum_of_planets_heights += gap_between_centers * 2;
    } else {
      sum_of_planets_heights += gap_between_centers;
    }

    //не увеличиваем одиночные центры и горизонтальные двойные
    if (
      centers_array[i][1] !== 1 &&
      centers_array[i][1] === 2 &&
      centers_array[i][2][0] !== 40
    ) {
      number_of_centers_to_increase_space++;
    }
  }

  // console.log(sum_of_planets_heights);
  // console.log(vertical_size);

  //имеем размер вертикальный и имеем сколько из этого размера занимают центры и промежутки между ними
  // теперь в процентном сотношении, кратном 40 увеличиваем и то и то.
  // -1 потому-что мы строим от центра и там одна планета попадает посередине занимая 20 с одной стороны и 20 с другой
  let free_space_in_40 =
    Math.trunc((vertical_size - sum_of_planets_heights) / 40) - 1;

  //если не хватает места, уменьшаем промежутки между центрами
  if (!free_space_in_40) {
    console.log(`Not enough space for centers`);
  }

  // console.log(free_space_in_40);

  while (
    free_space_in_40 >
    number_of_centers_to_increase_space + number_of_gaps_between
  ) {
    gap_between_centers += 40;
    gap_between_planets += 40;

    // console.log(free_space_in_40);
    // console.log(number_of_centers_to_increase_space);

    free_space_in_40 -=
      number_of_centers_to_increase_space + number_of_gaps_between;
  }

  pers_x = first_column_x;
  pers_y = start_center_y;

  //массив уже отсортирован и идет от больших центров к маленьким
  for (let i = 0; i < centers_array.length; i++) {
    //console.log(`centers_array[i][0] = ${centers_array[i][0]}`);

    //координаты планет x и y
    let planets_coords = [];

    //добавляем дополнительное пространство для планет
    //не увеличиваем одиночные центры и горизонтальные двойные
    if (
      (centers_array[i][1] === 2 && centers_array[i][2][0] !== 40) ||
      centers_array[i][1] > 2
    ) {
      centers_array[i][2][0] += gap_between_planets;
    }

    //10 планет
    if (centers_array[i][0].length === 10) {
      //10 планет, рисуются 5 спереди 5 сзади
      //смысла что-то искать и перестраивать нет
      //centers_array[i][2] = [200,"horizontal"];

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] = [
          second_column_x,
          center_center - (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[1] = [
          second_column_x,
          center_center - (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[2] = [
          second_column_x,
          center_center - centers_array[i][2][0] / 5,
        ];

        planets_coords[3] = [second_column_x, center_center];

        planets_coords[4] = [
          second_column_x,
          center_center + centers_array[i][2][0] / 5,
        ];

        planets_coords[5] = [
          first_column_x,
          center_center + centers_array[i][2][0] / 5,
        ];

        planets_coords[6] = [first_column_x, center_center];

        planets_coords[7] = [
          first_column_x,
          center_center - centers_array[i][2][0] / 5,
        ];

        planets_coords[8] = [
          first_column_x,
          center_center - (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[9] = [
          first_column_x,
          center_center - (centers_array[i][2][0] / 5) * 3,
        ];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][0] / 5) * 3 -
          gap_between_centers;

        lower_y_border =
          lower_y_border +
          (centers_array[i][2][0] / 5) * 2 +
          gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] = [
          second_column_x,
          upper_y_border - centers_array[i][2][0],
        ];

        planets_coords[1] = [
          second_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 4,
        ];

        planets_coords[2] = [
          second_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[3] = [
          second_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[4] = [
          second_column_x,
          upper_y_border - centers_array[i][2][0] / 5,
        ];

        planets_coords[5] = [
          first_column_x,
          upper_y_border - centers_array[i][2][0] / 5,
        ];

        planets_coords[6] = [
          first_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[7] = [
          first_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[8] = [
          first_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 4,
        ];

        planets_coords[9] = [
          first_column_x,
          upper_y_border - centers_array[i][2][0],
        ];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] = [second_column_x, lower_y_border];

        planets_coords[1] = [
          second_column_x,
          lower_y_border + centers_array[i][2][0] / 5,
        ];

        planets_coords[2] = [
          second_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[3] = [
          second_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[4] = [
          second_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 4,
        ];

        planets_coords[5] = [
          first_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 4,
        ];

        planets_coords[6] = [
          first_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[7] = [
          first_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[8] = [
          first_column_x,
          lower_y_border + centers_array[i][2][0] / 5,
        ];

        planets_coords[9] = [first_column_x, lower_y_border];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        10,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(10, planets_coords);
      this.draw_contour(10, planets_coords, centers_array[i][2][0], 80);
    }

    //9 планет
    if (centers_array[i][0].length === 9) {
      //9 планет, рисуются 5 спереди 4 сзади
      //смысла что-то искать и перестраивать нет
      //centers_array[i][2] = [200,"horizontal"];

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] = [
          second_column_x,
          center_center - (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[1] = [
          second_column_x,
          center_center - (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[2] = [
          second_column_x,
          center_center - centers_array[i][2][0] / 5,
        ];

        planets_coords[3] = [second_column_x, center_center];

        planets_coords[4] = [
          second_column_x,
          center_center + centers_array[i][2][0] / 5,
        ];

        planets_coords[5] = [
          first_column_x,
          center_center + centers_array[i][2][0] / 5,
        ];

        planets_coords[6] = [first_column_x, center_center];

        planets_coords[7] = [
          first_column_x,
          center_center - centers_array[i][2][0] / 5,
        ];

        planets_coords[8] = [
          first_column_x,
          center_center - (centers_array[i][2][0] / 5) * 2,
        ];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][0] / 5) * 3 -
          gap_between_centers;

        lower_y_border =
          lower_y_border +
          (centers_array[i][2][0] / 5) * 2 +
          gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] = [
          second_column_x,
          upper_y_border - centers_array[i][2][0],
        ];

        planets_coords[1] = [
          second_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 4,
        ];

        planets_coords[2] = [
          second_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[3] = [
          second_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[4] = [
          second_column_x,
          upper_y_border - centers_array[i][2][0] / 5,
        ];

        planets_coords[5] = [
          first_column_x,
          upper_y_border - centers_array[i][2][0] / 5,
        ];

        planets_coords[6] = [
          first_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[7] = [
          first_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[8] = [
          first_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 4,
        ];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] = [second_column_x, lower_y_border];

        planets_coords[1] = [
          second_column_x,
          lower_y_border + centers_array[i][2][0] / 5,
        ];

        planets_coords[2] = [
          second_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[3] = [
          second_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[4] = [
          second_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 4,
        ];

        planets_coords[5] = [
          first_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 4,
        ];

        planets_coords[6] = [
          first_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[7] = [
          first_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[8] = [
          first_column_x,
          lower_y_border + centers_array[i][2][0] / 5,
        ];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        9,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(9, planets_coords);
      this.draw_contour(9, planets_coords, centers_array[i][2][0], 80);
    }

    //8 планет
    if (centers_array[i][0].length === 8) {
      //8 планет рисуются либо прямоугольно,
      //4 планеты спереди, 4 сзади
      // для орбит остается всего 2 планеты +Земля и узлы = 5
      // то есть в любом случае есть минимум 3 горизонтальные подряд

      // если 4 горизонтальные, что имеет огромную вероятность то 160
      // если 4 спереди и одна сзади наверх то 200

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                center_center - (centers_array[i][2][0] / 5) * 2,
              ]
            : [
                second_column_x,
                center_center - (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, center_center - centers_array[i][2][0] / 5]
            : [second_column_x, center_center - centers_array[i][2][0] / 4];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, center_center + centers_array[i][2][0] / 5 - 40]
            : [
                second_column_x,
                center_center + centers_array[i][2][0] / 4 - 40,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                center_center + (centers_array[i][2][0] / 5) * 2 - 40,
              ]
            : [
                second_column_x,
                center_center + (centers_array[i][2][0] / 4) * 2 - 40,
              ];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? [
                first_column_x,
                center_center + (centers_array[i][2][0] / 5) * 2 - 40,
              ]
            : [
                first_column_x,
                center_center + (centers_array[i][2][0] / 4) * 2 - 40,
              ];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, center_center + centers_array[i][2][0] / 5 - 40]
            : [first_column_x, center_center + centers_array[i][2][0] / 4 - 40];

        planets_coords[6] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, center_center - centers_array[i][2][0] / 5]
            : [first_column_x, center_center - centers_array[i][2][0] / 4];

        planets_coords[7] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, center_center - (centers_array[i][2][0] / 5) * 3]
            : [
                first_column_x,
                center_center - (centers_array[i][2][0] / 4) * 2,
              ];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][1] === "vertical"
            ? (centers_array[i][2][0] / 5) * 3
            : (centers_array[i][2][0] / 4) * 2) -
          gap_between_centers;

        lower_y_border =
          lower_y_border + (centers_array[i][2][1] === "vertical")
            ? (centers_array[i][2][0] / 5) * 2
            : (centers_array[i][2][0] / 4) * 2 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 5) * 4,
              ]
            : [second_column_x, upper_y_border - centers_array[i][2][0]];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 5) * 3,
              ]
            : [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 3,
              ];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 5) * 2,
              ]
            : [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, upper_y_border - centers_array[i][2][0] / 5]
            : [second_column_x, upper_y_border - centers_array[i][2][0] / 4];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, upper_y_border - centers_array[i][2][0] / 5]
            : [first_column_x, upper_y_border - centers_array[i][2][0] / 4];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 5) * 2,
              ]
            : [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[6] =
          centers_array[i][2][1] === "vertical"
            ? [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 5) * 3,
              ]
            : [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 3,
              ];

        planets_coords[7] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, upper_y_border - centers_array[i][2][0]]
            : [first_column_x, upper_y_border - centers_array[i][2][0]];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, lower_y_border + centers_array[i][2][0] / 5]
            : [second_column_x, lower_y_border];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                lower_y_border + (centers_array[i][2][0] / 5) * 2,
              ]
            : [
                second_column_x,
                lower_y_border + (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                lower_y_border + (centers_array[i][2][0] / 5) * 3,
              ]
            : [
                second_column_x,
                lower_y_border + (centers_array[i][2][0] / 4) * 3,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, lower_y_border + centers_array[i][2][0] - 40]
            : [second_column_x, lower_y_border + centers_array[i][2][0] - 40];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, lower_y_border + centers_array[i][2][0] - 40]
            : [first_column_x, lower_y_border + centers_array[i][2][0] - 40];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? [
                first_column_x,
                lower_y_border + (centers_array[i][2][0] / 5) * 3,
              ]
            : [
                first_column_x,
                lower_y_border + (centers_array[i][2][0] / 4) * 3,
              ];

        planets_coords[6] =
          centers_array[i][2][1] === "vertical"
            ? [
                first_column_x,
                lower_y_border + (centers_array[i][2][0] / 5) * 2,
              ]
            : [
                first_column_x,
                lower_y_border + (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[7] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, lower_y_border]
            : [first_column_x, lower_y_border];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        8,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(8, planets_coords);
      this.draw_contour(8, planets_coords, centers_array[i][2][0], 80);
    }

    //7 планет
    if (centers_array[i][0].length === 7) {
      // для орбит остается всего 3 планеты +Земля и узлы = 6
      //7 планет рисуются либо прямоугольно,
      //4 планеты спереди, 3 сзади

      // 4 спереди 3 сзади = 160
      // либо 4 спереди две сзади,  и  одна сзади вверх 200
      // либо 4 спереди  одна сзади, и 2 сзади вверху и внизу 240

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  center_center - (centers_array[i][2][0] / 6) * 2,
                ]
              : [
                  second_column_x,
                  center_center - (centers_array[i][2][0] / 5) * 2,
                ]
            : [
                second_column_x,
                center_center - (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [second_column_x, center_center - centers_array[i][2][0] / 6]
              : [second_column_x, center_center - centers_array[i][2][0] / 5]
            : [second_column_x, center_center - centers_array[i][2][0] / 4];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 6 - 40,
                ]
              : [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 5 - 40,
                ]
            : [
                second_column_x,
                center_center + centers_array[i][2][0] / 4 - 40,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  center_center + (centers_array[i][2][0] / 6) * 2 - 40,
                ]
              : [
                  second_column_x,
                  center_center + (centers_array[i][2][0] / 5) * 2 - 40,
                ]
            : [
                second_column_x,
                center_center + (centers_array[i][2][0] / 4) * 2 - 40,
              ];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  first_column_x,
                  center_center + (centers_array[i][2][0] / 6) * 3 - 40,
                ]
              : [
                  first_column_x,
                  center_center + (centers_array[i][2][0] / 5) * 2 - 40,
                ]
            : [
                first_column_x,
                center_center + (centers_array[i][2][0] / 4) * 2 - 40,
              ];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  first_column_x,
                  center_center + centers_array[i][2][0] / 6 - 40,
                ]
              : [
                  first_column_x,
                  center_center + centers_array[i][2][0] / 5 - 40,
                ]
            : [first_column_x, center_center + centers_array[i][2][0] / 4 - 40];

        planets_coords[6] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  first_column_x,
                  center_center - (centers_array[i][2][0] / 6) * 3,
                ]
              : [
                  first_column_x,
                  center_center - (centers_array[i][2][0] / 5) * 3,
                ]
            : [first_column_x, center_center - centers_array[i][2][0] / 4];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? (centers_array[i][2][0] / 6) * 3
              : (centers_array[i][2][0] / 5) * 3
            : (centers_array[i][2][0] / 4) * 2) -
          gap_between_centers;

        lower_y_border =
          lower_y_border + (centers_array[i][2][1] === "vertical")
            ? centers_array[i][2][0] === 240
              ? (centers_array[i][2][0] / 6) * 3
              : (centers_array[i][2][0] / 5) * 2
            : (centers_array[i][2][0] / 4) * 2 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 6) * 5,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 4,
                ]
            : [second_column_x, upper_y_border - centers_array[i][2][0]];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 6) * 4,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 3,
                ]
            : [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 3,
              ];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 6) * 3,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 2,
                ]
            : [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 6) * 2,
                ]
              : [second_column_x, upper_y_border - centers_array[i][2][0] / 5]
            : [second_column_x, upper_y_border - centers_array[i][2][0] / 4];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [first_column_x, upper_y_border - centers_array[i][2][0] / 6]
              : [first_column_x, upper_y_border - centers_array[i][2][0] / 5]
            : [first_column_x, upper_y_border - centers_array[i][2][0] / 4];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  first_column_x,
                  upper_y_border - (centers_array[i][2][0] / 6) * 3,
                ]
              : [
                  first_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 2,
                ]
            : [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[6] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [first_column_x, upper_y_border - centers_array[i][2][0]]
              : [first_column_x, upper_y_border - centers_array[i][2][0]]
            : [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 3,
              ];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [second_column_x, lower_y_border + centers_array[i][2][0] / 6]
              : [second_column_x, lower_y_border + centers_array[i][2][0] / 5]
            : [second_column_x, lower_y_border];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 6) * 2,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 2,
                ]
            : [second_column_x, lower_y_border + centers_array[i][2][0] / 4];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 6) * 3,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 3,
                ]
            : [
                second_column_x,
                lower_y_border + (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 6) * 4,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 4,
                ]
            : [second_column_x, lower_y_border + centers_array[i][2][0]];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [first_column_x, lower_y_border + centers_array[i][2][0] - 40]
              : [first_column_x, lower_y_border + centers_array[i][2][0] - 40]
            : [first_column_x, lower_y_border + centers_array[i][2][0] - 40];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  first_column_x,
                  lower_y_border + (centers_array[i][2][0] / 6) * 3,
                ]
              : [
                  first_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 3,
                ]
            : [
                first_column_x,
                lower_y_border + (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[6] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [first_column_x, lower_y_border]
              : [first_column_x, lower_y_border]
            : [first_column_x, lower_y_border + centers_array[i][2][0] / 4];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        7,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(7, planets_coords);
      this.draw_contour(7, planets_coords, centers_array[i][2][0], 80);
    }

    //6 планет
    if (centers_array[i][0].length === 6) {
      //6 планет рисуются либо прямоугольно,
      // для орбит остается всего 4 планеты +Земля и узлы = 7
      // 3 спереди 3 сзади = 120
      // либо 3 спереди две сзади,  и  одна сзади вверх 160
      // либо 3 спереди  одна сзади, и 2 сзади вверху и внизу 200

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  center_center - (centers_array[i][2][0] / 5) * 2,
                ]
              : [
                  second_column_x,
                  center_center - (centers_array[i][2][0] / 4) * 2,
                ]
            : [
                second_column_x,
                center_center - (centers_array[i][2][0] / 3) * 2,
              ];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [second_column_x, center_center - centers_array[i][2][0] / 5]
              : [second_column_x, center_center - centers_array[i][2][0] / 4]
            : [second_column_x, center_center - centers_array[i][2][0] / 3];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 5 - 40,
                ]
              : [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 4 - 40,
                ]
            : [
                second_column_x,
                center_center + centers_array[i][2][0] / 3 - 40,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  first_column_x,
                  center_center + (centers_array[i][2][0] / 5) * 2 - 40,
                ]
              : [
                  first_column_x,
                  center_center + centers_array[i][2][0] / 4 - 40,
                ]
            : [first_column_x, center_center + centers_array[i][2][0] / 3 - 40];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, center_center - centers_array[i][2][0] / 5]
              : [first_column_x, center_center - centers_array[i][2][0] / 4]
            : [first_column_x, center_center - centers_array[i][2][0] / 3];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  first_column_x,
                  center_center - (centers_array[i][2][0] / 5) * 3,
                ]
              : [
                  first_column_x,
                  center_center - (centers_array[i][2][0] / 4) * 3,
                ]
            : [
                first_column_x,
                center_center - (centers_array[i][2][0] / 3) * 2,
              ];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? (centers_array[i][2][0] / 5) * 3
              : (centers_array[i][2][0] / 4) * 3
            : (centers_array[i][2][0] / 3) * 2) -
          gap_between_centers;

        lower_y_border =
          lower_y_border + (centers_array[i][2][1] === "vertical")
            ? centers_array[i][2][0] === 200
              ? (centers_array[i][2][0] / 5) * 2
              : (centers_array[i][2][0] / 4) * 2
            : centers_array[i][2][0] / 3 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 4,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 4) * 3,
                ]
            : [second_column_x, upper_y_border - centers_array[i][2][0]];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 3,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 4) * 2,
                ]
            : [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 3) * 2,
              ];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 2,
                ]
              : [second_column_x, upper_y_border - centers_array[i][2][0] / 4]
            : [second_column_x, upper_y_border - centers_array[i][2][0] / 3];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, upper_y_border - centers_array[i][2][0] / 5]
              : [first_column_x, upper_y_border - centers_array[i][2][0] / 4]
            : [first_column_x, upper_y_border - centers_array[i][2][0] / 3];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  first_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 3,
                ]
              : [
                  first_column_x,
                  upper_y_border - (centers_array[i][2][0] / 4) * 2,
                ]
            : [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 3) * 2,
              ];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, upper_y_border - centers_array[i][2][0]]
              : [first_column_x, upper_y_border - centers_array[i][2][0]]
            : [first_column_x, upper_y_border - centers_array[i][2][0]];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [second_column_x, lower_y_border + centers_array[i][2][0] / 5]
              : [second_column_x, lower_y_border + centers_array[i][2][0] / 4]
            : [second_column_x, lower_y_border];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 2,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 4) * 2,
                ]
            : [second_column_x, lower_y_border + centers_array[i][2][0] / 3];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 3,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 4) * 3,
                ]
            : [second_column_x, lower_y_border + centers_array[i][2][0]];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, lower_y_border + centers_array[i][2][0]]
              : [first_column_x, lower_y_border + centers_array[i][2][0]]
            : [first_column_x, lower_y_border + centers_array[i][2][0]];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  first_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 2,
                ]
              : [
                  first_column_x,
                  lower_y_border + (centers_array[i][2][0] / 4) * 2,
                ]
            : [first_column_x, lower_y_border + centers_array[i][2][0] / 3];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, lower_y_border]
              : [first_column_x, lower_y_border]
            : [first_column_x, lower_y_border];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        6,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(6, planets_coords);
      this.draw_contour(6, planets_coords, centers_array[i][2][0], 80);
    }

    //5 планет
    if (centers_array[i][0].length === 5) {
      //5 планет рисуются либо прямоугольно, 3 спереди 2 сзади внизу 120
      // либо 3 спереди одна сзади и одна сзади вверх 160
      // либо 3 спереди и 2 сзади вверху и внизу 200

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  center_center - (centers_array[i][2][0] / 5) * 2,
                ]
              : [
                  second_column_x,
                  center_center - (centers_array[i][2][0] / 4) * 2,
                ]
            : [
                second_column_x,
                center_center - (centers_array[i][2][0] / 3) * 2,
              ];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [second_column_x, center_center - centers_array[i][2][0] / 5]
              : [second_column_x, center_center - centers_array[i][2][0] / 4]
            : [second_column_x, center_center - centers_array[i][2][0] / 3];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 5 - 40,
                ]
              : [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 4 - 40,
                ]
            : [
                second_column_x,
                center_center + centers_array[i][2][0] / 3 - 40,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  first_column_x,
                  center_center + (centers_array[i][2][0] / 5) * 2 - 40,
                ]
              : [
                  first_column_x,
                  center_center + centers_array[i][2][0] / 4 - 40,
                ]
            : [first_column_x, center_center + centers_array[i][2][0] / 3 - 40];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  first_column_x,
                  center_center - (centers_array[i][2][0] / 5) * 3,
                ]
              : [
                  first_column_x,
                  center_center - (centers_array[i][2][0] / 4) * 3,
                ]
            : [first_column_x, center_center - centers_array[i][2][0] / 3];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? (centers_array[i][2][0] / 5) * 3
              : (centers_array[i][2][0] / 4) * 3
            : (centers_array[i][2][0] / 3) * 2) -
          gap_between_centers;

        lower_y_border =
          lower_y_border + (centers_array[i][2][1] === "vertical")
            ? centers_array[i][2][0] === 200
              ? (centers_array[i][2][0] / 5) * 2
              : (centers_array[i][2][0] / 4) * 2
            : centers_array[i][2][0] / 3 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 4,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 4) * 3,
                ]
            : [second_column_x, upper_y_border - centers_array[i][2][0]];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 3,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 4) * 2,
                ]
            : [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 3) * 2,
              ];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 2,
                ]
              : [second_column_x, upper_y_border - centers_array[i][2][0] / 4]
            : [second_column_x, upper_y_border - centers_array[i][2][0] / 3];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, upper_y_border - centers_array[i][2][0] / 5]
              : [first_column_x, upper_y_border - centers_array[i][2][0] / 4]
            : [first_column_x, upper_y_border - centers_array[i][2][0] / 3];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, upper_y_border - centers_array[i][2][0]]
              : [first_column_x, upper_y_border - centers_array[i][2][0]]
            : [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 3) * 2,
              ];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [second_column_x, lower_y_border + centers_array[i][2][0] / 5]
              : [second_column_x, lower_y_border + centers_array[i][2][0] / 4]
            : [second_column_x, lower_y_border];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 2,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 4) * 2,
                ]
            : [second_column_x, lower_y_border + centers_array[i][2][0] / 3];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 3,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 4) * 3,
                ]
            : [second_column_x, lower_y_border + centers_array[i][2][0]];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, lower_y_border + centers_array[i][2][0]]
              : [first_column_x, lower_y_border + centers_array[i][2][0]]
            : [first_column_x, lower_y_border + centers_array[i][2][0]];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, lower_y_border]
              : [first_column_x, lower_y_border]
            : [first_column_x, lower_y_border + centers_array[i][2][0] / 3];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        5,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(5, planets_coords);
      this.draw_contour(5, planets_coords, centers_array[i][2][0], 80);
    }

    //4 планеты
    if (centers_array[i][0].length === 4) {
      //4 планеты рисуются либо квадратно, либо левые выше и ниже
      // и от этого зависит высота 80 или 120 или 160
      // 120 одна сзади рисуется вверх

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу

      /*
            console.log(centers_array[i][2][1]);
            console.log(centers_array[i][2][0]);
            console.log(formula_array["pluto"].point_to_planet);
            console.log(formula_array["pluto"].orbit);
            console.log(formula_array["earth"].point_to_planet);
            console.log(formula_array["earth"].orbit);
            */

      if (upper_y_border === lower_y_border) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [second_column_x, center_center - centers_array[i][2][0] / 4]
              : [second_column_x, center_center - centers_array[i][2][0] / 3]
            : [second_column_x, center_center - centers_array[i][2][0] / 2];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 4 - 40,
                ]
              : [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 3 - 40,
                ]
            : [
                second_column_x,
                center_center + centers_array[i][2][0] / 2 - 40,
              ];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [
                  first_column_x,
                  center_center + centers_array[i][2][0] / 2 - 40,
                ]
              : [
                  first_column_x,
                  center_center + centers_array[i][2][0] / 3 - 40,
                ]
            : [first_column_x, center_center + centers_array[i][2][0] / 2 - 40];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [first_column_x, center_center - centers_array[i][2][0] / 2]
              : [
                  first_column_x,
                  center_center - (centers_array[i][2][0] / 3) * 2,
                ]
            : [first_column_x, center_center - centers_array[i][2][0] / 2];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? centers_array[i][2][0] / 2
              : (centers_array[i][2][0] / 3) * 2
            : centers_array[i][2][0] / 2) -
          gap_between_centers;

        lower_y_border =
          lower_y_border +
          (centers_array[i][2][1] === "vertical" &&
            centers_array[i][2][0] === 120)
            ? centers_array[i][2][0] / 3
            : centers_array[i][2][0] / 2 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 4) * 3,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 3) * 2,
                ]
            : [second_column_x, upper_y_border - centers_array[i][2][0] / 2];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [
                  second_column_x,
                  upper_y_border - centers_array[i][2][0] / 4 - 40,
                ]
              : [
                  second_column_x,
                  upper_y_border - centers_array[i][2][0] / 3 - 40,
                ]
            : [second_column_x, upper_y_border - 40];

        planets_coords[2] = [first_column_x, upper_y_border - 40];

        planets_coords[3] = [
          first_column_x,
          upper_y_border - centers_array[i][2][0],
        ];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [second_column_x, lower_y_border + centers_array[i][2][0] / 4]
              : [second_column_x, lower_y_border + centers_array[i][2][0] / 3]
            : [second_column_x, lower_y_border];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 4) * 3 - 40,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 3) * 2,
                ]
            : [second_column_x, lower_y_border + centers_array[i][2][0] - 40];

        planets_coords[2] = [
          second_column_x,
          lower_y_border + centers_array[i][2][0] - 40,
        ];

        planets_coords[2] = [second_column_x, lower_y_border];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        4,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(4, planets_coords);
      this.draw_contour(4, planets_coords, centers_array[i][2][0], 80);
    }

    //3 планеты
    if (centers_array[i][0].length === 3) {
      //3 планеты рисуются либо квадратно, либо левая выше
      // и от этого зависит высота 80 (horizontal) или
      // 120 (vertical)

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, center_center - centers_array[i][2][0] / 3]
            : [second_column_x, center_center - centers_array[i][2][0] / 2];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, center_center + centers_array[i][2][0] / 3 - 40]
            : [
                second_column_x,
                center_center + centers_array[i][2][0] / 2 - 40,
              ];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, center_center - (centers_array[i][2][0] / 3) * 2]
            : [first_column_x, center_center + centers_array[i][2][0] / 2 - 40];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][1] === "vertical"
            ? (centers_array[i][2][0] / 3) * 2
            : centers_array[i][2][0] / 2) -
          gap_between_centers;
        lower_y_border =
          lower_y_border + centers_array[i][2][0] / 2 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 3) * 2,
              ]
            : [second_column_x, upper_y_border - centers_array[i][2][0]];

        planets_coords[1] = [second_column_x, upper_y_border - 40];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, upper_y_border - centers_array[i][2][0]]
            : [first_column_x, upper_y_border - 40];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, lower_y_border + centers_array[i][2][0] / 3]
            : [second_column_x, lower_y_border];
        planets_coords[1] = [
          second_column_x,
          lower_y_border + centers_array[i][2][0] - 40,
        ];
        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, lower_y_border]
            : [first_column_x, lower_y_border + centers_array[i][2][0] - 40];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        3,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(3, planets_coords);
      this.draw_contour(3, planets_coords, centers_array[i][2][0], 80);
    }

    //2 планеты
    if (centers_array[i][0].length === 2) {
      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, center_center - centers_array[i][2][0] / 2]
            : [second_column_x, center_center - 20];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, center_center + centers_array[i][2][0] / 2 - 40]
            : [first_column_x, center_center - 20];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] / 2 - gap_between_centers;
        lower_y_border =
          lower_y_border + centers_array[i][2][0] / 2 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, upper_y_border - centers_array[i][2][0]]
            : [second_column_x, upper_y_border - 40];
        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, upper_y_border - 40]
            : [first_column_x, upper_y_border - 40];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] = [second_column_x, lower_y_border];
        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, lower_y_border + centers_array[i][2][0] - 40]
            : [first_column_x, lower_y_border];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        2,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(2, planets_coords);
      this.draw_contour(
        2,
        planets_coords,
        centers_array[i][2][0],
        centers_array[i][2][1] === "vertical" ? 20 : 80
      );
    }

    //1 планета
    if (centers_array[i][0].length === 1) {
      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] = [
          second_column_x,
          center_center - centers_array[i][2][0] / 2,
        ];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] / 2 - gap_between_centers;
        lower_y_border =
          lower_y_border + centers_array[i][2][0] / 2 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] = [
          second_column_x,
          upper_y_border - centers_array[i][2][0],
        ];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] = [second_column_x, lower_y_border];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      // console.log(centers_array[i][0][0]);
      this.draw_many_planets(
        1,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_contour(1, planets_coords, 30, 30);
    }
  }

  // console.log(this.planets_full_info);

  //при высоте в 480 у нас есть столбики, состоящие из 12 квадратов по вертикали каждый
  // 10 столбиков вправо и 1 столбик, дублирующий орбиту меркурия влево
  // если квадрат true, значит он уже занят планетой
  //от 1 до 10 орбиты
  //0-ой элемент - дублирующая орбита
  let occupied_arr = [];
  for (let i = 0; i < 11; i++) {
    occupied_arr[i] = [];

    for (let k = 0; k < 12; k++) {
      occupied_arr[i][k] = false;
    }
  }

  // console.log( occupied_arr);

  pers_x = second_column_x;
  const gap_between_orbits = 60;

  //console.log(centers_array.length);
  //console.log(`------`);

  //основной цикл для рисования планет на орбитах
  //рисуем орбиты, отталкиваясь от центров
  for (let i = 0; i < centers_array.length; i++) {
    for (let k = 0; k < centers_array[i][1]; k++) {
      while (this.find_next_planet(centers_array[i][0][k], formula_array)) {
        let next_planet = this.find_next_planet(
          centers_array[i][0][k],
          formula_array
        );
        let prev_planet = this.find_prev_planet(
          centers_array[i][0][k],
          formula_array
        );

        while (true) {
          //console.log(`next_planet = ${next_planet}`);
          //console.log(`prev_planet = ${prev_planet}`);

          if (next_planet) {
            prev_planet = next_planet;

            let y_square = NaN;
            let orbit = formula_array[next_planet].orbit;
            let points_to = formula_array[next_planet].point_to_planet;

            if (orbit === 1) {
              //возможность нарисовать планету слева
              let left_side = true;

              let center_number = formula_array[points_to].center_number;

              //проверяем для сдвоенного центра, если планета в центра стоит во втором ряду, то налево уже не нарисовать
              if (
                centers_array[center_number][1] === 2 &&
                centers_array[center_number][2][0] === 40 &&
                this.planets_full_info[points_to].x === second_column_x
              ) {
                left_side = false;
              }

              //проверяем для остальных центров, если планета в центра стоит во втором ряду, то налево уже не нарисовать
              if (
                centers_array[center_number][1] > 2 &&
                this.planets_full_info[points_to].x === second_column_x
              ) {
                left_side = false;
              }

              //проверяем, возможно на эту планету больше никакая другая не указывает, тогда ставим ее слева
              for (let key in formula_array) {
                if (next_planet === formula_array[key].point_to_planet) {
                  left_side = false;
                  break;
                }
              }

              if (left_side) {
                //определяем в каком квадрате рисовать
                y_square = Math.ceil(
                  (this.planets_full_info[points_to].y - start_center_y) /
                    (vertical_size / 12)
                );
                //console.log(y_square);
                //console.log(formula_array[key].point_to_planet);

                if (occupied_arr[0][y_square]) {
                  for (let inc = 1; inc < 3; inc++) {
                    if (
                      y_square + inc < 12 &&
                      !occupied_arr[0][y_square + inc]
                    ) {
                      y_square += inc;
                      break;
                    }
                    if (
                      y_square - inc > 0 &&
                      !occupied_arr[0][y_square - inc]
                    ) {
                      y_square -= inc;
                      break;
                    }
                  }
                }

                if (!occupied_arr[0][y_square]) {
                  occupied_arr[0][y_square] = true;

                  let planets_coords = [
                    [
                      pers_x - gap_between_orbits * 2,
                      (vertical_size / 12) * y_square + start_center_y,
                    ],
                    [
                      this.planets_full_info[points_to].x,
                      this.planets_full_info[points_to].y,
                    ],
                  ];

                  this.draw_many_planets(
                    1,
                    [next_planet],
                    planets_coords,
                    formula_array
                  );
                  this.draw_arrow(
                    planets_coords[0][0],
                    planets_coords[0][1],
                    planets_coords[1][0],
                    planets_coords[1][1]
                  );
                } else {
                  left_side = false;
                }
              }

              if (!left_side) {
                //определяем в каком квадрате рисовать
                y_square = Math.ceil(
                  (this.planets_full_info[points_to].y - start_center_y) /
                    (vertical_size / 12)
                );
                //console.log(y_square);
                //console.log(formula_array[key].point_to_planet);

                if (occupied_arr[orbit][y_square]) {
                  for (let inc = 1; inc < 12; inc++) {
                    if (
                      y_square + inc < 12 &&
                      !occupied_arr[orbit][y_square + inc]
                    ) {
                      y_square += inc;
                      break;
                    }
                    if (
                      y_square - inc > 0 &&
                      !occupied_arr[orbit][y_square - inc]
                    ) {
                      y_square -= inc;
                      break;
                    }
                  }
                }

                if (!occupied_arr[orbit][y_square]) {
                  occupied_arr[orbit][y_square] = true;

                  let planets_coords = [
                    [
                      pers_x + gap_between_orbits * orbit,
                      (vertical_size / 12) * y_square + start_center_y,
                    ],
                    [
                      this.planets_full_info[points_to].x,
                      this.planets_full_info[points_to].y,
                    ],
                  ];
                  //                            console.log(key);
                  //                            console.log(planets_coords);
                  //                            console.log(planets_coords[0][0]);
                  //                            console.log(planets_coords[0][1]);
                  this.draw_many_planets(
                    1,
                    [next_planet],
                    planets_coords,
                    formula_array
                  );
                  this.draw_arrow(
                    planets_coords[0][0],
                    planets_coords[0][1],
                    planets_coords[1][0],
                    planets_coords[1][1]
                  );
                } else {
                  throw "not enough space on the 1st orbit";
                }
              }

              // orbit !== 1
            } else {
              //определяем в каком квадрате рисовать
              y_square = Math.ceil(
                (this.planets_full_info[points_to].y - start_center_y) /
                  (vertical_size / 12)
              );
              //console.log(y_square);
              //console.log(formula_array[key].point_to_planet);

              if (occupied_arr[orbit][y_square]) {
                for (let inc = 1; inc < 12; inc++) {
                  if (
                    y_square + inc < 12 &&
                    !occupied_arr[orbit][y_square + inc]
                  ) {
                    y_square += inc;
                    break;
                  }
                  if (
                    y_square - inc > 0 &&
                    !occupied_arr[orbit][y_square - inc]
                  ) {
                    y_square -= inc;
                    break;
                  }
                }
              }

              if (!occupied_arr[orbit][y_square]) {
                occupied_arr[orbit][y_square] = true;

                let planets_coords = [
                  [
                    pers_x + gap_between_orbits * orbit,
                    (vertical_size / 12) * y_square + start_center_y,
                  ],
                  [
                    this.planets_full_info[points_to].x,
                    this.planets_full_info[points_to].y,
                  ],
                ];
                //                            console.log(key);
                //                            console.log(planets_coords);
                //                            console.log(planets_coords[0][0]);
                //                            console.log(planets_coords[0][1]);
                this.draw_many_planets(
                  1,
                  [next_planet],
                  planets_coords,
                  formula_array
                );
                this.draw_arrow(
                  planets_coords[0][0],
                  planets_coords[0][1],
                  planets_coords[1][0],
                  planets_coords[1][1]
                );
              } else {
                throw "not enough space on the orbit !!!!";
              }
            }

            next_planet = this.find_next_planet(next_planet, formula_array);
          } else {
            prev_planet = this.find_prev_planet(prev_planet, formula_array);

            if (prev_planet) {
              next_planet = this.find_next_planet(prev_planet, formula_array);
            } else {
              break;
            }
          }
        }
      }
    }
  }
};

DrawFormulaClass.prototype.saveIMG = function () {
  const doctype =
    '<?xml version="1.0" standalone="no"?>' +
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

  // serialize our SVG XML to a string.
  const source = new XMLSerializer().serializeToString(d3.select("svg").node());

  // create a file blob of our SVG.
  const blob = new Blob([doctype + source], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = window.URL.createObjectURL(blob);

  // Put the svg into an image tag so that the Canvas element can read it in.
  const img = d3
    .select("body")
    .append("img")
    .attr("width", svg.attr("width"))
    .attr("height", svg.attr("height"))
    .node();

  img.onload = function () {
    // Now that the image has loaded, put the image into a canvas element.
    const canvas = d3.select("body").append("canvas").node();
    canvas.width = svg.attr("width");
    canvas.height = svg.attr("height");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const canvasUrl = canvas.toDataURL("image/png");
    const img2 = d3
      .select("body")
      .append("img")
      .attr("width", svg.attr("width"))
      .attr("height", svg.attr("height"))
      .node();

    // this is now the base64 encoded version of our PNG! you could optionally
    // redirect the user to download the PNG by sending them to the url with

    // `window.location.href= canvasUrl`.
    img2.src = canvasUrl;

    /*
        const dlLink = document.createElement('a');
        dlLink.download = "RR";
        dlLink.href = canvasUrl;
        dlLink.dataset.downloadurl = ["image/png", dlLink.download, dlLink.href].join(':');
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
*/

    // Or you might want to download the image
    // I did not use this method, so you might want to refine it a bit
    //window.location.href = canvasUrl.replace("image/png", "image/octet-stream");
  };
  // start loading the image.
  img.src = url;
  //window.location.href = url.replace("image/png", "image/octet-stream");

  /*

     */
};

DrawFormulaClass.prototype.draw_transitInfText = function () {
  let pers_x = 10;
  let pers_y = 20;

  //Name
  let name = "Transit calculation.";
  this.appendText(10, 20, `${name}`);
  pers_y += 20;

  //date and time
  let [d_year, d_month, d_day, d_hour, d_minute, d_second] = transits.time_UTC;
  let date_text = `${d_hour}:${d_minute}:${d_second} ${d_day}.${d_month}.${d_year}`;
  this.appendText(pers_x, pers_y, `UTC: ${date_text}`);

  //Planets
  let planet_text = ``;

  //PERSONALITY
  pers_x = svg.attr("width") - 10;
  pers_y = 100;

  this.appendText(pers_x, pers_y, `Personality:`, "black", "end");
  pers_y += 30;

  planet_text = `Sun: ${transits.sun.hex}.${Math.ceil(transits.sun.line)}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Earth: ${transits.earth.hex}.${Math.ceil(
    transits.earth.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Moon: ${transits.moon.hex}.${Math.ceil(transits.moon.line)}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `N.Node ${transits.north_node.hex}.${Math.ceil(
    transits.north_node.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `S.Node: ${transits.south_node.hex}.${Math.ceil(
    transits.south_node.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Mercury: ${transits.mercury.hex}.${Math.ceil(
    transits.mercury.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Venus: ${transits.venus.hex}.${Math.ceil(
    transits.venus.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Mars: ${transits.mars.hex}.${Math.ceil(transits.mars.line)}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Jupiter: ${transits.jupiter.hex}.${Math.ceil(
    transits.jupiter.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Saturn: ${transits.saturn.hex}.${Math.ceil(
    transits.saturn.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Uranus: ${transits.uranus.hex}.${Math.ceil(
    transits.uranus.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Neptune: ${transits.neptune.hex}.${Math.ceil(
    transits.neptune.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Pluto: ${transits.pluto.hex}.${Math.ceil(
    transits.pluto.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
};
//функция висит на кнопке Calc.Transit
DrawFormulaClass.prototype.draw_Transit = function () {
  this.draw_transitInfText();

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

  delete transits.north_node_swe;
  delete transits.south_node_swe;
  delete transits.time_UTC;

  for (let key in transits) {
    gates[transits[key].hex] = "black";
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
    if (gates[50]) this.draw_50_27(6, gates[50]);
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

// const drawFormula = new DrawFormulaClass();

// drawFormula.drawWhiteFormula();

// drawFormula.x = width + width / 2;
// drawFormula.init();
// drawFormula.drawWhiteFormula();
// drawFormula.x = 2 * width + width / 2;
// drawFormula.init();
// drawFormula.drawWhiteFormula();

//document.getElementById("calc_button").disabled = true;
//document.getElementById("img_button").disabled = true;
