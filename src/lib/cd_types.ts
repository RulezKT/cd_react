type CDTime = {
  pers_time_sec: number; //seconds from JD2000 , integer
  des_time_sec: number; //seconds from JD2000 , integer
  pers_time_local: LocalTime;
  pers_time_utc: UTCTime;
  des_time: UTCTime;
};

type UTCTime = {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
};

type LocalTime = UTCTime & {
  zone_offset: number; //offset in minutes to subtract from local to get UTC
  place: string; // place of birth
};

type Cross = {
  first: number;
  second: number;
  third: number;
  fourth: number;
};

type GeneralInfo = {
  authority: string;
  type: string;
  definition: string;
};

type SpecialInfo = {
  cognition: string;
  mind: string;
  motivation: string;
  nutrition: string;
  profile: string;
  theme: string;
  variable: string;
  cross: Cross;
};

type PlanetsData = {
  Hex: number;
  Line: number;
  Color: number;
  Tone: number;
  Base: number;
  Longitude: number; // Radians
  Name: string;
  Number: number;
  Power: number;
  Direction: string;
};

type OneSide = {
  generalInfo: GeneralInfo;
  planetsData: PlanetsData[]; // 13 planets + 0 SSB
  gates: Gates[]; // 64 gates   and number 0 is empty
  channels: Channels[]; // 36 channels and number 0 is empty
  centers: Centers; // 9 centers
};

type Gates = {
  defined: boolean;
  number: number;
  pers: boolean;
  des: boolean;
};

type Channels = {
  defined: boolean;
  number: number;
  firstGate: Gates;
  secondGate: Gates;
};

type Centers = {
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

// Degrees: number;
// Minutes: number;
// Seconds: number;
// NumberOfPassedDegrees: number;
// Zodiac: number;

type HD = {
  personality: OneSide;
  design: OneSide;
  generalInfo: GeneralInfo;
  specialInfo: SpecialInfo;
  gates: Gates[]; // 64 gates   and number 0 is empty
  channels: Channels[]; // 36 channels and number 0 is empty
  centers: Centers; // 9 centers
};

export type CD = {
  name: string;
  time: CDTime;
  hd: HD;
};
