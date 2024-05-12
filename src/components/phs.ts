export const environment = (color: number, tone: number) => {
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
  const colors = [
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

export const nutrition = function (color: number, tone: number) {
  //6 colors, 0 element is reserved
  //6 tones, 0 element is reserved
  const colors = [
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
  const colors_theme = [
    NaN,
    "Apetite",
    "Taste",
    "Thirst",
    "Touch",
    "Sound",
    "Light",
  ];

  //cognition
  const cognition = [
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

export const motivation = function (color: number, tone: number) {
  const colors = [
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

export const perspective = function (color: number, tone: number) {
  const colors = [
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
