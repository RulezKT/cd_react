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

DrawFormulaClass.prototype.drawNumerology = function () {
  svg
    .append("rect")
    .attr("height", `${height}`)
    .attr("width", `${width}`)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "#D3D3D3")
    .attr("stroke", "#000000");

  //координаты для текста
  this.pers_x = this.x - width / 2;
  this.pers_y = this.y;

  let num_x = this.pers_x;
  let num_y = this.pers_y;

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
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Matrix code: ${formula.numerology.matrix_code}. Soul level now/past life: ${formula.numerology.soul_level}/${formula.numerology.soul_level_past_life}.`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Planetary task: ${formula.numerology.planetary_task}. Social task: ${formula.numerology.social_task}. Karmic task: ${formula.numerology.karmic_task}.`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Meta Cycles: [${formula.numerology.mc1}].[${formula.numerology.mc2}].[${formula.numerology.mc3}].`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Meta tasks: [${formula.numerology.mc1_task}].[${formula.numerology.mc2_task}].[${formula.numerology.mc3_task}].Whole life task: ${formula.numerology.mc_whole_life_task}. Mc2 optional task: ${formula.numerology.mc2_optional_task}`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;

  numerology_text = `Opv: ${formula.numerology.opv}. Tp: ${formula.numerology.tp}. `;
  if (formula.numerology.opv2)
    numerology_text += ` Opv2: ${formula.numerology.opv2}.`;
  appendText(svg, num_x, num_y, numerology_text, "black", "start");
  num_y += 30;
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
