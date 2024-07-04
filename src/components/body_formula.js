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



}



DrawFormulaClass.prototype.drawWhiteIntegration = function () {

  const x = 118;
  const y = 160;

  let points = [
    {
      x: x,
      y: y,
    },
    //57th
    {
      x: x - 90,
      y: y + 154,
    },
    {
      x: x - 84,
      y: y + 162,
    },
    //corner to 34th from downside
    {
      x: x - 64,
      y: y + 130,
    },

    //34th
    {
      x: x + 8,
      y: y + 182,
    },

    {
      x: x + 10,
      y: y + 174,
    },
    //corner to 34th from upside
    {
      x: x - 58,
      y: y + 120,
    },

    //corner to 10th from downside
    {
      x: x - 34,
      y: y + 76,
    },

    //10 th
    {
      x: x + 8,
      y: y + 80,
    },
    {
      x: x + 8,
      y: y + 70,
    },

    //20th
    {
      x: x - 28,
      y: y + 66,
    },

    {
      x: x + 4,
      y: y + 10,
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


function draw_20_short(type) {

  let rotation = -24;

  const x = 118;
  const y = 160;

  let points = [
    {
      x: x,
      y: y,
    },

    {
      x: x - 69,
      y: y + 49,
    },

    {
      x: x - 63,
      y: y + 56,
    },

    {
      x: x,
      y: y + 10,
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
        x: x + 5.5,
        y: y + 3.5,
      },

      {
        x: x - 66,
        y: y + 53,
      },

      {
        x: x - 62,
        y: y + 56,
      },

      {
        x: x + 5,
        y: y + 10,
      },
      {
        x: x + 3.5,
        y: y + 3.5,
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

function draw_20_long(type) {

  let rotation = -24;

  const x = 118;
  const y = 160;



  let points = [
    {
      x: x,
      y: y,
    },

    {
      x: x - 119,
      y: y + 85,
    },

    {
      x: x - 112,
      y: y + 94,
    },

    {
      x: x,
      y: y + 10,
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
        y: y + 3.5,
      },

      {
        x: x - 116,
        y: y + 89,
      },

      {
        x: x - 112,
        y: y + 94,
      },

      {
        x: x + 9,
        y: y + 10,
      },
      {
        x: x + 3.5,
        y: y + 3.5,
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



//type - black, red or 'both'
// variation - 1.drawing to 34th 2.drawing to 10th
DrawFormulaClass.prototype.draw_20_Integration = function (type, variation) {


  if (variation === 2) {
    draw_20_short(type)
    return
  }

  if (variation === 1) {
    draw_20_long(type)
    return
  }

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

  let rotation = -24;



  const x = 118;
  const y = 160;

  const length1 = 65;

  const width = 10;

  let i = 1;


  let top_left_half_x = x + 3.5;
  let top_left_half_y = y + 3.5;

  //variation - 1.drawing half to 34th
  rectangle20_var[1].bottom_right_x = x - 112;
  rectangle20_var[1].bottom_right_y = y + length1 + 30;
  rectangle20_var[1].bottom_left_x = x - 119;
  rectangle20_var[1].bottom_left_y = y + length1 + 12 + 8;
  rectangle20_var[1].bottom_left_half_x = x - 120;
  rectangle20_var[1].bottom_left_half_y = y + length1 + 12;

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
      y: rectangle20_var[i].bottom_right_y - 1,
    },

    {
      x: x + width,
      y: y + 10,
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
        x: top_left_half_x + 2,
        y: top_left_half_y,
      },

      {
        x: rectangle20_var[i].bottom_left_half_x + 2,
        y: rectangle20_var[i].bottom_left_half_y - 1,
      },

      {
        x: rectangle20_var[i].bottom_right_x,
        y: rectangle20_var[i].bottom_right_y - 1,
      },

      {
        x: x + 9,
        y: y + 10,
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
  let x = 46
  let y = 284

  let points = [
    {
      x: x,
      y: y,
    },
    {
      x: x + 92,
      y: y + 31,
    },
    {
      x: x + 88,
      y: y + 22,
    },
    {
      x: x + 2,
      y: y - 12,
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
        y: y - 6,
      },


      {
        x: x + 90,
        y: y + 26,
      },

      {
        x: x + 88,
        y: y + 23,
      },


      {
        x: x + 2 + 1,
        y: y - 11,
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
  let x = 46
  let y = 284

  let points = [
    {
      x: x,
      y: y,
    },
    {
      x: x + 92,
      y: y + 31,
    },
    {
      x: x + 88,
      y: y + 22,
    },
    {
      x: x + 12,
      y: y - 11,
    },
    // long part
    {

      x: x + 25,
      y: y - 71,

    },

    {
      x: x + 16,
      y: y - 70,

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
        x: x + 92,
        y: y + 28,
      },

      {
        x: x + 88,
        y: y + 22,
      },


      {
        x: x + 12,
        y: y - 11,
      },
      // long part

      {

        x: x + 25,
        y: y - 71,

      },


      {
        x: x + 20,
        y: y - 70,

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
  let rotation = 37

  const x = 28;
  const y = 316;

  const width = 10;
  const half_width = width / 2;

  const length1 = 50;

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
      y: y,
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
        x: x - 1,
        y: y - length1 + 1,
      },

      {
        x: x + 5,
        y: y - length1 + 2,
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
  let rotation = 33

  const x = 28;
  const y = 316

  const width = 10;
  const half_width = width / 2;

  const length1 = 113;

  points = [
    {
      x: x,
      y: y,
    },

    {
      x: x - 7,
      y: y - length1 + 4,
    },

    {
      x: x + 3,
      y: y - length1 + 1,
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
        y: y - length1 + 4,
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

  const x = 116
  const y = 238

  const width = 10;
  const half_width = width / 2;
  const length = 36;
  const rotation = 22;



  let points = [
    {
      x: x,
      y: y,
    },

    {
      x: x - length + 6,
      y: y + 9,
    },

    {
      x: x - length + 8,
      y: y - width + 6,
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

    points[2].y = y - half_width + 6
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
  // console.log("Inside drawIntegration")
  // this.draw_34_Integration("both", 2);
  // this.draw_10_Integration("both", 1);
  // this.draw_20_Integration("both", 1);
  // this.draw_57_Integration("both", 2);

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

  const x = 30;
  const y = 393;

  const length = 130

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


  data.rotation = -46;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_28_38 = function (gate, type) {
  const x = 48;
  const y = 384;

  const length = 110

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

  data.rotation = -44;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_32_54 = function (gate, type) {
  const x = 56;
  const y = 366;

  const length = 100

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

  data.rotation = -44;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_50_27 = function (gate, type) {
  const x = 90;
  const y = 360;

  const length = 34

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


  data.rotation = -88;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_30_41 = function (gate, type) {

  const x = 300;
  const y = 384;

  const length = 136


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

  data.rotation = 48;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_55_39 = function (gate, type) {
  const x = 282;
  const y = 378;

  const length = 114


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
  const x = 270;
  const y = 368;

  const length = 96


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
  const y = 352;

  const length = 46


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


  data.rotation = 88;
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
  const x = 204;
  const y = 290;

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
  if (gate === 26) data.gate = "top";
  if (gate === 44) data.gate = "bottom";

  data.rotation = 77.5;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_16_48 = function (gate, type) {

  const x = 120;
  const y = 130;

  let length = 208;

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

  data.rotation = 33;
  this.draw_vertical_channel_with_rotation(data);
};
DrawFormulaClass.prototype.draw_42_53 = function (gate, type) {
  let x = 140
  let y = 380
  let length = 30;

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
  let y = 380
  let length = 30;

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
  let y = 380
  let length = 30;

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
  stroke,
  contour_data,
) {
  //Если центр определен, сделать черную окантовку
  let tmp_stroke = fill !== "white" ? "black" : stroke;

  centre_group
    .append("path")
    .attr("d", lineFunction(centre_data))
    .attr("stroke", tmp_stroke)
    .attr("fill", fill || stroke);

  if (contour_data && contour_data.length > 0) {
    // console.log(contour_data)

    centre_group
      .append("g")
      .selectAll("circle")
      .data(contour_data)
      .enter()
      .append("circle")
      .attr("cx", (d) => d[0])
      .attr("cy", (d) => d[1])
      .attr("r", 9)
      .attr('stroke', 'black')
      .attr('fill', '#09ed7f');
  }

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

DrawFormulaClass.prototype.drawHead340 = function (gates, fill) {
  let x = 130
  let y = 20

  const headCentreData = [
    { x: x, y: y },
    {
      x: x + 70,
      y: y
    },
    {
      x: x + 70,
      y: y + 20,
    },
    {
      x: x,
      y: y + 20,
    },
    { x: x, y: y },
  ];


  const headTextData = [
    {
      x: x + 8,
      y: y + 15,
      text: "64",
    },
    {
      x: x + 29,
      y: y + 15,
      text: "61",
    },
    {
      x: x + 50,
      y: y + 15,
      text: "63",
    },
  ];

  const contourData = [
  ]
  gates[64] && contourData.push([headTextData[0].x + 7.5, headTextData[0].y - 3])
  gates[61] && contourData.push([headTextData[1].x + 6, headTextData[1].y - 4])
  gates[63] && contourData.push([headTextData[2].x + 6, headTextData[2].y - 4])


  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    headCentreData,
    headTextData,
    fill,
    "#9400D3",
    contourData
  );
};
DrawFormulaClass.prototype.drawAjna340 = function (gates, fill) {
  let x = 132
  let y = 99
  const ajnaCentreData = [
    { x: x, y: y },
    {
      x: x + 68,
      y: y,
    },
    {
      x: x + 68,
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
      x: x + 6,
      y: y - 28,
      text: "47",
    },
    {
      x: x + 28,
      y: y - 28,
      text: "24",
    },
    {
      x: x + 52,
      y: y - 28,
      text: "4",
    },
    {
      x: x + 6,
      y: y - 4,
      text: `17`,
    },


    {
      x: x + 27,
      y: y - 6,
      text: "43",
    },
    {
      x: x + 50,
      y: y - 4,
      text: "11",
    },
  ];

  const contourData = [
  ]
  gates[47] && contourData.push([ajnaTextData[0].x + 7.5, ajnaTextData[0].y - 3])
  gates[24] && contourData.push([ajnaTextData[1].x + 6, ajnaTextData[1].y - 4])
  gates[4] && contourData.push([ajnaTextData[2].x + 4, ajnaTextData[2].y - 4])
  gates[17] && contourData.push([ajnaTextData[3].x + 7.5, ajnaTextData[3].y - 4])
  gates[43] && contourData.push([ajnaTextData[4].x + 7, ajnaTextData[4].y - 5])
  gates[11] && contourData.push([ajnaTextData[5].x + 6, ajnaTextData[5].y - 4])

  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    ajnaCentreData,
    ajnaTextData,
    fill,
    // "#0000FF"
    "#3275a8",
    contourData
  );
};
DrawFormulaClass.prototype.drawThroat340 = function (gates, fill) {

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
      x: x + 20,
      y: y + 13,
      text: "62",
    },
    {
      x: x + 39,
      y: y + 13,
      text: "23",
    },
    {
      x: x + 62,
      y: y + 13,
      text: `56`,
    },

    {
      x: x + 20,
      y: y + 48,
      text: "31",
    },
    {
      x: x + 43,
      y: y + 50,
      text: "8",
    },
    {
      x: x + 64,
      y: y + 50,
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
      y: y + 50,
      text: "45",
    },

    {
      x: x + 1,
      y: y + 18,
      text: "16",
    },
    {
      x: x + 1,
      y: y + 40,
      text: "20",
    },
  ];

  const contourData = [

  ]
  gates[62] && contourData.push([throatTextData[0].x + 7.5, throatTextData[0].y - 3])
  gates[23] && contourData.push([throatTextData[1].x + 7, throatTextData[1].y - 2])
  gates[56] && contourData.push([throatTextData[2].x, throatTextData[2].y])
  gates[31] && contourData.push([throatTextData[3].x + 7, throatTextData[3].y - 4])
  gates[8] && contourData.push([throatTextData[4].x + 3.5, throatTextData[4].y - 6])
  gates[33] && contourData.push([throatTextData[5].x, throatTextData[5].y])
  gates[35] && contourData.push([throatTextData[6].x + 7, throatTextData[6].y - 2])
  gates[12] && contourData.push([throatTextData[7].x + 6.5, throatTextData[7].y - 4])
  gates[45] && contourData.push([throatTextData[8].x, throatTextData[8].y])
  gates[16] && contourData.push([throatTextData[9].x + 8, throatTextData[9].y - 4])
  gates[20] && contourData.push([throatTextData[10].x + 7, throatTextData[10].y - 3])


  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    throatCentreData,
    throatTextData,

    fill,
    "#40E0D0",
    contourData,
  );
};
DrawFormulaClass.prototype.drawG340 = function (gates, fill) {

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

  const contourData = [

  ]
  gates[7] && contourData.push([gTextData[0].x + 4.5, gTextData[0].y - 3])
  gates[1] && contourData.push([gTextData[1].x + 3, gTextData[1].y - 2])
  gates[13] && contourData.push([gTextData[2].x + 8, gTextData[2].y - 2])
  gates[10] && contourData.push([gTextData[3].x + 7, gTextData[3].y - 4])
  gates[25] && contourData.push([gTextData[4].x + 7, gTextData[4].y - 4])
  gates[15] && contourData.push([gTextData[5].x, gTextData[5].y])
  gates[46] && contourData.push([gTextData[6].x + 7, gTextData[6].y - 6])
  gates[2] && contourData.push([gTextData[7].x + 3, gTextData[7].y - 6])





  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    gCentreData,
    gTextData,
    fill,
    "#64E811",
    contourData
  );
};
DrawFormulaClass.prototype.drawSacral340 = function (gates, fill) {
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
      y: y + 28,
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


  const contourData = [

  ]
  gates[5] && contourData.push([sacralTextData[0].x + 4, sacralTextData[0].y - 3])
  gates[14] && contourData.push([sacralTextData[1].x + 7, sacralTextData[1].y - 2])
  gates[29] && contourData.push([sacralTextData[2].x + 7, sacralTextData[2].y - 2])
  gates[42] && contourData.push([sacralTextData[3].x + 7, sacralTextData[3].y - 6])
  gates[3] && contourData.push([sacralTextData[4].x + 3.5, sacralTextData[4].y - 6])
  gates[9] && contourData.push([sacralTextData[5].x + 4, sacralTextData[5].y - 6])
  gates[34] && contourData.push([sacralTextData[6].x + 7, sacralTextData[6].y - 3])
  gates[27] && contourData.push([sacralTextData[7].x + 6.5, sacralTextData[7].y - 4])
  gates[59] && contourData.push([sacralTextData[8].x, sacralTextData[8].y])




  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    sacralCentreData,
    sacralTextData,
    fill,
    "#F59713",
    contourData
  );
};
DrawFormulaClass.prototype.drawRoot340 = function (gates, fill) {
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
      text: "52",
    },

    {
      x: x + 6,
      y: y + 28.5,
      text: "54",
    },
    {
      x: x + 6,
      y: y + 50,
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

  const contourData = [

  ]
  gates[53] && contourData.push([rootTextData[0].x + 7.5, rootTextData[0].y - 3])
  gates[60] && contourData.push([rootTextData[1].x + 7, rootTextData[1].y - 2])
  gates[52] && contourData.push([rootTextData[2].x + 7, rootTextData[2].y - 2])
  gates[54] && contourData.push([rootTextData[3].x + 7, rootTextData[3].y - 4])
  gates[38] && contourData.push([rootTextData[4].x + 7, rootTextData[4].y - 4])
  gates[58] && contourData.push([rootTextData[5].x + 7, rootTextData[5].y - 6])
  gates[19] && contourData.push([rootTextData[6].x + 7, rootTextData[6].y - 2])
  gates[39] && contourData.push([rootTextData[7].x + 6.5, rootTextData[7].y - 4])
  gates[41] && contourData.push([rootTextData[8].x, rootTextData[8].y])




  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    rootCentreData,
    rootTextData,
    fill,
    "#F20C0C",
    contourData
  );
};

DrawFormulaClass.prototype.drawSpleen340 = function (gates, fill) {
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
      x: x + 38,
      y: y + 40,
      text: "44",
    },

    {
      x: x + 72,
      y: y + 60,
      text: "50",
    },
    {
      x: x + 54,
      y: y + 72,
      text: "32",
    },
    {
      x: x + 36,
      y: y + 82,
      text: "28",
    },

    {
      x: x + 18,
      y: y + 88,
      text: "18",
    },
  ];

  const contourData = [

  ]
  gates[48] && contourData.push([spleenTextData[0].x + 8, spleenTextData[0].y - 3])
  gates[57] && contourData.push([spleenTextData[1].x + 6, spleenTextData[1].y - 3])
  gates[44] && contourData.push([spleenTextData[2].x + 8, spleenTextData[2].y - 2])
  gates[50] && contourData.push([spleenTextData[3].x + 7, spleenTextData[3].y - 4])
  gates[32] && contourData.push([spleenTextData[4].x + 6, spleenTextData[4].y - 6])
  gates[28] && contourData.push([spleenTextData[5].x + 7, spleenTextData[5].y - 4])
  gates[18] && contourData.push([spleenTextData[6].x + 7, spleenTextData[6].y - 4])




  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    spleenCentreData,
    spleenTextData,
    fill,
    "#F20C0C",
    contourData
  );
};
DrawFormulaClass.prototype.drawEmo340 = function (gates, fill) {
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
      x: x - 68,
      y: y + 72,
      text: "49",
    },
    {
      x: x - 52,
      y: y + 80,
      text: "55",
    },

    {
      x: x - 36,
      y: y + 90,
      text: "30",
    },
  ];

  const contourData = [

  ]
  gates[6] && contourData.push([emoTextData[0].x + 7.5, emoTextData[0].y - 3])
  gates[37] && contourData.push([emoTextData[1].x + 7, emoTextData[1].y - 4])
  gates[22] && contourData.push([emoTextData[2].x + 6, emoTextData[2].y - 4])
  gates[36] && contourData.push([emoTextData[3].x + 7, emoTextData[3].y - 4])
  gates[49] && contourData.push([emoTextData[4].x + 7, emoTextData[4].y - 6])
  gates[55] && contourData.push([emoTextData[5].x + 7, emoTextData[5].y - 3])
  gates[30] && contourData.push([emoTextData[6].x + 7, emoTextData[6].y - 2])



  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    emoCentreData,
    emoTextData,
    fill,
    "#F59713",
    contourData
  );
};
DrawFormulaClass.prototype.drawEgo340 = function (gates, fill) {
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

  const contourData = [

  ]
  gates[21] && contourData.push([egoTextData[0].x + 7.5, egoTextData[0].y - 3])
  gates[51] && contourData.push([egoTextData[1].x + 7, egoTextData[1].y - 2])
  gates[26] && contourData.push([egoTextData[2].x + 7, egoTextData[2].y - 4])
  gates[40] && contourData.push([egoTextData[3].x + 7, egoTextData[3].y - 4])



  let centreGroup = svg.append("g");
  this.drawGenerator(
    centreGroup,
    egoCentreData,
    egoTextData,
    fill,
    "#F2F477",
    contourData
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

  this.drawCenters();
};

//PERSONALITY texts on screen
DrawFormulaClass.prototype.draw_pers_text = function () {
  let planet_text = "";

  let pers_x = 338 - 26;
  let pers_y = 38;

  // console.log(pers_x, pers_y);


  planet_text = `${this.pers_sun_short.hex}-.${this.pers_sun_short.line} - ${this.pers_sun_short.direction}${this.pers_sun_short.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");

  planet_text = `(${this.pers_earth_short.hex})`;
  appendTextPlanets(svg, pers_x + 26, pers_y, planet_text, "black", "end");

  planet_text = `-${this.pers_sun_short.line}.${this.pers_sun_short.color}.${this.pers_sun_short.tone}`;
  appendTextPlanets(svg, pers_x - 60, pers_y, planet_text, "black", "end");


  pers_y += 20;

  planet_text = `${this.pers_nnode_short.hex}-.${this.pers_nnode_short.line} - ${this.pers_nnode_short.direction}${this.pers_nnode_short.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");

  planet_text = `(${this.pers_snode_short.hex})`;
  appendTextPlanets(svg, pers_x + 26, pers_y, planet_text, "black", "end");


  planet_text = `-${this.pers_nnode_short.line}.${this.pers_nnode_short.color}.${this.pers_nnode_short.tone}`;
  appendTextPlanets(svg, pers_x - 60, pers_y, planet_text, "black", "end");


  pers_y += 30;

  pers_x = 338;

  planet_text = `${this.pers_moon_short.hex}-.${this.pers_moon_short.line} - ${this.pers_moon_short.direction
    }${this.pers_moon_short.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_mercury_short.hex}-.${this.pers_mercury_short.line} - ${this.pers_mercury_short.direction
    }${this.pers_mercury_short.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_venus_short.hex}-.${this.pers_venus_short.line} - ${this.pers_venus_short.direction
    }${this.pers_venus_short.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_mars_short.hex}-.${this.pers_mars_short.line} - ${this.pers_mars_short.direction
    }${this.pers_mars_short.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");


  planet_text = `-${this.pers_mars_short.line}.${this.pers_mars_short.color}.${this.pers_mars_short.tone}`;
  appendTextPlanets(svg, pers_x - 50, pers_y, planet_text, "black", "end");



  pers_y += 20;

  planet_text = `${this.pers_jupiter_short.hex}-.${this.pers_jupiter_short.line} - ${this.pers_jupiter_short.direction
    }${this.pers_jupiter_short.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_saturn_short.hex}-.${this.pers_saturn_short.line} - ${this.pers_saturn_short.direction
    }${this.pers_saturn_short.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_uranus_short.hex}-.${this.pers_uranus_short.line} - ${this.pers_uranus_short.direction
    }${this.pers_uranus_short.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_neptune_short.hex}-.${this.pers_neptune_short.line} - ${this.pers_neptune_short.direction
    }${this.pers_neptune_short.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `${this.pers_pluto_short.hex}.-${this.pers_pluto_short.line} - ${this.pers_pluto_short.direction
    }${this.pers_pluto_short.power}`;
  appendTextPlanets(svg, pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;
};
//DESIGN texts on screen
DrawFormulaClass.prototype.draw_des_text = function () {
  //DESIGN
  let des_x = 39;
  let des_y = 38;

  // console.log(des_x, des_y)



  let planet_text = "";


  planet_text = `${this.des_sun_short.hex}-.${this.des_sun_short.line} - ${this.des_sun_short.direction}${this.des_sun_short.power} `;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");

  planet_text = `(${this.des_earth_short.hex}) `;
  appendTextPlanets(svg, des_x + 26, des_y, planet_text, "red", "end");

  planet_text = `-${this.des_sun_short.line}.${this.des_sun_short.color}.${this.des_sun_short.tone}`;
  appendTextPlanets(svg, des_x + 60, des_y, planet_text, "red", "end");

  des_y += 20;

  planet_text = `${this.des_nnode_short.hex}-.${this.des_nnode_short.line} - ${this.des_nnode_short.direction}${this.des_nnode_short.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");


  planet_text = `(${this.des_snode_short.hex})`;
  appendTextPlanets(svg, des_x + 26, des_y, planet_text, "red", "end");


  planet_text = `-${this.des_nnode_short.line}.${this.des_nnode_short.color}.${this.des_nnode_short.tone}`;
  appendTextPlanets(svg, des_x + 60, des_y, planet_text, "red", "end");


  des_y += 30;

  planet_text = `${this.des_moon_short.hex}-.${this.des_moon_short.line} - ${this.des_moon_short.direction}${this.des_moon_short.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_mercury_short.hex}-.${this.des_mercury_short.line} - ${this.des_mercury_short.direction
    }${this.des_mercury_short.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_venus_short.hex}-.${this.des_venus_short.line

    } - ${this.des_venus_short.direction
    }${this.des_venus_short.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_mars_short.hex}-.${this.des_mars_short.line} - ${this.des_mars_short.direction}${this.des_mars_short.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");


  planet_text = `-${this.des_mars_short.line}.${this.des_mars_short.color}.${this.des_mars_short.tone}`;
  appendTextPlanets(svg, des_x + 30, des_y, planet_text, "red", "end");


  des_y += 20;

  planet_text = `${this.des_jupiter_short.hex}-.${this.des_jupiter_short.line

    } - ${this.des_jupiter_short.direction
    }${this.des_jupiter_short.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_saturn_short.hex}-.${this.des_saturn_short.line

    } - ${this.des_saturn_short.direction
    }${this.des_saturn_short.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_uranus_short.hex}-.${this.des_uranus_short.line

    } - ${this.des_uranus_short.direction
    }${this.des_uranus_short.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_neptune_short.hex}-.${this.des_neptune_short.line
    } - ${this.des_neptune_short.direction
    }${this.des_neptune_short.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;

  planet_text = `${this.des_pluto_short.hex}-.${this.des_pluto_short.line
    } - ${this.des_pluto_short.direction
    }${this.des_pluto_short.power}`;
  appendTextPlanets(svg, des_x, des_y, planet_text, "red", "end");
  des_y += 20;
};

//V2 2024
DrawFormulaClass.prototype.drawFormulaV2 = function (graph_type) {
  // this.init();
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

  let pers_x = 4;
  let pers_y = 13;
  // console.log(pers_x, pers_y);

  const loc = this.data_formula.time.pers_time_utc;
  const loc_time_str = `${loc.day}.${loc.month}.${loc.year} ${loc.hours}:${loc.minutes}`

  let type_text = typeShorten(this.data_formula.hd.generalInfo.type);
  let definition = defShorten(this.data_formula.hd.generalInfo.definition);
  let typeProfDef = `${type_text}.${this.data_formula.hd.specialInfo.profile}.${this.data_formula.hd.generalInfo.authority}.${definition}`;

  let planet_text = `${this.data_formula.name.slice(0, 10)}: ` + loc_time_str;
  appendText(svg, pers_x, pers_y, planet_text, "blue", "start", 12);



  planet_text = typeProfDef;
  appendText(svg, pers_x + 224, pers_y, planet_text, "blue", "start", 12);

  // pers_x = 100;
  // pers_y = 10;
  // const loc = this.data_formula.time.pers_time_utc;
  // const loc_time_str = `${loc.day}.${loc.month}.${loc.year} ${loc.hours}:${loc.minutes}`
  // appendText(svg, pers_x, pers_y, loc_time_str, "blue", "start", 12);



  pers_x = 270;
  pers_y = 470;
  let cross_text = `${this.data_formula.hd.specialInfo.cross.first}/${this.data_formula.hd.specialInfo.cross.second}|${this.data_formula.hd.specialInfo.cross.third}/${this.data_formula.hd.specialInfo.cross.fourth}`;
  appendText(svg, pers_x, pers_y, cross_text, "blue", "start", 12);

  pers_y = 486;
  pers_x = 280;
  let variable = `${this.data_formula.hd.specialInfo.variable}`;
  appendText(svg, pers_x, pers_y, variable, "blue", "start", 12);


  // pers_y = 486;
  // pers_x = 2;
  // let type_text = typeShorten(this.data_formula.hd.generalInfo.type);
  // let definition = defShorten(this.data_formula.hd.generalInfo.definition);
  // let typeProfDef = `${type_text}.${this.data_formula.hd.specialInfo.profile}.${this.data_formula.hd.generalInfo.authority}.${definition}`;
  // appendText(svg, pers_x, pers_y, typeProfDef, "black", "start", 12);

  let gates = [];


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


  this.draw_body(gates);
  return;
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

};

DrawFormulaClass.prototype.draw_Pers = function () {
  //this.draw_pers_text();
  this.draw_pers_text();

  let gates = [];



  //инициализируем ворота, отсчет от 1
  for (let i = 1; i <= 64; i++) {
    gates[i] = NaN;
  }

  for (let key in this.pers_short) {
    gates[this.pers_short[key].hex] = "black";
  }


  this.draw_body(gates);
  return;


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


  //инициализируем ворота, отсчет от 1
  for (let i = 1; i <= 64; i++) {
    gates[i] = NaN;
  }

  for (let key in this.design_short) {
    gates[this.design_short[key].hex] = "red";
  }


  this.draw_body(gates);
  return;

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


DrawFormulaClass.prototype.draw_body = function (gates) {

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

  this.drawCenters(centres, gates);


};


DrawFormulaClass.prototype.drawCenters = function (centres = {}, gates = {}) {

  centres.head ? this.drawHead340(gates) : this.drawHead340(gates, "white");
  centres.ajna ? this.drawAjna340(gates) : this.drawAjna340(gates, "white");
  centres.throat ? this.drawThroat340(gates) : this.drawThroat340(gates, "white");
  centres.g ? this.drawG340(gates) : this.drawG340(gates, "white");
  centres.sacral ? this.drawSacral340(gates) : this.drawSacral340(gates, "white");
  centres.root ? this.drawRoot340(gates) : this.drawRoot340(gates, "white");
  centres.spleen ? this.drawSpleen340(gates) : this.drawSpleen340(gates, "white");
  centres.ego ? this.drawEgo340(gates) : this.drawEgo340(gates, "white");
  centres.emo ? this.drawEmo340(gates) : this.drawEmo340(gates, "white");

}