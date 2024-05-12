import { Button } from "@/components/ui/button";
// import { create } from "zustand";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { MainScene } from "./components/MainScene/MainScene";

import axios from "axios";

import { useState } from "react";

// import { GetData } from "./lib/GetData";

// interface BearState {
//   bears: number;
//   increasePopulation: () => void;
// }

// const useStore = create<BearState>()((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
// }));

// const useStore = create((set) => ({
//   cd_data: null,
//   setData: (data) => set((state) => ({ cd_data: data })),
// }));

function App() {
  // const increasePopulation = useStore((state) => state.increasePopulation);
  // const bears = useStore((state) => state.bears);

  // const useCallGetData = () => {
  // const data = GetData("17.05.1978");
  // console.log(data);
  // };

  const [cd_data, setData] = useState({
    Personality: {
      Planet: [
        {
          Longitude: 0,
          Name: "SSB",
          Number: 0,
          Hex: 0,
          Line: 0,
          Color: 0,
          Tone: 0,
          Base: 0,
          NumberOfPassedDegrees: 0,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 0.5559480793766673,
          Name: "Mercury",
          Number: 1,
          Hex: 3,
          Line: 5.843710481799599,
          Color: 5.062262890797593,
          Tone: 0.37357734478555354,
          Base: 1.8678867239277677,
          NumberOfPassedDegrees: 5.478478576687124,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 1.480508227544534,
          Name: "Venus",
          Number: 2,
          Hex: 12,
          Line: 2.348664504209,
          Color: 2.091987025254002,
          Tone: 0.5519221515240132,
          Base: 2.759610757620066,
          NumberOfPassedDegrees: 2.201872972695938,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 4.12880011852257,
          Name: "Earth",
          Number: 3,
          Hex: 14,
          Line: 2.20034266075445,
          Color: 1.2020559645266986,
          Tone: 1.212335787160191,
          Base: 1.061678935800955,
          NumberOfPassedDegrees: 2.0628212444572966,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 2.3731237313106943,
          Name: "Mars",
          Number: 4,
          Hex: 7,
          Line: 2.9013056708701392,
          Color: 5.407834025220836,
          Tone: 2.447004151325018,
          Base: 2.2350207566250893,
          NumberOfPassedDegrees: 2.7199740664407557,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 1.6835910359846253,
          Name: "Jupiter",
          Number: 5,
          Hex: 52,
          Line: 2.7601715071754067,
          Color: 4.56102904305244,
          Tone: 3.3661742583146403,
          Base: 1.8308712915732028,
          NumberOfPassedDegrees: 2.5876607879769438,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 2.5199594173980064,
          Name: "Saturn",
          Number: 6,
          Hex: 4,
          Line: 5.87524177189501,
          Color: 5.251450631370062,
          Tone: 1.508703788220373,
          Base: 2.543518941101865,
          NumberOfPassedDegrees: 5.508039161151572,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 3.9125617974758686,
          Name: "Uranus",
          Number: 7,
          Hex: 1,
          Line: 0.9848299514521689,
          Color: 5.908979708713014,
          Tone: 5.4538782522780815,
          Base: 2.269391261390408,
          NumberOfPassedDegrees: 0.9232780794864084,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 4.499639357550199,
          Name: "Neptune",
          Number: 8,
          Hex: 26,
          Line: 0.8643674864892091,
          Color: 5.186204918935255,
          Tone: 1.117229513611528,
          Base: 0.5861475680576401,
          NumberOfPassedDegrees: 0.8103445185836335,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 3.3959391674671355,
          Name: "Pluto",
          Number: 9,
          Hex: 48,
          Line: 5.411180564306505,
          Color: 2.4670833858390324,
          Tone: 2.8025003150341945,
          Base: 4.012501575170972,
          NumberOfPassedDegrees: 5.072981779037349,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 0.9872074649327762,
          Name: "Sun",
          Number: 10,
          Hex: 8,
          Line: 2.20034266075445,
          Color: 1.2020559645266986,
          Tone: 1.212335787160191,
          Base: 1.061678935800955,
          NumberOfPassedDegrees: 2.0628212444572966,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 2.9999902206788454,
          Name: "Moon",
          Number: 11,
          Hex: 47,
          Line: 5.212563440446199,
          Color: 1.2753806426771916,
          Tone: 1.6522838560631499,
          Base: 3.261419280315749,
          NumberOfPassedDegrees: 4.886778225418311,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 3.2290598127507297,
          Name: "NorthNode",
          Number: 12,
          Hex: 18,
          Line: 1.2122656703154158,
          Color: 1.2735940218924953,
          Tone: 1.6415641313549711,
          Base: 3.207820656774856,
          NumberOfPassedDegrees: 1.1364990659207024,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 0.0874671591609364,
          Name: "SouthNde",
          Number: 13,
          Hex: 17,
          Line: 1.2122656703154036,
          Color: 1.2735940218924213,
          Tone: 1.641564131354528,
          Base: 3.2078206567726393,
          NumberOfPassedDegrees: 1.1364990659206908,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
      ],
      Centers: {
        Center: null,
      },
      LocalTime: {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minutes: 0,
        seconds: 0,
      },
      UtcTime: {
        year: 1978,
        month: 5,
        day: 17,
        hour: 12,
        minutes: 45,
        seconds: 1,
      },
      TypeOfTyme: 0,
      Offset: 0,
      SecFromJd2000: -682470851,
      Place: "",
      Authority: "",
    },
    Design: {
      Planet: [
        {
          Longitude: 0,
          Name: "SSB",
          Number: 0,
          Hex: 0,
          Line: 0,
          Color: 0,
          Tone: 0,
          Base: 0,
          NumberOfPassedDegrees: 0,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 5.599838253311368,
          Name: "Mercury",
          Number: 1,
          Hex: 49,
          Line: 2.1035710620290047,
          Color: 0.6214263721740281,
          Tone: 3.7285582330441684,
          Base: 3.642791165220842,
          NumberOfPassedDegrees: 1.9720978706521919,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 5.844037565994503,
          Name: "Venus",
          Number: 2,
          Hex: 55,
          Line: 5.027933703884083,
          Color: 0.16760222330449323,
          Tone: 1.0056133398269593,
          Base: 0.028066699134796865,
          NumberOfPassedDegrees: 4.713687847391327,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 2.5929103253759624,
          Name: "Earth",
          Number: 3,
          Hex: 29,
          Line: 4.333672853264731,
          Color: 2.0020371195883855,
          Tone: 0.012222717530312364,
          Base: 0.06111358765156182,
          NumberOfPassedDegrees: 4.062818299935685,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 1.984133428885174,
          Name: "Mars",
          Number: 4,
          Hex: 62,
          Line: 3.127969563670331,
          Color: 0.7678173820219854,
          Tone: 4.6069042921319125,
          Base: 3.0345214606595605,
          NumberOfPassedDegrees: 2.932471465940935,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 1.5077938035045906,
          Name: "Jupiter",
          Number: 5,
          Hex: 12,
          Line: 4.0162360712435206,
          Color: 0.0974164274611212,
          Tone: 0.5844985647667272,
          Base: 2.9224928238336356,
          NumberOfPassedDegrees: 3.7652213167908,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 2.571620433426718,
          Name: "Saturn",
          Number: 6,
          Hex: 29,
          Line: 3.0325305012847212,
          Color: 0.19518300770832867,
          Tone: 1.1710980462499718,
          Base: 0.8554902312498595,
          NumberOfPassedDegrees: 2.8429973449544264,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 3.9568241156839545,
          Name: "Uranus",
          Number: 7,
          Hex: 1,
          Line: 3.6899435778931244,
          Color: 4.139661467358747,
          Tone: 0.8379688041524787,
          Base: 4.189844020762393,
          NumberOfPassedDegrees: 3.459322104274804,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 4.5090859572820525,
          Name: "Neptune",
          Number: 8,
          Hex: 26,
          Line: 1.4417011348994493,
          Color: 2.6502068093966953,
          Tone: 3.9012408563801726,
          Base: 4.506204281900863,
          NumberOfPassedDegrees: 1.3515948139682337,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 3.43400982844801,
          Name: "Pluto",
          Number: 9,
          Hex: 57,
          Line: 1.7378879749491414,
          Color: 4.427327849694848,
          Tone: 2.563967098169087,
          Base: 2.819835490845434,
          NumberOfPassedDegrees: 1.62926997651482,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 5.734502978965756,
          Name: "Sun",
          Number: 10,
          Hex: 30,
          Line: 4.333672853264761,
          Color: 2.002037119588567,
          Tone: 0.012222717531403759,
          Base: 0.06111358765701879,
          NumberOfPassedDegrees: 4.062818299935714,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 1.4712997404507522,
          Name: "Moon",
          Number: 11,
          Hex: 12,
          Line: 1.7858832282896553,
          Color: 4.715299369737932,
          Tone: 4.2917962184275895,
          Base: 1.4589810921379456,
          NumberOfPassedDegrees: 1.6742655265215518,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 3.2586388168074474,
          Name: "NorthNode",
          Number: 12,
          Hex: 18,
          Line: 3.0200012379423544,
          Color: 0.12000742765412724,
          Tone: 0.7200445659247634,
          Base: 3.600222829623817,
          NumberOfPassedDegrees: 2.8312511605709574,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
        {
          Longitude: 0.11704616321765432,
          Name: "SouthNde",
          Number: 13,
          Hex: 17,
          Line: 3.020001237942366,
          Color: 0.12000742765419545,
          Tone: 0.7200445659251727,
          Base: 3.600222829625863,
          NumberOfPassedDegrees: 2.831251160570968,
          Power: 0,
          Direction: "",
          Degrees: 0,
          Minutes: 0,
          Seconds: 0,
          Zodiac: "",
        },
      ],
      Centers: {
        Center: null,
      },
      LocalTime: {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minutes: 0,
        seconds: 0,
      },
      UtcTime: {
        year: 1978,
        month: 2,
        day: 17,
        hour: 6,
        minutes: 46,
        seconds: 7,
      },
      TypeOfTyme: 0,
      Offset: 0,
      SecFromJd2000: 0,
      Place: "",
      Authority: "",
    },
    Gates: [
      {
        Number: 0,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 1,
        Pers: 129,
        Des: 129,
        Defined: true,
      },
      {
        Number: 2,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 3,
        Pers: 129,
        Des: 0,
        Defined: true,
      },
      {
        Number: 4,
        Pers: 129,
        Des: 0,
        Defined: true,
      },
      {
        Number: 5,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 6,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 7,
        Pers: 129,
        Des: 0,
        Defined: true,
      },
      {
        Number: 8,
        Pers: 129,
        Des: 0,
        Defined: true,
      },
      {
        Number: 9,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 10,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 11,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 12,
        Pers: 129,
        Des: 258,
        Defined: true,
      },
      {
        Number: 13,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 14,
        Pers: 129,
        Des: 0,
        Defined: true,
      },
      {
        Number: 15,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 16,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 17,
        Pers: 129,
        Des: 129,
        Defined: true,
      },
      {
        Number: 18,
        Pers: 129,
        Des: 129,
        Defined: true,
      },
      {
        Number: 19,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 20,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 21,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 22,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 23,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 24,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 25,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 26,
        Pers: 129,
        Des: 129,
        Defined: true,
      },
      {
        Number: 27,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 28,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 29,
        Pers: 0,
        Des: 258,
        Defined: true,
      },
      {
        Number: 30,
        Pers: 0,
        Des: 129,
        Defined: true,
      },
      {
        Number: 31,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 32,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 33,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 34,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 35,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 36,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 37,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 38,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 39,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 40,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 41,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 42,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 43,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 44,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 45,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 46,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 47,
        Pers: 129,
        Des: 0,
        Defined: true,
      },
      {
        Number: 48,
        Pers: 129,
        Des: 0,
        Defined: true,
      },
      {
        Number: 49,
        Pers: 0,
        Des: 129,
        Defined: true,
      },
      {
        Number: 50,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 51,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 52,
        Pers: 129,
        Des: 0,
        Defined: true,
      },
      {
        Number: 53,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 54,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 55,
        Pers: 0,
        Des: 129,
        Defined: true,
      },
      {
        Number: 56,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 57,
        Pers: 0,
        Des: 129,
        Defined: true,
      },
      {
        Number: 58,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 59,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 60,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 61,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 62,
        Pers: 0,
        Des: 129,
        Defined: true,
      },
      {
        Number: 63,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
      {
        Number: 64,
        Pers: 0,
        Des: 0,
        Defined: false,
      },
    ],
    Channels: [
      {
        Number: 0,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 1,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 2,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 3,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 4,
        FirstGate: {
          Number: 17,
          Pers: 129,
          Des: 129,
          Defined: true,
        },
        SecondGate: {
          Number: 62,
          Pers: 0,
          Des: 129,
          Defined: true,
        },
        Defined: true,
      },
      {
        Number: 5,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 6,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 7,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 8,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 9,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 10,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 11,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 12,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 13,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 14,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 15,
        FirstGate: {
          Number: 1,
          Pers: 129,
          Des: 129,
          Defined: true,
        },
        SecondGate: {
          Number: 8,
          Pers: 129,
          Des: 0,
          Defined: true,
        },
        Defined: true,
      },
      {
        Number: 16,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 17,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 18,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 19,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 20,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 21,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 22,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 23,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 24,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 25,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 26,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 27,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 28,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 29,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 30,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 31,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 32,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 33,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 34,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 35,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
      {
        Number: 36,
        FirstGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        SecondGate: {
          Number: 0,
          Pers: 0,
          Des: 0,
          Defined: false,
        },
        Defined: false,
      },
    ],
    Centers: {
      Center: {
        Ajna: true,
        Ego: false,
        Emo: false,
        G: true,
        Head: false,
        Root: false,
        Sacral: false,
        Spleen: false,
        Throat: true,
      },
    },
    Theme: "Thirst",
    NutrType: "Hot",
    Cognition: "Smell",
    Variable: "PLLDLL",
    Motivation: "Hope",
    Mind: "Theist",
    Cross: {
      First: 8,
      Second: 14,
      Third: 30,
      Forth: 29,
    },
    Profile: "3/5",
    Authority: "Self projected",
    Definition: "Single Definition",
    Type: "Projector",
  });

  // const setData = useStore((state) => state.setData);
  // const cd_data = useStore((state) => state.cd_data);

  const handleClick = async () => {
    const { data } = await axios.post("http://127.0.0.1:8080/api", {
      name: "John",
    });

    setData(data);
    // console.log(data);
  };

  // State for storing the selected option. Default is "Male"
  const [selectedRadioButt, setSelectedRadioButt] = useState("bodygraph");

  // Function to handle the change in radio button selection
  function onRadioButtValueChange(value: string) {
    // Updating the state with the selected radio button's value
    setSelectedRadioButt(value);
    // console.log("inside onRadioButtValueChange");
  }

  return (
    <>
      {/* <div className="flex flex-row justify-center h-96 items-center">
        <Button onClick={increasePopulation}>
          Number of bears is: {bears}
        </Button>
      </div> */}
      <div className="flex flex-row justify-center h-96 items-center">
        <Button onClick={handleClick}>Fetch data </Button>
      </div>
      <RadioGroup
        className="flex flex-row gap-5 m-10"
        onValueChange={onRadioButtValueChange}
        defaultValue="bodygraph"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bodygraph" id="option-one" />
          <Label htmlFor="option-one">Body</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="design" id="option-two" />
          <Label htmlFor="option-two">Design</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="personality" id="option-three" />
          <Label htmlFor="option-three">Personality</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="transits" id="option-four" disabled />
          <Label htmlFor="option-four">Transits</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bodytransits" id="option-five" disabled />
          <Label htmlFor="option-five">Body+Transits</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mandala" id="option-six" disabled />
          <Label htmlFor="option-six">Mandala</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="composite" id="option-seven" disabled />
          <Label htmlFor="option-seven">Composite</Label>
        </div>
      </RadioGroup>

      <MainScene radiobutt={selectedRadioButt} data={cd_data} />
    </>
  );
}

export default App;
