type Planet = {
  longitude: number;
  name: string[];
  hex: number;
  line: number;
  color: number;
  tone: number;
  base: number;
  number_of_passed_degrees: number;
  power: number;
  direction: string;
  textdegree: string;
  zodiac: string;
  orbit: 1;
  point_to_planet: string;
};

type Planets = {
  sun: Planet;
  earth: Planet;
  moon: Planet;
  north_node: Planet;
  south_node: Planet;
  mercury: Planet;
  venus: Planet;
  mars: Planet;
  jupiter: Planet;
  saturn: Planet;
  uranus: Planet;
  neptune: Planet;
  pluto: Planet;
  north_node_swe: Planet;
  south_node_swe: Planet;
};

export type Formula = {
  personality: Planets;
  design: Planets;
  eps_pers: number;
  eps_des: number;
  exp: {
    personality: Planets;
    design: Planets;
  };
  personality_time_local: string[];
  personality_time_UTC: string[];
  design_time_UTC: string[];
  per_centers: [[[Array], 2]];
  des_centers: [[[Array], 6]];
  channels: [
    NaN,
    NaN,
    NaN,
    NaN,
    ["both", "red"],
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    ["both", "black"],
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN
  ];
  centers: {
    head: false;
    ajna: true;
    throat: true;
    g: true;
    sacral: false;
    root: false;
    ego: false;
    spleen: false;
    emo: false;
  };
  type: "Projector";
  profile: "3/5";
  authority: "Self projected";
  variable: "PLL DLL";
  centers_connections: {
    head: {
      head: false;
      ajna: false;
      throat: false;
      g: false;
      ego: false;
      emo: false;
      spleen: false;
      sacral: false;
      root: false;
    };
    ajna: {
      head: false;
      ajna: true;
      throat: true;
      g: false;
      ego: false;
      emo: false;
      spleen: false;
      sacral: false;
      root: false;
    };
    throat: {
      head: false;
      ajna: true;
      throat: true;
      g: true;
      ego: false;
      emo: false;
      spleen: false;
      sacral: false;
      root: false;
    };
    g: {
      head: false;
      ajna: false;
      throat: true;
      g: true;
      ego: false;
      emo: false;
      spleen: false;
      sacral: false;
      root: false;
    };
    ego: {
      head: false;
      ajna: false;
      throat: false;
      g: false;
      ego: false;
      emo: false;
      spleen: false;
      sacral: false;
      root: false;
    };
    emo: {
      head: false;
      ajna: false;
      throat: false;
      g: false;
      ego: false;
      emo: false;
      spleen: false;
      sacral: false;
      root: false;
    };
    spleen: {
      head: false;
      ajna: false;
      throat: false;
      g: false;
      ego: false;
      emo: false;
      spleen: false;
      sacral: false;
      root: false;
    };
    sacral: {
      head: false;
      ajna: false;
      throat: false;
      g: false;
      ego: false;
      emo: false;
      spleen: false;
      sacral: false;
      root: false;
    };
    root: {
      head: false;
      ajna: false;
      throat: false;
      g: false;
      ego: false;
      emo: false;
      spleen: false;
      sacral: false;
      root: false;
    };
  };
  cross: number[];
  numerology: {
    karmic_task: "Libra";
    pifagor_number_1: number;
    soul_level: number;
    pifagor_number_2: number;
    planetary_task: number;
    pifagor_number_3: number;
    soul_level_past_life: number;
    pifagor_number_4: number;
    keeper: boolean;
    pifagor_number_5: number;
    pifagor_number_6: number;
    social_task: number;
    mc1: number[];
    mc2: number[];
    mc3: number[];
    mc_whole_life_task: number;
    mc1_task: number;
    mc2_task: number;
    mc3_task: number;
    mc2_optional_task: string;
    opv: number;
    opv2: number;
    tp: number;
    matrix_code: number;
  };
};
