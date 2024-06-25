// =================================================================================================//
// Constants for working with de440s file ,
// and converting ephemerides to HD , FD , Astro and Numerology info
// =================================================================================================//

export const PATHTODIR: string = "files/";
export const FILENAME: string = "de440s.bsp";
export const FILENAME_NODES: string = "nodes.json";
export const EXPECTEDSHA512: string =
  "a244335d9eddc1e4fd2f3f8ddabf360020f650bc8fca2c4e7e0f66018db7fd2691dd63f52e3652653e096d97ad74cd48c10b4587a4d5a9bb68dbae5cecf06449";
export const FILELENGTH: number = 32726016;
export const SIZEOFREC: number = 1024;
export const SEGMENT_START_TIME = -4734072000; // de440s.bsp
export const SEGMENT_LAST_TIME = 4735368000; // de440s.bsp
export const TOTAL_SUMMARIES_NUMBER: number = 14; // de440s.bsp

export const AU: number = 0.1495978707e9;

export const SEC_IN_1_DAY: number = 86400;

export const MED_EPS: number = 0.4090928042223289;

export const SSB: number = 0;
export const MERCURY: number = 1;
export const VENUS: number = 2;
export const EARTH: number = 3;
export const MARS: number = 4;
export const JUPITER: number = 5;
export const SATURN: number = 6;
export const URANUS: number = 7;
export const NEPTUNE: number = 8;
export const PLUTO: number = 9;
export const SUN: number = 10;
export const MOON: number = 11;
export const NORTHNODE: number = 12;
export const SOUTHNODE: number = 13;
export const HIRON: number = 14;

export const HEAD: number = 0;
export const AJNA: number = 1;
export const THROAT: number = 2;
export const G: number = 3;
export const SACRAL: number = 4;
export const ROOT: number = 5;
export const EGO: number = 6;
export const SPLEEN: number = 7;
export const EMO: number = 8;

export const NUMBEROFGATES: number = 65; //from 1 to 64
export const NUMBEROFCHANNELS: number = 37; //from 1 to 36

export const NUMBEROFPLANETS: number = 14;

export const NUMBEROFCENTERS: number = 9;

export const SEC_TO_RAD: number = 4.8481368110953599359e-6;
export const RAD_TO_DEG: number = 5.7295779513082320877e1;
export const PI: number = 3.14159265358979323846;
export const RAD_RATIO: number = 0.017453292519943295;
export const RAD_PER_ARCSECONDS: number = 4.8481368110953599359e-6;
export const JD2000: number = 2451545;
export const JD1950: number = 2433282.5;

export const OneLineInDec: number = 0.9375;
export const OneColorInDec: number = 0.15625;
export const OneToneInDec: number = 0.026041666666666668;
export const OneBaseInDec: number = 0.005208333333333334;

export const RAD_88_DEGREES: number = 1.53588974175500991848;

export const MED_SUN_PATH_IN_1_SEC: number = 0.000000199;

export const SEC_FOR_88_DEGREES_SUN: number =
  RAD_88_DEGREES / MED_SUN_PATH_IN_1_SEC;

export const HexSortByDeg: { [key: number]: [number, number] } = {
  17: [3.875, 9.5],
  21: [9.5, 15.125],
  51: [15.125, 20.75],
  42: [20.75, 26.375],
  3: [26.375, 32.0],
  27: [32.0, 37.625],
  24: [37.625, 43.25],
  2: [43.25, 48.875],
  23: [48.875, 54.5],
  8: [54.5, 60.125],
  20: [60.125, 65.75],
  16: [65.75, 71.375],
  35: [71.375, 77.0],
  45: [77.0, 82.625],
  12: [82.625, 88.255],
  15: [88.25, 93.875],
  52: [93.875, 99.5],
  39: [99.5, 105.125],
  53: [105.125, 110.75],
  62: [110.75, 116.375],
  56: [116.375, 122.0],
  31: [122.0, 127.625],
  33: [127.625, 133.25],
  7: [133.25, 138.875],
  4: [138.875, 144.5],
  29: [144.5, 150.125],
  59: [150.125, 155.75],
  40: [155.75, 161.375],
  64: [161.375, 167.0],
  47: [167.0, 172.625],
  6: [172.625, 178.25],
  46: [178.25, 183.875],
  18: [183.875, 189.5],
  48: [189.5, 195.125],
  57: [195.125, 200.75],
  32: [200.75, 206.375],
  50: [206.375, 212.0],
  28: [212.0, 217.625],
  44: [217.625, 223.25],
  1: [223.25, 228.875],
  43: [228.875, 234.5],
  14: [234.5, 240.125],
  34: [240.125, 245.75],
  9: [245.75, 251.375],
  5: [251.375, 257.0],
  26: [257.0, 262.625],
  11: [262.625, 268.25],
  10: [268.25, 273.875],
  58: [273.875, 279.5],
  38: [279.5, 285.125],
  54: [285.125, 290.75],
  61: [290.75, 296.375],
  60: [296.375, 302.0],
  41: [302.0, 307.625],
  19: [307.625, 313.25],
  13: [313.25, 318.875],
  49: [318.875, 324.5],
  30: [324.5, 330.125],
  55: [330.125, 335.75],
  37: [335.75, 341.375],
  63: [341.375, 347.0],
  22: [347.0, 352.625],
  36: [352.625, 358.25],
  25: [358.25, 3.875],
};

/*
http://astro.ukho.gov.uk/nao/miscellanea/DeltaT/
https://ru.wikipedia.org/wiki/%D0%94%D0%B5%D0%BB%D1%8C%D1%82%D0%B0_T
https://eclipse.gsfc.nasa.gov/SEhelp/deltatpoly2004.html
https://en.wikipedia.org/wiki/%CE%94T
*/
export type DeltaTTableStructure = {
  Year: number;
  Seconds: number;
};

// первый и последнй года таблицы значений Дельта Т для быстрого доступа и сама таблица
// type DeltaTTable struct {
// 	FirstYear int
// 	LastYear  int
// 	Table     []DeltaTTableStructure
// }

// [-4733494022,"north"],[-4732252235,"south"]
export type NodesJsonStruct = {
  Time: number;
  Which: string;
};

export type FileInfo = {
  // PathToDir      :     string
  // FileName        :    string
  // Length           :   number
  // Sha512            :  string
  FirstSummaryRec: number;
  FileRecordStruct: FileRecordStruct;
  SummaryRecordStruct: SummaryRecordStruct;
  SummariesLineStruct: SummariesLines[];
};

export type ArrayInfo = {
  Init: number; //:= 0.0;      // start time of the first record in array
  Intlen: number; //:= 0.0;    // the length of one record (seconds)
  Rsize: number; //:= 0.0;     // number of elements in one record
  N: number; //:= 0.0;         // number of records in segment
};

export type SummariesLines = {
  Name: string; //:= ""

  //просто порядковый номер в файле
  Number: number; //:= -1

  SEGMENT_START_TIME: number; // := 0; // always the same if only 1 Record in file
  SEGMENT_LAST_TIME: number; //:= 0; // always the same if only 1 Record in file

  TargetCode: number; //:= -1;
  CenterCode: number; //:= -1;

  RefFrame: number; //:= 0;     // always 1 in planet SPK ???
  TypeOfData: number; //: = 0;  // always 2 in planet SPK

  RecordStartAddress: number; //:= -1; // counted in elements, one need to multiply this by 8 to obtain adress in file
  RecordLastAddress: number; //:= -1;
};

export type SummaryRecordStruct = {
  TotalSummariesNumber: number;
  NextRecordNumber: number;
  PreviousRecordNumber: number;
};

export type FileRecordStruct = {
  //start of the file
  // данные в комментариях написаны для файла de430.bsp

  // 1. LOCIDW (8 characters, 8 bytes) An identification word (`DAF/SPK') 7+'\0'[Address 0]
  Locidw: string; //= "";

  // 2. ND(1 integer, 4 bytes) : The number of double prec. components in each array summary.[Address 8] nd = 2;
  Nd: number;

  // 3. NI ( 1 integer, 4 bytes): The number of integer components in each array summary. [Address 12] ni = 6;
  Ni: number;

  // 4. LOCIFN (60 characters, 60 bytes):
  // The internal name or description of the array file. 7+'\0' NIO2SPK
  Locifn: string; //= "";

  // 5. FWARD ( 1 integer, 4 bytes): The record number of the initial summary record in the file. [Address 76] fward = 4
  Fward: number; //= 0;

  // 6. BWARD ( 1 integer, 4 bytes): The record number of the final summary record in the file. [Address 80] bward = 4;
  Bward: number; //= 0;

  // 7. FREE(1 integer, 4 bytes) :
  // The first free address in the file.This is the address at which
  // the first element of the next array to be added to the file will be stored. free = 14967465;
  Free: number; //= 0;

  // 8. LOCFMT(8 characters, 8 bytes) :
  // The character string that indicates the numeric binary format of the DAF.
  // The string has value "LTL-IEEE" 8+'\0' одна буква не влезает
  // переделывать структуру не хочется. и так сойдет :) LTL-IEEE
  Locfmt: string; //= "";

  // 10. FTPSTR(28 characters, 28 bytes) : The FTP validation string.
  // ftpstr : "FTPSTR:\r:\n:\r\n:\r\x00:\x81:\x10\xce:ENDFTP",
};

export type Position = {
  x: number;
  y: number;
  z: number;

  velocityX: number;
  velocityY: number;
  velocityZ: number;
};

export type PolarPosition = {
  longitude: number;
  latitude: number;
  radius: number;

  velocityX: number;
  velocityY: number;
  velocityZ: number;
};

export const ZodiacNames: string[] = [
  "",
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

export enum ZodiacNamesEnum {
  "Aries" = 0,
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
}

export type Zodiac = {
  name: string;
  degrees: number;
  minutes: number;
  seconds: number;
  text: string;
};



// months from 1 to 12
export const MonthsArr: string[] = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const planetsArr = [
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

function GetName(targetCode: number): string {
  const NaifCodes: { [key: number]: string } = {
    0: "SSB",
    1: "MERCURY_BARYCENTER",
    2: "VENUS_BARYCENTER", //        'VENUS_BARYCENTER' 'VENUS BARYCENTER'
    3: "EARTH_BARYCENTER", // 'EARTH_BARYCENTER' 'EMB' 'EARTH MOON BARYCENTER' 'EARTH-MOON BARYCENTER' 'EARTH BARYCENTER'
    4: "MARS_BARYCENTER", //          'MARS_BARYCENTER' 'MARS BARYCENTER'
    5: "JUPITER_BARYCENTER", //          'JUPITER_BARYCENTER' 'JUPITER BARYCENTER'
    6: "SATURN_BARYCENTER", //          'SATURN_BARYCENTER' 'SATURN BARYCENTER'
    7: "URANUS_BARYCENTER", //          'URANUS_BARYCENTER' 'URANUS BARYCENTER'
    8: "NEPTUNE_BARYCENTER", //         'NEPTUNE_BARYCENTER' 'NEPTUNE BARYCENTER'
    9: "PLUTO_BARYCENTER", //          'PLUTO_BARYCENTER' 'PLUTO BARYCENTER'
    10: "SUN", //         'SUN'
    199: "MERCURY", // 'MERCURY'
    299: "VENUS", // 'VENUS'
    399: "EARTH", // 'EARTH'
    301: "MOON", // 'MOON'
    499: "MARS", // 'MARS'
    599: "JUPITER", // 'JUPITER'
    699: "SATURN", // 'SATURN'
    799: "URANUS", // 'URANUS'
    899: "NEPTUNE", // 'NEPTUNE'
    999: "PLUTO", // 'PLUTO'
    2002060: "CHIRON",
  };

  return NaifCodes[targetCode] || "Unknown Object";
}

export type BspFile = {
  //https://sindresorhus.com/blog/goodbye-nodejs-buffer
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
  FilePtr: Uint8Array;
  NodesCoords: [number, string][];
};

export const DE440S_FILE_RECORDS = [
  {
    Name: "SSB",
    Number: 0,

    TargetCode: 0,
    CenterCode: 0,

    RecordStartAddress: 0,
    RecordLastAddress: 0,
  },

  {
    Name: "MERCURY_BARYCENTER",
    Number: 1,

    TargetCode: 1,
    CenterCode: 0,

    RecordStartAddress: 8065,
    RecordLastAddress: 610868,
  },
  {
    Name: "VENUS_BARYCENTER",
    Number: 2,

    TargetCode: 2,
    CenterCode: 0,

    RecordStartAddress: 610869,
    RecordLastAddress: 830072,
  },
  {
    Name: "EARTH_BARYCENTER",
    Number: 3,

    TargetCode: 3,
    CenterCode: 0,

    RecordStartAddress: 830073,
    RecordLastAddress: 1110926,
  },
  {
    Name: "MARS_BARYCENTER",
    Number: 4,

    TargetCode: 4,
    CenterCode: 0,

    RecordStartAddress: 1110927,
    RecordLastAddress: 1230805,
  },
  {
    Name: "JUPITER_BARYCENTER",
    Number: 5,

    TargetCode: 5,
    CenterCode: 0,

    RecordStartAddress: 1230806,
    RecordLastAddress: 1319859,
  },
  {
    Name: "SATURN_BARYCENTER",
    Number: 6,

    TargetCode: 6,
    CenterCode: 0,

    RecordStartAddress: 1319860,
    RecordLastAddress: 1398638,
  },
  {
    Name: "URANUS_BARYCENTER",
    Number: 7,

    TargetCode: 7,
    CenterCode: 0,

    RecordStartAddress: 1398639,
    RecordLastAddress: 1467142,
  },
  {
    Name: "NEPTUNE_BARYCENTER",
    Number: 8,

    TargetCode: 8,
    CenterCode: 0,

    RecordStartAddress: 1467143,
    RecordLastAddress: 1535646,
  },
  {
    Name: "PLUTO_BARYCENTER",
    Number: 9,

    TargetCode: 9,
    CenterCode: 0,

    RecordStartAddress: 1535647,
    RecordLastAddress: 1604150,
  },

  {
    Name: "SUN",
    Number: 10,

    TargetCode: 10,
    CenterCode: 0,

    RecordStartAddress: 1604151,
    RecordLastAddress: 1843904,
  },
  ///
  {
    Name: "MOON",
    Number: 11,

    TargetCode: 301,
    CenterCode: 3,

    RecordStartAddress: 1843905,
    RecordLastAddress: 2967308,
  },
  {
    Name: "EARTH",
    Number: 12,

    TargetCode: 399,
    CenterCode: 3,

    RecordStartAddress: 2967309,
    RecordLastAddress: 4090712,
  },
  {
    Name: "MERCURY",
    Number: 13,

    TargetCode: 199,
    CenterCode: 1,

    RecordStartAddress: 4090713,
    RecordLastAddress: 4090724,
  },
  {
    Name: "VENUS",
    Number: 14,

    TargetCode: 299,
    CenterCode: 2,

    RecordStartAddress: 4090725,
    RecordLastAddress: 4090736,
  },
];

// =================================================================================================//
//Structures for standart communication with the server
// about HD , FD , Astro and Numerology info
// =================================================================================================//

export type ReqData = {
  name: string;
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  typeOfTime: number; // 1 - local time, 0- UTC Time
  offset: number; // offset in seconds to subtract from local to get UTC
  place: string;
  latitude: number;
  longitude: number;

};

export type CookiesData = {
  name: string;
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
};

// 1 - local time, 0- UTC Time
export enum TypeOfTime {
  UTC = 0,
  Local = 1,
}

export type CDinfo = {
  name: string;
  time: CDTime;
  hd: HD;
  fdInfo: Fd;
  astroInfo: Astro;
  numerologyInfo: Numerology;
};

export type PlFdData = {
  orbit: number;
  point_to_planet: string;
  center_number: number;
};

export type Fd = {
  pers: { plfData: PlFdData[]; centersArr: string[][] };
  des: { plfData: PlFdData[]; centersArr: string[][] };
};

export type Astro = {};

export type Numerology = {
  karmicTask: string;
  pifagor_number_1: number;
  pifagor_number_2: number;
  soul_level: number;
  pifagor_number_3: number;
  planetary_task: number;
  soul_level_past_life: number;
  pifagor_number_4: number;
  keeper: boolean;
  white_mage: boolean;
  pifagor_number_5: number;
  pifagor_number_6: number;
  social_task: number;
  mc1: [number, number];
  mc2: [number, number];
  mc3: [number, number];
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

export type HD = {
  personality: OneSide;
  design: OneSide;
  generalInfo: GeneralInfo;
  specialInfo: SpecialInfo;
  gates: Gates[]; // 64 gates   and number 0 is empty
  channels: Channels[]; // 36 channels and number 0 is empty
  centers: Centers; // 9 centers
};

export type CDTime = {
  pers_time_sec: number; //seconds from JD2000 , integer
  des_time_sec: number; //seconds from JD2000 , integer
  pers_time_local: LocalTime;
  pers_time_utc: UTCTime;
  des_time: UTCTime;
  typeOfTime: number; // 1 - local time, 0- UTC Time
};

export type UTCTime = {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
};

export type LocalTime = UTCTime & {
  offset: number; //offset in seconds to subtract from local to get UTC
  place: string; // place of birth
  longitude: number; // longitude
  latitude: number; // latitude
};

export type OneSide = {
  generalInfo: GeneralInfo;
  planets_data: PlanetsData[]; // 13 planets + 0 SSB
  gates: Gates[]; // 64 gates   and  + index 0 is empty = 65
  channels: Channels[]; // 36 channels and  + index 0 is empty = 37
  centers: Centers; // 9 centers
};

export type Cross = {
  first: number;
  second: number;
  third: number;
  fourth: number;
};

export type GeneralInfo = {
  authority: string;
  type: string;
  definition: string;
};

export type SpecialInfo = {
  cognition: string;
  theme: string;
  nutr_type: string;
  environment: string;
  mind: string;
  motivation: string;
  motivation_transf: string;
  view: string;
  perspective: string;
  perspective_transf: string;
  profile: string;
  variable: string;
  cross: Cross;
};



export type Gates = {
  defined: boolean;
  number: number;
  pers: boolean;
  des: boolean;
};

export type GatesArr = { both: Gates[]; pers: Gates[]; des: Gates[] };

export type Channels = {
  defined: boolean;
  number: number;
  firstGate: Gates;
  secondGate: Gates;
};

export type ChannelsArr = {
  both: Channels[];
  pers: Channels[];
  des: Channels[];
};

export type Centers = {
  Head: boolean;
  Ajna: boolean;
  Throat: boolean;
  G: boolean;
  Ego: boolean;
  Emo: boolean;
  Spleen: boolean;
  Sacral: boolean;
  Root: boolean;
};

export type CentersArr = {
  both: Centers;
  pers: Centers;
  des: Centers;
};

export type PlanetsData = {
  name: string;
  number: number;
  longitude: number;
  hex: number;
  line: number;
  color: number;
  tone: number;
  base: number;
  power: number;
  direction: string;
  zodiac: Zodiac;
};

export type PlanetsDataArr = { pers: PlanetsData[]; des: PlanetsData[] };

export type HexLine = {
  hex: number;
  line: number;
  color: number;
  tone: number;
  base: number;
  number_of_passed_degrees: number;
};

// для каждого знака зодиака определяется сила планеты
// поиск идет от 6 к 0, берется первое найденное
export const planetsPower = [
  // сила идет по порядку массива
  // [0,1,2,3,4,5,6]
  // 6 - обитель
  // 5 - экзальтация
  // 4 - родство, дружба
  // 3 - нейтрально
  // 2 - вражда
  // 1 - падение
  // 0 - изгнание

  // Aries
  [
    ["venus"],
    ["saturn"],
    ["mercury", "uranus"],
    ["moon"],
    ["jupiter", "neptune"],
    ["sun"],
    ["mars", "pluto"],
  ],

  // Taurus
  [
    ["mars", "pluto"],
    ["uranus"],
    ["jupiter", "neptune"],
    ["sun"],
    ["mercury", "saturn"],
    ["moon"],
    ["venus"],
  ],

  // Gemini
  [
    ["jupiter", "neptune"],
    ["hiron"],
    ["sun", "mars", "pluto"],
    ["moon"],
    ["venus", "saturn", "uranus"],
    ["mercury"],
    ["mercury"],
  ],

  // Cancer
  [
    ["saturn", "uranus"],
    ["mars"],
    ["mercury", "venus"],
    ["sun"],
    ["neptune", "pluto"],
    ["jupiter"],
    ["moon"],
  ],

  // Leo
  [
    ["saturn", "uranus"],
    ["neptune"],
    ["mercury", "venus"],
    ["moon"],
    ["jupiter", "mars"],
    ["pluto"],
    ["sun"],
  ],

  // Virgo
  [
    ["jupiter", "neptune"],
    ["venus"],
    ["mars", "pluto", "moon"],
    ["sun"],
    ["saturn", "uranus"],
    ["mercury"],
    ["mercury"],
  ],

  // Libra
  [
    ["mars", "pluto"],
    ["sun"],
    ["jupiter", "neptune"],
    ["moon"],
    ["mercury", "uranus"],
    ["saturn"],
    ["venus"],
  ],

  // Scorpio
  [
    ["venus"],
    ["moon"],
    ["mercury", "saturn"],
    ["sun"],
    ["jupiter", "neptune"],
    ["uranus"],
    ["mars", "pluto"],
  ],

  // Sagittarius
  [
    ["mercury"],
    ["mercury"],
    ["saturn", "uranus", "venus"],
    ["moon"],
    ["mars", "pluto", "sun"],
    ["hiron"],
    ["jupiter", "neptune"],
  ],

  // Capricorn
  [
    ["moon"],
    ["jupiter"],
    ["neptune", "pluto"],
    ["sun"],
    ["mercury", "venus"],
    ["mars"],
    ["saturn", "uranus"],
  ],

  // Aquarius
  [
    ["sun"],
    ["pluto"],
    ["jupiter", "mars"],
    ["moon"],
    ["mercury", "venus"],
    ["neptune"],
    ["saturn", "uranus"],
  ],

  // Pisces
  [
    ["mercury"],
    ["mercury"],
    ["saturn", "uranus"],
    ["sun"],
    ["mars", "pluto", "moon"],
    ["venus"],
    ["jupiter", "neptune"],
  ],
];

// показывает какие планеты из planets_numbers какими управляют знаками из zodiac_names
export const Dispositors = [
  // ssb
  [],

  // mercury
  ["Gemini", "Virgo"],

  // venus
  ["Taurus", "Libra"],

  // earth
  [],

  // mars
  ["Aries"],

  // jupiter
  ["Sagittarius"],

  // saturn
  ["Capricorn"],

  // uranus
  ["Aquarius"],

  // neptune
  ["Pisces"],

  // pluto
  ["Scorpio"],

  // sun
  ["Leo"],

  // moon
  ["Cancer"],
];

export type PlanetFD = {
  orbit: number; // what orbit it is on (0- center)
  point_to_planet: string; //what planet it points to
};

export type ChannelsNumbers = {
  number: number;
  firstGate: number;
  secondGate: number;
};

export const ChannelsNumbersArr: ChannelsNumbers[] = [
  //0  empty

  {
    number: 0,
    firstGate: 0,
    secondGate: 0,
  },
  // 1 - 64-47
  {
    number: 1,
    firstGate: 64,
    secondGate: 47,
  },
  // 2 - 61-24
  {
    number: 2,
    firstGate: 61,
    secondGate: 24,
  },
  // 3 - 63-4
  {
    number: 3,
    firstGate: 63,
    secondGate: 4,
  },
  // 4 - 17-62
  {
    number: 4,
    firstGate: 17,
    secondGate: 62,
  },
  // 5 - 43-23
  {
    number: 5,
    firstGate: 43,
    secondGate: 23,
  },
  // 6 - 11-56
  {
    number: 6,
    firstGate: 11,
    secondGate: 56,
  },
  // 7 - 48-16
  {
    number: 7,
    firstGate: 48,
    secondGate: 16,
  },
  // 8 - 57-20
  {
    number: 8,
    firstGate: 57,
    secondGate: 20,
  },
  // 9 - 34-20
  {
    number: 9,
    firstGate: 34,
    secondGate: 20,
  },
  // 10- 10-20
  {
    number: 10,
    firstGate: 10,
    secondGate: 20,
  },
  // 11- 57-10
  {
    number: 11,
    firstGate: 57,
    secondGate: 10,
  },

  // 12- 57-34
  {
    number: 12,
    firstGate: 57,
    secondGate: 34,
  },
  // 13- 34-10
  {
    number: 13,
    firstGate: 34,
    secondGate: 10,
  },
  // 14- 7-31
  {
    number: 14,
    firstGate: 7,
    secondGate: 31,
  },
  // 15- 1-8
  {
    number: 15,
    firstGate: 1,
    secondGate: 8,
  },
  // 16- 13-33
  {
    number: 16,
    firstGate: 13,
    secondGate: 33,
  },
  // 17- 21-45
  {
    number: 17,
    firstGate: 21,
    secondGate: 45,
  },
  // 18- 22-12
  {
    number: 18,
    firstGate: 22,
    secondGate: 12,
  },
  // 19- 36-35
  {
    number: 19,
    firstGate: 36,
    secondGate: 35,
  },
  // 20- 5-15
  {
    number: 20,
    firstGate: 5,
    secondGate: 15,
  },
  // 21- 14-2
  {
    number: 21,
    firstGate: 14,
    secondGate: 2,
  },
  // 22- 29-46
  {
    number: 22,
    firstGate: 29,
    secondGate: 46,
  },
  // 23- 51-25
  {
    number: 23,
    firstGate: 51,
    secondGate: 25,
  },
  // 24- 44-26
  {
    number: 24,
    firstGate: 44,
    secondGate: 26,
  },
  // 25- 27-50
  {
    number: 25,
    firstGate: 27,
    secondGate: 50,
  },
  // 26- 59-6
  {
    number: 26,
    firstGate: 59,
    secondGate: 6,
  },
  // 27- 37-40
  {
    number: 27,
    firstGate: 37,
    secondGate: 40,
  },
  // 28- 54-32
  {
    number: 28,
    firstGate: 54,
    secondGate: 32,
  },
  // 29- 38-28
  {
    number: 29,
    firstGate: 38,
    secondGate: 28,
  },
  // 30- 58-18
  {
    number: 30,
    firstGate: 58,
    secondGate: 18,
  },
  // 31- 53-42
  {
    number: 31,
    firstGate: 53,
    secondGate: 42,
  },
  // 32- 60-3
  {
    number: 32,
    firstGate: 60,
    secondGate: 3,
  },
  // 33- 52-9
  {
    number: 33,
    firstGate: 52,
    secondGate: 9,
  },
  // 34- 19-49
  {
    number: 34,
    firstGate: 19,
    secondGate: 49,
  },
  // 35- 39-55
  {
    number: 35,
    firstGate: 39,
    secondGate: 55,
  },
  // 36- 41-30
  {
    number: 36,
    firstGate: 41,
    secondGate: 30,
  },
];

export const planetsNumbers = {
  0: "ssb",
  1: "mercury", // 7,01° (относительно эклиптики)
  2: "venus", // 3,39458° (относительно эклиптики)
  3: "earth",
  4: "mars", // 1,85061° (относительно эклиптики)
  5: "jupiter", // 1,304° (относительно эклиптики)
  6: "saturn", // 2,485 240° (относительно эклиптики)
  7: "uranus", // 0,772556° (относительно эклиптики)
  8: "neptune", // 1,767975° (относительно эклиптики)
  9: "pluto", // 17°,14 (относительно эклиптики)
  10: "sun",
  11: "moon", // 5,14° (относительно эклиптики)
  12: "north_node",
  13: "south_node",
  14: "hiron",
};

// массив с названиями планет в том порядке, в котором они находятся в файле de430.bsp
// +после 11 номера идут дополнительные планеты
export const planetsNamesArr = [
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

const PlanetsNames = [
  "Solar System Barycenter",
  "Mercury Barycenter",
  "Venus Barycenter",
  "Earth Barycenter",
  "Mars Barycenter",
  "Jupiter Barycenter",
  "Saturn Barycenter",
  "Uranus Barycenter",
  "Neptune Barycenter",
  "Pluto Barycenter",
  "Sun",
  "Moon",
  "Earth",
  "Mercury",
  "Venus",
];

const signs_sorted_by_deg = [
  [0, [0, 0]],

  //Aries, Овен from 0 to 29.9
  [1, [0, 30]],

  //Taurus,  Телец from 30 to 59.9
  [2, [30, 60]],

  //Gemini,  Близнецы from 60 to 89.9
  [3, [60, 90]],

  //Cancer,  Рак from 90 to 119.9
  [4, [90, 120]],

  //Leo,  Лев from 120 to 149.9
  [5, [120, 150]],

  //Virgo,  Дева from 150 to 179.9
  [6, [150, 180]],

  //Libra,  Весы from 180 to 209.9
  [7, [180, 210]],

  //Scorpio,  Скорпион from 210 to 239.9
  [8, [210, 240]],

  //Sagittarius,  Стрелец from 240 to 269.9
  [9, [240, 270]],

  //Capricorn,  Козерог from 270 to 299.9
  [10, [270, 300]],

  //Aquarius,  Водолей from 300 to 329.9
  [11, [300, 330]],

  //Pisces,  Рыбы from 330 to 359.9
  [12, [330, 360]],
];

//дома планет,
// указаны соответствующие номера знаков зодиака от 1 до 12
const planets_houses = [
  [0],

  //Mercury Barycenter - Gemini and Virgo
  [3, 6],

  //Venus Barycenter - Taurus and Libra
  [2, 7],

  //Earth Barycenter
  [0],

  //Mars - Aries
  [1],

  //Jupiter  - Sagittarius
  [9],

  //Saturn - Capricorn
  [10],

  //Uranus - Aquarius
  [11],

  //Neptune - Pisces
  [12],

  //Pluto - Scorpio
  [8],

  //Sun - Leo
  [5],

  //Moon - Cancer
  [4],

  //Earth, Mercury, Venus
  [0],
  [0],
  [0],
];
